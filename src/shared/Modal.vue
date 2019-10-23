<template>
    <div id="modal" v-if="isVisible" class="fade_in" @click="onClose">
        <div class="modal-content" @keydown.stop="" @click.stop="">
            <div class="modal-header font-medium semi-bold">
                <span>{{this.isEditMode ? "Edit" : "Add"}} Link</span>
                <svg viewBox="0 0 12 12" width="1em" height="1em" style="float: right; margin-right: -10px;"
                     class="pointer" @click.stop="onClose">
                    <use xlink:href="#icon-close"></use>
                </svg>
            </div>
            <section class="modal-form">
                <div class="form-item mt-10">
                    <label for="name">URL</label>
                    <input type="url" id="url" placeholder="https://example.com"
                           @paste="onPaste"
                           @focusin="onFocusURL"
                           @focusout="onBlurURL"
                           v-model="url">
                    <transition>
                        <small class="error" v-if="error.url">{{error.url}}</small>
                        <small class="warning" v-if="URLWarning">{{URLWarning}}</small>
                    </transition>
                </div>
                <div class="form-item mt-10">
                    <label for="name">NAME</label>
                    <input type="text" id="name" placeholder="Example title" v-model="title">
                    <div class="suggestion font-light-black">
                        <transition>
                            <small v-show="suggestion.title" class="fade_in">
                                <span class="semi-bold">Suggestion: </span>
                                <span class="suggestion-title"
                                      @click.stop="onSuggestionClick">{{suggestion.title}}</span>
                            </small>
                        </transition>
                    </div>
                </div>
            </section>
            <section class="modal-control">
                <Button v-if="!isEditMode" text="Add another" class="semi-bold font-small"
                        size="medium" v-on:clicked="onSubmit(true)" :is-disabled="isAddButtonDisabled"></Button>
                <Button v-if="isEditMode" text="Delete" class="semi-bold font-small"
                        size="medium" v-on:clicked="onRemove()"></Button>
                <Button :text="isEditMode ? 'Update': 'Add'" class="modal-button semi-bold font-small" type="green"
                        :is-disabled="isAddButtonDisabled"
                        v-on:clicked="onSubmit"></Button>
            </section>
        </div>
    </div>
