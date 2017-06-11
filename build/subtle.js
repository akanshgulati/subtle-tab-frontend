/*
chrome.webRequest.onHeadersReceived.addListener(
    function(details) {
        details.responseHeaders.push({
            "name":"Cache-Control",
            "value": "max-age=86400"
        });
        /!*for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'User-Agent') {
                details.requestHeaders.splice(i, 1);
                break;
            }
        }*!/
        debugger;
        return { responseHeaders: details.responseHeaders };
    },
    {urls: ['<all_urls>']},
    [ 'blocking', 'responseHeaders']
);*/
let tabsCount = 1;
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
    },
    increment(key){
        let item = this.get(key);
        if (typeof item === 'number') {
            this.set(key, item + 1)
        }
    },
    append(key, value){
        let initialValue = this.get(key) || [];
        initialValue.push(value);
        this.set(key, initialValue);
    }
};
const _config = {
    minDate: 1459449000,
    minViews: 1000,
    lStoreLimit: 100,
    durationMonths: 6,
    photoSets:{
        nature: '72157681909415503',
        monument: '72157681909415503',
        building: '72157681909415503',
        night: '72157681909415503',
        food: '72157681835335914'
    }
};
function init() {
    chrome.tabs.onCreated.addListener(function () {
        tabsCount++;
    });
}

function getTabsCount() {
    return tabsCount;
}

function setTabsCount(num) {
    tabsCount = num;
}

function filterResponse(response) {
    let regex = new RegExp(response.id + "_(.*)_", "g");
    let regex2 = new RegExp(response.id + "_(.*)?.jpg", "g");
    return response.secret + ',' + response.farm + ',' + response.server + ',' + response['url_h'].match(regex.source)[1] + ','
        + (response['url_k'] ? response['url_k'].match(regex2.source)[1] : response['url_o'].match(regex2.source)[1]);
}

function filterResponses(response){
    if(response && response.photoset && response.photoset.photo.length){
        let photos = response.photoset.photo;
        let storedSeenIds = storage.get('bg-seen') || [];
        let result = {};
        for(let i = 0; i < _config.lStoreLimit; i++){
            let photo = photos[i];
            if(storedSeenIds.indexOf(photo.id) === -1) {
                if (photo.url_l && photo.url_h && (photo.url_k || photo.url_o)) {
                    result[photo.id] = filterResponse(photo);
                }
            }
        }
        return result;
    }
}
let bgData;
function getBackground(theme, callback, page){
    let xmlhttp = new XMLHttpRequest();
    let self = this;
    page = page || 1;
    //https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=d3f3d8de69b56fb180270e35cdc2c2f8&photoset_id=72157681909415503&user_id=150112244%40N08&extras=url_h&per_page=100&format=json&nojsoncallback=1
    let url = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos';
    url += '&api_key=d42bcbb7a689163cfa7fcdc02f7e9110';
    url += "&min_upload_date=" + _config.minDate;
    url += "&photoset_id=" + _config.photoSets[theme.tags];
    url += '&extras=url_k,url_h,url_l,url_o';
    url += '&page=' + page;
    url += '&per_page=500&format=json&nojsoncallback=1';

    xmlhttp.open('GET', url);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let response = JSON.parse(xmlhttp.responseText);
            //responses will be other than seen, having good views and sizes
            bgData = filterResponses(response);
            if (Object.keys(bgData).length < 10 && response.photoset.pages > page) {
                self.getBackground(theme, callback, page + 1);
            }else {
                storage.set(theme.value, bgData);
                if (typeof callback === 'function') {
                    callback(bgData);
                }
            }
        }
        //TODO: Cover failed condition
    };
    xmlhttp.send();
}
init();