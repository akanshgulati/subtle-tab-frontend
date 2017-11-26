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
/******/ 	return __webpack_require__(__webpack_require__.s = 41);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
    prepend: function prepend(key, value) {
        var initialValue = this.get(key) || [];
        initialValue.unshift(value);
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
/* 1 */
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
        NOTES_META: 'notes_meta',
        TODOS_META: 'todos_meta',
        TODO_LISTS_META: 'todo_lists_meta',
        TODO_LIST: 'todo_list_',
        TODO: 'todo_',
        CURRENT_TODO_LIST: 'current_todo_list'
    },
    SYNC: ['shared-data', 'bg-seen-nature', 'bg-seen-night', 'bg-seen-travel', 'bg-seen-building', 'current-page', 'nature', 'travel', 'building', 'night', 'notes_meta', 'notes-']
};

/***/ },
/* 2 */
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

    }
};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var config = {
    defaultCustomization: {
        showUtilities: {
            showWeather: true,
            showClock: true
        },
        clock: {
            showTwelveHour: true,
            showDay: true
        },
        weather: {
            unit: 'c'
        },
        background: {
            themeId: 1,
            changeInterval: 10
        }
    }
};
/* harmony default export */ exports["a"] = config;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_vue__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__app_vue__);



new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
    el: '#app',
    render: function render(h) {
        return h(__WEBPACK_IMPORTED_MODULE_1__app_vue___default.a);
    }
});

/***/ },
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_storage__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_Constants__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_clock_vue__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_clock_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_clock_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_background_vue__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_background_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_background_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_customize_vue__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_customize_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_customize_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_weather_vue__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_weather_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_weather_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_notes_vue__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_notes_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_notes_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_todos_vue__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_todos_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__components_todos_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_onboarding_vue__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_onboarding_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__components_onboarding_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//












/* harmony default export */ exports["default"] = {
    beforeCreate: function beforeCreate() {
        this.sharedData = __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_2__utils_Constants__["a" /* default */].STORAGE.SHARED_DATA) || __WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* default */].defaultCustomization;
        this.seenOnBoarding = __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].get('seen-onboarding') || false;
    },
    data: function data() {
        return {
            sharedData: this.sharedData,
            componentsData: JSON.parse(JSON.stringify(this.sharedData)),
            showCustomizeMenu: false,
            showNotes: false,
            isLoading: true,
            seenOnBoarding: this.seenOnBoarding,
            showTodos: true
        };
    },
    mounted: function mounted() {
        var self = this;
        document.addEventListener('keydown', function (e) {
            if (e.keyCode === 78) {
                self.showNotes = true;
            } else if (e.keyCode === 67) {
                self.showCustomizeMenu = true;
            } else if (e.keyCode === 27) {
                self.closeWindows();
            }
        });
    },

    watch: {
        sharedData: {
            handler: function handler(newValue) {
                __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_2__utils_Constants__["a" /* default */].STORAGE.SHARED_DATA, newValue);
                this.componentsData = newValue;
            },
            deep: true
        }
    },
    methods: {
        toggleCustomizeMenu: function toggleCustomizeMenu() {
            this.showCustomizeMenu = !this.showCustomizeMenu;
        },
        toggleNotes: function toggleNotes() {
            this.showTodos = false;
            this.showNotes = !this.showNotes;
        },
        toggleTodos: function toggleTodos() {
            this.showNotes = false;
            this.showTodos = !this.showTodos;
        },
        stopLoad: function stopLoad() {
            this.isLoading = false;
        },
        startLoad: function startLoad() {
            this.isLoading = true;
        },
        stopOnBoarding: function stopOnBoarding() {
            this.seenOnBoarding = true;
            __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_2__utils_Constants__["a" /* default */].STORAGE.SEEN_ONBOARDING, this.seenOnBoarding);
        },
        closeWindows: function closeWindows() {
            this.showNotes = false;
            this.showTodos = false;
            this.showCustomizeMenu = false;
        },
        generateId: function generateId() {
            return 'xxxxxxxx3-0xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c === 'x' ? r : r & 0x3 | 0x8;
                return v.toString(16);
            });
        },
        isolateScroll: function isolateScroll(elementId) {
            var el = document.getElementById(elementId);
            if (!el) {
                return;
            }
            el.onmousewheel = function (e) {
                el.scrollTop -= e.wheelDeltaY;
                e = e || window.event;
                if (e.preventDefault) e.preventDefault();
                e.returnValue = false;
            };
        }
    },
    components: {
        Background: __WEBPACK_IMPORTED_MODULE_4__components_background_vue___default.a,
        Clock: __WEBPACK_IMPORTED_MODULE_3__components_clock_vue___default.a,
        Customize: __WEBPACK_IMPORTED_MODULE_5__components_customize_vue___default.a,
        Weather: __WEBPACK_IMPORTED_MODULE_6__components_weather_vue___default.a,
        Onboarding: __WEBPACK_IMPORTED_MODULE_9__components_onboarding_vue___default.a,
        Notes: __WEBPACK_IMPORTED_MODULE_7__components_notes_vue___default.a,
        Todos: __WEBPACK_IMPORTED_MODULE_8__components_todos_vue___default.a
    }
};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_bgUtil__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_backgroundData__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_storage__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_Constants__ = __webpack_require__(1);
//
//
//
//
//
//
//
//





var bgElement = void 0;

var backgroundVue = {
    beforeCreate: function beforeCreate() {
        //this.bgSeen = storage.get('bg-seen') || [];
    },
    data: function data() {
        return {
            showBackground: false,
            bgSeen: '',
            tabsCount: '',
            themeId: '',
            defaultImageLoaded: false,
            bgIndex: 0,
            allBackgrounds: null,
            bgKeys: null,
            themeVal: ''
        };
    },

    props: ['settings'],
    mounted: function mounted() {
        bgElement = document.getElementById('background');
        this.getBackground();
    },

    methods: {
        getAllBackgrounds: function getAllBackgrounds(theme) {
            var currentPage = __WEBPACK_IMPORTED_MODULE_2__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_3__utils_Constants__["a" /* default */].STORAGE.CURRENT_PAGE);
            var localBgData = __WEBPACK_IMPORTED_MODULE_2__utils_storage__["a" /* default */].get(theme.value);
            var storedBg = __WEBPACK_IMPORTED_MODULE_1__utils_backgroundData__["a" /* default */].stored[theme.id];
            return currentPage && currentPage[theme.value] && currentPage[theme.value] > 1 && localBgData ? localBgData : Object.assign({}, storedBg, localBgData);
        },

        getBackground: function getBackground(reset) {
            if (reset && this.themeId === this.settings.themeId) {
                return;
            }
            var theme = __WEBPACK_IMPORTED_MODULE_0__utils_bgUtil__["a" /* default */].getCurrentTheme(this.settings.themeId);
            this.themeVal = theme.value;
            var localBgData = __WEBPACK_IMPORTED_MODULE_2__utils_storage__["a" /* default */].get(theme.value);
            this.bgSeen = __WEBPACK_IMPORTED_MODULE_2__utils_storage__["a" /* default */].get('bg-seen-' + theme.value) || [];
            var allBackgrounds = this.getAllBackgrounds(theme);
            var bgKeys = Object.keys(allBackgrounds);
            this.allBackgrounds = allBackgrounds;
            this.bgKeys = bgKeys;
            this.themeId = theme.id;

            if (navigator.onLine) {
                chrome.runtime.sendMessage({ query: 'log', value: 'GetBackgorund Called ' + theme.id });
                var i = 0;
                for (; i < bgKeys.length; i++) {
                    if (this.bgSeen.indexOf(bgKeys[i]) === -1) {
                        this.bgIndex = i;
                        this.loadBackground();
                        break;
                    }
                }

                if (!localBgData || i >= bgKeys.length - 2) {
                    chrome.runtime.sendMessage({ query: 'log', value: 'No Local Storage Found for theme ' + theme.id });
                    chrome.runtime.sendMessage({ query: 'getBackground', theme: theme, newPage: true });
                }

                if (i >= bgKeys.length) {
                    bgElement.style.backgroundImage = 'url(' + this.getDefaultBg() + ')';
                    this.$emit('stopLoading');
                }
            } else {
                bgElement.style.backgroundImage = 'url(' + this.getDefaultBg() + ')';
                this.$emit('stopLoading');
            }
        },
        loadBackground: function loadBackground() {
            var _this = this;

            chrome.runtime.sendMessage({ query: 'log', value: 'Load Background Called' });
            this.isLoading();
            this.defaultImageLoaded = false;
            var i = this.bgIndex;
            var currentUrl = __WEBPACK_IMPORTED_MODULE_0__utils_bgUtil__["a" /* default */].formImgURL(this.allBackgrounds[this.bgKeys[i]], this.bgKeys[i]);
            chrome.runtime.sendMessage({ query: 'loadCurrentBackground', url: currentUrl }, function (responseURL) {
                if (responseURL) {
                    _this.defaultImageLoaded = false;
                    bgElement.style.backgroundImage = 'url(' + currentUrl + ')';
                    chrome.runtime.sendMessage({ query: 'log', value: 'Current URL ' + currentUrl });
                    _this.$emit('stopLoading');
                    var nextUrl = __WEBPACK_IMPORTED_MODULE_0__utils_bgUtil__["a" /* default */].formImgURL(_this.allBackgrounds[_this.bgKeys[i + 1]], _this.bgKeys[i + 1]);
                    chrome.runtime.sendMessage({ query: 'log', value: 'Next URL ' + nextUrl });
                    chrome.runtime.sendMessage({ query: 'loadNextBackground', url: nextUrl });
                } else {
                    _this.defaultImageLoaded = true;
                    bgElement.style.backgroundImage = 'url(' + _this.getDefaultBg() + ')';
                    chrome.runtime.sendMessage({ query: 'log', value: 'Default URL' + _this.settings.themeId });
                    _this.$emit('stopLoading');
                    chrome.runtime.sendMessage({ query: 'setTabsCount', value: 'decrement' });
                }
                _this.markBgSeen(_this.bgKeys[i]);
            });
        },
        resetBackgroundTheme: function resetBackgroundTheme() {
            this.getBackground(true);
            chrome.runtime.sendMessage({ query: 'setTabsCount', value: 0 });
        },
        isLoading: function isLoading() {
            this.$emit('startLoading');
        },
        markBgSeen: function markBgSeen(id) {
            var _this2 = this;

            chrome.runtime.sendMessage({ query: 'getTabsCount' }, function (tabs) {
                // to prevent change on refresh;
                if (!tabs) {
                    return;
                }
                if (tabs % _this2.settings.changeInterval === 0 && !_this2.defaultImageLoaded) {
                    _this2.bgSeen.push(id);
                    __WEBPACK_IMPORTED_MODULE_2__utils_storage__["a" /* default */].set('bg-seen-' + _this2.themeVal, _this2.bgSeen);
                } else if (_this2.defaultImageLoaded) {
                    chrome.runtime.sendMessage({ query: 'setTabsCount', value: parseInt(tabs) - 1 });
                }
            });
        },
        getDefaultBg: function getDefaultBg() {
            var counter = 0;
            var value = Math.random();
            var themeId = this.settings.themeId;
            counter = value < 0.33 ? 0 : counter = value < 0.66 ? 1 : 2;
            chrome.runtime.sendMessage({ query: 'log', value: 'getDefaultBg Called with counter, ' + counter });
            return __WEBPACK_IMPORTED_MODULE_1__utils_backgroundData__["a" /* default */].stored[themeId][1 + (themeId - 1) * 3 + counter];
        }
    },
    watch: {
        settings: {
            handler: function handler() {
                chrome.runtime.sendMessage({ query: 'log', value: 'Reset Called' });
                this.resetBackgroundTheme();
            },
            deep: true
        }
    }
};
/* harmony default export */ exports["default"] = backgroundVue;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//

var monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
/* harmony default export */ exports["default"] = {
    data: function data() {
        return {
            hrs: '',
            min: '',
            day: '',
            date: '',
            month: ''
        };
    },

    props: ['settings'],
    created: function created() {
        this.updateDateTime();
    },
    mounted: function mounted() {
        setInterval(this.updateDateTime, 1000);
    },

    methods: {
        updateDateTime: function updateDateTime() {
            var current = new Date();
            this.hrs = current.getHours();
            if (this.settings.showTwelveHour) {
                this.hrs = this.hrs !== 0 && this.hrs !== 12 ? this.hrs % 12 : 12;
            }
            this.min = this.getZeroPad(current.getMinutes());
            this.day = dayArr[current.getDay()];
            this.date = current.getDate();
            this.month = monthArr[current.getMonth()];
        },
        getZeroPad: function getZeroPad(n) {
            return (parseInt(n, 10) >= 10 ? '' : '0') + n;
        },
        concatAMPM: function concatAMPM() {
            if (this.settings.showTwelveHour) {
                return this.hours >= 12 ? 'PM' : 'AM';
            }
        }
    }
};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_backgroundData__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_storage__ = __webpack_require__(0);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ exports["default"] = {
    data: function data() {
        return {
            selectedTheme: this.settings.background.themeId,
            themes: __WEBPACK_IMPORTED_MODULE_0__utils_backgroundData__["a" /* default */].themes,
            version: chrome.runtime.getManifest().version
        };
    },
    methods: {
        isActiveTheme: function isActiveTheme(index) {
            return this.settings.background.themeId === index + 1;
        },
        selectActive: function selectActive(index) {
            this.settings.background.themeId = index + 1;
        },
        closeCustomizeMenu: function closeCustomizeMenu() {
            this.$emit('closeCustomizeMenu');
        },
        setBgInterval: function setBgInterval(value) {
            this.settings.background.changeInterval = value;
        }
    },
    props: ['settings'],
    computed: {}
};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_debounce__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_debounce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_debounce__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_storage__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_Constants__ = __webpack_require__(1);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ exports["default"] = {
    beforeCreate: function beforeCreate() {
        this.notesMeta = __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_2__utils_Constants__["a" /* default */].STORAGE.NOTES_META) || { count: 0, deletedNotes: [], createdNotes: [] };
    },
    data: function data() {
        return {
            input: '',
            notes: [],
            currentNote: '',
            currentNoteContent: '',
            notesMeta: this.notesMeta,
            errorMessage: null,
            showSidebar: false
        };
    },
    mounted: function mounted() {
        this.isolateScroll('note');
        this.isolateScroll('note-list');
        document.execCommand("DefaultParagraphSeparator", false, "p");
        this.populateNotes();
        this.addNoteLimit('note');
    },

    computed: {
        sortedNoted: function sortedNoted() {
            var notes = this.notes;
            notes.sort(function (a, b) {
                return b.updatedOn - a.updatedOn;
            });
            return notes;
        }
    },
    methods: {
        handler: function handler(e) {
            this.debouncedInput(e, this);
            this.debouncedInputSync(this);
        },

        debouncedInput: __WEBPACK_IMPORTED_MODULE_0__utils_debounce___default()(function (el, self) {
            var content = el.target.innerHTML;
            if (content.length > 7000) {
                content = content.slice(0, 7000);
            }
            self.currentNote.content = content;
            self.currentNote.updatedOn = +new Date();
            __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].setLocal('note-' + self.currentNote.id, self.currentNote);
        }, 1000),
        debouncedInputSync: __WEBPACK_IMPORTED_MODULE_0__utils_debounce___default()(function (self) {
            __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].chromeSync.set('note-' + self.currentNote.id, self.currentNote);
        }, 5000),
        addNoteLimit: function addNoteLimit(element) {
            var el = document.getElementById(element);
            var self = this;
            if (!el) {
                return;
            }
            var maxValue = 7000;
            el.onkeyup = function (e) {
                if (el.innerHTML.length > maxValue) {
                    self.errorMessage = 'Content limit reached for this note.';
                    e.preventDefault();
                } else if (e.which === 27) {
                    el.blur();
                } else {
                    self.errorMessage = null;
                }
            };

            el.onkeydown = function (e) {
                if (e.which !== 8 && el.innerHTML.length > maxValue) {
                    self.errorMessage = 'Content limit reached for this note.';
                    e.preventDefault();
                }
            };
        },
        getNoteTemplate: function getNoteTemplate() {
            //    let id = this.notesMeta.count + 1;
            var id = void 0;
            // Removing the id
            if (this.notesMeta.deletedNotes.length) {
                id = Math.min.apply(Math, _toConsumableArray(this.notesMeta.deletedNotes));
                this.notesMeta.deletedNotes.splice(this.notesMeta.deletedNotes.indexOf(id), 1);
            } else {
                id = this.notesMeta.createdNotes.length + 1;
            }
            return {
                id: id,
                createdOn: +new Date(),
                updatedOn: +new Date(),
                content: 'New Note'
            };
        },
        sortNotes: function sortNotes() {
            return this.notes.sort(function (a, b) {
                return b.updatedOn - a.updatedOn;
            });
        },

        isActiveNote: function isActiveNote(id) {
            return this.currentNote.id === id;
        },
        setCurrentNote: function setCurrentNote(id) {
            for (var i = 0; i < this.notes.length; i++) {
                if (this.notes[i].id === id) {
                    this.currentNote = this.notes[i];
                    //this.currentNote.updatedOn = +new Date();
                    break;
                }
            }
            this.errorMessage = null;
            document.getElementById("note").innerHTML = this.currentNote.content;
        },
        trimContent: function trimContent(value) {
            var ellipsis = '';
            value = value.replace(/<(?:.|\n)*?>/gm, ' ');
            if (!value.length || !value) {
                return 'New Note';
            }
            if (value.length > 25) {
                ellipsis = '...';
            }
            return value.slice(0, 25) + ellipsis;
        },
        populateNotes: function populateNotes() {
            var note = void 0;
            for (var i = 0; i < this.notesMeta.createdNotes.length; i++) {
                note = __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].get('note-' + this.notesMeta.createdNotes[i]);
                if (note) {
                    this.notes.push(note);
                }
            }
            if (this.notesMeta.createdNotes.length > 0 && this.notes.length > 0) {
                this.sortNotes();
                this.currentNote = this.notes[0];
                this.currentNoteContent = this.currentNote.content;
            }
        },
        isolateScroll: function isolateScroll(elementId) {
            var el = document.getElementById(elementId);
            if (!el) {
                return;
            }
            el.onmousewheel = function (e) {
                el.scrollTop -= e.wheelDeltaY;
                e = e || window.event;
                if (e.preventDefault) e.preventDefault();
                e.returnValue = false;
            };
        },
        toggleNoteList: function toggleNoteList() {
            this.showSidebar = !this.showSidebar;
        },
        deleteNote: function deleteNote(e) {
            e.preventDefault();
            e.stopPropagation();
            if (!confirm('Are you sure you want to delete this note?')) {
                return;
            }
            this.showSidebar = true;
            for (var j = 0; j < this.notes.length; j++) {
                if (this.notes[j].id === this.currentNote.id) {
                    this.notes.splice(j, 1);
                    break;
                }
            }
            __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].remove('note-' + this.currentNote.id);
            this.notesMeta.deletedNotes.push(this.currentNote.id);
            this.notesMeta.createdNotes.splice(this.notesMeta.createdNotes.indexOf(this.currentNote.id), 1);
            this.notesMeta.count--;

            if (this.notes.length > 0) {
                this.currentNote = this.notes[0];
                this.setCurrentNote(this.currentNote.id);
            }
        },
        createNote: function createNote(e) {
            var _this = this;

            e.stopPropagation();
            this.showSidebar = true;
            if (this.notes && this.notes.length > 9) {
                return;
            }
            var newNote = this.getNoteTemplate();
            this.notes.unshift(newNote);
            this.notesMeta.createdNotes.push(newNote.id);
            this.notesMeta.count++;
            __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].set('note-' + newNote.id, newNote);
            setTimeout(function () {
                return _this.setCurrentNote(newNote.id);
            }, 100);
        },
        createFirstNote: function createFirstNote(e) {
            var self = this;
            this.createNote(e);
            this.showSidebar = true;
            setTimeout(function () {
                self.isolateScroll('note');
            }, 100);
        }
    },
    watch: {
        notesMeta: {
            handler: function handler(newValue) {
                __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_2__utils_Constants__["a" /* default */].STORAGE.NOTES_META, newValue);
            },
            deep: true
        }
    },
    filters: {
        formatDate: function formatDate(value) {
            if (!value) {
                return;
            }
            var date = new Date(value);
            var now = +new Date();
            return now - date >= 86400000 ? date.toLocaleDateString() : date.toLocaleTimeString();
        }
    }
};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_storage__ = __webpack_require__(0);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ exports["default"] = {
    data: function data() {
        return {
            version: chrome.runtime.getManifest().version
        };
    },
    mounted: function mounted() {
        if (__WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].get('sync')) {
            __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].chromeSync.get(null, function (details) {
                var key = void 0;
                for (key in details) {
                    if (!details.hasOwnProperty(key)) {
                        continue;
                    }
                    __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].setLocal(key, details[key]);
                }
            });
        }
    },

    props: ['settings'],
    methods: {
        closeOnboarding: function closeOnboarding() {
            this.$emit('stopOnboarding');
        }
    }
};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_storage__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_Constants__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_timeUtil__ = __webpack_require__(16);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ exports["default"] = {
    beforeCreate: function beforeCreate() {
        this.todosMeta = __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.TODOS_META) || { count: 1, deletedTodos: [], createdTodos: [] };
    },
    data: function data() {
        return {
            input: '',
            todos: [],
            todoLists: [],
            allTodos: [],
            currentTodo: '',
            currentTodoContent: '',
            todosMeta: this.todosMeta,
            errorMessage: null,
            showSidebar: false,
            showSettingsDropDown: false,
            showTodoManager: false,
            listTitle: '',
            newTodo: {},
            currentListId: __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.CURRENT_TODO_LIST) || 'inbox',
            currentList: ''
        };
    },
    mounted: function mounted() {
        this.$parent.isolateScroll('todos-list');
        this.$parent.isolateScroll('todo-sidebar');
        this.getCurrentList();
        this.populateTodos();
    },

    computed: {},
    methods: {
        toggle: function toggle(field) {
            this[field] = !this[field];
        },
        getCurrentListTodos: function getCurrentListTodos() {
            var _this = this;

            if (this.currentListId === 'today') {
                this.newTodo.dueOn = __WEBPACK_IMPORTED_MODULE_2__utils_timeUtil__["a" /* default */].getEndOfDay();
                this.todos = this.allTodos.filter(function (todo) {
                    return __WEBPACK_IMPORTED_MODULE_2__utils_timeUtil__["a" /* default */].isTodayDate(todo.dueOn);
                });
            } else {
                this.newTodo.dueOn = __WEBPACK_IMPORTED_MODULE_2__utils_timeUtil__["a" /* default */].getEndOfDay(1);
                this.todos = this.allTodos.filter(function (todo) {
                    return todo.list === _this.currentListId;
                });
            }
            console.log('GetCurrentListTodos', this.currentListId, this.todos, 'new todo', this.newTodo.dueOn);
            this.sortTodos();
        },
        getCurrentList: function getCurrentList() {
            var _this2 = this;

            this.populateTodoLists();
            this.currentList = this.todoLists.filter(function (list) {
                return list.id === _this2.currentListId;
            })[0];
        },
        populateTodoLists: function populateTodoLists() {
            this.todoLists = [{
                title: 'Inbox',
                id: 'inbox'
            }, {
                title: 'Due Today',
                id: 'today'
            }];
            var listArray = __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.TODO_LISTS_META);
            if (!listArray) {
                return;
            }
            for (var i = 0; i < listArray.length; i++) {
                this.todoLists.push(__WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.TODO_LIST + listArray[i]));
            }
        },
        populateTodos: function populateTodos() {
            var todosArray = __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.TODOS_META);
            this.allTodos = [];
            if (!todosArray) {
                return;
            }
            for (var i = 0; i < todosArray.length; i++) {
                this.allTodos.push(__WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.TODO + todosArray[i]));
            }
            this.getCurrentListTodos();
        },
        createList: function createList() {
            if (!this.listTitle) {
                return;
            }
            var list = {
                id: this.$parent.generateId(),
                title: this.listTitle,
                createdOn: +new Date(),
                updatedOn: +new Date(),
                deleted: false
            };
            __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].append(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.TODO_LISTS_META, list.id);
            __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.TODO_LIST + list.id, list);
            this.listTitle = '';
            this.todoLists.push(list);
            chrome.runtime.sendMessage({ query: 'log', value: 'TODO-createList called' + list });
        },
        deleteList: function deleteList() {
            if (!confirm('Are you sure, all to-dos will also be deleted?')) {
                return;
            }
            var currentList = this.currentListId;
            var toDeleteTodos = void 0;
            var todoListsMeta = __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.TODO_LISTS_META);
            todoListsMeta.splice(todoListsMeta.indexOf(this.currentListId), 1);
            __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.TODO_LISTS_META, todoListsMeta);
            __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].remove(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.TODO_LIST + this.currentListId);
            this.setActiveList('inbox');
            toDeleteTodos = this.allTodos.filter(function (todo) {
                return todo.list === currentList;
            });
            var todosMeta = __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.TODOS_META);
            for (var i = 0; i < toDeleteTodos.length; i++) {
                var todo = toDeleteTodos[i];
                todosMeta.splice(todosMeta.indexOf(todo.id), 1);
                __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].remove(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.TODO + todo.id);
            }
            __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.TODOS_META, todosMeta);
        },
        createTodo: function createTodo() {
            if (!this.newTodo.title) {
                return;
            }
            var todo = {
                id: this.$parent.generateId(),
                title: this.newTodo.title,
                starred: false,
                repeat: false,
                repeat_type: '',
                list: this.currentListId,
                completed: false,
                completedOn: '',
                createdOn: +new Date(),
                updatedOn: +new Date(),
                dueOn: this.newTodo.dueOn
            };
            __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].append(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.TODOS_META, todo.id);
            __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.TODO + todo.id, todo);
            delete this.newTodo.title;
            this.todos.push(todo);
            this.sortTodos();
            chrome.runtime.sendMessage({ query: 'log', value: 'TODO-createTodo called' + todo });
        },
        checkedTodo: function checkedTodo(todo) {
            if (todo.completed) {
                todo.completedOn = +new Date();
            }
            todo.updatedOn = +new Date();
            __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.TODO + todo.id, todo);
            this.sortTodos();
        },
        sortTodos: function sortTodos() {
            return this.todos.sort(function (a, b) {
                var n = void 0;
                a.completed = +a.completed;
                b.completed = +b.completed;
                n = a.completed - b.completed;
                if (n !== 0) {
                    return n;
                }
                return b.completedOn - a.completedOn;
            });
        },
        setActiveList: function setActiveList(id) {
            console.log('setActiveList', id);
            __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.CURRENT_TODO_LIST, id);
            this.currentListId = id;
        },
        deleteTodo: function deleteTodo(todo) {
            if (!confirm('Are you sure you want to delete this todo?')) {
                return;
            }
            var todosMeta = __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.TODOS_META);
            todosMeta.splice(todosMeta.indexOf(todo.id), 1);
            __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.TODOS_META, todosMeta);
            __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].remove(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.TODO + todo.id);
            this.populateTodos();
        },
        editTodo: function editTodo(todo) {
            if (this.showSidebar) {
                return;
            }
            this.showTodoManager = true;
            this.currentTodo = todo;
        },
        updateTodo: function updateTodo() {
            __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.TODO + this.currentTodo.id, this.currentTodo);
            this.showTodoManager = false;
        }
    },
    watch: {
        currentListId: {
            handler: function handler(newValue, oldValue) {
                if (newValue !== oldValue) {
                    console.log("CurrentListId Watcher", this.currentListId);
                    this.getCurrentList();
                    this.populateTodos();
                }
            }
        },
        currentTodo: {
            handler: function handler() {
                this.currentTodo.repeat = !!this.currentTodo.repeat_type;
            },
            deep: true
        }
    }
};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_storage__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_weatherUtil__ = __webpack_require__(17);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ exports["default"] = {
    beforeCreate: function beforeCreate() {
        this.localWeather = __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].get('weather');
    },

    props: ['settings'],
    mounted: function mounted() {
        this.checkWeather();
    },
    data: function data() {
        return {
            weatherCode: null,
            weatherClass: null,
            weatherCity: null,
            temp: null,
            localWeather: this.localWeather,
            error: null,
            isLoading: true
        };
    },

    methods: {
        checkWeather: function checkWeather() {
            if (!navigator.onLine) {
                this.weatherCity = 'Offline';
                return;
            }
            var self = this;
            var now = +new Date();
            var oneHourTime = 900000;
            if (this.localWeather) {
                if (now - this.localWeather[0] > oneHourTime) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        self.loadWeather(position.coords.latitude, position.coords.longitude);
                    }, function (error) {
                        console.log(error);
                    }, { timeout: 10000 });
                } else {
                    this.temp = this.settings.unit === 'f' ? this.localWeather[2] : this.localWeather[1];
                    this.weatherCode = this.localWeather[3];
                    this.weatherClass = __WEBPACK_IMPORTED_MODULE_1__utils_weatherUtil__["a" /* default */][this.localWeather[3]];
                    this.weatherCity = this.localWeather[4];
                    this.isLoading = false;
                }
            } else {
                navigator.geolocation.getCurrentPosition(function (position) {
                    self.loadWeather(position.coords.latitude, position.coords.longitude);
                }, function (error) {
                    console.log(error);
                }, { timeout: 10000 });
            }
        },
        loadWeather: function loadWeather(lat, long) {
            var _this = this;

            var self = this;
            this.isLoading = true;
            chrome.runtime.sendMessage({ query: 'startWeather' });

            return new Promise(function (resolve, reject) {

                var xmlhttp = new XMLHttpRequest();

                var url = 'http://api.subtletab.com/weather/';
                url += '?lat=' + lat + '&long=' + long;

                xmlhttp.open('GET', url);
                xmlhttp.setRequestHeader('chrome-extension', btoa(chrome.runtime.id));
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                        var weather = JSON.parse(xmlhttp.responseText);
                        var now = +new Date();
                        self.isLoading = false;
                        self.temp = self.settings.unit === 'f' ? weather.alt.temp : weather.temp;
                        self.weatherCode = weather.code;
                        self.weatherClass = __WEBPACK_IMPORTED_MODULE_1__utils_weatherUtil__["a" /* default */][weather.code];
                        self.weatherCity = weather.city;

                        self.localWeather = [now, weather.temp, weather.alt.temp, weather.code, weather.city];
                        __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].set('weather', _this.localWeather);
                        resolve();
                    }
                };
                xmlhttp.onerror = function () {
                    reject(xmlhttp.status);
                };
                xmlhttp.send();
            });
        }
    },
    watch: {
        settings: {
            handler: function handler(newValue) {
                this.checkWeather();
            },
            deep: true
        }
    }
};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__storage__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__backgroundData__ = __webpack_require__(2);




var bgUtil = {
    getFormattedJSON: function getFormattedJSON(dataArr) {
        var url = void 0,
            screenWidth = void 0,
            arr = [];
        screenWidth = window.screen.width;
        if (screenWidth <= 1280) {
            url = 'largeImageURL';
        } else if (screenWidth <= 1920) {
            url = 'fullHDURL';
        } else {
            url = 'imageURL';
        }
        for (var i = 0; i < dataArr.hits.length; i++) {
            arr[i] = dataArr.hits[i][url];
        }
        return arr;
    },
    formImgURL: function formImgURL(string, id) {
        var arr = string.split(',');
        if (arr.length > 1) {
            return 'https://farm' + arr[1] + '.staticflickr.com/' + arr[2] + '/' + id + '_' + this.getSecret(arr) + this.getWallpaperSize();
        } else {
            return string;
        }
    },
    getSecret: function getSecret(arr) {
        var screenWidth = window.screen.width;
        if (screenWidth <= 1200) {
            return arr[0];
        } else if (screenWidth > 1200 && screenWidth < 1920) {
            return arr[3];
        } else {
            return arr[4];
        }
    },
    getWallpaperSize: function getWallpaperSize() {
        var screenWidth = window.screen.width;
        if (screenWidth <= 1024) {
            return '_b.jpg';
        } else if (screenWidth > 1024 && screenWidth < 1920) {
            return '_h.jpg';
        } else {
            return '';
        }
    },
    getCurrentTheme: function getCurrentTheme(id) {
        var themes = __WEBPACK_IMPORTED_MODULE_2__backgroundData__["a" /* default */].themes;
        for (var i = 0; i < themes.length; i++) {
            if (themes[i].id === id) {
                return themes[i];
            }
        }
    }
};

