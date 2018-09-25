<template>
    <div id="no-todo" class="flex flex-flow-column flex-justify-center flex-center ph-20">
        <img src="images/todo-no-item.png" alt="No Todo" width="30%">
        <em class="text-light-grey">No tasks to do in <strong>{{title}}</strong> list!</em>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        props: {
            currentListTitle: {
                type: String
            }
        },
        computed: {
            title() {
                return this.currentListTitle || 'current'
            }
        }
    }
</script>
<style>
    #no-todo {
        text-align: center;
        flex: 1;
        padding-top: 2rem;
    }

    #no-todo img {
        display: block;
        margin-bottom: 20px;
        opacity: 0.5;
    }

    #no-todo em {
        font-size: 1rem;
    }
</style>