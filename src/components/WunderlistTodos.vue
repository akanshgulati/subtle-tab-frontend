<template>
    <div id="todos" v-on:click.stop="" class="todos-arrow_box relative flex-flow-column flex text-black">
        <header class="flex widget-header flex-center">
            <!-- HAMBURGER ICON -->
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
            <i class="integrate-icon icon--wunderlist mh-5 flex-no-shrink"></i>
            <h4 class="widget-heading ml-5 mv-0">{{ titleCase(currentList.title)}}</h4>
        </header>

        <section class="flex relative todo-section flex-flow-column" @click.stop="showSidebar=false; showTodoManager=false">
            <!-- TO-DO SIDEBAR -->
            <div id="todo-sidebar" class="sidebar flex-flow-column flex" :class="{'show-sidebar': showSidebar }" @click.stop="">
                <TodoList :list="todoLists"
                          :current="currentListId"
                          v-on:changed="changedTodoList"
                          :show-todos-count="false"
                          :is-create-enabled="false"/>
            </div>
            <!-- TO-DO MANAGER -->
            <div id="todo-manager-sidebar" class="sidebar-right flex-flow-column flex"
                 :class="{'show-right-sidebar': showTodoManager }" @click.stop="">
                <TodoManager :todo="currentTodo" @changed="updateTodo" v-if="showTodoManager"/>
            </div>

            <div id="todo"
                 class="flex flex-flow-column"
                 :class="{'flex-justify-center': isLoadingTodos, 'disable-pointer': showSidebar || showTodoManager}"
                 style="background: rgba(255,255,255,0.9);">
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
                            v-if="incompleteTodos.length"
                            id="incomplete-todos-list" class="mar-0"
                            :todos="incompleteTodos"
                            v-on:changed="changedTodo"
                        />

                        <AddTodo
                            class="pv-10"
                            v-on:create="createTodo"
                            :is-completed-enabled="!!(completedTodos && completedTodos.length)"
                            v-on:toggleCompleted="toggleCompletedTodos"/>
                        <!--COMPLETE TASKS LOOP-->
                        <transition mode="out-in" name="fast-fade">
                            <!--SHOWING A NO TASK STATE-->
                            <NoTodo key="no" :currentListTitle="currentListTitle"
                                    v-if="!incompleteTodos.length && !showCompletedTodos"/>

                            <TodosGroup
                                key="incomplete-todos"
                                v-if="showCompletedTodos && completedTodos && completedTodos.length"
                                id="complete-todos-list" class="mar-0"
                                :todos="completedTodos"
                                isCompletedList="true"
                                v-on:changed="changedTodo"
                            />
                        </transition>

                    </div>

                    <!--<div v-if="!todos.length" id="no-todo"
                         class="flex flex-flow-column flex-justify-center flex-center">
                        <img src="images/todo-no-item.png" alt="No Todo" width="134px">
                        <em>No tasks to do in {{currentList.title}} list!</em>
                    </div>-->
                </template>
            </div>
        </section>

    </div>
</template>

