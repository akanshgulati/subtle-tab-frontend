<template>
    <div>
        <!--<div class="loading" :class="{ 'show-loading': isLoading}"></div>-->
        <div class="util-overlay"></div>
        <div id="background"></div>
        <!--<bgimage :url="url" :isLoading="isLoading" v-on:bgLoaded="isBgLoaded"></bgimage>-->
        <div id="background-hidden" :style=" { 'background-image': 'url(' + nextUrl + ')'}"></div>
    </div>
</template>

<script>
    import Bgimage from './bgimage.vue'
    import bgUtil from '../utils/bgUtil'
    import bgData from '../utils/backgroundData'
    import storage from '../utils/storage'

    let backgroundVue = {
        beforeCreate(){
            this.backgroundJS = chrome.extension.getBackgroundPage();
            this.bgTabsCount = this.backgroundJS.getTabsCount() || 0;
            this.bgSeen = storage.get('bg-seen') || [];
        },
        data () {
            return {
                url:'',
                nextUrl:'',
                showBackground: false,
                tabsCount: this.bgTabsCount,
                backgroundJS : this.backgroundJS,
                bgSeen : this.bgSeen,
                tabSwitchCount: this.settings.changeInterval,
                themeId: this.settings.themeId
            }
        },
        props: ['settings'],
        mounted(){
            this.getBackgroundURL();
        },
        methods: {
            getBackgroundURL: function (reset) {
                const self = this;
                const theme = bgUtil.getCurrentTheme(this.settings.themeId);
                const localBgData = storage.get(theme.value);

                if (navigator.onLine) {

                    let storedBg = bgData.stored[theme.value];
                    let localBg = storage.get(theme.value);
                    const allBackgrounds = Object.assign({}, storedBg, localBg);
                    const bgKeys = Object.keys(allBackgrounds);

                    let i;

                    if(bgKeys.length > 0) {
                        for (i = 0; i < (bgKeys.length - 1); i++) {
                            if (this.bgSeen.indexOf(bgKeys[i]) === -1) {
                                self.url = bgUtil.formImgURL(allBackgrounds[bgKeys[i]], bgKeys[i]);
                                self.nextUrl = bgUtil.formImgURL(allBackgrounds[bgKeys[i + 1]], bgKeys[i + 1]);
                                this.markBgSeen(bgKeys[i]);
                                break;
                            }
                        }
                    }else{
                        this.isLoading();
                        this.backgroundJS.getBackground(theme, self.getBackgroundURL);
                        return;
                    }
                    // Case when installing extension initially or bg data gets empty in localstorage.
                    if(!localBgData || (i && i >= (bgKeys.length - 1))){
                        this.backgroundJS.getBackground(theme);
                    }
                    // Case when no unique background is found.
                    else if((typeof localBgData === 'object' && Object.keys(localBgData).length === 0)) {
                        this.backgroundJS.getBackground(theme, self.getBackgroundURL);
                    }
                } else {
                    self.url = 'images/backgrounds/1.jpg';
                    self.nextUrl= 'images/backgrounds/2.jpg';
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
                if(this.bgTabsCount % this.settings.changeInterval === 0) {
                    this.bgSeen.push(id);
                    storage.set('bg-seen', this.bgSeen);
                }

            }
        },
        beforeUpdated(){
            debugger;
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
                    let imageLoaded = false;
                    this.isLoading();
                    let bgElement = document.getElementById('background');
                    let img = new Image();
                    img.src = newValue;
                    img.onload = function () {
                        bgElement.style.backgroundImage = 'url(' + newValue + ')';
                        imageLoaded = true;
                        this.$emit('stopLoading');
                    }.bind(this);
                    setTimeout(()=>{
                        if(!imageLoaded) {
                            bgElement.style.backgroundImage = 'url(./images/backgrounds/2.jpg)';
                            this.$emit('stopLoading');
                        }
                    }, 3000);

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