<template>
    <div class="full-width" :class="{'sticky': isSticky, 'add-todo': !isEditMode}">
        <transition mode="out-in" name="fast-fade">
            <!--BUTTON SECTION-->
            <div class="flex flex-center semi-bold flex-justify-space-between" key="add" v-if="!isTodoEditing">
                <!-- ADD ITEM BUTTON -->
                <div @click="type" class="flex flex-center pointer">
                    <svg class="svg-blue-fill" focusable="false" xmlns="http://www.w3.org/2000/svg" width="18"
                         height="18" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                              d="M20 11h-7V4c0-.553-.447-1-1-1-.552 0-1 .447-1 1v7H4c-.552 0-1 .447-1 1 0 .553.448 1 1 1h7v7c0 .553.448 1 1 1 .553 0 1-.447 1-1v-7h7c.553 0 1-.447 1-1 0-.553-.447-1-1-1"></path>
                    </svg>
                    <span class="text-blue block text-block text-blue-underlined">Add todo</span>
                </div>
                <div @click="toggleCompleted" class="flex flex-center pointer" v-if="isCompletedEnabled">
                    <svg class="svg-fill-light-grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 507.289 507.289"
                         style="enable-background:new 0 0 507.289 507.289;" width="18" height="18">
                        <g>
                            <path
                                d="M153.712,375.691l-24,21.248c7.642,8.598,15.944,16.585,24.832,23.888l20.288-24.8     C167.265,389.818,160.203,383.018,153.712,375.691z"/>
                            <path
                                d="M122.176,326.187l-29.408,12.624c4.547,10.596,9.946,20.805,16.144,30.528l26.992-17.152     C130.64,343.901,126.049,335.207,122.176,326.187z"/>
                            <path
                                d="M399.595,66.763c-32.9-19.075-70.253-29.126-108.283-29.136C183.147,37.801,91.764,117.904,77.424,225.115l-54.8-54.8     L0,192.939l91.312,91.312l91.312-91.312L160,170.315l-49.488,49.424c18.803-99.758,114.916-165.384,214.674-146.581     S490.57,188.074,471.767,287.831S356.851,453.216,257.093,434.412c-20.449-3.854-40.095-11.153-58.101-21.586l-16.08,27.664     c103.202,59.835,235.37,24.679,295.205-78.523C537.953,258.766,502.797,126.598,399.595,66.763z"/>
                            <polygon
                                points="267.312,109.627 267.312,285.627 337.712,338.427 356.912,312.827 299.312,269.627 299.312,109.627"/>
                        </g>
                    </svg>
                    <transition mode="out-in" name="fast-fade">
                        <span class="text-light-grey block text-block font-xsmall"
                              v-if="showCompleted">Hide completed</span>
                        <span class="text-light-grey block text-block font-xsmall" v-else>Show completed</span>
                    </transition>
                </div>
            </div>

            <!--EDIT MODE -->
            <div class="flex flex-center" v-else key="edit">
                <button class="circle" title="Add todo">
                    <svg class="svg-fill-light-grey" focusable="false" xmlns="http://www.w3.org/2000/svg" width="18"
                         height="18" viewBox="0 0 24 24">
                        <g fill-rule="evenodd">
                            <path
                                d="M3 12c0-4.963 4.037-9 9-9s9 4.037 9 9-4.037 9-9 9-9-4.037-9-9zm-2 0c0 6.065 4.935 11 11 11s11-4.935 11-11S18.065 1 12 1 1 5.935 1 12z"></path>
                        </g>
                    </svg>
                </button>
                <input ref="todo"
                       type="text"
                       class="mar-0 border-0 pad-0 title"
                       v-model="defaultTitle"
                       @blur.stop="handleBlurOut"
                       @keyup.enter.stop="create"
                       @keyup.esc.stop="cancel">
                <Button text="Add" type="primary" theme="blue" v-on:clicked="create" v-if="!isEditMode" class="text-blue-hover"/>
                <Button text="Save" type="primary" theme="blue" v-on:clicked="create" v-if="isEditMode"/>
                <!--<Button text="x" type="primary" @click.stop="cancel"/>-->
            </div>
        </transition>
    </div>
</template>
<script>
    import Button from './Button.vue'
    let listener;
    export default {
        props: {
            title: String,
            isEditMode: Boolean,
            isCompletedEnabled: {
                type: Boolean,
                default: false
            },
            isSticky: {
                default: false,
                type: Boolean
            }
        },
        data() {
            return {
                isTodoEditing: this.isEditMode,
                defaultTitle: this.title,
                showCompleted: false
            }
        },
        methods: {
            handleBlurOut() {
                if (!this.defaultTitle) {
                    this.cancel();
                }
            },
            create() {
                if (this.isEditMode) {
                    this.$emit('edit', {
                        title: this.defaultTitle
                    })
                } else {
                    this.$emit('create', {
                        title: this.defaultTitle
                    });
                    this.$ga.event('todo', 'add-todo', 'create');
                }
                this.defaultTitle = '';
                this.isTodoEditing = true;
                this.focus();
            },
            moveToBottom() {
                const todo = document.querySelector('#todo') || document.querySelector('#scroll-page');
                todo.scroll({left: 0, top: todo.scrollHeight, behaviour: 'smooth'});
            },
            focus() {
                this.$nextTick(() => {
                    this.moveToBottom();
                });
                setTimeout(() => {
                    this.$nextTick(() => {
                        this.$refs.todo.focus();
                    })
                }, 400);
            },
            type() {
                this.isTodoEditing = true;
                this.focus();
            },
            cancel() {
                this.isTodoEditing = false;
                this.defaultTitle = '';
                this.$emit('toggleEditMode', this.isTodoEditing);
            },
            toggleCompleted() {
                this.showCompleted = !this.showCompleted;
                this.$emit('toggleCompleted', this.showCompleted);
                this.$ga.event('todo','add-todo','show-completed');
            }
        },
        components: {
            Button
        }
    }
</script>
<style scoped>
    .circle {
        background: none;
        border: none;
        box-shadow: none;
        padding: 0;
        height: 18px;
        width: 18px;
    }

    input[type="text"].title {
        box-shadow: 0 1px 0 0 rgba(33, 150, 243, 0.31);
        padding: 0 0 3px !important;
        margin-left: 0.5rem !important;
        font-size: 0.9rem;
    }

    input[type="text"].title:focus, input[type="text"].title:active {
        box-shadow: 0 1px 0 0 rgba(33, 150, 243, 0.51);
    }

    .text-block {
        padding-left: 0.5rem !important;
    }

    .add-todo {
        padding: 0.72rem 1rem;
    }

    .sticky {
        position: sticky;
        bottom: -1px;
        background: #fff;
    }
</style>