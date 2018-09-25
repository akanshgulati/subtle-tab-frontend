import {TodosType} from '../constants/Todos'
import {Get, Set} from './storage'
import {STORAGE} from './Constants'

export default {
    getAuthCode(type) {
        if (type === TodosType.WUNDERLIST) {
            return Get(STORAGE.W_AUTH)
        } else if (type === TodosType.TODOIST) {
            return Get(STORAGE.T_AUTH)
        }
        return ''
    },
    storeAuthCode(type, authCode){
        if (!authCode) {
            return
        }
        switch (type) {
            case TodosType.TODOIST:
                Set(STORAGE.T_AUTH, authCode)
                break;
            case TodosType.WUNDERLIST:
                Set(STORAGE.W_AUTH, authCode)
                break;
        }
    }
}