<template>
    <div class="fade">
        <transition name="fade-in-slow">
            <div class="lock-wrapper" v-if="showLock">
                <div class="lock-base">
                    <div class="base-bottom">
                    </div>
                    <div class="lock-inside-top">
                    </div>
                    <div class="lock-inside-bottom">
                    </div>
                </div>
                <div class="lock-upper" :class="{'lock-upper-unlock': !lockStatus, 'lock-upper-lock': lockStatus}">
                    <div class="lock-upper-round"></div>
                    <div class="lock-upper-left"></div>
                </div>
                <div class="lock-status">
                    Wallpaper widget is {{lockStatus? 'locked': 'unlocked'}}
                </div>
            </div>
        </transition>
        <div class="util-overlay"></div>
        <div id="background-hover"></div>
        <div id="background"></div>
    </div>
</template>

<script>
    import bgUtil from '../utils/bgUtil'
    import bgData from '../utils/backgroundData'
    import storage from '../utils/storage'
    import constants, {STORAGE} from '../utils/Constants'
    import {EventBus} from '../utils/EventBus'
    import {BackgroundMessage, MessageTypeEnum, HistoryMessage} from '../constants/Message'

    let bgElement, bgHoverElement;
    let LockShowTimeout;
    const backgroundVue = {
        data() {
            return {
                showBackground: false,
                bgSeen: '',
                tabsCount: '',
                themeId: '',
                defaultImageLoaded: false,
                bgIndex: 0,
                allBackgrounds: null,
                bgKeys: null,
                themeVal: '',
                backgroundType: this.settings.type || 'predefined',
                showLock: false,
                lockStatus: false
            }
        },
        props: ['settings', 'miscSettings'],
        mounted() {
            bgElement = document.getElementById('background');
            bgHoverElement = document.getElementById('background-hover');
            EventBus.$on(MessageTypeEnum.BACKGROUND, e => {
                switch (e.message) {
                    case BackgroundMessage.CHANGE_LOCKED:
                        this.handleBackgroundLock(e.value, e.url);
                        return;
                    case BackgroundMessage.CHANGE_BACKGROUND:
                        this.changeBackground(e);
                        return;
                    case BackgroundMessage.THEME_RESET:
                    case BackgroundMessage.TYPE_CHANGED:
                        this.getBg(true);
                }
            });

            window.snowFlakes = storage.get('snowflakes') && new window.Snowflakes({
                color: '#fffafa', // Default: "#5ECDEF"
                container: document.querySelector('.util-overlay'),
                maxOpacity: 0.95,
                minSize: 10,
                maxSize: 14,
                rotation: false,
                zIndex: 1
            });
            this.getBg();
        },
        methods: {
            lockFadeInOut(isLocked) {
                clearTimeout(LockShowTimeout);
                this.showLock = true;
                this.lockStatus = isLocked;
                LockShowTimeout = setTimeout(() => {
                    this.showLock = false;
                    LockShowTimeout = 0;
                }, 3000);
            },
            changeBackground(data) {
                if (data.url) {
                    const image = new Image();
                    image.src = data.url;
                    image.onload = () => {
                        bgHoverElement.style.opacity = '1';
                        bgHoverElement.style.backgroundImage = 'url(' + data.url + ')';
                    };
                } else {
                    bgHoverElement.style.opacity = '0';
                }
            },
            handleBackgroundLock(isLocked, url) {
                // expect URL only when isLocked is true
                if (isLocked && !url) {
                    return;
                }
                const self = this;
                if (isLocked) {
                    bgHoverElement.style.opacity = '0';
                    bgUtil.cacheBackground(url, (isCached) => {
                        EventBus.$emit(MessageTypeEnum.HISTORY, {
                            message: HistoryMessage.LOCK_COMPLETE,
                            url: isCached && url
                        });
                        if (isCached) {
                            self.miscSettings.background.isLocked = true;
                            self.miscSettings.background.lockedUrl = url;
                            self.getBg();
                            self.lockFadeInOut(isLocked);
                        }
                    });
                } else {
                    bgHoverElement.style.opacity = '0';
                    self.miscSettings.background.isLocked = false;
                    self.miscSettings.background.lockedUrl = '';
                    bgUtil.removeBackgroundCache();
                    self.lockFadeInOut(isLocked);
                }
            },
            getAllBackgrounds(theme) {
                const currentPage = storage.get(constants.STORAGE.CURRENT_PAGE);
                const localBgData = storage.get(theme.value);
                const storedBg = bgData.stored[theme.id];
                // If page number is 1, we add stored background first and then shows the backgrounds from URLS
                return currentPage && currentPage[theme.value] && currentPage[theme.value] > 1 && localBgData
                    ? localBgData
                    : Object.assign({}, storedBg, localBgData);
            },
            getBg(reset) {
                // Handling a case when wallpaper is locked and available in local storage
                if (this.miscSettings.background.isLocked) {
                    this.loadLockedBackground();
                }
                // In case wallpaper is not locked, we check if wallpaper a default one
                else if (this.settings && this.settings.type !== 'custom') {
                    this.getBackground(reset);
                } else {
                    this.loadCustomBackground(reset);
                }
                this.backgroundType = this.settings.type;
            },
            loadLockedBackground() {
                chrome.storage.local.get(STORAGE.BACKGROUND_LOCKED, backgroundString => {
                    if (backgroundString) {
                        bgUtil.setBackgroundWallpaper(backgroundString[STORAGE.BACKGROUND_LOCKED]);
                    } else {
                        bgUtil.removeBackgroundCache();
                        this.miscSettings.background.isLocked = false;
                    }
                });
                this.$emit('stopLoading');
            },
            getBackground: function(reset) {
                if (reset && this.themeId === this.settings.themeId && this.backgroundType === this.settings.type) {
                    return;
                }
                const theme = bgUtil.getCurrentTheme(this.settings.themeId);
                this.themeVal = theme.value;
                const localBgData = storage.get(theme.value);
                this.bgSeen = storage.get('bg-seen-' + theme.value) || [];
                const allBackgrounds = this.getAllBackgrounds(theme);
                const bgKeys = Object.keys(allBackgrounds);
                this.allBackgrounds = allBackgrounds;
                this.bgKeys = bgKeys;
                this.themeId = theme.id;

                if (navigator.onLine) {
                    chrome.runtime.sendMessage({query: 'log', value: 'GetBackground Called ' + theme.id});
                    let i = 0;
                    // Finding the background which is not seen before
                    for (; i < bgKeys.length; i++) {
                        if (this.bgSeen.indexOf(bgKeys[i]) === -1) {
                            this.bgIndex = i;
                            this.loadBackground();
                            break;
                        }
                    }
                    // If no local background data of the theme is found or if background list has less than equal to 2 background left,
                    // we call for entire new list of background data from API
                    if (!localBgData || i >= (bgKeys.length - 2)) {
                        chrome.runtime.sendMessage(
                            {query: 'log', value: 'No Local Storage Found for theme ' + theme.id});
                        chrome.runtime.sendMessage({query: 'getBackground', theme, newPage: true});
                    }
                    // This is a safe check if user is not able to download latest background, we show default background to user
                    if (i >= bgKeys.length) {
                        bgElement.style.backgroundImage = 'url(' + this.getDefaultBg() + ')';
                        this.$emit('stopLoading');
                    }
                } else {
                    bgElement.style.backgroundImage = 'url(' + this.getDefaultBg() + ')';
                    this.$emit('stopLoading');
                }
            },
            loadCustomBackground(reset) {
                // this check is required to make sure to not change custom wallpaper when type is not changed
                if (reset && this.backgroundType === this.settings.type) {
                    return;
                }
                const customBackgrounds = storage.get(constants.STORAGE.BACKGROUND_CUSTOM);
                let customSeenBgIndex = storage.get(constants.STORAGE.BACKGROUND_SEEN_CUSTOM);
                // because customSeenBgIndex can be 0 , so strict checking
                customSeenBgIndex = customSeenBgIndex === null ? -1 : customSeenBgIndex;
                this.isLoading();
                this.defaultImageLoaded = false;

                if (!customBackgrounds || customBackgrounds.length < 1) {
                    // console.log("no custom backgrounds");
                    this.defaultImageLoaded = true;
                    bgElement.style.backgroundImage = 'url(' + this.getDefaultBg() + ')';
                    this.$emit('stopLoading');
                    this.markCustomBgSeen(customSeenBgIndex);
                    return;
                }

                // to increment index from stored index value or default value
                if (customSeenBgIndex === customBackgrounds.length - 1) {
                    customSeenBgIndex = 0;
                } else {
                    customSeenBgIndex++;
                }

                const currentUrl = customBackgrounds[customSeenBgIndex];

                chrome.runtime.sendMessage({
                    query: 'loadCurrentCustomBackground',
                    url: currentUrl
                }, (responseURL) => {
                    if (responseURL) {
                        // console.log("background loaded in time");
                        this.defaultImageLoaded = false;
                        bgElement.style.backgroundImage = 'url(' + currentUrl + ')';
                        bgUtil.addToHistory(customSeenBgIndex + '^custom', currentUrl, {type: this.settings.type});
                        if (customBackgrounds.length > 1) {
                            let nextUrlIndex = customSeenBgIndex === (customBackgrounds.length - 1)
                                ? 0
                                : customSeenBgIndex + 1;
                            let nextUrl = customBackgrounds[nextUrlIndex];
                            chrome.runtime.sendMessage({query: 'loadNextBackground', url: nextUrl});
                        }
                    } else {
                        // console.log("background not loaded in time");
                        this.defaultImageLoaded = true;
                        bgElement.style.backgroundImage = 'url(' + this.getDefaultBg() + ')';
                    }
                    this.$emit('stopLoading');
                    this.markCustomBgSeen(customSeenBgIndex);
                });

            },
            loadBackground() {
                // This method loads predefined backgrounds
                chrome.runtime.sendMessage({query: 'log', value: 'Load Background Called'});
                this.isLoading();
                this.defaultImageLoaded = false;
                let i = this.bgIndex;
                let currentUrl = bgUtil.formImgURL(this.allBackgrounds[this.bgKeys[i]], this.bgKeys[i]);
                chrome.runtime.sendMessage({query: 'loadCurrentBackground', url: currentUrl}, (responseURL) => {
                    if (responseURL) {
                        this.defaultImageLoaded = false;
                        bgElement.style.backgroundImage = 'url(' + currentUrl + ')';
                        chrome.runtime.sendMessage({query: 'log', value: 'Current URL ' + currentUrl});
                        this.$emit('stopLoading');
                        const nextUrl = bgUtil.formImgURL(this.allBackgrounds[this.bgKeys[i + 1]], this.bgKeys[i + 1]);
                        chrome.runtime.sendMessage({query: 'log', value: 'Next URL ' + nextUrl});
                        chrome.runtime.sendMessage({query: 'loadNextBackground', url: nextUrl});
                        bgUtil.addToHistory(this.bgKeys[i], this.allBackgrounds[this.bgKeys[i]],
                            {type: this.settings.type, theme: this.themeVal});
                    } else {
                        this.defaultImageLoaded = true;
                        bgElement.style.backgroundImage = 'url(' + this.getDefaultBg() + ')';
                        chrome.runtime.sendMessage({query: 'log', value: 'Default URL' + this.settings.themeId});
                        this.$emit('stopLoading');
                    }
                    this.markBgSeen(this.bgKeys[i]);
                });
            },
            resetBackgroundTheme() {
                // this is valid only for predefined wallpapers
                this.getBackground(true);
                chrome.runtime.sendMessage({query: 'setTabsCount', value: 0});
            },
            isLoading() {
                this.$emit('startLoading');
            },
            markBgSeen(id) {
                chrome.runtime.sendMessage({query: 'getTabsCount'}, (tabs) => {
                    // to prevent change on refresh;
                    if (!tabs) {
                        return;
                    }
                    if (this.settings.changeLocked) {
                        return;
                    }
                    if (tabs % this.settings.changeInterval === 0 && !this.defaultImageLoaded) {
                        this.bgSeen = bgUtil.updateBgSeen(id, this.themeVal, this.bgSeen);
                    } else if (this.defaultImageLoaded) {
                        chrome.runtime.sendMessage({query: 'setTabsCount', value: parseInt(tabs) - 1});
                    }
                });
            },
            getDefaultBg() {
                let counter = 0;
                let value = Math.random();
                let themeId = this.settings.themeId;
                counter = value < 0.33 ? 0 : counter = value < 0.66 ? 1 : 2;
                if (this.settings) {
                    this.$ga.event('background', 'default', this.settings.type, this.settings.changeInterval);
                }
                chrome.runtime.sendMessage({query: 'log', value: 'getDefaultBg Called with counter, ' + counter});
                return bgData.stored[themeId][1 + (themeId - 1) * 3 + counter];
            },
            markCustomBgSeen(index) {
                chrome.runtime.sendMessage({query: 'getTabsCount'}, (tabs) => {
                    // to prevent change on refresh;
                    if (!tabs) {
                        return;
                    }
                    if (tabs % this.settings.changeInterval === 0 && !this.defaultImageLoaded) {
                        storage.set(constants.STORAGE.BACKGROUND_SEEN_CUSTOM, index);
                    } else if (this.defaultImageLoaded) {
                        chrome.runtime.sendMessage({query: 'setTabsCount', value: parseInt(tabs) - 1});
                    }
                });
            }
        }
    };
    export default backgroundVue;
