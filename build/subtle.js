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
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Constants__ = __webpack_require__(1);


var storage = {
    get: function get(key) {
        var value = localStorage.getItem(key);
        return isNaN(value) ? JSON.parse(value) : value;
    },
    set: function set(key, value) {
        if (__WEBPACK_IMPORTED_MODULE_0__Constants__["a" /* default */].SYNC.indexOf(key) > -1 || key.indexOf('note-') > -1) {
            var obj = {};
            obj[key] = value;
            chrome.storage.sync.set(obj);
        }
        localStorage.setItem(key, JSON.stringify(value));
    },
    setLocal: function setLocal(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
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
    },
    getMap: function getMap(key) {
        var value = localStorage.getItem(key);
        return isNaN(value) ? JSON.parse(value) : value;
    },
    setMap: function setMap(key, data) {
        return localStorage.setItem(key, JSON.stringify(data));
    },

    chromeSync: {
        get: function get(key, callback) {
            try {
                chrome.storage.sync.get(key, function (details) {
                    if (callback) {
                        callback(details);
                    }
                });
            } catch (e) {
                console.log(e);
            }
        },
        set: function set(key, value, callback) {
            try {
                var obj = {};
                obj[key] = value;
                chrome.storage.sync.set(obj, function (details) {
                    if (callback) {
                        callback(details);
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }
    }

};
/* harmony default export */ exports["a"] = storage;

/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
    THEME: {
        NATURE: 'nature',
        ARCHITECTURE: 'building',
        TRAVEL: 'travel',
        NIGHT: 'night'
    },
    STORAGE: {
        SHARED_DATA: 'shared-data',
        WEATHER: 'weather',
        BACKGROUND_SEEN_NIGHT: 'bg-seen-night',
        BACKGROUND_SEEN_TRAVEL: 'bg-seen-travel',
        BACKGROUND_SEEN_BUILDING: 'bg-seen-building',
        BACKGROUND_SEEN_NATURE: 'bg-seen-nature',
        CURRENT_PAGE: 'current-page',
        SEEN_ONBOARDING: 'seen-onboarding',
        NOTES_META: 'notes_meta'
    },
    SYNC: ['shared-data', 'bg-seen-nature', 'bg-seen-night', 'bg-seen-travel', 'bg-seen-building', 'current-page', 'nature', 'travel', 'building', 'night', 'notes_meta', 'notes-']
};

/***/ },

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ },

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_storage__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_Constants__ = __webpack_require__(1);



var tabsCount = 0;
var prevTabsCount = 0;
var bgData = void 0;
var DEBUG = false;

function getTabsCount() {
    return prevTabsCount === tabsCount ? false : tabsCount;
}

function setTabsCount(num) {
    tabsCount = num;
}

function filterResponses(response) {
    if (response && response.photo) {
        var photoKeys = Object.keys(response.photo);
        var photos = response.photo;
        var storedSeenIds = __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.BACKGROUND_SEEN) || [];
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
        getBackground(request.theme, request.newPage);
    } else if (request.query === 'getTabsCount') {
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
    } else if (request.query === 'startWeather') {
        startWeather();
    }
    return true;
});

var loadCurrentBackground = function loadCurrentBackground(url, callback) {
    var defaultImageLoaded = false;
    var img = new Image();
    img.src = url;
    img.onload = function () {
        if (!defaultImageLoaded) {
            clearTimeout(defaultImageTimeout);
            callback(url);
        }
    };
    var defaultImageTimeout = setTimeout(function () {
        defaultImageLoaded = true;
        callback(false);
    }, 2500);
};

var getBackground = function getBackground(theme, changePage) {
    return new Promise(function (resolve, reject) {
        var xmlhttp = new XMLHttpRequest();
        var currentPage = __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.CURRENT_PAGE) || {};
        var themePage = currentPage[theme.value] || 0;

        if (changePage) {
            themePage++;
        }

        var url = 'http://api.subtletab.com/theme/';
        url += theme.tags + '/' + themePage;
        xmlhttp.open('GET', url);
        xmlhttp.setRequestHeader('chrome-extension', btoa(chrome.runtime.id));
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                var response = JSON.parse(xmlhttp.responseText);
                //responses will be other than seen, having good views and sizes
                bgData = filterResponses(response);
                //If all pages are empty;
                if (themePage === response.pages) {
                    themePage = 0;
                }

                if (changePage) {
                    __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE['BACKGROUND_SEEN_' + theme.value.toUpperCase()], '');
                }
                currentPage[theme.value] = themePage;
                __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.CURRENT_PAGE, currentPage);

                updateThemeStorage(bgData, theme);
                resolve();
            }
        };
        xmlhttp.onerror = function () {
            reject(xmlhttp.status);
        };
        xmlhttp.send();
    });
};

