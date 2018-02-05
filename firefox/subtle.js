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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 51);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

"use strict";
var BASE_API = 'https://api.subtletab.com/';
var constants = {
    THEME: {
        NATURE: 'nature',
        ARCHITECTURE: 'building',
        TRAVEL: 'travel',
        NIGHT: 'night'
    },
    STORAGE: {
        SHARED_DATA: 'shared-data',
        MISC_SETTINGS: 'misc_settings',
        WEATHER: 'weather',

        BACKGROUND_SEEN_NIGHT: 'bg-seen-night',
        BACKGROUND_SEEN_TRAVEL: 'bg-seen-travel',
        BACKGROUND_SEEN_BUILDING: 'bg-seen-building',
        BACKGROUND_SEEN_NATURE: 'bg-seen-nature',
        BACKGROUND_CUSTOM: 'bg-custom',
        BACKGROUND_SEEN_CUSTOM: 'bg-seen-custom',

        CURRENT_PAGE: 'current-page',
        SEEN_ONBOARDING: 'seen-onboarding',
        NOTES_META: 'notes_meta',
        WHATS_NEW: 'whats_new',
        CURRENT_CUSTOMIZATION_TAB: 'current_c_tab'
    },
    SYNC: ['shared-data', 'bg-seen-nature', 'bg-seen-night', 'bg-seen-travel', 'bg-seen-building', 'current-page', 'nature', 'travel', 'building', 'night', 'notes_meta', 'notes-', 'bg-custom', 'bg-seen-custom', 'misc_settings'],
    URL: {
        WHATS_NEW: BASE_API + 'whatsnew'
    }
};

/* harmony default export */ exports["a"] = constants;

/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Constants__ = __webpack_require__(0);


var storage = {
    get: function get(key) {
        if (!key) {
            return;
        }
        var value = localStorage.getItem(key);
        return JSON.parse(value);
    },
    set: function set(key, value) {
        if (!key || value === undefined || value === null) {
            return;
        }
        if (__WEBPACK_IMPORTED_MODULE_0__Constants__["a" /* default */].SYNC.indexOf(key) > -1 || key.indexOf('note-') > -1) {
            var obj = {};
            obj[key] = value;
            chrome.storage.sync.set(obj);
        }
        localStorage.setItem(key, JSON.stringify(value));
    },
    setLocal: function setLocal(key, value) {
        if (!key || value === undefined || value === null) {
            return;
        }
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

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_storage__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_Constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_config__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_backgroundData__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_common__ = __webpack_require__(3);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };







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
    } else if (request.query === 'loadCurrentCustomBackground') {
        loadCurrentCustomBackground(request.url, sendResponse);
    } else if (request.query === 'loadNextCustomBackground') {
        loadNextBackground(request.url);
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
    img.onerror = function () {
        clearTimeout(defaultImageTimeout);
        defaultImageLoaded = true;
        callback(false);
    };

    var defaultImageTimeout = setTimeout(function () {
        defaultImageLoaded = true;
        callback(false);
    }, 2000);
};
var loadCurrentCustomBackground = function loadCurrentCustomBackground(url, callback) {
    var defaultImageLoaded = false;
    var img = new Image();
    img.src = url;
    img.onload = function () {
        if (!defaultImageLoaded) {
            clearTimeout(defaultImageTimeout);
            callback(url);
        }
    };
    img.onerror = function () {
        clearTimeout(defaultImageTimeout);
        defaultImageLoaded = true;
        callback(false);
    };
    var defaultImageTimeout = setTimeout(function () {
        defaultImageLoaded = true;
        callback(false);
    }, 4000);
};
var getBackground = function getBackground(theme, changePage) {
    return new Promise(function (resolve, reject) {
        var currentPage = __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.CURRENT_PAGE) || {};
        var themePage = currentPage[theme.value] || 0;

        if (changePage) {
            themePage++;
        }

        var url = 'https://api.subtletab.com/theme/';
        url += theme.tags + '/' + themePage;

        __WEBPACK_IMPORTED_MODULE_4__utils_common__["a" /* default */].http(url).then(function (response) {
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
        }, function (error) {
            reject(error);
        });
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
        updateLocalStorage();
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
        if (_typeof(changes[key].newValue) !== undefined) {
            __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].setLocal(key, changes[key].newValue);
        } else {
            //To handle cases when no data is present
            __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].remove(key);
        }
    }
});

