<template>
    <div>
        <div class="loading" :class="{ 'show-loading': isLoading}"></div>
        <div class="util-overlay"></div>
        <bgimage :url="url" :isLoading="isLoading" v-on:bgLoaded="isBgLoaded"></bgimage>
        <div id="background-hidden" :style=" { 'background-image': 'url(' + nextUrl + ')'}"></div>
    </div>
</template>

<script>
    import Bgimage from './bgimage.vue'
    import bgUtil from '../utils/bgUtil'
    import backgroundData from '../utils/backgroundData'
    import storage from '../utils/storage'

    let backgroundVue = {
        beforeCreate(){
            this.backgroundJS = chrome.extension.getBackgroundPage();
            this.bgTabsCount = this.backgroundJS.getTabsCount() || 0;
            this.bgTabsCount = 0;
        },
        data () {
            return {
                url:'',
                nextUrl:'',
                showBackground: false,
                tabsCount: this.bgTabsCount,
                backgroundJS : this.backgroundJS,
                isLoading: true
            }
        },
        props: ['settings'],
        mounted(){
            this.getBackgroundURL();
        },
        methods: {
            getBackgroundURL: function (reset) {
                const self = this;
                const tabSwitchCount = 3;
                const bgCount = 10;
                const localBgData = storage.get('bgData');
                const theme = backgroundData.getCurrentTheme(this.settings.themeId);
                const maxBgCountAllowed = tabSwitchCount * (bgCount - 1);

                this.showBackground = false;

                if (navigator.onLine) {
                    let currentUrlCount;
                    currentUrlCount = parseInt(this.tabsCount / tabSwitchCount, 10);

                    //TODO: Check for more backgrounds
                    self.isLoading = true;
                    if ((!localBgData || reset ) && self.tabsCount < maxBgCountAllowed) {
                        debugger;
                        bgUtil.getWallpaper(theme.value, function (bgData) {
                            bgData = bgUtil.getFormattedJSON(bgData);
                            self.showBackground = true;
                            self.url = bgData[currentUrlCount];
                            self.nextUrl = bgData[currentUrlCount + 1];
                            storage.set('bgData', bgData);
                        });
                    } else if (self.tabsCount >= maxBgCountAllowed) {
                        this.backgroundJS.setTabsCount(0);
                        this.tabsCount = 0;
                        currentUrlCount = parseInt(this.tabsCount / tabSwitchCount, 10);
                        bgUtil.getWallpaper(theme.value, function (bgData) {
                            bgData = bgUtil.getFormattedJSON(bgData);
                            self.showBackground = true;
                            self.url = bgData[currentUrlCount];
                            self.nextUrl = bgData[currentUrlCount + 1];
                            localStorage.setItem('bgData', JSON.stringify(bgData));
                        });
                    } else {
                        self.showBackground = true;
                        self.url = localBgData[currentUrlCount];
                        self.nextUrl = localBgData[currentUrlCount + 1];
                    }
                } else {
                    self.showBackground = true;
                    self.url = 'images/backgrounds/1.jpg';
                    self.nextUrl= 'images/backgrounds/2.jpg';
                }
            },
            isBgLoaded : function(){
                this.isLoading = false;
                console.log('bg');
                this.$emit('loadUtils');
            }
        },
        watch: {
            settings: {
                handler: function(newValue){
                    this.showBackground = false;
                    this.getBackgroundURL(true);
                },
                deep: true
            }
        },
        components: {
            Bgimage
        }
    };
    export default backgroundVue;
</script>

<style>

</style>