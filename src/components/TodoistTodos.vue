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
            <h4 class="widget-heading ml-5 mv-0">Todo {{ currentList ? ': '+ titleCase(currentList.title): ''}}</h4>
        </header>

        <section class="flex relative todo-section flex-flow-column"
                 @click.stop="showTodoManager = showSidebar = false">
            <div id="todo-sidebar" class="sidebar flex-flow-column flex" :class="{'show-sidebar': showSidebar }"
                 @click.stop="">
                <div class="sidebar-container">
                    <TodoList :list="visibleLists"
                              :current="currentListId"
                              v-on:changed="changedTodoList"
                              :show-todos-count="false"
                              :is-delete-enabled="true"
                              :is-create-enabled="false"/>
                </div>
            </div>

            <div id="todo-manager-sidebar" class="sidebar-right flex-flow-column flex"
                 :class="{'show-right-sidebar': showTodoManager }" @click.stop="">
                <TodoManager :todo="currentTodo" @changed="updateTodo" v-if="showTodoManager"/>
            </div>

            <TodoError
                v-if="errorState"
                :error-state="errorState"
                v-on:click.stop="showSidebar = showTodoManager = false"
            />

            <div id="todo"
                 v-if="!errorState"
                 v-on:click.stop="showSidebar = showTodoManager = false"
                 class="flex flex-flow-column"
                 :class="{'flex-justify-center': isLoadingTodos, 'disable-pointer': showSidebar || showTodoManager}">
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
    import TodoError from '../shared/TodoError.vue'

    import {Get, Set, Remove} from '../utils/storage'
    import {TODOIST, STORAGE} from '../utils/Constants'
    import {isolateScroll, Http, DecryptAuth, generateId, POST} from '../utils/common'
    import TodoUtil from '../utils/TodoUtil'
    import {titleCase} from '../utils/StringUtils'
    import {TodosType, TodoListItemAction, TodoItemAction} from '../constants/Todos'

    let syncList
    const TodoType = TodosType.TODOIST;
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
                syncToken: Get(STORAGE.T_SYNC_TOKEN) || '*',
                errorState: ''
            }
        },
        mounted() {
            if (!this.authCode) {
                this.manageError({statusText: 'No Auth Code', status: 403});
                return;
            }
            isolateScroll('incomplete-todos-list');
            isolateScroll('complete-todos-list');
            isolateScroll('todo-sidebar');
            this.init()
            syncList = setInterval(this.sync, 5000)
        },
        computed: {
            currentListId() {
                return this.currentList && this.currentList.id
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
                return this.todos.filter(
                    todo => todo.listId === this.currentListId && !todo.isCompleted && !todo.isDeleted)
            },
            currentListCompleteTodos() {
                return this.todos.filter(
                    todo => todo.listId === this.currentListId && todo.isCompleted && !todo.isDeleted)
            }
        },
        methods: {
            toggleCompletedTodos(state) {
                this.showCompletedTodos = state
            },
            sortByOrder(data, isDescendingOrder) {
                if (isDescendingOrder) {
                    return data.sort(function(a, b) {
                        return b.order - a.order
                    })
                }
                return data.sort(function(a, b) {
                    return a.order - b.order;
                });
            },
            syncCall(url, data) {
                url = url || TODOIST.URL.BASE;
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
                return POST(url, {data}).then(response => {
                    this.errorState = '';
                    return response;
                }).catch(error => {
                    console.log(error);
                    this.manageError(error);
                })
            },
            toggle(field) {
                if (this.errorState) {
                    return
                }
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
                const baseUrl = TODOIST.URL.BASE;

                return this.syncCall(baseUrl).then(data => {
                    if (!data || !data.projects || !data.items) {
                        return
                    }
                    if (data.projects.length > 0) {
                        this.updateLists(data.projects);
                        this.syncToken = data.sync_token
                    }
                    if (data.items.length > 0) {
                        this.updateTodos(data.items);
                        this.syncToken = data.sync_token
                    }
                })
            },
            getLocalTodos() {
                try {
                    this.errorState = '';
                    return TodoUtil.getLocalTodos(TodosType.TODOIST)
                } catch (error) {
                    this.manageError({error})
                }
            },
            setLocalTodos(todos) {
                return TodoUtil.setLocalTodos(TodosType.TODOIST, todos)
            },
            unsetLocalTodos() {
                TodoUtil.unsetLocalTodos(TodosType.TODOIST)
            },
            getLocalLists() {
                try {
                    this.errorState = '';
                    return TodoUtil.getLocalLists(TodosType.TODOIST)
                } catch (error) {
                    this.manageError({error})
                }
            },
            setLocalLists(lists) {
                return TodoUtil.setLocalLists(TodosType.TODOIST, lists)
            },
            unsetLocalLists() {
                TodoUtil.unsetLocalLists(TodosType.TODOIST)
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
                    if (!data) {
                        return;
                    }
                    todoLists = data.projects;
                    todos = data.items
                    self.todoLists = todoLists.map(list => self.formatListResponse(list))
                    self.todos = data.items.filter(todo => !todo.is_deleted && !todo.in_history && !todo.is_archived).
                        map(todo => self.formatTodoResponse(todo))
                    // setting active current list
                    self.currentList = self.currentList || self.todoLists[0]
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
                const uuid = generateId();
                const temp_id = generateId();
                const commands = [{type, uuid, args, temp_id}];

                this.syncCall(TODOIST.URL.BASE, {commands}).then((response) => {
                    if (!response) {
                        return;
                    }
                    const status = response.sync_status[uuid];
                    if (status === 'ok') {
                        this.sync();
                    } else if (status) {
                        this.manageError(status)
                    }
                    this.showSidebar = false;
                    this.showTodoManager = false;
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
            changedTodo(info) {
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
                const type = value ? 'item_complete' : 'item_uncomplete';
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
            },
            manageError(errorInfo) {
                if (!navigator.onLine || (errorInfo && errorInfo.stack && errorInfo.stack.indexOf('TypeError') > -1)) {
                    this.errorState = 'offline';
                    return
                }
                // Response type gives read only properties
                if (!(errorInfo instanceof Response)) {
                    // errorInfo can be read only
                    errorInfo = errorInfo || {};
                    // Handling case when sync fails
                    errorInfo.status = errorInfo.status || errorInfo.http_code;
                    errorInfo.statusText = errorInfo.statusText || errorInfo.error;
                }
                // case when re-authenticate
                if (errorInfo.status > 400 && errorInfo.status < 500) {
                    this.errorState = 'reIntegrate';
                    clearInterval(syncList);
                    Remove(STORAGE.T_AUTH);
                    Remove(STORAGE.T_SYNC_TOKEN);
                    this.unsetLocalTodos();
                    this.unsetLocalLists();
                } else if ([501, 503].indexOf(errorInfo.status) > -1) {
                    this.errorState = 'serverIssue';
                }
                this.isLoadingTodos = false;
                Set(`Todoist-Error-${+(new Date())}`, errorInfo);
                this.$ga.event(TodoType, 'error', `${errorInfo.statusText}-${errorInfo.status}-${errorInfo.error_tag}`)
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
            TodoList,
            TodoError
        },
        beforeDestroy() {
            clearInterval(syncList)
        }
    }
</script>