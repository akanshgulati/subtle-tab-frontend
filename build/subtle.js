let tabsCount = 1;
let bgData;
let storage = {
    get(key){
        let value = localStorage.getItem(key);
        return isNaN(value) ? JSON.parse(value) : value;
    },
    set(key, data){
        return localStorage.setItem(key, JSON.stringify(data));
    },
    remove(key){
        return localStorage.removeItem(key);
    },
    increment(key){
        let item = this.get(key);
        if (typeof item === 'number') {
            this.set(key, item + 1)
        }
    },
    append(key, value){
        let initialValue = this.get(key) || [];
        initialValue.push(value);
        this.set(key, initialValue);
    }
};

function init() {
    chrome.tabs.onCreated.addListener(function () {
        tabsCount++;
    });
}

function getTabsCount() {
    return tabsCount;
}

function setTabsCount(num) {
    tabsCount = num;
}

function filterResponses(response) {
    if (response && response.photo) {
        let photoKeys = Object.keys(response.photo);
        let photos = response.photo;
        let storedSeenIds = storage.get('bg-seen') || [];
        let result = {};
        for (let i = 0; i < photoKeys.length; i++) {
            if (storedSeenIds.indexOf(photos[photoKeys[i]]) === -1) {
                result[photoKeys[i]] = photos[photoKeys[i]];
            }
        }
        return result;
    }
}
chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        debugger;
        if (request.query === 'getBackground') {
            getBackground(request.theme, sendResponse);
        }
        else if (request.query === 'getTabsCount') {
            sendResponse(tabsCount);
        }
        return true;
    });


let getBackground = (theme, callback, page) => {
    let xmlhttp = new XMLHttpRequest();
    page = page || 1;
    let url = 'http://ec2-52-74-214-57.ap-southeast-1.compute.amazonaws.com/';
    url += theme.tags + '/' + page;
    xmlhttp.open('GET', url);
    xmlhttp.setRequestHeader('chrome-extension', btoa(chrome.runtime.id));
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let response = JSON.parse(xmlhttp.responseText);
            //responses will be other than seen, having good views and sizes
            bgData = filterResponses(response);
            if (Object.keys(bgData).length < 10 && response.pages > page) {
                getBackground(theme, callback, page + 1);
            } else {
                storage.set(theme.value, bgData);
                if (typeof callback === 'function') {
                    callback(bgData);
                }
            }
        }
        //TODO: Cover failed condition
    };
    xmlhttp.send();
}
init();