/* harmony default export */ exports["a"] = bgUtil;

/***/ },
/* 15 */
/***/ function(module, exports) {

var _ = function _(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
};

_.now = Date.now || function () {
    return new Date().getTime();
};

module.exports = function (func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function later() {
        previous = options.leading === false ? 0 : _.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function () {
        var now = _.now();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
    isTodayDate: function isTodayDate(timeStamp) {
        if (!timeStamp) {
            return false;
        }
        timeStamp = +new Date(timeStamp);
        // This will be according to user time zone
        var now = new Date();
        var minTime = +now.setHours(0, 0, 0, 0);
        var maxTime = +now.setHours(23, 59, 59, 59);
        return minTime <= timeStamp && timeStamp <= maxTime;
    },
    getEndOfDay: function getEndOfDay(days) {
        var now = new Date().setHours(23, 59, 59, 59);
        days = days ? days : 0;
        now = new Date(+now + 86400000 * days);
        return now.toISOString().substring(0, 10);
    }
};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
    "0": "tornado",
    "1": "day-storm-showers",
    "2": "hurricane",
    "3": "thunderstorm",
    "4": "thunderstorm",
    "5": "snow",
    "6": "sleet",
    "7": "rain-mix",
    "8": "rain",
    "9": "rain",
    "10": "snow-wind",
    "11": "showers",
    "12": "showers",
    "13": "snowflake-cold",
    "14": "snow",
    "15": "snow-wind",
    "16": "snow",
    "17": "hail",
    "18": "sleet",
    "19": "dust",
    "20": "fog",
    "21": "haze",
    "22": "smoke",
    "23": "strong-wind",
    "24": "windy",
    "25": "snowflake-cold",
    "26": "cloudy",
    "27": "night-cloudy",
    "28": "day-cloudy",
    "29": "night-cloudy",
    "30": "day-cloudy",
    "31": "night-clear",
    "32": "day-sunny",
    "33": "night-clear",
    "34": "day-sunny",
    "35": "hail",
    "36": "hot",
    "37": "thunderstorm",
    "38": "thunderstorm",
    "39": "thunderstorm",
    "40": "storm-showers",
    "41": "snowflake-cold",
    "42": "snow",
    "43": "snow",
    "44": "cloudy",
    "45": "storm-showers",
    "46": "snow-wind",
    "47": "thunderstorm"
};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"background.vue","sourceRoot":""}]);

// exports


/***/ },
/* 19 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ },
/* 20 */
/***/ function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(6)

