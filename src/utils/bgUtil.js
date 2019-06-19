import storage from './storage';
import bgData from './backgroundData';
import {toDataURL} from './StringUtils';
import {STORAGE} from './Constants';
import localBackgroundData from '../utils/backgroundData'

const bgUtil = {
    getFormattedJSON(dataArr){
        let url, screenWidth, arr = [];
        screenWidth = window.screen.width;
        if (screenWidth <= 1280) {
            url = 'largeImageURL';
        } else if (screenWidth <= 1920) {
            url = 'fullHDURL';
        } else {
            url = 'imageURL'
        }
        for (let i = 0; i < dataArr.hits.length; i++) {
            arr[i] = dataArr.hits[i][url];
        }
        return arr;
    },
    formImgURL(string, id, isThumbnail) {
        try {
            if (!string) {
                return false;
            }
            let arr = string.split(',');
            if (arr.length > 1) {
                return 'https://farm' + arr[1] + '.staticflickr.com/' + arr[2] + '/' + id + '_' + this.getSecret(arr, isThumbnail) + this.getWallpaperSize(isThumbnail);
            } else {
                // Handling case of default images already present in extension
                return string;
            }
        } catch (e) {
            // TODO :: ADD listener here
        }
    },
    getSecret(arr, isThumbnail){
        let screenWidth = window.screen.width;
        if (screenWidth <= 1024 || isThumbnail) {
            return arr[0];
        } else if (screenWidth > 1024 && screenWidth < 1920) {
            return arr[3];
        } else {
            return arr[4];
        }
    },
    getWallpaperSize(isThumbnail){
        let screenWidth = window.screen.width;
        if (isThumbnail) {
            return '_m.jpg'
        }
        if (screenWidth <= 1024) {
            return '_b.jpg';
        }
        if (screenWidth > 1024 && screenWidth < 1920) {
            return '_h.jpg';
        }
        return '';
    },
    getCurrentTheme(id){
        let themes = bgData.themes;
        for (let i = 0; i < themes.length; i++) {
            if (themes[i].id === id) {
                return themes[i];
            }
        }
    },
    updateBgSeen(id, theme, bgSeen, isRemove){
        if (!id || !theme) {
            return;
        }
        if (!isRemove) {
            if (bgSeen.indexOf(id) === -1) {
                bgSeen.push(id);
                storage.set('bg-seen-' + theme, bgSeen);
            }
        } else {
            const index = bgSeen.indexOf(id);
            if (index > -1) {
                bgSeen.splice(index, 1);
                storage.set('bg-seen-' + theme, bgSeen);
            }
        }
        return bgSeen;
    },
    cacheBackground(url, callback){
        // let imageUrl = document.getElementById('background').style.backgroundImage.match(/url\("(.*)"\)/)[1];
        if (url.search('http') === -1) {
            url = chrome.runtime.getURL(url);
        }
        toDataURL(url, (string) => {
            if (string) {
                chrome.storage.local.set({[STORAGE.BACKGROUND_LOCKED]: string}, () => {
                    callback(true)
                });
            } else {
                callback(false);
            }
        });
    },
    removeBackgroundCache() {
        chrome.storage.local.set({[STORAGE.BACKGROUND_LOCKED]: ''});
    },
    setBackgroundWallpaper(url) {
        if (!url) {
            return;
        }
        const bgElement = document.getElementById('background');
        bgElement.style.backgroundImage = 'url(' + url + ')';
    },
    addToHistory(imageId, url, otherInfo) {
        // There are three types of history
        // 1. Predefined wallpapers - We store entire array of all size of images
        // 2. Custom wallpapers - We store the image url with ^custom
        // 3. Default wallpapers - We store the full url of that wallpaper
        if (!imageId || !url || !otherInfo) {
            return;
        }
        const currentHistory = storage.get(STORAGE.BACKGROUND_HISTORY) || [];
        const currentHistoryData = storage.get(STORAGE.BACKGROUND_HISTORY_DATA) || {};
        // Case of loading of default wallpapers
        if (imageId.length < 3) {
            imageId = imageId + (otherInfo.type ? '^' + otherInfo.type : '') +
                (otherInfo.theme ? '^' + otherInfo.theme : '');
        }
        if (currentHistory[0] !== imageId) {
            currentHistory.unshift(imageId);
        }
        currentHistoryData[imageId] = {
            url: url,
            type: otherInfo.type,
            theme: otherInfo.theme,
            location: otherInfo.location
        };
        // Remove more than 40 images
        const keysToRemove = currentHistory.splice(40);
        keysToRemove.forEach(key => {
            delete currentHistoryData[key];
        });
        storage.set(STORAGE.BACKGROUND_HISTORY, currentHistory);
        storage.set(STORAGE.BACKGROUND_HISTORY_DATA, currentHistoryData);
    },
    getBackgroundInfo(backgroundData){
        // If image is the default one
        const wallpaperId = backgroundData.id;
        debugger;

        // handle case for locked wallpaper
        if (backgroundData.isLocked) {
            const miscSettings = storage.get(STORAGE.MISC_SETTINGS);
            if (miscSettings) {
                const wallpaperId = miscSettings.background.id;
                const historyData = storage.get(STORAGE.BACKGROUND_HISTORY_DATA);
                if (historyData && historyData[wallpaperId]) {
                    return historyData[wallpaperId].location || {};
                }
            }
        }
        // if default background is loaded
        else if (wallpaperId.length < 3) {
            const backgroundDetail = localBackgroundData.storedDetails[wallpaperId];

            if (backgroundDetail) {
                return {
                    area: backgroundDetail.area,
                    url: backgroundDetail.url,
                    user: backgroundDetail.user
                }
            }
        }
        // if image is loaded from server
        else if (backgroundData.themeValue) {
            const locationDetails = storage.get(backgroundData.themeValue + "_details");

            if (locationDetails && locationDetails[wallpaperId]) {

                const backgroundDetail = locationDetails[wallpaperId];

                return {
                    area: decodeURIComponent(backgroundDetail.area),
                    url: "https://unsplash.com/photos/" + decodeURIComponent(backgroundDetail.id),
                    user: decodeURIComponent(backgroundDetail.user)
                };
            }

        }
        return {};
    }
};

export default bgUtil;