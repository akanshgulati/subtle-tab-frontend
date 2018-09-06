<template>
    <div id="todos" v-on:click.stop="" class="todos-arrow_box relative flex-flow-column flex">

        <header class="flex widget-header flex-center flex-space-between">
            <svg class="pointer flex-no-shrink one-rem-height one-rem-width" v-on:click="toggle('showSidebar'); showTodoManager = false;" viewBox="0 0 23 21" version="1.1">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="hamburger" transform="translate(0.000000, 2.000000)" stroke="#7d7d7d" stroke-width="4">
                        <path d="M0.132183908,0 L22.8678161,0" id="XMLID_6_"></path>
                        <polyline id="XMLID_9_" points="0.132183908 16.8 20.0697663 16.8 22.8678161 16.8"></polyline>
                        <path d="M0.132183908,8.4 L22.8678161,8.4" id="XMLID_8_"></path>
                    </g>
                </g>
            </svg>
            <!-- HEADER LIST TITLE -->
            <h4 class="widget-heading mar-0">Todo (T) : {{currentListTitle }}</h4>
            <!-- HEADER BUTTONS -->
            <div class="button-section flex flex-center">
                <svg v-show="currentListId != 'inbox' && currentListId != 'today'" @click.stop="deleteList" class="delete-icon pointer one-rem-width one-rem-height" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 482.428 482.429" style="enable-background:new 0 0 482.428 482.429;" xml:space="preserve">
                <g>
                    <g>
                        <path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098    c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117    h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828    C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879    C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096    c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266    c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979    V115.744z"/>
                        <path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07    c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"/>
                        <path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07    c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"/>
                        <path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07    c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"/>
                    </g>
                </g>
                </svg>
            </div>
        </header>

        <section class="flex relative todo-section flex-flow-column"
                 @click.stop="showTodoManager = showSidebar = false">
            <div v-if="todoLists && todoLists.length > 0"
                 id="todo-sidebar"
                 class="sidebar flex-flow-column flex"
                 :class="{'show-sidebar': showSidebar }"
                 @click.stop="">
                <TodoList
                    :list="todoLists"
                    :current="currentListId"
                    v-on:changed="changedTodoList"
                    :count="todosCount"/>
            </div>

            <div id="todo-manager-sidebar"
                 class="sidebar-right flex-flow-column flex"
                 :class="{'show-right-sidebar': showTodoManager }"
                 @click.stop="">
                <TodoManager :todo="currentTodo" @changed="updateTodo" v-if="showTodoManager"/>
            </div>

            <div id="todo" class="todos"
                 :class="{'disable-pointer': showSidebar || showTodoManager}">
                <TodosGroup
                    id="incomplete-todos-list" class="mar-0"
                    :todos="incompleteTodos"
                    v-on:changed="changedTodo"
                    v-on:edit="changedTodo"
                />
                <AddTodo
                    class="pv-10"
                    v-on:create="createTodo"
                    :is-completed-enabled="!!completedTodos.length"
                    v-on:toggleCompleted="toggleCompletedTodos"/>

                <transition name="fast-fade" mode="out-in">
                    <NoTodo key="no" :currentListTitle="currentListTitle" v-if="!incompleteTodos.length && !showCompletedTodos"/>
                    <!--COMPLETE TASKS LOOP-->
                    <TodosGroup
                        key="completed"
                        v-if="showCompletedTodos"
                        id="complete-todos-list" class="mar-0"
                        :todos="completedTodos"
                        isCompletedList="true"
                        v-on:changed="changedTodo"
                        v-on:edit="changedTodo"
                    />
                </transition>
            </div>
        </section>
    </div>
</template>