/* template */
var __vue_template__ = __webpack_require__(36)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/wingify/Projects/vue-example/src/app.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a8c5392a", __vue_options__)
  } else {
    hotAPI.reload("data-v-a8c5392a", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] app.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(38)

/* script */
__vue_exports__ = __webpack_require__(7)

/* template */
var __vue_template__ = __webpack_require__(31)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/wingify/Projects/vue-example/src/components/background.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1385f791", __vue_options__)
  } else {
    hotAPI.reload("data-v-1385f791", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] background.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(8)

/* template */
var __vue_template__ = __webpack_require__(34)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/wingify/Projects/vue-example/src/components/clock.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-65184dfb", __vue_options__)
  } else {
    hotAPI.reload("data-v-65184dfb", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] clock.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(9)

/* template */
var __vue_template__ = __webpack_require__(35)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/wingify/Projects/vue-example/src/components/customize.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7016a930", __vue_options__)
  } else {
    hotAPI.reload("data-v-7016a930", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] customize.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(10)

/* template */
var __vue_template__ = __webpack_require__(30)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/wingify/Projects/vue-example/src/components/notes.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-08062f2e", __vue_options__)
  } else {
    hotAPI.reload("data-v-08062f2e", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] notes.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(11)

/* template */
var __vue_template__ = __webpack_require__(33)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/wingify/Projects/vue-example/src/components/onboarding.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-494b99fe", __vue_options__)
  } else {
    hotAPI.reload("data-v-494b99fe", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] onboarding.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(12)

/* template */
var __vue_template__ = __webpack_require__(32)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/wingify/Projects/vue-example/src/components/todos.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-444d8b5a", __vue_options__)
  } else {
    hotAPI.reload("data-v-444d8b5a", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] todos.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(13)

/* template */
var __vue_template__ = __webpack_require__(29)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/wingify/Projects/vue-example/src/components/weather.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-05c3f4be", __vue_options__)
  } else {
    hotAPI.reload("data-v-05c3f4be", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] weather.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
  return _h('div', [(_vm.isLoading) ? _h('div', {
    staticClass: "weather-loading"
  }, ["Loading.."]) : _vm._e(), " ", _h('div', {
    class: {
      'fade_in': !_vm.isLoading
    },
    attrs: {
      "id": "weather"
    }
  }, [(_vm.temp) ? _h('div', {
    staticClass: "temperature"
  }, [_h('div', {
    staticClass: "temperature-value"
  }, [_vm._s(_vm.temp)]), " ", (this.settings.unit === 'f') ? _h('sup', {
    staticClass: "temperature-unit"
  }, ["℉"]) : _vm._e(), " ", (this.settings.unit === 'c') ? _h('sup', {
    staticClass: "temperature-unit"
  }, ["℃"]) : _vm._e()]) : _vm._e(), " ", _h('div', {
    staticClass: "weather-icon flex flex-center"
  }, [_h('i', {
    staticClass: "wi",
    class: 'wi-' + _vm.weatherClass
  }), " ", _h('span', {
    staticClass: "weather-city"
  }, [_vm._s(_vm.weatherCity)])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-05c3f4be", module.exports)
  }
}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
  return _h('div', {
    staticClass: "notes-arrow_box",
    attrs: {
      "id": "notes"
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
      }
    }
  }, [(!_vm.notesMeta.count) ? _h('div', {
    staticClass: "col s12 note full-height relative no-padding flex flex-justify-center flex-flow-column flex-center"
  }, [_vm._m(0), " ", _h('h5', {
    staticClass: "italics create_note pointer",
    on: {
      "click": _vm.createFirstNote
    }
  }, ["Create first note"])]) : _vm._e(), " ", (_vm.notesMeta.count) ? _h('div', {
    staticClass: "full-height"
  }, [_h('div', {
    staticClass: "note full-height no-padding relative flex-flow-column flex"
  }, [_h('header', {
    staticClass: "flex widget-header flex-center"
  }, [_h('svg', {
    staticClass: "pointer flex-no-shrink",
    attrs: {
      "width": "1.3rem",
      "height": "1rem",
      "viewBox": "0 0 23 21",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    },
    on: {
      "click": _vm.toggleNoteList
    }
  }, [_h('g', {
    attrs: {
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_h('g', {
    attrs: {
      "id": "hamburger",
      "transform": "translate(0.000000, 2.000000)",
      "stroke": "#7d7d7d",
      "stroke-width": "4"
    }
  }, [_h('path', {
    attrs: {
      "d": "M0.132183908,0 L22.8678161,0",
      "id": "XMLID_6_"
    }
  }), " ", _h('polyline', {
    attrs: {
      "id": "XMLID_9_",
      "points": "0.132183908 16.8 20.0697663 16.8 22.8678161 16.8"
    }
  }), " ", _h('path', {
    attrs: {
      "d": "M0.132183908,8.4 L22.8678161,8.4",
      "id": "XMLID_8_"
    }
  })])])]), " ", _h('h4', {
    staticClass: "widget-heading mar-0"
  }, ["Notes (N)"]), " ", _h('div', {
    staticClass: "button-section flex"
  }, [_h('div', [(_vm.sortedNoted.length < 10) ? _h('svg', {
    staticClass: "pointer",
    attrs: {
      "width": "1.3rem",
      "height": "1.3rem",
      "viewBox": "0 0 49 51",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    },
    on: {
      "click": _vm.createNote
    }
  }, [_h('g', {
    attrs: {
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_h('g', {
    attrs: {
      "id": "create_note",
      "transform": "translate(0.000000, -4.000000)",
      "fill-rule": "nonzero",
      "fill": "#7d7d7d"
    }
  }, [_h('polyline', {
    attrs: {
      "id": "XMLID_5_",
      "points": "12.0936873 10.8107459 12.0936873 21.4530518 1.13730207 21.4530518"
    }
  }), " ", _h('g', {
    attrs: {
      "id": "Group",
      "transform": "translate(32.503764, 21.426374) rotate(15.000000) translate(-32.503764, -21.426374) translate(19.385379, 2.846686)"
    }
  }, [_h('path', {
    attrs: {
      "d": "M24.5589684,3.61816066 L19.7169893,0.636528265 C18.0617081,-0.379683526 15.8884477,0.122838788 14.8637498,1.76441168 L14.5034165,2.33393697 L25.3359371,8.98956585 L25.6962705,8.42004056 C26.7209684,6.77846766 26.2029892,4.63437245 24.5589684,3.61816066 Z",
      "id": "XMLID_4_"
    }
  }), " ", _h('path', {
    attrs: {
      "d": "M1.80166664,22.66934 L1.82418747,22.6805071 C1.77914581,22.7475101 1.75662498,22.8256802 1.74536456,22.9038504 L0.045041666,36.5054543 C0.022520833,36.7176304 0.123864582,36.9298065 0.304031246,37.0526453 C0.495458326,37.1643169 0.731927073,37.1643169 0.912093737,37.0414781 L12.4427602,29.4813091 C12.5103227,29.4366405 12.5666248,29.3808046 12.6116665,29.3026345 L12.6341873,29.3138017 L24.547708,10.2514552 L13.7264477,3.59582634 L1.80166664,22.66934 Z M4.96584368,33.043634 L1.83544789,31.122882 L2.73628121,23.908895 L11.0802498,29.0457898 L4.96584368,33.043634 Z",
      "id": "Shape"
    }
  })]), " ", _h('polygon', {
    attrs: {
      "id": "XMLID_1_",
      "points": "36.4387078 30.4872863 35.7743432 30.0852684 34.3330099 31.0344772 34.3330099 51.8165667 2.26334372 51.8165667 2.26334372 21.4418846 11.868479 11.916295 27.7681871 11.916295 29.1644788 9.69402963 10.9338644 9.69402963 0.0112604165 20.5261773 0.0112604165 54.0499992 36.5738328 54.0499992 36.5738328 30.2527759"
    }
  })])])]) : _vm._e()]), " ", _h('div', [_h('svg', {
    staticClass: "pointer",
    attrs: {
      "width": "1.3rem",
      "height": "1.3rem",
      "viewBox": "0 0 30 36",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    },
    on: {
      "click": _vm.deleteNote
    }
  }, [_h('g', {
    attrs: {
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_h('g', {
    attrs: {
      "id": "delete_note",
      "fill-rule": "nonzero",
      "fill": "#7d7d7d"
    }
  }, [_h('polygon', {
    attrs: {
      "points": "9.875 11.175 12.125 11.175 12.125 29.175 9.875 29.175"
    }
  }), " ", _h('polygon', {
    attrs: {
      "points": "17.375 11.175 19.625 11.175 19.625 29.175 17.375 29.175"
    }
  }), " ", _h('polygon', {
    attrs: {
      "points": "0.375 4.425 29.625 4.425 29.625 6.675 0.375 6.675"
    }
  }), " ", _h('path', {
    attrs: {
      "d": "M20.55,5.55 L18.45,5.55 L18.45,3.3 C18.45,2.625 17.925,2.1 17.25,2.1 L12.75,2.1 C12.075,2.1 11.55,2.625 11.55,3.3 L11.55,5.55 L9.45,5.55 L9.45,3.3 C9.45,1.5 10.95,0 12.75,0 L17.25,0 C19.05,0 20.55,1.5 20.55,3.3 L20.55,5.55"
    }
  }), " ", _h('path', {
    attrs: {
      "d": "M21.75,35.925 L8.25,35.925 C6.45,35.925 4.875,34.425 4.725,32.625 L2.625,5.625 L4.875,5.475 L6.975,32.475 C7.05,33.15 7.65,33.675 8.25,33.675 L21.75,33.675 C22.425,33.675 23.025,33.075 23.025,32.475 L25.125,5.475 L27.375,5.625 L25.275,32.625 C25.125,34.5 23.55,35.925 21.75,35.925"
    }
  })])])])])])]), " ", (_vm.errorMessage) ? _h('div', {
    staticClass: "note-error"
  }, [_vm._s(_vm.errorMessage)]) : _vm._e(), " ", _h('section', {
    staticClass: "flex relative note-section flex-flow-column"
  }, [_h('div', {
    staticClass: "sidebar flex-flow-column flex",
    class: {
      'show-sidebar': _vm.showSidebar && _vm.notesMeta.count
    }
  }, [_h('transition-group', {
    staticClass: "note-list flex flex-flow-column flex-center",
    attrs: {
      "name": "flip-list",
      "tag": "ul",
      "id": "note-list"
    }
  }, [_vm._l((_vm.sortedNoted), function(note, index) {
    return _h('li', {
      key: note,
      staticClass: "flex flex-flow-column pointer",
      class: {
        'active': _vm.isActiveNote(note.id)
      },
      on: {
        "click": function($event) {
          _vm.setCurrentNote(note.id);
          _vm.showSidebar = false;
        }
      }
    }, [_h('p', {
      staticClass: "note-title",
      domProps: {
        "innerHTML": _vm._s(_vm.trimContent(note.content))
      }
    }), " ", _h('div', {
      staticClass: "note-data"
    }, [_vm._s(_vm._f("formatDate")(note.createdOn))])])
  })])]), " ", _h('div', {
    attrs: {
      "id": "note",
      "contenteditable": "true"
    },
    domProps: {
      "innerHTML": _vm._s(_vm.currentNoteContent)
    },
    on: {
      "input": _vm.handler,
      "click": function($event) {
        $event.stopPropagation();
        _vm.showSidebar = false
      }
    }
  })])])]) : _vm._e()])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;
  return _h('div', [_h('img', {
    attrs: {
      "src": "images/note_landing_page_icon.png"
    }
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-08062f2e", module.exports)
  }
}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;
  return _h('div', [_h('div', {
    staticClass: "util-overlay"
  }), " ", _h('div', {
    attrs: {
      "id": "background"
    }
  }), " "])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1385f791", module.exports)
  }
}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
  return _h('div', {
    staticClass: "todos-arrow_box relative flex-flow-column flex",
    attrs: {
      "id": "todos"
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
      }
    }
  }, [_h('header', {
    staticClass: "flex widget-header flex-center"
  }, [_h('svg', {
    staticClass: "pointer flex-no-shrink",
    attrs: {
      "width": "1.3rem",
      "height": "1rem",
      "viewBox": "0 0 23 21",
      "version": "1.1"
    },
    on: {
      "click": function($event) {
        _vm.toggle('showSidebar');
        _vm.showTodoManager = false;
      }
    }
  }, [_h('g', {
    attrs: {
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_h('g', {
    attrs: {
      "id": "hamburger",
      "transform": "translate(0.000000, 2.000000)",
      "stroke": "#7d7d7d",
      "stroke-width": "4"
    }
  }, [_h('path', {
    attrs: {
      "d": "M0.132183908,0 L22.8678161,0",
      "id": "XMLID_6_"
    }
  }), " ", _h('polyline', {
    attrs: {
      "id": "XMLID_9_",
      "points": "0.132183908 16.8 20.0697663 16.8 22.8678161 16.8"
    }
  }), " ", _h('path', {
    attrs: {
      "d": "M0.132183908,8.4 L22.8678161,8.4",
      "id": "XMLID_8_"
    }
  })])])]), " ", _h('h4', {
    staticClass: "widget-heading mar-0"
  }, ["To-do (T) : " + _vm._s(_vm.currentList.title)]), " ", _h('div', {
    staticClass: "button-section flex flex-center"
  }, [_h('svg', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.currentListId != 'inbox' && _vm.currentListId != 'today'),
      expression: "currentListId != 'inbox' && currentListId != 'today'"
    }],
    staticClass: "pointer",
    attrs: {
      "width": "1.3rem",
      "height": "1.3rem",
      "viewBox": "0 0 30 36",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.deleteList($event)
      }
    }
  }, [_h('g', {
    attrs: {
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_h('g', {
    attrs: {
      "id": "delete_note",
      "fill-rule": "nonzero",
      "fill": "#7d7d7d"
    }
  }, [_h('polygon', {
    attrs: {
      "points": "9.875 11.175 12.125 11.175 12.125 29.175 9.875 29.175"
    }
  }), " ", _h('polygon', {
    attrs: {
      "points": "17.375 11.175 19.625 11.175 19.625 29.175 17.375 29.175"
    }
  }), " ", _h('polygon', {
    attrs: {
      "points": "0.375 4.425 29.625 4.425 29.625 6.675 0.375 6.675"
    }
  }), " ", _h('path', {
    attrs: {
      "d": "M20.55,5.55 L18.45,5.55 L18.45,3.3 C18.45,2.625 17.925,2.1 17.25,2.1 L12.75,2.1 C12.075,2.1 11.55,2.625 11.55,3.3 L11.55,5.55 L9.45,5.55 L9.45,3.3 C9.45,1.5 10.95,0 12.75,0 L17.25,0 C19.05,0 20.55,1.5 20.55,3.3 L20.55,5.55"
    }
  }), " ", _h('path', {
    attrs: {
      "d": "M21.75,35.925 L8.25,35.925 C6.45,35.925 4.875,34.425 4.725,32.625 L2.625,5.625 L4.875,5.475 L6.975,32.475 C7.05,33.15 7.65,33.675 8.25,33.675 L21.75,33.675 C22.425,33.675 23.025,33.075 23.025,32.475 L25.125,5.475 L27.375,5.625 L25.275,32.625 C25.125,34.5 23.55,35.925 21.75,35.925"
    }
  })])])]), " "])]), " ", _h('section', {
    staticClass: "flex relative todo-section flex-flow-column"
  }, [_h('div', {
    staticClass: "sidebar flex-flow-column flex",
    class: {
      'show-sidebar': _vm.showSidebar
    },
    attrs: {
      "id": "todo-sidebar"
    }
  }, [_h('div', {
    staticClass: "sidebar-container"
  }, [_h('transition-group', {
    staticClass: "todo-lists pad-0 flex flex-flow-column flex-center",
    attrs: {
      "name": "flip-list",
      "tag": "ul"
    }
  }, [_vm._l((_vm.todoLists), function(list) {
    return _h('li', {
      key: list.id,
      staticClass: "flex flex-flow-column pointer todo-list",
      class: [_vm.currentListId == list.id ? 'active' : ''],
      on: {
        "click": function($event) {
          _vm.setActiveList(list.id);
          _vm.showSidebar = false;
        }
      }
    }, [_h('a', {
      staticClass: "todo-list-title",
      attrs: {
        "title": list.title
      }
    }, [_vm._s(list.title)])])
  })]), " ", _h('div', {
    staticClass: "flex todo-list relative pointer"
  }, [_h('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.listTitle),
      expression: "listTitle"
    }],
    staticClass: "create-todo-list no-focus",
    attrs: {
      "type": "text",
      "placeholder": "+ Create new list"
    },
    domProps: {
      "value": _vm._s(_vm.listTitle)
    },
    on: {
      "keyup": function($event) {
        if (_vm._k($event.keyCode, "enter", 13)) { return; }
        _vm.createList($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.listTitle = $event.target.value
      }
    }
  })])])]), " ", _h('div', {
    staticClass: "sidebar-right flex-flow-column flex",
    class: {
      'show-right-sidebar': _vm.showTodoManager
    },
    attrs: {
      "id": "todo-manager-sidebar"
    }
  }, [_h('div', {
    staticClass: "sidebar-container"
  }, [_h('div', [_h('p', {
    staticClass: "sidebar-heading"
  }, ["Todo Title"]), " ", _h('input', {
    staticClass: "input-todo-title no-focus",
    attrs: {
      "type": "text",
      "placeholder": ""
    },
    domProps: {
      "value": _vm.currentTodo.title
    }
  })]), " ", _h('div', [_h('p', {
    staticClass: "sidebar-heading"
  }, ["Due Date"]), " ", _h('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.currentTodo.dueOn),
      expression: "currentTodo.dueOn"
    }],
    staticClass: "input-todo-date no-focus",
    attrs: {
      "type": "date"
    },
    domProps: {
      "value": _vm._s(_vm.currentTodo.dueOn)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.currentTodo.dueOn = $event.target.value
      }
    }
  })]), " ", _h('div', [_h('p', {
    staticClass: "sidebar-heading"
  }, ["Repeat Duration"]), " ", _h('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.currentTodo.repeat_type),
      expression: "currentTodo.repeat_type"
    }],
    staticClass: "browser-default",
    attrs: {
      "name": "",
      "id": ""
    },
    on: {
      "change": function($event) {
        _vm.currentTodo.repeat_type = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        })[0]
      }
    }
  }, [_h('option', {
    attrs: {
      "value": ""
    }
  }, ["Never"]), " ", _h('option', {
    attrs: {
      "value": "1"
    }
  }, ["Daily"]), " ", _h('option', {
    attrs: {
      "value": "7"
    }
  }, ["Weekly"])])]), " ", _h('div', [_h('button', {
    staticClass: "btn",
    on: {
      "click": function($event) {
        _vm.updateTodo()
      }
    }
  }, ["Done"])])])]), " ", _h('div', {
    staticClass: "flex flex-flow-column",
    attrs: {
      "id": "todo"
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.showSidebar = false;
        _vm.showTodoManager = false
      }
    }
  }, [_h('transition-group', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.todos.length),
      expression: "todos.length"
    }],
    staticClass: "todos",
    attrs: {
      "name": "flip-list",
      "tag": "ul",
      "id": "todos-list"
    }
  }, [_vm._l((_vm.todos), function(todo) {
    return _h('li', {
      key: todo.id,
      staticClass: "todo flex"
    }, [_h('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (todo.completed),
        expression: "todo.completed"
      }],
      staticClass: "browser-default todo--checkbox filled-in",
      attrs: {
        "type": "checkbox",
        "id": todo.id
      },
      domProps: {
        "checked": Array.isArray(todo.completed) ? _vm._i(todo.completed, null) > -1 : _vm._q(todo.completed, true)
      },
      on: {
        "change": [function($event) {
          var $$a = todo.completed,
            $$el = $event.target,
            $$c = $$el.checked ? (true) : (false);
          if (Array.isArray($$a)) {
            var $$v = null,
              $$i = _vm._i($$a, $$v);
            if ($$c) {
              $$i < 0 && (todo.completed = $$a.concat($$v))
            } else {
              $$i > -1 && (todo.completed = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
            }
          } else {
            todo.completed = $$c
          }
        }, function($event) {
          _vm.checkedTodo(todo)
        }]
      }
    }), " ", _h('label', {
      staticClass: "todo--name",
      attrs: {
        "for": todo.id
      }
    }, [" " + _vm._s(todo.title)]), " ", _h('div', {
      staticClass: "todo-btn"
    }, [_h('svg', {
      staticClass: "pointer",
      attrs: {
        "height": "10",
        "width": "10",
        "version": "1.1",
        "viewBox": "0 0 21.9 21.9",
        "enable-background": "new 0 0 21.9 21.9"
      },
      on: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.deleteTodo(todo)
        }
      }
    }, [_h('path', {
      attrs: {
        "d": "M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0  c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4  s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3  s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7  s-0.1-0.5-0.3-0.7L14.1,11.3z"
      }
    })]), " ", _h('svg', {
      staticClass: "pointer",
      staticStyle: {
        "enable-background": "new 0 0 60 60"
      },
      attrs: {
        "height": "16",
        "width": "16",
        "version": "1.1",
        "x": "0px",
        "y": "0px",
        "viewBox": "0 0 60 60",
        "xml:space": "preserve"
      },
      on: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.editTodo(todo)
        }
      }
    }, [_h('g', {
      attrs: {
        "fill": "#a7a7a7"
      }
    }, [_h('path', {
      attrs: {
        "d": "M30,16c4.411,0,8-3.589,8-8s-3.589-8-8-8s-8,3.589-8,8S25.589,16,30,16z"
      }
    }), " ", _h('path', {
      attrs: {
        "d": "M30,44c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,44,30,44z"
      }
    }), " ", _h('path', {
      attrs: {
        "d": "M30,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,22,30,22z"
      }
    })])])])])
  })]), " ", (!_vm.todos.length) ? _h('div', {
    staticClass: "flex flex-flow-column flex-justify-center flex-center",
    attrs: {
      "id": "no-todo"
    }
  }, [_h('img', {
    attrs: {
      "src": "/images/no-to-do.png",
      "alt": "No Todo",
      "width": "134px"
    }
  }), " ", _h('em', ["No tasks to do in " + _vm._s(_vm.currentList.title) + " list! ", _h('br'), "Create your first to-do"])]) : _vm._e(), " ", _h('div', {
    staticClass: "input-todo flex"
  }, [_h('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newTodo.title),
      expression: "newTodo.title"
    }],
    staticClass: "input-todo-title no-focus",
    attrs: {
      "type": "text",
      "placeholder": "+ Create a new to-do"
    },
    domProps: {
      "value": _vm._s(_vm.newTodo.title)
    },
    on: {
      "keyup": function($event) {
        if (_vm._k($event.keyCode, "enter", 13)) { return; }
        _vm.createTodo($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newTodo.title = $event.target.value
      }
    }
  }), " ", _h('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newTodo.dueOn),
      expression: "newTodo.dueOn"
    }],
    staticClass: "input-todo-date no-focus",
    attrs: {
      "type": "date",
      "value": ""
    },
    domProps: {
      "value": _vm._s(_vm.newTodo.dueOn)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newTodo.dueOn = $event.target.value
      }
    }
  })])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-444d8b5a", module.exports)
  }
}

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
  return _h('div', {
    staticClass: "flex flex-end"
  }, [_h('div', {
    staticClass: "container"
  }, [_h('div', {
    staticClass: "row onboarding-message flex"
  }, [_vm._m(0), " ", _h('div', {
    staticClass: "col s6 flex flex-flow-column flex-justify-center"
  }, [_h('h1', ["Hi, Thank you for ", _h('br'), " choosing\n                    ", _h('span', {
    staticClass: "italics semi-bold relative"
  }, ["Subtle", _h('span', {
    staticClass: "version"
  }, ["v" + _vm._s(_vm.version)])])]), " ", _h('div', {
    staticClass: "onboarding-btn",
    on: {
      "click": _vm.closeOnboarding
    }
  }, ["Let's Start"])])]), " ", _vm._m(1)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;
  return _h('div', {
    staticClass: "col s6"
  }, [_h('img', {
    attrs: {
      "src": "images/welcome_mockup.png",
      "alt": "Desktop Mockup",
      "width": "90%"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;
  return _h('div', {
    staticClass: "row change-row"
  }, [_h('div', {
    staticClass: "col s3 center"
  }, [_h('div', {
    staticClass: "change-heading"
  }, ["Inspiring Wallpapers"]), " ", _h('div', {
    staticClass: "change-description"
  }, ["Refreshing wallpapers ", _h('br'), " of various category"])]), " ", _h('div', {
    staticClass: "col s3 center"
  }, [_h('div', {
    staticClass: "change-heading"
  }, ["Keeps you updated"]), " ", _h('div', {
    staticClass: "change-description"
  }, ["Latest weather updates ", _h('br'), "with date and time"])]), " ", _h('div', {
    staticClass: "col s3 center"
  }, [_h('div', {
    staticClass: "change-heading"
  }, ["Notes Widget"]), " ", _h('div', {
    staticClass: "change-description"
  }, ["Sticky notes to ", _h('br'), " keep important content.  "])]), " ", _h('div', {
    staticClass: "col s3 center"
  }, [_h('div', {
    staticClass: "change-heading"
  }, ["Remain Synced"]), " ", _h('div', {
    staticClass: "change-description"
  }, ["Keep your settings ", _h('br'), " and notes synced "])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-494b99fe", module.exports)
  }
}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
  return _h('div', {
    attrs: {
      "id": "clock"
    }
  }, [_h('div', {
    staticClass: "time"
  }, [_vm._s(_vm.hrs) + ":" + _vm._s(_vm.min)]), " ", _h('div', {
    staticClass: "date",
    class: {
      'fade_in': _vm.settings.showDay
    }
  }, [_vm._s(_vm.day) + ", " + _vm._s(_vm.month) + " " + _vm._s(_vm.date) + " "])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-65184dfb", module.exports)
  }
}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
  return _h('div', {
    on: {
      "click": function($event) {
        $event.stopPropagation();
      }
    }
  }, [_h('header', [_h('div', {
    staticClass: "flex flex-center right"
  }, [_h('div', {
    staticClass: "close-btn",
    on: {
      "click": _vm.closeCustomizeMenu
    }
  }, [_h('svg', {
    attrs: {
      "width": "1.5rem",
      "height": "1.5rem",
      "viewBox": "0 0 12 12",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_h('g', {
    attrs: {
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_h('g', {
    attrs: {
      "id": "close_btn",
      "fill-rule": "nonzero",
      "fill": "#999999"
    }
  }, [_h('path', {
    attrs: {
      "d": "M6,0 C2.69169231,0 0,2.69146154 0,6 C0,9.30853846 2.69169231,12 6,12 C9.30830769,12 12,9.30853846 12,6 C12,2.69146154 9.30830769,0 6,0 Z M6,11.5384615 C2.94623077,11.5384615 0.461538462,9.05376923 0.461538462,6 C0.461538462,2.94623077 2.94623077,0.461538462 6,0.461538462 C9.05376923,0.461538462 11.5384615,2.94623077 11.5384615,6 C11.5384615,9.05376923 9.05376923,11.5384615 6,11.5384615 Z",
      "id": "Shape"
    }
  }), " ", _h('path', {
    attrs: {
      "d": "M8.24007692,3.75992308 C8.14984615,3.66969231 8.004,3.66969231 7.91376923,3.75992308 L6,5.67369231 L4.08623077,3.75992308 C3.996,3.66969231 3.85015385,3.66969231 3.75992308,3.75992308 C3.66969231,3.85015385 3.66969231,3.996 3.75992308,4.08623077 L5.67369231,6 L3.75992308,7.91376923 C3.66969231,8.004 3.66969231,8.14984615 3.75992308,8.24007692 C3.80492308,8.28507692 3.864,8.30769231 3.92307692,8.30769231 C3.98215385,8.30769231 4.04123077,8.28507692 4.08623077,8.24007692 L6,6.32630769 L7.91376923,8.24007692 C7.95876923,8.28507692 8.01784615,8.30769231 8.07692308,8.30769231 C8.136,8.30769231 8.19507692,8.28507692 8.24007692,8.24007692 C8.33030769,8.14984615 8.33030769,8.004 8.24007692,7.91376923 L6.32630769,6 L8.24007692,4.08623077 C8.33030769,3.996 8.33030769,3.85015385 8.24007692,3.75992308 Z",
      "id": "Shape"
    }
  })])])])])]), " ", _h('span', ["Customize (C)"])]), " ", _h('ul', [_h('li', [_h('h4', ["Wallpaper Category"]), " ", _h('ul', {
    staticClass: "thumbnails"
  }, [_vm._l((_vm.themes), function(theme, index) {
    return _h('li', {
      staticClass: "thumbnail",
      class: {
        active: _vm.isActiveTheme(index)
      }
    }, [_h('div', {
      staticClass: "thumbnail-image",
      style: ({
        'background-image': 'url(' + theme.imgUrl + ')'
      }),
      on: {
        "click": function($event) {
          _vm.selectActive(index)
        }
      }
    }), " ", _h('p', {
      staticClass: "thumbnail-name font-center"
    }, [_vm._s(theme.lValue)])])
  })])]), " ", _h('li', {
    staticClass: "flex flex-center"
  }, [_h('h4', {
    staticClass: "btn-group-header"
  }, ["Change wallpaper after"]), " ", _h('div', {
    staticClass: "btn-group"
  }, [_h('div', {
    staticClass: "btn-inner",
    class: {
      'active': _vm.settings.background.changeInterval === 5
    },
    on: {
      "click": function($event) {
        _vm.setBgInterval(5)
      }
    }
  }, ["5 Tabs"]), " ", _h('div', {
    staticClass: "btn-inner",
    class: {
      'active': _vm.settings.background.changeInterval === 10
    },
    on: {
      "click": function($event) {
        _vm.setBgInterval(10)
      }
    }
  }, ["10 Tabs"]), " ", _h('div', {
    staticClass: "btn-inner",
    class: {
      'active': _vm.settings.background.changeInterval === 15
    },
    on: {
      "click": function($event) {
        _vm.setBgInterval(15)
      }
    }
  }, ["15 Tabs"]), " ", _h('div', {
    staticClass: "btn-inner",
    class: {
      'active': _vm.settings.background.changeInterval === 20
    },
    on: {
      "click": function($event) {
        _vm.setBgInterval(20)
      }
    }
  }, ["20 Tabs"])])]), " ", _h('li', {
    staticClass: "flex flex-center"
  }, [_h('div', {
    staticClass: "flex-grow-1 flex flex-flow-column"
  }, [_h('div', {
    staticClass: "flex flex-center"
  }, [_h('h4', ["Clock"]), " ", _h('div', {
    staticClass: "switch"
  }, [_h('label', [_h('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.settings.showUtilities.showClock),
      expression: "settings.showUtilities.showClock"
    }],
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": Array.isArray(_vm.settings.showUtilities.showClock) ? _vm._i(_vm.settings.showUtilities.showClock, null) > -1 : _vm._q(_vm.settings.showUtilities.showClock, true)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.settings.showUtilities.showClock,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$c) {
            $$i < 0 && (_vm.settings.showUtilities.showClock = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.settings.showUtilities.showClock = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.settings.showUtilities.showClock = $$c
        }
      }
    }
  }), " ", _h('span', {
    staticClass: "lever"
  })])])]), " ", _h('ul', [_h('li', [_h('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.settings.clock.showTwelveHour),
      expression: "settings.clock.showTwelveHour"
    }],
    staticClass: "filled-in",
    attrs: {
      "type": "checkbox",
      "id": "clock-twelveHour",
      "disabled": !_vm.settings.showUtilities.showClock
    },
    domProps: {
      "checked": Array.isArray(_vm.settings.clock.showTwelveHour) ? _vm._i(_vm.settings.clock.showTwelveHour, null) > -1 : _vm._q(_vm.settings.clock.showTwelveHour, true)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.settings.clock.showTwelveHour,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$c) {
            $$i < 0 && (_vm.settings.clock.showTwelveHour = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.settings.clock.showTwelveHour = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.settings.clock.showTwelveHour = $$c
        }
      }
    }
  }), " ", _h('label', {
    attrs: {
      "for": "clock-twelveHour"
    }
  }, ["12 Hour Format"])]), " ", _h('li', [_h('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.settings.clock.showDay),
      expression: "settings.clock.showDay"
    }],
    staticClass: "filled-in",
    attrs: {
      "type": "checkbox",
      "id": "clock-day",
      "disabled": !_vm.settings.showUtilities.showClock
    },
    domProps: {
      "checked": Array.isArray(_vm.settings.clock.showDay) ? _vm._i(_vm.settings.clock.showDay, null) > -1 : _vm._q(_vm.settings.clock.showDay, true)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.settings.clock.showDay,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$c) {
            $$i < 0 && (_vm.settings.clock.showDay = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.settings.clock.showDay = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.settings.clock.showDay = $$c
        }
      }
    }
  }), " ", _h('label', {
    attrs: {
      "for": "clock-day"
    }
  }, ["Show Day"])])])]), " ", _h('div', {
    staticClass: "flex-grow-1 flex flex-flow-column"
  }, [_h('div', {
    staticClass: "flex flex-center"
  }, [_h('h4', ["Weather"]), " ", _h('div', {
    staticClass: "switch"
  }, [_h('label', [_h('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.settings.showUtilities.showWeather),
      expression: "settings.showUtilities.showWeather"
    }],
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": Array.isArray(_vm.settings.showUtilities.showWeather) ? _vm._i(_vm.settings.showUtilities.showWeather, null) > -1 : _vm._q(_vm.settings.showUtilities.showWeather, true)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.settings.showUtilities.showWeather,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$c) {
            $$i < 0 && (_vm.settings.showUtilities.showWeather = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.settings.showUtilities.showWeather = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.settings.showUtilities.showWeather = $$c
        }
      }
    }
  }), " ", _h('span', {
    staticClass: "lever"
  })])])]), " ", _h('ul', [_h('li', [_h('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.settings.weather.unit),
      expression: "settings.weather.unit"
    }],
    staticClass: "filled-in",
    attrs: {
      "type": "radio",
      "id": "weather-celcius",
      "value": "c",
      "disabled": !_vm.settings.showUtilities.showWeather
    },
    domProps: {
      "checked": _vm._q(_vm.settings.weather.unit, "c")
    },
    on: {
      "change": function($event) {
        _vm.settings.weather.unit = "c"
      }
    }
  }), " ", _h('label', {
    attrs: {
      "for": "weather-celcius"
    }
  }, ["Celsius"])]), " ", _h('li', [_h('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.settings.weather.unit),
      expression: "settings.weather.unit"
    }],
    staticClass: "filled-in",
    attrs: {
      "type": "radio",
      "id": "weather-fehren",
      "value": "f",
      "disabled": !_vm.settings.showUtilities.showWeather
    },
    domProps: {
      "checked": _vm._q(_vm.settings.weather.unit, "f")
    },
    on: {
      "change": function($event) {
        _vm.settings.weather.unit = "f"
      }
    }
  }), " ", _h('label', {
    attrs: {
      "for": "weather-fehren"
    }
  }, ["Fahrenheit"])])])])]), " ", _vm._m(0)]), " ", _h('div', {
    staticClass: "customize-footer"
  }, [_h('div', {
    staticClass: "flex"
  }, [_h('span', {
    staticClass: "version"
  }, ["v" + _vm._s(_vm.version)]), " ", _h('span', {
    staticStyle: {
      "margin": "0 0.5rem"
    }
  }, ["|"]), " ", _vm._m(1)]), " ", _vm._m(2)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;
  return _h('li', {
    staticClass: "flex flex-center"
  }, [_h('div', [_h('div', {
    staticClass: "flex flex-center"
  })])])
},function (){var _vm=this;var _h=_vm.$createElement;
  return _h('div', {
    staticClass: "flex"
  }, [_h('span', {
    staticClass: "semi-bold"
  }, ["Shortcuts"]), " ", _h('ul', {
    staticClass: "flex shortcut-bar"
  }, [_h('li', [_h('span', {
    staticClass: "shortcut-key"
  }, ["N"]), " Open Notes"]), " ", _h('li', [_h('span', {
    staticClass: "shortcut-key"
  }, ["C"]), " Open Customize"]), " ", _h('li', [_h('span', {
    staticClass: "shortcut-key"
  }, ["Esc"]), " Close all"])])])
},function (){var _vm=this;var _h=_vm.$createElement;
  return _h('div', {
    staticClass: "success-links"
  }, [_h('a', {
    attrs: {
      "href": "https://goo.gl/forms/XcIS7fojHNT166nA2",
      "target": "_blank"
    }
  }, ["Support"]), " ", _h('a', {
    attrs: {
      "href": "https://goo.gl/forms/hMD1i4sXIUVwkKtD2",
      "target": "_blank"
    }
  }, ["Feedback"])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7016a930", module.exports)
  }
}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
  return _h('div', {
    on: {
      "click": _vm.closeWindows
    }
  }, [(!_vm.seenOnBoarding) ? _h('onboarding', {
    attrs: {
      "id": "onboarding"
    },
    on: {
      "stopOnboarding": _vm.stopOnBoarding
    }
  }) : _vm._e(), " ", (_vm.seenOnBoarding) ? _h('div', [_h('div', {
    staticClass: "loading",
    class: {
      'show-loading': _vm.isLoading
    }
  }), " ", _h('div', {
    class: {
      'fade_in': !_vm.isLoading
    },
    attrs: {
      "id": "viewport"
    }
  }, [_h('background', {
    attrs: {
      "settings": _vm.componentsData.background
    },
    on: {
      "stopLoading": _vm.stopLoad,
      "startLoading": _vm.startLoad
    }
  }), " ", _h('div', {
    attrs: {
      "id": "utilities"
    }
  }, [_h('div', {
    attrs: {
      "id": "position--bottom-right"
    }
  }, [(_vm.sharedData.showUtilities.showClock) ? _h('clock', {
    attrs: {
      "settings": _vm.componentsData.clock
    }
  }) : _vm._e()]), " ", _h('div', {
    attrs: {
      "id": "position--top-right"
    }
  }, [_h('div', {
    staticClass: "flex flex-center"
  }, [_h('div', {
    staticClass: "todo-widget relative",
    on: {
      "keydown": function($event) {
        $event.stopPropagation();
      }
    }
  }, [_h('div', {
    staticClass: "todo-icon pointer",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.toggleTodos($event)
      }
    }
  }, [_h('svg', {
    attrs: {
      "viewBox": "0 0 512 512",
      "enable-background": "new 0 0 512 512",
      "width": "1.8rem"
    }
  }, [_h('g', [_h('g', {
    attrs: {
      "id": "todo_btn"
    }
  }, [_h('path', {
    attrs: {
      "d": "M370,95.4V53.9h-62.2V12.5H204.2v41.5H142v41.5H69.5v404.1h373.1V95.4H370z M224.9,33.2h62.2v20.7h-62.2V33.2z M162.7,74.7h186.5v62.2H162.7V74.7z M421.8,478.8H90.2V116.1H142v41.4h228v-41.4h51.8V478.8z"
    }
  }), " ", _h('rect', {
    attrs: {
      "width": "20.7",
      "x": "131.6",
      "y": "222.8",
      "height": "20.7"
    }
  }), " ", _h('rect', {
    attrs: {
      "width": "20.7",
      "x": "131.6",
      "y": "307.8",
      "height": "20.7"
    }
  }), " ", _h('rect', {
    attrs: {
      "width": "20.7",
      "x": "131.6",
      "y": "393.8",
      "height": "20.7"
    }
  }), " ", _h('rect', {
    attrs: {
      "width": "207.3",
      "x": "173.1",
      "y": "222.8",
      "height": "20.7"
    }
  }), " ", _h('rect', {
    attrs: {
      "width": "207.3",
      "x": "173.1",
      "y": "307.8",
      "height": "20.7"
    }
  }), " ", _h('rect', {
    attrs: {
      "width": "207.3",
      "x": "173.1",
      "y": "393.8",
      "height": "20.7"
    }
  })])])]), " "]), " ", (_vm.showTodos) ? _h('todos', {
    class: {
      'fade_in': _vm.showTodos
    }
  }) : _vm._e()]), " ", _h('div', {
    staticClass: "notes-widget relative",
    on: {
      "keydown": function($event) {
        $event.stopPropagation();
      }
    }
  }, [_h('div', {
    staticClass: "notes-icon pointer",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.toggleNotes($event)
      }
    }
  }, [_h('svg', {
    staticStyle: {
      "enable-background": "new 0 0 58.27 58.27"
    },
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "version": "1.1",
      "x": "0px",
      "y": "0px",
      "viewBox": "0 0 58.27 58.27",
      "xml:space": "preserve",
      "width": "1.8rem"
    }
  }, [_h('g', {
    attrs: {
      "id": "note_btn"
    }
  }, [_h('path', {
    attrs: {
      "d": "M56.261,35.724l-2.849-2.85c-1.128-1.127-3.094-1.127-4.222,0L33.799,48.265l-2.121,7.779l-0.519,0.519   c-0.388,0.388-0.389,1.014-0.006,1.405l-0.005,0.02l0.019-0.005c0.194,0.19,0.446,0.288,0.699,0.288   c0.256,0,0.512-0.098,0.707-0.293l0.52-0.52l7.778-2.121l15.39-15.391C57.425,38.781,57.425,36.888,56.261,35.724z M36.108,48.784   l10.243-10.243l4.243,4.243L40.351,53.027L36.108,48.784z M35.206,50.71l3.22,3.22l-4.428,1.208L35.206,50.71z M54.847,38.531   l-2.839,2.839l-4.243-4.243l2.839-2.839c0.372-0.373,1.021-0.373,1.393,0l2.85,2.85C55.231,37.521,55.231,38.147,54.847,38.531z"
    }
  }), " ", _h('path', {
    attrs: {
      "d": "M8.135,36h26c0.552,0,1-0.447,1-1s-0.448-1-1-1h-26c-0.552,0-1,0.447-1,1S7.583,36,8.135,36z"
    }
  }), " ", _h('path', {
    attrs: {
      "d": "M30.135,40h-22c-0.552,0-1,0.447-1,1s0.448,1,1,1h22c0.552,0,1-0.447,1-1S30.688,40,30.135,40z"
    }
  }), " ", _h('path', {
    attrs: {
      "d": "M8.135,18h13c0.552,0,1-0.447,1-1s-0.448-1-1-1h-13c-0.552,0-1,0.447-1,1S7.583,18,8.135,18z"
    }
  }), " ", _h('path', {
    attrs: {
      "d": "M21.135,48c0.552,0,1-0.447,1-1s-0.448-1-1-1h-13c-0.552,0-1,0.447-1,1s0.448,1,1,1H21.135z"
    }
  }), " ", _h('path', {
    attrs: {
      "d": "M37.135,22h-29c-0.552,0-1,0.447-1,1s0.448,1,1,1h29c0.552,0,1-0.447,1-1S37.688,22,37.135,22z"
    }
  }), " ", _h('path', {
    attrs: {
      "d": "M8.135,30h14c0.552,0,1-0.447,1-1s-0.448-1-1-1h-14c-0.552,0-1,0.447-1,1S7.583,30,8.135,30z"
    }
  }), " ", _h('path', {
    attrs: {
      "d": "M38.135,29c0-0.553-0.448-1-1-1h-7c-0.552,0-1,0.447-1,1s0.448,1,1,1h7C37.688,30,38.135,29.553,38.135,29z"
    }
  }), " ", _h('path', {
    attrs: {
      "d": "M26.845,29.709c0.18-0.189,0.29-0.45,0.29-0.71s-0.11-0.52-0.29-0.71c-0.38-0.37-1.05-0.37-1.42,0   c-0.18,0.19-0.29,0.45-0.29,0.71c0,0.271,0.11,0.521,0.29,0.71c0.19,0.181,0.45,0.29,0.71,0.29   C26.395,29.999,26.656,29.89,26.845,29.709z"
    }
  }), " ", _h('path', {
    attrs: {
      "d": "M26.135,56h-23V8h7v2c0,0.553,0.448,1,1,1h23c0.552,0,1-0.447,1-1V8h7v22c0,0.553,0.448,1,1,1s1-0.447,1-1V7   c0-0.553-0.448-1-1-1h-8V4c0-0.553-0.448-1-1-1h-6V1c0-0.553-0.448-1-1-1h-9c-0.552,0-1,0.447-1,1v2h-6c-0.552,0-1,0.447-1,1v2h-8   c-0.552,0-1,0.447-1,1v50c0,0.553,0.448,1,1,1h24c0.552,0,1-0.447,1-1S26.688,56,26.135,56z M19.135,2h7v2v2h-7V4V2z M12.135,5h5v2   c0,0.553,0.448,1,1,1h9c0.552,0,1-0.447,1-1V5h5v2v2h-21V7V5z"
    }
  })])])]), " ", (_vm.showNotes) ? _h('notes', {
    class: {
      'fade_in': _vm.showNotes
    }
  }) : _vm._e()]), " ", _h('div', {
    staticClass: "pointer nav-bar-opener",
    class: {
      'fade_in': !_vm.showCustomizeMenu
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.toggleCustomizeMenu($event)
      }
    }
  }, [_h('svg', {
    attrs: {
      "enable-background": "new 0 0 20 20",
      "height": "2rem",
      "version": "1.1",
      "viewBox": "0 0 100 100",
      "width": "2rem",
      "xml:space": "preserve",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }
  }, [_h('g', {
    attrs: {
      "id": "customize_btn"
    }
  }, [_h('path', {
    attrs: {
      "d": "M86.139,41.691l-8.095-1.175c-0.276-0.762-0.539-1.506-0.864-2.219l4.987-6.622c1.406-1.882,1.123-4.653-0.673-6.448   l-5.846-5.854c-1.006-1.007-2.358-1.578-3.715-1.578c-1.006,0-1.947,0.32-2.73,0.904l-6.615,4.97   c-0.729-0.337-1.472-0.605-2.22-0.883l-1.179-7.984C58.85,12.447,56.68,11,54.141,11h-8.28c-2.539,0-4.709,1.447-5.048,3.803   l-1.18,7.96c-0.748,0.279-1.495,0.551-2.226,0.892l-6.611-4.96c-0.782-0.584-1.727-0.903-2.731-0.903   c-1.359,0-2.716,0.571-3.722,1.58l-5.856,5.852c-1.799,1.8-2.1,4.572-0.693,6.452l4.94,6.617c-0.337,0.728-0.665,1.473-0.941,2.225   l-7.928,1.175C11.567,42.023,10,44.147,10,46.741v8.276c0,2.594,1.565,4.719,3.862,5.051l8.097,1.176   c0.276,0.763,0.538,1.507,0.863,2.219l-4.987,6.622c-1.407,1.883-1.124,4.654,0.672,6.449l5.846,5.854   c1.005,1.008,2.356,1.582,3.713,1.582c1.006,0,1.951-0.313,2.733-0.896l6.614-4.954c0.728,0.337,1.473,0.635,2.221,0.913   l1.18,8.043C41.152,89.432,43.322,91,45.861,91h8.28c2.539,0,4.709-1.566,5.049-3.924l1.18-8.079   c0.742-0.276,1.488-0.548,2.227-0.892l6.611,4.959c0.779,0.584,1.725,0.903,2.73,0.903c1.358,0,2.717-0.571,3.724-1.579   l5.854-5.853c1.799-1.8,2.1-4.57,0.694-6.453l-4.94-6.615c0.34-0.733,0.666-1.479,0.941-2.225l7.93-1.175   C88.436,59.736,90,57.611,90,55.02v-8.277C90,44.147,88.436,42.023,86.139,41.691z M73.882,58.236   c-0.455,1.479-1.06,2.935-1.796,4.324l-0.749,1.407l6.683,8.925c-0.017,0.025-0.037,0.056-0.068,0.086l-5.854,5.856   c-0.027,0.028-0.056,0.052-0.08,0.067l-8.929-6.666l-1.407,0.75c-1.434,0.761-2.888,1.378-4.326,1.82l-1.523,0.488L54.236,86.68   C54.211,86.688,54.18,87,54.141,87h-8.28c-0.036,0-0.067-0.313-0.093-0.318l-1.596-11.3l-1.526-0.563   c-1.474-0.451-2.928-1.086-4.324-1.824l-1.409-0.764l-8.941,6.664c-0.021-0.015-0.043-0.037-0.066-0.06l-5.852-5.856   c-0.026-0.025-0.049-0.054-0.065-0.076l6.692-8.932l-0.76-1.412c-0.703-1.324-1.304-2.738-1.791-4.324l-0.514-1.521l-11.193-1.574   C14.419,55.104,14,55.063,14,55.02v-8.277c0-0.045,0.419-0.085,0.424-0.12l11.112-1.575l0.526-1.521   c0.456-1.482,1.09-2.938,1.825-4.325l0.762-1.408l-6.674-8.926c0.016-0.025,0.041-0.054,0.072-0.085l5.854-5.854   c0.028-0.028,0.058-0.049,0.083-0.066l8.929,6.671l1.409-0.744c1.436-0.762,2.89-1.363,4.324-1.804l1.524-0.457L45.765,15.2   c0.025-0.007,0.058-0.2,0.096-0.2h8.28c0.037,0,0.068,0.191,0.094,0.198l1.597,11.214l1.524,0.528   c1.486,0.457,2.94,1.092,4.324,1.827l1.409,0.761l8.94-6.665c0.02,0.016,0.043,0.037,0.066,0.061l5.85,5.854   c0.027,0.027,0.051,0.055,0.066,0.078l-6.689,8.932l0.758,1.411c0.693,1.311,1.313,2.765,1.791,4.325l0.516,1.521l11.189,1.575   C85.581,46.656,86,46.696,86,46.741v8.276c0,0.047-0.419,0.086-0.424,0.121l-11.111,1.574L73.882,58.236z"
    }
  }), _h('g', [_h('path', {
    attrs: {
      "d": "M50.001,67.971c-9.61,0-17.428-7.82-17.428-17.43c0-9.61,7.818-17.429,17.428-17.429c9.608,0,17.429,7.818,17.429,17.429    C67.43,60.15,59.609,67.971,50.001,67.971z M50.001,37.187c-7.363,0-13.354,5.991-13.354,13.354    c0,7.363,5.991,13.354,13.354,13.354c7.362,0,13.354-5.988,13.354-13.354C63.354,43.178,57.363,37.187,50.001,37.187z"
    }
  })])])])])])]), " ", _h('div', {
    attrs: {
      "id": "position--top-left"
    }
  }, [(_vm.sharedData.showUtilities.showWeather) ? _h('weather', {
    attrs: {
      "settings": _vm.componentsData.weather
    }
  }) : _vm._e()])])]), " ", _h('div', {
    attrs: {
      "id": "customize-section"
    }
  }, [(_vm.showCustomizeMenu) ? _h('div', {
    staticClass: "customization-overlay"
  }) : _vm._e(), " ", _h('customize', {
    class: {
      'fade_in': _vm.showCustomizeMenu
    },
    attrs: {
      "settings": _vm.sharedData,
      "id": "customize"
    },
    on: {
      "closeCustomizeMenu": _vm.toggleCustomizeMenu
    }
  })])]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a8c5392a", module.exports)
  }
}