</script>
<style scoped>
    @keyframes fade {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .fade {
        animation: fade 0.6s ease-in-out;
    }

    @keyframes unlock-circle {
        0% {
            bottom: 200px;
        }
        25% {
            bottom: 200px;
        }
        50% {
            bottom: 150px;
        }
        100% {
            bottom: 150px;
        }
    }

    .lock-wrapper {
        height: 300px;
        width: 300px;
        position: absolute;
        z-index: 3;
        left: calc(50% - 150px);
        top: calc(50% - 150px);
        opacity: 0.7;
    }

    .lock-base {
        background-color: #ecf0f1;
        width: 200px;
        height: 170px;
        border-radius: 30px;
        margin: 0 auto;
        position: relative;
        top: 100px;
        z-index: 100;
    }

    .base-bottom {
        border: 10px solid #ecf0f1;
        width: 200px;
        height: 85px;
        border-radius: 0 0 30px 30px;
        top: 85px;
        position: relative;
        opacity: 0.4;
    }

    .lock-upper {
        position: relative;
        bottom: 200px;
    }

    .lock-upper-lock {
        animation: unlock-circle 2s;
        bottom: 150px;
    }

    .lock-upper-unlock {
        animation: unlock-circle 2s;
        animation-direction: reverse;
    }

    .lock-upper-round {
        height: 100px;
        width: 110px;
        border-radius: 45px 45px 0 0;
        z-index: 10;
        border-top: 20px solid #ecf0f1;
        position: relative;
        margin: 0 auto;
        border-left: 20px solid #ecf0f1;
        border-right: 20px solid #ecf0f1;
    }

    .lock-upper-left {
        height: 50px;
        width: 110px;
        z-index: 10;
        border-left: 20px solid #ecf0f1;
        position: relative;
        margin: 0 auto;
    }

    .lock-inside-top {
        width: 50px;
        height: 50px;
        border-radius: 50px;
        background-color: #bdc3c7;
        z-index: 300;
        position: relative;
        bottom: 45px;
        left: 75px;
    }

    .lock-inside-bottom {
        width: 30px;
        height: 80px;
        background-color: #bdc3c7;
        z-index: 300;
        position: relative;
        bottom: 85px;
        left: 85px;
    }

    .lock-status {
        position: relative;
        bottom: 41px;
        color: #fff;
        text-align: center;
    }
</style>