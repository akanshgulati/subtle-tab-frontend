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

            <span class="todo-title" @click.stop="editMode(todo)"> {{todo.title}}</span>

            <div class="todo-btn">
                <!--FAVOURITE STAR -->
                <!--<svg height="25" width="23" class="star-rating" :class="{'starred':todo.starred}" v-on:click="starTodo(todo)">
                    <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;" fill="#ccc"/>
                </svg>-->
                <!--EDIT ITEM -->
                <svg @click.stop="editMode(todo)" class="pointer edit-icon" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 469.331 469.331" style="enable-background:new 0 0 469.331 469.331;" xml:space="preserve" width="18px" height="18px">
                    <g>
	                    <path d="M438.931,30.403c-40.4-40.5-106.1-40.5-146.5,0l-268.6,268.5c-2.1,2.1-3.4,4.8-3.8,7.7l-19.9,147.4   c-0.6,4.2,0.9,8.4,3.8,11.3c2.5,2.5,6,4,9.5,4c0.6,0,1.2,0,1.8-0.1l88.8-12c7.4-1,12.6-7.8,11.6-15.2c-1-7.4-7.8-12.6-15.2-11.6   l-71.2,9.6l13.9-102.8l108.2,108.2c2.5,2.5,6,4,9.5,4s7-1.4,9.5-4l268.6-268.5c19.6-19.6,30.4-45.6,30.4-73.3   S458.531,49.903,438.931,30.403z M297.631,63.403l45.1,45.1l-245.1,245.1l-45.1-45.1L297.631,63.403z M160.931,416.803l-44.1-44.1   l245.1-245.1l44.1,44.1L160.931,416.803z M424.831,152.403l-107.9-107.9c13.7-11.3,30.8-17.5,48.8-17.5c20.5,0,39.7,8,54.2,22.4   s22.4,33.7,22.4,54.2C442.331,121.703,436.131,138.703,424.831,152.403z"/>
                    </g>
                </svg>
                <!-- DELETE ITEM -->
                <svg @click.stop="deleteTodo(todo)" class="delete-icon pointer" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 482.428 482.429" style="enable-background:new 0 0 482.428 482.429;" xml:space="preserve">
                <g>
                    <g>
                        <path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098    c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117    h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828    C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879    C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096    c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266    c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979    V115.744z"/>
                        <path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07    c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"/>
                        <path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07    c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"/>
                        <path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07    c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"/>
                    </g>
                </g>
                </svg>
               <!-- <svg  class="pointer" width="10" height="10" viewBox="0 0 30 36" version="1.1"
                     xmlns="http://www.w3.org/2000/svg">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="delete_note" fill-rule="nonzero" fill="#7d7d7d">
                            <polygon points="9.875 11.175 12.125 11.175 12.125 29.175 9.875 29.175" ></polygon>
                            <polygon points="17.375 11.175 19.625 11.175 19.625 29.175 17.375 29.175" ></polygon>
                            <polygon points="0.375 4.425 29.625 4.425 29.625 6.675 0.375 6.675" ></polygon>
                            <path d="M20.55,5.55 L18.45,5.55 L18.45,3.3 C18.45,2.625 17.925,2.1 17.25,2.1 L12.75,2.1 C12.075,2.1 11.55,2.625 11.55,3.3 L11.55,5.55 L9.45,5.55 L9.45,3.3 C9.45,1.5 10.95,0 12.75,0 L17.25,0 C19.05,0 20.55,1.5 20.55,3.3 L20.55,5.55"
                            ></path>
                            <path d="M21.75,35.925 L8.25,35.925 C6.45,35.925 4.875,34.425 4.725,32.625 L2.625,5.625 L4.875,5.475 L6.975,32.475 C7.05,33.15 7.65,33.675 8.25,33.675 L21.75,33.675 C22.425,33.675 23.025,33.075 23.025,32.475 L25.125,5.475 L27.375,5.625 L25.275,32.625 C25.125,34.5 23.55,35.925 21.75,35.925"></path>
                        </g>
                    </g>
                </svg>-->

                <!--<svg v-on:click.stop="deleteTodo(todo)" class="pointer" height="10" width="10" version="1.1" viewBox="0 0 21.9 21.9" enable-background="new 0 0 21.9 21.9">
                    <path d="M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0  c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4  s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3  s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7  s-0.1-0.5-0.3-0.7L14.1,11.3z"/>
                </svg>-->

                <!--&lt;!&ndash; EDIT ITEM &ndash;&gt;
                <svg height="16" width="16" version="1.1" x="0px" y="0px" viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve" v-on:click.stop="editTodo(todo)" class="pointer">
            <g fill="#a7a7a7" >
                <path d="M30,16c4.411,0,8-3.589,8-8s-3.589-8-8-8s-8,3.589-8,8S25.589,16,30,16z"/>
                <path d="M30,44c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,44,30,44z"/>
                <path d="M30,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,22,30,22z"/>
            </g>
        </svg>-->
            </div>
        </template>
        <template v-else>
            <AddTodo :title="todoTitle" :isEditMode="isEditing" v-on:toggleEditMode="toggleEditMode" v-on:edit="editTodo"/>
        </template>
    </div>
</template>
<script>
    import AddTodo from './AddTodo.vue'
    import {TodoItemAction} from '../constants/Todos'

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
                // this.isEditing = true
                this.$emit('changed', {
                    todo: this.todo,
                    action: TodoItemAction.EDIT
                })
            },
            changed() {
                // this.todo.isCompleted = !this.todo.isCompleted
                this.isCompleted = !this.isCompleted

                this.$emit('changed', {
                    todo: this.todo,
                    action: TodoItemAction.COMPLETE,
                    value: this.isCompleted
                })
            },
            editTodo(data) {
                this.$emit('changed', {
                    todo: this.todo,
                    action: TodoItemAction.EDIT,
                    value: data
                })
            },
            deleteTodo(data){
                this.$emit('changed', {
                    todo: this.todo,
                    action: TodoItemAction.DELETE,
                    value: data.id
                })
            }
        },
        computed: {
            todoTitle() {
                const currentTodo = this.todo && Object.assign({}, this.todo)
                return currentTodo.title;
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
        margin-left: 0.5rem;
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
    .todos ul li:hover .todo-btn {
        opacity: 1;
    }
    .todo-btn {
        margin-left: auto;
    }
    svg.edit-icon {
        fill: #767678;
        transition: all 0.23s ease-in;
    }

    svg.edit-icon:hover {
        fill: #2196F3;
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