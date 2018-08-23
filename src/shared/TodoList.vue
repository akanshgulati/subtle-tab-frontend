<template>
    <div class="sidebar-container">
        <!--<p class="sidebar-heading pointer">Lists</p>-->
        <transition-group name="flip-list" tag="ul" class="todo-lists pad-0 flex flex-flow-column flex-center">
            <li v-for="listItem in list" :key="listItem.id" class="flex flex-flow-column pointer todo-list"
                :class="{'active': currentListItemId == listItem.id}" @click="itemSelected(listItem)">
                <a class="todo-list-title" :title="listItem.title">{{titleCase(listItem.title)}}</a>
            </li>
        </transition-group>
        <div class="flex todo-list relative pointer" v-if="isCreateEnabled">
            <input type="text" placeholder="+ Create new list" class="create-todo-list no-focus" v-model="title"
                   @keyup.enter="create">
        </div>
    </div>
</template>
<script>
    import {TodoListItemAction} from '../constants/Todos'
    import {titleCase} from '../utils/StringUtils'

    export default {
        data() {
            return {
                currentListItemId: this.current || (this.list && this.list[0].id),
                title: '',
                titleCase: titleCase
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
            }
        },
        methods: {
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
                })
            }
        }

    }
</script>