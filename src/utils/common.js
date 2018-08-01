let CommonUtils = {
    http(url, method, data) {
        return new Promise((resolve, reject) => {
            let xmlhttp = new XMLHttpRequest()
            method = method || 'GET'
            xmlhttp.open(method, url)
            xmlhttp.setRequestHeader('chrome-extension', btoa(chrome.runtime.id))
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4) {
                    if(xmlhttp.responseText){
                        resolve(JSON.parse(xmlhttp.responseText))
                        return;
                    }
                    reject(xmlhttp.status)
                }
            }
            xmlhttp.onerror = () => {
                reject(xmlhttp.status)
            }
            xmlhttp.send(JSON.stringify(data))
        })
    },
    Http(url, option) {
        return new Promise((resolve, reject) => {
            const xmlhttp = new XMLHttpRequest()
            const method = option.method || 'GET'
            xmlhttp.open(method, url)

            if (option.headers) {
                for (let i = 0; i < option.headers.length; i++) {
                    xmlhttp.setRequestHeader(option.headers[i].name, option.headers[i].value)
                }
            }
            if(option.method === 'POST'){
                xmlhttp.setRequestHeader("Content-type", "application/json");
            }

            xmlhttp.onreadystatechange = () => {
                if (xmlhttp.readyState === 4) {
                    if (xmlhttp.responseText && xmlhttp.status >= 200 && xmlhttp.status < 300) {
                        resolve(getString(xmlhttp.responseText))
                        return;
                    }
                    reject({
                        status: xmlhttp.status,
                        reason: getString(xmlhttp.responseText)
                    })
                }
            }
            xmlhttp.onerror = () => {
                reject(xmlhttp.status)
            }
            xmlhttp.send(JSON.stringify(option.data))
        })
    },
    isObject(data) {
        return data && Object.prototype.toString.call(data) === '[object Object]'
    },
    isArray(data) {
        return data && Object.prototype.toString.call(data) === '[object Array]'
    },
    isUndefined(data) {
        return typeof data === 'undefined';
    }
};

export const getString = (s) => {
  try {
    return JSON.parse(s)
  } catch (e) {
    return s
  }
}


export default CommonUtils

export const generateId = () => {
    return 'xxxxxxxx-xxxx-Sxxx-Uxxx-xxxxxxxxxxxx\n'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const Http = CommonUtils.Http;

export const DecryptAuth = (code) => {
    if (!code) {
        return false
    }
    return JSON.parse(window.atob(code))
}

export const isolateScroll = (elementId) => {
  let el = document.getElementById(elementId)
  if (!el) {
    return
  }
  el.onmousewheel = function(e) {
    el.scrollTop -= e.wheelDeltaY
    e = e || window.event
    if (e.preventDefault)
      e.preventDefault()
    e.returnValue = false
  }
}