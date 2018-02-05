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
/******/ 	return __webpack_require__(__webpack_require__.s = 50);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
        CURRENT_CUSTOMIZATION_TAB: 'current_c_tab',
        SUBTLE_USER: 'subtle_user'
    },
    SYNC: ['shared-data', 'bg-seen-nature', 'bg-seen-night', 'bg-seen-travel', 'bg-seen-building', 'current-page', 'nature', 'travel', 'building', 'night', 'notes_meta', 'notes-', 'bg-custom', 'bg-seen-custom', 'misc_settings', 'subtle_user'],
    URL: {
        WHATS_NEW: BASE_API + 'whatsnew'
    }
};

/* harmony default export */ exports["a"] = constants;

/***/ },
/* 1 */
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

    },
    customBackgrounds: ['https://subtletab.com/extras/1.jpg', 'https://subtletab.com/extras/2.jpg', 'https://subtletab.com/extras/3.jpg', 'https://subtletab.com/extras/4.jpg', 'https://subtletab.com/extras/5.jpg', 'https://subtletab.com/extras/6.jpg', 'https://subtletab.com/extras/7.jpg', 'https://subtletab.com/extras/7.jpg', 'https://subtletab.com/extras/8.jpg']
};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return generateId; });
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
var generateId = function generateId() {
    return 'xxxxxxxx-xxxx-Sxxx-Uxxx-xxxxxxxxxxxx\n'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
};

/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(7).nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).setImmediate, __webpack_require__(5).clearImmediate))

/***/ },
/* 6 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
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

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ },
/* 7 */
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
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_analytics__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_analytics___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_analytics__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_vue__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__app_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_common_js__ = __webpack_require__(3);




var USER = 'subtle_user';

var gaFields = {
    'storeGac': false,
    'storage': 'none'
};

if (localStorage && localStorage[USER]) {
    gaFields.clientId = localStorage[USER];
} else {
    gaFields.clientId = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_common_js__["b" /* generateId */])();
    localStorage.setItem(USER, gaFields.clientId);
}

__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_analytics___default.a, {
    id: 'UA-113476704-1',
    set: [{ field: 'checkProtocolTask', value: function value() {} }],
    config: {
        'cookieDomain': 'none'
    },
    fields: gaFields
});

new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
    el: '#app',
    render: function render(h) {
        return h(__WEBPACK_IMPORTED_MODULE_2__app_vue___default.a);
    }
});

/***/ },
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_config__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_storage__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_common__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_Constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_clock_vue__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_clock_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_clock_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_background_vue__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_background_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_background_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_customize_vue__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_customize_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_customize_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_weather_vue__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_weather_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_weather_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_notes_vue__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_notes_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__components_notes_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_onboarding_vue__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_onboarding_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__components_onboarding_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__utils_backgroundData__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        this.sharedData = __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_3__utils_Constants__["a" /* default */].STORAGE.SHARED_DATA) || __WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* default */].defaultCustomization;
        this.seenOnBoarding = __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_3__utils_Constants__["a" /* default */].STORAGE.SEEN_ONBOARDING) || false;
    },
    data: function data() {
        return {
            sharedData: this.sharedData,
            componentsData: JSON.parse(JSON.stringify(this.sharedData)),
            showCustomizeMenu: false,
            showNotes: false,
            isLoading: true,
            seenOnBoarding: this.seenOnBoarding,
            miscSettings: __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_3__utils_Constants__["a" /* default */].STORAGE.MISC_SETTINGS) || __WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* default */].misc,
            otherSettings: __WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* default */].other
        };
    },
    mounted: function mounted() {
        var _this = this;

        var self = this;
        document.addEventListener('keydown', function (e) {
            if (e.keyCode === 78) {
                self.showNotes = true;
                _this.$ga.event('app', 'keydown', 'notes');
            } else if (e.keyCode === 67) {
                self.showCustomizeMenu = true;
                _this.$ga.event('app', 'keydown', 'customize');
            } else if (e.keyCode === 27) {
                self.closeWindows();
                _this.$ga.event('app', 'keydown', 'closeAll');
            } else if (e.keyCode === 87) {
                self.otherSettings.weather.showWeatherInfo = true;
                _this.$ga.event('app', 'keydown', 'weather');
            }
        });
        this.init();
        this.initAnalytics();
        this.initWhenIdle();
    },

    watch: {
        sharedData: {
            handler: function handler(newValue) {
                __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_3__utils_Constants__["a" /* default */].STORAGE.SHARED_DATA, newValue);
                this.componentsData = newValue;
            },
            deep: true
        },
        miscSettings: {
            handler: function handler(newValue) {
                __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_3__utils_Constants__["a" /* default */].STORAGE.MISC_SETTINGS, newValue);
            },
            deep: true
        }
    },
    methods: {
        toggleCustomizeMenu: function toggleCustomizeMenu() {
            this.showCustomizeMenu = !this.showCustomizeMenu;
            if (!this.miscSettings.update.isSeen) {
                this.miscSettings.update.isSeen = true;
            }
            this.showNotes = false;
            this.otherSettings.weather.showWeatherInfo = false;
        },
        stopLoad: function stopLoad() {
            this.isLoading = false;
        },
        startLoad: function startLoad() {
            this.isLoading = true;
        },
        stopOnBoarding: function stopOnBoarding() {
            this.seenOnBoarding = true;
            __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_3__utils_Constants__["a" /* default */].STORAGE.SEEN_ONBOARDING, this.seenOnBoarding);
            this.$ga.event('app', 'onboarding', 'close');
        },
        closeWindows: function closeWindows() {
            __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].remove(__WEBPACK_IMPORTED_MODULE_3__utils_Constants__["a" /* default */].STORAGE.CURRENT_CUSTOMIZATION_TAB);
            this.showNotes = false;
            this.showCustomizeMenu = false;
            this.otherSettings.weather.showWeatherInfo = false;
        },
        showUpdateNotification: function showUpdateNotification(newVersion) {
            if (!newVersion) {
                return;
            }
            var v = +newVersion.replace(/\./g, '');
            if (+this.miscSettings.update.lastChecked < v) {
                this.miscSettings.update.isSeen = false;
                this.miscSettings.update.lastChecked = v;
                __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_3__utils_Constants__["a" /* default */].STORAGE.CURRENT_CUSTOMIZATION_TAB, 'whatsnew');
            }
        },
        checkForUpdates: function checkForUpdates() {
            var _this2 = this;

            if (!this.miscSettings.update || !this.miscSettings.update.isToBeFetched) {
                return;
            }
            __WEBPACK_IMPORTED_MODULE_2__utils_common__["a" /* default */].http(__WEBPACK_IMPORTED_MODULE_3__utils_Constants__["a" /* default */].URL.WHATS_NEW).then(function (data) {
                _this2.miscSettings.update.isToBeFetched = false;
                __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_3__utils_Constants__["a" /* default */].STORAGE.WHATS_NEW, data.response);
                _this2.showUpdateNotification(data.response[0].version);
            });
        },
        initWhenIdle: function initWhenIdle() {
            var self = this;
            setTimeout(function () {
                self.checkForUpdates();
            }, 0);
        },
        init: function init() {
            // this is done for backgrounds
            var bgCustom = __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_3__utils_Constants__["a" /* default */].STORAGE.BACKGROUND_CUSTOM);
            if (!bgCustom) {
                bgCustom = __WEBPACK_IMPORTED_MODULE_10__utils_backgroundData__["a" /* default */].customBackgrounds;
                __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_3__utils_Constants__["a" /* default */].STORAGE.BACKGROUND_CUSTOM, bgCustom);
            }
        },
        initAnalytics: function initAnalytics() {
            /*const user = storage.get(Constants.STORAGE.SUBTLE_USER);
             if (!user) {
                user.clientId = this.generateId()
                storage.set(Constants.STORAGE.SUBTLE_USER, user);
            }
             if (!user.clientId) {
                this.$ga.query((tracker) => {
                    user.clientId = tracker.get('clientId')
                 })
            }
             this.$ga.set('userId', user.userId);*/

            if (!this.seenOnBoarding) {
                this.$ga.event('app', 'onboarding', 'shown');
            } else {
                this.$ga.page('/app');
            }
        },
        weatherInfoStateChange: function weatherInfoStateChange(state) {
            this.otherSettings.weather.showWeatherInfo = state;
        }
    },
    components: {
        Background: __WEBPACK_IMPORTED_MODULE_5__components_background_vue___default.a,
        Clock: __WEBPACK_IMPORTED_MODULE_4__components_clock_vue___default.a,
        Customize: __WEBPACK_IMPORTED_MODULE_6__components_customize_vue___default.a,
        Weather: __WEBPACK_IMPORTED_MODULE_7__components_weather_vue___default.a,
        Onboarding: __WEBPACK_IMPORTED_MODULE_9__components_onboarding_vue___default.a,
        Notes: __WEBPACK_IMPORTED_MODULE_8__components_notes_vue___default.a
    }
};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    props: ['data', 'settings'],
    data: function data() {
        return {
            getTemp: this.$parent.getTemp,
            getWeatherClass: this.$parent.getWeatherClass
        };
    }
};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_bgUtil__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_backgroundData__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_storage__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_Constants__ = __webpack_require__(0);
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
            themeVal: '',
            backgroundType: this.settings.type || 'predefined'
        };
    },

    props: ['settings'],
    mounted: function mounted() {
        bgElement = document.getElementById('background');
        this.getBg();
    },

    methods: {
        getAllBackgrounds: function getAllBackgrounds(theme) {
            var currentPage = __WEBPACK_IMPORTED_MODULE_2__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_3__utils_Constants__["a" /* default */].STORAGE.CURRENT_PAGE);
            var localBgData = __WEBPACK_IMPORTED_MODULE_2__utils_storage__["a" /* default */].get(theme.value);
            var storedBg = __WEBPACK_IMPORTED_MODULE_1__utils_backgroundData__["a" /* default */].stored[theme.id];
            return currentPage && currentPage[theme.value] && currentPage[theme.value] > 1 && localBgData ? localBgData : Object.assign({}, storedBg, localBgData);
        },
        getBg: function getBg(reset) {
            if (this.settings && this.settings.type !== 'custom') {
                this.getBackground(reset);
            } else {
                this.loadCustomBackground(reset);
            }
            this.backgroundType = this.settings.type;
        },

        getBackground: function getBackground(reset) {
            if (reset && this.themeId === this.settings.themeId && this.backgroundType === this.settings.type) {
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
        loadCustomBackground: function loadCustomBackground(reset) {
            var _this = this;

            // this check is required to make sure to not change custom wallpaper when type is not changed
            if (reset && this.backgroundType === this.settings.type) {
                return;
            }
            var customBackgrounds = __WEBPACK_IMPORTED_MODULE_2__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_3__utils_Constants__["a" /* default */].STORAGE.BACKGROUND_CUSTOM);
            var customSeenBgIndex = __WEBPACK_IMPORTED_MODULE_2__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_3__utils_Constants__["a" /* default */].STORAGE.BACKGROUND_SEEN_CUSTOM);
            // because customSeenBgIndex can be 0 , so strict checking
            customSeenBgIndex = customSeenBgIndex === null ? -1 : customSeenBgIndex;
            this.isLoading();
            this.defaultImageLoaded = false;

            if (!customBackgrounds || customBackgrounds.length < 1) {
                // console.log("no custom backgrounds");
                this.defaultImageLoaded = true;
                bgElement.style.backgroundImage = 'url(' + this.getDefaultBg() + ')';
                this.$emit('stopLoading');
                this.markCustomBgSeen(customSeenBgIndex);
                return;
            }

            // to increment index from stored index value or default value
            if (customSeenBgIndex === customBackgrounds.length - 1) {
                customSeenBgIndex = 0;
            } else {
                customSeenBgIndex++;
            }

            var currentUrl = customBackgrounds[customSeenBgIndex];

            chrome.runtime.sendMessage({
                query: 'loadCurrentCustomBackground',
                url: currentUrl
            }, function (responseURL) {
                if (responseURL) {
                    // console.log("background loaded in time");
                    _this.defaultImageLoaded = false;
                    bgElement.style.backgroundImage = 'url(' + currentUrl + ')';
                    if (customBackgrounds.length > 1) {
                        var nextUrlIndex = customSeenBgIndex === customBackgrounds.length - 1 ? 0 : customSeenBgIndex + 1;
                        var nextUrl = customBackgrounds[nextUrlIndex];
                        chrome.runtime.sendMessage({ query: 'loadNextBackground', url: nextUrl });
                    }
                } else {
                    // console.log("background not loaded in time");
                    _this.defaultImageLoaded = true;
                    bgElement.style.backgroundImage = 'url(' + _this.getDefaultBg() + ')';
                }
                _this.$emit('stopLoading');
                _this.markCustomBgSeen(customSeenBgIndex);
            });
        },
        loadBackground: function loadBackground() {
            var _this2 = this;

            chrome.runtime.sendMessage({ query: 'log', value: 'Load Background Called' });
            this.isLoading();
            this.defaultImageLoaded = false;
            var i = this.bgIndex;
            var currentUrl = __WEBPACK_IMPORTED_MODULE_0__utils_bgUtil__["a" /* default */].formImgURL(this.allBackgrounds[this.bgKeys[i]], this.bgKeys[i]);
            chrome.runtime.sendMessage({ query: 'loadCurrentBackground', url: currentUrl }, function (responseURL) {
                if (responseURL) {
                    _this2.defaultImageLoaded = false;
                    bgElement.style.backgroundImage = 'url(' + currentUrl + ')';
                    chrome.runtime.sendMessage({ query: 'log', value: 'Current URL ' + currentUrl });
                    _this2.$emit('stopLoading');
                    var nextUrl = __WEBPACK_IMPORTED_MODULE_0__utils_bgUtil__["a" /* default */].formImgURL(_this2.allBackgrounds[_this2.bgKeys[i + 1]], _this2.bgKeys[i + 1]);
                    chrome.runtime.sendMessage({ query: 'log', value: 'Next URL ' + nextUrl });
                    chrome.runtime.sendMessage({ query: 'loadNextBackground', url: nextUrl });
                } else {
                    _this2.defaultImageLoaded = true;
                    bgElement.style.backgroundImage = 'url(' + _this2.getDefaultBg() + ')';
                    chrome.runtime.sendMessage({ query: 'log', value: 'Default URL' + _this2.settings.themeId });
                    _this2.$emit('stopLoading');
                }
                _this2.markBgSeen(_this2.bgKeys[i]);
            });
        },
        resetBackgroundTheme: function resetBackgroundTheme() {
            this.getBg(true);
            chrome.runtime.sendMessage({ query: 'setTabsCount', value: 0 });
        },
        isLoading: function isLoading() {
            this.$emit('startLoading');
        },
        markBgSeen: function markBgSeen(id) {
            var _this3 = this;

            chrome.runtime.sendMessage({ query: 'getTabsCount' }, function (tabs) {
                // to prevent change on refresh;
                if (!tabs) {
                    return;
                }
                if (tabs % _this3.settings.changeInterval === 0 && !_this3.defaultImageLoaded) {
                    _this3.bgSeen.push(id);
                    __WEBPACK_IMPORTED_MODULE_2__utils_storage__["a" /* default */].set('bg-seen-' + _this3.themeVal, _this3.bgSeen);
                } else if (_this3.defaultImageLoaded) {
                    chrome.runtime.sendMessage({ query: 'setTabsCount', value: parseInt(tabs) - 1 });
                }
            });
        },
        getDefaultBg: function getDefaultBg() {
            var counter = 0;
            var value = Math.random();
            var themeId = this.settings.themeId;
            counter = value < 0.33 ? 0 : counter = value < 0.66 ? 1 : 2;
            if (this.settings) {
                this.$ga.event('background', 'default', this.settings.type, this.settings.changeInterval);
            }
            chrome.runtime.sendMessage({ query: 'log', value: 'getDefaultBg Called with counter, ' + counter });
            return __WEBPACK_IMPORTED_MODULE_1__utils_backgroundData__["a" /* default */].stored[themeId][1 + (themeId - 1) * 3 + counter];
        },
        markCustomBgSeen: function markCustomBgSeen(index) {
            var _this4 = this;

            chrome.runtime.sendMessage({ query: 'getTabsCount' }, function (tabs) {
                // to prevent change on refresh;
                if (!tabs) {
                    return;
                }
                if (tabs % _this4.settings.changeInterval === 0 && !_this4.defaultImageLoaded) {
                    __WEBPACK_IMPORTED_MODULE_2__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_3__utils_Constants__["a" /* default */].STORAGE.BACKGROUND_SEEN_CUSTOM, index);
                } else if (_this4.defaultImageLoaded) {
                    chrome.runtime.sendMessage({ query: 'setTabsCount', value: parseInt(tabs) - 1 });
                }
            });
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
//
//
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
            if (this.settings.type === 'twelve') {
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
            if (this.settings.type === 'twelve') {
                return this.hrs >= 12 ? 'PM' : 'AM';
            }
        }
    }
};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_backgroundData__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_storage__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_Constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__whatsNew_vue__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__whatsNew_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__whatsNew_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    components: {
        WhatsNew: __WEBPACK_IMPORTED_MODULE_3__whatsNew_vue___default.a
    },
    data: function data() {
        return {
            selectedTheme: this.settings.background.themeId,
            themes: __WEBPACK_IMPORTED_MODULE_0__utils_backgroundData__["a" /* default */].themes,
            version: chrome.runtime.getManifest().version,
            activeTab: __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_2__utils_Constants__["a" /* default */].STORAGE.CURRENT_CUSTOMIZATION_TAB) || 'general',
            customLocation: '',
            currentBgCustom: '',
            isCustomBgSaveMsg: ''
        };
    },
    mounted: function mounted() {
        // this is done for weather
        this.customLocation = this.settings.weather.location.name || __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_2__utils_Constants__["a" /* default */].STORAGE.WEATHER) && __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_2__utils_Constants__["a" /* default */].STORAGE.WEATHER)['city'];
        // this is done for backgrounds
        var bgCustom = __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_2__utils_Constants__["a" /* default */].STORAGE.BACKGROUND_CUSTOM);

        if (bgCustom && Object.prototype.toString.call(bgCustom) === '[object Array]' && bgCustom.length) {
            this.currentBgCustom = bgCustom.join('\n');
        }
        this.$ga.event('customize', 'open');
    },

    methods: {
        isActiveTheme: function isActiveTheme(index) {
            return this.settings.background.themeId === index + 1;
        },
        selectActive: function selectActive(index) {
            this.settings.background.themeId = index + 1;
            this.$ga.event('customize', 'wallpaperCategoryChanged', this.themes[index].lValue);
        },
        closeCustomizeMenu: function closeCustomizeMenu() {
            __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].remove(__WEBPACK_IMPORTED_MODULE_2__utils_Constants__["a" /* default */].STORAGE.CURRENT_CUSTOMIZATION_TAB);
            this.$emit('closeCustomizeMenu');
        },
        updateCustomLocation: function updateCustomLocation() {
            if (this.customLocation !== this.settings.weather.location.name) {
                this.settings.weather.location.name = this.customLocation;
            }
        },
        saveCustomBg: function saveCustomBg() {
            var _this = this;

            var validateImgUrls = function validateImgUrls(backgrounds) {
                for (var i = 0; i < backgrounds.length; i++) {
                    if (backgrounds[i].match(/^(http?|https):\/\/.*(jpeg|png|gif|bmp|jpg)/g) === null) {
                        _this.isCustomBgSaveMsg = '<span class=\'error\'>Wallpapers links are not in correct format.</span>';
                        return false;
                    }
                }
                return true;
            };

            var cleanUrls = function cleanUrls(backgrounds) {
                return backgrounds.reduce(function (filtered, background) {
                    if (typeof background === 'string' && background.length > 5) {
                        filtered.push(background.trim());
                    }
                    return filtered;
                }, []);
            };

            if (this.currentBgCustom) {
                var backgrounds = this.currentBgCustom.split('\n');
                if (backgrounds && backgrounds.length && validateImgUrls(backgrounds)) {
                    backgrounds = cleanUrls(backgrounds);
                    __WEBPACK_IMPORTED_MODULE_1__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_2__utils_Constants__["a" /* default */].STORAGE.BACKGROUND_CUSTOM, backgrounds);
                    this.isCustomBgSaveMsg = '<span class=\'success\'>Wallpapers saved successfully.</span>';
                }
            } else {
                this.isCustomBgSaveMsg = '<span class=\'error\'>Wallpapers not saved</span>';
            }
            setTimeout(function () {
                _this.isCustomBgSaveMsg = '';
            }, 2000);
        },
        onChange: function onChange(changeType) {
            try {
                var value = void 0;
                if (changeType === 'backgroundInterval') {
                    value = this.settings.background && this.settings.background.changeInterval;
                } else if (changeType === 'changeTab') {
                    value = this.activeTab;
                } else if (changeType === 'backgroundType') {
                    value = this.settings.background && this.settings.background.type;
                } else if (changeType === 'weatherLocationType') {
                    value = this.settings.weather.location && this.settings.weather.location.type;
                }
                this.$ga.event('customize', changeType, value);
            } catch (e) {}
        }
    },
    props: ['settings'],
    computed: {}
};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_debounce__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_debounce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_debounce__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_storage__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_Constants__ = __webpack_require__(0);
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
        this.$ga.event('notes', 'open');
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
            this.$ga.event('notes', 'change', 'click');
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
            this.$ga.event('notes', 'delete');
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
            this.$ga.event('notes', 'create');
        },
        createFirstNote: function createFirstNote(e) {
            var self = this;
            this.createNote(e);
            this.showSidebar = true;
            this.$ga.event('notes', 'first');
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
    },
    beforeDestroy: function beforeDestroy() {
        this.$ga.event('notes', 'close');
    }
};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_storage__ = __webpack_require__(1);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_storage__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_weatherUtil__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_Constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_common__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__WeatherInfo_vue__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__WeatherInfo_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__WeatherInfo_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        this.localWeather = __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_2__utils_Constants__["a" /* default */].STORAGE.WEATHER);
    },

    props: ['settings', 'otherSettings'],
    mounted: function mounted() {
        this.checkWeather();
    },
    data: function data() {
        return {
            weatherClass: null,
            weatherCity: null,
            temp: null,
            localWeather: this.localWeather,
            error: null,
            isLoading: false,
            localSettings: Object.assign({}, this.settings)
        };
    },

    methods: {
        toggle: function toggle(prop) {
            if (prop === 'showWeatherInfo') {
                if (!this.otherSettings.weather.showWeatherInfo) {
                    this.$ga.event('weatherInfo', 'open');
                }
                this.otherSettings.weather.showWeatherInfo = !this.otherSettings.weather.showWeatherInfo;
            }
        },
        getTemp: function getTemp(unit, temp) {
            // use for only converting fahrenheit
            if (!unit || !temp) {
                return;
            }
            return unit === "f" ? Math.round(5.0 / 9.0 * (temp - 32.0)) : temp;
        },
        getWeatherClass: function getWeatherClass(code) {
            if (!code) {
                return;
            }
            return __WEBPACK_IMPORTED_MODULE_1__utils_weatherUtil__["a" /* default */][code];
        },
        checkWeather: function checkWeather(forceUpdate) {

            if (!navigator.onLine) {
                this.weatherCity = 'Offline';
                return;
            }

            var now = +new Date();
            var fifteenMin = 900000;

            if (!this.localWeather || forceUpdate) {
                this.prepareWeatherCall();
                return;
            }
            if (this.localWeather) {
                // Check if local weather is not more than an hour old and also
                // checks if local city
                if (now - this.localWeather.updatedOn < fifteenMin) {
                    this.showWeather(this.localWeather);
                    this.isLoading = false;
                } else {
                    this.showWeather(this.localWeather);
                    this.prepareWeatherCall(true);
                }
            }
        },
        getWeather: function getWeather(data) {
            var _this = this;

            if (!this.localWeather) {
                this.isLoading = true;
            }
            chrome.runtime.sendMessage({ query: 'startWeather' });

            var url = 'https://api.subtletab.com/weather';
            if (data.type !== 'custom') {
                url += '?lat=' + data.lat + '&long=' + data.long + '&type=geo';
            } else {
                url += '?location=' + data.location + '&type=custom';
            }

            return __WEBPACK_IMPORTED_MODULE_3__utils_common__["a" /* default */].http(url).then(function (_resp) {
                _this.isLoading = false;
                _this.updateLocalWeather(_resp);
                _this.showWeather(_this.localWeather);
            });
        },
        prepareWeatherCall: function prepareWeatherCall(noLoading) {
            var _this2 = this;

            var options = void 0;
            if (this.settings.location.type !== 'custom') {
                // adding loading because below call takes time
                this.isLoading = !noLoading;
                navigator.geolocation.getCurrentPosition(function (position) {
                    options = {
                        lat: position.coords.latitude,
                        long: position.coords.longitude,
                        type: 'geo'
                    };
                    _this2.getWeather(options);
                }, function (error) {
                    //console.log(error)
                }, {
                    timeout: 10000
                });
            } else {
                if (this.settings.location && this.settings.location.name) {
                    options = {
                        location: this.settings.location.name,
                        type: 'custom'
                    };
                    this.getWeather(options);
                }
            }
        },
        showWeather: function showWeather(weatherObj) {
            var current = weatherObj.current;
            this.temp = this.getTemp(this.settings.unit, current.temp);
            this.weatherClass = this.getWeatherClass(current.code);
            this.weatherCity = current.city;
        },
        updateLocalWeather: function updateLocalWeather(weatherObj) {
            if (!__WEBPACK_IMPORTED_MODULE_3__utils_common__["a" /* default */].isObject(weatherObj) || Object.keys(weatherObj).length === 0) {
                return;
            }
            this.localWeather = weatherObj;
            __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_2__utils_Constants__["a" /* default */].STORAGE.WEATHER, this.localWeather);
        }
    },
    watch: {
        settings: {
            handler: function handler(newValue) {
                if (this.localSettings.unit !== newValue.unit) {
                    this.checkWeather();
                } else if (this.localSettings.location.name !== newValue.location.name || this.localSettings.location.type !== newValue.location.type) {
                    this.checkWeather(true);
                }
                this.localSettings = JSON.parse(JSON.stringify(newValue));
            },
            deep: true
        }
    },
    computed: {
        showWeatherInfo: function showWeatherInfo() {
            return this.otherSettings.weather.showWeatherInfo || false;
        }
    },
    components: {
        WeatherInfo: __WEBPACK_IMPORTED_MODULE_4__WeatherInfo_vue___default.a
    }
};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_storage__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_Constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_common__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            updates: __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.WHATS_NEW),
            isLoading: false
        };
    },
    mounted: function mounted() {
        if (!this.updates) {
            this.getUpdates();
        }
    },

    methods: {
        getUpdates: function getUpdates() {
            var _this = this;

            this.isLoading = true;
            __WEBPACK_IMPORTED_MODULE_2__utils_common__["a" /* default */].http(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].URL.WHATS_NEW).then(function (data) {
                _this.isLoading = false;
                _this.updates = data.response;
                __WEBPACK_IMPORTED_MODULE_0__utils_storage__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* default */].STORAGE.WHATS_NEW, data.response);
            });
        }
    },
    filters: {
        date: function date(value) {
            if (!value) {
                return;
            }
            var date = new Date(value);
            date = date.toDateString().split(' ');
            return date[2] + ' ' + date[1] + ', ' + date[3];
        }
    }
};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__storage__ = __webpack_require__(1);
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
/* 21 */
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
/* 22 */
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(true);
// imports


