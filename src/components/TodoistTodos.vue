<template>
    <div id="todos" v-on:click.stop="" class="todos-arrow_box relative flex-flow-column flex text-black">
        <header class="flex widget-header flex-center">
            <svg class="pointer flex-no-shrink" v-on:click="toggle('showSidebar'); showTodoManager = false;"
                 width="1.1rem"
                 height="1rem" viewBox="0 0 23 21" version="1.1">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="hamburger" transform="translate(0.000000, 2.000000)" stroke="#7d7d7d" stroke-width="4">
                        <path d="M0.132183908,0 L22.8678161,0" id="XMLID_6_"></path>
                        <polyline id="XMLID_9_" points="0.132183908 16.8 20.0697663 16.8 22.8678161 16.8"></polyline>
                        <path d="M0.132183908,8.4 L22.8678161,8.4" id="XMLID_8_"></path>
                    </g>
                </g>
            </svg>
            <i class="integrate-icon icon--todoist mh-5 flex-no-shrink"></i>
            <h4 class="widget-heading ml-5 mv-0">{{ currentList ? titleCase(currentList.title): ''}}</h4>
        </header>

        <section class="flex relative todo-section flex-flow-column">
            <div id="todo-sidebar" class="sidebar flex-flow-column flex" :class="{'show-sidebar': showSidebar }">
                <div class="sidebar-container">
                    <TodoList :list="visibleLists"
                              :current="currentListId"
                              v-on:changed="changedTodoList"
                              :show-todos-count="false"
                              :is-create-enabled="false"/>
                </div>
            </div>

            <div id="todo-manager-sidebar" class="sidebar-right flex-flow-column flex"
                 :class="{'show-right-sidebar': showTodoManager }" @click.stop="">
                <TodoManager :todo="currentTodo" @changed="updateTodo" v-if="showTodoManager"/>
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
                    <div class="todos">
                        <!--INCOMPLETE TASKS LOOP-->
                        <TodosGroup
                            v-if="currentListIncompleteTodos.length"
                            id="incomplete-todos-list" class="mar-0"
                            :todos="sortByOrder(currentListIncompleteTodos)"
                            @changed="changedTodo"
                        />
                        <AddTodo
                            class="pv-10"
                            :is-sticky="isAddTodoSticky"
                            v-on:create="createTodo"
                            :is-completed-enabled="false"
                            v-on:toggleCompleted="toggleCompletedTodos"/>
                        <!-- NO ITEM LEFT TO DO -->
                        <transition>
                            <NoTodo
                                :current-list-title="currentList.title"
                                v-if="!currentListIncompleteTodos.length && !showCompletedTodos"
                            />
                        </transition>
                        <!--&lt;!&ndash;COMPLETE TASKS LOOP&ndash;&gt;
                        <TodosGroup
                            v-if="showCompletedTodos"
                            id="complete-todos-list" class="mar-0"
                            :todos="sortByOrder(currentListCompleteTodos, true)"
                            isCompletedList="true"
                            v-on:changed="checkedTodo"
                        />-->
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

                </template>
            </div>
        </section>

    </div>
</template>

<script>
    import AddTodo from '../shared/AddTodo.vue'
    import TodosGroup from '../shared/TodosGroup.vue'
    import NoTodo from '../shared/NoTodo.vue'
    import TodoList from '../shared/TodoList.vue'
    import TodoManager from '../shared/TodoManager.vue'

    import {Get, Set} from '../utils/storage'
    import {TODOIST, STORAGE} from '../utils/Constants'
    import {isolateScroll, Http, DecryptAuth, generateId} from '../utils/common'
    import TodoUtil from '../utils/TodoUtil'
    import {titleCase} from '../utils/StringUtils'
    import {TodosType, TodoListItemAction, TodoItemAction} from '../constants/Todos'

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
            this.init()
            syncList = setInterval(this.sync, 5000)
        },
        computed: {
            currentListId() {
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
                this.showSidebar = false;
            },
            changedTodoList(info) {
                if (!info) {
                    return
                }
                if (info.action === TodoListItemAction.SELECT) {
                    this.setActiveList(info.list)
                } else if (info.action === TodoListItemAction.DELETE) {
                    this.deleteList(info.list)
                }
            },
            patchTodo(type, args) {
                const uuid = generateId()
                const temp_id = generateId()
                const commands = [{type, uuid, args, temp_id}];

                this.syncCall(TODOIST.URL.BASE, {commands}).then((response) => {
                    if (response.sync_status[uuid] === 'ok') {
                        this.sync()
                    }
                    this.showSidebar = false;
                    this.showTodoManager = false;
                    this.isLoadingTodos = false
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
            changedTodo(info){
                if (!info || !info.action) {
                    return
                }
                switch (info.action) {
                    case TodoItemAction.COMPLETE:
                        this.checkedTodo(info)
                        return
                    case TodoItemAction.EDIT:
                        this.editTodo(info.todo)
                        return
                    case TodoItemAction.DELETE:
                        this.deleteTodo(info.todo)
                        return
                }
            },
            checkedTodo(todoData) {
                const todo = todoData.todo;
                const value = todoData.value;
                const type = value ? 'item_complete': 'item_uncomplete';
                this.patchTodo(type, {'ids': [todo.id]})
            },
            deleteTodo(todo) {
                if (!todo || !confirm('Are you sure you want to delete this todo?')) {
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
            updateTodo(data) {
                if (data.action === TodoItemAction.EDIT) {
                    const updatedTodo = data.todo
                    // updating it to current for below logic
                    this.patchTodo('item_update', {'id': updatedTodo.id, content: updatedTodo.title})

                }
            },
            deleteList(list) {
                if (!list || !confirm(`Are you sure you want to delete ${list.title}?`)) {
                    return
                }
                list.isDeleted = true
                this.patchTodo('project_delete', {'ids': [list.id]});
            }
        },
        watch: {
            todos: {
                handler: function(newValue) {
                    if (newValue && newValue.length) {
                        this.setLocalTodos(newValue)
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
            TodosGroup,
            NoTodo,
            TodoManager,
            TodoList
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