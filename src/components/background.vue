<template>
    <div>
        <div class="util-overlay"></div>
        <div id="background"></div>
        <div id="background-hidden" :style=" { 'background-image': 'url(' + nextUrl + ')'}"></div>
    </div>
</template>

<script>
    import bgUtil from '../utils/bgUtil'
    import bgData from '../utils/backgroundData'
    import storage from '../utils/storage'

    let backgroundVue = {
        beforeCreate(){
            //this.backgroundJS = chrome.extension.getBackgroundPage();
            //this.bgTabsCount = this.backgroundJS.getTabsCount() || 0;
            this.bgSeen = storage.get('bg-seen') || [];
        },
        data () {
            return {
                url:'',
                nextUrl:'',
                showBackground: false,
                bgSeen : this.bgSeen,
                tabSwitchCount: this.settings.changeInterval,
                themeId: this.settings.themeId,
                defaultImageLoaded: false
            }
        },
        props: ['settings'],
        mounted(){
            this.getBackgroundURL();
        },
        methods: {
            getBackgroundURL: function (updateNextURLOnly) {
                const self = this;
                const theme = bgUtil.getCurrentTheme(this.settings.themeId);
                const localBgData = storage.get(theme.value);

                if (navigator.onLine) {

                    let storedBg = bgData.stored[this.settings.themeId];
                    let localBg = storage.get(theme.value);
                    const allBackgrounds = Object.assign({}, storedBg, localBg);
                    const bgKeys = Object.keys(allBackgrounds);

                    let i = 0;
                    if(!updateNextURLOnly) {
                        for (; i < (bgKeys.length - 1); i++) {
                            if (this.bgSeen.indexOf(bgKeys[i]) === -1) {
                                this.url = bgUtil.formImgURL(allBackgrounds[bgKeys[i]], bgKeys[i]);
                                chrome.runtime.sendMessage({query: 'loadBackground', url: bgUtil.formImgURL(allBackgrounds[bgKeys[i + 1]], bgKeys[i + 1])});
                                //this.nextUrl = bgUtil.formImgURL(allBackgrounds[bgKeys[i + 1]], bgKeys[i + 1]);
                                this.markBgSeen(bgKeys[i]);
                                break;
                            }
                        }
                    }
                    // This is just when we have to load a new background on localbackground update.
                    else{
                        chrome.runtime.sendMessage({query: 'loadBackground', url: bgUtil.formImgURL(allBackgrounds[bgKeys[2]], bgKeys[2])});
                        //this.nextUrl = bgUtil.formImgURL(allBackgrounds[bgKeys[2]], bgKeys[2]);
                    }

                    // Case when installing extension initially or bg data gets empty in localstorage.
                    if(!localBgData){
                        chrome.runtime.sendMessage({query:'getBackground', theme});
                        //this.backgroundJS.getBackground(theme);
                    }else if(i && i >= (bgKeys.length - 1)){
                        this.url = bgUtil.formImgURL(allBackgrounds[bgKeys[bgKeys.length - 1]], bgKeys[bgKeys.length - 1]);
                        chrome.runtime.sendMessage({query:'getBackground', theme}, ()=>{
                            this.getBackgroundURL(true);
                        });
                    }

                } else {
                    self.url = bgData.stored[1][1];
                    self.nextUrl= bgData.stored[1][2];
                }
            },
            resetBackgroundTheme(){
                const theme = bgUtil.getCurrentTheme(this.settings.themeId);
                const localBgData = storage.get(theme.value);

                if (localBgData && typeof localBgData === 'object' && Object.keys(localBgData).length === 0) {
                    this.backgroundJS.getBackground(theme, this.getBackgroundURL);
                } else {
                    this.getBackgroundURL();
                }
            },
            isLoading(){
                this.$emit('startLoading');
            },
            markBgSeen(id){
                chrome.runtime.sendMessage({query: 'getTabsCount'}, (tabs) => {
                    if (tabs % this.settings.changeInterval === 0 && !this.defaultImageLoaded) {
                        this.bgSeen.push(id);
                        storage.set('bg-seen', this.bgSeen);
                    } else if (this.defaultImageLoaded) {
                        chrome.runtime.sendMessage({query: 'setTabsCount', value: parseInt(tabs) - 1});
                    }

                });
            },
            getDefaultBg(){
                 return bgData.stored[this.settings.themeId][1];
            }
        },
        watch: {
            settings: {
                handler: function(){
                    this.resetBackgroundTheme();
                },
                deep: true
            },
            url: {
                handler: function (newValue, oldValue) {
                    if (newValue === oldValue) {
                        return;
                    }
                    let self = this;
                    this.defaultImageLoaded = false;
                    this.isLoading();
                    let bgElement = document.getElementById('background');
                    let img = new Image();
                    img.src = newValue;
                    img.onload = ()=>{
                        if(!this.defaultImageLoaded) {
                            clearTimeout(defaultImageTimeout);
                            bgElement.style.backgroundImage = 'url(' + newValue + ')';
                            this.$emit('stopLoading');
                        }
                    };
                    let defaultImageTimeout = setTimeout(()=>{
                        if(!this.defaultImageLoaded) {
                            //this.nextUrl = newValue;
                            chrome.runtime.sendMessage({query: 'loadBackground', url: newValue});
                            this.defaultImageLoaded = true;
                            bgElement.style.backgroundImage = 'url(' + self.getDefaultBg() + ')';
                            this.$emit('stopLoading');
                        }
                    }, 2500);

                }
            }
        },
        components: {

        }
    };
    export default backgroundVue;
</script>

<style>

</style>