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
                debugger;
                const self = this;
                const bgCount = 10;
                const theme = bgUtil.getCurrentTheme(this.settings.themeId);
                const localBgData = storage.get('bg-' + theme.value);
                const maxBgCountAllowed = tabSwitchCount * (bgCount - 1);

                this.isLoading();
                if (navigator.onLine) {
                    let currentUrlCount;
                    currentUrlCount = parseInt(this.tabsCount / tabSwitchCount, 10);

                    //TODO: Check for more backgrounds
                    if(!localBgData && settings.theme.id === 1){
                        let i;
                        for (i = 0; i < bgData.stored.length - 2; i++) {
                            if(this.bgSeen.indexOf(bgData.stored[i]) === -1) {
                                self.url = bgData.stored[i];
                                self.nextUrl = bgData.stored[i+1];
                                break;
                            }
                        }
                        self.url = bgData.stored[i];
                        self.nextUrl = bgData.stored[i+1];
                        this.markBgSeen(i);
                    }else if(localBgData && !reset){
                        // {id: {'string'}}
                        let bgKeys = Object.keys(localBgData);
                        for(let i = 0; i < bgKeys.length -1; i++){
                            if(this.bgSeen.indexOf(bgKeys[i]) === -1){
                                self.url = localBgData[bgKeys[i]];
                                self.nextUrl = localBgData[bgKeys[i + 1]];
                            }
                        }
                    }
                    if ((!localBgData || reset ) && self.tabsCount < maxBgCountAllowed) {
                        debugger;
                        bgUtil.getWallpaper(theme.value, function (bgData) {
                            bgData = bgUtil.getFormattedJSON(bgData);
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
                            self.url = bgData[currentUrlCount];
                            self.nextUrl = bgData[currentUrlCount + 1];
                            localStorage.setItem('bgData', JSON.stringify(bgData));
                        });
                    } else {
                        self.url = localBgData[currentUrlCount];
                        self.nextUrl = localBgData[currentUrlCount + 1];
                    }
                } else {
                    self.url = 'images/backgrounds/1.jpg';
                    self.nextUrl= 'images/backgrounds/2.jpg';
                }
            },
            isLoading(){
                this.$emit('startLoading');
            },
            markBgSeen(id){
                this.bgSeen.push(id);
                storage.append('bg-seen', id);
            }
        },
        watch: {
            settings: {
                handler: function(){
                    this.getBackgroundURL(true);
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