<script>
    import {Get, Set, Remove} from '../utils/storage'
    import {WUNDERLIST, STORAGE} from '../utils/Constants'
    import {isolateScroll} from '../utils/common'
    import {titleCase} from '../utils/StringUtils'
    import {DecryptAuth} from '../utils/common'
    import {TodoItemAction, TodoListItemAction} from '../constants/Todos'

    import AddTodo from '../shared/AddTodo.vue'
    import TodosGroup from '../shared/TodosGroup.vue'
    import TodoList from '../shared/TodoList.vue'
    import TodoManager from '../shared/TodoManager.vue'
    import NoTodo from '../shared/NoTodo.vue'

    let syncWunderlist
    export default {
        beforeMount() {

        },
        data() {
            return {
                titleCase,
                todoLists: [],
                currentTodo: '',
                showSidebar: false,
                showTodoManager: false,
                currentList: Get(STORAGE.W_CURRENT_TODO_LIST) || {},
                isLoadingTodos: true,
                wunderlistTaskUrl: WUNDERLIST.URL.TASKS,
                syncTime: '',
                showCompletedTodos: false,
                completedTodos: '',
                incompleteTodos: '',
                auth: DecryptAuth(Get(STORAGE.W_AUTH))
            }
        },

        mounted() {
            if (!this.auth) {
                return
            }
            isolateScroll('incomplete-todos-list')
            isolateScroll('complete-todos-list')
            isolateScroll('todo-sidebar')
            this.init()

            syncWunderlist = setInterval(this.sync, 5000)
        },
        computed: {
            authCode() {
                return this.auth.access_token
            },
            sortedTodos() {
                return this.sortTodos()
            },
            currentListId() {
                return this.currentList.id
            },
            todos() {
                let arr = []
                arr = arr.concat(this.completedTodos)
                arr = arr.concat(this.incompleteTodos)
                return arr
            },
            currentListTitle() {
                return this.currentList && this.currentList.title
            }
        },
        methods: {
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
            changedTodo(data) {
                if (!data || !data.action) {
                    return
                }
                switch (data.action) {
                    case TodoItemAction.EDIT:
                        this.editTodo(data.todo)
                        return
                    case TodoItemAction.DELETE:
                        this.deleteTodo(data.todo)
                        return
                    case TodoItemAction.COMPLETE:
                        this.checkedTodo(data)
                        return
                }
            },
            toggleCompletedTodos(state) {
                this.showCompletedTodos = state
            },
            http(url, method, data) {
                return new Promise((resolve, reject) => {
                    let xmlhttp = new XMLHttpRequest()
                    method = method || 'GET'
                    xmlhttp.open(method, url)
                    xmlhttp.setRequestHeader('X-Client-ID', 'd63bcf15740b10b6790a')
                    xmlhttp.setRequestHeader('X-Access-Token', this.authCode)
                    xmlhttp.setRequestHeader('Content-type', 'application/json')
                    xmlhttp.onreadystatechange = function() {
                        if (xmlhttp.readyState === 4) {
                            resolve(JSON.parse(xmlhttp.responseText))
                        }
                    }
                    xmlhttp.onerror = () => {
                        reject(xmlhttp.status)
                        console.error(xmlhttp.status)
                    }
                    xmlhttp.send(JSON.stringify(data))
                })
            },
            toggle(field) {
                this[field] = !this[field]
            },
            init() {
                // If local list is present
                if (this.currentList && this.currentList.id) {
                    // check for revisions
                    this.getTodoLists(this.currentList.id).then((_list) => {
                        if (!_list) {
                            this.resetTodos()
                            return
                        }
                        if (_list.revision > this.currentList.revision) {
                            this.getTodos(this.currentList.id)
                            return
                        }
                        let localTodos = this.getLocalTodos()
                        if (!localTodos) {
                            this.getTodos(this.currentList.id)
                            return
                        }
                        this.getTodos(this.currentList.id)

                    }, () => {
                        this.resetTodos()
                    })
                    return
                }
                /*this.getDefaultCurrentList().then(() => {
                    this.getTodos(this.currentList.id).then(todos => this.todos = todos)
                })*/
                this.resetTodos()
            },
            sync() {
                if (!this.currentList || !this.currentList.id) {
                    return
                }
                // check for revisions
                this.getTodoLists(this.currentList.id).then((_list) => {
                    if (!_list) {
                        this.resetTodos()
                        return
                    }
                    let currentRevision = this.currentList.revision
                    if (_list.revision > currentRevision) {
                        this.currentList = _list
                        this.getTodos(this.currentList.id, true)
                    }
                }, () => {
                    this.resetTodos()
                })
            },
            getLocalTodos() {
                let localMetaArr = Get(STORAGE.W_TODOS_META)
                if (!localMetaArr) {
                    return
                }

                let allTodos = localMetaArr.map(localTodoId => {
                    return Get(STORAGE.W_TODO + localTodoId)
                })
                this.completedTodos = allTodos.filter(todo => todo.isCompleted)
                this.incompleteTodos = allTodos.filter(todo => !todo.isCompleted)
            },
            setLocalTodos(todos) {
                this.unsetLocalTodos()
                let todosArr = []
                todos.forEach(todo => {
                    todosArr.push(todo.id)
                    Set(STORAGE.W_TODO + todo.id, todo)
                })
                Set(STORAGE.W_TODOS_META, todosArr)
            },
            unsetLocalTodos() {
                let localMetaArr = Get(STORAGE.W_TODOS_META)
                if (!localMetaArr) {
                    return
                }
                localMetaArr.map(localTodoId => {
                    return Remove(STORAGE.W_TODO + localTodoId)
                })
            },
            resetTodos() {
                this.getTodoLists().then((_lists) => {
                    this.currentList = _lists[0]
                    this.getTodos(this.currentList.id)
                })
            },
            getTodoLists(id) {
                let url = WUNDERLIST.URL.LISTS
                return this.http(url).then((data) => {
                    // Update lists
                    this.todoLists = data.map(list => {
                        return {
                            id: list.id,
                            title: list.title,
                            revision: list.revision
                        }
                    })

                    if (id) {
                        let list = (data.filter(list => list.id === id))[0]
                        if (!list) {
                            return false
                        }
                        return {
                            id: list.id,
                            title: list.title,
                            revision: list.revision
                        }
                    }
                    return this.todoLists
                })
            },
            getTodoList(id) {
                const url = WUNDERLIST.URL.LISTS + '\\' + id
                return this.http(url).then((list) => {
                    return {
                        id: list.id,
                        title: list.title,
                        revision: list.revision
                    }
                })
            },
            getTodos(listId, notShowLoading) {
                if (!listId) {
                    return
                }
                const url = WUNDERLIST.URL.TASKS + '?list_id=' + listId
                const url_completed = url + '&completed=true'

                let p1 = this.http(url_completed)
                let p2 = this.http(url)

                if (!notShowLoading) {
                    this.isLoadingTodos = true
                }
                return Promise.all([p1, p2]).then((data) => {
                    this.incompleteTodos = data[1].map(todo => this.formatTodoResponse(todo)) || []
                    this.completedTodos = data[0].map(todo => this.formatTodoResponse(todo)) || []
                    //todos = data[0].concat(data[1])
                    // todos = todos.map(todo => this.formatTodoResponse(todo))
                    this.setLocalTodos(this.todos)
                    this.isLoadingTodos = false
                })
            },
            formatTodoResponse(todo) {
                return {
                    id: todo.id,
                    title: todo.title,
                    revision: todo.revision,
                    isCompleted: todo.completed,
                    isStarred: todo.starred,
                    listId: todo.list_id,
                    dueOn: todo.due_date,
                    updatedOn: todo.completed_at ? +new Date(todo.completed_at) : +new Date(todo.created_at)
                }
            },
            createTodo(data) {
                if (!data || !data.title) {
                    return
                }
                const todo = {
                    title: data.title,
                    list_id: this.currentListId
                }
                this.http(this.wunderlistTaskUrl, 'POST', todo).then((_todo) => {
                    this.incompleteTodos.push(this.formatTodoResponse(_todo))
                    // this.todos.unshift(this.formatTodoResponse(_todo))
                })
            },
            checkedTodo(data) {
                if (!data || !data.todo || !data.value) {
                    return
                }

                const todo = data.todo;
                todo.isCompleted = data.value;

                this.patchTodo(todo.id, {completed: todo.isCompleted, revision: todo.revision}).then((_todo) => {
                    const updatedTodo = this.formatTodoResponse(_todo)
                    Object.assign(todo, updatedTodo)
                    if (todo.isCompleted) {
                        this.incompleteTodos.splice(this.incompleteTodos.indexOf(todo), 1)
                        this.completedTodos.unshift(todo)
                    } else {
                        this.completedTodos.splice(this.completedTodos.indexOf(todo), 1)
                        this.incompleteTodos.push(todo)
                    }
                })
            },
            setActiveList(list) {
                this.isLoadingTodos = true
                this.showSidebar = false
                this.currentList = list
                this.init()
            },
            deleteList(list) {
                if (!confirm(`Are you sure you want to delete ${list.title} list?`)) {
                    return
                }
                const url = `${WUNDERLIST.URL.LISTS}/${list.id}?revision=${list.revision}`

                this.http(url, 'DELETE').then(() => {
                    this.setActiveList(this.todoLists[0]);
                })
            },
            deleteTodo(todo) {
                if (!confirm('Are you sure you want to delete this todo?')) {
                    return
                }
                const url = `${this.wunderlistTaskUrl}/${todo.id}?revision=${todo.revision}`

                this.http(url, 'DELETE').then(() => {
                    if (todo.isCompleted) {
                        this.completedTodos.splice(this.completedTodos.indexOf(todo), 1)
                    } else {
                        this.incompleteTodos.splice(this.incompleteTodos.indexOf(todo), 1)
                    }
                })
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
                    this.patchTodo(this.currentTodo.id, {
                        title: updatedTodo.title,
                        due_date: updatedTodo.dueOn,
                        revision: this.currentTodo.revision
                    }).then((_todo) => {
                        this.$set(this.todos, this.currentTodoIndex, this.formatTodoResponse(_todo))
                        this.showTodoManager = false
                    })
                }
            },
            patchTodo(id, data) {
                let url = this.wunderlistTaskUrl + '/' + id
                return this.http(url, 'PATCH', data)
            },
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
            currentList: {
                handler: function(newValue) {
                    if (!newValue || !newValue.id) {
                        return
                    }
                    Set(STORAGE.W_CURRENT_TODO_LIST, this.currentList)
                }
            }
        },
        components: {
            AddTodo,
            TodosGroup,
            TodoList,
            TodoManager,
            NoTodo
        },
        beforeDestroy() {
            clearInterval(syncWunderlist)
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