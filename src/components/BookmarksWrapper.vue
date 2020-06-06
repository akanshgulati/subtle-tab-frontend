<template>
    <div id="bookmarks-wrapper" class="flex flex-center">
        <div class="bookmark-items flex flex-center">
            <BookmarkItem @onDotClick="onDotClick" @onRightClick="onRightClick" v-for="(item, index) in bookmarks"
                          :item="item" :index="index" :key="index + item.title"/>
        </div>
        <div id="add-bookmark" @click.stop="onAddClick">+</div>
    </div>
</template>
<script>
    import BookmarkItem from './BookmarkItem.vue';
    import Button from '../shared/Button.vue';
    import {EventBus} from "../utils/EventBus";
    import {MessageTypeEnum, BookmarkMessage, ContextMenuMessage, ModalMessage, AppMessage} from "../constants/Message";
    import {Get, Set} from "../utils/storage";
    import {STORAGE} from "../utils/Constants";

    export default {
        beforeCreate() {
            // Todo :: handle firefox case here
            this.defaultBookmarks = [
                {
                    title: 'Apps',
                    icon: 'http://proxy.duckduckgo.com/ip3/www.google.com/chrome.ico',
                    url: 'chrome://apps'
                },
                {
                    title: 'Settings',
                    icon: 'http://proxy.duckduckgo.com/ip3/www.google.com/chrome.ico',
                    url: 'chrome://settings'
                },
                {
                    title: 'Search',
                    icon: 'http://proxy.duckduckgo.com/ip3/www.google.com.ico',
                    url: 'https://google.com/',
                },
                {
                    title: 'Wikipedia',
                    icon: 'http://proxy.duckduckgo.com/ip3/www.wikipedia.org.ico',
                    url: 'https://www.wikipedia.org/'
                },
                {
                    title: 'Youtube',
                    icon: 'http://proxy.duckduckgo.com/ip3/www.youtube.com.ico',
                    url: 'https://www.youtube.com'
                },
                {
                    title: 'Netflix',
                    icon: 'http://proxy.duckduckgo.com/ip3/www.netflix.com.ico',
                    url: 'https://netflix.com/',
                },
                {
                    title: 'Pinterest',
                    icon: 'http://proxy.duckduckgo.com/ip3/pinterest.com/.ico',
                    url: 'https://www.pinterest.com/'
                },
                {
                    title: 'Twitter',
                    icon: 'http://proxy.duckduckgo.com/ip3/twitter.com/.ico',
                    url: 'https://www.twitter.com/'
                }
            ];
            this.localBookmarks = Get(STORAGE.BOOKMARKS);
            this.finalBookmarks = this.localBookmarks && this.localBookmarks.length ? this.localBookmarks : this.defaultBookmarks;
            // console.log("Final Bookmarks", this.finalBookmarks);
        },
        mounted() {
            EventBus.$on(MessageTypeEnum.BOOKMARK, (e) => {
                switch (e.action) {
                    case BookmarkMessage.UPDATE:
                        if (e.title && e.icon && e.url  && this.bookmarks[this.editIndex]) {
                            var obj = {
                                title: e.title,
                                icon: e.icon,
                                url: e.url
                            };
                            this.$ga.event('bookmarks', 'update');
                            this.bookmarks.splice(this.editIndex, 1, obj);
                            this.editIndex = this.rightClickIndex = -1;
                            Set(STORAGE.BOOKMARKS, this.bookmarks);
                        }
                        break;
                    case BookmarkMessage.ADD:
                        var obj = e;
                        delete obj.action;
                        if (!this.bookmarks || !this.bookmarks.length) {
                            this.bookmarks = [];
                        }
                        this.bookmarks.push(obj);
                        this.$ga.event('bookmarks', 'add');
                        Set(STORAGE.BOOKMARKS, this.bookmarks);
                        break;
                    case BookmarkMessage.DELETE:
                        if (this.bookmarks[this.editIndex]) {
                            this.bookmarks.splice(this.editIndex, 1);
                            this.editIndex = this.rightClickIndex = -1;
                            this.$ga.event('bookmarks', 'delete');
                            Set(STORAGE.BOOKMARKS, this.bookmarks);
                        }
                        break;
                    case BookmarkMessage.EDIT:
                        // this message is coming from context menu
                        this.onEdit(this.rightClickIndex);
                        break;
                    case BookmarkMessage.OPEN_NEW_TAB:
                        chrome.tabs.create({url: this.bookmarks[this.rightClickIndex].url});
                        break;
                    case BookmarkMessage.HIDE_BAR:
                        if (confirm("Are you sure you want to disable bookmarks bar? You can enable it again from customize menu.")) {
                            EventBus.$emit(MessageTypeEnum.APP, {message: AppMessage.HIDE_BOOKMARKS});
                        }
                        break;
                }
            });
        },
        data() {
            return {
                bookmarks: this.finalBookmarks
            }
        },
        methods: {
            onRightClick(e, index) {
                this.rightClickIndex = this.editIndex = index;
                e.preventDefault();
                EventBus.$emit(MessageTypeEnum.CONTEXT_MENU, {
                    action: ContextMenuMessage.OPEN,
                    event: e
                });
                this.$ga.event('bookmarks', 'right-clicked');
            },
            onEdit(index) {
                this.editIndex = index;
                EventBus.$emit(MessageTypeEnum.MODAL, {action: ModalMessage.OPEN, item: this.bookmarks[index]});
            },
            onDotClick(index) {
                this.$ga.event('bookmarks', 'three-dots-clicked');
                this.onEdit(index);
            },
            onAddClick() {
                this.editIndex = -1;
                EventBus.$emit(MessageTypeEnum.MODAL, {action: ModalMessage.OPEN});
            }
        },
        components: {
            BookmarkItem,
            Button
        }
    }
</script>
<style>
    #bookmarks-wrapper {
        align-items: flex-start;
        max-width: 70%;
        min-width: 65rem;
        justify-content: center;
    }
    .bookmark-items {
        /*max-width: 50rem;*/
        /*min-width: 300px;*/
        max-width: 100%;
        /*min-width: 65rem;*/
        align-items: flex-start;
    }
    #add-bookmark {
        height: 2.6rem;
        width: 2.6rem;
        text-align: center;
        line-height: 2.6rem;
        font-weight: 300;
        font-size: 1.9rem !important;
        color: #828282;
        border-radius: 5px;
        background-color: rgba(255,255,255, 0.8);
        box-shadow: 0px 2px 3px 0 rgba(0, 0, 0, 0.1);
        flex-shrink: 0;
    }
</style>