/***/ },
/* 37 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;
	var sourceMap = obj.sourceMap;

	if (media) {
		styleElement.setAttribute("media", media);
	}

	if (sourceMap) {
		// https://developer.chrome.com/devtools/docs/javascript-debugging
		// this makes source maps inside style tags work properly in Chrome
		css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(18);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(37)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-1385f791!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./background.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-1385f791!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./background.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * Vue.js v2.1.4
 * (c) 2014-2016 Evan You
 * Released under the MIT License.
 */
'use strict';

/*  */

/**
 * Convert a value to a string that is actually rendered.
 */
function _toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val, 10);
  return (n || n === 0) ? n : val
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Remove an item from an array
 */
function remove$1 (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  }
}

/**
 * Camelize a hyphen-delmited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind$1 (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
var toString = Object.prototype.toString;
var OBJECT_STRING = '[object Object]';
function isPlainObject (obj) {
  return toString.call(obj) === OBJECT_STRING
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 */
function noop () {}

/**
 * Always return false.
 */
var no = function () { return false; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  /* eslint-disable eqeqeq */
  return a == b || (
    isObject(a) && isObject(b)
      ? JSON.stringify(a) === JSON.stringify(b)
      : false
  )
  /* eslint-enable eqeqeq */
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: null,

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * List of asset types that a component can own.
   */
  _assetTypes: [
    'component',
    'directive',
    'filter'
  ],

  /**
   * List of lifecycle hooks.
   */
  _lifecycleHooks: [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated'
  ],

  /**
   * Max circular updates allowed in a scheduler flush cycle.
   */
  _maxUpdateCount: 100
};

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  } else {
    var segments = path.split('.');
    return function (obj) {
      for (var i = 0; i < segments.length; i++) {
        if (!obj) { return }
        obj = obj[segments[i]];
      }
      return obj
    }
  }
}

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return /native code/.test(Ctor.toString())
}

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) { cb.call(ctx); }
      if (_resolve) { _resolve(ctx); }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] !== undefined
    };
    Set.prototype.add = function add (key) {
      this.set[key] = 1;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

var warn = noop;
var formatComponentName;

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';

  warn = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.error("[Vue warn]: " + msg + " " + (
        vm ? formatLocation(formatComponentName(vm)) : ''
      ));
    }
  };

  formatComponentName = function (vm) {
    if (vm.$root === vm) {
      return 'root instance'
    }
    var name = vm._isVue
      ? vm.$options.name || vm.$options._componentTag
      : vm.name;
    return (
      (name ? ("component <" + name + ">") : "anonymous component") +
      (vm._isVue && vm.$options.__file ? (" at " + (vm.$options.__file)) : '')
    )
  };

  var formatLocation = function (str) {
    if (str === 'anonymous component') {
      str += " - use the \"name\" option for better debugging messages.";
    }
    return ("\n(found in " + str + ")")
  };
}

