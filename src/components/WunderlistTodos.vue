<template>
    <div id="todos" v-on:click.stop="" class="todos-arrow_box relative flex-flow-column flex text-black">
        <TodoHeader
            :current-list="currentList"
            todo-type="w"
            v-on:changed="todoHeaderChanged"
            :is-pinned="settings.isPinned"/>

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

            <TodoError
                v-if="errorState"
                :error-state="errorState"
                v-on:click.stop="showSidebar = showTodoManager = false"
            />

            <div id="todo"
                 v-if="!errorState"
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
                    <div class="todos" id="scroll-page">
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
                            :is-completed-enabled="false && !!(completedTodos && completedTodos.length)"
                            v-on:toggleCompleted="toggleCompletedTodos"/>
                        <!--COMPLETE TASKS LOOP-->
                        <transition mode="out-in" name="fast-fade">
                            <!--SHOWING A NO TASK STATE-->
                            <NoTodo key="no" :currentListTitle="currentListTitle"
                                    v-if="!incompleteTodos.length && !showCompletedTodos"/>

                           <!-- <TodosGroup
                                key="incomplete-todos"
                                v-if="showCompletedTodos && completedTodos && completedTodos.length"
                                id="complete-todos-list" class="mar-0"
                                :todos="completedTodos"
                                isCompletedList="true"
                                v-on:changed="changedTodo"
                            />-->
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
    import {isolateScroll, isArray, Http, DecryptAuth, isUndefined} from '../utils/common'
    import {titleCase} from '../utils/StringUtils'
    import {unsetLocalTodos, setLocalTodos, getLocalTodos} from '../utils/TodoUtil'
    import {TodoItemAction, TodoListItemAction, TodosType} from '../constants/Todos'

    import AddTodo from '../shared/AddTodo.vue'
    import TodosGroup from '../shared/TodosGroup.vue'
    import TodoList from '../shared/TodoList.vue'
    import TodoManager from '../shared/TodoManager.vue'
    import NoTodo from '../shared/NoTodo.vue'
    import TodoError from '../shared/TodoError.vue'
    import TodoHeader from '../shared/TodoHeader.vue'

    let syncWunderlist;
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
                showCompletedTodos: false,
                incompleteTodos: '',
                auth: DecryptAuth(Get(STORAGE.W_AUTH)),
                todos: [],
                errorState: ''
            }
        },
        mounted() {
            if (!this.auth) {
                this.manageError({statusText: 'No Auth Code', status: 403});
                return;
            }
            isolateScroll('incomplete-todos-list');
            // isolateScroll('complete-todos-list');
            isolateScroll('todo-sidebar');
            this.init();

            syncWunderlist = setInterval(this.sync, 5000)
        },
        computed: {
            authCode() {
                return this.auth.access_token
            },
            currentListId() {
                return this.currentList.id
            }
           /* todos() {
                let arr = [];
                arr = arr.concat(this.completedTodos);
                arr = arr.concat(this.incompleteTodos);
                setLocalTodos(TodosType.WUNDERLIST, arr);
                return arr
            }*/,
            currentListTitle() {
                return this.currentList && this.currentList.title
            }
        },
        methods: {
            todoHeaderChanged(data) {
                if (!data || !data.action) {
                    return;
                }
                switch (data.action) {
                    case 'pinned':
                        this.settings.isPinned = !this.settings.isPinned;
                        return;
                    case TodoListItemAction.DELETE:
                        if (this.currentList) {
                            this.deleteList(this.currentList);
                        }
                        return;
                    case 'viewList':
                        this.toggle('showSidebar');
                        this.showTodoManager = false;
                        return;
                }
            },
            changedTodoList(info) {
                if (!info || !info.action) {
                    return
                }
                switch (info.action) {
                    case TodoListItemAction.SELECT:
                        this.setActiveList(info.list);
                        return;
                    case TodoListItemAction.DELETE:
                        this.deleteList(info.list);
                        return;
                }
            },
            changedTodo(data) {
                if (!data || !data.action) {
                    return
                }
                // console.log("Changed Todo", data);
                switch (data.action) {
                    case TodoItemAction.EDIT:
                        this.editTodo(data.todo);
                        return;
                    case TodoItemAction.DELETE:
                        this.deleteTodo(data.todo);
                        return;
                    case TodoItemAction.COMPLETE:
                        this.checkedTodo(data);
                        return;
                }
            },
            toggleCompletedTodos(state) {
                this.showCompletedTodos = state
            },
            http(url, method = 'GET', data) {
                const headers = [{
                  name: 'X-Client-ID',
                  value: 'd63bcf15740b10b6790a'
                }, {
                    name: 'X-Access-Token',
                    value: this.authCode
                }, {
                    name: 'Content-Type',
                    value: 'application/json'
                }];
                const obj = {
                    method,
                    data,
                    headers
                };
                this.errorState = '';
                return Http(url, obj).catch(error => {
                    this.manageError(error);
                });
            },
            toggle(field) {
                if (this.errorState) {
                    return
                }
                this[field] = !this[field]
            },
            init() {
                // If local list is present
                if (this.currentList && this.currentList.id) {
                    // check for revisions
                    this.getTodoLists(this.currentList.id).then((_list) => {
                        if (!_list) {
                            this.resetTodos();
                            return
                        }
                        if (_list.revision > this.currentList.revision) {
                            this.currentList.revision = _list.revision;
                            this.getTodos(this.currentList.id);
                            return
                        }
                        // if list revision is same, try to retrieve local saved todos
                        this.incompleteTodos = getLocalTodos(TodosType.WUNDERLIST);
                        // we handle change of list here
                        if (!this.incompleteTodos || !isArray(this.incompleteTodos) || !this.incompleteTodos.length) {
                            this.getTodos(this.currentList.id);
                        } else {
                            this.isLoadingTodos = false;
                        }
                    }, () => {
                        this.resetTodos()
                    });
                    return
                }
                this.resetTodos()
            },
            sync() {
                if (!this.currentList || !this.currentList.id) {
                    return
                }
                // check for revisions
                this.getTodoLists(this.currentList.id).then(_list => {
                    if (!_list) {
                        this.resetTodos();
                        return
                    }
                    const currentRevision = this.currentList.revision;
                    if (_list.revision > currentRevision) {
                        this.currentList = _list;
                        this.getTodos(this.currentList.id, true)
                    }
                }, () => {
                    this.resetTodos()
                })
            },
            resetTodos() {
                this.getTodoLists().then(_lists => {
                    if (!_lists || !isArray(_lists)) {
                        this.manageError();
                        return;
                    }
                    this.currentList = _lists[0];
                    this.getTodos(this.currentList.id)
                });
            },
            getTodoLists(id) {
                const url = WUNDERLIST.URL.LISTS;
                return this.http(url).then(lists => {
                    if (!lists) {
                        return;
                    }
                    // Update lists
                    this.todoLists = lists.map(list => {
                        return {
                            id: list.id,
                            title: list.title,
                            revision: list.revision
                        }
                    });
                    if (id) {
                        return this.todoLists.find(list => list.id === id);
                    }
                    return this.todoLists
                })
            },
            getTodoList(id) {
                const url = WUNDERLIST.URL.LISTS + '\\' + id;
                return this.http(url).then((list) => {
                    if (!list) {
                        return;
                    }
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
                const url = WUNDERLIST.URL.TASKS + '?list_id=' + listId;
                //const url_completed = url + '&completed=true';

                //let p1 = Promise.resolve([]) || this.http(url_completed);
                let p2 = this.http(url);

                if (!notShowLoading) {
                    this.isLoadingTodos = true
                }
                return Promise.all([p2]).then((data) => {
                    if (!data || !isArray(data)) {
                        return;
                    }
                    const rawTodos = [].concat(data[0]);
                    this.incompleteTodos = rawTodos.map(todo => this.formatTodoResponse(todo));
                    /*this.incompleteTodos = data[1].map(todo => this.formatTodoResponse(todo)) || [];
                    this.completedTodos = data[0].map(todo => this.formatTodoResponse(todo)) || [];*/
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
                };
                const self = this;
                this.http(this.wunderlistTaskUrl, 'POST', todo).then(_todo => {
                    //this.incompleteTodos.push(this.formatTodoResponse(_todo))
                    // this.todos.unshift(this.formatTodoResponse(_todo))
                    //this.todos.push(this.formatTodoResponse(_todo));
                    if (!_todo || !_todo.id) {
                        return;
                    }
                    self.incompleteTodos.push(this.formatTodoResponse(_todo));
                    self.$nextTick(() => {
                        const todo = document.querySelector('#scroll-page');
                        todo.scroll({left: 0, top: todo.scrollHeight, behaviour: 'smooth'});
                    });
                    this.currentList.revision++;
                    //this.$set(this.todos, this.todos.length, _todo);
                })
            },
            checkedTodo(data) {
                if (!data || !data.todo || isUndefined(data.value)) {
                    return
                }

                const todo = Object.assign({}, data.todo);
                todo.isCompleted = data.value;

                this.patchTodo(todo.id, {completed: todo.isCompleted, revision: todo.revision}).then(updatedTodo => {
                    // updatedTodo.updatedOn = +new Date();
                    // Object.assign(todo, updatedTodo);
                    const todoIndex = this.incompleteTodos.findIndex(todo => todo.id === updatedTodo.id);
                    // console.log("Index",todoIndex, "Todos List", this.incompleteTodos);
                    //this.$set(this.incompleteTodos, todoIndex, updatedTodo);
                    this.incompleteTodos.splice(todoIndex, 1);
                })
            },
            setActiveList(list) {
                this.isLoadingTodos = true;
                this.showSidebar = false;
                this.currentList = list;
                unsetLocalTodos(TodosType.WUNDERLIST);
                this.init()
            },
            deleteList(list) {
                if (!confirm(`Are you sure you want to delete "${list.title}" list?`)) {
                    return
                }
                const delete_url = `${WUNDERLIST.URL.LISTS}/${list.id}?revision=${list.revision}`;

                this.http(delete_url, 'DELETE').then(() => {
                    // assuming that we are storing inbox as first list
                    this.setActiveList(this.todoLists[0]);
                })
            },
            deleteTodo(todo) {
                if (!todo || !todo.id || isUndefined(todo.revision)) {
                    return;
                }
                if (!confirm('Are you sure you want to delete this todo?')) {
                    return
                }
                const delete_url = `${this.wunderlistTaskUrl}/${todo.id}?revision=${todo.revision}`;

                this.http(delete_url, 'DELETE').then(() => {
                    /*if (todo.isCompleted) {
                        this.completedTodos.splice(this.completedTodos.indexOf(todo), 1)
                    } else {
                        this.incompleteTodos.splice(this.incompleteTodos.indexOf(todo), 1)
                    }*/
                    const todoIndex = this.getTodoIndex(todo);
                    this.incompleteTodos.splice(todoIndex, 1);
                });
            },
            getTodoIndex(todo){
                if(!todo){
                    return;
                }
                return this.incompleteTodos.findIndex(_todo => _todo.id === todo.id);
            },
            editTodo(todo) {
                if (this.showSidebar || !todo) {
                    return
                }
                this.showTodoManager = true;
                this.currentTodo = Object.assign({}, todo)
            },
            updateTodo(data) {
                if (!data || !data.action) {
                    return;
                }
                if (data.action === TodoItemAction.EDIT) {
                    const updatedTodo = data.todo;
                    // updating it to current for below logic
                    this.patchTodo(this.currentTodo.id, {
                        title: updatedTodo.title,
                        due_date: updatedTodo.dueOn,
                        revision: this.currentTodo.revision
                    }).then((_todo) => {
                        if (!_todo || !_todo.id) {
                            return;
                        }
                        const todoIndex = this.getTodoIndex(_todo);
                        this.$set(this.incompleteTodos, todoIndex, _todo);
                        // add code here
                        this.showTodoManager = false;
                    })
                }
            },
            patchTodo(id, data) {
                let url = this.wunderlistTaskUrl + '/' + id;
                return this.http(url, 'PATCH', data).then(response => {
                    this.currentList.revision++;
                    return this.formatTodoResponse(response);
                })
            },
            manageError(errorInfo) {
                if (!navigator.onLine || (errorInfo && errorInfo.stack && errorInfo.stack.indexOf('TypeError') > -1)) {
                    this.errorState = 'offline';
                    return
                }
                if (isUndefined(errorInfo)) {
                    return;
                }
                // case when re-authenticate
                if (errorInfo.status > 400 && errorInfo.status < 500) {
                    this.errorState = 'reIntegrate';
                    clearInterval(syncWunderlist);
                    Remove(STORAGE.W_AUTH);
                    Remove(STORAGE.W_CURRENT_TODO_LIST);
                    unsetLocalTodos(TodosType.WUNDERLIST);
                } else if ([501, 503].indexOf(errorInfo.status) > -1) {
                    this.errorState = 'serverIssue';
                }
                this.isLoadingTodos = false;
                this.$ga.event(TodosType.WUNDERLIST, 'error', `${errorInfo.reason}-${errorInfo.status}`)
            }
        },
        watch: {
            currentList: {
                handler(newValue) {
                    if (!newValue || !newValue.id) {
                        return
                    }
                    Set(STORAGE.W_CURRENT_TODO_LIST, this.currentList)
                }
            },
            incompleteTodos: {
                handler(newValue) {
                    if (newValue && newValue.length) {
                        setLocalTodos(TodosType.WUNDERLIST, newValue);
                    }
                },
                deep: true
            }
        },
        props:{
          settings: Object
        },
        components: {
            AddTodo,
            TodosGroup,
            TodoList,
            TodoManager,
            NoTodo,
            TodoError,
            TodoHeader
        },
        beforeDestroy() {
            clearInterval(syncWunderlist)
        }
    }
</script>