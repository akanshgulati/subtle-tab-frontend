export default {
    http(url, method, data) {
        return new Promise((resolve, reject) => {
            let xmlhttp = new XMLHttpRequest()
            method = method || 'GET'
            xmlhttp.open(method, url)
            xmlhttp.setRequestHeader('chrome-extension', btoa(chrome.runtime.id))
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4) {
                    resolve(JSON.parse(xmlhttp.responseText))
                }
            }
            xmlhttp.onerror = () => {
                reject(xmlhttp.status)
            }
            xmlhttp.send(JSON.stringify(data))
        })
    }
};
