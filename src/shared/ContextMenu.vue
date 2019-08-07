<template>
    <div id="context-menu" class="font-xsmall" ref="contextMenu">
        <ul class="mar-0" @click.stop="onClick" v-if="isVisible">
            <li v-for="item in json" :data-value="item.value"
                class="context-item pv-5 ph-10"
                :class="`${item.color}  ${item.separator ? 'separator': ''}`">
                {{item.label}}
            </li>
        </ul>
    </div>
</template>
<script>
    import {EventBus} from '../utils/EventBus';
    import {MessageTypeEnum, ContextMenuMessage} from '../constants/Message';

    export default {

        data() {
            return {
                isVisible: false,
                json: [{
                    label: 'Edit',
                    value: 'edit',
                    separator: true
                }, {
                    label: 'Open in new window',
                    value: 'new_window',
                }, {
                    label: 'Open in incognito',
                    value: 'new_incognito'
                }, {
                    label: 'Hide Bookmark',
                    value: 'hide_bookmark',
                    separator: true
                }, {
                    label: 'Remove',
                    value: 'remove',
                    color: 'text-red'
                }]
            }
        },
        mounted() {
            console.log("Called");

            EventBus.$on(MessageTypeEnum.CONTEXT_MENU, e => {
                console.log("Message on context menu ", e);
                switch (e.action) {
                    case ContextMenuMessage.OPEN:
                        this.isVisible = false;
                        this.position(e.event);
                        this.$nextTick(() => {
                            this.isVisible = true;
                        });
                        break;
                    case ContextMenuMessage.CLOSE:
                        this.isVisible = false;
                    default:
                        break;
                }
            });

            document.addEventListener('click',this.handleCloseListener, true);
        },
        methods: {
            handleCloseListener() {
                console.log("Close clicked");
                this.isVisible = false;
            },
            onClick(e) {
                EventBus.$emit(MessageTypeEnum.BOOKMARK, {
                    action: e.target.dataset.value,
                    event: e
                });
            },
            position($event) {
                const $menu = this.$refs.contextMenu;
                const Width = 180;
                const Height = 180;

                if ((Width + $event.pageX) >= window.innerWidth) {
                    $menu.style.left = ($event.pageX - Width + 2) + "px";
                } else {
                    $menu.style.left = $event.pageX + 2 + "px";
                }

                if ((Height + $event.pageY) >= window.innerHeight) {
                    $menu.style.top = ($event.pageY - Height + 2) + "px";
                } else {
                    $menu.style.top = $event.pageY + 2 + "px";
                }
            }
        },
        beforeDestroy() {
            document.removeEventListener('click', this.handleCloseListener);
        }
    }
</script>
<style scoped>
    #context-menu {
        background: #fff;
        min-width: 11rem;
        box-shadow: 0px 5px 7px 0 rgba(0, 0, 0, 0.2);
        position: absolute;
        top: 10%;
        left: 10%;
        border-radius: 5px;
        overflow: hidden;
    }

    .context-item {
        cursor: pointer;
        transition: all 0.1s ease-in;
    }

    .context-item.separator {
        border-bottom: 1px solid #e3e3e3;
    }

    .context-item:hover {
        background: #7ab800;
        color: white;
    }
</style>