</template>
<script>
    import Button from './Button.vue'
    import {EventBus} from "../utils/EventBus";
    import {BookmarkMessage, MessageTypeEnum, ModalMessage} from "../constants/Message";
    import {Http, isChromeInternalURL, isFirefoxInternalURL, isValidURL} from "../utils/common";
    import _debounce from '../utils/throttle'

    const FaviconBaseURL = "http://proxy.duckduckgo.com/ip3/";
    export default {
        mounted() {
            EventBus.$on(MessageTypeEnum.MODAL, e => {
                this.isEditMode = false;
                switch (e.action) {
                    case ModalMessage.OPEN:
                        this.isVisible = true;
                        if (e.item) {
                            this.isEditMode = true;
                            this.url = e.item.url;
                            this.favicon = e.item.icon;
                            this.title = e.item.title;
                        } else {
                            this.reset();
                        }
                        break;
                    case ModalMessage.CLOSE:
                        this.isVisible = false;
                        break;
                }
            });
            this.reset();
        },
        methods: {
            onPaste(e) {
                console.log("on paste", e);
                this.$set(this, "url", e.clipboardData.getData('text'));
                return true;
            },
            onClose() {
                this.isVisible = false;
                this.reset();
            },
            onFocusURL() {
                console.log("on focus on url");
                this.suggestion = {};
            },
            reset() {
                this.title = '';
                this.url = '';
                this.suggestion = {};
                this.error = {};
                this.favicon = '';
                this.URLWarning = ''
            },
            onSubmit(stayOpen) {
                console.log("BOOKMARK SUBMIT");
                this.checkURLError();
                if (this.error.url) {
                    return;
                }

                if (this.isEditMode) {
                    EventBus.$emit(MessageTypeEnum.BOOKMARK, {
                        action: BookmarkMessage.UPDATE,
                        title: this.title,
                        url: this.url,
                        icon: this.suggestion.favicon || this.favicon
                    });
                    this.reset();
                    this.isVisible = false;
                    return;
                }
                EventBus.$emit(MessageTypeEnum.BOOKMARK, {
                    action: BookmarkMessage.ADD,
                    title: this.title,
                    url: this.url,
                    icon: this.suggestion.favicon || this.favicon
                });
                this.reset();
                this.isVisible = stayOpen;
            },
            onRemove() {
                EventBus.$emit(MessageTypeEnum.BOOKMARK, {
                    action: BookmarkMessage.DELETE
                });
                this.reset();
                this.isVisible = false;
            },
            getDefaultFavicon() {
                if (this.isChromeURL) {
                    return FaviconBaseURL + "google.com/chrome.ico"
                }
                if (this.isFirefoxURL) {
                    return FaviconBaseURL + "mozilla.org/en-GB/firefox.ico"
                }
                if (isValidURL(this.url)) {
                    return FaviconBaseURL + this.parsedURL.hostname + this.parsedURL.pathname.replace(/\/$/, "") + ".ico";
                }
                return "./images/default-bookmark-icon.png"
            },
            onBlurURL() {
                console.log("URL BLUR");
                this.url = this.url.trim();
                if (this.isURLEmpty) {
                    return;
                }
                this.favicon = this.getDefaultFavicon();
                this.preloadIcon(this.favicon);
                this.fetchTitleAndIcon();
                this.checkURLWarning();
            },
            preloadIcon(url) {
                try {
                    const image = new Image();
                    image.src = url;
                } catch (e) {
                }
            },
            fetchTitleAndIcon() {
                if (this.isChromeURL || this.isFirefoxURL || !this.parsedURL) {
                    return;
                }
                this.isLoading = true;
                console.log("fetchTitleAndIcon => ", this.parsedURL);

                if (this.url.indexOf('http') === -1) {
                    this.url = 'http://' + this.url;
                }
                Http(`https://api.subtletab.com/bookmark/?url=${this.url}`).then(response => {
                    this.isLoading = false;
                    this.$set(this.suggestion, "title", response.title);
                    this.isLoading = false;

                    if (response.favicon) {
                        this.$set(this.suggestion, "favicon", response.favicon);
                        this.preloadIcon(response.favicon);
                    }
                }, () => {
                    this.isLoading = false;
                });
            },
            onSuggestionClick() {
                this.title = this.suggestion.title;
            },
            checkURLWarning() {
                if (!this.parsedURL) {
                    this.URLWarning = "Warning:  Invalid URL";
                } else {
                    this.URLWarning = "";
                }
            },
            checkURLError(self) {
                self = self || this;
                if (self.url.trim().length === 0) {
                    self.error.url = `URL is required`;
                    return true;
                }
                self.error.url = ""
            }
        },
        computed: {
            isInvalidUrl() {
                return !isValidURL(this.url);
            },
            parsedURL() {
                try {
                    const url = this.url.indexOf('http') === -1 ? 'http://' + this.url : this.url;
                    console.log("ParsedURl", new URL(url));
                    return new URL(url);
                } catch (e) {
                    return null;
                }
            },
            isChromeURL() {
                return this.parsedURL && this.parsedURL.protocol === "chrome:"
            },
            isFirefoxURL() {
                return this.parsedURL && this.parsedURL.protocol === "about:"
            },
            isAddButtonDisabled() {
                return this.isURLEmpty;
            },
            isURLEmpty() {
                return this.url.length === 0 || this.url === "http://" || this.url === "https://";
            }
        },
        data() {
            return {
                isVisible: false,
                title: '',
                url: '',
                suggestion: {},
                error: {},
                URLWarning: '',
                isEditMode: false,
                isLoading: false
            }
        },
        components: {
            Button
        },
        beforeDestroy() {
            this.reset();
        }
    }
</script>
<style scoped>
    #modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.1);
    }

    .modal-content {
        background-color: white;
        position: absolute;
        top: 25%;
        right: calc(50% - 250px);
        border-radius: 5px;
        box-shadow: 0 5px 3px 3px rgba(0, 0, 0, 0.1);
        padding: 10px 20px;
        width: 500px;
    }

    .modal-control {
        float: right;
        margin-top: 20px;
    }

    .modal-button {
        /*background-color: #7ab800 !important;*/
        /*color: white !important;*/
        padding: 5px 25px !important;
        height: auto !important;
        border-radius: 2px;
    }

    .form-item input {
        margin-bottom: 0;
        border-bottom: 1px solid rgba(158, 158, 158, 0.5);
        padding-left: 0 !important;
    }

    .suggestion, .error {
        min-height: 15px;
    }

    .warning {
        color: orange;
    }

    .suggestion-title {
        text-decoration: underline;
        cursor: pointer;
    }

    ::-webkit-input-placeholder {
        color: #999
    }
</style>