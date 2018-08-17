import {TodosType} from '../constants/Todos'
import {WUNDERLIST, TODOIST} from './Constants'

export const getOriginPermission = (origin) => {
  return new Promise((resolve, reject) => {
    chrome.permissions.contains({origins: [origin]}, result => {
      // returns a boolean when permission is there
      if (result) {
        resolve(true)
        return
      }
      chrome.permissions.request({origins: [origin]},
        granted => granted ? resolve(true) : resolve(false))
    })
  })
}
export const removeOriginPermission = (origin) => {
  return new Promise((resolve, reject) => {
    chrome.permissions.remove({origins: [origin]},
      (removed) => removed ? resolve(true) : resolve(false))
  })
}

export const getPermission = (type) => {
    return new Promise((resolve, reject) => {
        let originUrl
        switch (type) {
            case TodosType.WUNDERLIST:
                originUrl = WUNDERLIST.URL.ORIGIN
                break
            case TodosType.TODOIST:
                originUrl = TODOIST.URL.ORIGIN
                break
            case TodosType.DEFAULT:
                reject(false)
                return
            default:
                reject(false)
                return
        }
        getOriginPermission(originUrl).then(granted => {
            if (granted) {
                resolve(type)
            } else {
                // TODO :: Send event when permission is not granted with lastError
                console.log('not-granted ' + chrome.runtime.lastError.message)
                reject(false)
            }
        })
    })
}