let CommonUtils = {
    http(url, method, data) {
        return new Promise((resolve, reject) => {
            let xmlhttp = new XMLHttpRequest()
            method = method || 'GET'
            xmlhttp.open(method, url)
            xmlhttp.setRequestHeader('chrome-extension', btoa(chrome.runtime.id))
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4) {
                    if (xmlhttp.responseText) {
                        resolve(JSON.parse(xmlhttp.responseText))
                        return;
                    }
                    reject(xmlhttp.status)
                }
            };
            xmlhttp.onerror = () => {
                reject(xmlhttp.status)
            }
            xmlhttp.send(JSON.stringify(data))
        })
    },
    Http(url, option = {}) {
        return new Promise((resolve, reject) => {
            const xmlhttp = new XMLHttpRequest();
            const method = option.method || 'GET';
            let data = option.data;
            let isContentTypeHeaderPresent = false;
            let isContentTypeFormHeader = false;

            xmlhttp.open(method, url);

            if (option.headers) {
                for (let i = 0; i < option.headers.length; i++) {
                    if (option.headers[i].name && option.headers[i].name.toLowerCase() === 'content-type') {
                        isContentTypeHeaderPresent = true;
                    }
                    if (option.headers[i].name && option.headers[i].value.toLowerCase().indexOf('x-www-form-urlencoded') > -1) {
                        isContentTypeFormHeader = true;
                    }
                    xmlhttp.setRequestHeader(option.headers[i].name, option.headers[i].value)
                }
            }

            if (method && (method.toLowerCase() === 'post' || method.toLowerCase() === 'patch')) {
                if (!isContentTypeHeaderPresent) {
                    xmlhttp.setRequestHeader('Content-type', 'application/json')
                }

                if (isContentTypeFormHeader) {
                    // form data header
                    let form_data = new FormData();
                    for (let key in data) {
                        if (data.hasOwnProperty(key)) {
                            form_data.append(key, data[key])
                        }
                    }
                    data = form_data
                } else {
                    data = JSON.stringify(data);
                }
            }

            xmlhttp.onreadystatechange = () => {
                if (xmlhttp.readyState === 4) {
                    if (xmlhttp.responseText && xmlhttp.status >= 200 && xmlhttp.status < 300) {
                        resolve(getString(xmlhttp.responseText));
                        return;
                    }
                    reject({
                        status: xmlhttp.status,
                        reason: getString(xmlhttp.responseText)
                    })
                }
            };
            xmlhttp.onerror = () => {
                reject(xmlhttp.status)
            };
            xmlhttp.send(data);
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
    },
    isChrome() {
        return navigator.userAgent.toLowerCase().search('chrome') > -1;
    },
    isFirefox() {
        return navigator.userAgent.toLowerCase().search('firefox') > -1;
    },
    getBrowser() {
        return CommonUtils.isChrome() ? 'chrome' : CommonUtils.isFirefox() ? 'firefox' : '';
    }
};

export const getString = (s) => {
    try {
        return JSON.parse(s)
    } catch (e) {
        return s
    }
};


export default CommonUtils

export const generateId = () => {
    return 'xxxxxxxx-xxxx-Sxxx-Uxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export const POST = (url, option) => {
    option.headers = option.headers || new Headers();
    let {data, headers} = option;

    const isContentTypeHeaderPresent = headers && headers.has('content-type');
    const isFormEncodedData = isContentTypeHeaderPresent &&
        headers.get('content-type').indexOf('x-www-form-urlencoded') > -1;
    if (!isContentTypeHeaderPresent) {
        headers.set('content-type', 'application/json');
        data = JSON.stringify(option.data);
    }

    if (isFormEncodedData) {
        // form data header
        let form_data = new FormData();
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                form_data.append(key, data[key])
            }
        }
        data = form_data
    }

    const request = new Request(url, {
        method: 'POST',
        body: data,
        headers
    });
    return fetch(request).then(response => {
        if (!response.ok) {
            throw response
        }
        return response.json()
    })
};

export const Http = CommonUtils.Http;

export const DecryptAuth = (code) => {
    // TODO:: Send an event for decrypt failed along with code
    if (!code) {
        return false
    }
    try {
        return JSON.parse(window.atob(code))
    } catch (e) {
        return false
    }
}

export const isolateScroll = (elementId) => {
    let el = document.getElementById(elementId)
    if (!el) {
        return
    }
    el.onmousewheel = function (e) {
        el.scrollTop -= e.wheelDeltaY
        e = e || window.event
        if (e.preventDefault)
            e.preventDefault()
        e.returnValue = false
    }
}

export const isArray = CommonUtils.isArray;

export const isObject = CommonUtils.isObject;

export const isUndefined = CommonUtils.isUndefined;
export const isValidURL = (url) => {
    const regex = /(https?:\/\/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9])(:?\d*)\/?([a-z_\/0-9\-#.]*)\??([a-z_\/0-9\-#=&]*)/ig;
    return !!url.match(regex);
};