/*  */


var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove$1(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stablize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var arguments$1 = arguments;

    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments$1[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true,
  isSettingProps: false
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 *
 * istanbul ignore next
 */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set$1 (obj, key, val) {
  if (Array.isArray(obj)) {
    obj.length = Math.max(obj.length, key);
    obj.splice(key, 1, val);
    return val
  }
  if (hasOwn(obj, key)) {
    obj[key] = val;
    return
  }
  var ob = obj.__ob__;
  if (obj._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return
  }
  if (!ob) {
    obj[key] = val;
    return
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (obj, key) {
  var ob = obj.__ob__;
  if (obj._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(obj, key)) {
    return
  }
  delete obj[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set$1(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        childVal.call(this),
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
};

/**
 * Hooks and param attributes are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

config._lifecycleHooks.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

config._assetTypes.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  /* istanbul ignore if */
  if (!childVal) { return parentVal }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return parentVal }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }
  normalizeProps(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = typeof extendsFrom === 'function'
      ? mergeOptions(parent, extendsFrom.options, vm)
      : mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      var mixin = child.mixins[i];
      if (mixin.prototype instanceof Vue$2) {
        mixin = mixin.options;
      }
      parent = mergeOptions(parent, mixin, vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  var res = assets[id] ||
    // camelCase ID
    assets[camelize(id)] ||
    // Pascal Case ID
    assets[capitalize(camelize(id))];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isBooleanType(prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (process.env.NODE_ENV !== 'production') {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (isObject(def)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm[key] !== undefined) {
    return vm[key]
  }
  // call factory function for non-Function types
  return typeof def === 'function' && prop.type !== Function
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType);
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      'Invalid prop: type check failed for prop "' + name + '".' +
      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

/**
 * Assert the type of a value
 */
function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (expectedType === 'String') {
    valid = typeof value === (expectedType = 'string');
  } else if (expectedType === 'Number') {
    valid = typeof value === (expectedType = 'number');
  } else if (expectedType === 'Boolean') {
    valid = typeof value === (expectedType = 'boolean');
  } else if (expectedType === 'Function') {
    valid = typeof value === (expectedType = 'function');
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match && match[1]
}

function isBooleanType (fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === 'Boolean'
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === 'Boolean') {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}



var util = Object.freeze({
	defineReactive: defineReactive$$1,
	_toString: _toString,
	toNumber: toNumber,
	makeMap: makeMap,
	isBuiltInTag: isBuiltInTag,
	remove: remove$1,
	hasOwn: hasOwn,
	isPrimitive: isPrimitive,
	cached: cached,
	camelize: camelize,
	capitalize: capitalize,
	hyphenate: hyphenate,
	bind: bind$1,
	toArray: toArray,
	extend: extend,
	isObject: isObject,
	isPlainObject: isPlainObject,
	toObject: toObject,
	noop: noop,
	no: no,
	genStaticKeys: genStaticKeys,
	looseEqual: looseEqual,
	looseIndexOf: looseIndexOf,
	isReserved: isReserved,
	def: def,
	parsePath: parsePath,
	hasProto: hasProto,
	inBrowser: inBrowser,
	UA: UA,
	isIE: isIE,
	isIE9: isIE9,
	isEdge: isEdge,
	isAndroid: isAndroid,
	isIOS: isIOS,
	isServerRendering: isServerRendering,
	devtools: devtools,
	nextTick: nextTick,
	get _Set () { return _Set; },
	mergeOptions: mergeOptions,
	resolveAsset: resolveAsset,
	get warn () { return warn; },
	get formatComponentName () { return formatComponentName; },
	validateProp: validateProp
});

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      "referenced during render. Make sure to declare reactive data " +
      "properties in the data option.",
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */


var queue = [];
var has$1 = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  queue.length = 0;
  has$1 = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    var watcher = queue[index];
    var id = watcher.id;
    has$1[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has$1[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > config._maxUpdateCount) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }

  resetSchedulerState();
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has$1[id] == null) {
    has$1[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i >= 0 && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(Math.max(i, index) + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  if ( options === void 0 ) options = {};

  this.vm = vm;
  vm._watchers.push(this);
  // options
  this.deep = !!options.deep;
  this.user = !!options.user;
  this.lazy = !!options.lazy;
  this.sync = !!options.sync;
  this.expression = expOrFn.toString();
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value = this.getter.call(this.vm, this.vm);
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  popTarget();
  this.cleanupDeps();
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
      if (
        value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          /* istanbul ignore else */
          if (config.errorHandler) {
            config.errorHandler.call(null, e, this.vm);
          } else {
            process.env.NODE_ENV !== 'production' && warn(
              ("Error in watcher \"" + (this.expression) + "\""),
              this.vm
            );
            throw e
          }
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed or is performing a v-for
    // re-render (the watcher list is then filtered by v-for).
    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
      remove$1(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

function initState (vm) {
  vm._watchers = [];
  initProps(vm);
  initMethods(vm);
  initData(vm);
  initComputed(vm);
  initWatch(vm);
}

var isReservedProp = { key: 1, ref: 1, slot: 1 };

function initProps (vm) {
  var props = vm.$options.props;
  if (props) {
    var propsData = vm.$options.propsData || {};
    var keys = vm.$options._propKeys = Object.keys(props);
    var isRoot = !vm.$parent;
    // root instance props should be converted
    observerState.shouldConvert = isRoot;
    var loop = function ( i ) {
      var key = keys[i];
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        if (isReservedProp[key]) {
          warn(
            ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
            vm
          );
        }
        defineReactive$$1(vm, key, validateProp(key, props, propsData, vm), function () {
          if (vm.$parent && !observerState.isSettingProps) {
            warn(
              "Avoid mutating a prop directly since the value will be " +
              "overwritten whenever the parent component re-renders. " +
              "Instead, use a data or computed property based on the prop's " +
              "value. Prop being mutated: \"" + key + "\"",
              vm
            );
          }
        });
      } else {
        defineReactive$$1(vm, key, validateProp(key, props, propsData, vm));
      }
    };

    for (var i = 0; i < keys.length; i++) loop( i );
    observerState.shouldConvert = true;
  }
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? data.call(vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object.',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var i = keys.length;
  while (i--) {
    if (props && hasOwn(props, keys[i])) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else {
      proxy(vm, keys[i]);
    }
  }
  // observe data
  observe(data);
  data.__ob__ && data.__ob__.vmCount++;
}

var computedSharedDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function initComputed (vm) {
  var computed = vm.$options.computed;
  if (computed) {
    for (var key in computed) {
      var userDef = computed[key];
      if (typeof userDef === 'function') {
        computedSharedDefinition.get = makeComputedGetter(userDef, vm);
        computedSharedDefinition.set = noop;
      } else {
        computedSharedDefinition.get = userDef.get
          ? userDef.cache !== false
            ? makeComputedGetter(userDef.get, vm)
            : bind$1(userDef.get, vm)
          : noop;
        computedSharedDefinition.set = userDef.set
          ? bind$1(userDef.set, vm)
          : noop;
      }
      Object.defineProperty(vm, key, computedSharedDefinition);
    }
  }
}

function makeComputedGetter (getter, owner) {
  var watcher = new Watcher(owner, getter, noop, {
    lazy: true
  });
  return function computedGetter () {
    if (watcher.dirty) {
      watcher.evaluate();
    }
    if (Dep.target) {
      watcher.depend();
    }
    return watcher.value
  }
}

function initMethods (vm) {
  var methods = vm.$options.methods;
  if (methods) {
    for (var key in methods) {
      vm[key] = methods[key] == null ? noop : bind$1(methods[key], vm);
      if (process.env.NODE_ENV !== 'production' && methods[key] == null) {
        warn(
          "method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
    }
  }
}

function initWatch (vm) {
  var watch = vm.$options.watch;
  if (watch) {
    for (var key in watch) {
      var handler = watch[key];
      if (Array.isArray(handler)) {
        for (var i = 0; i < handler.length; i++) {
          createWatcher(vm, key, handler[i]);
        }
      } else {
        createWatcher(vm, key, handler);
      }
    }
  }
}

function createWatcher (vm, key, handler) {
  var options;
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  vm.$watch(key, handler, options);
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () {
    return this._data
  };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);

  Vue.prototype.$set = set$1;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

function proxy (vm, key) {
  if (!isReserved(key)) {
    Object.defineProperty(vm, key, {
      configurable: true,
      enumerable: true,
      get: function proxyGetter () {
        return vm._data[key]
      },
      set: function proxySetter (val) {
        vm._data[key] = val;
      }
    });
  }
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  ns,
  context,
  componentOptions
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = ns;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.child = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
};

var emptyVNode = function () {
  var node = new VNode();
  node.text = '';
  node.isComment = true;
  return node
};

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.ns,
    vnode.context,
    vnode.componentOptions
  );
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var res = new Array(vnodes.length);
  for (var i = 0; i < vnodes.length; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

function mergeVNodeHook (def, hookKey, hook, key) {
  key = key + hookKey;
  var injectedHash = def.__injected || (def.__injected = {});
  if (!injectedHash[key]) {
    injectedHash[key] = true;
    var oldHook = def[hookKey];
    if (oldHook) {
      def[hookKey] = function () {
        oldHook.apply(this, arguments);
        hook.apply(this, arguments);
      };
    } else {
      def[hookKey] = hook;
    }
  }
}

/*  */

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, fn, event, capture, once;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    if (!cur) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + name + "\": got " + String(cur),
        vm
      );
    } else if (!old) {
      once = name.charAt(0) === '~'; // Prefixed last, checked first
      event = once ? name.slice(1) : name;
      capture = event.charAt(0) === '!';
      event = capture ? event.slice(1) : event;
      if (Array.isArray(cur)) {
        add(event, (cur.invoker = arrInvoker(cur)), once, capture);
      } else {
        if (!cur.invoker) {
          fn = cur;
          cur = on[name] = {};
          cur.fn = fn;
          cur.invoker = fnInvoker(cur);
        }
        add(event, cur.invoker, once, capture);
      }
    } else if (cur !== old) {
      if (Array.isArray(old)) {
        old.length = cur.length;
        for (var i = 0; i < old.length; i++) { old[i] = cur[i]; }
        on[name] = old;
      } else {
        old.fn = cur;
        on[name] = old;
      }
    }
  }
  for (name in oldOn) {
    if (!on[name]) {
      once = name.charAt(0) === '~'; // Prefixed last, checked first
      event = once ? name.slice(1) : name;
      capture = event.charAt(0) === '!';
      event = capture ? event.slice(1) : event;
      remove$$1(event, oldOn[name].invoker, capture);
    }
  }
}

function arrInvoker (arr) {
  return function (ev) {
    var arguments$1 = arguments;

    var single = arguments.length === 1;
    for (var i = 0; i < arr.length; i++) {
      single ? arr[i](ev) : arr[i].apply(null, arguments$1);
    }
  }
}

function fnInvoker (o) {
  return function (ev) {
    var single = arguments.length === 1;
    single ? o.fn(ev) : o.fn.apply(null, arguments);
  }
}

/*  */

function normalizeChildren (
  children,
  ns,
  nestedIndex
) {
  if (isPrimitive(children)) {
    return [createTextVNode(children)]
  }
  if (Array.isArray(children)) {
    var res = [];
    for (var i = 0, l = children.length; i < l; i++) {
      var c = children[i];
      var last = res[res.length - 1];
      //  nested
      if (Array.isArray(c)) {
        res.push.apply(res, normalizeChildren(c, ns, ((nestedIndex || '') + "_" + i)));
      } else if (isPrimitive(c)) {
        if (last && last.text) {
          last.text += String(c);
        } else if (c !== '') {
          // convert primitive to vnode
          res.push(createTextVNode(c));
        }
      } else if (c instanceof VNode) {
        if (c.text && last && last.text) {
          if (!last.isCloned) {
            last.text += c.text;
          }
        } else {
          // inherit parent namespace
          if (ns) {
            applyNS(c, ns);
          }
          // default key for nested array children (likely generated by v-for)
          if (c.tag && c.key == null && nestedIndex != null) {
            c.key = "__vlist" + nestedIndex + "_" + i + "__";
          }
          res.push(c);
        }
      }
    }
    return res
  }
}

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

function applyNS (vnode, ns) {
  if (vnode.tag && !vnode.ns) {
    vnode.ns = ns;
    if (vnode.children) {
      for (var i = 0, l = vnode.children.length; i < l; i++) {
        applyNS(vnode.children[i], ns);
      }
    }
  }
}

/*  */

function getFirstComponentChild (children) {
  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
}

/*  */

var activeInstance = null;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._mount = function (
    el,
    hydrating
  ) {
    var vm = this;
    vm.$el = el;
    if (!vm.$options.render) {
      vm.$options.render = emptyVNode;
      if (process.env.NODE_ENV !== 'production') {
        /* istanbul ignore if */
        if (vm.$options.template && vm.$options.template.charAt(0) !== '#') {
          warn(
            'You are using the runtime-only build of Vue where the template ' +
            'option is not available. Either pre-compile the templates into ' +
            'render functions, or use the compiler-included build.',
            vm
          );
        } else {
          warn(
            'Failed to mount component: template or render function not defined.',
            vm
          );
        }
      }
    }
    callHook(vm, 'beforeMount');
    vm._watcher = new Watcher(vm, function () {
      vm._update(vm._render(), hydrating);
    }, noop);
    hydrating = false;
    // manually mounted instance, call mounted on self
    // mounted is called for render-created child components in its inserted hook
    if (vm.$vnode == null) {
      vm._isMounted = true;
      callHook(vm, 'mounted');
    }
    return vm
  };

  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    if (vm._isMounted) {
      callHook(vm, 'updated');
    }
  };

  Vue.prototype._updateFromParent = function (
    propsData,
    listeners,
    parentVnode,
    renderChildren
  ) {
    var vm = this;
    var hasChildren = !!(vm.$options._renderChildren || renderChildren);
    vm.$options._parentVnode = parentVnode;
    vm.$vnode = parentVnode; // update vm's placeholder node without re-render
    if (vm._vnode) { // update child tree's parent
      vm._vnode.parent = parentVnode;
    }
    vm.$options._renderChildren = renderChildren;
    // update props
    if (propsData && vm.$options.props) {
      observerState.shouldConvert = false;
      if (process.env.NODE_ENV !== 'production') {
        observerState.isSettingProps = true;
      }
      var propKeys = vm.$options._propKeys || [];
      for (var i = 0; i < propKeys.length; i++) {
        var key = propKeys[i];
        vm[key] = validateProp(key, vm.$options.props, propsData, vm);
      }
      observerState.shouldConvert = true;
      if (process.env.NODE_ENV !== 'production') {
        observerState.isSettingProps = false;
      }
      vm.$options.propsData = propsData;
    }
    // update listeners
    if (listeners) {
      var oldListeners = vm.$options._parentListeners;
      vm.$options._parentListeners = listeners;
      vm._updateListeners(listeners, oldListeners);
    }
    // resolve slots + force update if has children
    if (hasChildren) {
      vm.$slots = resolveSlots(renderChildren, parentVnode.context);
      vm.$forceUpdate();
    }
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove$1(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
  };
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      handlers[i].call(vm);
    }
  }
  vm.$emit('hook:' + hook);
}

/*  */

var hooks = { init: init, prepatch: prepatch, insert: insert, destroy: destroy$1 };
var hooksToMerge = Object.keys(hooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (!Ctor) {
    return
  }

  var baseCtor = context.$options._base;
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  if (!Ctor.cid) {
    if (Ctor.resolved) {
      Ctor = Ctor.resolved;
    } else {
      Ctor = resolveAsyncComponent(Ctor, baseCtor, function () {
        // it's ok to queue this on every render because
        // $forceUpdate is buffered by the scheduler.
        context.$forceUpdate();
      });
      if (!Ctor) {
        // return nothing if this is indeed an async component
        // wait for the callback to trigger parent update.
        return
      }
    }
  }

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  data = data || {};

  // extract props
  var propsData = extractProps(data, Ctor);

  // functional component
  if (Ctor.options.functional) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  data.on = data.nativeOn;

  if (Ctor.options.abstract) {
    // abstract components do not keep anything
    // other than props & listeners
    data = {};
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
  );
  return vnode
}

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (propOptions) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData);
    }
  }
  var vnode = Ctor.options.render.call(
    null,
    // ensure the createElement function in functional components
    // gets a unique context - this is necessary for correct named slot check
    bind$1(createElement, { _self: Object.create(context) }),
    {
      props: props,
      data: data,
      parent: context,
      children: normalizeChildren(children),
      slots: function () { return resolveSlots(children, context); }
    }
  );
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (inlineTemplate) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function init (
  vnode,
  hydrating,
  parentElm,
  refElm
) {
  if (!vnode.child || vnode.child._isDestroyed) {
    var child = vnode.child = createComponentInstanceForVnode(
      vnode,
      activeInstance,
      parentElm,
      refElm
    );
    child.$mount(hydrating ? vnode.elm : undefined, hydrating);
  } else if (vnode.data.keepAlive) {
    // kept-alive components, treat as a patch
    var mountedNode = vnode; // work around flow
    prepatch(mountedNode, mountedNode);
  }
}

function prepatch (
  oldVnode,
  vnode
) {
  var options = vnode.componentOptions;
  var child = vnode.child = oldVnode.child;
  child._updateFromParent(
    options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
  );
}

function insert (vnode) {
  if (!vnode.child._isMounted) {
    vnode.child._isMounted = true;
    callHook(vnode.child, 'mounted');
  }
  if (vnode.data.keepAlive) {
    vnode.child._inactive = false;
    callHook(vnode.child, 'activated');
  }
}

function destroy$1 (vnode) {
  if (!vnode.child._isDestroyed) {
    if (!vnode.data.keepAlive) {
      vnode.child.$destroy();
    } else {
      vnode.child._inactive = true;
      callHook(vnode.child, 'deactivated');
    }
  }
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  cb
) {
  if (factory.requested) {
    // pool callbacks
    factory.pendingCallbacks.push(cb);
  } else {
    factory.requested = true;
    var cbs = factory.pendingCallbacks = [cb];
    var sync = true;

    var resolve = function (res) {
      if (isObject(res)) {
        res = baseCtor.extend(res);
      }
      // cache resolved
      factory.resolved = res;
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        for (var i = 0, l = cbs.length; i < l; i++) {
          cbs[i](res);
        }
      }
    };

    var reject = function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
    };

    var res = factory(resolve, reject);

    // handle promise
    if (res && typeof res.then === 'function' && !factory.resolved) {
      res.then(resolve, reject);
    }

    sync = false;
    // return in case resolved synchronously
    return factory.resolved
  }
}

function extractProps (data, Ctor) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (!propOptions) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  var domProps = data.domProps;
  if (attrs || props || domProps) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey) ||
      checkProp(res, domProps, key, altKey);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (hash) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = hooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

