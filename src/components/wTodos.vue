<template>
    <div id="todos" v-on:click.stop="" class="todos-arrow_box relative flex-flow-column flex">

        <header class="flex widget-header flex-center">
            <svg class="pointer flex-no-shrink" v-on:click="toggle('showSidebar'); showTodoManager = false;" width="1.3rem" height="1rem" viewBox="0 0 23 21" version="1.1">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="hamburger" transform="translate(0.000000, 2.000000)" stroke="#7d7d7d" stroke-width="4">
                        <path d="M0.132183908,0 L22.8678161,0" id="XMLID_6_"></path>
                        <polyline id="XMLID_9_" points="0.132183908 16.8 20.0697663 16.8 22.8678161 16.8"></polyline>
                        <path d="M0.132183908,8.4 L22.8678161,8.4" id="XMLID_8_"></path>
                    </g>
                </g>
            </svg>
            <h4 class="widget-heading mar-0">To-do (T) : {{currentList.title | uppercase}}</h4>
            <!--<div class="button-section flex flex-center">
                <svg v-show="currentListId != 'inbox' && currentListId != 'today'" v-on:click.stop="deleteList" class="pointer" width="1.3rem" height="1.3rem" viewBox="0 0 30 36" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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
                </svg>
            </div>-->
        </header>

        <section class="flex relative todo-section flex-flow-column">
            <div id="todo-sidebar" class="sidebar flex-flow-column flex" :class="{'show-sidebar': showSidebar }">
                <div class="sidebar-container">
                    <transition-group name="flip-list" tag="ul" class="todo-lists pad-0 flex flex-flow-column flex-center">
                        <li v-for="list in todoLists" v-bind:key="list.id" class="flex flex-flow-column pointer todo-list"
                            :class="[currentListId == list.id? 'active':'']"
                            v-on:click="setActiveList(list.id); showSidebar = false;">
                            <a class="todo-list-title" :title="list.title">{{list.title | uppercase}}</a>
                        </li>
                    </transition-group>
                    <!--<div class="flex todo-list relative pointer">
                        <input type="text" placeholder="+ Create new list" class="create-todo-list no-focus" v-model="listTitle"
                               @keyup.enter="createList">
                    </div>-->
                </div>
            </div>
            <div id="todo-manager-sidebar" class="sidebar-right flex-flow-column flex" :class="{'show-right-sidebar': showTodoManager }">
                <div class="sidebar-container">
                    <div>
                        <p class="sidebar-heading">Todo Title</p>
                        <input type="text" placeholder="" class="input-todo-title no-focus" v-model="currentTodo.title">
                    </div>
                    <div>
                        <p class="sidebar-heading">Due Date</p>
                        <input type="date" class="input-todo-date no-focus" v-model="currentTodo.dueOn">
                    </div>
                    <div>
                        <button class="btn" v-on:click="updateTodo">Done</button>
                    </div>
                </div>
            </div>
            <div id="todo" v-on:click.stop="showSidebar = false; showTodoManager = false" class="flex flex-flow-column" :class="{'flex-justify-center': isLoadingTodos}">
                <div v-if="isLoadingTodos" id="loading-todo" class="flex flex-flow-column flex-justify-center flex-center">
                    <img src="/images/loading.gif" alt="No Todo">
                </div>

                <transition-group v-show="!isLoadingTodos && todos.length" name="flip-list" tag="ul" class="todos" id="todos-list">
                    <li v-for="todo in sortedTodos" class="todo flex" v-bind:key="todo.id">
                        <input type="checkbox" v-model="todo.completed" class="browser-default todo--checkbox filled-in" :id="todo.id" @change="checkedTodo(todo)"/>
                        <label class="todo--name" :for="todo.id"> {{todo.title}}</label>
                        <div class="todo-btn">
                            <!--<svg height="25" width="23" class="star-rating" :class="{'starred':todo.starred}" v-on:click="starTodo(todo)">
                                <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;" fill="#ccc"/>
                            </svg>-->
                            <svg height="10" width="10" version="1.1" viewBox="0 0 21.9 21.9" enable-background="new 0 0 21.9 21.9"
                                 v-on:click.stop="deleteTodo(todo)" class="pointer">
                                <path d="M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0  c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4  s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3  s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7  s-0.1-0.5-0.3-0.7L14.1,11.3z"/>
                            </svg>
                            <svg height="16" width="16" version="1.1" x="0px" y="0px" viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve" v-on:click.stop="editTodo(todo)" class="pointer">
                                <g fill="#a7a7a7" >
                                    <path d="M30,16c4.411,0,8-3.589,8-8s-3.589-8-8-8s-8,3.589-8,8S25.589,16,30,16z"/>
                                    <path d="M30,44c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,44,30,44z"/>
                                    <path d="M30,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,22,30,22z"/>
                                </g>
                            </svg>
                        </div>
                    </li>
                </transition-group>

                <div v-if="!isLoadingTodos && !todos.length" id="no-todo" class="flex flex-flow-column flex-justify-center flex-center">
                    <img src="/images/no-to-do.png" alt="No Todo" width="134px">
                    <em>No tasks to do in {{currentList.title}} list! <br>Create your first to-do</em>
                </div>
                <div v-if="!isLoadingTodos" class="input-todo flex">
                    <input type="text" placeholder="+ Create a new to-do" class="input-todo-title no-focus" v-model="newTodo.title"
                           @keyup.enter="createTodo">
                    <input type="date" value="" class="input-todo-date no-focus" v-model="newTodo.dueOn">
                </div>
            </div>
        </section>

    </div>
