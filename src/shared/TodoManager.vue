<template>
    <form class="todo-manager full-height font-xsmall" v-on:submit.prevent="update" @change="isSubmitDisable=false">
        <div>
            <input
                type="text"
                placeholder=""
                class="todo-title no-focus bold mar-0"
                required
                @input="isSubmitDisable = false"
                v-model="_todo.title"
            >
        </div>
        <div class="ph-10" style="padding: 1rem">
            <div class="flex flex-center pointer font-xsmall">
                <svg class="flex-no-shrink" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="18px" height="18px">
            <g>
                <g>
                    <path d="M452,40h-24V0h-40v40H124V0H84v40H60C26.916,40,0,66.916,0,100v352c0,33.084,26.916,60,60,60h392    c33.084,0,60-26.916,60-60V100C512,66.916,485.084,40,452,40z M472,452c0,11.028-8.972,20-20,20H60c-11.028,0-20-8.972-20-20V188    h432V452z M472,148H40v-48c0-11.028,8.972-20,20-20h24v40h40V80h264v40h40V80h24c11.028,0,20,8.972,20,20V148z" fill="#666"/>
                </g>
            </g>
            <g>
                <g>
                    <rect x="76" y="230" width="40" height="40" fill="#666"/>
                </g>
            </g>
            <g>
                <g>
                    <rect x="156" y="230" width="40" height="40" fill="#666"/>
                </g>
            </g>
            <g>
                <g>
                    <rect x="236" y="230" width="40" height="40" fill="#666"/>
                </g>
            </g>
            <g>
                <g>
                    <rect x="316" y="230" width="40" height="40" fill="#666"/>
                </g>
            </g>
            <g>
                <g>
                    <rect x="396" y="230" width="40" height="40" fill="#666"/>
                </g>
            </g>
            <g>
                <g>
                    <rect x="76" y="310" width="40" height="40" fill="#666"/>
                </g>
            </g>
            <g>
                <g>
                    <rect x="156" y="310" width="40" height="40" fill="#666"/>
                </g>
            </g>
            <g>
                <g>
                    <rect x="236" y="310" width="40" height="40" fill="#666"/>
                </g>
            </g>
            <g>
                <g>
                    <rect x="316" y="310" width="40" height="40" fill="#666"/>
                </g>
            </g>
            <g>
                <g>
                    <rect x="76" y="390" width="40" height="40" fill="#666"/>
                </g>
            </g>
            <g>
                <g>
                    <rect x="156" y="390" width="40" height="40" fill="#666"/>
                </g>
            </g>
            <g>
                <g>
                    <rect x="236" y="390" width="40" height="40" fill="#666"/>
                </g>
            </g>
            <g>
                <g>
                    <rect x="316" y="390" width="40" height="40" fill="#666"/>
                </g>
            </g>
            <g>
                <g>
                    <rect x="396" y="310" width="40" height="40" fill="#666"/>
                </g>
            </g>
        </svg>
                <transition mode="out-in">
                <span key='static' class="ml-10" v-if="!isEditingDate"
                      @click.stop="isEditingDate = true">Add due date</span>

                    <input key='dynamic' type="date" v-else class="ml-10 due-date mb-0 border-0" v-model="_todo.dueOn"/>
                </transition>
            </div>
        </div>
        <div class="ml-5">
            <Button class="btn text-blue-hover ml-10 mt-10" text="Save" type="save" size="medium" :is-disabled="isSubmitDisable"/>
        </div>
    </form>
</template>
<script>
    import DueDate from './DueDate.vue'
    import Button from './Button.vue'

    export default {
        mounted() {
            this.isEditingDate = this.todo && this.todo.dueOn
        },
        data() {
            return {
                isEditingDate: this.todo && this.todo.dueOn,
                isSubmitDisable: true
            }
        },
        methods: {
            update() {
                this.$emit('changed', {
                    action: 'edit',
                    todo: this._todo
                })
            }
        },
        props: {
            todo: {
                type: Object,
                required: true
            }
        },
        components: {
            DueDate,
            Button
        },
        computed: {
            _todo() {
                return Object.assign({}, this.todo)
            }
        }
    }
</script>
<style scoped>
    .todo-manager {
        background-color: #f3f6ff;
    }

    .sidebar-container input {
        margin-bottom: 1rem;
        height: 2rem;
        font-size: 0.8rem;
    }

    .sidebar-container select {
        height: 2rem !important;
        font-size: 0.8rem;
        margin-bottom: 1rem;
        background: rgb(247, 247, 247);
    }

    input.todo-title {
        background: #fff;
        height: 50px !important;
        border: none !important;
        box-sizing: border-box !important;
        max-width: 100%;
        font-size: 0.9rem;
        padding: 0.5rem 10px !important;
    }
    input.due-date {
        height: 1rem;
        font-size: 0.9rem;
        margin-left: 10px !important;
    }

    input.due-date:focus {
        box-shadow: none !important;
    }
</style>