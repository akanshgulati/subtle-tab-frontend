<template>
    <div>
        <div class="util-overlay"></div>
        <div id="background"></div>
        <!--<div id="background-hidden" :style=" { 'background-image': 'url(' + nextUrl + ')'}"></div>-->
    </div>
</template>

<script>
    import bgUtil from '../utils/bgUtil'
    import bgData from '../utils/backgroundData'
    import storage from '../utils/storage'
    let bgElement;

    let backgroundVue = {
        beforeCreate(){
            this.bgSeen = storage.get('bg-seen') || [];
        },
        data () {
            return {
                showBackground: false,
                bgSeen : this.bgSeen,
                tabSwitchCount: this.settings.changeInterval,
                themeId: '',
                defaultImageLoaded: false,
                bgIndex: 0,
                allBackgrounds: null,
                bgKeys: null
            }
        },
        props: ['settings'],
        mounted(){
            bgElement = document.getElementById('background');
            this.getBackground();
        },
        methods: {
            getBackground: function (reset) {
                debugger;
                if(reset && this.themeId === this.settings.themeId){
                    return;
                }
                const theme = bgUtil.getCurrentTheme(this.settings.themeId);
                const localBgData = storage.get(theme.value);
                const storedBg = bgData.stored[theme.id];

                const allBackgrounds = Object.assign({}, storedBg, localBgData);
                const bgKeys = Object.keys(allBackgrounds);

                this.allBackgrounds = allBackgrounds;
                this.bgKeys = bgKeys;
                this.themeId = theme.id;

                if (navigator.onLine) {
                    chrome.runtime.sendMessage({query: 'log', value: 'GetBackgorund Called '+ theme.id});
                    let i = 0;
                    for (; i < bgKeys.length; i++) {
                        if (this.bgSeen.indexOf(bgKeys[i]) === -1) {
                            this.bgIndex = i;
                            this.loadBackground();
                            break;
                        }
                    }

                    if (!localBgData || i === (bgKeys.length - 2)) {
                        chrome.runtime.sendMessage({query: 'log', value: 'No Local Storage Found for theme '+ theme.id});
                        chrome.runtime.sendMessage({query: 'getBackground', theme, newPage: true});
                    }
                    else if (i >= bgKeys.length) {
                        chrome.runtime.sendMessage({query: 'getBackground', theme, newPage: false});
                        bgElement.style.backgroundImage = 'url(' + this.getDefaultBg() + ')';
                    }

                } else {
                    bgElement.style.backgroundImage = 'url(' + this.getDefaultBg() + ')';
                }
            },
            loadBackground(){
                chrome.runtime.sendMessage({query: 'log', value: 'Load Background Called'});
                debugger;
                this.isLoading();

                this.defaultImageLoaded = false;
                let i = this.bgIndex;

                let currentUrl = bgUtil.formImgURL(this.allBackgrounds[this.bgKeys[i]], this.bgKeys[i]);


                chrome.runtime.sendMessage({query: 'loadCurrentBackground', url: currentUrl}, (responseURL) =>{
                    if(responseURL){
                        this.defaultImageLoaded = false;
                        bgElement.style.backgroundImage = 'url(' + currentUrl + ')';
                        chrome.runtime.sendMessage({query: 'log', value: 'Current URL' + currentUrl});
                        this.$emit('stopLoading');
                        let nextUrl = bgUtil.formImgURL(this.allBackgrounds[this.bgKeys[i + 1]], this.bgKeys[i + 1]);
                        chrome.runtime.sendMessage({query: 'log', value: 'Next URL' + nextUrl});
                        chrome.runtime.sendMessage({query: 'loadNextBackground', url: nextUrl});
                    }else{
                        this.defaultImageLoaded = true;
                        bgElement.style.backgroundImage = 'url(' + this.getDefaultBg() + ')';
                        chrome.runtime.sendMessage({query: 'log', value: 'Default URL'+ this.settings.themeId});
                        this.$emit('stopLoading');
                        chrome.runtime.sendMessage({query: 'setTabsCount', value: 'decrement'});
                    }
                    this.markBgSeen(this.bgKeys[i]);
                });
            },
            resetBackgroundTheme(){
                this.getBackground(true);
                chrome.runtime.sendMessage({query: 'setTabsCount', value: 0});
            },
            isLoading(){
                this.$emit('startLoading');
            },
            markBgSeen(id){
                chrome.runtime.sendMessage({query: 'getTabsCount'}, (tabs) => {
                    if (tabs % this.settings.changeInterval === 0 && !this.defaultImageLoaded) {
                        this.bgSeen.push(id);
                        storage.set('bg-seen', this.bgSeen);
                    }
                    else if (this.defaultImageLoaded) {
                        chrome.runtime.sendMessage({query: 'setTabsCount', value: parseInt(tabs) - 1});
                    }

                });
            },
            getDefaultBg(){
                let counter = 0;
                let value = Math.random();
                let themeId = this.settings.themeId;
                counter = value < 0.33 ? 0 : counter = value < 0.66 ? 1 : 2;
                chrome.runtime.sendMessage({query: 'log', value: 'getDefaultBg Called with counter, ' + counter});
                return bgData.stored[themeId][1 + (themeId - 1) * 3 + counter];
            }
        },
        watch: {
            settings: {
                handler: function(){
                    chrome.runtime.sendMessage({query: 'log', value: 'Reset Called'});
                    this.resetBackgroundTheme();
                },
                deep: true
            }
        }
    };
    export default backgroundVue;
</script>

<style>

</style>