var updateThemeStorage = function updateThemeStorage(bgData, theme) {
    var themeLocalStorage = __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].THEME[theme.value]);
    if (!themeLocalStorage) {
        __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].set(theme.value, bgData);
        return;
    }
    var allKeys = Object.keys(themeLocalStorage);
    var lastURLKey = allKeys[allKeys.length];
    var lastStoredURL = themeLocalStorage[lastURLKey];
    // Storing last background url for next round;
    var obj = {};
    obj[lastURLKey] = lastStoredURL;
    __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].set(theme.value, Object.assign({}, obj, bgData));
};

var previousURL = void 0;
var loadNextBackground = function loadNextBackground(url) {
    previousURL = previousURL || url;
    if (previousURL !== url) {
        _console('BG: Load Next Background for', url);
        previousURL = url;
        var image = new Image();
        image.src = url;
    }
};

var _console = function _console(log) {
    if (DEBUG) {
        console.log(log);
    }
};

chrome.runtime.onInstalled.addListener(function (details) {
    if (details && details.reason && details.reason === 'install') {
        __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].chromeSync.get(null, function (details) {
            var key = void 0;
            for (key in details) {
                if (!details.hasOwnProperty(key)) {
                    continue;
                }
                __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].setLocal(key, details[key]);
            }
        });

        chrome.tabs.create({});
    } else if (details && details.reason && details.reason === 'update') {
        //storage.set(constants.STORAGE.SEEN_ONBOARDING, false);
        //chrome.tabs.create({});
    }
});

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({});
});

chrome.storage.onChanged.addListener(function (changes, namespace) {

    var key = void 0;
    for (key in changes) {
        if (!changes.hasOwnProperty(key)) {
            continue;
        }
        _console("Storage Changed" + JSON.stringify(changes[key]));
        if (changes[key].newValue) {
            __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].setLocal(key, changes[key].newValue);
        } else {
            //To handle cases when no data is present
            __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].remove(key);
        }
    }
});

function getWeather(lat, long) {
    var xmlhttp = new XMLHttpRequest();

    var url = 'http://api.subtletab.com/weather/';
    url += '?lat=' + lat + '&long=' + long;

    xmlhttp.open('GET', url);
    xmlhttp.setRequestHeader('chrome-extension', btoa(chrome.runtime.id));
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var weather = JSON.parse(xmlhttp.responseText);
            var now = +new Date();
            var localWeather = [now, weather.temp, weather.alt.temp, weather.code, weather.city];
            __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].set('weather', localWeather);
        }
    };
    xmlhttp.send();
}

function loadWeather() {
    navigator.geolocation.getCurrentPosition(function (position) {
        getWeather(position.coords.latitude, position.coords.longitude);
    }, function (error) {
        _console(error);
    }, { timeout: 10000 });
}
var weatherInterval = void 0;
function startWeather() {

    var localSettings = __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.SHARED_DATA);
    if (localSettings && localSettings.showUtilities.showWeather) {
        if (!weatherInterval) {
            weatherInterval = setInterval(function () {
                if (navigator.onLine) {
                    loadWeather();
                } else {
                    stopWeather();
                }
            }, 300000);
        }
    } else {
        stopWeather();
    }
}

function stopWeather() {
    clearInterval(weatherInterval);
}
function init() {

    chrome.runtime.setUninstallURL('https://goo.gl/forms/hMD1i4sXIUVwkKtD2');

    chrome.storage.sync.get(null, function (data) {
        for (var key in data) {
            if (!data.hasOwnProperty(key)) {
                continue;
            }
            __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].setLocal(key, data[key]);
        }
    });

    chrome.tabs.onCreated.addListener(function () {
        prevTabsCount = tabsCount;
        tabsCount++;
        if (tabsCount === 2) {
            __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.SEEN_ONBOARDING, true);
        }
    });
}
init();

/***/ }

/******/ });
//# sourceMappingURL=subtle.js.map