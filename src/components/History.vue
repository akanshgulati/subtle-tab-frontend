<template>
    <div id="history" class="ph-10" @mousedown.stop="" @click.stop="">
        <header class="flex flex-justify-space-between pv-5">
            <span class="font-small semi-bold" style="margin-left: 1.6vw;">Recent Wallpapers (H)</span>
            <div>
                <svg @click.stop="close" class="pointer" width="1.2em" height="1.2em" viewBox="0 0 12 12">
                    <g fill-rule="nonzero"
                       fill="#000">
                        <path
                            d="M6,0 C2.69169231,0 0,2.69146154 0,6 C0,9.30853846 2.69169231,12 6,12 C9.30830769,12 12,9.30853846 12,6 C12,2.69146154 9.30830769,0 6,0 Z M6,11.5384615 C2.94623077,11.5384615 0.461538462,9.05376923 0.461538462,6 C0.461538462,2.94623077 2.94623077,0.461538462 6,0.461538462 C9.05376923,0.461538462 11.5384615,2.94623077 11.5384615,6 C11.5384615,9.05376923 9.05376923,11.5384615 6,11.5384615 Z"
                            id="Shape"></path>
                        <path
                            d="M8.24007692,3.75992308 C8.14984615,3.66969231 8.004,3.66969231 7.91376923,3.75992308 L6,5.67369231 L4.08623077,3.75992308 C3.996,3.66969231 3.85015385,3.66969231 3.75992308,3.75992308 C3.66969231,3.85015385 3.66969231,3.996 3.75992308,4.08623077 L5.67369231,6 L3.75992308,7.91376923 C3.66969231,8.004 3.66969231,8.14984615 3.75992308,8.24007692 C3.80492308,8.28507692 3.864,8.30769231 3.92307692,8.30769231 C3.98215385,8.30769231 4.04123077,8.28507692 4.08623077,8.24007692 L6,6.32630769 L7.91376923,8.24007692 C7.95876923,8.28507692 8.01784615,8.30769231 8.07692308,8.30769231 C8.136,8.30769231 8.19507692,8.28507692 8.24007692,8.24007692 C8.33030769,8.14984615 8.33030769,8.004 8.24007692,7.91376923 L6.32630769,6 L8.24007692,4.08623077 C8.33030769,3.996 8.33030769,3.85015385 8.24007692,3.75992308 Z"
                            id="Shape"></path>
                    </g>
                </svg>
            </div>
        </header>
        <section class="pb-5 flex flex-center" id="history-thumbs" :class="{'no-history': currentUrls.length <= 6}">
            <div class="change-list flex-no-shrink pointer" @click.stop="prev()"
                 :class="{'opacity-0 disable-pointer': startIndex === 0}">
                <svg width="100%" viewBox="0 0 11 20" id="prev-arrow">
                    <use xlink:href="#icon-next-arrow"></use>
                </svg>
            </div>
            <div class="flex flex-center flex-grow-1" :class="{'flex-justify-space-between': isAllUrlsPresent}">
                <Thumbnail v-for="(url, index) in currentUrls" :url="url"
                           :key="index" class="thumbnail" v-on:toggleLock="toggleLock"
                           v-on:changeBackground="onChangeBackground" :isLocked="isLocked(url)" :isLocking="isLocking"/>
            </div>
            <div class="change-list flex-no-shrink pointer" @click.stop="next()"
                 :class="{'opacity-0 disable-pointer': !isNextVisible}">
                <svg width="100%" viewBox="0 0 11 20" id="next-arrow">
                    <use xlink:href="#icon-next-arrow"></use>
                </svg>
            </div>
        </section>
    </div>
