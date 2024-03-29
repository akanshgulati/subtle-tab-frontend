import storage from './utils/storage';
import constants from './utils/Constants';
import config from './utils/config'
import backgroundData from './utils/backgroundData'
import CommonUtils from './utils/common'

let tabsCount = 0;
let prevTabsCount = 0;
let bgData;
const DEBUG = false;

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
        } else if (request.query === 'startWeather') {
            startWeather();
        } else if (request.query === 'loadCurrentCustomBackground') {
            loadCurrentCustomBackground(request.url, sendResponse);
        } else if (request.query === 'loadNextCustomBackground') {
            loadNextBackground(request.url)
        }
        return true;
    });

const loadCurrentBackground = (url, callback) => {
    let defaultImageLoaded = false;
    let img = new Image();
    img.src = url;
    img.onload = () => {
        if (!defaultImageLoaded) {
            clearTimeout(defaultImageTimeout);
            callback(url);
        }
    };
    img.onerror = () => {
        clearTimeout(defaultImageTimeout);
        defaultImageLoaded = true;
        callback(false);
    };

    const defaultImageTimeout = setTimeout(() => {
        defaultImageLoaded = true;
        callback(false);
    }, 4000);
};

const loadCurrentCustomBackground = (url, callback) => {
    let defaultImageLoaded = false;
    let img = new Image();
    img.src = url;
    img.onload = () => {
        if (!defaultImageLoaded) {
            clearTimeout(defaultImageTimeout);
            callback(url);
        }
    };
    img.onerror = () => {
        clearTimeout(defaultImageTimeout);
        defaultImageLoaded = true;
        callback(false);
    };
    let defaultImageTimeout = setTimeout(() => {
        defaultImageLoaded = true;
        callback(false);
    }, 4000);
};

const getBackground = (theme, changePage) => {
    return new Promise((resolve, reject) => {
        let currentPage = storage.get(constants.STORAGE.CURRENT_PAGE) || {};
        // setting initial value to 0 because changePage makes it 1 itself
        let themePage = currentPage[theme.value] || 0;

        if (changePage) {
            themePage++;
        }

        themePage = themePage || 1;

        let url = 'https://api.subtletab.com/theme/';
        url += theme.tags + '/' + themePage;

        CommonUtils.http(url).then((response) => {
            // responses will be other than seen, having good views and sizes
            bgData = filterResponses(response);
            // If all pages are empty;
            if (themePage > (response.pages - 5)) {
                themePage = 1;
            }

            if (changePage) {
                storage.set(constants.STORAGE['BACKGROUND_SEEN_' + theme.value.toUpperCase()], '');
            }
            currentPage[theme.value] = themePage;
            storage.set(constants.STORAGE.CURRENT_PAGE, currentPage);

            updateThemeStorage(bgData, theme, response.details);
            resolve();
        }, (error) => {
            reject(error);
        })
    });
};

const updateThemeStorage = (bgData, theme, bgDetails) => {
    let themeLocalStorage = storage.get(theme.value);

    if (!themeLocalStorage) {
        storage.set(theme.value, bgData);
        storage.set(theme.value + '_details', bgDetails);
        return;
    }
    let allKeys = Object.keys(themeLocalStorage);
    let lastURLKey = allKeys[allKeys.length - 1];
    let lastStoredURL = themeLocalStorage[lastURLKey];

    const localThemeDetails = storage.get(theme.value + "_details");

    if (localThemeDetails) {
        const lastDetailsKeys = Object.keys(localThemeDetails);
        const lastKeyDetail = localThemeDetails[lastDetailsKeys[lastDetailsKeys.length - 1]];
        storage.set(theme.value + "_details", Object.assign({}, lastKeyDetail, bgDetails));
    }

    // Storing last background url for next round;
    let obj = {};
    obj[lastURLKey] = lastStoredURL;
    storage.set(theme.value, Object.assign({}, obj, bgData));
};

let previousURL;
const loadNextBackground = (url) => {
    previousURL = previousURL || url;
    if (previousURL !== url) {
        _console('BG: Load Next Background for', url);
        previousURL = url;
        const image = new Image();
        image.src = url;
    }
};

let _console = (log) => {
    if (DEBUG) {
        console.log(log);
    }
};

