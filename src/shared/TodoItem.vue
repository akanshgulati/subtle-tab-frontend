<template>
    <div class="flex flex-center">
        <template v-if="!isEditing">
            <button class="checkbox" :class="{'completed': isCompleted}" @click="changed">
                <transition name="fast-fade">
                    <svg v-if="!isCompleted" key="not-completed" focusable="false" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" >
                        <g fill-rule="evenodd">
                            <path d="M3 12c0-4.963 4.037-9 9-9s9 4.037 9 9-4.037 9-9 9-9-4.037-9-9zm-2 0c0 6.065 4.935 11 11 11s11-4.935 11-11S18.065 1 12 1 1 5.935 1 12z"></path>
                            <path d="M15.293 8.793L11 13.086l-2.293-2.293c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l3 3c.195.195.451.293.707.293.256 0 .512-.098.707-.293l5-5c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0"></path>
                        </g>
                    </svg>
                    <svg v-else key="completed" focusable="false" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                        <g fill-rule="evenodd">
                            <path d="M11,0 C4.935,0 0,4.935 0,11 C0,17.065 4.935,22 11,22 C17.065,22 22,17.065 22,11 C22,4.935 17.065,0 11,0"></path>
                            <path d="M15.707,9.207 L10.707,14.207 C10.512,14.402 10.256,14.5 10,14.5 C9.744,14.5 9.488,14.402 9.293,14.207 L6.293,11.207 C5.902,10.816 5.902,10.184 6.293,9.793 C6.684,9.402 7.316,9.402 7.707,9.793 L10,12.086 L14.293,7.793 C14.684,7.402 15.316,7.402 15.707,7.793 C16.098,8.184 16.098,8.816 15.707,9.207" fill="#FFFFFF"></path>
                        </g>
                    </svg>
                </transition>
            </button>
            <span class="todo-title" @click="editMode"> {{todo.title}}</span>

            <div class="todo-btn">
                <!--FAVOURITE STAR -->
                <!--<svg height="25" width="23" class="star-rating" :class="{'starred':todo.starred}" v-on:click="starTodo(todo)">
                    <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;" fill="#ccc"/>
                </svg>-->

                <!-- DELETE ITEM -->

                <svg v-on:click.stop="deleteTodo(todo)" class="pointer" height="10" width="10" version="1.1"
                     viewBox="0 0 21.9 21.9" enable-background="new 0 0 21.9 21.9">
                    <path
                        d="M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0  c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4  s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3  s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7  s-0.1-0.5-0.3-0.7L14.1,11.3z"/>
                </svg>

                <!-- EDIT ITEM -->
                <svg height="16" width="16" version="1.1" x="0px" y="0px" viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve" v-on:click.stop="editTodo(todo)" class="pointer">
            <g fill="#a7a7a7" >
                <path d="M30,16c4.411,0,8-3.589,8-8s-3.589-8-8-8s-8,3.589-8,8S25.589,16,30,16z"/>
                <path d="M30,44c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,44,30,44z"/>
                <path d="M30,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,22,30,22z"/>
            </g>
        </svg>
            </div>
        </template>
        <template v-else>
            <AddTodo :title="todo.title" :isEditMode="isEditing" v-on:toggleEditMode="toggleEditMode"/>
        </template>
    </div>
</template>
<script>
    import AddTodo from './AddTodo.vue'

    export default {
        data() {
            return {
                isEditing: false,
                isCompleted: this.todo.isCompleted
            }
        },
        props: {
            todo: {
                required: true
            }
        },
        methods: {
            toggleEditMode(state) {
                this.isEditing = state
            },
            editMode() {
                this.isEditing = true
            },
            changed() {
                // this.todo.isCompleted = !this.todo.isCompleted
                this.isCompleted = !this.isCompleted

                this.$emit('changed', {
                    todo: this.todo,
                    action: 'completion',
                    value: this.isCompleted
                })
            }
        },
        components: {
            AddTodo
        }
    }
</script>
<style>
    .todo-btn {
        opacity: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        justify-items: flex-end;
        transition: opacity 0.3s ease-in-out;
    }

    .todo-btn svg {
        fill: #666;
        margin-left: 1rem;
    }

    .todo-title {
        padding-left:0.5rem;
    }
    button.checkbox:focus {
        background: none;
    }
    .checkbox {
        background: none;
        border: none;
        box-shadow: none;
        padding: 0;
        height: 18px;
        width: 18px;
    }

    .checkbox svg {
        fill: #767678;
    }
    .checkbox path{
        transform-origin: 50% 50%;
    }
    .checkbox path:first-child {
        animation: checkAnimationBase 0.225s;
    }

    .checkbox path:last-child {
        animation: checkAnimationTick 0.225s reverse;
    }

    .checkbox.completed path:first-child {
        fill: #7AB800;
        animation: checkAnimationBase 0.225s;
    }

    .checkbox.completed path:last-child {
        fill: #fff;
        animation: checkAnimationTick 0.225s;
    }

    .checkbox:not(.completed):hover path:last-child {
        opacity: 1;
        visibility: visible;
    }

    .checkbox:not(.completed) path:last-child {
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s ease-in;
    }

    @keyframes checkAnimationTick {
        from {
            opacity: 0;
            filter: alpha(opacity=0);
            transform: scale(1.8);
        }
        to {
            transform: scale(1);
        }
    }

    @keyframes checkAnimationBase {
        from {
            opacity: 0;
            -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
            filter: alpha(opacity=0);
            -webkit-transform: scale(0.4);
            -moz-transform: scale(0.4);
            -o-transform: scale(0.4);
            -ms-transform: scale(0.4);
            transform: scale(0.4);
        }
        to {
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -o-transform: scale(1);
            -ms-transform: scale(1);
            transform: scale(1);
        }
    }
</style>