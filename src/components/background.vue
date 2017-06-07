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
                tabSwitchCount: 3
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

                this.isLoading();
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
                    }
                    //TODO: Check for more backgrounds
                    if(!localBgData || i >= (bgKeys.length - 1)) {
                        this.backgroundJS.getBackground(theme);
                    }
                } else {
                    self.url = 'images/backgrounds/1.jpg';
                    self.nextUrl= 'images/backgrounds/2.jpg';
                }
            },
            resetBackgroundTheme(){
                const theme = bgUtil.getCurrentTheme(this.settings.themeId);
                const localBgData = storage.get(theme.value);
                let self = this;
                this.isLoading();
                debugger;
                if (!localBgData) {
                    this.backgroundJS.getBackground(theme, self.getBackgroundURL);
                } else {
                    self.getBackgroundURL();
                }
            },
            isLoading(){
                this.$emit('startLoading');
            },
            markBgSeen(id){
                if(this.bgTabsCount % 3 === 0) {
                    this.bgSeen.push(id);
                    storage.set('bg-seen', this.bgSeen);
                }

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
                handler: function (newValue) {
                    if (!newValue) {
                        return;
                    }
                    let bgElement = document.getElementById('background');
                    let img = new Image();
                    img.src = newValue;
                    img.onload = function () {
                        bgElement.style.backgroundImage = 'url(' + newValue + ')';
                        this.$emit('stopLoading');
                    }.bind(this);

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