<template>
    <div id="todos" v-on:click.stop="" class="todos-arrow_box relative flex-flow-column flex">
        <!--<div v-if="!todosMeta.count" class="col s12 note full-height relative no-padding flex flex-justify-center flex-flow-column flex-center">
            <div>
                <img src="images/note_landing_page_icon.png">
            </div>
            <h5 class="italics create_note pointer" v-on:click="createFirstTodo">Create first Todo</h5>
        </div>-->

        <header class="flex widget-header flex-center flex-space-between">
            <svg class="pointer flex-no-shrink" v-on:click="toggle('showSidebar'); showTodoManager = false;" width="1.1rem" height="1rem" viewBox="0 0 23 21" version="1.1">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="hamburger" transform="translate(0.000000, 2.000000)" stroke="#7d7d7d" stroke-width="4">
                        <path d="M0.132183908,0 L22.8678161,0" id="XMLID_6_"></path>
                        <polyline id="XMLID_9_" points="0.132183908 16.8 20.0697663 16.8 22.8678161 16.8"></polyline>
                        <path d="M0.132183908,8.4 L22.8678161,8.4" id="XMLID_8_"></path>
                    </g>
                </g>
            </svg>
            <!-- HEADER LIST TITLE -->
            <h4 class="widget-heading mar-0">To-do (T) : {{currentListTitle }}</h4>
            <!-- HEADER BUTTONS -->
            <div class="button-section flex flex-center">
                <svg v-show="currentListId != 'inbox' && currentListId != 'today'" @click.stop="deleteList" class="delete-icon pointer" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width="1rem" height="1rem" viewBox="0 0 482.428 482.429" style="enable-background:new 0 0 482.428 482.429;" xml:space="preserve">
                <g>
                    <g>
                        <path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098    c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117    h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828    C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879    C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096    c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266    c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979    V115.744z"/>
                        <path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07    c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"/>
                        <path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07    c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"/>
                        <path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07    c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"/>
                    </g>
                </g>
                </svg>
                <!--<div class="relative">
                    <svg  class="pointer" v-on:click="toggle('showSettingsDropDown')" enable-background="new 0 0 20 20" height="1.5rem" version="1.1" viewBox="0 0 100 100" width="1.5rem" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="todo-settings-btn" fill="#7d7d7d"><path  d="M86.139,41.691l-8.095-1.175c-0.276-0.762-0.539-1.506-0.864-2.219l4.987-6.622c1.406-1.882,1.123-4.653-0.673-6.448   l-5.846-5.854c-1.006-1.007-2.358-1.578-3.715-1.578c-1.006,0-1.947,0.32-2.73,0.904l-6.615,4.97   c-0.729-0.337-1.472-0.605-2.22-0.883l-1.179-7.984C58.85,12.447,56.68,11,54.141,11h-8.28c-2.539,0-4.709,1.447-5.048,3.803   l-1.18,7.96c-0.748,0.279-1.495,0.551-2.226,0.892l-6.611-4.96c-0.782-0.584-1.727-0.903-2.731-0.903   c-1.359,0-2.716,0.571-3.722,1.58l-5.856,5.852c-1.799,1.8-2.1,4.572-0.693,6.452l4.94,6.617c-0.337,0.728-0.665,1.473-0.941,2.225   l-7.928,1.175C11.567,42.023,10,44.147,10,46.741v8.276c0,2.594,1.565,4.719,3.862,5.051l8.097,1.176   c0.276,0.763,0.538,1.507,0.863,2.219l-4.987,6.622c-1.407,1.883-1.124,4.654,0.672,6.449l5.846,5.854   c1.005,1.008,2.356,1.582,3.713,1.582c1.006,0,1.951-0.313,2.733-0.896l6.614-4.954c0.728,0.337,1.473,0.635,2.221,0.913   l1.18,8.043C41.152,89.432,43.322,91,45.861,91h8.28c2.539,0,4.709-1.566,5.049-3.924l1.18-8.079   c0.742-0.276,1.488-0.548,2.227-0.892l6.611,4.959c0.779,0.584,1.725,0.903,2.73,0.903c1.358,0,2.717-0.571,3.724-1.579   l5.854-5.853c1.799-1.8,2.1-4.57,0.694-6.453l-4.94-6.615c0.34-0.733,0.666-1.479,0.941-2.225l7.93-1.175   C88.436,59.736,90,57.611,90,55.02v-8.277C90,44.147,88.436,42.023,86.139,41.691z M73.882,58.236   c-0.455,1.479-1.06,2.935-1.796,4.324l-0.749,1.407l6.683,8.925c-0.017,0.025-0.037,0.056-0.068,0.086l-5.854,5.856   c-0.027,0.028-0.056,0.052-0.08,0.067l-8.929-6.666l-1.407,0.75c-1.434,0.761-2.888,1.378-4.326,1.82l-1.523,0.488L54.236,86.68   C54.211,86.688,54.18,87,54.141,87h-8.28c-0.036,0-0.067-0.313-0.093-0.318l-1.596-11.3l-1.526-0.563   c-1.474-0.451-2.928-1.086-4.324-1.824l-1.409-0.764l-8.941,6.664c-0.021-0.015-0.043-0.037-0.066-0.06l-5.852-5.856   c-0.026-0.025-0.049-0.054-0.065-0.076l6.692-8.932l-0.76-1.412c-0.703-1.324-1.304-2.738-1.791-4.324l-0.514-1.521l-11.193-1.574   C14.419,55.104,14,55.063,14,55.02v-8.277c0-0.045,0.419-0.085,0.424-0.12l11.112-1.575l0.526-1.521   c0.456-1.482,1.09-2.938,1.825-4.325l0.762-1.408l-6.674-8.926c0.016-0.025,0.041-0.054,0.072-0.085l5.854-5.854   c0.028-0.028,0.058-0.049,0.083-0.066l8.929,6.671l1.409-0.744c1.436-0.762,2.89-1.363,4.324-1.804l1.524-0.457L45.765,15.2   c0.025-0.007,0.058-0.2,0.096-0.2h8.28c0.037,0,0.068,0.191,0.094,0.198l1.597,11.214l1.524,0.528   c1.486,0.457,2.94,1.092,4.324,1.827l1.409,0.761l8.94-6.665c0.02,0.016,0.043,0.037,0.066,0.061l5.85,5.854   c0.027,0.027,0.051,0.055,0.066,0.078l-6.689,8.932l0.758,1.411c0.693,1.311,1.313,2.765,1.791,4.325l0.516,1.521l11.189,1.575   C85.581,46.656,86,46.696,86,46.741v8.276c0,0.047-0.419,0.086-0.424,0.121l-11.111,1.574L73.882,58.236z"/><g><path d="M50.001,67.971c-9.61,0-17.428-7.82-17.428-17.43c0-9.61,7.818-17.429,17.428-17.429c9.608,0,17.429,7.818,17.429,17.429    C67.43,60.15,59.609,67.971,50.001,67.971z M50.001,37.187c-7.363,0-13.354,5.991-13.354,13.354    c0,7.363,5.991,13.354,13.354,13.354c7.362,0,13.354-5.988,13.354-13.354C63.354,43.178,57.363,37.187,50.001,37.187z"/></g></g>
                    </svg>
                    <ul class="dropdown" v-show="showSettingsDropDown">
                        <li class="italics">Coming soon...</li>
                        <li><i class="integrate-icon icon&#45;&#45;todoist"></i>Integrate Todoist</li>
                        <li><i class="integrate-icon icon&#45;&#45;wunderlist"></i>Integrate Wunderlist</li>
                        <li><i class="integrate-icon icon&#45;&#45;trello"></i>Integrate Trello</li>
                    </ul>
                </div>-->
            </div>
        </header>
        <section class="flex relative todo-section flex-flow-column" @click.stop="showTodoManager = showSidebar = false">
            <div id="todo-sidebar" class="sidebar flex-flow-column flex" :class="{'show-sidebar': showSidebar }" @click.stop="">
                <TodoList :list="todoLists" :current="currentListId" v-on:changed="changedTodoList"/>
            </div>

            <div id="todo-manager-sidebar"
                 class="sidebar-right flex-flow-column flex"
                 :class="{'show-right-sidebar': showTodoManager }"
                 @click.stop="">
                <div class="sidebar-container">
                    <div>
                        <p class="sidebar-heading">Todo Title</p>
                        <input type="text" placeholder="" class="input-todo-title no-focus" v-model="currentTodo.title">
                    </div>
                    <div>
                        <p class="sidebar-heading">Due Date</p>
                        <input type="date" class="input-todo-date no-focus" v-model="currentTodo.dueOn">
                    </div>
                    <!--<div>
                        <p class="sidebar-heading">Repeat Duration</p>
                        <select name="" id="" class="browser-default" v-model="currentTodo.repeat_type">
                            <option value="">Never</option>
                            <option value="1">Daily</option>
                            <option value="7">Weekly</option>
                        </select>
                    </div>-->
                    <div>
                        <button class="btn" v-on:click="updateTodo()">Save</button>
                    </div>
                </div>
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
                    :is-completed-enabled="true"
                    v-on:toggleCompleted="toggleCompletedTodos"/>

                <div v-if="!incompleteTodos.length" id="no-todo" class="flex flex-flow-column flex-justify-center flex-center">
                    <img src="images/todo-no-item.png" alt="No Todo" width="134px">
                    <em>No tasks to do in {{currentListTitle}} list! <br>Create your first to-do</em>
                </div>

                <!--COMPLETE TASKS LOOP-->
                <TodosGroup
                    v-if="showCompletedTodos"
                    id="complete-todos-list" class="mar-0"
                    :todos="completedTodos"
                    isCompletedList="true"
                    v-on:changed="changedTodo"
                    v-on:edit="changedTodo"
                />
                <!--<transition-group v-show="todos.length" name="flip-list" tag="ul" class="todos" id="todos-list">
                    <li v-for="todo in todos" class="todo flex" v-bind:key="todo.id">
                        <input type="checkbox" v-model="todo.completed" class="browser-default todo&#45;&#45;checkbox filled-in" :id="todo.id" @change="checkedTodo(todo)"/>
                        <label class="todo&#45;&#45;name" :for="todo.id"> {{todo.title}}</label>
                        <div class="todo-btn">
                            &lt;!&ndash;<svg height="25" width="23" class="star-rating" :class="{'starred':todo.starred}" v-on:click="starTodo(todo)">
                                <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;" fill="#ccc"/>
                            </svg>&ndash;&gt;
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
                </transition-group>-->


                <!--<div class="input-todo flex">
                    <input type="text" placeholder="+ Create a new to-do" class="input-todo-title no-focus" v-model="newTodo.title"
                           @keyup.enter="createTodo">
                    <input type="date" value="" class="input-todo-date no-focus" v-model="newTodo.dueOn">
                </div>-->
            </div>
        </section>

    </div>