<script>
    import TodosGroup from '../shared/TodosGroup.vue'
    import AddTodo from '../shared/AddTodo.vue'
    import TodoList from '../shared/TodoList.vue'
    import TodoManager from '../shared/TodoManager.vue'
    import NoTodo from '../shared/NoTodo.vue'

    import storage, {Get, Remove, Set} from '../utils/storage'
    import {STORAGE} from '../utils/Constants'
    import timeUtil from '../utils/timeUtil'
    import {generateId, isolateScroll} from '../utils/common'
    import {titleCase} from '../utils/StringUtils'
    import {TodoItemAction, TodoListItemAction} from '../constants/Todos'

    export default {
        beforeCreate() {
            this.todosMeta = Get(STORAGE.TODOS_META) || []
        },
        data() {
            return {
                input: '',
                todoLists: [],
                allTodos: [],
                currentTodo: {},
                currentTodoContent: '',
                todosMeta: this.todosMeta,
                errorMessage: null,
                showSidebar: false,
                showTodoManager: false,
                listTitle: '',
                currentListId: Get(STORAGE.CURRENT_TODO_LIST) || 'inbox',
                showCompletedTodos: false
            }
        },
        beforeMount() {
            this.populateTodoLists()
            this.populateTodos()
        },
        mounted() {
            isolateScroll('todos-list')
            isolateScroll('todo-sidebar')
        },
        computed: {
            todos() {
                if (this.currentListId === 'today') {
                    return this.allTodos.filter(todo => timeUtil.isTodayDate(todo.dueOn))
                }
                return this.allTodos.filter(todo => todo.list === this.currentListId)
            },
            completedTodos() {
                return this.todos.filter(todo => todo.isCompleted)
            },
            incompleteTodos() {
                return this.todos.filter(todo => !todo.isCompleted)
            },
            currentList() {
                return this.todoLists && this.todoLists.find(list => list.id === this.currentListId)
            },
            currentListTitle() {
                return this.currentList && titleCase(this.currentList.title)
            },
            todosCount() {
                let obj = {}
                this.todoLists.forEach(list => {
                    obj[list.id] = 0
                })
                this.allTodos.forEach(todo => {
                    obj[todo.list]++
                    // updating today to-do count for today
                    timeUtil.isTodayDate(todo.dueOn) ? obj['today']++ : ''
                })
                debugger;
                return obj;
            }
        },
        methods: {
            toggle(field) {
                this[field] = !this[field]
            },
            toggleCompletedTodos(state) {
                this.showCompletedTodos = state
            },
            populateTodoLists() {
                this.todoLists = [
                    {
                        title: 'Inbox',
                        id: 'inbox'
                    }, {
                        title: 'Due Today',
                        id: 'today'
                    }]
                // console.info('List ids ', this.todoLists)
                const listIdsArray = Get(STORAGE.TODO_LISTS_META)
                if (!listIdsArray || listIdsArray.length === 0) {
                    return
                }
                const createdLists = listIdsArray.map(listId => {
                    return Get(STORAGE.TODO_LIST + listId)
                })
                this.todoLists = this.todoLists.concat(createdLists)
            },
            populateTodos() {
                const todosMeta = Get(STORAGE.TODOS_META)
                this.allTodos = []
                if (!todosMeta || todosMeta.length === 0) {
                    return
                }
                this.allTodos = todosMeta.map(todoId => {
                    return Get(STORAGE.TODO + todoId)
                })
            },
            createList(title) {
                if (!title) {
                    return
                }
                const list = {
                    id: generateId(),
                    title: title,
                    createdOn: +new Date(),
                    updatedOn: +new Date(),
                    isDeleted: false
                }
                storage.append(STORAGE.TODO_LISTS_META, list.id)
                Set(STORAGE.TODO_LIST + list.id, list)
                this.todoLists.push(list)
                this.setActiveList(list.id)
                this.listTitle = ''
            },
            deleteList(listId) {
                if (!confirm('Are you sure, all todos of list will be deleted?')) {
                    return
                }
                // Delete the list and all todos related to it
                let todoListsMeta = Get(STORAGE.TODO_LISTS_META)
                todoListsMeta.splice(todoListsMeta.indexOf(listId), 1)
                Set(STORAGE.TODO_LISTS_META, todoListsMeta)
                Remove(STORAGE.TODO_LIST + this.currentListId)

                this.setActiveList('inbox')
                // Remove all todos related to that list
                let toDeleteTodos = this.allTodos.filter(todo => todo.list === listId)
                let todosMeta = Get(STORAGE.TODOS_META)
                for (let i = 0; i < toDeleteTodos.length; i++) {
                    let todo = toDeleteTodos[i]
                    todosMeta.splice(todosMeta.indexOf(todo.id), 1)
                    Remove(STORAGE.TODO + todo.id)
                }
                Set(STORAGE.TODOS_META, todosMeta)

                this.populateTodoLists()
            },
            createTodo(_todo) {
                if (!_todo || !_todo.title) {
                    return
                }
                let dueDate

                if (this.currentListId === 'today') {
                    dueDate = timeUtil.getEndOfDay()
                }
                const todo = {
                    id: generateId(),
                    title: _todo.title,
                    isStarred: false,
                    isRepeat: false,
                    repeat_type: '',
                    list: this.currentListId,
                    isCompleted: false,
                    completedOn: '',
                    createdOn: +new Date(),
                    updatedOn: +new Date(),
                    dueOn: dueDate || _todo.dueOn
                }
                storage.append(STORAGE.TODOS_META, todo.id)
                Set(STORAGE.TODO + todo.id, todo)
                this.allTodos.push(todo)
            },
            getCurrentTodo(id) {
                return this.allTodos.find(todo => todo.id === id)
            },
            getCurrentTodoIndex(id) {
                return this.allTodos.findIndex(todo => todo.id === id)
            },
            changedTodoList(data) {
                if (!data) {
                    return
                }
                switch (data.action) {
                    case TodoListItemAction.CREATE :
                        const title = data.data.title
                        this.createList(title)
                        return
                    case TodoListItemAction.SELECT:
                        this.setActiveList(data.list.id)
                        return
                    case TodoListItemAction.DELETE:
                        this.deleteList(data.list.id)
                }
            },
            changedTodo(data) {
                if (!data) {
                    return
                }
                const todoId = data.todo && data.todo.id
                let currentTodo = this.getCurrentTodo(todoId)
                if (data.action === TodoItemAction.COMPLETE) {
                    currentTodo.isCompleted = data.value
                    if (currentTodo.isCompleted) {
                        currentTodo.completedOn = +new Date()
                    } else {
                        currentTodo.completedOn = null
                    }
                }
                else if (data.action === TodoItemAction.EDIT) {
                    this.editTodo(data.todo)
                    /*const currentTodoIndex = this.getCurrentTodoIndex(todoId)
                    const updatedTodo = Object.assign({}, currentTodo, data.value)
                    this.$set(this.allTodos, currentTodoIndex, updatedTodo)
                    // updating it to current for below logic
                    currentTodo = updatedTodo*/
                    return
                }
                else if (data.action === TodoItemAction.DELETE) {
                    this.deleteTodo(data.todo)
                    return
                }
                currentTodo.updatedOn = +new Date()
                Set(STORAGE.TODO + currentTodo.id, currentTodo)
            },
            setActiveList(id) {
                //console.log('setActiveList', id);
                Set(STORAGE.CURRENT_TODO_LIST, id)
                this.currentListId = id
                this.showSidebar = false
                this.showCompletedTodos = false;
            },
            deleteTodo(todo) {
                if (!confirm('Are you sure you want to delete this todo?')) {
                    return
                }
                let todosMeta = Get(STORAGE.TODOS_META)
                todosMeta.splice(todosMeta.indexOf(todo.id), 1)
                Set(STORAGE.TODOS_META, todosMeta)
                Remove(STORAGE.TODO + todo.id)
                this.populateTodos()
            },
            editTodo(todo) {
                if (this.showSidebar) {
                    return
                }
                this.showTodoManager = true
                this.currentTodo = Object.assign({}, todo)
            },
            updateTodo(data) {
                if (data.action === TodoItemAction.EDIT) {
                    const updatedTodo = data.todo
                    const currentTodoIndex = this.getCurrentTodoIndex(this.currentTodo.id)
                    this.$set(this.allTodos, currentTodoIndex, updatedTodo)
                    // updating it to current for below logic
                    Set(STORAGE.TODO + this.currentTodo.id, updatedTodo)
                    this.showTodoManager = false
                }
            }
        },
        components: {
            TodosGroup,
            AddTodo,
            TodoList,
            TodoManager,
            NoTodo
        }
    }
</script>

<style scoped>
    #todo {
        background: rgba(255, 255, 255, 0.85)
    }
</style>
