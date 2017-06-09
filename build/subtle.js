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
    durationMonths: 6
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

function filterResponse(response){
    let regex = new RegExp(response.id + "_(.*)_", "g");
    return response.secret +','+  response.farm +','+  response.server + ','
        + response['url_h'].match(regex.source)[1] + ',' + response['url_k'].match(regex.source)[1];
}

function filterResponses(response){
    if(response && response.photos && response.photos.photo.length){
        let photos = response.photos.photo;
        let storedSeenIds = storage.get('bg-seen') || [];
        let result = {};
        for(let i = 0; i < _config.lStoreLimit; i++){
            let photo = photos[i];
            if(storedSeenIds.indexOf(photo.id) === -1) {
                if (photo.url_l && photo.url_h && photo.url_k && photo.views > _config.minViews) {
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
    let url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
    url += '&api_key=d42bcbb7a689163cfa7fcdc02f7e9110';
    url += "&min_upload_date=" + _config.minDate;
    url += '&tag_mode=any&sort=interestingness-desc&safe_search=1&media=photos&per_page=500&format=json&nojsoncallback=1';
    url += "&text=" + theme.tags;
    url += '&extras=url_k,url_h,url_l,views';
    url += '&page=' + page;

    xmlhttp.open('GET', url);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let response = JSON.parse(xmlhttp.responseText);
            //responses will be other than seen, having good views and sizes
            bgData = filterResponses(response);
            if (Object.keys(bgData).length < 10 && response.pages > page) {
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