/*  */

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  tag,
  data,
  children
) {
  if (data && (Array.isArray(data) || typeof data !== 'object')) {
    children = data;
    data = undefined;
  }
  // make sure to use real instance instead of proxy as context
  return _createElement(this._self, tag, data, children)
}

function _createElement (
  context,
  tag,
  data,
  children
) {
  if (data && data.__ob__) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return emptyVNode()
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
      typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (typeof tag === 'string') {
    var Ctor;
    var ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      return new VNode(
        tag, data, normalizeChildren(children, ns),
        undefined, undefined, ns, context
      )
    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      return createComponent(Ctor, data, context, children, tag)
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      var childNs = tag === 'foreignObject' ? 'xhtml' : ns;
      return new VNode(
        tag, data, normalizeChildren(children, childNs),
        undefined, undefined, ns, context
      )
    }
  } else {
    // direct component options / constructor
    return createComponent(tag, data, context, children)
  }
}

/*  */

function initRender (vm) {
  vm.$vnode = null; // the placeholder node in parent tree
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$options._parentVnode;
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = {};
  // bind the public createElement fn to this instance
  // so that we get proper render context inside it.
  vm.$createElement = bind$1(createElement, vm);
  if (vm.$options.el) {
    vm.$mount(vm.$options.el);
  }
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    if (_parentVnode && _parentVnode.data.scopedSlots) {
      vm.$scopedSlots = _parentVnode.data.scopedSlots;
    }

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      /* istanbul ignore else */
      if (config.errorHandler) {
        config.errorHandler.call(null, e, vm);
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn(("Error when rendering " + (formatComponentName(vm)) + ":"));
        }
        throw e
      }
      // return previous vnode to prevent render error causing blank component
      vnode = vm._vnode;
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = emptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // shorthands used in render functions
  Vue.prototype._h = createElement;
  // toString for mustaches
  Vue.prototype._s = _toString;
  // number conversion
  Vue.prototype._n = toNumber;
  // empty vnode
  Vue.prototype._e = emptyVNode;
  // loose equal
  Vue.prototype._q = looseEqual;
  // loose indexOf
  Vue.prototype._i = looseIndexOf;

  // render static tree by index
  Vue.prototype._m = function renderStatic (
    index,
    isInFor
  ) {
    var tree = this._staticTrees[index];
    // if has already-rendered static tree and not inside v-for,
    // we can reuse the same tree by doing a shallow clone.
    if (tree && !isInFor) {
      return Array.isArray(tree)
        ? cloneVNodes(tree)
        : cloneVNode(tree)
    }
    // otherwise, render a fresh tree.
    tree = this._staticTrees[index] = this.$options.staticRenderFns[index].call(this._renderProxy);
    markStatic(tree, ("__static__" + index), false);
    return tree
  };

  // mark node as static (v-once)
  Vue.prototype._o = function markOnce (
    tree,
    index,
    key
  ) {
    markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
    return tree
  };

  function markStatic (tree, key, isOnce) {
    if (Array.isArray(tree)) {
      for (var i = 0; i < tree.length; i++) {
        if (tree[i] && typeof tree[i] !== 'string') {
          markStaticNode(tree[i], (key + "_" + i), isOnce);
        }
      }
    } else {
      markStaticNode(tree, key, isOnce);
    }
  }

  function markStaticNode (node, key, isOnce) {
    node.isStatic = true;
    node.key = key;
    node.isOnce = isOnce;
  }

  // filter resolution helper
  var identity = function (_) { return _; };
  Vue.prototype._f = function resolveFilter (id) {
    return resolveAsset(this.$options, 'filters', id, true) || identity
  };

  // render v-for
  Vue.prototype._l = function renderList (
    val,
    render
  ) {
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = render(val[i], i);
      }
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0; i < val; i++) {
        ret[i] = render(i + 1, i);
      }
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
    return ret
  };

  // renderSlot
  Vue.prototype._t = function (
    name,
    fallback,
    props
  ) {
    var scopedSlotFn = this.$scopedSlots[name];
    if (scopedSlotFn) { // scoped slot
      return scopedSlotFn(props || {}) || fallback
    } else {
      var slotNodes = this.$slots[name];
      // warn duplicate slot usage
      if (slotNodes && process.env.NODE_ENV !== 'production') {
        slotNodes._rendered && warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
        slotNodes._rendered = true;
      }
      return slotNodes || fallback
    }
  };

  // apply v-bind object
  Vue.prototype._b = function bindProps (
    data,
    tag,
    value,
    asProp
  ) {
    if (value) {
      if (!isObject(value)) {
        process.env.NODE_ENV !== 'production' && warn(
          'v-bind without argument expects an Object or Array value',
          this
        );
      } else {
        if (Array.isArray(value)) {
          value = toObject(value);
        }
        for (var key in value) {
          if (key === 'class' || key === 'style') {
            data[key] = value[key];
          } else {
            var hash = asProp || config.mustUseProp(tag, key)
              ? data.domProps || (data.domProps = {})
              : data.attrs || (data.attrs = {});
            hash[key] = value[key];
          }
        }
      }
    }
    return data
  };

  // check v-on keyCodes
  Vue.prototype._k = function checkKeyCodes (
    eventKeyCode,
    key,
    builtInAlias
  ) {
    var keyCodes = config.keyCodes[key] || builtInAlias;
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1
    } else {
      return keyCodes !== eventKeyCode
    }
  };
}

