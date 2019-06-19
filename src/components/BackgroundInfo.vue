<template>
    <div class="flex flex-justify-center flex-center ml-20 fade_in" v-if="infoReceived">
            <!--<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                    d="M12 2c2.131 0 4 1.73 4 3.702 0 2.05-1.714 4.941-4 8.561-2.286-3.62-4-6.511-4-8.561 0-1.972 1.869-3.702 4-3.702zm0-2c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm4 14.5c0 .828-1.79 1.5-4 1.5s-4-.672-4-1.5 1.79-1.5 4-1.5 4 .672 4 1.5z"/>
            </svg>-->
<!--        <svg class="location-icon" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">-->
<!--            <path-->
<!--                d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602"/>-->
<!--        </svg>-->
        <a class="photo-details" :href="url" target="_blank">
            <span class="photo-location">{{area}}</span>
            <span class="photo-user">By {{user.split(' ')[0]}}</span>
        </a>

    </div>
</template>
<script>
    import {Get} from '../utils/storage'
    import {EventBus} from "../utils/EventBus";
    import {BackgroundInfoMessage, MessageTypeEnum} from "../constants/Message";
    import backgroundData from '../utils/backgroundData'
    import bgUtil from '../utils/bgUtil'

    export default {
        data(){
          return {
              area: '',
              user: '',
              url: '',
              infoReceived: false
          }
        },
        methods: {
            updateInfo(info) {
                console.log("Bg Info", info);

                if (info.isHidden) {
                    this.area = '';
                    this.url = '';
                    this.user = '';
                    return;
                }


                if (info && Object.keys(info).length > 0) {
                    this.url = info.url;
                    this.area = info.area;
                    this.user = info.user;
                }

                // const wallpaperId = event.id;
                // const themeVal = event.themeValue;
                // const backgroundDetails = Get(themeVal + "_details");
                //
                // console.log(event);
                //
                // if (event.isHidden) {
                //     this.location = '';
                //     this.url = '';
                //     this.user = '';
                //     return;
                // }

                // var obj = {
                //     wallpaperId: event.wallpaperId,
                //     themeValue: event.themeValue,
                //     url: event.url,
                // };

                // If image is the default one
                // if (event.currentUrl.indexOf('http') === -1) {
                //     const backgroundDetail = backgroundData.storedDetails[wallpaperId];
                //     if (backgroundDetail) {
                //         this.location = backgroundDetail.location;
                //         this.url = backgroundDetail.url;
                //         this.user = backgroundDetail.user;
                //     }
                // }
                // // if image is loaded from server
                // else if (backgroundDetails && backgroundDetails[wallpaperId]) {
                //
                //     const backgroundDetail = backgroundDetails[wallpaperId];
                //     this.location = decodeURIComponent(backgroundDetail.location);
                //     this.url = "https://unsplash.com/photos/" + decodeURIComponent(backgroundDetail.id);
                //     this.user = decodeURIComponent(backgroundDetail.user);
                //
                // }

                // const info = bgUtil.getBackgroundInfo(event);
                //
                // this.location = info.location || '';
                // this.url = info.url || '';
                // this.user = info.user || '';
                //
                // console.log("BgInfo", info);
            }
        },
        mounted(){
            EventBus.$on(MessageTypeEnum.BACKGROUND_INFO, e => {
                switch (e.message) {
                    case BackgroundInfoMessage.WALLPAPER_CHANGED:
                        this.updateInfo(e);
                        this.infoReceived = true;
                }
            })
        }

    }
</script>

<style scoped>
    .location-icon{
        width: 2rem;
        height: 2rem;
        fill: #d6d6d6
    }

    /*.photo-details {*/
    /*    font-size: 1rem;*/
    /*    background: rgba(255, 255, 255, 0.85);*/
    /*    padding: 5px;*/
    /*    border-radius: 5px;*/
    /*}*/
    .photo-details {
        font-size: 0.9rem;
        /*border: 1px solid rgba(255, 255, 255, 0.85);*/
        background: rgba(0, 0, 0, 0.1);
        padding: 5px;
        border-radius: 5px;
        color: white;
    }

    .photo-location {
        font-weight: 500;
    }

    .photo-user {
        color: white;
        font-size: 0.7rem;
    }
</style>