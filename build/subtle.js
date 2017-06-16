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
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ({

/***/ 32:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ },

/***/ 4:
/***/ function(module, exports) {

var tabsCount = 1;
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
    },
    increment: function increment(key) {
        var item = this.get(key);
        if (typeof item === 'number') {
            this.set(key, item + 1);
        }
    },
    append: function append(key, value) {
        var initialValue = this.get(key) || [];
        initialValue.push(value);
        this.set(key, initialValue);
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
    debugger;
    if (request.query === 'getBackground') {
        getBackground(request.theme, sendResponse);
    } else if (request.query === 'getTabsCount') {
        sendResponse(tabsCount);
    }
    return true;
});

var getBackground = function getBackground(theme, callback, page) {
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
            currentPage[theme.value] = themePage;
            storage.set('current-page', currentPage);
            /*if (Object.keys(bgData).length < 10 && response.pages > page) {
                getBackground(theme, callback, page + 1);
            } else {*/
            storage.set(theme.value, bgData);
            if (typeof callback === 'function') {
                callback(bgData);
            }
        }
        //TODO: Cover failed condition
    };
    xmlhttp.send();
};
chrome.runtime.onInstalled.addListener(function (details) {
    if (details && details.reason && details.reason == 'install') chrome.tabs.create({ url: "index.html" });
});

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({ url: "index.html" });
});

function init() {
    chrome.tabs.onCreated.addListener(function () {
        tabsCount++;
    });
}
init();

/***/ }

/******/ });
//# sourceMappingURL=subtle.js.map