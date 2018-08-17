<template>
    <div id="todos" v-on:click.stop="" class="todos-arrow_box relative flex-flow-column flex text-black">
        <header class="flex widget-header flex-center">
            <svg class="pointer flex-no-shrink" v-on:click="toggle('showSidebar'); showTodoManager = false;"
                 width="1.3rem"
                 height="1rem" viewBox="0 0 23 21" version="1.1">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="hamburger" transform="translate(0.000000, 2.000000)" stroke="#7d7d7d" stroke-width="4">
                        <path d="M0.132183908,0 L22.8678161,0" id="XMLID_6_"></path>
                        <polyline id="XMLID_9_" points="0.132183908 16.8 20.0697663 16.8 22.8678161 16.8"></polyline>
                        <path d="M0.132183908,8.4 L22.8678161,8.4" id="XMLID_8_"></path>
                    </g>
                </g>
            </svg>
            <h4 class="widget-heading ml-10 mv-0">To-do (T) : {{ currentList ? titleCase(currentList.title): ''}}</h4>
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
                    <transition-group name="flip-list" tag="ul"
                                      class="todo-lists pad-0 flex flex-flow-column flex-center">
                        <li v-for="list in visibleLists" v-bind:key="list.id"
                            class="flex flex-flow-column pointer todo-list"
                            :class="[currentListId == list.id? 'active':'']"
                            v-on:click="setActiveList(list); showSidebar = false;">
                            <a class="todo-list-title" :title="list.title">{{ titleCase(list.title)}}</a>
                        </li>
                    </transition-group>
                    <!--<div class="flex todo-list relative pointer">
                        <input type="text" placeholder="+ Create new list" class="create-todo-list no-focus" v-model="listTitle"
                               @keyup.enter="createList">
                    </div>-->
                </div>
            </div>

            <div id="todo-manager-sidebar" class="sidebar-right flex-flow-column flex"
                 :class="{'show-right-sidebar': showTodoManager }">
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

            <div id="todo"
                 v-on:click.stop="showSidebar = showTodoManager = false"
                 class="flex flex-flow-column"
                 :class="{'flex-justify-center': isLoadingTodos}">
                <!--LOADING STATE-->
                <div v-if="isLoadingTodos" id="loading-todo"
                     class="flex flex-flow-column flex-justify-center flex-center">
                    <img src="/images/loading.svg" alt="Loading..." style="height: 3.43rem;">
                </div>

                <!--LIST OF TODOS-->
                <template v-if="!isLoadingTodos">
                    <!--SHOWING TASKS STATE-->
                    <div v-show="currentListIncompleteTodos.length" class="todos">
                        <!--INCOMPLETE TASKS LOOP-->
                        <TodosGroup
                            id="incomplete-todos-list" class="mar-0"
                            :todos="sortByOrder(currentListIncompleteTodos)"
                            v-on:changed="checkedTodo"
                        />
                        <AddTodo
                            class="pv-10"
                            :is-sticky="isAddTodoSticky"
                            v-on:create="createTodo"
                            :is-completed-enabled="true"
                            v-on:toggleCompleted="toggleCompletedTodos"/>
                        <!--COMPLETE TASKS LOOP-->
                        <TodosGroup
                            v-if="showCompletedTodos"
                            id="complete-todos-list" class="mar-0"
                            :todos="sortByOrder(currentListCompleteTodos, true)"
                            isCompletedList="true"
                            v-on:changed="checkedTodo"
                        />
                       <!-- <transition-group v-show="showCompletedTodos" name="flip-list" tag="ul" id="complete-todos-list"
                                          class="mar-0">
                            <li v-for="todo in sortByOrder(currentListCompleteTodos, true)" class="todo flex" :key="todo.id">
                                <input type="checkbox" v-model="todo.isCompleted"
                                       class="browser-default todo&#45;&#45;checkbox filled-in"
                                       :id="todo.id" @change="checkedTodo(todo)"/>
                                <label class="todo&#45;&#45;name" :for="todo.id"> {{todo.title}}</label>
                                <div class="todo-btn">
                                    &lt;!&ndash;<svg height="25" width="23" class="star-rating" :class="{'starred':todo.starred}" v-on:click="starTodo(todo)">
                                        <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;" fill="#ccc"/>
                                    </svg>&ndash;&gt;
                                    <svg height="10" width="10" version="1.1" viewBox="0 0 21.9 21.9"
                                         enable-background="new 0 0 21.9 21.9"
                                         v-on:click.stop="deleteTodo(todo)" class="pointer">
                                        <path
                                            d="M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0  c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4  s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3  s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7  s-0.1-0.5-0.3-0.7L14.1,11.3z"/>
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
                        </transition-group>-->
                    </div>
                    <!--SHOWING A NO TASK STATE-->

                    <div v-if="!currentListIncompleteTodos.length" id="no-todo"
                         class="flex flex-flow-column flex-justify-center flex-center">
                        <img src="images/todo-no-item.png" alt="No Todo" width="134px">
                        <em>No tasks to do in {{currentList.title}} list! <br>Create your first to-do</em>
                    </div>

                </template>
            </div>
        </section>

    </div>
