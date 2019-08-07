<template>
    <div id="bookmarks-wrapper" class="flex flex-center">
        <div class="bookmark-items flex flex-center" @contextmenu.prevent="onRightClick">
            <BookmarkItem @onDotClick="onDotClick" v-for="(item, index) in bookmarks" :item="item" :index="index"/>
        </div>
        <div id="add-bookmark" @click.stop="onAddClick">+</div>
    </div>
</template>
<script>
    import BookmarkItem from './BookmarkItem.vue';
    import Button from '../shared/Button.vue';
    import {EventBus} from "../utils/EventBus";
    import {MessageTypeEnum, BookmarkMessage, ContextMenuMessage, ModalMessage} from "../constants/Message";
    import {Get, Set} from "../utils/storage";
    import {STORAGE} from "../utils/Constants";

    export default {
        beforeCreate() {
            debugger;
            this.defaultBookmarks = [
                {
                    title: 'Chrome Apps',
                    icon: 'http://proxy.duckduckgo.com/ip3/www.google.com/chrome.ico',
                    url: 'chrome://apps'
                },
                {
                    title: 'Google Search',
                    icon: 'http://proxy.duckduckgo.com/ip3/www.google.com.ico',
                    url: 'https://google.com/',
                },
                {
                    title: 'Wikipedia',
                    icon: 'http://proxy.duckduckgo.com/ip3/www.wikipedia.org.ico',
                    url: 'https://www.wikipedia.org/'
                }
            ];
        },
        mounted(){
            EventBus.$on(MessageTypeEnum.BOOKMARK, (e) => {
                console.log("Bookmark message", e);
                switch (e.action) {
                    case BookmarkMessage.EDIT:
                        if (e.title && e.icon && e.url) {
                            var obj = {
                                title: e.title,
                                icon: e.icon,
                                url: e.url
                            };
                            this.bookmarks.splice(this.editIndex, 1, obj);
                            Set(STORAGE.BOOKMARKS, this.bookmarks);
                        }
                        break;
                    case BookmarkMessage.ADD:
                        var obj = e;
                        delete obj.action;
                        this.bookmarks.push(obj);
                        Set(STORAGE.BOOKMARKS, this.bookmarks);
                        break;
                    case BookmarkMessage.DELETE:
                        this.bookmarks.splice(this.editIndex, 1);
                        Set(STORAGE.BOOKMARKS, this.bookmarks);
                        break;
                }
            });
        },
        data() {
            debugger;
            return {
                bookmarks: Get(STORAGE.BOOKMARKS) || this.defaultBookmarks
            }
        },
        methods: {
            onRightClick(e) {
                e.preventDefault();
                EventBus.$emit(MessageTypeEnum.CONTEXT_MENU, {
                    action: ContextMenuMessage.OPEN,
                    event: e
                });
            },
            onDotClick(index) {
                this.editIndex = index;
                EventBus.$emit(MessageTypeEnum.MODAL, {action: ModalMessage.OPEN, item: this.bookmarks[index]});
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
    }
    .bookmark-items {
        /*max-width: 50rem;*/
        /*min-width: 300px;*/
        max-width: 100%;
        min-width: 65rem;
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
    }
</style>