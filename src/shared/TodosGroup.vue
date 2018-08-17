<template>
    <transition-group name="flip-list" tag="ul" mode="out-in">
        <li v-for="todo in todos" :key="todo.id">
            <TodoItem
                class="todo"
                :todo="todo"
                v-on:changed="changed"/>
        </li>
    </transition-group>
</template>
<script>
    import TodoItem from './TodoItem.vue'
export default {
    data(){
        return {

        }
    },
    components: {
        TodoItem
    },
    props: {
        todos: {
            required: true,
            type: Array
        },
        isCompletedList: {
            default: false
        }
    },
    computed: {
        transitionName() {
            return this.isCompletedList ? 'flip-list' : 'list-complete'
        }
    },
    methods: {
        changed(data) {
            debugger;
            this.$emit('changed', data)
        }
    }
}
</script>
<style>
    .todo {
        padding-left: 1rem;
        padding-right: 1rem;
    }
</style>