<template>
    <div @click="type" class="flex flex-center pointer">
        <svg class="svg-blue-fill" focusable="false" xmlns="http://www.w3.org/2000/svg" width="18"
             height="18" viewBox="0 0 24 24">
            <path fill-rule="evenodd"
                  d="M20 11h-7V4c0-.553-.447-1-1-1-.552 0-1 .447-1 1v7H4c-.552 0-1 .447-1 1 0 .553.448 1 1 1h7v7c0 .553.448 1 1 1 .553 0 1-.447 1-1v-7h7c.553 0 1-.447 1-1 0-.553-.447-1-1-1"></path>
        </svg>
        <span class="text-blue block text-block text-blue-underlined">Add todo</span>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isEditing: false
            }
        },
        methods: {
            type() {
                this.isEditing = true
            }
        }
    }
</script>