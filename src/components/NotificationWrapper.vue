<template>
    <div class="notification-wrapper" v-if="notificationObj">
        <transition name="slide-up">
            <Notification :data="notificationObj.data" v-show="show" :primary-click="primaryClick" :secondary-click="secondaryClick"></Notification>
        </transition>
    </div>
</template>
<script>
    const MAX_SHOW = 3;
    const ACTION_TYPE = {
        URL: "url",
        CLOSE: "close",
        REMIND: "remind",
    };
    import Notification from "./Notification.vue";
    import { Get, Set } from "../utils/storage";
    import { STORAGE } from "../utils/Constants";
    import Constants from "../utils/Constants";
    import CommonUtils, {Http} from "../utils/common";
    export default {
        created() {
          this.notificationObj = Get(STORAGE.NOTIFICATION);  
        },
        data() {
            return {
                notificationObj: {},
                show: false
            }
        },
        mounted() {
            setTimeout(() => {
                this.checkNotification();
                this.showNotification();
            }, 1000);
        },
        methods: {
            loadNotification(url) {
                chrome.runtime.sendMessage({
                    query: "loadMedia",
                    url: url
                });
            },
            showNotification() {
                if (!this.notificationObj || this.notificationObj.seen >= MAX_SHOW) {
                    return;
                }
                if (!this.notificationObj.loaded && this.notificationObj.data.media) {
                    this.loadNotification(this.notificationObj.data.media.url);
                    return;
                }
                this.notificationObj.seen++;
                Set(STORAGE.NOTIFICATION, this.notificationObj);
                setTimeout(() => {
                    this.$ga.event('app', 'notification', 'show', this.notificationObj.data.id);
                    this.show = true;
                }, 100);
            },
            checkNotification() {
                const now = +new Date();
                // checking only once in hour
                if (this.notificationObj && this.notificationObj.lastChecked && (now - this.notificationObj.lastChecked) < 3600000) {
                    return;
                }
                const URL = `${Constants.URL.NOTIFICATIONS}?platform=${CommonUtils.getBrowser()}`;
                Http(URL, {
                    method: 'GET'
                }).then(response => response.response).then(response => {
                    const obj = {
                        data: response
                    };
                    // same notification
                    if (this.notificationObj && this.notificationObj.data.id === response.id) {
                        return;
                    }
                    obj.lastChecked = +new Date();
                    obj.loaded = true;
                    obj.seen = 0;
                    Set(STORAGE.NOTIFICATION, obj);
                    // if (response.media && response.media.url) {
                    //     this.loadNotification(response.media.url);
                    // }
                });
            },
            markSeen(){
                this.notificationObj.seen = MAX_SHOW;
                this.show = false;
                Set(STORAGE.NOTIFICATION, this.notificationObj);
            },
            takeAction(obj) {
                switch (obj.type) {
                    case ACTION_TYPE.URL:
                        chrome.tabs.create(obj.url);
                        break;
                    case ACTION_TYPE.CLOSE:
                        this.markSeen();
                        break;
                }
            },
            primaryClick() {
                const primaryObj = this.notificationObj.data.action.primary;
                this.$ga.event('app', 'notification', 'primary', this.notificationObj.data.id);
                this.takeAction(primaryObj, "primary");
            },
            secondaryClick() {
                const secondaryObj = this.notificationObj.data.action.secondary;
                this.$ga.event('app', 'notification', 'secondary', this.notificationObj.data.id);
                this.takeAction(secondaryObj, "secondary");
            }
        },
        components: {
            Notification
        }
    }
</script>