function resolveSlots (
  renderChildren,
  context
) {
  var slots = {};
  if (!renderChildren) {
    return slots
  }
  var children = normalizeChildren(renderChildren) || [];
  var defaultSlot = [];
  var name, child;
  for (var i = 0, l = children.length; i < l; i++) {
    child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
        child.data && (name = child.data.slot)) {
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore single whitespace
  if (defaultSlot.length && !(
    defaultSlot.length === 1 &&
    (defaultSlot[0].text === ' ' || defaultSlot[0].isComment)
  )) {
    slots.default = defaultSlot;
  }
  return slots
}

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  var add = function (event, fn, once) {
    once ? vm.$once(event, fn) : vm.$on(event, fn);
  };
  var remove$$1 = bind$1(vm.$off, vm);
  vm._updateListeners = function (listeners, oldListeners) {
    updateListeners(listeners, oldListeners || {}, add, remove$$1, vm);
  };
  if (listeners) {
    vm._updateListeners(listeners);
  }
}

function eventsMixin (Vue) {
  Vue.prototype.$on = function (event, fn) {
    var vm = this;(vm._events[event] || (vm._events[event] = [])).push(fn);
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args);
      }
    }
    return vm
  };
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;
    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    callHook(vm, 'beforeCreate');
    initState(vm);
    callHook(vm, 'created');
    initRender(vm);
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = Ctor.super.options;
    var cachedSuperOptions = Ctor.superOptions;
    var extendOptions = Ctor.extendOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed
      Ctor.superOptions = superOptions;
      extendOptions.render = options.render;
      extendOptions.staticRenderFns = options.staticRenderFns;
      extendOptions._scopeId = options._scopeId;
      options = Ctor.options = mergeOptions(superOptions, extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function Vue$2 (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue$2)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$2);
stateMixin(Vue$2);
eventsMixin(Vue$2);
lifecycleMixin(Vue$2);
renderMixin(Vue$2);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else {
      plugin.apply(null, args);
    }
    plugin.installed = true;
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }
    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production') {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characaters and the hyphen.'
        );
      }
    }
    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;
    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;
    // create asset registers, so extended classes
    // can have their private assets too.
    config._assetTypes.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }
    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  config._assetTypes.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp];

function matches (pattern, name) {
  if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else {
    return pattern.test(name)
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes
  },
  created: function created () {
    this.cache = Object.create(null);
  },
  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    if (vnode && vnode.componentOptions) {
      var opts = vnode.componentOptions;
      // check pattern
      var name = opts.Ctor.options.name || opts.tag;
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? opts.Ctor.cid + (opts.tag ? ("::" + (opts.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.child = this.cache[key].child;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  },
  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this.cache) {
      var vnode = this$1.cache[key];
      callHook(vnode.child, 'deactivated');
      vnode.child.$destroy();
    }
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);
  Vue.util = util;
  Vue.set = set$1;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  config._assetTypes.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$2);

Object.defineProperty(Vue$2.prototype, '$isServer', {
  get: isServerRendering
});

Vue$2.version = '2.1.4';

/*  */

// attributes that should be using props for binding
var mustUseProp = function (tag, attr) {
  return (
    (attr === 'value' && (tag === 'input' || tag === 'textarea' || tag === 'option')) ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (childNode.child) {
    childNode = childNode.child._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return genClassFromData(data)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: child.class
      ? [child.class, parent.class]
      : parent.class
  }
}

function genClassFromData (data) {
  var dynamicClass = data.class;
  var staticClass = data.staticClass;
  if (staticClass || dynamicClass) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  var res = '';
  if (!value) {
    return res
  }
  if (typeof value === 'string') {
    return value
  }
  if (Array.isArray(value)) {
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (value[i]) {
        if ((stringified = stringifyClass(value[i]))) {
          res += stringified + ' ';
        }
      }
    }
    return res.slice(0, -1)
  }
  if (isObject(value)) {
    for (var key in value) {
      if (value[key]) { res += key + ' '; }
    }
    return res.slice(0, -1)
  }
  /* istanbul ignore next */
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML',
  xhtml: 'http://www.w3.org/1999/xhtml'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font,' +
  'font-face,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);



var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selector = el;
    el = document.querySelector(el);
    if (!el) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + selector
      );
      return document.createElement('div')
    }
  }
  return el
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  if (vnode.data && vnode.data.attrs && 'multiple' in vnode.data.attrs) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function childNodes (node) {
  return node.childNodes
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	childNodes: childNodes,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.child || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove$1(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
        refs[key].push(ref);
      } else {
        refs[key] = [ref];
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks$1 = ['create', 'activate', 'update', 'remove', 'destroy'];

function isUndef (s) {
  return s == null
}

function isDef (s) {
  return s != null
}

function sameVnode (vnode1, vnode2) {
  return (
    vnode1.key === vnode2.key &&
    vnode1.tag === vnode2.tag &&
    vnode1.isComment === vnode2.isComment &&
    !vnode1.data === !vnode2.data
  )
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks$1.length; ++i) {
    cbs[hooks$1[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (modules[j][hooks$1[i]] !== undefined) { cbs[hooks$1[i]].push(modules[j][hooks$1[i]]); }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeElement(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeElement (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html
    if (parent) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(config.ignoredElements && config.ignoredElements.indexOf(tag) > -1) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (vnode.isComment) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.child) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.child)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isReactivated) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.child) {
      innerNode = innerNode.child._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref) {
    if (parent) {
      nodeOps.insertBefore(parent, elm, ref);
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.child) {
      vnode = vnode.child._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (i.create) { i.create(emptyNode, vnode); }
      if (i.insert) { insertedVnodeQueue.push(vnode); }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (vnode.data.pendingInsert) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
    }
    vnode.elm = vnode.child.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.context) && isDef(i = i.$options._scopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
    if (isDef(i = activeInstance) &&
        i !== vnode.context &&
        isDef(i = i.$options._scopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          nodeOps.removeChild(parentElm, ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (rm || isDef(vnode.data)) {
      var listeners = cbs.remove.length + 1;
      if (!rm) {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      } else {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.child) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeElement(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !elmToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (elmToMove.tag !== newStartVnode.tag) {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }
    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (vnode.isStatic &&
        oldVnode.isStatic &&
        vnode.key === oldVnode.key &&
        (vnode.isCloned || vnode.isOnce)) {
      vnode.elm = oldVnode.elm;
      vnode.child = oldVnode.child;
      return
    }
    var i;
    var data = vnode.data;
    var hasData = isDef(data);
    if (hasData && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (hasData && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (hasData) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (initial && vnode.parent) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.child)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        var childNodes = nodeOps.childNodes(elm);
        // empty element, allow client to pick up and populate children
        if (!childNodes.length) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          if (childNodes.length !== children.length) {
            childrenMatch = false;
          } else {
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!hydrate(childNodes[i$1], children[i$1], insertedVnodeQueue)) {
                childrenMatch = false;
                break
              }
            }
          }
          if (!childrenMatch) {
            if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !bailed) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        invokeCreateHooks(vnode, insertedVnodeQueue);
      }
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (vnode.tag) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === nodeOps.tagName(node).toLowerCase()
      )
    } else {
      return _toString(vnode.text) === node.data
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (!vnode) {
      if (oldVnode) { invokeDestroyHook(oldVnode); }
      return
    }

    var elm, parent;
    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (!oldVnode) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
            oldVnode.removeAttribute('server-rendered');
            hydrating = true;
          }
          if (hydrating) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        elm = oldVnode.elm;
        parent = nodeOps.parentNode(elm);
        createElm(vnode, insertedVnodeQueue, parent, nodeOps.nextSibling(elm));

        if (vnode.parent) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (parent !== null) {
          removeVnodes(parent, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (
  oldVnode,
  vnode
) {
  if (!oldVnode.data.directives && !vnode.data.directives) {
    return
  }
  var isCreate = oldVnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      dirsWithInsert.forEach(function (dir) {
        callHook$1(dir, 'inserted', vnode, oldVnode);
      });
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert, 'dir-insert');
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      dirsWithPostpatch.forEach(function (dir) {
        callHook$1(dir, 'componentUpdated', vnode, oldVnode);
      });
    }, 'dir-postpatch');
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    fn(vnode.elm, dir, vnode, oldVnode);
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  if (!oldVnode.data.attrs && !vnode.data.attrs) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (attrs.__ob__) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  for (key in oldAttrs) {
    if (attrs[key] == null) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, key);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (!data.staticClass && !data.class &&
      (!oldData || (!oldData.staticClass && !oldData.class))) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (transitionClass) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

// skip type checking this file because we need to attach private properties
// to elements

function updateDOMListeners (oldVnode, vnode) {
  if (!oldVnode.data.on && !vnode.data.on) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  var add = vnode.elm._v_add || (
    vnode.elm._v_add = function (event, handler, once, capture) {
      if (once) {
        var oldHandler = handler;
        handler = function (ev) {
          remove(event, handler, capture);
          arguments.length === 1
            ? oldHandler(ev)
            : oldHandler.apply(null, arguments);
        };
      }
      vnode.elm.addEventListener(event, handler, capture);
    }
  );
  var remove = vnode.elm._v_remove || (
    vnode.elm._v_remove = function (event, handler, capture) {
      vnode.elm.removeEventListener(event, handler, capture);
    }
  );
  updateListeners(on, oldOn, add, remove, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (!oldVnode.data.domProps && !vnode.data.domProps) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (props.__ob__) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (props[key] == null) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
    }
    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = cur == null ? '' : String(cur);
      if (elm.value !== strCur && !elm.composing) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.child) {
      childNode = childNode.child._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    el.style[normalize(name)] = val;
  }
};

var prefixes = ['Webkit', 'Moz', 'ms'];

var testEl;
var normalize = cached(function (prop) {
  testEl = testEl || document.createElement('div');
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in testEl.style)) {
    return prop
  }
  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < prefixes.length; i++) {
    var prefixed = prefixes[i] + upper;
    if (prefixed in testEl.style) {
      return prefixed
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (!data.staticStyle && !data.style &&
      !oldData.staticStyle && !oldData.style) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldVnode.data.staticStyle;
  var oldStyleBinding = oldVnode.data.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  vnode.data.style = style.__ob__ ? extend({}, style) : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (newStyle[name] == null) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !cls.trim()) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = ' ' + el.getAttribute('class') + ' ';
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !cls.trim()) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
  } else {
    var cur = ' ' + el.getAttribute('class') + ' ';
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    el.setAttribute('class', cur.trim());
  }
}

/*  */

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

var raf = (inBrowser && window.requestAnimationFrame) || setTimeout;
function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
  addClass(el, cls);
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove$1(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitioneDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitioneDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode) {
  var el = vnode.elm;

  // call leave callback now
  if (el._leaveCb) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (!data) {
    return
  }

  /* istanbul ignore if */
  if (el._enterCb || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear ? appearClass : enterClass;
  var activeClass = isAppear ? appearActiveClass : enterActiveClass;
  var beforeEnterHook = isAppear ? (beforeAppear || beforeEnter) : beforeEnter;
  var enterHook = isAppear ? (typeof appear === 'function' ? appear : enter) : enter;
  var afterEnterHook = isAppear ? (afterAppear || afterEnter) : afterEnter;
  var enterCancelledHook = isAppear ? (appearCancelled || enterCancelled) : enterCancelled;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl =
    enterHook &&
    // enterHook may be a bound method which exposes
    // the length of original fn as _length
    (enterHook._length || enterHook.length) > 1;

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
          pendingNode.context === vnode.context &&
          pendingNode.tag === vnode.tag &&
          pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    }, 'transition-insert');
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        whenTransitionEnds(el, type, cb);
      }
    });
  }

  if (vnode.data.show) {
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (el._enterCb) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (!data) {
    return rm()
  }

  /* istanbul ignore if */
  if (el._leaveCb || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl =
    leave &&
    // leave hook may be a bound method which exposes
    // the length of original fn as _length
    (leave._length || leave.length) > 1;

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          whenTransitionEnds(el, type, cb);
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    leaveClass: (name + "-leave"),
    appearClass: (name + "-enter"),
    enterActiveClass: (name + "-enter-active"),
    leaveActiveClass: (name + "-leave-active"),
    appearActiveClass: (name + "-enter-active")
  }
});

function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn();
    }
  }
}

function _enter (_, vnode) {
  if (!vnode.data.show) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove (vnode, rm) {
    /* istanbul ignore else */
    if (!vnode.data.show) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch$1 = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

var modelableTagRE = /^input|select|textarea|vue-component-[0-9]+(-[0-9a-zA-Z_-]*)?$/;

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model = {
  inserted: function inserted (el, binding, vnode) {
    if (process.env.NODE_ENV !== 'production') {
      if (!modelableTagRE.test(vnode.tag)) {
        warn(
          "v-model is not supported on element type: <" + (vnode.tag) + ">. " +
          'If you are working with contenteditable, it\'s recommended to ' +
          'wrap a library dedicated for that purpose inside a custom component.',
          vnode.context
        );
      }
    }
    if (vnode.tag === 'select') {
      var cb = function () {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
    } else if (
      (vnode.tag === 'textarea' || el.type === 'text') &&
      !binding.modifiers.lazy
    ) {
      if (!isAndroid) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
      }
      /* istanbul ignore if */
      if (isIE9) {
        el.vmodel = true;
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var needReset = el.multiple
        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
      if (needReset) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  for (var i = 0, l = options.length; i < l; i++) {
    if (looseEqual(getValue(options[i]), value)) {
      return false
    }
  }
  return true
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.child && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.child._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    if (value && transition && !isIE9) {
      enter(vnode);
    }
    var originalDisplay = el.style.display === 'none' ? '' : el.style.display;
    el.style.display = value ? originalDisplay : 'none';
    el.__vOriginalDisplay = originalDisplay;
  },
  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    if (transition && !isIE9) {
      if (value) {
        enter(vnode);
        el.style.display = el.__vOriginalDisplay;
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  }
};

var platformDirectives = {
  model: model,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1].fn;
  }
  return data
}

function placeholder (h, rawChild) {
  return /\d-keep-alive$/.test(rawChild.tag)
    ? h('keep-alive')
    : null
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,
  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag; });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
        mode && mode !== 'in-out' && mode !== 'out-in') {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    var key = child.key = child.key == null || child.isStatic
      ? ("__v" + (child.tag + this._uid) + "__")
      : child.key;
    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && oldChild.key !== key) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);

      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        }, key);
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave, key);
        mergeVNodeHook(data, 'enterCancelled', performLeave, key);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        }, key);
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final disired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts
            ? (opts.Ctor.options.name || opts.tag)
            : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var f = document.body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      if (this._hasMove != null) {
        return this._hasMove
      }
      addTransitionClass(el, moveClass);
      var info = getTransitionInfo(el);
      removeTransitionClass(el, moveClass);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$2.config.isUnknownElement = isUnknownElement;
Vue$2.config.isReservedTag = isReservedTag;
Vue$2.config.getTagNamespace = getTagNamespace;
Vue$2.config.mustUseProp = mustUseProp;

// install platform runtime directives & components
extend(Vue$2.options.directives, platformDirectives);
extend(Vue$2.options.components, platformComponents);

// install platform patch function
Vue$2.prototype.__patch__ = inBrowser ? patch$1 : noop;

// wrap mount
Vue$2.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return this._mount(el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$2);
    } else if (
      process.env.NODE_ENV !== 'production' &&
      inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)
    ) {
      console.log(
        'Download the Vue Devtools for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
}, 0);

module.exports = Vue$2;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20), __webpack_require__(40)))

/***/ },
/* 40 */
/***/ function(module, exports) {

var g;

// This works in non-strict mode
g = (function() { return this; })();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }
/******/ ]);
//# sourceMappingURL=build.js.map