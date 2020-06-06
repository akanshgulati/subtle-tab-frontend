<template>
    <div class="flex flex-justify-center flex-center ml-20 fade_in" v-if="infoReceived">
        <a class="photo-details" :href="url" target="_blank" @click="onBgInfoClick">
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
            onBgInfoClick(){
                this.$ga.event('bgInfo', 'clicked');
            },
            updateInfo(info) {
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
        text-align: center;
    }

    .photo-location {
        font-weight: 500;
    }

    .photo-user {
        color: white;
        font-size: 0.7rem;
    }
</style>