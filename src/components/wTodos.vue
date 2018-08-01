<template>
  <div id="todos" v-on:click.stop="" class="todos-arrow_box relative flex-flow-column flex text-black">
    <header class="flex widget-header flex-center">
      <svg class="pointer flex-no-shrink" v-on:click="toggle('showSidebar'); showTodoManager = false;" width="1.3rem"
           height="1rem" viewBox="0 0 23 21" version="1.1">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="hamburger" transform="translate(0.000000, 2.000000)" stroke="#7d7d7d" stroke-width="4">
            <path d="M0.132183908,0 L22.8678161,0" id="XMLID_6_"></path>
            <polyline id="XMLID_9_" points="0.132183908 16.8 20.0697663 16.8 22.8678161 16.8"></polyline>
            <path d="M0.132183908,8.4 L22.8678161,8.4" id="XMLID_8_"></path>
          </g>
        </g>
      </svg>
      <h4 class="widget-heading ml-10 mv-0">To-do (T) : {{ $parent.toTitleCase(currentList.title)}}</h4>
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
                v-on:click="setActiveList(list); showSidebar = false;">
              <a class="todo-list-title" :title="list.title">{{ $parent.toTitleCase(list.title)}}</a>
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
      <div id="todo" v-on:click.stop="showSidebar = showTodoManager = false;" class="flex flex-flow-column"
           :class="{'flex-justify-center': isLoadingTodos}" style="background: rgba(255,255,255,0.9);">
        <!--LOADING STATE-->
        <div v-if="isLoadingTodos" id="loading-todo" class="flex flex-flow-column flex-justify-center flex-center">
          <img src="/images/loading.svg" alt="Loading..." style="height: 3.43rem;">
        </div>

        <!--LIST OF TODOS-->
        <template v-if="!isLoadingTodos">
          <!--SHOWING TASKS STATE-->
          <div v-show="todos.length" class="todos">
            <!--INCOMPLETE TASKS LOOP-->
            <transition-group name="list-complete" tag="ul" id="incomplete-todos-list" class="mar-0" mode="out-in">
              <li v-for="todo in incompleteTodos" class="todo flex list-complete-item" :key="todo.id">
                <input type="checkbox" v-model="todo.completed" class="browser-default todo--checkbox filled-in"
                       :id="todo.id" @change="checkedTodo(todo)"/>
                <label class="todo--name" :for="todo.id"> {{todo.title}}</label>
                <div class="todo-btn">
                  <!--<svg height="25" width="23" class="star-rating" :class="{'starred':todo.starred}" v-on:click="starTodo(todo)">
                      <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;" fill="#ccc"/>
                  </svg>-->
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
            </transition-group>
            <!--BUTTON TO SHOW COMPLETE TASKS-->
            <button @click="showCompletedTodos = !showCompletedTodos" class="btn">Show Completed Todos</button>
            <!--COMPLETE TASKS LOOP-->
            <transition-group v-show="showCompletedTodos" name="flip-list" tag="ul" id="complete-todos-list"
                              class="mar-0">
              <li v-for="todo in completedTodos" class="todo flex" :key="todo.id">
                <input type="checkbox" v-model="todo.completed" class="browser-default todo--checkbox filled-in"
                       :id="todo.id" @change="checkedTodo(todo)"/>
                <label class="todo--name" :for="todo.id"> {{todo.title}}</label>
                <div class="todo-btn">
                  <!--<svg height="25" width="23" class="star-rating" :class="{'starred':todo.starred}" v-on:click="starTodo(todo)">
                      <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;" fill="#ccc"/>
                  </svg>-->
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
            </transition-group>
          </div>
          <!--SHOWING A NO TASK STATE-->
          <div v-if="!todos.length" id="no-todo"
               class="flex flex-flow-column flex-justify-center flex-center">
            <img src="images/todo-no-item.png" alt="No Todo" width="134px">
            <em>No tasks to do in {{currentList.title}} list! <br>Create your first to-do</em>
          </div>
          <!--CREATE TASK STATE-->
          <div class="input-todo flex">
            <input type="text" placeholder="+ Create a new to-do" class="input-todo-title no-focus"
                   v-model="newTodo.title"
                   @keyup.enter="createTodo">
            <!--<input type="date" value="" class="input-todo-date no-focus" v-model="newTodo.dueOn">-->
          </div>
        </template>
      </div>
    </section>

  </div>
</template>

