<template>
    <Todos v-if="type === TodosType.DEFAULT"/>
    <WunderlistTodos v-else-if="type === TodosType.WUNDERLIST"/>
    <TodoistTodos v-else-if="type === TodosType.TODOIST"/>
</template>
<script>
    import Todos from './Todos.vue'
    import WunderlistTodos from './WunderlistTodos.vue'
    import TodoistTodos from './TodoistTodos.vue'
    import {TodosType} from '../constants/Todos'

    export default {
        props: ['type'],
        data() {
            return {
                TodosType
            }
        },
        components: {
            Todos,
            WunderlistTodos,
            TodoistTodos
        }
    }
</script>
<style>
    #todo {
        background-color: rgba(255, 255, 255, 0.9);
    }
    .todo-list:first-child {
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
        background-color: #f0f1f4 !important;
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
    }

    .todo-list-count {
        color: #666;
        font-size: 0.8rem;
    }

    #todos input.create-todo-list {
        border: none;
        outline: 0;
        margin: 0;
        height: 2.5rem;
    }

    #todos input.create-todo-list:focus {
        border: 0;
        box-shadow: none;
    }
    #todo {
        height: 100%;
        border: 0;
        resize: none;
        font-size: 0.9rem;
        overflow-y: auto;
        flex: 1;
    }

    #todos ::-webkit-input-placeholder {
        color: #666;
    }

    .todo-list-heading {
        font-weight: 500;
        font-size: 1rem;
        padding: 1rem 0.2rem 0 1.4rem;
    }
    .todo-list-title {
        margin: 0;
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: inherit;
    }

    #todos [type="checkbox"] + label {
        height: auto !important;
    }

    #todos [type="checkbox"] + label:after {
        border-radius: 50%;
        pointer-events: all !important;
        top: 3px;
    }

    #todos [type="checkbox"].filled-in:checked + label:before {
        top: 3px;
    }

    #todos [type="checkbox"].filled-in:not(:checked) + label:after {
        border: 1px solid #999 !important;
    }

    #todos [type="checkbox"].filled-in:checked + label {
        text-decoration: line-through;
        color: #666;
    }

    #todos [type="checkbox"].filled-in:not(:checked) + label:after {
        height: 16px;
        width: 16px;
    }

    #todos [type="checkbox"] + label {
        line-height: 20px;
    }

    div.todos {
        padding-top: 1rem;
        margin: 0;
        overflow-y: auto;
    }

    div.todos ul li {
        padding: 0.5rem 0;
        border-bottom: 1px solid #f1f0f0;
    }

    div.todos ul li:hover > .todo-btn {
        opacity: 1;
    }


</style>