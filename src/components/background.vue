<template>
    <div>
        <transition name="background-fade">
            <div id="background" :style=" { 'background-image': 'url(' + url + ')'}" v-if="showBackground" class="fade_in"></div>
        </transition>
        <div id="background-hidden" :style=" { 'background-image': 'url(' + nextUrl + ')'}"></div>
    </div>
</template>

<script>
    import bgUtil from '../utils/bgUtil'
    import backgroundData from '../utils/backgroundData'

    let backgroundVue = {
        beforeCreate(){
            this.backgroundJS = chrome.extension.getBackgroundPage();
            debugger;
            this.bgTabsCount = this.backgroundJS.getTabsCount() || 0;
        },
        data () {
            return {
                url: 'images/backgrounds/1.jpg',
                nextUrl: 'images/backgrounds/2.jpg',
                showBackground: false,
                tabsCount: this.bgTabsCount,
                backgroundJS : this.backgroundJS
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
                const localBgData = localStorage.getItem('bgData') && JSON.parse(localStorage.getItem('bgData'));
                const theme = backgroundData.getCurrentTheme(this.settings.themeId);

                if (navigator.onLine) {
                    let currentUrlCount;
                    currentUrlCount = parseInt(self.tabsCount / tabSwitchCount, 10);
                    //TODO: Check for more backgrounds
                    if ((!localBgData && self.tabsCount < 25) || reset) {
                        bgUtil.getWallpaper(theme.value, function (bgData) {
                            bgData = bgUtil.getFormattedJSON(bgData);
                            self.url = bgData[currentUrlCount];
                            self.nextUrl = bgData[currentUrlCount + 1];
                            self.showBackground = true;
                            localStorage.setItem('bgData', JSON.stringify(bgData));
                        });
                    } else if (self.tabsCount >= 25) {
                        localStorage.removeItem('bgData');
                        this.backgroundJS.setTabsCount(0);
                        self.tabsCount = 0;
                        currentUrlCount = parseInt(self.tabsCount / tabSwitchCount, 10);
                        bgUtil.getWallpaper(theme.value, function (bgData) {
                            bgData = bgUtil.getFormattedJSON(bgData);
                            self.url = bgData[currentUrlCount];
                            self.nextUrl = bgData[currentUrlCount + 1];
                            self.showBackground = true;
                            localStorage.setItem('bgData', JSON.stringify(bgData));
                        });
                    } else {
                        self.url = localBgData[currentUrlCount];
                        self.nextUrl = localBgData[currentUrlCount + 1];
                        self.showBackground = true;
                    }
                } else {
                    self.showBackground = true;
                }
            }
        },
        watch: {
            settings: {
                handler: function(newValue){
                    debugger;
                    this.showBackground = false;
                    this.backgroundJS.setTabsCount(0);
                    this.tabsCount = 0;
                    this.getBackgroundURL(true);
                },
                deep: true
            }
        }
    };
    export default backgroundVue;
</script>

<style>

</style>