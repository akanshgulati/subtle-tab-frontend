<template>
    <div class="sidebar-container" v-if="list && list.length > 0">
        <!--<p class="sidebar-heading pointer">Lists</p>-->
        <transition-group name="flip-list" tag="ul" class="todo-lists pad-0">
            <li v-for="listItem in list" :key="listItem.id"
                class="flex flex-center flex-justify-space-between pointer todo-list"
                :class="{'active': currentListItemId == listItem.id}" @click="itemSelected(listItem)">
                <div class="flex flex-center" style="width:80%;">
                    <a class="todo-list-title" :title="listItem.title">{{titleCase(listItem.title)}}</a>
                    <span class="todo-list-count ml-10" v-if="showTodosCount">{{getTodosCount(listItem.id)}}</span>
                </div>

                <div @click.stop="deleteList(listItem)" class="mr-5" v-if="isDeleteEnabled">
                    <svg v-show="_showDeleteIcon(listItem)"
                         class="delete-list-icon pointer one-rem-width one-rem-height" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 482.428 482.429" style="enable-background:new 0 0 482.428 482.429;" xml:space="preserve">
                        <g>
                            <g>
                                <path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098    c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117    h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828    C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879    C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096    c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266    c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979    V115.744z"/>
                                <path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07    c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"/>
                                <path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07    c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"/>
                                <path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07    c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"/>
                            </g>
                        </g>
                    </svg>
                </div>

            </li>
        </transition-group>

        <!-- CREATE LIST-->
        <div v-if="isCreateEnabled">
            <div v-if="!isEditing" @click="type" class="flex flex-center todo-list pointer">
                <svg class="svg-blue-fill" focusable="false" xmlns="http://www.w3.org/2000/svg" width="18"
                     height="18" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                          d="M20 11h-7V4c0-.553-.447-1-1-1-.552 0-1 .447-1 1v7H4c-.552 0-1 .447-1 1 0 .553.448 1 1 1h7v7c0 .553.448 1 1 1 .553 0 1-.447 1-1v-7h7c.553 0 1-.447 1-1 0-.553-.447-1-1-1"></path>
                </svg>
                <span class="text-blue block text-block ml-5 semi-bold">Create list</span>
            </div>

            <div v-else class="flex todo-list relative pointer">
                <input type="text" class="create-todo-list no-focus"
                       placeholder="Enter list name"
                       v-model="title"
                       ref="list"
                       @blur.stop="cancel"
                       @keyup.esc.stop="cancel"
                       @keyup.enter.stop="create">
            </div>
        </div>
    </div>
</template>
<script>
    import {TodoListItemAction} from '../constants/Todos'
    import {titleCase} from '../utils/StringUtils'
    import {showDeleteIcon} from '../utils/TodoUtil'

    export default {
        data() {
            return {
                currentListItemId: this.current || (this.list && this.list.length && this.list[0].id),
                title: '',
                titleCase: titleCase,
                isEditing: false
            }
        },
        props: {
            list: {
                type: Array,
                required: true
            },
            current: {},
            isCreateEnabled: {
                default: true
            },
            isDeleteEnabled: {
                default: true
            },
            count: {
                type: Object
            },
            showTodosCount: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            _showDeleteIcon(listItem) {
                if (!listItem || !listItem.title) {
                    return
                }
                return showDeleteIcon(listItem.title);
            },
            itemSelected(listItem) {
                this.currentListItemId = listItem.id
                this.$emit('changed', {
                    action: TodoListItemAction.SELECT,
                    list: listItem
                })
            },
            create() {
                this.$emit('changed', {
                    action: TodoListItemAction.CREATE,
                    data: {
                        title: this.title
                    }
                });
                this.isEditing = false;
                this.title = '';
            },
            type() {
                this.isEditing = true
                setTimeout(() => {
                    this.$nextTick(() => {
                        this.$refs.list.focus()
                    })
                }, 400)
            },
            cancel() {
                this.isEditing = false;
            },
            getTodosCount(listId) {
                return (this.count && this.count[listId]) || 0
            },
            deleteList(listItem) {
                this.$emit('changed', {
                    action: TodoListItemAction.DELETE,
                    list: listItem
                })
            }
        }

    }
</script>
<style>
    .todo-lists > .todo-list:first-child {
        border-top: 1px solid #e4e5e8;
    }

    .todo-list {
        font-size: 0.9rem;
        transition: all 0.3s ease-in;
        box-shadow: 0 0.35rem 7px -5px #e4e5e8;
        width: 100%;
        background: #fff;
        height: 3.5rem;
        line-height: 3.1rem;
        padding: 0.2rem 0.4rem 0.2rem 1.1rem;
        border-bottom: 1px solid #e4e5e8;

    }

    .todo-list:hover {
        background-color: #f3f6ff !important;
    }

    .todo-list-title {
        margin: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: inherit;
    }

    .todo-list-title:before {
        content: '';
        padding: 0.1rem;
        border-radius: 50%;
        height: 1rem;
        width: 1rem;
        display: inline-block;
        margin-right: 0.4rem;
        position: relative;
        top: 2px;
        border: 0.2rem solid;
    }

    .todo-list:nth-of-type(10n+1) .todo-list-title:before {
        border-color: #c0392b;
    }

    .todo-list:nth-of-type(10n+2) .todo-list-title:before {
        border-color: #8e44ad;
    }

    .todo-list:nth-of-type(10n+3) .todo-list-title:before {
        border-color: #00695C;
    }

    .todo-list:nth-of-type(10n+4) .todo-list-title:before {
        border-color: orange;
    }

    .todo-list:nth-of-type(10n+5) .todo-list-title:before {
        border-color: #2980b9;
    }

    .todo-list:nth-of-type(10n+6) .todo-list-title:before {
        border-color: #2ecc71;
    }

    .todo-list:nth-of-type(10n+7) .todo-list-title:before {
        border-color: #e67e22;
    }

    .todo-list:nth-of-type(10n+8) .todo-list-title:before {
        border-color: #3F51B5;
    }

    .todo-list:nth-of-type(10n+9) .todo-list-title:before {
        border-color: #9b59b6;
    }

    .todo-list:nth-of-type(10n) .todo-list-title:before {
        border-color: #795548;
    }

    .todo-list.active {
        font-weight: 500;
        background-color: #f3f6ff !important;
    }

    .todo-list-count {
        color: #666;
        font-size: 0.8rem;
    }

    input.create-todo-list {
        border: none;
        outline: 0;
        margin: 0;
        height: 2.5rem;
        font-size: 0.9rem;
    }

    input.create-todo-list:focus {
        border: 0;
        box-shadow: none;
    }

    .todo-list:hover svg.delete-list-icon:not(:hover) {
        fill: #767678;
    }

    svg.delete-list-icon {
        fill: transparent;
        transition: fill 0.23s ease-in;
    }

    svg.delete-list-icon:hover {
        fill: #e56161;
    }
</style>