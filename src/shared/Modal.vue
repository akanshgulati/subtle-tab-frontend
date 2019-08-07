<template>
    <div id="modal" v-if="isVisible" class="fade_in"  @click="isVisible = false">
        <div class="modal-content" draggable="true" @keydown.stop="" @click.stop="">
            <div class="modal-header font-medium semi-bold">
                <span>Add New Link</span>
                <svg viewBox="0 0 12 12" width="1em" height="1em" style="float: right; margin-right: -10px;"
                     class="pointer" @click.stop="onClose">
                    <use xlink:href="#icon-close"></use>
                </svg>
            </div>
            <section class="modal-form">
                <div class="form-item mt-10">
                    <label for="name">URL</label>
                    <input type="url" id="url" placeholder="https://example.com"
                           @focusin="suggestion = {}"
                           @blur="onURLEntered" v-model="url">
                    <small class="error">{{error.url}}</small>
                </div>
                <div class="form-item mt-10">
                    <label for="name">NAME</label>
                    <input type="text" id="name" placeholder="google search" v-model="title">
                    <div class="suggestion font-light-black">
                        <small v-if="suggestion.title" class="fade_in">
                            <span class="semi-bold">Suggestion: </span>
                            <span class="suggestion-title" @click.stop="onSuggestionClick">{{suggestion.title}}</span>
                        </small>
                    </div>
                </div>
            </section>
            <section class="modal-control">
                <Button v-if="!isEditMode" text="Add another" class="semi-bold font-small"
                        size="medium" v-on:clicked="onSubmit(true)"></Button>
                <Button v-if="isEditMode" text="Delete" class="semi-bold font-small"
                        size="medium" v-on:clicked="onRemove()"></Button>
                <Button :text="isEditMode ? 'Update': 'Add'" class="modal-button semi-bold font-small"
                        v-on:clicked="onSubmit"></Button>
            </section>
        </div>
    </div>
</template>
<script>
    import Button from './Button.vue'
    import {EventBus} from "../utils/EventBus";
    import {BookmarkMessage, MessageTypeEnum, ModalMessage} from "../constants/Message";
    import {Http, isValidURL} from "../utils/common";

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
                            this.icon = e.item.icon;
                            this.title = e.item.title;
                        }
                        break;
                    case ModalMessage.CLOSE:
                        this.isVisible = false;
                        break;
                }
            });
        },
        methods: {
            onClose() {
                this.isVisible = false;
            },
            reset(){
                this.title = '';
                this.url = '';
                this.suggestion = {};
                this.error = {};
            },
            onSubmit(stayOpen) {
                if (this.error.url) {
                    return;
                }
                if (this.isEditMode) {
                    EventBus.$emit(MessageTypeEnum.BOOKMARK, {
                        action: BookmarkMessage.EDIT,
                        title: this.title,
                        url: this.url,
                        icon: this.suggestion.favicon || this.icon
                    });
                    this.reset();
                    this.isVisible = false;
                    return;
                }
                EventBus.$emit(MessageTypeEnum.BOOKMARK, {
                    action: BookmarkMessage.ADD,
                    title: this.title,
                    url: this.url,
                    icon: this.suggestion.favicon
                });
                this.reset();
                this.isVisible = stayOpen;
            },
            onRemove(){
                EventBus.$emit(MessageTypeEnum.BOOKMARK, {
                    action: BookmarkMessage.DELETE
                });
                this.reset();
                this.isVisible = false;
            },
            onURLEntered(e){
                if (!this.url || !isValidURL(this.url)) {
                    this.error.url = 'Invalid url format, e.g. https://example.com';
                    return;
                }
                this.error.url = null;
                Http(`http://localhost:8080/bookmark/?url=${this.url}`).then(response => {
                    this.suggestion = response;
                    if (response.favicon) {
                        const image = new Image();
                        image.src = response.favicon;
                    }
                });
            },
            onSuggestionClick() {
                this.title = this.suggestion.title;
            }
        },
        data() {
            return {
                isVisible: false,
                title: '',
                url: '',
                suggestion: {},
                error: {},
                isEditMode: false
            }
        },
        components: {
            Button
        }
    }
</script>
<style>
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
        background-color: #7ab800 !important;
        color: white !important;
        padding: 5px 25px !important;
        height: auto !important;
        border-radius: 2px;
    }

    .form-item input {
        margin-bottom: 0;
        border-bottom: 1px solid rgba(158, 158, 158, 0.5);
    }

    .suggestion, .error {
        min-height: 15px;
    }
    .suggestion-title {
        text-decoration: underline;
    }
</style>