function getWeather(data) {

    var url = 'https://api.subtletab.com/weather';

    if (data.type !== 'custom') {
        url += '?lat=' + data.lat + '&long=' + data.long + '&type=geo';
    } else {
        url += '?location=' + data.location + '&type=custom';
    }

    __WEBPACK_IMPORTED_MODULE_4__utils_common__["a" /* default */].http(url).then(function (weather) {
        __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.WEATHER, weather);
    });
}

function loadWeather(settings) {
    var options = {};
    if (settings.weather.location.type !== 'custom') {
        navigator.geolocation.getCurrentPosition(function (position) {
            options = {
                lat: position.coords.latitude,
                long: position.coords.longitude,
                type: 'geo'
            };
            getWeather(options);
        }, function (error) {
            _console(error);
        }, { timeout: 10000 });
    } else {
        options = {
            location: settings.weather.location.name,
            type: 'custom'
        };
        getWeather(options);
    }
}
var weatherInterval = void 0;

function startWeather() {

    var localSettings = __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.SHARED_DATA);
    if (localSettings && localSettings.showUtilities.showWeather) {
        if (!weatherInterval) {
            weatherInterval = setInterval(function () {
                if (navigator.onLine) {
                    localSettings = __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.SHARED_DATA);
                    loadWeather(localSettings);
                } else {
                    stopWeather();
                }
            }, 900000);
        }
    } else {
        stopWeather();
    }
}

function stopWeather() {
    clearInterval(weatherInterval);
}

function updateLocalStorage() {
    var sharedData = void 0;
    var miscSettings = void 0;
    // Show onboarding with latest features

    //storage.set(constants.STORAGE.SEEN_ONBOARDING, false);
    sharedData = __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.SHARED_DATA);
    miscSettings = __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.MISC_SETTINGS);
    // Add feature of custom location in weather
    if (sharedData && __WEBPACK_IMPORTED_MODULE_4__utils_common__["a" /* default */].isObject(sharedData)) {
        if (sharedData.weather && __WEBPACK_IMPORTED_MODULE_4__utils_common__["a" /* default */].isUndefined(sharedData.weather.location)) {
            var storedWeather = __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.WEATHER);
            // defining object of weather
            sharedData.weather.location = __WEBPACK_IMPORTED_MODULE_2__utils_config__["a" /* default */].defaultCustomization.weather.location;

            if (__WEBPACK_IMPORTED_MODULE_4__utils_common__["a" /* default */].isObject(storedWeather) && !sharedData.weather.location.name) {
                sharedData.weather.location.name = storedWeather[4] || storedWeather.city || '';
            }
        }
        if (sharedData.showUtilities && __WEBPACK_IMPORTED_MODULE_4__utils_common__["a" /* default */].isUndefined(sharedData.showUtilities.showNotes)) {
            sharedData.showUtilities.showNotes = true;
        }

        if (sharedData.background) {
            if (__WEBPACK_IMPORTED_MODULE_4__utils_common__["a" /* default */].isUndefined(sharedData.background.type)) {
                sharedData.background.type = 'predefined';
                __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.BACKGROUND_CUSTOM, __WEBPACK_IMPORTED_MODULE_3__utils_backgroundData__["a" /* default */].customBackgrounds);
            }
        }
        __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].remove(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.WEATHER);
    }

    if (miscSettings && __WEBPACK_IMPORTED_MODULE_4__utils_common__["a" /* default */].isObject(miscSettings)) {
        miscSettings.update.isToBeFetched = true;
        // remove this line once you send this update
        miscSettings.update.lastChecked = '002';
    }

    __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.SHARED_DATA, sharedData);
    __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.MISC_SETTINGS, miscSettings);
}