</template>

<script>
    import storage from '../utils/storage'
    import constants from '../utils/Constants'
    import timeUtil from '../utils/timeUtil'

    export default {
        beforeCreate() {
            //this.todosMeta = storage.get(constants.STORAGE.TODOS_META) || {count: 1, deletedTodos: [], createdTodos: []};
        },
        data() {
            return {
                input: '',
                todos: [],
                todoLists: [],
                allTodos: [],
                currentTodo: '',
                currentTodoContent: '',
                todosMeta: this.todosMeta,
                errorMessage: null,
                showSidebar: false,
                showSettingsDropDown: false,
                showTodoManager: false,
                listTitle: '',
                newTodo: {},
                currentListId: '',
                currentList: '',
                isLoadingTodos: true,
                wunderlistUrl: 'https://a.wunderlist.com/api/v1/tasks'
            }
        },
        mounted() {
            this.$parent.isolateScroll('todos-list');
            this.$parent.isolateScroll('todo-sidebar');
            this.getTodosFromServer()
            this.sync()
        },
        computed: {
            sortedTodos(){
                return this.sortTodos();
            }
        },
        methods: {
            http(url, method, data){
                return new Promise((resolve, reject) => {
                    let xmlhttp = new XMLHttpRequest();
                    method = method || 'GET'
                    xmlhttp.open(method, url)
                    xmlhttp.setRequestHeader('X-Client-ID', 'd63bcf15740b10b6790a');
                    xmlhttp.setRequestHeader('X-Access-Token', '4a3d58379ba5d71e80f87029becfda03d1d6acafccb06e2b1e143ed7dff8');
                    xmlhttp.setRequestHeader("Content-type","application/json");
                    xmlhttp.onreadystatechange = function () {
                        if (xmlhttp.readyState === 4) {
                            resolve(JSON.parse(xmlhttp.responseText))
                        }
                    };
                    xmlhttp.onerror = () => {
                        reject(xmlhttp.status);
                        console.error(xmlhttp.status);
                    };
                    xmlhttp.send(JSON.stringify(data));
                });
            },
            toggle(field) {
                this[field] = !this[field];
            },
            getCurrentList() {
                this.getTodoLists();
                this.currentList = this.todoLists.filter(list => list.id === this.currentListId)[0];
            },
            getTodosFromServer() {
                this.isLoadingTodos = true
                this.getRoot()
                    .then(response => {
                        let rootRevisions = storage.get('w-root-revisions') || -1
                        if (true || response.revision > rootRevisions) {
                            this.getTodoLists().then(_lists => {
                                this.currentListId = _lists[0].id
                            })
                        } else {
                            this.currentListId = storage.get(constants.STORAGE.W_CURRENT_TODO_LIST)
                        }
                    })
            },
            getRoot() {
                let url = 'https://a.wunderlist.com/api/v1/root'
                return this.http(url).then((response) => {
                    storage.set('w-root-revisions', response.revision)
                    return response
                })
            },
            getTodoLists() {
                let url = 'https://a.wunderlist.com/api/v1/lists'
                return this.http(url).then((data) => {
                    this.todoLists = data.map((list) => {
                        return {
                            id: list.id,
                            title: list.title,
                            revision: list.revision
                        }
                    })
                    console.log(data)
                    storage.set('w-lists', this.todoLists)
                    return data
                })
            },
            getTodos(listId){
                if (!listId) {
                    return
                }
                let url = 'https://a.wunderlist.com/api/v1/tasks?list_id=' + listId
                let url_completed = 'https://a.wunderlist.com/api/v1/tasks?completed=true&list_id=' + listId
                this.todos = [];
                this.http(url_completed).then(data => {
                    let completedTodos = data.map(todo => this.filterTodoResponse(todo))
                    this.todos = this.todos.concat(completedTodos)
                    console.log('c', this.todos, completedTodos)
                    storage.set('w-todos', this.todos)
                })
                return this.http(url).then(data => {
                    let todos = data.map(todo => this.filterTodoResponse(todo))
                    this.todos = this.todos.concat(todos);
                    console.log('uc', this.todos, todos)
                    storage.set('w-todos', this.todos)
                    return data
                })
            },
            filterTodoResponse(todo) {
                return {
                    id: todo.id,
                    title: todo.title,
                    revision: todo.revision,
                    completed: todo.completed,
                    starred: todo.starred,
                    listId: todo.list_id,
                    dueOn: todo.due_date,
                    updatedOn: +new Date()
                }
            },
            createTodo() {
                if (!this.newTodo.title) {
                    return
                }
                let todo = {
                    title: this.newTodo.title,
                    list_id: this.currentListId,
                    due_date: this.newTodo.dueOn
                }
                delete this.newTodo.title
                this.http(this.wunderlistUrl, 'POST', todo).then((_todo) => {
                    debugger
                    this.todos.unshift(_todo)
                })
            },
            checkedTodo(todo) {
                this.patchTodo(todo.id, {completed: todo.completed, revision: todo.revision}).then((_todo) => {
                    this.$set(this.todos,  this.todos.indexOf(todo), this.filterTodoResponse(_todo))
                })
            },
            sortTodos() {
                return this.todos.sort(function (a, b) {
                    let n;
                    a.completed = +a.completed;
                    b.completed = +b.completed;
                    n = a.completed - b.completed;
                    if (n !== 0) {
                        return n;
                    }
                    return b.updatedOn - a.updatedOn;
                });
            },
            setActiveList(id) {
                console.log('setActiveList', id);
                storage.set(constants.STORAGE.W_CURRENT_TODO_LIST, id);
                this.currentListId = id;
            },
            deleteTodo(todo) {
                if (!confirm('Are you sure you want to delete this todo?')) {
                    return
                }
                let url = this.wunderlistUrl + '/' + todo.id
                this.http(url, 'DELETE', {revision: todo.revision}).then(() => {
                    this.todos.splice(this.todos.indexOf(todo), 1)
                    this.sortTodos();
                })
            },
            patchTodo(id, data) {
                let url = this.wunderlistUrl + '/' + id
                return this.http(url, 'PATCH', data)
            },
            editTodo(todo) {
                if(this.showSidebar){
                    return;
                }
                this.showTodoManager = true;
                this.currentTodoIndex = this.todos.indexOf(todo)
                this.currentTodo = Object.assign({}, todo)
            },
            updateTodo() {
                this.patchTodo(this.currentTodo.id, {
                    title: this.currentTodo.title,
                    due_date: this.currentTodo.dueOn,
                    revision: this.currentTodo.revision
                }).then((_todo) => {
                    this.$set(this.todos, this.currentTodoIndex, this.filterTodoResponse(_todo))
                    this.showTodoManager = false;
                })
            },
            sync(){

            }
        },
        watch: {
            currentListId: {
                handler: function (newValue, oldValue) {
                    if (newValue && newValue !== oldValue) {
                        console.log("CurrentListId Watcher", this.currentListId)
                        this.isLoadingTodos = true
                        this.getCurrentList();
                        this.getTodos(newValue).then(() => {
                            this.isLoadingTodos = false
                        })
                    }
                }
            }
        }
    };
</script>
