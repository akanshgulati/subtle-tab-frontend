/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ({

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ },

/***/ 4:
/***/ function(module, exports) {

var tabsCount = 0;
var bgData = void 0;
var storage = {
    get: function get(key) {
        var value = localStorage.getItem(key);
        return isNaN(value) ? JSON.parse(value) : value;
    },
    set: function set(key, data) {
        return localStorage.setItem(key, JSON.stringify(data));
    },
    remove: function remove(key) {
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
        var photoKeys = Object.keys(response.photo);
        var photos = response.photo;
        var storedSeenIds = storage.get('bg-seen') || [];
        var result = {};
        for (var i = 0; i < photoKeys.length; i++) {
            if (storedSeenIds.indexOf(photos[photoKeys[i]]) === -1) {
                result[photoKeys[i]] = photos[photoKeys[i]];
            }
        }
        return result;
    }
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.query === 'getBackground') {
        getBackground(request.theme).then(function () {
            if (sendResponse && typeof sendResponse === 'function') {
                sendResponse(true);
            }
        });
    } else if (request.query === 'getTabsCount') {
        sendResponse(tabsCount);
    } else if (request.query === 'setTabsCount') {
        setTabsCount(request.value);
        sendResponse(true);
    } else if (request.query === 'loadBackground') {
        loadBackground(request.url);
    }
    return true;
});

var getBackground = function getBackground(theme) {
    return new Promise(function (resolve, reject) {
        var xmlhttp = new XMLHttpRequest();
        var currentPage = storage.get('current-page') || {};
        var themePage = currentPage[theme.value] && +currentPage[theme.value] + 1 || 1;
        var url = 'http://ec2-52-74-214-57.ap-southeast-1.compute.amazonaws.com/';
        url += theme.tags + '/' + themePage;
        xmlhttp.open('GET', url);
        xmlhttp.setRequestHeader('chrome-extension', btoa(chrome.runtime.id));
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                var response = JSON.parse(xmlhttp.responseText);
                //responses will be other than seen, having good views and sizes
                bgData = filterResponses(response);
                //If all pages are empty;
                if (currentPage === response.pages) {
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
        xmlhttp.onerror = function () {
            reject(xmlhttp.status);
        };
        xmlhttp.send();
    });
};
var previousURL = void 0;
var loadBackground = function loadBackground(url) {
    previousURL = previousURL || url;
    if (previousURL !== url) {
        previousURL = url;
        var image = new Image();
        image.src = url;
    }
};
chrome.runtime.onInstalled.addListener(function (details) {
    if (details && details.reason && details.reason == 'install') {
        chrome.tabs.create({ url: "index.html" });
    }
});

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({ url: "index.html" });
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

/***/ }

/******/ });
//# sourceMappingURL=subtle.js.map