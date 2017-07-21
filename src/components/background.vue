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
    import constants from '../utils/Constants'
    let bgElement;

    let backgroundVue = {
        beforeCreate(){
            //this.bgSeen = storage.get('bg-seen') || [];
        },
        data () {
            return {
                showBackground: false,
                bgSeen : '',
                tabsCount: '',
                themeId: '',
                defaultImageLoaded: false,
                bgIndex: 0,
                allBackgrounds: null,
                bgKeys: null,
                themeVal: ''
            }
        },
        props: ['settings'],
        mounted(){
            bgElement = document.getElementById('background');
            this.getBackground();
        },
        methods: {
            getAllBackgrounds(theme){
                let currentPage = storage.get(constants.STORAGE.CURRENT_PAGE);
                const localBgData = storage.get(theme.value);
                const storedBg = bgData.stored[theme.id];
                 currentPage && currentPage[theme.value] && currentPage[theme.value] > 1 && (localBgData ? localBgData : Object.assign({}, storedBg, localBgData));
            },
            getBackground: function (reset) {
                if(reset && this.themeId === this.settings.themeId){
                    return;
                }
                const theme = bgUtil.getCurrentTheme(this.settings.themeId);
                this.themeVal = theme.value;
                const localBgData = storage.get(theme.value);
                this.bgSeen = storage.get('bg-seen-'+ theme.value) || [];
                const allBackgrounds = this.getAllBackgrounds(theme);
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

                    if (!localBgData || i >= (bgKeys.length - 2)) {
                        chrome.runtime.sendMessage({query: 'log', value: 'No Local Storage Found for theme '+ theme.id});
                        chrome.runtime.sendMessage({query: 'getBackground', theme, newPage: true});
                    }

                    if (i >= bgKeys.length) {
                        bgElement.style.backgroundImage = 'url(' + this.getDefaultBg() + ')';
                        this.$emit('stopLoading');
                    }

                } else {
                    bgElement.style.backgroundImage = 'url(' + this.getDefaultBg() + ')';
                    this.$emit('stopLoading');
                }
            },
            loadBackground(){
                chrome.runtime.sendMessage({query: 'log', value: 'Load Background Called'});
                this.isLoading();
                this.defaultImageLoaded = false;
                let i = this.bgIndex;
                let currentUrl = bgUtil.formImgURL(this.allBackgrounds[this.bgKeys[i]], this.bgKeys[i]);
                chrome.runtime.sendMessage({query: 'loadCurrentBackground', url: currentUrl}, (responseURL) =>{
                    if(responseURL){
                        this.defaultImageLoaded = false;
                        bgElement.style.backgroundImage = 'url(' + currentUrl + ')';
                        chrome.runtime.sendMessage({query: 'log', value: 'Current URL ' + currentUrl});
                        this.$emit('stopLoading');
                        let nextUrl = bgUtil.formImgURL(this.allBackgrounds[this.bgKeys[i + 1]], this.bgKeys[i + 1]);
                        chrome.runtime.sendMessage({query: 'log', value: 'Next URL ' + nextUrl});
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
                    // to prevent change on refresh;
                    if(!tabs){
                        return;
                    }
                    if (tabs % this.settings.changeInterval === 0 && !this.defaultImageLoaded) {
                        this.bgSeen.push(id);
                        storage.set('bg-seen-' + this.themeVal, this.bgSeen);
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