</template>

<script>
    import TodosGroup from '../shared/TodosGroup.vue'
    import AddTodo from '../shared/AddTodo.vue'
    import TodoList from '../shared/TodoList.vue'

    import storage, {Get, Remove, Set} from '../utils/storage'
    import {STORAGE} from '../utils/Constants'
    import timeUtil from '../utils/timeUtil'
    import {generateId, isolateScroll} from '../utils/common'
    import {titleCase} from '../utils/StringUtils'
    import {TodoItemAction, TodoListItemAction} from '../constants/Todos'

    export default {
        beforeCreate() {
            this.todosMeta = Get(STORAGE.TODOS_META) || [];
        },
        data() {
            return {
                input: '',
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
                currentListId: Get(STORAGE.CURRENT_TODO_LIST) || 'inbox',
                showCompletedTodos: false
            }
        },
        beforeMount(){
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
            completedTodos(){
                return this.todos.filter(todo => todo.isCompleted)
            },
            incompleteTodos(){
                return this.todos.filter(todo => !todo.isCompleted)
            },
            currentList() {
                return this.todoLists && this.todoLists.find(list => list.id === this.currentListId)
            },
            currentListTitle(){
                return this.currentList && titleCase(this.currentList.title);
            }
        },
        methods: {
            toggle(field) {
                this[field] = !this[field];
            },
            toggleCompletedTodos(state) {
                this.showCompletedTodos = state
            },
            populateTodoLists() {
                this.todoLists = [{
                    title: 'Inbox',
                    id: 'inbox'
                }, {
                    title: 'Due Today',
                    id: 'today'
                }];
                console.info("List ids ", this.todoLists);
                const listIdsArray = Get(STORAGE.TODO_LISTS_META);
                if (!listIdsArray || listIdsArray.length === 0) {
                    return;
                }
                const createdLists = listIdsArray.map(listId => {
                    return Get(STORAGE.TODO_LIST + listId)
                });
                this.todoLists = this.todoLists.concat(createdLists);
            },
            populateTodos() {
                const todosMeta = Get(STORAGE.TODOS_META);
                this.allTodos = [];
                if (!todosMeta || todosMeta.length === 0) {
                    return;
                }
                this.allTodos = todosMeta.map(todoId => {
                    return Get(STORAGE.TODO + todoId)
                })
                //this.getCurrentListTodos();
            },
            createList(title) {
                if (!title) {
                    return;
                }
                const list = {
                    id: generateId(),
                    title: title,
                    createdOn: +new Date(),
                    updatedOn: +new Date(),
                    isDeleted: false
                };
                storage.append(STORAGE.TODO_LISTS_META, list.id);
                Set(STORAGE.TODO_LIST + list.id, list);
                this.todoLists.push(list);
                this.setActiveList(list.id)
                this.listTitle = '';
            },
            deleteList(listId){
                if (!confirm('Are you sure, all to-dos of list will be deleted?')) {
                    return;
                }
                // Delete the list and all todos related to it
                let todoListsMeta = Get(STORAGE.TODO_LISTS_META);
                todoListsMeta.splice(todoListsMeta.indexOf(listId), 1);
                Set(STORAGE.TODO_LISTS_META, todoListsMeta);
                Remove(STORAGE.TODO_LIST + this.currentListId);

                this.setActiveList('inbox');
                // Remove all todos related to that list
                let toDeleteTodos = this.allTodos.filter(todo => todo.list === listId);
                let todosMeta = Get(STORAGE.TODOS_META);
                for (let i = 0; i < toDeleteTodos.length; i++) {
                    let todo = toDeleteTodos[i]
                    todosMeta.splice(todosMeta.indexOf(todo.id), 1)
                    Remove(STORAGE.TODO + todo.id)
                }
                Set(STORAGE.TODOS_META, todosMeta);

                this.populateTodoLists();
            },
            createTodo(_todo) {
                if (!_todo || !_todo.title) {
                    return;
                }
                let dueDate;

                if (this.currentListId === 'today') {
                     dueDate = timeUtil.getEndOfDay();
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
                };
                storage.append(STORAGE.TODOS_META, todo.id);
                Set(STORAGE.TODO + todo.id, todo);
                this.allTodos.push(todo);
            },
            getCurrentTodo(id) {
              return this.allTodos.find(todo => todo.id === id);
            },
            getCurrentTodoIndex(id) {
                return this.allTodos.findIndex(todo => todo.id === id);
            },
            changedTodoList(data){
                if (!data) {
                    return
                }
                switch (data.action) {
                    case TodoListItemAction.CREATE :
                        const title = data.data.title
                        this.createList(title)
                        return
                    case TodoListItemAction.SELECT:
                        debugger;
                        this.setActiveList(data.list.id)
                        return
                }
            },
            changedTodo(data) {
                if (!data) {
                    return
                }
                const todoId = data.todo && data.todo.id
                let currentTodo = this.getCurrentTodo(todoId);
                if (data.action === TodoItemAction.COMPLETE) {
                    currentTodo.isCompleted = data.value
                    if (currentTodo.isCompleted) {
                        currentTodo.completedOn = +new Date()
                    } else {
                        currentTodo.completedOn = null
                    }
                }
                else if (data.action === TodoItemAction.EDIT) {
                    this.editTodo(data.todo);
                    /*const currentTodoIndex = this.getCurrentTodoIndex(todoId)
                    const updatedTodo = Object.assign({}, currentTodo, data.value)
                    this.$set(this.allTodos, currentTodoIndex, updatedTodo)
                    // updating it to current for below logic
                    currentTodo = updatedTodo*/
                    return
                }
                else if (data.action === TodoItemAction.DELETE) {
                    this.deleteTodo(data.todo);
                    return
                }
                currentTodo.updatedOn = +new Date()
                Set(STORAGE.TODO + currentTodo.id, currentTodo)
            },
            sortTodos() {
                /*return this.todos.sort(function (a, b) {
                    let n;
                    a.completed = +a.completed;
                    b.completed = +b.completed;
                    n = a.completed - b.completed;
                    if (n !== 0) {
                        return n;
                    }
                    return b.completedOn - a.completedOn;
                });*/
            },
            setActiveList(id) {
                //console.log('setActiveList', id);
                Set(STORAGE.CURRENT_TODO_LIST, id);
                this.currentListId = id;
                this.showSidebar = false;
            },
            deleteTodo(todo) {
                if (!confirm('Are you sure you want to delete this todo?')) {
                    return;
                }
                let todosMeta = Get(STORAGE.TODOS_META);
                todosMeta.splice(todosMeta.indexOf(todo.id), 1);
                Set(STORAGE.TODOS_META, todosMeta);
                Remove(STORAGE.TODO + todo.id);
                this.populateTodos();
            },
            editTodo(todo) {
                if (this.showSidebar) {
                    return
                }
                this.showTodoManager = true;
                this.currentTodo = Object.assign({}, todo);
            },
            updateTodo() {
                const currentTodoIndex = this.getCurrentTodoIndex(this.currentTodo.id);
                this.$set(this.allTodos, currentTodoIndex, this.currentTodo)
                // updating it to current for below logic
                Set(STORAGE.TODO + this.currentTodo.id, this.currentTodo)
                this.showTodoManager = false
            }
        },
        watch: {
            /*currentListId: {
                handler: function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        console.log("CurrentListId Watcher", this.currentListId);
                        // this.populateTodos();
                    }
                }
            }*/
            /*currentTodo: {
                handler: function(){
                    this.currentTodo.repeat = !!this.currentTodo.repeat_type;
                },
                deep: true
            }*/
        },
        components: {
            TodosGroup,
            AddTodo,
            TodoList
        }
    };
</script>

<style scoped>
  #todo {
    background: rgba(255, 255, 255, 0.85)
  }
</style>