</template>

<script>
    import {Get, Set} from '../utils/storage'
    import {TODOIST, STORAGE} from '../utils/Constants'
    import {isolateScroll, Http, DecryptAuth, generateId} from '../utils/common'
    import TodoUtil from '../utils/TodoUtil'
    import {titleCase} from '../utils/StringUtils'
    import {TodosType} from '../constants/Todos'
    import AddTodo from '../shared/AddTodo.vue'
    import TodosGroup from '../shared/TodosGroup.vue'

    let syncList
    export default {
        data() {
            return {
                titleCase,
                auth: DecryptAuth(Get(STORAGE.T_AUTH)),
                todoLists: [],
                todos: [],
                currentTodo: '',
                showSidebar: false,
                showTodoManager: false,
                newTodo: {},
                currentList: Get(STORAGE.T_CURRENT_TODO_LIST),
                isLoadingTodos: true,
                taskUrl: TODOIST.URL.TASKS,
                syncTime: '',
                showCompletedTodos: false,
                isAddTodoSticky: false,
                syncToken: Get(STORAGE.T_SYNC_TOKEN) || '*'
            }
        },
        mounted() {
            if (!this.authCode) {
                return
            }
            isolateScroll('incomplete-todos-list')
            isolateScroll('complete-todos-list')
            isolateScroll('todo-sidebar')
            this.checkForAddTodoSticky();
            this.init()
            syncList = setInterval(this.sync, 5000)
        },
        computed: {
            currentListId() {
                this.checkForAddTodoSticky();
                return this.currentList.id
            },
            tokenType() {
                return this.auth.token_type
            },
            authCode() {
                return this.auth.access_token
            },
            todosMeta() {
                return this.todos.map(todo => todo.id)
            },
            listsMeta() {
                return this.todoLists.map(list => list.id)
            },
            visibleLists() {
                return this.todoLists.filter(list => !list.isDeleted && !list.isArchived)
            },
            currentListIncompleteTodos() {
                return this.todos.filter(todo => todo.listId === this.currentListId && !todo.isCompleted && !todo.isDeleted)
            },
            currentListCompleteTodos() {
                return this.todos.filter(todo => todo.listId === this.currentListId && todo.isCompleted && !todo.isDeleted)
            }
        },
        methods: {
            checkForAddTodoSticky(){
                /*this.$nextTick(() => {
                    const todosEl = document.querySelector('.todos')
                    this.isAddTodoSticky = todosEl && todosEl.scrollHeight > todosEl.offsetHeight
                });*/
            },
            toggleCompletedTodos(state) {
                this.showCompletedTodos = state
            },
            sortByOrder(data, isDescendingOrder){
                if (isDescendingOrder) {
                    return data.sort(function(a, b) {
                        return b.order - a.order
                    })
                }
                return data.sort(function (a, b) {
                    return a.order - b.order;
                });
            },
            syncCall(url, data) {
                url = url || TODOIST.URL.BASE
                const headers = [
                    {
                        name: 'Content-type',
                        value: 'application/json'
                    }]
                if (data) {
                    data = Object.assign({
                        token: this.authCode
                    }, data)
                } else {
                    data = {
                        token: this.authCode,
                        sync_token: this.syncToken,
                        resource_types: ['projects', 'items']
                    }
                }
                return Http(url, {headers, method: 'POST', data})
            },
            toggle(field) {
                this[field] = !this[field]
            },
            init() {
                // If local list is present
                if (this.currentList && this.currentList.id && this.syncToken) {
                    // check for local data if all available
                    let localTodos = this.getLocalTodos()
                    let localLists = this.getLocalLists()
                    if (localLists && localTodos) {
                        this.todos = localTodos
                        this.todoLists = localLists
                        this.isLoadingTodos = false;
                        this.checkForAddTodoSticky();
                        return
                    }
                }
                this.getAll()
            },
            sync() {
                if (!this.syncToken) {
                    return
                }
                const baseUrl = TODOIST.URL.BASE

                return this.syncCall(baseUrl).then(data => {
                    if (data.projects.length > 0) {
                        this.updateLists(data.projects)
                        this.syncToken = data.sync_token
                    }
                    if (data.items.length > 0) {
                        this.updateTodos(data.items)
                        this.syncToken = data.sync_token
                    }
                })

            },
            getLocalTodos() {
                return TodoUtil.getLocalTodos(TodosType.TODOIST)
            },
            setLocalTodos(todos) {
                return TodoUtil.setLocalTodos(TodosType.TODOIST, todos)
            },
            unsetLocalTodos() {
                TodoUtil.unsetLocalTodos(TodosType.TODOIST)
            },
            getLocalLists() {
                return TodoUtil.getLocalLists(TodosType.TODOIST)
            },
            setLocalLists(lists) {
               return TodoUtil.setLocalLists(TodosType.TODOIST, lists)
            },
            unsetLocalLists() {
                TodoUtil.unsetLocalLists(type)
            },
            updateLists(lists) {
                let formattedTodoLists = lists.map(list => this.formatListResponse(list))
                formattedTodoLists.forEach(list => {
                    let listIndex = this.listsMeta.indexOf(list.id)
                    if (listIndex > -1) {
                        // if list is updated
                        this.todoLists.splice(listIndex, 1);
                        this.$set(this.todoLists, this.todoLists.length, list)
                    } else {
                        // if list is new
                        this.$set(this.todoLists, this.todoLists.length, list)
                    }
                })
            },
            updateTodos(todos) {
                let formattedTodos = todos.map(todo => this.formatTodoResponse(todo))
                formattedTodos.forEach(todo => {
                    let todoIndex = this.todosMeta.indexOf(todo.id)
                    if (todoIndex > -1) {
                        // if list is updated
                        this.todos.splice(todoIndex, 1);
                        this.$set(this.todos, this.todos.length, todo)
                    } else {
                        // if list is new
                        this.$set(this.todos, this.todos.length, todo)
                    }
                })
            },
            getAll() {
                this.isLoadingTodos = true;
                this.syncToken = '*'
                const baseUrl = TODOIST.URL.BASE
                let todoLists, todos
                const self = this;
                return this.syncCall(baseUrl).then(data => {
                    todoLists = data.projects
                    todos = data.items
                    self.todoLists = todoLists.map(list => self.formatListResponse(list))
                    self.todos = data.items.filter(todo => !todo.is_deleted && !todo.in_history && !todo.is_archived).
                        map(todo => self.formatTodoResponse(todo))
                    // setting active current list
                    self.currentList = self.currentList  || self.todoLists[0]
                    // setting sync token to new value
                    self.syncToken = data.sync_token
                    self.isLoadingTodos = false
                    this.checkForAddTodoSticky();
                })
            },
            formatTodoResponse(todo) {
                return {
                    id: todo.id,
                    title: todo.content,
                    listId: todo.project_id,
                    dueOn: todo.due_date_utc,
                    isDeleted: !!todo.is_deleted,
                    isCompleted: !!todo.checked,
                    order: todo.item_order
                }
            },
            formatListResponse(list) {
                return {
                    id: list.id,
                    title: list.name,
                    isDeleted: !!list.is_deleted,
                    isArchived: !!list.is_archived
                }
            },
            setActiveList(list) {
                this.currentList = list
            },
            patchTodo(type, args) {
                const uuid = generateId()
                const temp_id = generateId()
                const commands = [{type, uuid, args, temp_id}];

                this.syncCall(TODOIST.URL.BASE, {commands}).then((response) => {
                    if (response.sync_status[uuid] === 'ok') {
                        this.sync();
                    }
                    this.checkForAddTodoSticky();
                    this.isLoadingTodos = false;
                })
            },
            createTodo(todo) {
                if (!todo.title) {
                    return
                }
                this.newTodo = {}
                const _todo = {
                    content: todo.title,
                    project_id: this.currentListId,
                    due_date: todo.dueOn
                }
                this.patchTodo('item_add', _todo)
            },
            checkedTodo(todoData) {
                const todo = todoData.todo;
                const action = todoData.action;
                const value = todoData.value;
                const type = value ? 'item_complete': 'item_uncomplete';
                this.patchTodo(type, {'ids': [todo.id]})
            },
            deleteTodo(todo) {
                if (!confirm('Are you sure you want to delete this todo?')) {
                    return
                }
                todo.isDeleted = true;
                this.patchTodo('item_delete', {'ids': [todo.id]});
            },
            editTodo(todo) {
                if (this.showSidebar) {
                    return
                }
                this.showTodoManager = true
                this.currentTodoIndex = this.todos.indexOf(todo)
                this.currentTodo = Object.assign({}, todo)
            },
            updateTodo() {

            }
        },
        watch: {
            todos: {
                handler: function(newValue) {
                    if (newValue && newValue.length) {
                        this.setLocalTodos(newValue)
                        this.checkForAddTodoSticky();
                    }
                },
                deep: true
            },
            todoLists: {
                handler: function(newValue) {
                    if (newValue && newValue.length) {
                        this.setLocalLists(newValue)
                    }
                },
                deep: true
            },
            currentList: {
                handler: function(newValue) {
                    if (!newValue || !newValue.id) {
                        return
                    }
                    Set(STORAGE.T_CURRENT_TODO_LIST, this.currentList)
                }
            },
            syncToken: {
                handler(newValue) {
                    if (newValue) {
                        Set(STORAGE.T_SYNC_TOKEN, newValue)
                    }
                }
            }
        },
        components: {
            AddTodo,
            TodosGroup
        },
        beforeDestroy() {
            clearInterval(syncList)
        }
    }
</script>
<style>
    .list-complete-item {
        transition: all 0.5s ease-in;
    }

    .list-complete-enter {
        opacity: 0;
        transform: translateY(33px);
    }

    .list-complete-leave-to {
        transition: all 0.5s ease-out !important;
    }
</style>