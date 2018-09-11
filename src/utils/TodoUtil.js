import {STORAGE} from './Constants'
import {Get, Remove, Set} from './storage'
import {TodosType} from '../constants/Todos'
import {isArray} from './common'

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
    } else if (type === TodosType.DEFAULT) {
        todoMetaKey = STORAGE.TODOS_META;
        todoInitial = STORAGE.TODO;
        listInitial = STORAGE.TODO_LIST;
        listMetaKey = STORAGE.TODO_LISTS_META;
    }
    return {
        todoMetaKey, todoInitial, listInitial, listMetaKey
    }
}

export const unsetLocalTodos = (type) => {
    const localKeys = getLocalKeys(type);
    const localTodosMetaArr = Get(localKeys.todoMetaKey);
    if (!localTodosMetaArr) {
        return true;
    }
    if (localTodosMetaArr && !isArray(localTodosMetaArr)) {
        return false;
    }
    Remove(localKeys.todoMetaKey);
    localTodosMetaArr.forEach(localTodoId => {
        Remove(localKeys.todoInitial + localTodoId)
    });
    return true;
};

export const unsetLocalTodo = (type, todoId) => {
    if (!type || !todoId) {
        return;
    }
    const localKeys = getLocalKeys(type);
    let localTodoMetaArr = Get(localKeys.todoMetaKey);
    if (!localTodoMetaArr || !isArray(localTodoMetaArr)) {
        return;
    }
    Remove(localKeys.todoInitial + todoId);
    localTodoMetaArr.splice(localTodoMetaArr.indexOf(todoId), 1);
    Set(localKeys.todoMetaKey, localTodoMetaArr);
};

export const setLocalTodos = (type, todos) => {
    try {
        if (!type || !todos || !todos.length) {
            return
        }
        const localKeys = getLocalKeys(type);
        if (unsetLocalTodos(type)) {
            let todosMetaArr = [];
            todos.forEach(todo => {
                todosMetaArr.push(todo.id);
                Set(localKeys.todoInitial + todo.id, todo)
            });
            Set(localKeys.todoMetaKey, todosMetaArr);
            return true;
        }
    } catch (e) {}
};
export const getLocalTodos = (type) => {
    try {
        let todos = [];
        const localKeys = getLocalKeys(type);
        let localTodoMetaArr = Get(localKeys.todoMetaKey);
        if (!localTodoMetaArr || !isArray(localTodoMetaArr)) {
            return todos;
        }
        localTodoMetaArr.forEach(localTodoId => {
            const todo = Get(localKeys.todoInitial + localTodoId);
            if (todo && todo.id) {
                todos.push(todo);
            }
        });
        return todos;
    } catch (e) {}
};

export const unsetLocalLists = (type) => {
    const localKeys = getLocalKeys(type);
    let localMetaArr = Get(localKeys.listMetaKey);
    if (!localMetaArr) {
        return true;
    }
    if (localMetaArr && !isArray(localMetaArr)) {
        return false;
    }
    localMetaArr.forEach(localListId => {
        Remove(localKeys.listInitial + localListId)
    });
    Remove(localKeys.listMetaKey);
    return true;
};
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
    let lists = [];
    const localKeys = getLocalKeys(type);
    let localListMetaArr = Get(localKeys.listMetaKey);
    if (!localListMetaArr || !isArray(localListMetaArr)) {
        return lists;
    }
    localListMetaArr.forEach(localListId => {
        const list = Get(localKeys.listInitial + localListId);
        if (list && list.id) {
            lists.push(list);
        }
    });
    return lists;
};

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
export const unsetTodoTypeLocalData = (type) => {
    if (!type) {
        return
    }
    unsetLocalLists(type)
    unsetLocalTodos(type)
}
export const unsetLocalList = (type, listId) => {
    if (!type || !listId) {
        return;
    }
    const localKeys = getLocalKeys(type);
    let localListMetaArr = Get(localKeys.listMetaKey);
    if (!localListMetaArr || !isArray(localListMetaArr)) {
        return
    }
    // remove list from meta lists
    localListMetaArr.splice(localListMetaArr.indexOf(listId), 1);
    Set(localKeys.listMetaKey, localListMetaArr);

    // remove particular list
    Remove(localKeys.listInitial + listId);

    // remove all todos of that list
    let localTodoMetaArr = Get(localKeys.todoMetaKey);
    let newTodoMetaArr = [];
    if (!localTodoMetaArr || !isArray(localTodoMetaArr)) {
        return;
    }
    localTodoMetaArr.forEach(todoId => {
        const todoKey = localKeys.todoInitial + todoId;
        const todo = Get(todoKey);
        if (todo.list === listId) {
            Remove(todoKey);
            return;
        }
        // adding all todos id of other than listId
        newTodoMetaArr.push(todoId);
    });
    // update todos meta array
    Set(localKeys.todoMetaKey, newTodoMetaArr);
};
export const showDeleteIcon = (listTitle) => {
    if (!listTitle) {
        return
    }
    const disableDelete = ['inbox', 'today', 'due today'];
    const title = listTitle.toLowerCase();
    return disableDelete.indexOf(title) === -1;
};
export default {
    unsetLocalTodos,
    unsetLocalTodo,
    setLocalTodos,
    getLocalTodos,
    getLocalLists,
    setLocalLists,
    unsetLocalLists,
    unsetLocalList,
    unsetTodoTypeLocalData,
    showDeleteIcon
}