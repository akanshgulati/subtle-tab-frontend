<template>
    <div class="flex flex-justify-center flex-center ml-20 fade_in" v-if="infoReceived">
        <a class="photo-details" :href="url" target="_blank">
            <span class="photo-location">{{area}}</span>
            <span class="photo-user" v-if="user">By {{user.split(' ')[0]}}</span>
        </a>
    </div>
</template>
<script>
    import {EventBus} from "../utils/EventBus";
    import {BackgroundInfoMessage, MessageTypeEnum} from "../constants/Message";

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
                // console.log("Bg Info", info);

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

    .photo-details {
        font-size: 0.9rem;
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