import {DecryptAuth} from './common'
import {TodosType} from '../constants/Todos'

export const validateAuthCode = (type, authCode) => {
    const code = DecryptAuth(authCode)
    if (code && typeof code === typeof {}) {
        switch (type) {
            case TodosType.TODOIST:
                return !!(code.access_token && code.token_type)
            case TodosType.WUNDERLIST:
                return !!code.access_token
        }
    }
    return false
}
