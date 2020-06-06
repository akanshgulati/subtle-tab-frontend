<template>
    <div id="todos" v-on:click.stop="" class="todos-arrow_box relative flex-flow-column flex">
        <TodoHeader
            :current-list="{title:currentListTitle}"
            v-on:changed="todoHeaderChanged"
            :is-pinned="settings.isPinned"/>


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
                    <NoTodo key="no" :currentListTitle="currentListTitle"
                            v-if="!incompleteTodos.length && !showCompletedTodos"/>
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
    import TodoHeader from '../shared/TodoHeader.vue'

    import storage, {Get, Set} from '../utils/storage'
    import {STORAGE} from '../utils/Constants'
    import timeUtil from '../utils/timeUtil'
    import {generateId, isolateScroll} from '../utils/common'
    import {titleCase} from '../utils/StringUtils'
    import {TodoItemAction, TodoListItemAction, TodosType} from '../constants/Todos'
    import {
        unsetLocalList,
        getLocalLists,
        getLocalTodos,
        unsetLocalTodo
    } from '../utils/TodoUtil'
    import {EventBus} from '../utils/EventBus';

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
            this.populateTodoLists();
            this.populateTodos();
        },
        mounted() {
            isolateScroll('todos-list');
            isolateScroll('todo-sidebar');
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
                let obj = {};
                if (!this.todoLists || !this.allTodos) {
                    return obj;
                }
                this.todoLists.forEach(list => {
                    if (!list || !list.id) {
                        return;
                    }
                    obj[list.id] = 0
                });
                this.allTodos.forEach(todo => {
                    // only calculate for incomplete todos
                    if (!todo || todo.isCompleted || !todo.list) {
                        return;
                    }
                    obj[todo.list]++;
                    // updating today to-do count for today
                    timeUtil.isTodayDate(todo.dueOn) ? obj['today']++ : '';
                });
                return obj;
            }
        },
        methods: {
            todoHeaderChanged(data) {
                if (!data || !data.action) {
                    return;
                }
                switch (data.action) {
                    case TodoListItemAction.DELETE:
                        this.deleteList(this.currentList);
                        return;
                    case TodoListItemAction.VIEWLIST:
                        this.toggle('showSidebar');
                        this.showTodoManager = false;
                        return;
                }
            },
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
                    }];
                // console.info('List ids ', this.todoLists)
                const localLists = getLocalLists(TodosType.DEFAULT);
                this.todoLists = this.todoLists.concat(localLists);
            },
            populateTodos() {
                this.allTodos = getLocalTodos(TodosType.DEFAULT) || [];
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
                this.todoLists.push(list);
                this.setActiveList(list.id);
                this.listTitle = ''
            },
            deleteList(listId) {
                if (!confirm('Are you sure, all todos of list will be deleted?')) {
                    return
                }
                try {
                    unsetLocalList(TodosType.DEFAULT, listId);
                    this.setActiveList('inbox');
                    this.populateTodoLists();
                    this.populateTodos();
                } catch (e) {
                    this.manageError(e);
                }
            },
            createTodo(_todo) {
                if (!_todo || !_todo.title) {
                    return
                }
                let dueDate;

                if (this.currentListId === 'today') {
                    dueDate = timeUtil.getEndOfDay()
                }
                // since no to-do should be part of today list instead 'due today' contains
                // to-do from all other lists with due today
                const todoList = this.currentListId === 'today' ? 'inbox' : this.currentListId;
                const todo = {
                    id: generateId(),
                    title: _todo.title,
                    isStarred: false,
                    isRepeat: false,
                    repeat_type: '',
                    list: todoList,
                    isCompleted: false,
                    completedOn: '',
                    createdOn: +new Date(),
                    updatedOn: +new Date(),
                    dueOn: dueDate || _todo.dueOn
                };
                storage.append(STORAGE.TODOS_META, todo.id);
                Set(STORAGE.TODO + todo.id, todo);
                this.allTodos.push(todo)
            },
            getCurrentTodo(id) {
                return this.allTodos.find(todo => todo.id === id)
            },
            getCurrentTodoIndex(id) {
                return this.allTodos.findIndex(todo => todo.id === id)
            },
            changedTodoList(data) {
                if (!data || !data.action) {
                    return;
                }
                switch (data.action) {
                    case TodoListItemAction.CREATE :
                        if (data.data.title) {
                            const title = data.data.title;
                            this.createList(title);
                        }
                        return;
                    case TodoListItemAction.SELECT:
                        if (data.list.id) {
                            this.setActiveList(data.list.id);
                        }
                        return;
                    case TodoListItemAction.DELETE:
                        if (data.list.id) {
                            this.deleteList(data.list.id)
                        }
                        return;
                }
            },
            changedTodo(data) {
                if (!data) {
                    return
                }
                const todoId = data.todo && data.todo.id;
                let currentTodo = this.getCurrentTodo(todoId);

                if (data.action === TodoItemAction.COMPLETE) {
                    currentTodo.isCompleted = data.value;
                    if (currentTodo.isCompleted) {
                        currentTodo.completedOn = +new Date()
                    } else {
                        currentTodo.completedOn = null
                    }
                }
                else if (data.action === TodoItemAction.EDIT) {
                    this.editTodo(data.todo);
                    return
                }
                else if (data.action === TodoItemAction.DELETE) {
                    this.deleteTodo(data.todo);
                    return
                }
                currentTodo.updatedOn = +new Date();
                Set(STORAGE.TODO + currentTodo.id, currentTodo)
            },
            setActiveList(id) {
                // console.log('setActiveList', id);
                Set(STORAGE.CURRENT_TODO_LIST, id);
                this.currentListId = id;
                this.showSidebar = false;
                this.showCompletedTodos = false;
            },
            deleteTodo(todo) {
                if (!confirm('Are you sure you want to delete this todo?')) {
                    return
                }
                unsetLocalTodo(TodosType.DEFAULT, todo.id);
                this.populateTodos()
            },
            editTodo(todo) {
                if (this.showSidebar || !todo) {
                    return
                }
                this.showTodoManager = true;
                this.currentTodo = Object.assign({}, todo)
            },
            updateTodo(data) {
                if (data.action === TodoItemAction.EDIT) {
                    const updatedTodo = data.todo;
                    const currentTodoIndex = this.getCurrentTodoIndex(this.currentTodo.id);
                    this.$set(this.allTodos, currentTodoIndex, updatedTodo);
                    // updating it to current for below logic
                    Set(STORAGE.TODO + this.currentTodo.id, updatedTodo);
                    this.showTodoManager = false
                }
            }
        },
        components: {
            TodosGroup,
            AddTodo,
            TodoList,
            TodoManager,
            NoTodo,
            TodoHeader
        },
        props: {
            settings: Object
        }
    }
</script>

<style scoped>
    #todo {
        background: rgba(255, 255, 255, 1);
    }
</style>