</template>
<script>
    import Thumbnail from '../shared/Thumbnail.vue'

    import {AppMessage, MessageTypeEnum, BackgroundMessage, HistoryMessage} from '../constants/Message';
    import {EventBus} from '../utils/EventBus';
    import {Get, Remove, Set} from '../utils/storage';
    import {STORAGE} from '../utils/Constants';
    import bgUtil from '../utils/bgUtil'
    import _debounce from '../utils/debounce'
    import config from '../utils/config'

    const SHOW_MAX_THUMB = 8;
    const miscSettings = Get(STORAGE.MISC_SETTINGS);
    export default {
        data() {
            return {
                startIndex: 0,
                urlsData: [],
                lockedUrl: (miscSettings && miscSettings.background.lockedUrl) || '',
                isLocking: false
            }
        },
        mounted() {
            const historyData = Get(STORAGE.BACKGROUND_HISTORY_DATA);
            const historyIds = Get(STORAGE.BACKGROUND_HISTORY);
            if (!historyIds || !historyData || historyIds.length !== Object.keys(historyData).length) {
                this.resetHistory();
            }
            this.urlsData = historyIds.map(id => {
                let obj = {};
                obj.id = id;
                if (historyData[id].url.indexOf('http') === -1) {
                    obj.thumb = bgUtil.formImgURL(historyData[id].url, id, true);
                    obj.original = bgUtil.formImgURL(historyData[id].url, id);
                } else {
                    obj.thumb = obj.original = historyData[id].url;
                }
                return obj;
            });
            if (this.lockedUrl) {
                const lockedUrlDataIndex = this.urlsData.findIndex(data => data.original === this.lockedUrl);
                this.startIndex = parseInt(lockedUrlDataIndex / SHOW_MAX_THUMB, 10);
            }
            // Listen to events for successfully stopping locking
            EventBus.$on(MessageTypeEnum.HISTORY, (e) => {
                switch (e.message) {
                    case HistoryMessage.LOCK_COMPLETE:
                        this.isLocking = false;
                        this.lockedUrl = e.url;
                }
            });
        },
        computed: {
            isAllUrlsPresent() {
                return this.currentUrls.length === SHOW_MAX_THUMB;
            },
            currentUrls() {
                return this.urls.slice(this.startIndex * SHOW_MAX_THUMB,
                    this.startIndex * SHOW_MAX_THUMB + SHOW_MAX_THUMB);
            },
            isNextVisible() {
                return (this.urls.length / SHOW_MAX_THUMB - this.startIndex) > 1;
            },
            urls() {
                return this.urlsData.map(data => data.thumb);
            }
        },
        methods: {
            resetHistory() {
                miscSettings.background = config.misc.background;
                Set(STORAGE.MISC_SETTINGS, miscSettings);
                Remove(STORAGE.BACKGROUND_HISTORY);
                Remove(STORAGE.BACKGROUND_HISTORY_DATA);
            },
            isLocked(url) {
                const index = this.urls.indexOf(url);
                return this.lockedUrl === this.urlsData[index].original;
            },
            close() {
                EventBus.$emit(MessageTypeEnum.APP, {message: AppMessage.TOGGLE_HISTORY, value: false});
            },
            next() {
                this.startIndex++;
            },
            prev() {
                this.startIndex--;
            },
            toggleLock(data) {
                if (!data || this.isLocking) {
                    return;
                }
                const urlIndex = this.urls.indexOf(data.url);
                if (urlIndex === -1) {
                    return;
                }
                this.isLocking = data.value;
                this.lockedUrl = '';
                EventBus.$emit(MessageTypeEnum.BACKGROUND, {
                    message: BackgroundMessage.CHANGE_LOCKED,
                    value: data.value,
                    url: this.urlsData[urlIndex].original,
                    id: this.urlsData[urlIndex].id
                });
            },
            onChangeBackground(data) {
                this.changeBackground(data, this);
            },
            changeBackground: _debounce((data, self) => {
                if (!data) {
                    EventBus.$emit(MessageTypeEnum.BACKGROUND, {
                        message: BackgroundMessage.CHANGE_BACKGROUND
                    });
                    return;
                }
                const urlIndex = self.urls.indexOf(data.url);
                if (urlIndex === -1) {
                    return;
                }
                EventBus.$emit(MessageTypeEnum.BACKGROUND, {
                    message: BackgroundMessage.CHANGE_BACKGROUND,
                    url: self.urlsData[urlIndex].original
                });
            }, 2000)
        },
        components: {
            Thumbnail
        }
    }
</script>