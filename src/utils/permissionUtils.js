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