// module
exports.push([module.i, "\n#weatherInfo {\n    min-width: 40rem;\n    margin-left: -0.5rem;\n    margin-top: 1rem;\n}\n#weatherInfo:before {\n    bottom: 100%;\n    left: 2rem;\n    content: \" \";\n    height: 0;\n    width: 0;\n    position: absolute;\n    pointer-events: none;\n    border-left: 8px solid transparent;\n    border-right: 8px solid transparent;\n    border-bottom: 9px solid rgba(255,255,255,0.98);\n}\n#weatherInfo p{\n    margin: 0;\n}\n#currentWeather {\n    width: 38%;\n    flex-shrink: 0;\n    padding: 0.5rem;\n    background: rgba(255,255,255,0.98);\n    border-radius: 5px 0 0 5px;\n}\n#forecast {\n    width: 100%;\n    background: rgba(255,255,255,0.85);\n    border-radius: 0 5px 5px 0;\n}\n.forecast-pallet:not(:first-of-type){\n    border-left: 1px solid rgba(0, 0, 0, 0.1);\n}\n.forecast-pallet {\n    border-left: 1px solid transparent;\n    padding: 0 0.5rem;\n    text-align: center;\n    flex-basis: 100%;\n}\n.forecast-pallet p {\n    margin-bottom: 5px !important;\n}\n", "", {"version":3,"sources":["/Users/akansh/Projects/vue-example/src/components/WeatherInfo.vue?f71c9bac"],"names":[],"mappings":";AAoGA;IACA,iBAAA;IACA,qBAAA;IACA,iBAAA;CACA;AACA;IACA,aAAA;IACA,WAAA;IACA,aAAA;IACA,UAAA;IACA,SAAA;IACA,mBAAA;IACA,qBAAA;IACA,mCAAA;IACA,oCAAA;IACA,gDAAA;CACA;AACA;IACA,UAAA;CACA;AACA;IACA,WAAA;IACA,eAAA;IACA,gBAAA;IACA,mCAAA;IACA,2BAAA;CACA;AACA;IACA,YAAA;IACA,mCAAA;IACA,2BAAA;CACA;AACA;IACA,0CAAA;CACA;AACA;IACA,mCAAA;IACA,kBAAA;IACA,mBAAA;IACA,iBAAA;CACA;AACA;IACA,8BAAA;CACA","file":"WeatherInfo.vue","sourcesContent":["<template>\n    <div>\n        <div class=\"flex font-black absolute\" id=\"weatherInfo\">\n            <div id=\"currentWeather\">\n                <div class=\"flex flex-center\">\n                    <div class=\"relative\">\n                        <div class=\"temperature-value\">{{getTemp(settings.unit, data.current.temp)}}</div>\n                        <sup class=\"temperature-unit\" v-if=\"this.settings.unit === 'f'\">&#8457;</sup>\n                        <sup class=\"temperature-unit\" v-if=\"this.settings.unit === 'c'\">&#8451;</sup>\n                    </div>\n                    <div class=\"ml-30 semi-bold flex flex-center\">\n                        <i class=\"wi\" :class=\"'wi-'+getWeatherClass(data.current.code)\"></i>\n                        <span class=\"font-small\">{{data.current.text}}</span>\n                    </div>\n                </div>\n                <div class=\"flex font-xsmall flex-justify-space-around flex-end mt-15\">\n                    <div v-if=\"data.current.humidity\">\n                        <p>\n                            <svg viewBox=\"0 0 12 17\" width=\"0.7em\">\n                                <use xlink:href=\"#icon-drop\"></use>\n                            </svg>\n                            Humid\n                        </p>\n                        <p class=\"semi-bold\">{{data.current.humidity}}%</p>\n                    </div>\n                    <div v-if=\"data.current.wind\">\n                        <p>\n                            <svg viewBox=\"0 0 14 12\" width=\"1em\">\n                                <use xlink:href=\"#icon-wind\"></use>\n                            </svg>\n                            Wind\n                        </p>\n                        <p class=\"semi-bold\">{{data.current.wind}} km/hr</p>\n                    </div>\n                    <div v-if=\"data.pollution.aqi\">\n                        <p>\n                            <svg viewBox=\"0 0 14 12\" width=\"1em\">\n                                <use xlink:href=\"#icon-pollution\"></use>\n                            </svg>\n                            Pollution\n                        </p>\n                        <p class=\"semi-bold\">{{data.pollution.aqi}} AQI</p>\n                    </div>\n                </div>\n            </div>\n            <div class=\"flex flex-center\" id=\"forecast\">\n                <div class=\"forecast-pallet\" v-for=\"item in data.forecast\">\n                    <p class=\"semi-bold\">{{item.day}}</p>\n                    <p>\n                        <i class=\"wi tooltip\" :class=\"'wi-'+getWeatherClass(item.code)\" :rel=\"item.text\"></i>\n                    </p>\n                    <div class=\"flex font-xsmall flex-justify-space-around semi-bold\">\n                        <p>{{getTemp(settings.unit, item.high)}} <sup>°</sup></p>\n                        <p class=\"font-light-black\">{{getTemp(settings.unit, item.low)}} <sup>°</sup></p>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n             style=\"display: none;\">\n            <defs>\n                <g id=\"icon-drop\" fill-rule=\"nonzero\" fill=\"#333\">\n                    <path d=\"M7.51729577,1.82901408 C7.13419718,1.2656338 6.79616901,0.747323943 6.48067606,0.274084507 C6.43560563,0.206478873 6.368,0.138873239 6.30039437,0.0938028167 C6.02997183,-0.0864788734 5.66940845,0.00366197167 5.48912676,0.274084507 C5.19616901,0.747323943 4.85814085,1.24309859 4.45250704,1.82901408 C2.67222535,4.44309859 0.0130704225,8.38676056 0.0130704225,10.6402817 C0.0130704225,12.2853521 0.689126761,13.7726761 1.7708169,14.8543662 C2.85250704,15.9135211 4.33983099,16.5895775 5.98490141,16.5895775 C7.62997183,16.5895775 9.11729577,15.9135211 10.1989859,14.831831 C11.2806761,13.7501408 11.9567324,12.2628169 11.9567324,10.6177465 C11.9567324,8.36422535 9.29757746,4.44309859 7.51729577,1.82901408 Z M9.38771831,14.0205634 C8.50884507,14.8994366 7.31447887,15.4177465 5.98490141,15.4177465 C4.65532394,15.4177465 3.46095775,14.8769014 2.58208451,14.0205634 C1.70321127,13.1416901 1.18490141,11.9473239 1.18490141,10.6177465 C1.18490141,8.72478873 3.73138028,4.96140845 5.42152113,2.46 C5.62433803,2.16704225 5.80461972,1.87408451 5.98490141,1.62619718 C6.1651831,1.87408451 6.34546479,2.16704225 6.54828169,2.46 C8.23842254,4.98394366 10.7849014,8.72478873 10.7849014,10.6177465 C10.7849014,11.9473239 10.2440563,13.1416901 9.38771831,14.0205634 Z\"\n                          id=\"Shape\"></path>\n                    <path d=\"M8.47785915,9.21211268 C8.1623662,9.18957746 7.89194366,9.43746479 7.86940845,9.75295775 C7.84687324,10.2487324 7.68912676,10.7219718 7.44123944,11.1276056 C7.19335211,11.5332394 6.83278873,11.8938028 6.40461972,12.1191549 C6.13419718,12.2769014 6.02152113,12.6374648 6.17926761,12.9078873 C6.3595493,13.2233803 6.72011268,13.3135211 6.99053521,13.1557746 C7.59898592,12.8177465 8.09476056,12.3219718 8.43278873,11.7585915 C8.79335211,11.1952113 8.99616901,10.5191549 9.01870423,9.82056338 C9.04123944,9.50507042 8.79335211,9.23464789 8.47785915,9.21211268 Z\"\n                          id=\"Shape\"></path>\n                </g>\n\n                <g id=\"icon-wind\" stroke=\"#333\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n                    <path d=\"M0.379940476,4.55183649 L10.4860459,4.55183649 C11.74239,4.55183649 12.7608929,3.53047666 12.7608929,2.27591824 C12.7608929,1.01885999 11.7395331,0 10.4849746,0 C9.22791635,0 8.20905639,1.01814576 8.20905639,2.27591824 M0.710989624,6.98476989 L6.45267548,6.98476989 C7.16645515,6.98476989 7.74510769,7.56504562 7.74510769,8.2778108 C7.74510769,8.99199626 7.16483201,9.57085171 6.45206683,9.57085171 C5.73788135,9.57085171 5.15902593,8.99240204 5.15902593,8.2778108\"\n                          id=\"cloud-wind\"></path>\n                </g>\n\n                <g id=\"icon-pollution\" fill-rule=\"nonzero\">\n                    <path d=\"M11.5386397,3.99200212 C11.6838208,3.67177552 11.7593555,3.32337483 11.7593555,2.96640922 C11.7593555,1.5948386 10.6434928,0.47900412 9.27195039,0.47900412 C8.85804497,0.47900412 8.45636709,0.580289941 8.09633051,0.773845879 C7.62818998,0.281701029 6.98542649,0.0039609375 6.29688012,0.0039609375 C5.39942294,0.0039609375 4.57744412,0.487822607 4.13761854,1.25590441 C3.93730082,1.2048248 3.73106655,1.17901734 3.52178947,1.17901734 C2.15021886,1.17901734 1.03438437,2.29488 1.03438437,3.66642244 C1.03438437,3.92041178 1.07216582,4.16904805 1.14699617,4.408246 C0.603236409,4.87838689 0.284333984,5.5673277 0.284333984,6.29151428 C0.284333984,7.60146818 1.30220719,8.67819704 2.58855121,8.7722703 C2.58576198,8.82033528 2.58435327,8.86851296 2.58435327,8.91660612 C2.58435327,10.2881767 3.70021593,11.4040112 5.07175837,11.4040112 C5.88697541,11.4040112 6.64699943,10.9992624 7.10789922,10.345032 C7.57102477,10.810496 8.20468802,11.0790232 8.87190661,11.0790232 C10.1760848,11.0790232 11.2490102,10.0701939 11.3513103,8.79185128 C12.4690888,8.5376929 13.284334,7.53551266 13.284334,6.36657003 C13.284334,5.26947131 12.55733,4.31118629 11.5386397,3.99200212 Z M10.8595201,8.15818592 C10.7195517,8.17560432 10.6153114,8.29599383 10.6181469,8.43704237 C10.61839,8.44860062 10.618606,8.46018589 10.618606,8.47179815 C10.618606,9.48271353 9.79616044,10.3051591 8.78524507,10.3051591 C8.18586304,10.3051591 7.62307316,10.0109907 7.27980913,9.51827948 C7.22353015,9.4374797 7.1280395,9.392921 7.03028041,9.40129263 C6.93219726,9.40969127 6.84605044,9.46983202 6.8043273,9.55900343 C6.50378562,10.2015399 5.85155427,10.6166919 5.14274688,10.6166919 C4.1318315,10.6166919 3.30938592,9.79424636 3.30938592,8.78333098 C3.30938592,8.66313051 3.32121423,8.54257897 3.34446577,8.42494401 C3.36107401,8.34106563 3.33776846,8.25427068 3.28143546,8.18994412 C3.22896422,8.13007343 3.15334945,8.09601978 3.07427802,8.09601978 C3.06844488,8.09601978 3.06261174,8.09620882 3.05685962,8.09658689 C3.01519048,8.09923341 2.9763839,8.10052966 2.93814444,8.10052966 C1.92722906,8.10052966 1.10478348,7.27808408 1.10478348,6.26716871 C1.10478348,5.67923691 1.39009418,5.12268525 1.8680335,4.77844904 C1.97159872,4.70383347 2.01035129,4.56786192 1.96166078,4.44984888 C1.87011291,4.22805457 1.82366384,3.99291967 1.82366384,3.75097943 C1.82366384,2.74006405 2.64610942,1.91761847 3.6570248,1.91761847 C3.87549745,1.91761847 4.08924419,1.9556689 4.29224282,2.03066254 C4.42864645,2.08105438 4.58074015,2.01672782 4.63955763,1.88375386 C4.93318596,1.22012629 5.59162852,0.791336565 6.31693614,0.791336565 C6.88817867,0.791336565 7.41677988,1.05080323 7.76725431,1.50319555 C7.85629069,1.61821101 8.01942954,1.64410907 8.13976504,1.56236411 C8.44376339,1.35582778 8.79950385,1.24667247 9.16858491,1.24667247 C10.1795003,1.24667247 11.0019459,2.06911805 11.0019459,3.08003343 C11.0019459,3.44417252 10.8953831,3.79602422 10.6938427,4.09748408 C10.6411284,4.17633948 10.6327028,4.27677209 10.6715364,4.36332399 C10.7103429,4.44987588 10.7909807,4.51031368 10.884932,4.52338424 C11.7849638,4.64828362 12.4636873,5.42887103 12.4636873,6.33908375 C12.4638223,7.262313 11.7741076,8.0443857 10.8595201,8.15818592 Z\"\n                          fill=\"#333333\"></path>\n                    <g transform=\"translate(8.000000, 8.000000)\" fill=\"#333\">\n                        <path d=\"M1.50901563,0.808488281 C1.33354102,0.97946875 1.10200391,1.07366797 0.856933594,1.07366797 C0.69428125,1.07366797 0.53421875,1.03129102 0.394087891,0.951158203 C0.269851563,0.880115234 0.111693359,0.923279297 0.0407011719,1.04738867 C-0.0303164062,1.17154883 0.012796875,1.32975781 0.136931641,1.40077539 C0.355240234,1.52564648 0.604195313,1.59163672 0.856933594,1.59163672 C1.23781836,1.59163672 1.59778125,1.44525977 1.87050195,1.17939453 C1.97292773,1.07955859 1.97500977,0.915611328 1.87522461,0.813185547 C1.77538867,0.710785156 1.61141602,0.708677734 1.50901563,0.808488281 Z\"\n                              id=\"Shape\"></path>\n                        <path d=\"M2.07139258,0.0156914062 C1.92897656,-0.000203125 1.80118555,0.102298828 1.78539258,0.244435547 C1.78313281,0.264621094 1.7801875,0.285060547 1.77658203,0.305195312 C1.75141992,0.445960937 1.84516211,0.580505859 1.98595313,0.605667969 C2.00136523,0.608410156 2.01670117,0.609730469 2.03180859,0.609730469 C2.15487695,0.609730469 2.26403125,0.521675781 2.28642578,0.396296875 C2.29201172,0.364990234 2.29663281,0.333150391 2.30013672,0.301691406 C2.31595508,0.159529297 2.21355469,0.031484375 2.07139258,0.0156914062 Z\"\n                              id=\"Shape\"></path>\n                    </g>\n                </g>\n            </defs>\n        </svg>\n    </div>\n</template>\n<script>\n    export default {\n        props: ['data', 'settings'],\n        data() {\n            return {\n                getTemp: this.$parent.getTemp,\n                getWeatherClass: this.$parent.getWeatherClass\n            }\n        }\n    }\n</script>\n\n<style lang=\"css\">\n    #weatherInfo {\n        min-width: 40rem;\n        margin-left: -0.5rem;\n        margin-top: 1rem;\n    }\n    #weatherInfo:before {\n        bottom: 100%;\n        left: 2rem;\n        content: \" \";\n        height: 0;\n        width: 0;\n        position: absolute;\n        pointer-events: none;\n        border-left: 8px solid transparent;\n        border-right: 8px solid transparent;\n        border-bottom: 9px solid rgba(255,255,255,0.98);\n    }\n    #weatherInfo p{\n        margin: 0;\n    }\n    #currentWeather {\n        width: 38%;\n        flex-shrink: 0;\n        padding: 0.5rem;\n        background: rgba(255,255,255,0.98);\n        border-radius: 5px 0 0 5px;\n    }\n    #forecast {\n        width: 100%;\n        background: rgba(255,255,255,0.85);\n        border-radius: 0 5px 5px 0;\n    }\n    .forecast-pallet:not(:first-of-type){\n        border-left: 1px solid rgba(0, 0, 0, 0.1);\n    }\n    .forecast-pallet {\n        border-left: 1px solid transparent;\n        padding: 0 0.5rem;\n        text-align: center;\n        flex-basis: 100%;\n    }\n    .forecast-pallet p {\n        margin-bottom: 5px !important;\n    }\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(true);
// imports


// module
exports.push([module.i, "\n#weather:hover .arrow-down {\n    opacity: 1;\n    animation: fade_in 0.4s;\n    left: calc(50% - 11.5px)\n}\n", "", {"version":3,"sources":["/Users/akansh/Projects/vue-example/src/components/weather.vue?585c8370"],"names":[],"mappings":";AAmCA;IACA,WAAA;IACA,wBAAA;IACA,wBAAA;CACA","file":"weather.vue","sourcesContent":["<template>\n    <div v-on:click.stop=\"\" @mousedown.stop=\"\">\n        <transition mode=\"out-in\">\n            <div v-if=\"isLoading\" class=\"weather-loading\" key=\"loading\">Loading..</div>\n            <div v-else id=\"weather\" @click=\"toggle('showWeatherInfo')\" key=\"notLoading\" class=\"flex flex-center\">\n                <transition mode=\"out-in\" name=\"fast-fade\">\n                    <div :key=\"weatherCity + temp\">\n                        <div class=\"temperature\" v-if=\"temp\">\n                            <div class=\"temperature-value\">{{temp}}</div>\n                            <sup class=\"temperature-unit\" v-if=\"this.settings.unit === 'f'\">&#8457;</sup>\n                            <sup class=\"temperature-unit\" v-if=\"this.settings.unit === 'c'\">&#8451;</sup>\n                        </div>\n                        <div class=\"weather-icon flex flex-center\">\n                            <i class=\"wi\" :class=\"'wi-'+weatherClass\"></i>\n                            <span class=\"weather-city\">{{weatherCity}}</span>\n                        </div>\n                    </div>\n                </transition>\n                <div class=\"arrow-down font-center opacity-0\" v-show=\"!showWeatherInfo\">\n                    <svg width=\"23px\" height=\"8px\" viewBox=\"0 0 23 8\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <g transform=\"translate(-25.000000, -50.000000)\" stroke=\"rgba(255,255,255,0.5)\" fill=\"rgba(255,255,255,0.5)\" stroke-width=\"2\" fill-rule=\"nonzero\">\n                            <path d=\"M46.4347899,51.1140206 C45.950678,51.012669 45.6164104,51.012669 45.4319868,51.1140206 L36.6142361,55.969398 L27.7791956,51.1140206 C27.5025603,50.9619931 27.0530279,50.9619931 26.7763926,51.1140206 C26.4997572,51.2660481 26.4997572,51.5130927 26.7763926,51.6651202 L36.0955448,56.7865456 C36.2338625,56.8625594 36.4067596,56.9005662 36.5969463,56.9005662 C36.7698434,56.9005662 36.9600302,56.8625594 37.0983479,56.7865456 L46.4175001,51.6651202 C46.6134502,51.5637685 46.6192134,51.3800687 46.4347899,51.1140206 Z\" id=\"Shape\"></path>\n                        </g>\n                    </svg>\n                </div>\n            </div>\n        </transition>\n        <transition>\n            <WeatherInfo\n                    v-if=\"showWeatherInfo && localWeather && !isLoading\" :data=\"localWeather\"\n                    :settings=\"settings\"/>\n        </transition>\n    </div>\n</template>\n<style>\n    #weather:hover .arrow-down {\n        opacity: 1;\n        animation: fade_in 0.4s;\n        left: calc(50% - 11.5px)\n    }\n</style>\n<script>\n    import storage from '../utils/storage'\n    import weatherUtil from '../utils/weatherUtil'\n    import constants from '../utils/Constants'\n    import CommonUtils from '../utils/common'\n    import WeatherInfo from './WeatherInfo.vue'\n\n    export default {\n        beforeCreate() {\n            this.localWeather = storage.get(constants.STORAGE.WEATHER)\n        },\n        props: ['settings', 'otherSettings'],\n        mounted() {\n            this.checkWeather()\n        },\n        data() {\n            return {\n                weatherClass: null,\n                weatherCity: null,\n                temp: null,\n                localWeather: this.localWeather,\n                error: null,\n                isLoading: false,\n                localSettings: Object.assign({}, this.settings)\n            }\n        },\n        methods: {\n            toggle(prop) {\n                if (prop === 'showWeatherInfo') {\n                    if (!this.otherSettings.weather.showWeatherInfo) {\n                        this.$ga.event('weatherInfo', 'open')\n                    }\n                    this.otherSettings.weather.showWeatherInfo = !this.otherSettings.weather.showWeatherInfo\n                }\n            },\n            getTemp(unit, temp) {\n                // use for only converting fahrenheit\n                if (!unit || !temp) {\n                    return\n                }\n                return unit === \"f\" ? Math.round((5.0 / 9.0) * (temp - 32.0)) : temp\n            },\n            getWeatherClass(code) {\n                if (!code) {\n                    return\n                }\n                return weatherUtil[code]\n            },\n            checkWeather(forceUpdate) {\n\n                if (!navigator.onLine) {\n                    this.weatherCity = 'Offline'\n                    return\n                }\n\n                let now = +new Date()\n                const fifteenMin = 900000\n\n                if (!this.localWeather || forceUpdate) {\n                    this.prepareWeatherCall()\n                    return\n                }\n                if (this.localWeather) {\n                    // Check if local weather is not more than an hour old and also\n                    // checks if local city\n                    if ((now - this.localWeather.updatedOn) < fifteenMin) {\n                        this.showWeather(this.localWeather)\n                        this.isLoading = false\n\n                    } else {\n                        this.showWeather(this.localWeather)\n                        this.prepareWeatherCall(true)\n                    }\n                }\n            },\n            getWeather(data) {\n                if (!this.localWeather) {\n                    this.isLoading = true\n                }\n                chrome.runtime.sendMessage({query: 'startWeather'})\n\n                let url = 'https://api.subtletab.com/weather'\n                if (data.type !== 'custom') {\n                    url += '?lat=' + data.lat + '&long=' + data.long + '&type=geo'\n                } else {\n                    url += '?location=' + data.location + '&type=custom'\n                }\n\n                return CommonUtils.http(url).then(_resp => {\n                    this.isLoading = false\n                    this.updateLocalWeather(_resp)\n                    this.showWeather(this.localWeather)\n                })\n            },\n            prepareWeatherCall(noLoading) {\n                let options\n                if (this.settings.location.type !== 'custom') {\n                    // adding loading because below call takes time\n                    this.isLoading = !noLoading\n                    navigator.geolocation.getCurrentPosition(\n                        (position) => {\n                            options = {\n                                lat: position.coords.latitude,\n                                long: position.coords.longitude,\n                                type: 'geo'\n                            }\n                            this.getWeather(options)\n                        },\n                        (error) => {\n                            //console.log(error)\n                        },\n                        {\n                            timeout: 10000\n                        }\n                    )\n                } else {\n                    if (this.settings.location && this.settings.location.name) {\n                        options = {\n                            location: this.settings.location.name,\n                            type: 'custom'\n                        }\n                        this.getWeather(options)\n                    }\n                }\n            },\n            showWeather(weatherObj) {\n                let current = weatherObj.current\n                this.temp = this.getTemp(this.settings.unit, current.temp)\n                this.weatherClass = this.getWeatherClass(current.code)\n                this.weatherCity = current.city\n            },\n            updateLocalWeather(weatherObj) {\n                if (!CommonUtils.isObject(weatherObj) || Object.keys(weatherObj).length === 0) {\n                    return\n                }\n                this.localWeather = weatherObj\n                storage.set(constants.STORAGE.WEATHER, this.localWeather)\n            }\n        },\n        watch: {\n            settings: {\n                handler: function (newValue) {\n                    if (this.localSettings.unit !== newValue.unit) {\n                        this.checkWeather()\n                    } else if (this.localSettings.location.name !== newValue.location.name ||\n                        this.localSettings.location.type !== newValue.location.type) {\n                        this.checkWeather(true)\n                    }\n                    this.localSettings = JSON.parse(JSON.stringify(newValue))\n                },\n                deep: true\n            }\n        },\n        computed: {\n            showWeatherInfo() {\n                return this.otherSettings.weather.showWeatherInfo || false\n            }\n        },\n        components: {\n            WeatherInfo\n        }\n    }\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

!function (e, n) {
    if (true) module.exports = n(); else if ("function" == typeof define && define.amd) define([], n); else {
        var t = n();
        for (var r in t) ("object" == typeof exports ? exports : e)[r] = t[r]
    }
}(this, function () {
    return function (e) {
        function n(r) {
            if (t[r]) return t[r].exports;
            var o = t[r] = {i: r, l: !1, exports: {}};
            return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
        }

        var t = {};
        return n.m = e, n.c = t, n.d = function (e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, {configurable: !1, enumerable: !0, get: r})
        }, n.n = function (e) {
            var t = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return n.d(t, "a", t), t
        }, n.o = function (e, n) {
            return Object.prototype.hasOwnProperty.call(e, n)
        }, n.p = "", n(n.s = 0)
    }([function (e, n, t) {
        "use strict";

        function r(e) {
            u(H, e)
        }

        function o() {
            return H.id ? [].concat(H.id) : []
        }

        function i() {
        }

        function a(e) {
            return new Promise(function (n, t) {
                var r = document.head || document.getElementsByTagName("head")[0], o = document.createElement("script");
                o.async = !0, o.src = e, o.charset = "utf8", r.appendChild(o), o.onload = n, o.onerror = t
            })
        }

        function c(e, n) {
            var t = n.split("/"), r = e.split("/");
            return "" === t[0] && "/" === e[e.length - 1] && t.shift(), r.join("/") + t.join("/")
        }

        function u(e, n) {
            return Object.keys(n).forEach(function (t) {
                if (e[t] && "object" == typeof e[t]) return void u(e[t], n[t]);
                e[t] = n[t]
            }), e
        }

        function f() {
            return Array.prototype.slice.call(document.getElementsByTagName("script")).filter(function (e) {
                return -1 !== e.src.indexOf("analytics")
            }).length > 0
        }

        function l(e) {
            return e.replace(/-/gi, "")
        }

        function s() {
            return new Promise(function (e, n) {
                var t = setInterval(function () {
                    "undefined" != typeof window && window.ga && (e(), clearInterval(t))
                }, 10)
            })
        }

        function d(e, n) {
            if (o().length > 1) {
                return l(n) + "." + e
            }
            return e
        }

        function p(e) {
            var n = Object.keys(e).reduce(function (n, t, r, o) {
                var i = r === o.length - 1;
                return n += t + "=" + e[t] + (i ? "" : "&")
            }, "");
            return "" !== n ? "?" + n : ""
        }

        function v(e) {
            return -1 !== B.ignoreRoutes.indexOf(e)
        }

        function g(e) {
            return e.query && e.params
        }

        function h(e) {
            return e.currentRoute
        }

        function y(e) {
            for (var n = arguments.length, t = Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++) t[r - 1] = arguments[r];
            o().forEach(function (n) {
                var r;
                if (void 0 === window.ga || "string" != typeof n) return void B.untracked.push({
                    method: d(e, n),
                    arguments: [].concat(t)
                });
                (r = window).ga.apply(r, [d(e, n)].concat(t))
            })
        }

        function m() {
            for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
            if ("object" == typeof n[0] && n[0].constructor === Object) return void y("set", n[0]);
            y("set", n[0], n[1])
        }

        function b() {
            var e = o();
            B.debug.enabled && (window.ga_debug = {trace: B.debug.trace}), e.forEach(function (n) {
                var t = l(n), r = e.length > 1 ? D({}, B.fields, {name: t}) : B.fields;
                window.ga("create", n, "auto", r)
            }), B.beforeFirstHit();
            var n = B.ecommerce;
            if (n.enabled) {
                var t = n.enhanced ? "ec" : "ecommerce";
                n.options ? y("require", t, n.options) : y("require", t)
            }
            B.linkers.length > 0 && (y("require", "linker"), y("linker:autoLink", B.linkers)), B.debug.sendHitTask || m("sendHitTask", null)
        }

        function w(e) {
            if (Array.isArray(e)) {
                for (var n = 0, t = Array(e.length); n < e.length; n++) t[n] = e[n];
                return t
            }
            return Array.from(e)
        }

        function k() {
            var e = B.untracked, n = B.autoTracking, t = e.length;
            if (t && n.untracked) for (; t--;) {
                var r = e[t];
                y.apply(void 0, [r.method].concat(w(r.arguments))), e.splice(t, 1)
            }
        }

        function O() {
            for (var e = void 0, n = arguments.length, t = Array(n), r = 0; r < n; r++) t[r] = arguments[r];
            if (h(t[0]) && (e = t[0].currentRoute), g(t[0]) && (e = t[0]), e) {
                var o = B.router, i = B.autoTracking, a = i.transformQueryString, u = i.prependBase, f = p(e.query),
                    l = o && o.options.base, s = u && l, d = e.path + (a ? f : "");
                return d = s ? c(l, d) : d, m("page", d), void y("send", "pageview", N({
                    page: d,
                    title: e.name,
                    location: window.location.href
                }, "function" == typeof t[1] && {hitCallback: t[1]}))
            }
            y.apply(void 0, ["send", "pageview"].concat(t))
        }

        function j(e) {
            if (!v(e)) {
                var n = B.autoTracking, t = e.meta.analytics, r = void 0 === t ? {} : t,
                    o = r.pageviewTemplate || n.pageviewTemplate;
                O(o ? o(e) : e)
            }
        }

        function x() {
            var e = B.router, n = B.autoTracking;
            n.page && e && (n.pageviewOnLoad && j(e.currentRoute), B.router.afterEach(function (t, r) {
                var o = n.skipSamePath, i = n.shouldRouterUpdate;
                o && t.path === r.path || ("function" != typeof i || i(t, r)) && setTimeout(function () {
                    j(e.currentRoute)
                }, 0)
            }))
        }

        function T(e) {
            y("send", "exception", {
                exDescription: e,
                exFatal: arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
            })
        }

        function A() {
            B.autoTracking.exception && window.addEventListener("error", function (e) {
                T(e.message || e)
            })
        }

        function E() {
            if ("undefined" != typeof document) {
                var e = B.id, n = B.debug, t = B.checkDuplicatedScript, r = B.disableScriptLoader,
                    o = n.enabled ? "analytics_debug" : "analytics",
                    i = "https://www.google-analytics.com/" + o + ".js";
                if (!e) throw new Error("[vue-analytics] Please enter a Google Analytics tracking ID");
                return new Promise(function (e, n) {
                    return t && f(i) || r ? e() : a(i).then(function () {
                        e()
                    }).catch(function () {
                        n("[vue-analytics] It's not possible to load Google Analytics script")
                    })
                }).then(function () {
                    return s()
                }).then(function () {
                    return "function" == typeof e ? e() : e
                }).then(function (e) {
                    B.id = e, b(), M(), B.ready(), A(), x(), k()
                }).catch(function (e) {
                    console.error(e)
                })
            }
        }

        function P() {
            for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
            y.apply(void 0, ["send", "event"].concat(n))
        }

        function q() {
            for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
            y.apply(void 0, ["send", "social"].concat(n))
        }

        function R() {
            for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
            y.apply(void 0, ["send", "timing"].concat(n))
        }

        function S(e, n, t) {
            return n in e ? Object.defineProperty(e, n, {
                value: t,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[n] = t, e
        }

        function L(e) {
            r(arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}), e.directive("ga", Q), e.prototype.$ga = e.$ga = {
                event: P,
                exception: T,
                page: O,
                query: y,
                require: F,
                set: m,
                social: q,
                time: R,
                untracked: k,
                ecommerce: z,
                commands: B.commands
            }, E()
        }

        Object.defineProperty(n, "__esModule", {value: !0});
        var I = Object.assign || function (e) {
                for (var n = 1; n < arguments.length; n++) {
                    var t = arguments[n];
                    for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
                }
                return e
            }, _ = {
                id: null,
                router: null,
                fields: {},
                ignoreRoutes: [],
                linkers: [],
                commands: {},
                set: [],
                require: [],
                ecommerce: {enabled: !1, options: null, enhanced: !1},
                autoTracking: {
                    shouldRouterUpdate: null,
                    skipSamePath: !1,
                    exception: !1,
                    page: !0,
                    transformQueryString: !0,
                    pageviewOnLoad: !0,
                    pageviewTemplate: null,
                    untracked: !0,
                    prependBase: !0
                },
                debug: {enabled: !1, trace: !1, sendHitTask: !0},
                checkDuplicatedScript: !1,
                disableScriptLoader: !1,
                beforeFirstHit: i,
                ready: i,
                untracked: []
            }, H = I({}, _), B = H, D = Object.assign || function (e) {
                for (var n = 1; n < arguments.length; n++) {
                    var t = arguments[n];
                    for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
                }
                return e
            }, F = function () {
                if (2 == arguments.length) return void y("require", arguments.length <= 0 ? void 0 : arguments[0], arguments.length <= 1 ? void 0 : arguments[1]);
                y("require", arguments.length <= 0 ? void 0 : arguments[0])
            }, C = function () {
                B.set.forEach(function (e) {
                    var n = e.field, t = e.value;
                    if (void 0 === n || void 0 === t) throw new Error('[vue-analytics] Wrong configuration in the plugin options.\nThe "set" array requires each item to have a "field" and a "value" property.');
                    m(n, t)
                })
            }, G = function () {
                var e = ["ec", "ecommerce"];
                B.require.forEach(function (n) {
                    if (-1 !== e.indexOf(n) || -1 !== e.indexOf(n.name)) throw new Error("[vue-analytics] The ecommerce features are built-in in the plugin. \nFollow the ecommerce instructions available in the documentation.");
                    if ("string" != typeof n && "object" != typeof n) throw new Error('[vue-analytics] Wrong configuration in the plugin options. \nThe "require" array requires each item to be a string or to have a "name" and an "options" property.');
                    var t = n.name || n;
                    if (n.options) return void F(t, n.options);
                    F(t)
                })
            }, M = function () {
                C(), G()
            }, N = Object.assign || function (e) {
                for (var n = 1; n < arguments.length; n++) {
                    var t = arguments[n];
                    for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
                }
                return e
            }, Q = {
                inserted: function (e, n, t) {
                    var r = n.value;
                    e.addEventListener("click", function () {
                        var e = "string" == typeof r ? B.commands[r] : r;
                        if (!e) throw new Error("[vue-analytics] The value passed to v-ga is not defined in the commands list.");
                        e.apply(t.context)
                    })
                }
            }, U = Object.assign || function (e) {
                for (var n = 1; n < arguments.length; n++) {
                    var t = arguments[n];
                    for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
                }
                return e
            }, W = function (e) {
                return (B.ecommerce.enhanced ? "ec" : "ecommerce") + ":" + e
            }, $ = ["addItem", "addTransaction", "addProduct", "addImpression", "setAction", "addPromo", "send"],
            z = $.reduce(function (e, n) {
                return U({}, e, S({}, n, function () {
                    for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                    y.apply(void 0, [W(n)].concat(t))
                }))
            }, {});
        n.default = L, t.d(n, "onAnalyticsReady", function () {
            return s
        })
    }])
});

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(11)

/* template */
var __vue_template__ = __webpack_require__(38)
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
__vue_options__.__file = "/Users/akansh/Projects/vue-example/src/app.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-258c3f20", __vue_options__)
  } else {
    hotAPI.reload("data-v-258c3f20", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] app.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(44)

/* script */
__vue_exports__ = __webpack_require__(12)

/* template */
var __vue_template__ = __webpack_require__(42)
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
__vue_options__.__file = "/Users/akansh/Projects/vue-example/src/components/WeatherInfo.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-595534ac", __vue_options__)
  } else {
    hotAPI.reload("data-v-595534ac", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] WeatherInfo.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(13)

/* template */
var __vue_template__ = __webpack_require__(40)
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
__vue_options__.__file = "/Users/akansh/Projects/vue-example/src/components/background.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-479dc554", __vue_options__)
  } else {
    hotAPI.reload("data-v-479dc554", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] background.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(14)

/* template */
var __vue_template__ = __webpack_require__(41)
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
__vue_options__.__file = "/Users/akansh/Projects/vue-example/src/components/clock.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-55c3e116", __vue_options__)
  } else {
    hotAPI.reload("data-v-55c3e116", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] clock.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(15)

/* template */
var __vue_template__ = __webpack_require__(39)
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
__vue_options__.__file = "/Users/akansh/Projects/vue-example/src/components/customize.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2c3d36cb", __vue_options__)
  } else {
    hotAPI.reload("data-v-2c3d36cb", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] customize.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(16)

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
__vue_options__.__file = "/Users/akansh/Projects/vue-example/src/components/notes.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0e9c7b6e", __vue_options__)
  } else {
    hotAPI.reload("data-v-0e9c7b6e", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] notes.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(17)

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
__vue_options__.__file = "/Users/akansh/Projects/vue-example/src/components/onboarding.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-11f6bfc3", __vue_options__)
  } else {
    hotAPI.reload("data-v-11f6bfc3", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] onboarding.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(45)

/* script */
__vue_exports__ = __webpack_require__(18)

/* template */
var __vue_template__ = __webpack_require__(43)
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
__vue_options__.__file = "/Users/akansh/Projects/vue-example/src/components/weather.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-71313dfc", __vue_options__)
  } else {
    hotAPI.reload("data-v-71313dfc", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] weather.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(19)

/* template */
var __vue_template__ = __webpack_require__(37)
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
__vue_options__.__file = "/Users/akansh/Projects/vue-example/src/components/whatsNew.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-17573399", __vue_options__)
  } else {
    hotAPI.reload("data-v-17573399", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] whatsNew.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._c('div', {
    staticClass: "notes-arrow_box",
    attrs: {
      "id": "notes"
    }
  }, [(!_vm.notesMeta.count) ? _vm._c('div', {
    staticClass: "col s12 note full-height relative no-padding flex flex-justify-center flex-flow-column flex-center"
  }, [_vm._m(0), _vm._v(" "), _vm._c('h5', {
    staticClass: "italics create_note pointer",
    on: {
      "click": _vm.createFirstNote
    }
  }, [_vm._v("Create first note")])]) : _vm._e(), _vm._v(" "), (_vm.notesMeta.count) ? _vm._c('div', {
    staticClass: "full-height"
  }, [_vm._c('div', {
    staticClass: "note full-height no-padding relative flex-flow-column flex"
  }, [_vm._c('header', {
    staticClass: "flex widget-header flex-center"
  }, [_vm._c('svg', {
    staticClass: "pointer",
    attrs: {
      "width": "1.3em",
      "height": "1em",
      "viewBox": "0 0 23 21",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    },
    on: {
      "click": _vm.toggleNoteList
    }
  }, [_vm._c('defs'), _vm._v(" "), _vm._c('g', {
    attrs: {
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_vm._c('g', {
    attrs: {
      "id": "hamburger",
      "transform": "translate(0.000000, 2.000000)",
      "stroke": "#7d7d7d",
      "stroke-width": "4"
    }
  }, [_vm._c('path', {
    attrs: {
      "d": "M0.132183908,0 L22.8678161,0",
      "id": "XMLID_6_"
    }
  }), _vm._v(" "), _vm._c('polyline', {
    attrs: {
      "id": "XMLID_9_",
      "points": "0.132183908 16.8 20.0697663 16.8 22.8678161 16.8"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M0.132183908,8.4 L22.8678161,8.4",
      "id": "XMLID_8_"
    }
  })])])]), _vm._v(" "), _vm._c('h4', {
    staticClass: "widget-heading mar-0"
  }, [_vm._v("Notes (N)")]), _vm._v(" "), _vm._c('div', {
    staticClass: "button-section flex"
  }, [_vm._c('div', [(_vm.sortedNoted.length < 10) ? _vm._c('svg', {
    staticClass: "pointer",
    attrs: {
      "width": "1.3em",
      "height": "1.3em",
      "viewBox": "0 0 49 51",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    },
    on: {
      "click": _vm.createNote
    }
  }, [_vm._c('g', {
    attrs: {
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_vm._c('g', {
    attrs: {
      "id": "create_note",
      "transform": "translate(0.000000, -4.000000)",
      "fill-rule": "nonzero",
      "fill": "#7d7d7d"
    }
  }, [_vm._c('polyline', {
    attrs: {
      "id": "XMLID_5_",
      "points": "12.0936873 10.8107459 12.0936873 21.4530518 1.13730207 21.4530518"
    }
  }), _vm._v(" "), _vm._c('g', {
    attrs: {
      "id": "Group",
      "transform": "translate(32.503764, 21.426374) rotate(15.000000) translate(-32.503764, -21.426374) translate(19.385379, 2.846686)"
    }
  }, [_vm._c('path', {
    attrs: {
      "d": "M24.5589684,3.61816066 L19.7169893,0.636528265 C18.0617081,-0.379683526 15.8884477,0.122838788 14.8637498,1.76441168 L14.5034165,2.33393697 L25.3359371,8.98956585 L25.6962705,8.42004056 C26.7209684,6.77846766 26.2029892,4.63437245 24.5589684,3.61816066 Z",
      "id": "XMLID_4_"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M1.80166664,22.66934 L1.82418747,22.6805071 C1.77914581,22.7475101 1.75662498,22.8256802 1.74536456,22.9038504 L0.045041666,36.5054543 C0.022520833,36.7176304 0.123864582,36.9298065 0.304031246,37.0526453 C0.495458326,37.1643169 0.731927073,37.1643169 0.912093737,37.0414781 L12.4427602,29.4813091 C12.5103227,29.4366405 12.5666248,29.3808046 12.6116665,29.3026345 L12.6341873,29.3138017 L24.547708,10.2514552 L13.7264477,3.59582634 L1.80166664,22.66934 Z M4.96584368,33.043634 L1.83544789,31.122882 L2.73628121,23.908895 L11.0802498,29.0457898 L4.96584368,33.043634 Z",
      "id": "Shape"
    }
  })]), _vm._v(" "), _vm._c('polygon', {
    attrs: {
      "id": "XMLID_1_",
      "points": "36.4387078 30.4872863 35.7743432 30.0852684 34.3330099 31.0344772 34.3330099 51.8165667 2.26334372 51.8165667 2.26334372 21.4418846 11.868479 11.916295 27.7681871 11.916295 29.1644788 9.69402963 10.9338644 9.69402963 0.0112604165 20.5261773 0.0112604165 54.0499992 36.5738328 54.0499992 36.5738328 30.2527759"
    }
  })])])]) : _vm._e()]), _vm._v(" "), _vm._c('div', [_vm._c('svg', {
    staticClass: "pointer",
    attrs: {
      "width": "1.3em",
      "height": "1.3em",
      "viewBox": "0 0 30 36",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    },
    on: {
      "click": _vm.deleteNote
    }
  }, [_vm._c('g', {
    attrs: {
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_vm._c('g', {
    attrs: {
      "id": "delete_note",
      "fill-rule": "nonzero",
      "fill": "#7d7d7d"
    }
  }, [_vm._c('polygon', {
    attrs: {
      "points": "9.875 11.175 12.125 11.175 12.125 29.175 9.875 29.175"
    }
  }), _vm._v(" "), _vm._c('polygon', {
    attrs: {
      "points": "17.375 11.175 19.625 11.175 19.625 29.175 17.375 29.175"
    }
  }), _vm._v(" "), _vm._c('polygon', {
    attrs: {
      "points": "0.375 4.425 29.625 4.425 29.625 6.675 0.375 6.675"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M20.55,5.55 L18.45,5.55 L18.45,3.3 C18.45,2.625 17.925,2.1 17.25,2.1 L12.75,2.1 C12.075,2.1 11.55,2.625 11.55,3.3 L11.55,5.55 L9.45,5.55 L9.45,3.3 C9.45,1.5 10.95,0 12.75,0 L17.25,0 C19.05,0 20.55,1.5 20.55,3.3 L20.55,5.55"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M21.75,35.925 L8.25,35.925 C6.45,35.925 4.875,34.425 4.725,32.625 L2.625,5.625 L4.875,5.475 L6.975,32.475 C7.05,33.15 7.65,33.675 8.25,33.675 L21.75,33.675 C22.425,33.675 23.025,33.075 23.025,32.475 L25.125,5.475 L27.375,5.625 L25.275,32.625 C25.125,34.5 23.55,35.925 21.75,35.925"
    }
  })])])])])])]), _vm._v(" "), (_vm.errorMessage) ? _vm._c('div', {
    staticClass: "note-error"
  }, [_vm._v(_vm._s(_vm.errorMessage))]) : _vm._e(), _vm._v(" "), _vm._c('section', {
    staticClass: "flex relative note-section flex-flow-column"
  }, [_vm._c('div', {
    staticClass: "sidebar flex-flow-column flex",
    class: {
      'show-sidebar': _vm.showSidebar && _vm.notesMeta.count
    }
  }, [_vm._c('transition-group', {
    staticClass: "note-list flex flex-flow-column flex-center",
    attrs: {
      "name": "flip-list",
      "tag": "ul",
      "id": "note-list"
    }
  }, _vm._l((_vm.sortedNoted), function(note, index) {
    return _vm._c('li', {
      key: note.id,
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
    }, [_vm._c('p', {
      staticClass: "note-title",
      domProps: {
        "innerHTML": _vm._s(_vm.trimContent(note.content))
      }
    }), _vm._v(" "), _vm._c('div', {
      staticClass: "note-data"
    }, [_vm._v(_vm._s(_vm._f("formatDate")(note.createdOn)))])])
  }))], 1), _vm._v(" "), _vm._c('div', {
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
  return _vm._c('div', [_vm._c('img', {
    attrs: {
      "src": "images/note_landing_page_icon.png"
    }
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0e9c7b6e", module.exports)
  }
}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._c('div', {
    staticClass: "flex flex-end"
  }, [_vm._c('div', {
    staticClass: "container"
  }, [_vm._c('div', {
    staticClass: "row onboarding-message flex"
  }, [_vm._m(0), _vm._v(" "), _vm._c('div', {
    staticClass: "col s6 flex flex-flow-column flex-justify-center"
  }, [_vm._c('h1', [_vm._v("Hi, Thank you for "), _vm._c('br'), _vm._v(" choosing\n                    "), _vm._c('span', {
    staticClass: "italics semi-bold relative"
  }, [_vm._v("Subtle tab"), _vm._c('span', {
    staticClass: "version"
  }, [_vm._v("v" + _vm._s(_vm.version))])])]), _vm._v(" "), _vm._c('div', {
    staticClass: "onboarding-btn semi-bold",
    on: {
      "click": _vm.closeOnboarding
    }
  }, [_vm._v("Explore Now")])])]), _vm._v(" "), _vm._m(1)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._c('div', {
    staticClass: "col s6"
  }, [_vm._c('img', {
    attrs: {
      "src": "images/welcome_mockup.png",
      "alt": "Desktop Mockup",
      "width": "90%"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._c('div', {
    staticClass: "row change-row"
  }, [_vm._c('div', {
    staticClass: "col s3 center"
  }, [_vm._c('div', {
    staticClass: "change-heading"
  }, [_vm._v("Inspiring Wallpapers")]), _vm._v(" "), _vm._c('div', {
    staticClass: "change-description"
  }, [_vm._v("Refreshing wallpapers "), _vm._c('br'), _vm._v(" of various category")])]), _vm._v(" "), _vm._c('div', {
    staticClass: "col s3 center"
  }, [_vm._c('div', {
    staticClass: "change-heading"
  }, [_vm._v("Keeps you updated")]), _vm._v(" "), _vm._c('div', {
    staticClass: "change-description"
  }, [_vm._v("Latest weather updates "), _vm._c('br'), _vm._v("with date and time")])]), _vm._v(" "), _vm._c('div', {
    staticClass: "col s3 center"
  }, [_vm._c('div', {
    staticClass: "change-heading"
  }, [_vm._v("Notes Widget")]), _vm._v(" "), _vm._c('div', {
    staticClass: "change-description"
  }, [_vm._v("Sticky notes to "), _vm._c('br'), _vm._v(" keep important content.  ")])]), _vm._v(" "), _vm._c('div', {
    staticClass: "col s3 center"
  }, [_vm._c('div', {
    staticClass: "change-heading"
  }, [_vm._v("Remain Synced")]), _vm._v(" "), _vm._c('div', {
    staticClass: "change-description"
  }, [_vm._v("Keep your settings "), _vm._c('br'), _vm._v(" and notes synced ")])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-11f6bfc3", module.exports)
  }
}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._c('div', [(!_vm.isLoading) ? _vm._c('div', {
    staticClass: "fade_in"
  }, [_vm._c('small', {
    staticClass: "semi-bold"
  }, [_vm._v("*Versions not shown are minor fixes and improvements")]), _vm._v(" "), _vm._l((_vm.updates), function(data) {
    return _vm._c('div', {
      key: data.version
    }, [_vm._c('div', {
      staticClass: "flex flex-justify-space-between mb-10"
    }, [_vm._c('h4', {
      staticClass: "font-medium bold text-green"
    }, [_vm._v("v" + _vm._s(data.version))]), _vm._v(" "), _vm._c('h4', {
      staticClass: "font-small "
    }, [_vm._v(_vm._s(_vm._f("date")(data.time)))])]), _vm._v(" "), _vm._c('ul', {
      staticClass: "pl-10 update-list",
      staticStyle: {
        "list-style": "disc"
      }
    }, _vm._l((data.updates), function(log) {
      return _vm._c('li', {
        staticClass: "font-small pl-10 mb-10"
      }, [_vm._c('p', {
        staticClass: "semi-bold mar-0 font-medium"
      }, [_vm._v(_vm._s(log.title))]), _vm._v(" "), _vm._c('p', {
        staticClass: "mar-0"
      }, [_vm._v("\n                        " + _vm._s(log.desc) + "\n                    ")])])
    }))])
  })], 2) : _vm._e(), _vm._v(" "), (_vm.isLoading) ? _vm._c('div', {
    staticClass: "flex flex-flow-column full-height flex-center flex-justify-center"
  }, [_vm._c('img', {
    attrs: {
      "src": "/images/loading.svg",
      "alt": "loading",
      "width": "100px"
    }
  }), _vm._v(" "), _vm._c('p', {
    staticClass: "bold font-medium"
  }, [_vm._v("Loading...")])]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-17573399", module.exports)
  }
}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._c('div', {
    on: {
      "mousedown": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "left", 37, $event.key)) { return null; }
        if ('button' in $event && $event.button !== 0) { return null; }
        _vm.closeWindows($event)
      }
    }
  }, [(!_vm.seenOnBoarding) ? _vm._c('onboarding', {
    attrs: {
      "id": "onboarding"
    },
    on: {
      "stopOnboarding": _vm.stopOnBoarding
    }
  }) : _vm._e(), _vm._v(" "), (_vm.seenOnBoarding) ? _vm._c('div', [_vm._c('div', {
    staticClass: "loading",
    class: {
      'show-loading': _vm.isLoading
    }
  }), _vm._v(" "), _vm._c('div', {
    class: {
      'fade_in': !_vm.isLoading
    },
    attrs: {
      "id": "viewport"
    }
  }, [_vm._c('background', {
    attrs: {
      "settings": _vm.componentsData.background
    },
    on: {
      "stopLoading": _vm.stopLoad,
      "startLoading": _vm.startLoad
    }
  }), _vm._v(" "), _vm._c('div', {
    attrs: {
      "id": "utilities"
    }
  }, [_vm._c('div', {
    attrs: {
      "id": "position--bottom-right"
    }
  }, [(_vm.sharedData.showUtilities.showClock) ? _vm._c('clock', {
    attrs: {
      "settings": _vm.componentsData.clock
    }
  }) : _vm._e()], 1), _vm._v(" "), _vm._c('div', {
    attrs: {
      "id": "position--top-right"
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
      },
      "mousedown": function($event) {
        $event.stopPropagation();
      }
    }
  }, [_vm._c('div', {
    staticClass: "flex flex-center"
  }, [(_vm.sharedData.showUtilities.showNotes) ? _vm._c('div', {
    staticClass: "notes-widget relative",
    on: {
      "keydown": function($event) {
        $event.stopPropagation();
      }
    }
  }, [_vm._c('div', {
    staticClass: "notes-icon pointer",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.showNotes = !_vm.showNotes
      }
    }
  }, [_vm._c('svg', {
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
      "width": "1.8em"
    }
  }, [_vm._c('g', {
    attrs: {
      "id": "note_btn"
    }
  }, [_vm._c('path', {
    attrs: {
      "d": "M56.261,35.724l-2.849-2.85c-1.128-1.127-3.094-1.127-4.222,0L33.799,48.265l-2.121,7.779l-0.519,0.519   c-0.388,0.388-0.389,1.014-0.006,1.405l-0.005,0.02l0.019-0.005c0.194,0.19,0.446,0.288,0.699,0.288   c0.256,0,0.512-0.098,0.707-0.293l0.52-0.52l7.778-2.121l15.39-15.391C57.425,38.781,57.425,36.888,56.261,35.724z M36.108,48.784   l10.243-10.243l4.243,4.243L40.351,53.027L36.108,48.784z M35.206,50.71l3.22,3.22l-4.428,1.208L35.206,50.71z M54.847,38.531   l-2.839,2.839l-4.243-4.243l2.839-2.839c0.372-0.373,1.021-0.373,1.393,0l2.85,2.85C55.231,37.521,55.231,38.147,54.847,38.531z"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M8.135,36h26c0.552,0,1-0.447,1-1s-0.448-1-1-1h-26c-0.552,0-1,0.447-1,1S7.583,36,8.135,36z"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M30.135,40h-22c-0.552,0-1,0.447-1,1s0.448,1,1,1h22c0.552,0,1-0.447,1-1S30.688,40,30.135,40z"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M8.135,18h13c0.552,0,1-0.447,1-1s-0.448-1-1-1h-13c-0.552,0-1,0.447-1,1S7.583,18,8.135,18z"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M21.135,48c0.552,0,1-0.447,1-1s-0.448-1-1-1h-13c-0.552,0-1,0.447-1,1s0.448,1,1,1H21.135z"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M37.135,22h-29c-0.552,0-1,0.447-1,1s0.448,1,1,1h29c0.552,0,1-0.447,1-1S37.688,22,37.135,22z"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M8.135,30h14c0.552,0,1-0.447,1-1s-0.448-1-1-1h-14c-0.552,0-1,0.447-1,1S7.583,30,8.135,30z"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M38.135,29c0-0.553-0.448-1-1-1h-7c-0.552,0-1,0.447-1,1s0.448,1,1,1h7C37.688,30,38.135,29.553,38.135,29z"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M26.845,29.709c0.18-0.189,0.29-0.45,0.29-0.71s-0.11-0.52-0.29-0.71c-0.38-0.37-1.05-0.37-1.42,0   c-0.18,0.19-0.29,0.45-0.29,0.71c0,0.271,0.11,0.521,0.29,0.71c0.19,0.181,0.45,0.29,0.71,0.29   C26.395,29.999,26.656,29.89,26.845,29.709z"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M26.135,56h-23V8h7v2c0,0.553,0.448,1,1,1h23c0.552,0,1-0.447,1-1V8h7v22c0,0.553,0.448,1,1,1s1-0.447,1-1V7   c0-0.553-0.448-1-1-1h-8V4c0-0.553-0.448-1-1-1h-6V1c0-0.553-0.448-1-1-1h-9c-0.552,0-1,0.447-1,1v2h-6c-0.552,0-1,0.447-1,1v2h-8   c-0.552,0-1,0.447-1,1v50c0,0.553,0.448,1,1,1h24c0.552,0,1-0.447,1-1S26.688,56,26.135,56z M19.135,2h7v2v2h-7V4V2z M12.135,5h5v2   c0,0.553,0.448,1,1,1h9c0.552,0,1-0.447,1-1V5h5v2v2h-21V7V5z"
    }
  })])])]), _vm._v(" "), _vm._c('transition', [(_vm.showNotes) ? _vm._c('notes') : _vm._e()], 1)], 1) : _vm._e(), _vm._v(" "), _vm._c('div', {
    staticClass: "pointer nav-bar-opener relative",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.toggleCustomizeMenu($event)
      }
    }
  }, [_vm._c('svg', {
    attrs: {
      "enable-background": "new 0 0 20 20",
      "height": "2em",
      "version": "1.1",
      "viewBox": "0 0 100 100",
      "width": "2em",
      "xml:space": "preserve",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }
  }, [_vm._c('g', {
    attrs: {
      "id": "customize_btn"
    }
  }, [_vm._c('path', {
    attrs: {
      "d": "M86.139,41.691l-8.095-1.175c-0.276-0.762-0.539-1.506-0.864-2.219l4.987-6.622c1.406-1.882,1.123-4.653-0.673-6.448   l-5.846-5.854c-1.006-1.007-2.358-1.578-3.715-1.578c-1.006,0-1.947,0.32-2.73,0.904l-6.615,4.97   c-0.729-0.337-1.472-0.605-2.22-0.883l-1.179-7.984C58.85,12.447,56.68,11,54.141,11h-8.28c-2.539,0-4.709,1.447-5.048,3.803   l-1.18,7.96c-0.748,0.279-1.495,0.551-2.226,0.892l-6.611-4.96c-0.782-0.584-1.727-0.903-2.731-0.903   c-1.359,0-2.716,0.571-3.722,1.58l-5.856,5.852c-1.799,1.8-2.1,4.572-0.693,6.452l4.94,6.617c-0.337,0.728-0.665,1.473-0.941,2.225   l-7.928,1.175C11.567,42.023,10,44.147,10,46.741v8.276c0,2.594,1.565,4.719,3.862,5.051l8.097,1.176   c0.276,0.763,0.538,1.507,0.863,2.219l-4.987,6.622c-1.407,1.883-1.124,4.654,0.672,6.449l5.846,5.854   c1.005,1.008,2.356,1.582,3.713,1.582c1.006,0,1.951-0.313,2.733-0.896l6.614-4.954c0.728,0.337,1.473,0.635,2.221,0.913   l1.18,8.043C41.152,89.432,43.322,91,45.861,91h8.28c2.539,0,4.709-1.566,5.049-3.924l1.18-8.079   c0.742-0.276,1.488-0.548,2.227-0.892l6.611,4.959c0.779,0.584,1.725,0.903,2.73,0.903c1.358,0,2.717-0.571,3.724-1.579   l5.854-5.853c1.799-1.8,2.1-4.57,0.694-6.453l-4.94-6.615c0.34-0.733,0.666-1.479,0.941-2.225l7.93-1.175   C88.436,59.736,90,57.611,90,55.02v-8.277C90,44.147,88.436,42.023,86.139,41.691z M73.882,58.236   c-0.455,1.479-1.06,2.935-1.796,4.324l-0.749,1.407l6.683,8.925c-0.017,0.025-0.037,0.056-0.068,0.086l-5.854,5.856   c-0.027,0.028-0.056,0.052-0.08,0.067l-8.929-6.666l-1.407,0.75c-1.434,0.761-2.888,1.378-4.326,1.82l-1.523,0.488L54.236,86.68   C54.211,86.688,54.18,87,54.141,87h-8.28c-0.036,0-0.067-0.313-0.093-0.318l-1.596-11.3l-1.526-0.563   c-1.474-0.451-2.928-1.086-4.324-1.824l-1.409-0.764l-8.941,6.664c-0.021-0.015-0.043-0.037-0.066-0.06l-5.852-5.856   c-0.026-0.025-0.049-0.054-0.065-0.076l6.692-8.932l-0.76-1.412c-0.703-1.324-1.304-2.738-1.791-4.324l-0.514-1.521l-11.193-1.574   C14.419,55.104,14,55.063,14,55.02v-8.277c0-0.045,0.419-0.085,0.424-0.12l11.112-1.575l0.526-1.521   c0.456-1.482,1.09-2.938,1.825-4.325l0.762-1.408l-6.674-8.926c0.016-0.025,0.041-0.054,0.072-0.085l5.854-5.854   c0.028-0.028,0.058-0.049,0.083-0.066l8.929,6.671l1.409-0.744c1.436-0.762,2.89-1.363,4.324-1.804l1.524-0.457L45.765,15.2   c0.025-0.007,0.058-0.2,0.096-0.2h8.28c0.037,0,0.068,0.191,0.094,0.198l1.597,11.214l1.524,0.528   c1.486,0.457,2.94,1.092,4.324,1.827l1.409,0.761l8.94-6.665c0.02,0.016,0.043,0.037,0.066,0.061l5.85,5.854   c0.027,0.027,0.051,0.055,0.066,0.078l-6.689,8.932l0.758,1.411c0.693,1.311,1.313,2.765,1.791,4.325l0.516,1.521l11.189,1.575   C85.581,46.656,86,46.696,86,46.741v8.276c0,0.047-0.419,0.086-0.424,0.121l-11.111,1.574L73.882,58.236z"
    }
  }), _vm._v(" "), _vm._c('g', [_vm._c('path', {
    attrs: {
      "d": "M50.001,67.971c-9.61,0-17.428-7.82-17.428-17.43c0-9.61,7.818-17.429,17.428-17.429c9.608,0,17.429,7.818,17.429,17.429    C67.43,60.15,59.609,67.971,50.001,67.971z M50.001,37.187c-7.363,0-13.354,5.991-13.354,13.354    c0,7.363,5.991,13.354,13.354,13.354c7.362,0,13.354-5.988,13.354-13.354C63.354,43.178,57.363,37.187,50.001,37.187z"
    }
  })])])]), _vm._v(" "), _vm._c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.miscSettings.update.isSeen),
      expression: "!miscSettings.update.isSeen"
    }],
    staticClass: "whatsnew-notify"
  }, [_vm._v("!")])])])]), _vm._v(" "), _vm._c('div', {
    attrs: {
      "id": "position--top-left"
    }
  }, [_vm._c('transition', [(_vm.sharedData.showUtilities.showWeather) ? _vm._c('weather', {
    attrs: {
      "settings": _vm.componentsData.weather,
      "otherSettings": _vm.otherSettings
    },
    on: {
      "weatherInfoStateChange": _vm.weatherInfoStateChange
    }
  }) : _vm._e()], 1)], 1)])], 1), _vm._v(" "), _vm._c('transition', [(_vm.showCustomizeMenu) ? _vm._c('div', {
    attrs: {
      "id": "customize-section"
    }
  }, [_vm._c('div', {
    staticClass: "customization-overlay"
  }), _vm._v(" "), _vm._c('customize', {
    attrs: {
      "settings": _vm.sharedData,
      "id": "customize"
    },
    on: {
      "closeCustomizeMenu": _vm.toggleCustomizeMenu
    }
  })], 1) : _vm._e()])], 1) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-258c3f20", module.exports)
  }
}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._c('div', {
    staticClass: "flex flex-flow-column",
    on: {
      "click": function($event) {
        $event.stopPropagation();
      },
      "keydown": function($event) {
        $event.stopPropagation();
      },
      "mousedown": function($event) {
        $event.stopPropagation();
      }
    }
  }, [_vm._c('header', [_vm._c('div', {
    staticClass: "flex flex-center right"
  }, [_vm._c('div', {
    staticClass: "close-btn",
    on: {
      "click": _vm.closeCustomizeMenu
    }
  }, [_vm._c('svg', {
    attrs: {
      "width": "1.5em",
      "height": "1.5em",
      "viewBox": "0 0 12 12",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_vm._c('g', {
    attrs: {
      "stroke": "none",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_vm._c('g', {
    attrs: {
      "id": "close_btn",
      "fill-rule": "nonzero",
      "fill": "#999999"
    }
  }, [_vm._c('path', {
    attrs: {
      "d": "M6,0 C2.69169231,0 0,2.69146154 0,6 C0,9.30853846 2.69169231,12 6,12 C9.30830769,12 12,9.30853846 12,6 C12,2.69146154 9.30830769,0 6,0 Z M6,11.5384615 C2.94623077,11.5384615 0.461538462,9.05376923 0.461538462,6 C0.461538462,2.94623077 2.94623077,0.461538462 6,0.461538462 C9.05376923,0.461538462 11.5384615,2.94623077 11.5384615,6 C11.5384615,9.05376923 9.05376923,11.5384615 6,11.5384615 Z",
      "id": "Shape"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M8.24007692,3.75992308 C8.14984615,3.66969231 8.004,3.66969231 7.91376923,3.75992308 L6,5.67369231 L4.08623077,3.75992308 C3.996,3.66969231 3.85015385,3.66969231 3.75992308,3.75992308 C3.66969231,3.85015385 3.66969231,3.996 3.75992308,4.08623077 L5.67369231,6 L3.75992308,7.91376923 C3.66969231,8.004 3.66969231,8.14984615 3.75992308,8.24007692 C3.80492308,8.28507692 3.864,8.30769231 3.92307692,8.30769231 C3.98215385,8.30769231 4.04123077,8.28507692 4.08623077,8.24007692 L6,6.32630769 L7.91376923,8.24007692 C7.95876923,8.28507692 8.01784615,8.30769231 8.07692308,8.30769231 C8.136,8.30769231 8.19507692,8.28507692 8.24007692,8.24007692 C8.33030769,8.14984615 8.33030769,8.004 8.24007692,7.91376923 L6.32630769,6 L8.24007692,4.08623077 C8.33030769,3.996 8.33030769,3.85015385 8.24007692,3.75992308 Z",
      "id": "Shape"
    }
  })])])])])]), _vm._v(" "), _vm._c('span', [_vm._v("Customize (C)")])]), _vm._v(" "), _vm._c('div', {
    staticClass: "flex-grow-1 flex main-window"
  }, [_vm._c('aside', {
    staticClass: "csidebar"
  }, [_vm._c('ul', [_vm._c('li', [_vm._c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.activeTab),
      expression: "activeTab"
    }],
    attrs: {
      "type": "radio",
      "value": "general",
      "id": "tab4"
    },
    domProps: {
      "checked": _vm._q(_vm.activeTab, "general")
    },
    on: {
      "change": [function($event) {
        _vm.activeTab = "general"
      }, function($event) {
        _vm.onChange('changeTab')
      }]
    }
  }), _vm._v(" "), _vm._c('label', {
    staticClass: "flex-center",
    class: {
      'active': _vm.activeTab === 'general'
    },
    attrs: {
      "for": "tab4"
    }
  }, [_vm._c('svg', {
    attrs: {
      "viewBox": "0 0 21 21"
    }
  }, [_vm._c('use', {
    attrs: {
      "xlink:href": "#icon-general"
    }
  })]), _vm._v(" "), _vm._c('span', [_vm._v("General")])])]), _vm._v(" "), _vm._c('li', [_vm._c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.activeTab),
      expression: "activeTab"
    }],
    attrs: {
      "type": "radio",
      "value": "background",
      "id": "tab1"
    },
    domProps: {
      "checked": _vm._q(_vm.activeTab, "background")
    },
    on: {
      "change": [function($event) {
        _vm.activeTab = "background"
      }, function($event) {
        _vm.onChange('changeTab')
      }]
    }
  }), _vm._v(" "), _vm._c('label', {
    staticClass: "flex-center",
    class: {
      'active': _vm.activeTab === 'background'
    },
    attrs: {
      "for": "tab1"
    }
  }, [_vm._c('svg', {
    attrs: {
      "viewBox": "0 0 21 21"
    }
  }, [_vm._c('use', {
    attrs: {
      "xlink:href": "#icon-wallpaper"
    }
  })]), _vm._v(" "), _vm._c('span', [_vm._v("Wallpaper")])])]), _vm._v(" "), _vm._c('li', [_vm._c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.activeTab),
      expression: "activeTab"
    }],
    attrs: {
      "type": "radio",
      "value": "clock",
      "id": "tab2"
    },
    domProps: {
      "checked": _vm._q(_vm.activeTab, "clock")
    },
    on: {
      "change": [function($event) {
        _vm.activeTab = "clock"
      }, function($event) {
        _vm.onChange('changeTab')
      }]
    }
  }), _vm._v(" "), _vm._c('label', {
    staticClass: "flex-center",
    class: {
      'active': _vm.activeTab === 'clock'
    },
    attrs: {
      "for": "tab2"
    }
  }, [_vm._c('svg', [_vm._c('use', {
    attrs: {
      "xlink:href": "#icon-clock"
    }
  })]), _vm._v(" "), _vm._c('span', [_vm._v("Clock")])])]), _vm._v(" "), _vm._c('li', [_vm._c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.activeTab),
      expression: "activeTab"
    }],
    attrs: {
      "type": "radio",
      "value": "weather",
      "id": "tab3"
    },
    domProps: {
      "checked": _vm._q(_vm.activeTab, "weather")
    },
    on: {
      "change": [function($event) {
        _vm.activeTab = "weather"
      }, function($event) {
        _vm.onChange('changeTab')
      }]
    }
  }), _vm._v(" "), _vm._c('label', {
    staticClass: "flex-center",
    class: {
      'active': _vm.activeTab === 'weather'
    },
    attrs: {
      "for": "tab3"
    }
  }, [_vm._c('svg', {
    attrs: {
      "viewBox": "0 0 21 21"
    }
  }, [_vm._c('use', {
    attrs: {
      "xlink:href": "#icon-weather"
    }
  })]), _vm._v(" "), _vm._c('span', [_vm._v("Weather")])])]), _vm._v(" "), _vm._c('li', {
    staticClass: "separator"
  }, [_vm._c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.activeTab),
      expression: "activeTab"
    }],
    attrs: {
      "type": "radio",
      "value": "whatsnew",
      "id": "tab5"
    },
    domProps: {
      "checked": _vm._q(_vm.activeTab, "whatsnew")
    },
    on: {
      "change": [function($event) {
        _vm.activeTab = "whatsnew"
      }, function($event) {
        _vm.onChange('changeTab')
      }]
    }
  }), _vm._v(" "), _vm._c('label', {
    staticClass: "flex-center",
    class: {
      'active': _vm.activeTab === 'whatsnew'
    },
    attrs: {
      "for": "tab5"
    }
  }, [_vm._c('svg', {
    attrs: {
      "viewBox": "0 0 21 21"
    }
  }, [_vm._c('use', {
    attrs: {
      "xlink:href": "#icon-whatsnew"
    }
  })]), _vm._v(" "), _vm._c('span', [_vm._v("What's new")])])])])]), _vm._v(" "), _vm._c('div', {
    staticClass: "container"
  }, [(_vm.activeTab === 'general') ? _vm._c('section', [_vm._c('div', [_vm._c('h4', {
    staticClass: "font-medium text-black semi-bold"
  }, [_vm._v("Show/hide Widgets")]), _vm._v(" "), _vm._c('ul', {
    staticClass: "ph-10"
  }, [_vm._c('li', {
    staticClass: "inline-list-item"
  }, [_vm._m(0), _vm._v(" "), _vm._c('div', {
    staticClass: "switch"
  }, [_vm._c('label', [_vm._c('input', {
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
      "checked": Array.isArray(_vm.settings.showUtilities.showWeather) ? _vm._i(_vm.settings.showUtilities.showWeather, null) > -1 : (_vm.settings.showUtilities.showWeather)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.settings.showUtilities.showWeather,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.settings.showUtilities.showWeather = $$a.concat([$$v]))
          } else {
            $$i > -1 && (_vm.settings.showUtilities.showWeather = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.$set(_vm.settings.showUtilities, "showWeather", $$c)
        }
      }
    }
  }), _vm._v(" "), _vm._c('span', {
    staticClass: "lever mar-0"
  })])])]), _vm._v(" "), _vm._c('li', {
    staticClass: "inline-list-item"
  }, [_vm._m(1), _vm._v(" "), _vm._c('div', {
    staticClass: "switch"
  }, [_vm._c('label', [_vm._c('input', {
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
      "checked": Array.isArray(_vm.settings.showUtilities.showClock) ? _vm._i(_vm.settings.showUtilities.showClock, null) > -1 : (_vm.settings.showUtilities.showClock)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.settings.showUtilities.showClock,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.settings.showUtilities.showClock = $$a.concat([$$v]))
          } else {
            $$i > -1 && (_vm.settings.showUtilities.showClock = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.$set(_vm.settings.showUtilities, "showClock", $$c)
        }
      }
    }
  }), _vm._v(" "), _vm._c('span', {
    staticClass: "lever mar-0"
  })])])]), _vm._v(" "), _vm._c('li', {
    staticClass: "inline-list-item"
  }, [_vm._m(2), _vm._v(" "), _vm._c('div', {
    staticClass: "switch"
  }, [_vm._c('label', [_vm._c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.settings.showUtilities.showNotes),
      expression: "settings.showUtilities.showNotes"
    }],
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": Array.isArray(_vm.settings.showUtilities.showNotes) ? _vm._i(_vm.settings.showUtilities.showNotes, null) > -1 : (_vm.settings.showUtilities.showNotes)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.settings.showUtilities.showNotes,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.settings.showUtilities.showNotes = $$a.concat([$$v]))
          } else {
            $$i > -1 && (_vm.settings.showUtilities.showNotes = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.$set(_vm.settings.showUtilities, "showNotes", $$c)
        }
      }
    }
  }), _vm._v(" "), _vm._c('span', {
    staticClass: "lever mar-0"
  })])])])])])]) : _vm._e(), _vm._v(" "), (_vm.activeTab === 'background') ? _vm._c('section', [_vm._c('div', [_vm._c('h4', {
    staticClass: "font-medium text-black semi-bold"
  }, [_vm._v("Settings")]), _vm._v(" "), _vm._c('ul', {
    staticClass: "ph-10"
  }, [_vm._c('li', {
    staticClass: "inline-list-item"
  }, [_vm._m(3), _vm._v(" "), _vm._c('div', {
    staticClass: "right"
  }, [_vm._c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.settings.background.changeInterval),
      expression: "settings.background.changeInterval"
    }],
    staticClass: "filled-in",
    attrs: {
      "type": "radio",
      "id": "bgInterval1",
      "value": "1"
    },
    domProps: {
      "checked": _vm._q(_vm.settings.background.changeInterval, "1")
    },
    on: {
      "change": [function($event) {
        _vm.$set(_vm.settings.background, "changeInterval", "1")
      }, function($event) {
        _vm.onChange('backgroundInterval')
      }]
    }
  }), _vm._v(" "), _vm._c('label', {
    staticClass: "inline-radio",
    attrs: {
      "for": "bgInterval1"
    }
  }, [_vm._v("1 tab")]), _vm._v(" "), _vm._c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.settings.background.changeInterval),
      expression: "settings.background.changeInterval"
    }],
    staticClass: "filled-in",
    attrs: {
      "type": "radio",
      "id": "bgInterval2",
      "value": "2"
    },
    domProps: {
      "checked": _vm._q(_vm.settings.background.changeInterval, "2")
    },
    on: {
      "change": [function($event) {
        _vm.$set(_vm.settings.background, "changeInterval", "2")
      }, function($event) {
        _vm.onChange('backgroundInterval')
      }]
    }
  }), _vm._v(" "), _vm._c('label', {
    staticClass: "inline-radio",
    attrs: {
      "for": "bgInterval2"
    }
  }, [_vm._v("2 tabs")]), _vm._v(" "), _vm._c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.settings.background.changeInterval),
      expression: "settings.background.changeInterval"
    }],
    staticClass: "filled-in",
    attrs: {
      "type": "radio",
      "id": "bgInterval5",
      "value": "5"
    },
    domProps: {
      "checked": _vm._q(_vm.settings.background.changeInterval, "5")
    },
    on: {
      "change": [function($event) {
        _vm.$set(_vm.settings.background, "changeInterval", "5")
      }, function($event) {
        _vm.onChange('backgroundInterval')
      }]
    }
  }), _vm._v(" "), _vm._c('label', {
    staticClass: "inline-radio",
    attrs: {
      "for": "bgInterval5"
    }
  }, [_vm._v("5 tabs")]), _vm._v(" "), _vm._c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.settings.background.changeInterval),
      expression: "settings.background.changeInterval"
    }],
    staticClass: "filled-in",
    attrs: {
      "type": "radio",
      "id": "bgInterval10",
      "value": "10"
    },
    domProps: {
      "checked": _vm._q(_vm.settings.background.changeInterval, "10")
    },
    on: {
      "change": [function($event) {
        _vm.$set(_vm.settings.background, "changeInterval", "10")
      }, function($event) {
        _vm.onChange('backgroundInterval')
      }]
    }
  }), _vm._v(" "), _vm._c('label', {
    staticClass: "inline-radio",
    attrs: {
      "for": "bgInterval10"
    }
  }, [_vm._v("10 tabs")])])]), _vm._v(" "), _vm._c('li', {
    staticClass: "inline-list-item"
  }, [_vm._m(4), _vm._v(" "), _vm._c('div', {
    staticClass: "right"
  }, [_vm._c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.settings.background.type),
      expression: "settings.background.type"
    }],
    staticClass: "filled-in",
    attrs: {
      "type": "radio",
      "id": "wallpaperType2",
      "value": "predefined"
    },
    domProps: {
      "checked": _vm._q(_vm.settings.background.type, "predefined")
    },
    on: {
      "change": [function($event) {
        _vm.$set(_vm.settings.background, "type", "predefined")
      }, function($event) {
        _vm.onChange('backgroundType')
      }]
    }
  }), _vm._v(" "), _vm._c('label', {
    staticClass: "inline-radio",
    attrs: {
      "for": "wallpaperType2"
    }
  }, [_vm._v("Default")]), _vm._v(" "), _vm._c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.settings.background.type),
      expression: "settings.background.type"
    }],
    staticClass: "filled-in",
    attrs: {
      "type": "radio",
      "id": "wallpaperType1",
      "value": "custom"
    },
    domProps: {
      "checked": _vm._q(_vm.settings.background.type, "custom")
    },
    on: {
      "change": [function($event) {
        _vm.$set(_vm.settings.background, "type", "custom")
      }, function($event) {
        _vm.onChange('backgroundType')
      }]
    }
  }), _vm._v(" "), _vm._c('label', {
    staticClass: "inline-radio",
    attrs: {
      "for": "wallpaperType1"
    }
  }, [_vm._v("Custom")])])])])]), _vm._v(" "), (_vm.settings.background.type !== 'custom') ? _vm._c('div', {
    class: {
      'fade_in': _vm.settings.background.type !== 'custom'
    }
  }, [_vm._c('h4', {
    staticClass: "font-medium text-black semi-bold"
  }, [_vm._v("Default Category")]), _vm._v(" "), _vm._c('ul', {
    staticClass: "flex"
  }, _vm._l((_vm.themes), function(theme, index) {
    return _vm._c('li', {
      staticClass: "thumbnail",
      class: {
        active: _vm.isActiveTheme(index)
      }
    }, [_vm._c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.settings.background.themeId),
        expression: "settings.background.themeId"
      }],
      staticClass: "hide",
      attrs: {
        "type": "radio",
        "id": theme.value
      },
      domProps: {
        "value": theme.id,
        "checked": _vm._q(_vm.settings.background.themeId, theme.id)
      },
      on: {
        "change": function($event) {
          _vm.$set(_vm.settings.background, "themeId", theme.id)
        }
      }
    }), _vm._v(" "), _vm._c('div', {
      staticClass: "thumbnail-image",
      style: ({
        'background-image': 'url(' + theme.imgUrl + ')'
      }),
      on: {
        "click": function($event) {
          _vm.selectActive(index)
        }
      }
    }), _vm._v(" "), _vm._c('p', {
      staticClass: "thumbnail-name font-center"
    }, [_vm._v(_vm._s(theme.lValue))])])
  }))]) : _vm._e(), _vm._v(" "), (_vm.settings.background.type === 'custom') ? _vm._c('div', {
    class: {
      'fade_in': _vm.settings.background.type === 'custom'
    }
  }, [_vm._c('h4', {
    staticClass: "font-medium text-black semi-bold"
  }, [_vm._v("Custom List")]), _vm._v(" "), _vm._c('small', [_vm._v("Add each image url in new line and press save list button. Image url should end with (.png, .jpg)")]), _vm._v(" "), _vm._c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.currentBgCustom),
      expression: "currentBgCustom"
    }],
    attrs: {
      "name": "",
      "id": "",
      "cols": "30",
      "rows": "15"
    },
    domProps: {
      "value": (_vm.currentBgCustom)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.currentBgCustom = $event.target.value
      }
    }
  }), _vm._v(" "), _vm._c('button', {
    staticClass: "save-button font-xsmall mar-0",
    attrs: {
      "disabled": !_vm.currentBgCustom.trim().length
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.saveCustomBg($event)
      }
    }
  }, [_vm._v("Save List")]), _vm._v(" "), _vm._c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.isCustomBgSaveMsg)
    }
  })]) : _vm._e()]) : _vm._e(), _vm._v(" "), (_vm.activeTab === 'clock') ? _vm._c('section', [_vm._c('div', [_vm._c('h4', {
    staticClass: "font-medium text-black semi-bold"
  }, [_vm._v("Settings")]), _vm._v(" "), _vm._c('ul', {
    staticClass: "ph-10"
  }, [_vm._c('li', {
    staticClass: "inline-list-item"
  }, [_vm._m(5), _vm._v(" "), _vm._c('div', {
    staticClass: "right"
  }, [_vm._c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.settings.clock.type),
      expression: "settings.clock.type"
    }],
    staticClass: "filled-in",
    attrs: {
      "type": "radio",
      "id": "clock12",
      "value": "twelve"
    },
    domProps: {
      "checked": _vm._q(_vm.settings.clock.type, "twelve")
    },
    on: {
      "change": function($event) {
        _vm.$set(_vm.settings.clock, "type", "twelve")
      }
    }
  }), _vm._v(" "), _vm._c('label', {
    staticClass: "inline-radio",
    attrs: {
      "for": "clock12"
    }
  }, [_vm._v("12 Hour")]), _vm._v(" "), _vm._c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.settings.clock.type),
      expression: "settings.clock.type"
    }],
    staticClass: "filled-in",
    attrs: {
      "type": "radio",
      "id": "clock24",
      "value": "twentyfour"
    },
    domProps: {
      "checked": _vm._q(_vm.settings.clock.type, "twentyfour")
    },
    on: {
      "change": function($event) {
        _vm.$set(_vm.settings.clock, "type", "twentyfour")
      }
    }
  }), _vm._v(" "), _vm._c('label', {
    staticClass: "inline-radio",
    attrs: {
      "for": "clock24"
    }
  }, [_vm._v("24 Hour")])])]), _vm._v(" "), _vm._c('li', {
    staticClass: "inline-list-item"
  }, [_vm._m(6), _vm._v(" "), _vm._c('div', {
    staticClass: "switch"
  }, [_vm._c('label', [_vm._c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.settings.clock.showDay),
      expression: "settings.clock.showDay"
    }],
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": Array.isArray(_vm.settings.clock.showDay) ? _vm._i(_vm.settings.clock.showDay, null) > -1 : (_vm.settings.clock.showDay)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.settings.clock.showDay,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.settings.clock.showDay = $$a.concat([$$v]))
          } else {
            $$i > -1 && (_vm.settings.clock.showDay = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.$set(_vm.settings.clock, "showDay", $$c)
        }
      }
    }
  }), _vm._v(" "), _vm._c('span', {
    staticClass: "lever mar-0"
  })])])])])])]) : _vm._e(), _vm._v(" "), (_vm.activeTab === 'weather') ? _vm._c('section', [_vm._c('div', [_vm._c('h4', {
    staticClass: "font-medium text-black semi-bold"
  }, [_vm._v("Location settings")]), _vm._v(" "), _vm._c('ul', {
    staticClass: "ph-10"
  }, [_vm._c('li', {
    staticClass: "inline-list-item"
  }, [_vm._m(7), _vm._v(" "), _vm._c('div', {
    staticClass: "right"
  }, [_vm._c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.settings.weather.location.type),
      expression: "settings.weather.location.type"
    }],
    staticClass: "filled-in",
    attrs: {
      "type": "radio",
      "id": "weather-geo",
      "value": "geo"
    },
    domProps: {
      "checked": _vm._q(_vm.settings.weather.location.type, "geo")
    },
    on: {
      "change": [function($event) {
        _vm.$set(_vm.settings.weather.location, "type", "geo")
      }, function($event) {
        _vm.onChange('weatherLocationType')
      }]
    }
  }), _vm._v(" "), _vm._c('label', {
    staticClass: "inline-radio",
    attrs: {
      "for": "weather-geo"
    }
  }, [_vm._v("Default Geolocation")]), _vm._v(" "), _vm._c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.settings.weather.location.type),
      expression: "settings.weather.location.type"
    }],
    staticClass: "filled-in",
    attrs: {
      "type": "radio",
      "id": "weather-custom",
      "value": "custom"
    },
    domProps: {
      "checked": _vm._q(_vm.settings.weather.location.type, "custom")
    },
    on: {
      "change": [function($event) {
        _vm.$set(_vm.settings.weather.location, "type", "custom")
      }, function($event) {
        _vm.onChange('weatherLocationType')
      }]
    }
  }), _vm._v(" "), _vm._c('label', {
    staticClass: "inline-radio",
    attrs: {
      "for": "weather-custom"
    }
  }, [_vm._v("Custom")])])]), _vm._v(" "), _vm._c('li', {
    staticClass: "inline-list-item flex overflow-hidden flex-center flex-justify-space-between"
  }, [_vm._m(8), _vm._v(" "), _vm._c('div', {
    staticClass: "right flex"
  }, [_vm._c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.customLocation),
      expression: "customLocation"
    }],
    staticClass: "mar-0",
    attrs: {
      "placeholder": "e.g. Mumbai",
      "type": "text",
      "disabled": _vm.settings.weather.location.type === 'geo'
    },
    domProps: {
      "value": (_vm.customLocation)
    },
    on: {
      "keydown": function($event) {
        $event.stopPropagation();
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.customLocation = $event.target.value
      }
    }
  }), _vm._v(" "), _vm._c('button', {
    staticClass: "save-button font-xsmall",
    attrs: {
      "disabled": _vm.customLocation == _vm.settings.weather.location.name
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.updateCustomLocation($event)
      }
    }
  }, [_vm._v("Save")])])])]), _vm._v(" "), _vm._c('h4', {
    staticClass: "font-medium text-black semi-bold"
  }, [_vm._v("Miscellaneous Settings")]), _vm._v(" "), _vm._c('ul', {
    staticClass: "ph-10"
  }, [_vm._c('li', {
    staticClass: "inline-list-item"
  }, [_vm._c('span', {
    staticClass: "font-small semi-bold"
  }, [_vm._v("Temperature Unit")]), _vm._v(" "), _vm._c('div', {
    staticClass: "right"
  }, [_vm._c('input', {
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
      "value": "c"
    },
    domProps: {
      "checked": _vm._q(_vm.settings.weather.unit, "c")
    },
    on: {
      "change": function($event) {
        _vm.$set(_vm.settings.weather, "unit", "c")
      }
    }
  }), _vm._v(" "), _vm._c('label', {
    staticClass: "inline-radio",
    attrs: {
      "for": "weather-celcius"
    }
  }, [_vm._v("Celsius")]), _vm._v(" "), _vm._c('input', {
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
      "value": "f"
    },
    domProps: {
      "checked": _vm._q(_vm.settings.weather.unit, "f")
    },
    on: {
      "change": function($event) {
        _vm.$set(_vm.settings.weather, "unit", "f")
      }
    }
  }), _vm._v(" "), _vm._c('label', {
    staticClass: "inline-radio",
    attrs: {
      "for": "weather-fehren"
    }
  }, [_vm._v("Fahrenheit")])])])])])]) : _vm._e(), _vm._v(" "), (_vm.activeTab === 'whatsnew') ? _vm._c('section', {
    staticClass: "full-height"
  }, [_vm._c('whats-new', {
    staticClass: "full-height"
  })], 1) : _vm._e()])]), _vm._v(" "), _vm._c('footer', {
    staticClass: "customize-footer font-xsmall flex flex-justify-space-between bg-light-grey"
  }, [_vm._c('div', {
    staticClass: "flex"
  }, [_vm._c('span', {
    staticClass: "version"
  }, [_vm._v("v" + _vm._s(_vm.version))]), _vm._v(" "), _vm._c('span', {
    staticStyle: {
      "margin": "0 0.5em"
    }
  }, [_vm._v("|")]), _vm._v(" "), _vm._m(9)]), _vm._v(" "), _vm._m(10)]), _vm._v(" "), _vm._c('svg', {
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }
  }, [_vm._c('defs', [_vm._c('g', {
    attrs: {
      "id": "icon-general"
    }
  }, [_vm._c('path', {
    attrs: {
      "d": "M10.05774,8.83187063 L0.45885,8.83187063 C0.503546734,8.83187063 0.53885,8.86729826 0.53885,8.91039111 C0.53885,8.95348396 0.503546734,8.98891159 0.45885,8.98891159 L10.05774,8.98891159 C10.0130433,8.98891159 9.97774,8.95348396 9.97774,8.91039111 C9.97774,8.86729826 10.0130433,8.83187063 10.05774,8.83187063 Z"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M20.56047,8.83187063 L15.46755,8.83187063 C15.5122467,8.83187063 15.54755,8.86729826 15.54755,8.91039111 C15.54755,8.95348396 15.5122467,8.98891159 15.46755,8.98891159 L20.56047,8.98891159 C20.5157733,8.98891159 20.48047,8.95348396 20.48047,8.91039111 C20.48047,8.86740955 20.5158719,8.83187063 20.56047,8.83187063 Z"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M7.24563,16.1486849 L0.45885,16.1486849 C0.503546734,16.1486849 0.53885,16.1841125 0.53885,16.2272053 C0.53885,16.2702982 0.503546734,16.3057258 0.45885,16.3057258 L7.24563,16.3057258 C7.20093327,16.3057258 7.16563,16.2702982 7.16563,16.2272053 C7.16563,16.1841125 7.20093327,16.1486849 7.24563,16.1486849 Z"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M20.56047,16.1486849 L12.76254,16.1486849 C12.8072367,16.1486849 12.84254,16.1841125 12.84254,16.2272053 C12.84254,16.2702982 12.8072367,16.3057258 12.76254,16.3057258 L20.56047,16.3057258 C20.5157733,16.3057258 20.48047,16.2702982 20.48047,16.2272053 C20.48047,16.1842238 20.5158719,16.1486849 20.56047,16.1486849 Z"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M4.41273,1.95388683 L0.45885,1.95388683 C0.503546734,1.95388683 0.53885,1.98931445 0.53885,2.03240731 C0.53885,2.07550016 0.503546734,2.11092778 0.45885,2.11092778 L4.41273,2.11092778 C4.36803327,2.11092778 4.33273,2.07550016 4.33273,2.03240731 C4.33273,1.98931445 4.36803327,1.95388683 4.41273,1.95388683 Z"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M20.56047,1.95388683 L9.82296,1.95388683 C9.86765673,1.95388683 9.90296,1.98931445 9.90296,2.03240731 C9.90296,2.07550016 9.86765673,2.11092778 9.82296,2.11092778 L20.56047,2.11092778 C20.5157733,2.11092778 20.48047,2.07550016 20.48047,2.03240731 C20.48047,1.98942575 20.5158719,1.95388683 20.56047,1.95388683 Z"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M6.00936,3.55593048 C5.17394673,3.55593048 4.49252,2.87210331 4.49252,2.03198583 C4.49252,1.19192447 5.17389062,0.508251908 6.00936,0.508251908 C6.84482938,0.508251908 7.5262,1.19192447 7.5262,2.03198583 C7.5262,2.8722333 6.84485383,3.55593048 6.00936,3.55593048 Z M6.00936,0.351210949 C5.08396963,0.351210949 4.33252,1.10521479 4.33252,2.03198583 C4.33252,2.95892123 5.08392327,3.71297144 6.00936,3.71297144 C6.93479673,3.71297144 7.6862,2.95892123 7.6862,2.03198583 C7.6862,1.10521479 6.93475037,0.351210949 6.00936,0.351210949 Z"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M8.84226,17.7515715 C8.00682229,17.7515715 7.32542,17.0677197 7.32542,16.2274161 C7.32542,15.3872986 8.00684673,14.7034714 8.84226,14.7034714 C9.67798827,14.7034714 10.35931,15.3871932 10.35931,16.2274161 C10.3594681,17.0677807 9.67807764,17.7515715 8.84226,17.7515715 Z M8.84226,14.5464305 C7.91682327,14.5464305 7.16542,15.3004807 7.16542,16.2274161 C7.16542,17.1546676 7.91671827,17.9086124 8.84226,17.9086124 C9.76790673,17.9086124 10.51931,17.1545622 10.51931,16.2274161 C10.5196089,15.3005556 9.76794582,14.5464305 8.84226,14.5464305 Z"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M11.65521,10.4345465 C10.8192962,10.4345465 10.13774,9.75063858 10.13774,8.91039111 C10.13774,8.07028052 10.8193695,7.38644645 11.65521,7.38644645 C12.4904621,7.38644645 13.17163,8.07011212 13.17163,8.91039111 C13.17163,9.75072622 12.490406,10.4345465 11.65521,10.4345465 Z M11.65521,7.22940549 C10.7294337,7.22940549 9.97774,7.98337562 9.97774,8.91039111 C9.97774,9.83751199 10.7295386,10.5915875 11.65521,10.5915875 C12.5804586,10.5915875 13.33163,9.83730545 13.33163,8.91039111 C13.33163,7.98348942 12.5804708,7.22940549 11.65521,7.22940549 Z"
    }
  })]), _vm._v(" "), _vm._c('g', {
    attrs: {
      "id": "icon-clock"
    }
  }, [_vm._c('circle', {
    attrs: {
      "id": "Oval",
      "cx": "10.5",
      "cy": "10.5",
      "r": "9.13133536"
    }
  }), _vm._v(" "), _vm._c('polyline', {
    attrs: {
      "id": "Shape",
      "transform": "translate(10.842248, 8.898166) rotate(-51.000000) translate(-10.842248, -8.898166) ",
      "points": "6.49624149 8.22774104 9.10632618 11.3606903 15.1882544 6.43564197"
    }
  })]), _vm._v(" "), _vm._c('g', {
    attrs: {
      "id": "icon-wallpaper"
    }
  }, [_vm._c('polyline', {
    attrs: {
      "id": "Shape",
      "points": "0.00857797986 14.8245426 5.23298105 8.6542509 11.1104345 15.595829"
    }
  }), _vm._v(" "), _vm._c('polyline', {
    attrs: {
      "id": "Shape",
      "points": "8.11946374 11.4834513 14.158003 0.170099836 20.8539462 12.7060758"
    }
  }), _vm._v(" "), _vm._c('ellipse', {
    attrs: {
      "id": "Oval",
      "cx": "6.9321391",
      "cy": "3.82227375",
      "rx": "1.95915115",
      "ry": "1.91656091"
    }
  })]), _vm._v(" "), _vm._c('g', {
    attrs: {
      "id": "icon-weather"
    }
  }, [_vm._c('path', {
    attrs: {
      "d": "M18.9567406,12.9043462 C18.9567406,13.9575538 18.1324913,14.826995 17.1176733,14.826995 L7.25454115,14.826995 C5.60604239,14.826995 4.29641646,13.4258931 4.29641646,11.7177447 C4.29641646,11.0004029 4.53261347,10.3403561 4.93009726,9.81375234 C5.47417955,9.08629676 6.3244414,8.61870636 7.28064838,8.61870636 C7.42397756,8.61870636 7.56569576,8.62292862 7.70419202,8.64487453 C8.00392768,7.38065228 8.77112968,6.30589152 9.80551621,5.63244155 C10.5401671,5.15139885 11.4116559,4.87479193 12.343414,4.87479193 C14.9806708,4.87479193 17.1178155,7.08936565 17.1178155,9.82204956 C17.1178155,10.2237531 17.072187,10.6137227 16.9842469,10.9884235 C17.028217,10.9850358 17.0722344,10.9919093 17.1178155,10.9919093 C18.1325387,10.9918602 18.9567406,11.8527587 18.9567406,12.9043462 Z"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M9.80542145,5.63278522 C8.77103491,6.30623519 8.00383292,7.38143781 7.70409726,8.64561097 C7.56564838,8.62366506 7.42393017,8.62027743 7.28055362,8.62027743 C6.32439401,8.62027743 5.47408479,9.089488 4.93000249,9.81699267 C3.83861596,9.2211635 3.09420449,8.03628039 3.09420449,6.6691038 C3.09420449,4.70609804 4.63031421,3.11445449 6.52472319,3.11445449 C8.07225187,3.11445449 9.37865586,4.17448644 9.80542145,5.63278522 Z"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M6.46,0 L6.46,1.86564838"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M0,6.69375 L1.80049875,6.69375"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M9.74268828,3.39602011 L11.065818,2.02501403"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M1.79016958,11.3939565 L3.11329925,10.0229504"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M1.79016958,2.02501403 L3.11329925,3.39602011"
    }
  })]), _vm._v(" "), _vm._c('g', {
    attrs: {
      "id": "icon-whatsnew"
    }
  }, [_vm._c('path', {
    attrs: {
      "d": "M17.1432424,1.48612748 C18.8262781,1.48612748 20.1395453,2.95036374 19.9566757,4.62374579 L19.0055056,13.3268203 C18.8462784,14.7829455 17.6770643,15.8494186 16.0271805,15.8494186 L15.6098951,15.8494186 L15.5352461,16.2599727 L15.1542502,18.3553726 C15.0286389,19.0466277 14.1734653,19.3090833 13.681496,18.8089868 L10.9157511,15.9987006 L10.7688351,15.8494186 L10.5593849,15.8494186 L4.62197891,15.8494186 C3.17492962,15.8494186 1.96595019,14.765394 1.8086188,13.3267848 L0.857452054,4.62374096 C0.674511168,2.95069577 1.98743707,1.48612748 3.67080828,1.48612748 L17.1432424,1.48612748 Z"
    }
  }), _vm._v(" "), _vm._c('circle', {
    attrs: {
      "fill-rule": "nonzero",
      "cx": "6.86892358",
      "cy": "9.03592685",
      "r": "1"
    }
  }), _vm._v(" "), _vm._c('circle', {
    attrs: {
      "fill-rule": "nonzero",
      "cx": "10.4069865",
      "cy": "9.03592685",
      "r": "1"
    }
  }), _vm._v(" "), _vm._c('circle', {
    attrs: {
      "fill-rule": "nonzero",
      "cx": "13.9450495",
      "cy": "9.03592685",
      "r": "1"
    }
  })])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._c('div', [_vm._c('div', {
    staticClass: "font-small semi-bold"
  }, [_vm._v("Weather widget")]), _vm._v(" "), _vm._c('small', [_vm._v("Show/hide weather widget")])])
},function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._c('div', [_vm._c('div', {
    staticClass: "font-small semi-bold"
  }, [_vm._v("Date & Time widget")]), _vm._v(" "), _vm._c('small', [_vm._v("Show/hide date and time widget")])])
},function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._c('div', [_vm._c('div', {
    staticClass: "font-small semi-bold"
  }, [_vm._v("Notes widget")]), _vm._v(" "), _vm._c('small', [_vm._v("Show/hide notes widget")])])
},function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._c('div', [_vm._c('div', {
    staticClass: "font-small semi-bold"
  }, [_vm._v("Wallpaper Change Interval (new tabs)")]), _vm._v(" "), _vm._c('small', [_vm._v("Choose lower value with high internet speed to prevent loading.")])])
},function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._c('div', [_vm._c('div', {
    staticClass: "font-small semi-bold"
  }, [_vm._v("Wallpaper Type")]), _vm._v(" "), _vm._c('small', [_vm._v("Choose default for Subtle collection or add custom wallpapers")])])
},function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._c('div', [_vm._c('div', {
    staticClass: "font-small semi-bold"
  }, [_vm._v("Clock format")]), _vm._v(" "), _vm._c('small', [_vm._v("Choose 12 hour or 24 hour clock format")])])
},function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._c('div', [_vm._c('div', {
    staticClass: "font-small semi-bold"
  }, [_vm._v("Date (show/hide)")]), _vm._v(" "), _vm._c('small', [_vm._v("Show/hide date along with time")])])
},function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._c('div', [_vm._c('div', {
    staticClass: "font-small semi-bold"
  }, [_vm._v("Location type")]), _vm._v(" "), _vm._c('small', [_vm._v("Choose either default geo-location or add custom location")])])
},function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._c('div', [_vm._c('div', {
    staticClass: "font-small semi-bold"
  }, [_vm._v("City/Town/Village Name")]), _vm._v(" "), _vm._c('small', [_vm._v("Enter correct name and press save button.")])])
},function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._c('div', {
    staticClass: "flex"
  }, [_vm._c('span', {
    staticClass: "semi-bold"
  }, [_vm._v("Shortcuts")]), _vm._v(" "), _vm._c('ul', {
    staticClass: "flex shortcut-bar"
  }, [_vm._c('li', [_vm._c('span', {
    staticClass: "shortcut-key"
  }, [_vm._v("n")]), _vm._v(" Open Notes")]), _vm._v(" "), _vm._c('li', [_vm._c('span', {
    staticClass: "shortcut-key"
  }, [_vm._v("c")]), _vm._v(" Open Customize")]), _vm._v(" "), _vm._c('li', [_vm._c('span', {
    staticClass: "shortcut-key"
  }, [_vm._v("w")]), _vm._v(" Open Weather Forecast")]), _vm._v(" "), _vm._c('li', [_vm._c('span', {
    staticClass: "shortcut-key"
  }, [_vm._v("esc")]), _vm._v(" Close all")])])])
},function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._c('div', {
    staticClass: "success-links"
  }, [_vm._c('a', {
    staticClass: "text-black",
    attrs: {
      "href": "https://goo.gl/forms/XcIS7fojHNT166nA2",
      "target": "_blank"
    }
  }, [_vm._v("Support")]), _vm._v(" "), _vm._c('a', {
    staticClass: "text-black",
    attrs: {
      "href": "https://goo.gl/forms/hMD1i4sXIUVwkKtD2",
      "target": "_blank"
    }
  }, [_vm._v("Feedback")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2c3d36cb", module.exports)
  }
}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._c('div', [_vm._c('div', {
    staticClass: "util-overlay"
  }), _vm._v(" "), _vm._c('div', {
    attrs: {
      "id": "background"
    }
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-479dc554", module.exports)
  }
}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._c('div', {
    attrs: {
      "id": "clock"
    }
  }, [_vm._c('div', {
    staticClass: "time"
  }, [_vm._v(_vm._s(_vm.hrs) + ":" + _vm._s(_vm.min))]), _vm._v(" "), _vm._c('transition', [(_vm.settings.showDay) ? _vm._c('div', {
    staticClass: "date"
  }, [_vm._v(_vm._s(_vm.day) + ", " + _vm._s(_vm.month) + " " + _vm._s(_vm.date))]) : _vm._e()])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-55c3e116", module.exports)
  }
}

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._c('div', [_vm._c('div', {
    staticClass: "flex font-black absolute",
    attrs: {
      "id": "weatherInfo"
    }
  }, [_vm._c('div', {
    attrs: {
      "id": "currentWeather"
    }
  }, [_vm._c('div', {
    staticClass: "flex flex-center"
  }, [_vm._c('div', {
    staticClass: "relative"
  }, [_vm._c('div', {
    staticClass: "temperature-value"
  }, [_vm._v(_vm._s(_vm.getTemp(_vm.settings.unit, _vm.data.current.temp)))]), _vm._v(" "), (this.settings.unit === 'f') ? _vm._c('sup', {
    staticClass: "temperature-unit"
  }, [_vm._v("℉")]) : _vm._e(), _vm._v(" "), (this.settings.unit === 'c') ? _vm._c('sup', {
    staticClass: "temperature-unit"
  }, [_vm._v("℃")]) : _vm._e()]), _vm._v(" "), _vm._c('div', {
    staticClass: "ml-30 semi-bold flex flex-center"
  }, [_vm._c('i', {
    staticClass: "wi",
    class: 'wi-' + _vm.getWeatherClass(_vm.data.current.code)
  }), _vm._v(" "), _vm._c('span', {
    staticClass: "font-small"
  }, [_vm._v(_vm._s(_vm.data.current.text))])])]), _vm._v(" "), _vm._c('div', {
    staticClass: "flex font-xsmall flex-justify-space-around flex-end mt-15"
  }, [(_vm.data.current.humidity) ? _vm._c('div', [_vm._c('p', [_vm._c('svg', {
    attrs: {
      "viewBox": "0 0 12 17",
      "width": "0.7em"
    }
  }, [_vm._c('use', {
    attrs: {
      "xlink:href": "#icon-drop"
    }
  })]), _vm._v("\n                        Humid\n                    ")]), _vm._v(" "), _vm._c('p', {
    staticClass: "semi-bold"
  }, [_vm._v(_vm._s(_vm.data.current.humidity) + "%")])]) : _vm._e(), _vm._v(" "), (_vm.data.current.wind) ? _vm._c('div', [_vm._c('p', [_vm._c('svg', {
    attrs: {
      "viewBox": "0 0 14 12",
      "width": "1em"
    }
  }, [_vm._c('use', {
    attrs: {
      "xlink:href": "#icon-wind"
    }
  })]), _vm._v("\n                        Wind\n                    ")]), _vm._v(" "), _vm._c('p', {
    staticClass: "semi-bold"
  }, [_vm._v(_vm._s(_vm.data.current.wind) + " km/hr")])]) : _vm._e(), _vm._v(" "), (_vm.data.pollution.aqi) ? _vm._c('div', [_vm._c('p', [_vm._c('svg', {
    attrs: {
      "viewBox": "0 0 14 12",
      "width": "1em"
    }
  }, [_vm._c('use', {
    attrs: {
      "xlink:href": "#icon-pollution"
    }
  })]), _vm._v("\n                        Pollution\n                    ")]), _vm._v(" "), _vm._c('p', {
    staticClass: "semi-bold"
  }, [_vm._v(_vm._s(_vm.data.pollution.aqi) + " AQI")])]) : _vm._e()])]), _vm._v(" "), _vm._c('div', {
    staticClass: "flex flex-center",
    attrs: {
      "id": "forecast"
    }
  }, _vm._l((_vm.data.forecast), function(item) {
    return _vm._c('div', {
      staticClass: "forecast-pallet"
    }, [_vm._c('p', {
      staticClass: "semi-bold"
    }, [_vm._v(_vm._s(item.day))]), _vm._v(" "), _vm._c('p', [_vm._c('i', {
      staticClass: "wi tooltip",
      class: 'wi-' + _vm.getWeatherClass(item.code),
      attrs: {
        "rel": item.text
      }
    })]), _vm._v(" "), _vm._c('div', {
      staticClass: "flex font-xsmall flex-justify-space-around semi-bold"
    }, [_vm._c('p', [_vm._v(_vm._s(_vm.getTemp(_vm.settings.unit, item.high)) + " "), _vm._c('sup', [_vm._v("°")])]), _vm._v(" "), _vm._c('p', {
      staticClass: "font-light-black"
    }, [_vm._v(_vm._s(_vm.getTemp(_vm.settings.unit, item.low)) + " "), _vm._c('sup', [_vm._v("°")])])])])
  }))]), _vm._v(" "), _vm._c('svg', {
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }
  }, [_vm._c('defs', [_vm._c('g', {
    attrs: {
      "id": "icon-drop",
      "fill-rule": "nonzero",
      "fill": "#333"
    }
  }, [_vm._c('path', {
    attrs: {
      "d": "M7.51729577,1.82901408 C7.13419718,1.2656338 6.79616901,0.747323943 6.48067606,0.274084507 C6.43560563,0.206478873 6.368,0.138873239 6.30039437,0.0938028167 C6.02997183,-0.0864788734 5.66940845,0.00366197167 5.48912676,0.274084507 C5.19616901,0.747323943 4.85814085,1.24309859 4.45250704,1.82901408 C2.67222535,4.44309859 0.0130704225,8.38676056 0.0130704225,10.6402817 C0.0130704225,12.2853521 0.689126761,13.7726761 1.7708169,14.8543662 C2.85250704,15.9135211 4.33983099,16.5895775 5.98490141,16.5895775 C7.62997183,16.5895775 9.11729577,15.9135211 10.1989859,14.831831 C11.2806761,13.7501408 11.9567324,12.2628169 11.9567324,10.6177465 C11.9567324,8.36422535 9.29757746,4.44309859 7.51729577,1.82901408 Z M9.38771831,14.0205634 C8.50884507,14.8994366 7.31447887,15.4177465 5.98490141,15.4177465 C4.65532394,15.4177465 3.46095775,14.8769014 2.58208451,14.0205634 C1.70321127,13.1416901 1.18490141,11.9473239 1.18490141,10.6177465 C1.18490141,8.72478873 3.73138028,4.96140845 5.42152113,2.46 C5.62433803,2.16704225 5.80461972,1.87408451 5.98490141,1.62619718 C6.1651831,1.87408451 6.34546479,2.16704225 6.54828169,2.46 C8.23842254,4.98394366 10.7849014,8.72478873 10.7849014,10.6177465 C10.7849014,11.9473239 10.2440563,13.1416901 9.38771831,14.0205634 Z",
      "id": "Shape"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M8.47785915,9.21211268 C8.1623662,9.18957746 7.89194366,9.43746479 7.86940845,9.75295775 C7.84687324,10.2487324 7.68912676,10.7219718 7.44123944,11.1276056 C7.19335211,11.5332394 6.83278873,11.8938028 6.40461972,12.1191549 C6.13419718,12.2769014 6.02152113,12.6374648 6.17926761,12.9078873 C6.3595493,13.2233803 6.72011268,13.3135211 6.99053521,13.1557746 C7.59898592,12.8177465 8.09476056,12.3219718 8.43278873,11.7585915 C8.79335211,11.1952113 8.99616901,10.5191549 9.01870423,9.82056338 C9.04123944,9.50507042 8.79335211,9.23464789 8.47785915,9.21211268 Z",
      "id": "Shape"
    }
  })]), _vm._v(" "), _vm._c('g', {
    attrs: {
      "id": "icon-wind",
      "stroke": "#333",
      "stroke-width": "1",
      "fill": "none",
      "fill-rule": "evenodd"
    }
  }, [_vm._c('path', {
    attrs: {
      "d": "M0.379940476,4.55183649 L10.4860459,4.55183649 C11.74239,4.55183649 12.7608929,3.53047666 12.7608929,2.27591824 C12.7608929,1.01885999 11.7395331,0 10.4849746,0 C9.22791635,0 8.20905639,1.01814576 8.20905639,2.27591824 M0.710989624,6.98476989 L6.45267548,6.98476989 C7.16645515,6.98476989 7.74510769,7.56504562 7.74510769,8.2778108 C7.74510769,8.99199626 7.16483201,9.57085171 6.45206683,9.57085171 C5.73788135,9.57085171 5.15902593,8.99240204 5.15902593,8.2778108",
      "id": "cloud-wind"
    }
  })]), _vm._v(" "), _vm._c('g', {
    attrs: {
      "id": "icon-pollution",
      "fill-rule": "nonzero"
    }
  }, [_vm._c('path', {
    attrs: {
      "d": "M11.5386397,3.99200212 C11.6838208,3.67177552 11.7593555,3.32337483 11.7593555,2.96640922 C11.7593555,1.5948386 10.6434928,0.47900412 9.27195039,0.47900412 C8.85804497,0.47900412 8.45636709,0.580289941 8.09633051,0.773845879 C7.62818998,0.281701029 6.98542649,0.0039609375 6.29688012,0.0039609375 C5.39942294,0.0039609375 4.57744412,0.487822607 4.13761854,1.25590441 C3.93730082,1.2048248 3.73106655,1.17901734 3.52178947,1.17901734 C2.15021886,1.17901734 1.03438437,2.29488 1.03438437,3.66642244 C1.03438437,3.92041178 1.07216582,4.16904805 1.14699617,4.408246 C0.603236409,4.87838689 0.284333984,5.5673277 0.284333984,6.29151428 C0.284333984,7.60146818 1.30220719,8.67819704 2.58855121,8.7722703 C2.58576198,8.82033528 2.58435327,8.86851296 2.58435327,8.91660612 C2.58435327,10.2881767 3.70021593,11.4040112 5.07175837,11.4040112 C5.88697541,11.4040112 6.64699943,10.9992624 7.10789922,10.345032 C7.57102477,10.810496 8.20468802,11.0790232 8.87190661,11.0790232 C10.1760848,11.0790232 11.2490102,10.0701939 11.3513103,8.79185128 C12.4690888,8.5376929 13.284334,7.53551266 13.284334,6.36657003 C13.284334,5.26947131 12.55733,4.31118629 11.5386397,3.99200212 Z M10.8595201,8.15818592 C10.7195517,8.17560432 10.6153114,8.29599383 10.6181469,8.43704237 C10.61839,8.44860062 10.618606,8.46018589 10.618606,8.47179815 C10.618606,9.48271353 9.79616044,10.3051591 8.78524507,10.3051591 C8.18586304,10.3051591 7.62307316,10.0109907 7.27980913,9.51827948 C7.22353015,9.4374797 7.1280395,9.392921 7.03028041,9.40129263 C6.93219726,9.40969127 6.84605044,9.46983202 6.8043273,9.55900343 C6.50378562,10.2015399 5.85155427,10.6166919 5.14274688,10.6166919 C4.1318315,10.6166919 3.30938592,9.79424636 3.30938592,8.78333098 C3.30938592,8.66313051 3.32121423,8.54257897 3.34446577,8.42494401 C3.36107401,8.34106563 3.33776846,8.25427068 3.28143546,8.18994412 C3.22896422,8.13007343 3.15334945,8.09601978 3.07427802,8.09601978 C3.06844488,8.09601978 3.06261174,8.09620882 3.05685962,8.09658689 C3.01519048,8.09923341 2.9763839,8.10052966 2.93814444,8.10052966 C1.92722906,8.10052966 1.10478348,7.27808408 1.10478348,6.26716871 C1.10478348,5.67923691 1.39009418,5.12268525 1.8680335,4.77844904 C1.97159872,4.70383347 2.01035129,4.56786192 1.96166078,4.44984888 C1.87011291,4.22805457 1.82366384,3.99291967 1.82366384,3.75097943 C1.82366384,2.74006405 2.64610942,1.91761847 3.6570248,1.91761847 C3.87549745,1.91761847 4.08924419,1.9556689 4.29224282,2.03066254 C4.42864645,2.08105438 4.58074015,2.01672782 4.63955763,1.88375386 C4.93318596,1.22012629 5.59162852,0.791336565 6.31693614,0.791336565 C6.88817867,0.791336565 7.41677988,1.05080323 7.76725431,1.50319555 C7.85629069,1.61821101 8.01942954,1.64410907 8.13976504,1.56236411 C8.44376339,1.35582778 8.79950385,1.24667247 9.16858491,1.24667247 C10.1795003,1.24667247 11.0019459,2.06911805 11.0019459,3.08003343 C11.0019459,3.44417252 10.8953831,3.79602422 10.6938427,4.09748408 C10.6411284,4.17633948 10.6327028,4.27677209 10.6715364,4.36332399 C10.7103429,4.44987588 10.7909807,4.51031368 10.884932,4.52338424 C11.7849638,4.64828362 12.4636873,5.42887103 12.4636873,6.33908375 C12.4638223,7.262313 11.7741076,8.0443857 10.8595201,8.15818592 Z",
      "fill": "#333333"
    }
  }), _vm._v(" "), _vm._c('g', {
    attrs: {
      "transform": "translate(8.000000, 8.000000)",
      "fill": "#333"
    }
  }, [_vm._c('path', {
    attrs: {
      "d": "M1.50901563,0.808488281 C1.33354102,0.97946875 1.10200391,1.07366797 0.856933594,1.07366797 C0.69428125,1.07366797 0.53421875,1.03129102 0.394087891,0.951158203 C0.269851563,0.880115234 0.111693359,0.923279297 0.0407011719,1.04738867 C-0.0303164062,1.17154883 0.012796875,1.32975781 0.136931641,1.40077539 C0.355240234,1.52564648 0.604195313,1.59163672 0.856933594,1.59163672 C1.23781836,1.59163672 1.59778125,1.44525977 1.87050195,1.17939453 C1.97292773,1.07955859 1.97500977,0.915611328 1.87522461,0.813185547 C1.77538867,0.710785156 1.61141602,0.708677734 1.50901563,0.808488281 Z",
      "id": "Shape"
    }
  }), _vm._v(" "), _vm._c('path', {
    attrs: {
      "d": "M2.07139258,0.0156914062 C1.92897656,-0.000203125 1.80118555,0.102298828 1.78539258,0.244435547 C1.78313281,0.264621094 1.7801875,0.285060547 1.77658203,0.305195312 C1.75141992,0.445960937 1.84516211,0.580505859 1.98595313,0.605667969 C2.00136523,0.608410156 2.01670117,0.609730469 2.03180859,0.609730469 C2.15487695,0.609730469 2.26403125,0.521675781 2.28642578,0.396296875 C2.29201172,0.364990234 2.29663281,0.333150391 2.30013672,0.301691406 C2.31595508,0.159529297 2.21355469,0.031484375 2.07139258,0.0156914062 Z",
      "id": "Shape"
    }
  })])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-595534ac", module.exports)
  }
}

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
  return _vm._c('div', {
    on: {
      "click": function($event) {
        $event.stopPropagation();
      },
      "mousedown": function($event) {
        $event.stopPropagation();
      }
    }
  }, [_vm._c('transition', {
    attrs: {
      "mode": "out-in"
    }
  }, [(_vm.isLoading) ? _vm._c('div', {
    key: "loading",
    staticClass: "weather-loading"
  }, [_vm._v("Loading..")]) : _vm._c('div', {
    key: "notLoading",
    staticClass: "flex flex-center",
    attrs: {
      "id": "weather"
    },
    on: {
      "click": function($event) {
        _vm.toggle('showWeatherInfo')
      }
    }
  }, [_vm._c('transition', {
    attrs: {
      "mode": "out-in",
      "name": "fast-fade"
    }
  }, [_vm._c('div', {
    key: _vm.weatherCity + _vm.temp
  }, [(_vm.temp) ? _vm._c('div', {
    staticClass: "temperature"
  }, [_vm._c('div', {
    staticClass: "temperature-value"
  }, [_vm._v(_vm._s(_vm.temp))]), _vm._v(" "), (this.settings.unit === 'f') ? _vm._c('sup', {
    staticClass: "temperature-unit"
  }, [_vm._v("℉")]) : _vm._e(), _vm._v(" "), (this.settings.unit === 'c') ? _vm._c('sup', {
    staticClass: "temperature-unit"
  }, [_vm._v("℃")]) : _vm._e()]) : _vm._e(), _vm._v(" "), _vm._c('div', {
    staticClass: "weather-icon flex flex-center"
  }, [_vm._c('i', {
    staticClass: "wi",
    class: 'wi-' + _vm.weatherClass
  }), _vm._v(" "), _vm._c('span', {
    staticClass: "weather-city"
  }, [_vm._v(_vm._s(_vm.weatherCity))])])])]), _vm._v(" "), _vm._c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.showWeatherInfo),
      expression: "!showWeatherInfo"
    }],
    staticClass: "arrow-down font-center opacity-0"
  }, [_vm._c('svg', {
    attrs: {
      "width": "23px",
      "height": "8px",
      "viewBox": "0 0 23 8",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_vm._c('g', {
    attrs: {
      "transform": "translate(-25.000000, -50.000000)",
      "stroke": "rgba(255,255,255,0.5)",
      "fill": "rgba(255,255,255,0.5)",
      "stroke-width": "2",
      "fill-rule": "nonzero"
    }
  }, [_vm._c('path', {
    attrs: {
      "d": "M46.4347899,51.1140206 C45.950678,51.012669 45.6164104,51.012669 45.4319868,51.1140206 L36.6142361,55.969398 L27.7791956,51.1140206 C27.5025603,50.9619931 27.0530279,50.9619931 26.7763926,51.1140206 C26.4997572,51.2660481 26.4997572,51.5130927 26.7763926,51.6651202 L36.0955448,56.7865456 C36.2338625,56.8625594 36.4067596,56.9005662 36.5969463,56.9005662 C36.7698434,56.9005662 36.9600302,56.8625594 37.0983479,56.7865456 L46.4175001,51.6651202 C46.6134502,51.5637685 46.6192134,51.3800687 46.4347899,51.1140206 Z",
      "id": "Shape"
    }
  })])])])], 1)]), _vm._v(" "), _vm._c('transition', [(_vm.showWeatherInfo && _vm.localWeather && !_vm.isLoading) ? _vm._c('WeatherInfo', {
    attrs: {
      "data": _vm.localWeather,
      "settings": _vm.settings
    }
  }) : _vm._e()], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-71313dfc", module.exports)
  }
}

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(23);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(8)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-595534ac!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./WeatherInfo.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-595534ac!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./WeatherInfo.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(24);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(8)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-71313dfc!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./weather.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-71313dfc!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./weather.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global, setImmediate) {/*!
 * Vue.js v2.5.13
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
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
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
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
  var n = parseFloat(val);
  return isNaN(n) ? val : n
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
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
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
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
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
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
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
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */


/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

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
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

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
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */


// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

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
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
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
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
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
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
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

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode, deep) {
  var componentOptions = vnode.componentOptions;
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  if (deep) {
    if (vnode.children) {
      cloned.children = cloneVNodes(vnode.children, true);
    }
    if (componentOptions && componentOptions.children) {
      componentOptions.children = cloneVNodes(componentOptions.children, true);
    }
  }
  return cloned
}

function cloneVNodes (vnodes, deep) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep);
  }
  return res
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
].forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
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
  shouldConvert: true
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
    defineReactive(obj, keys[i], obj[keys[i]]);
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
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
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
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
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
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
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
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
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
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
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
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
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

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

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
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
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
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
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

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
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

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
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
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
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
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
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
  if (
    process.env.NODE_ENV !== 'production' &&
    // skip validation for weex recycle-list child component props
    !(false && isObject(value) && ('@binding' in value))
  ) {
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
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn(
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
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
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
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
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

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
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
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (process.env.NODE_ENV !== 'production') {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both micro and macro tasks.
// In < 2.4 we used micro tasks everywhere, but there are some scenarios where
// micro tasks have too high a priority and fires in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using macro tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use micro task by default, but expose a way to force macro task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) Task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine MicroTask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a Task instead of a MicroTask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

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
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
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

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val)) {
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

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
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
  if (isDef(hash)) {
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

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                process.env.NODE_ENV !== 'production'
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
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
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

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
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
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
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
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
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
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
      remove(parent.$children, vm);
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
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
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

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = (parentVnode.data && parentVnode.data.attrs) || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
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
  var watcher, id;

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
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
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

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
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
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : '';
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
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
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
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
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
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
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
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
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

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
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

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (process.env.NODE_ENV !== 'production') {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
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
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (process.env.NODE_ENV !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if (process.env.NODE_ENV !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias,
  eventKeyName
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (keyCodes) {
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1
    } else {
      return keyCodes !== eventKeyCode
    }
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
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
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
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

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm = Object.create(parent);
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    vnode.fnContext = contextVm;
    vnode.fnOptions = options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }

  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */




// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force))) {
        applyNS(child, ns, force);
      }
    }
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // if the parent didn't update, the slot nodes will be the ones from
      // last render. They need to be cloned to ensure "freshness" for this render.
      for (var key in vm.$slots) {
        var slot = vm.$slots[key];
        // _rendered is a flag added by renderSlot, but may not be present
        // if the slot is passed from manually written render functions
        if (slot._rendered || (slot[0] && slot[0].elm)) {
          vm.$slots[key] = cloneVNodes(slot, true /* deep */);
        }
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
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
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

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
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
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
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name);
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

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
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
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id);
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

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
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

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
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

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.5.13';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
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
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
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

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
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
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
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
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
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

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;
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
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
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
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
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
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
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

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
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

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setAttribute(vnode.elm, i, '');
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
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
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
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
      removeNode(vnode.elm);
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
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh);
    }

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
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
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
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
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
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
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
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
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

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
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
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
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
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
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
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
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
      // #7138: IE10 & 11 fires input event when setting placeholder on
      // <textarea>... block the first input event and remove the blocker
      // immediately.
      /* istanbul ignore if */
      if (
        isIE && !isIE9 &&
        el.tagName === 'TEXTAREA' &&
        key === 'placeholder' && !el.__ieph
      ) {
        var blocker = function (e) {
          e.stopImmediatePropagation();
          el.removeEventListener('input', blocker);
        };
        el.addEventListener('input', blocker);
        // $flow-disable-line
        el.__ieph = true; /* IE placeholder patched */
      }
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
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
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

/*  */

/*  */









// add a raw attr (use this in preTransforms)








// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.

/*  */

/**
 * Cross-platform code generation for component v-model
 */


/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */

/*  */

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
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
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
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
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
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
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
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
  if (!cls || !(cls = cls.trim())) {
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
    var cur = " " + (el.getAttribute('class') || '') + " ";
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
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

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
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
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
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
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

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

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

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
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
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
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
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
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

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

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

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
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
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
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
  return options.every(function (o) { return !looseEqual(o, value); })
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
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
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
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
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
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
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
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
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
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
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
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
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

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
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
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
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
// into the final desired state. This way in the second pass removed
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
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
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
      true // removeOnly (!important avoids unnecessary moves)
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
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

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
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
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
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
Vue$3.nextTick(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (process.env.NODE_ENV !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if (process.env.NODE_ENV !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

/* harmony default export */ exports["a"] = Vue$3;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7), __webpack_require__(47), __webpack_require__(5).setImmediate))

/***/ },
/* 47 */
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
/* 48 */,
/* 49 */,
/* 50 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }
/******/ ]);
//# sourceMappingURL=build.js.map