chrome.runtime.onInstalled.addListener(function(details) {
    if (details && details.reason && details.reason === 'install') {
        let sharedData;

        storage.chromeSync.get(null, (details) => {
            let key;
            for (key in details) {
                if (!details.hasOwnProperty(key)) {
                    continue;
                }
                storage.setLocal(key, details[key]);
            }
        });

        chrome.tabs.create({});

    } else if (details && details.reason && details.reason === 'update') {
        updateLocalStorage();
    }
});

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({});
});

chrome.storage.onChanged.addListener((changes, namespace) => {

    let key;
    for (key in changes) {
        if (!changes.hasOwnProperty(key)) {
            continue;
        }
        _console('Storage Changed' + JSON.stringify(changes[key]));
        // Saving only sync data in local storage and preventing any local type change
        if (typeof changes[key].newValue !== "undefined" && namespace !== 'local') {
            storage.setLocal(key, changes[key].newValue);
        } else {
            //To handle cases when no data is present
            storage.remove(key);
        }
    }

});

function getWeather(data) {

    let url = 'https://api.subtletab.com/weather';

    if (data.type !== 'custom') {
        url += '?lat=' + data.lat + '&long=' + data.long + '&type=geo';
    } else {
        url += '?location=' + data.location + '&type=custom';
    }

    CommonUtils.http(url).then((weather) => {
        storage.set(constants.STORAGE.WEATHER, weather)
    });
}

function loadWeather(settings) {
    let options = {};
    if (settings.weather.location.type !== 'custom') {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                options = {
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                    type: 'geo'
                };
                getWeather(options);
            }, (error) => {
                _console(error)
            }, {timeout: 10000}
        );
    } else {
        options = {
            location: settings.weather.location.name,
            type: 'custom'
        };
        getWeather(options);
    }
}

let weatherInterval;

function startWeather() {

    let localSettings = storage.get(constants.STORAGE.SHARED_DATA);
    if (localSettings && localSettings.showUtilities.showWeather) {
        if (!weatherInterval) {
            weatherInterval = setInterval(() => {
                if (navigator.onLine) {
                    localSettings = storage.get(constants.STORAGE.SHARED_DATA);
                    loadWeather(localSettings);
                } else {
                    stopWeather();
                }
            }, 900000)
        }
    } else {
        stopWeather();
    }
}

function stopWeather() {
    clearInterval(weatherInterval);
}

function updateLocalStorage() {
    let miscSettings;
    let sharedData;
    // Show onboarding with latest features

    //storage.set(constants.STORAGE.SEEN_ONBOARDING, false);
    sharedData = storage.get(constants.STORAGE.SHARED_DATA);
    miscSettings = storage.get(constants.STORAGE.MISC_SETTINGS);


    if (miscSettings && CommonUtils.isObject(miscSettings)) {
        miscSettings.update.isToBeFetched = true;
        if (CommonUtils.isUndefined(miscSettings.background)) {
            miscSettings.background = config.misc.background;
        }
    }
    if (sharedData && CommonUtils.isObject(sharedData)) {
        sharedData.showUtilities.showBookmarks = true;
    }

    storage.set(constants.STORAGE.SHARED_DATA, sharedData);
    storage.set(constants.STORAGE.MISC_SETTINGS, miscSettings);
}
function loadNewTab(){
    function loadStart() {
        browser.tabs.update({url: 'index.html'});
    }

    // does not fire in private browsing, not recommended
    function pushStart(data) {
        if (data == null) {
            loadStart()
        }
    }
    if (CommonUtils.isFirefox() && browser && browser.runtime && browser.tabs) {
        browser.runtime.onStartup.addListener(loadStart);
        browser.tabs.getCurrent().then((data) => (pushStart(data)));
    }
}

function init() {

    chrome.runtime.setUninstallURL(`https://www.subtletab.com/#/uninstall?browser=${CommonUtils.getBrowser()}`);

    chrome.storage.sync.get(null, (data) => {
        for (let key in data) {
            if (!data.hasOwnProperty(key)) {
                continue;
            }
            storage.setLocal(key, data[key]);
        }
    });

    chrome.tabs.onCreated.addListener(function() {
        prevTabsCount = tabsCount;
        tabsCount++;
        if (tabsCount === 2) {
            storage.set(constants.STORAGE.SEEN_ONBOARDING, true);
        }
    });
    // loadNewTab();
}

init();