function init() {

    chrome.runtime.setUninstallURL('https://www.subtletab.com/uninstall');

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

/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
    themes: [{
        id: 1,
        lValue: 'Nature',
        tags: 'nature',
        value: 'nature',
        imgUrl: 'images/nature_thumbnail.png'
    }, {
        id: 2,
        lValue: 'Architecture',
        tags: 'building',
        value: 'building',
        imgUrl: 'images/architecture_thumbnail.png'
    }, {
        id: 3,
        lValue: 'Travel',
        tags: 'travel',
        value: 'travel',
        imgUrl: 'images/travel_thumbnail.png'
    }, {
        id: 4,
        lValue: 'Night Life',
        tags: 'night',
        value: 'night',
        imgUrl: 'images/night_thumbnail.png'
    }],
    stored: {
        1: {
            1: './images/backgrounds/nature-1.jpg',
            2: './images/backgrounds/nature-2.jpg',
            3: './images/backgrounds/nature-3.jpg'
        },
        2: {
            4: './images/backgrounds/building-1.jpg',
            5: './images/backgrounds/building-2.jpg',
            6: './images/backgrounds/building-3.jpg'
        },
        3: {
            7: './images/backgrounds/travel-1.jpg',
            8: './images/backgrounds/travel-2.jpg',
            9: './images/backgrounds/travel-3.jpg'
        },
        4: {
            10: './images/backgrounds/night-1.jpg',
            11: './images/backgrounds/night-2.jpg',
            12: './images/backgrounds/night-3.jpg'
        }

    },
    customBackgrounds: ['https://subtletab.com/extras/1.jpg', 'https://subtletab.com/extras/2.jpg', 'https://subtletab.com/extras/3.jpg', 'https://subtletab.com/extras/4.jpg', 'https://subtletab.com/extras/5.jpg', 'https://subtletab.com/extras/6.jpg', 'https://subtletab.com/extras/7.jpg', 'https://subtletab.com/extras/7.jpg', 'https://subtletab.com/extras/8.jpg']
};

/***/ },

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
    http: function http(url, method, data) {
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            method = method || 'GET';
            xmlhttp.open(method, url);
            xmlhttp.setRequestHeader('chrome-extension', btoa(chrome.runtime.id));
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4) {
                    if (xmlhttp.responseText) {
                        resolve(JSON.parse(xmlhttp.responseText));
                        return;
                    }
                    reject(xmlhttp.status);
                }
            };
            xmlhttp.onerror = function () {
                reject(xmlhttp.status);
            };
            xmlhttp.send(JSON.stringify(data));
        });
    },
    isObject: function isObject(data) {
        return data && Object.prototype.toString.call(data) === '[object Object]';
    },
    isArray: function isArray(data) {
        return data && Object.prototype.toString.call(data) === '[object Array]';
    },
    isUndefined: function isUndefined(data) {
        return typeof data === 'undefined';
    }
};

/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

"use strict";
var config = {
    defaultCustomization: {
        showUtilities: {
            showWeather: true,
            showClock: true,
            showNotes: true
        },
        clock: {
            showTwelveHour: true,
            showDay: true,
            type: 'twelve'
        },
        weather: {
            unit: 'c',
            location: {
                type: 'geo',
                name: ''
            }
        },
        background: {
            themeId: 1,
            changeInterval: 2,
            type: 'predefined'
        }
    },
    misc: {
        update: {
            lastChecked: '0020',
            isToBeFetched: true,
            isSeen: true
        }
    },
    other: {
        weather: {
            showWeatherInfo: false
        }
    }
};
/* harmony default export */ exports["a"] = config;

/***/ },

/***/ 51:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ }

/******/ });
//# sourceMappingURL=subtle.js.map