<script>
  import storage from '../utils/storage'
  import constants, {WUNDERLIST} from '../utils/Constants'
  import {isolateScroll} from '../utils/common'

  let syncWunderlist
  export default {
    beforeMount() {
      this.authCode = storage.get('w-auth')
    },
    data() {
      return {
        todoLists: [],
        currentTodo: '',
        showSidebar: false,
        showTodoManager: false,
        newTodo: {},
        currentList: '',
        isLoadingTodos: true,
        wunderlistTaskUrl: WUNDERLIST.URL.TASKS,
        syncTime: '',
        showCompletedTodos: false,
        completedTodos: '',
        incompleteTodos: ''
      }
    },

    mounted() {
      if (!this.authCode) {
        return
      }
      isolateScroll('incomplete-todos-list')
      isolateScroll('complete-todos-list')
      isolateScroll('todo-sidebar')
      //this.getTodosFromServer()
      this.currentList = storage.get(constants.STORAGE.W_CURRENT_TODO_LIST) || {}
      this.init()
      syncWunderlist = setInterval(this.sync, 5000)
    },
    computed: {
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
        return arr;
      },
    },
    methods: {
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
              this.getTodos(this.currentList.id);
              return
            }
            let localTodos = this.getLocalTodos()
            if (!localTodos) {
              this.getTodos(this.currentList.id)
              return
            }
            this.getTodos(this.currentList.id);

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
            this.getTodos(this.currentList.id, true);
          }
        }, () => {
          this.resetTodos()
        })
      },
      getLocalTodos() {
        let localMetaArr = storage.get(constants.STORAGE.W_TODOS_META)
        if (!localMetaArr) {
          return
        }

        let allTodos =  localMetaArr.map(localTodoId => {
          return storage.get(constants.STORAGE.W_TODO + localTodoId)
        });
        this.completedTodos = allTodos.filter(todo => todo.completed);
        this.incompleteTodos = allTodos.filter(todo => !todo.completed);
      },
      setLocalTodos(todos) {
        this.unsetLocalTodos()
        let todosArr = []
        todos.forEach(todo => {
          todosArr.push(todo.id)
          storage.set(constants.STORAGE.W_TODO + todo.id, todo)
        })
        storage.set(constants.STORAGE.W_TODOS_META, todosArr)
      },
      unsetLocalTodos() {
        let localMetaArr = storage.get(constants.STORAGE.W_TODOS_META)
        if (!localMetaArr) {
          return
        }
        localMetaArr.map(localTodoId => {
          return storage.remove(constants.STORAGE.W_TODO + localTodoId)
        })
      },
      resetTodos() {
        this.getTodoLists().then((_lists) => {
          this.currentList = _lists[0]
          this.getTodos(this.currentList.id);
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
              revision: list.revision,
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
              revision: list.revision,
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
            revision: list.revision,
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
          this.incompleteTodos = data[1].map(todo => this.filterTodoResponse(todo)) || [];
          this.completedTodos = data[0].map(todo => this.filterTodoResponse(todo)) || [];
          //todos = data[0].concat(data[1])
          // todos = todos.map(todo => this.filterTodoResponse(todo))
          this.setLocalTodos(this.todos)
          this.isLoadingTodos = false
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
          updatedOn: todo.completed_at ? +new Date(todo.completed_at) : +new Date(todo.created_at),
        }
      },
      createTodo() {
        if (!this.newTodo.title) {
          return
        }

        let newTodo = this.newTodo
        this.newTodo = {}
        let todo = {
          title: newTodo.title,
          list_id: this.currentListId,
          due_date: newTodo.dueOn,
        }
        this.http(this.wunderlistTaskUrl, 'POST', todo).then((_todo) => {
          this.incompleteTodos.push(this.filterTodoResponse(_todo));
          // this.todos.unshift(this.filterTodoResponse(_todo))
        })
      },
      checkedTodo(todo) {
        // todo.updatedOn = todo.completed ? +new Date() : +new Date(todo.created_at)
        this.patchTodo(todo.id, {completed: todo.completed, revision: todo.revision}).then((_todo) => {
          let updatedTodo = this.filterTodoResponse(_todo)
          Object.assign(todo, updatedTodo)
          if (_todo.completed) {
            this.incompleteTodos.splice(this.incompleteTodos.indexOf(todo), 1)
            this.completedTodos.unshift(todo)
          } else {
            this.completedTodos.splice(this.completedTodos.indexOf(todo), 1)
            this.incompleteTodos.push(todo)
          }
          // this.$set(this.todos, this.todos.indexOf(todo), this.filterTodoResponse(_todo))
        })
      },
      setActiveList(list) {
        this.isLoadingTodos = true
        this.currentList = list
        this.init()
      },
      deleteTodo(todo) {
        if (!confirm('Are you sure you want to delete this todo?')) {
          return
        }
        todo.revision++;
        let url = this.wunderlistTaskUrl + '/' + todo.id
        this.http(url, 'DELETE', {revision: todo.revision}).then(() => {
          // this.todos.splice(this.todos.indexOf(todo), 1)
          if (todo.completed) {
            this.completedTodos.splice(this.completedTodos.indexOf(todo), 1)
          } else {
            this.incompleteTodos.splice(this.incompleteTodos.indexOf(todo), 1)
          }
          // this.sortTodos()
        })
      },
      patchTodo(id, data) {
        let url = this.wunderlistTaskUrl + '/' + id
        return this.http(url, 'PATCH', data)
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
        this.patchTodo(this.currentTodo.id, {
          title: this.currentTodo.title,
          due_date: this.currentTodo.dueOn,
          revision: this.currentTodo.revision,
        }).then((_todo) => {
          this.$set(this.todos, this.currentTodoIndex, this.filterTodoResponse(_todo))
          this.showTodoManager = false
        })
      },
    },
    watch: {
      todos: {
        handler: function(newValue) {
          if (newValue && newValue.length) {
            this.setLocalTodos(newValue)
          }
        },
        deep: true,
      },
      currentList: {
        handler: function(newValue) {
          if (!newValue || !newValue.id) {
            return
          }
          storage.set(constants.STORAGE.W_CURRENT_TODO_LIST, this.currentList)
        },
      },
    },
    beforeDestroy() {
      clearInterval(syncWunderlist)
    },
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