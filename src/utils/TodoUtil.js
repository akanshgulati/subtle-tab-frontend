import {STORAGE} from './Constants'
import {Get, Remove, Set} from './storage'
import {TodosType} from '../constants/Todos'

export const getLocalKeys = (type) => {
    let todoMetaKey, todoInitial, listInitial, listMetaKey
    if (type === TodosType.TODOIST) {
        todoMetaKey = STORAGE.T_TODOS_META
        todoInitial = STORAGE.T_TODO
        listInitial = STORAGE.T_LIST
        listMetaKey = STORAGE.T_LISTS_META
    } else if (type === TodosType.WUNDERLIST) {
        todoMetaKey = STORAGE.W_TODOS_META
        todoInitial = STORAGE.W_TODO
        listInitial = STORAGE.W_LIST
        listMetaKey = STORAGE.W_LISTS_META
    }
    return {
        todoMetaKey, todoInitial, listInitial, listMetaKey
    }
}

export const unsetLocalTodos = (type) => {
    const localKeys = getLocalKeys(type)
    let localMetaArr = Get(localKeys.todoMetaKey)
    Remove(localKeys.todoMetaKey)
    if (!localMetaArr) {
        return
    }
    localMetaArr.map(localTodoId => {
        return Remove(localKeys.todoInitial + localTodoId)
    })
}
export const setLocalTodos = (type, todos) => {
    if (!type || !todos || !todos.length) {
        return
    }
    const localKeys = getLocalKeys(type)
    unsetLocalTodos(type)
    let todosMetaArr = []
    todos.forEach(todo => {
        todosMetaArr.push(todo.id)
        Set(localKeys.todoInitial + todo.id, todo)
    })
    Set(localKeys.todoMetaKey, todosMetaArr)
    return true
}
export const getLocalTodos = (type) => {
    const localKeys = getLocalKeys(type)
    let localTodoMetaArr = Get(localKeys.todoMetaKey)
    if (!localTodoMetaArr) {
        return
    }
    return localTodoMetaArr.map(localTodoId => {
        return Get(localKeys.todoInitial + localTodoId)
    })
}

export const unsetLocalLists = (type) => {
    const localKeys = getLocalKeys(type)
    let localMetaArr = Get(localKeys.listMetaKey)
    Remove(localKeys.listMetaKey)
    if (!localMetaArr) {
        return
    }
    localMetaArr.map(localListId => {
        return Remove(localKeys.listInitial + localListId)
    })
}
export const setLocalLists = (type, lists) => {
    if (!type || !lists || !lists.length) {
        return
    }
    const localKeys = getLocalKeys(type)
    unsetLocalLists(type)
    let listsMetaArr = []
    lists.forEach(list => {
        listsMetaArr.push(list.id)
        Set(localKeys.listInitial + list.id, list)
    })
    Set(localKeys.listMetaKey, listsMetaArr)
    return true
}
export const getLocalLists = (type) => {
    const localKeys = getLocalKeys(type)
    let localListMetaArr = Get(localKeys.listMetaKey)
    if (!localListMetaArr) {
        return
    }
    return localListMetaArr.map(localListId => {
        return Get(localKeys.listInitial + localListId)
    })
}

export const unsetAllTodos = () => {
    unsetLocalTodos(TodosType.TODOIST);
    unsetLocalTodos(TodosType.WUNDERLIST);
}
export const unsetAllLists = () => {
    unsetLocalLists(TodosType.TODOIST);
    unsetLocalLists(TodosType.WUNDERLIST);
}
export const unsetThirdPartyTodoData = () => {
    unsetAllLists();
    unsetAllTodos();
    Remove(STORAGE.T_SYNC_TOKEN);
    Remove(STORAGE.T_CURRENT_TODO_LIST);
    Remove(STORAGE.W_CURRENT_TODO_LIST);
}
export default {
    unsetLocalTodos,
    setLocalTodos,
    getLocalTodos,
    getLocalLists,
    setLocalLists,
    unsetLocalLists
}