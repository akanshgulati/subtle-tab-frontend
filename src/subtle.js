let tabsCount = 0;
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
    }
};


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
        if (request.query === 'getBackground') {
            getBackground(request.theme).then(()=>{
                if(sendResponse && typeof sendResponse === 'function'){
                    sendResponse(true);
                }
            });
        }
        else if (request.query === 'getTabsCount') {
            sendResponse(tabsCount);
        } else if (request.query === 'setTabsCount') {
            setTabsCount(request.value);
            sendResponse(true);
        }else if(request.query === 'loadBackground'){
            loadBackground(request.url);
        }
        return true;
    });


let getBackground = (theme) => {
    return new Promise((resolve, reject) => {
        let xmlhttp = new XMLHttpRequest();
        let currentPage = storage.get('current-page') || {};
        let themePage = (currentPage[theme.value] && (+currentPage[theme.value] + 1)) || 1;
        let url = 'http://ec2-52-74-214-57.ap-southeast-1.compute.amazonaws.com/';
        url += theme.tags + '/' + themePage;
        xmlhttp.open('GET', url);
        xmlhttp.setRequestHeader('chrome-extension', btoa(chrome.runtime.id));
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                let response = JSON.parse(xmlhttp.responseText);
                //responses will be other than seen, having good views and sizes
                bgData = filterResponses(response);
                //If all pages are empty;
                if(currentPage === response.pages){
                    currentPage = 0;
                }
                currentPage[theme.value] = themePage;
                storage.set('current-page', currentPage);
                /*if (Object.keys(bgData).length < 10 && response.pages > page) {
                 getBackground(theme, callback, page + 1);
                 } else {*/
                storage.set(theme.value, bgData);
                resolve();
            }
        };
        xmlhttp.onerror = ()=>{
            reject(xmlhttp.status);
        };
        xmlhttp.send();
    });
};
let previousURL;
let loadBackground = function(url){
    previousURL = previousURL || url;
    if(previousURL !== url) {
        previousURL = url;
        let image = new Image();
        image.src = url;
    }
};
chrome.runtime.onInstalled.addListener(function (details) {
    if (details && details.reason && details.reason == 'install') {
        chrome.tabs.create({url: "index.html"});
    }
});

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({url: "index.html"});
});

function init() {
    chrome.tabs.onCreated.addListener(function () {
        tabsCount++;
        if (tabsCount === 2) {
            storage.set('seen-onboarding', true);
        }
    });
}
init();