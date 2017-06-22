import storage from './utils/storage';
import constants from './utils/Constants';

let tabsCount = 0;
let prevTabsCount = 0;
let bgData;
const DEBUG = true;

function getTabsCount() {
    return prevTabsCount === tabsCount ? false : tabsCount;
}

function setTabsCount(num) {
    tabsCount = num;
}

function filterResponses(response) {
    if (response && response.photo) {
        let photoKeys = Object.keys(response.photo);
        let photos = response.photo;
        let storedSeenIds = storage.get(constants.STORAGE.BACKGROUND_SEEN) || [];
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
            getBackground(request.theme, request.newPage);
        }
        else if (request.query === 'getTabsCount') {
            sendResponse(getTabsCount());
        } else if (request.query === 'setTabsCount') {
            setTabsCount(request.value);
            sendResponse(true);
        } else if (request.query === 'loadNextBackground') {
            loadNextBackground(request.url);
        } else if (request.query === 'loadCurrentBackground') {
            loadCurrentBackground(request.url, sendResponse);
        } else if (request.query === 'log') {
            _console(request.value);
        }
        return true;
    });

let loadCurrentBackground = (url, callback) => {
    let defaultImageLoaded = false;
    let img = new Image();
    img.src = url;
    img.onload = () => {
        if (!defaultImageLoaded) {
            clearTimeout(defaultImageTimeout);
            callback(url);
        }
    };
    let defaultImageTimeout = setTimeout(() => {
        defaultImageLoaded = true;
        callback(false);
    }, 2500);
};
let getBackground = (theme, changePage) => {
    return new Promise((resolve, reject) => {
        let xmlhttp = new XMLHttpRequest();
        let currentPage = storage.get(constants.STORAGE.CURRENT_PAGE) || {};
        let themePage = currentPage[theme.value] || 0;

        if (changePage) {
            themePage++;
        }

        let url = 'http://api.subtletab.com/theme/';
        url += theme.tags + '/' + themePage;
        xmlhttp.open('GET', url);
        xmlhttp.setRequestHeader('chrome-extension', btoa(chrome.runtime.id));
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                let response = JSON.parse(xmlhttp.responseText);
                //responses will be other than seen, having good views and sizes
                bgData = filterResponses(response);
                //If all pages are empty;
                if (themePage === response.pages) {
                    themePage = 0;
                }
                currentPage[theme.value] = themePage;
                storage.set('current-page', currentPage);

                updateThemeStorage(bgData, theme);
                resolve();
            }
        };
        xmlhttp.onerror = () => {
            reject(xmlhttp.status);
        };
        xmlhttp.send();
    });
};
let updateThemeStorage = (bgData, theme) => {
    let themeLocalStorage = storage.get(constants.THEME[theme.value]);
    if (!themeLocalStorage) {
        storage.set(theme.value, bgData);
        return;
    }
    let allKeys = Object.keys(themeLocalStorage);
    let lastURLKey = allKeys[allKeys.length];

    let lastStoredURL = themeLocalStorage[lastURLKey];
    // Storing last background url for next round;
    let obj = {};
    obj[lastURLKey] = lastStoredURL;

    storage.set(theme.value, Object.assign({}, obj, bgData));
};
let previousURL;
let loadNextBackground = function (url) {
    previousURL = previousURL || url;
    if (previousURL !== url) {
        _console('BG: Load Next Background for', url);
        previousURL = url;
        let image = new Image();
        image.src = url;
    }
};

let _console = (log) => {
    if (DEBUG) {
        console.log(log);
    }
};

chrome.runtime.onInstalled.addListener(function (details) {
    if (details && details.reason && details.reason == 'install') {
        chrome.tabs.create({});
    }else if (details && details.reason && details.reason == 'update') {
        storage.set(constants.STORAGE.SEEN_ONBOARDING, false);
        chrome.tabs.create({});
    }
});

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create();
});

chrome.storage.onChanged.addListener((changes, namespace) => {
    let key;
    for (key in changes) {
        if (!changes.hasOwnProperty(key)) {
            continue;
        }
        _console("Storage Changed" + JSON.stringify(changes[key]));
        storage.setLocal(key, changes[key].newValue);
    }
});

function init() {
    chrome.tabs.onCreated.addListener(function () {
        prevTabsCount = tabsCount;
        tabsCount++;
        if (tabsCount === 2) {
            storage.set(constants.STORAGE.SEEN_ONBOARDING, true);
        }
    });
}
init();