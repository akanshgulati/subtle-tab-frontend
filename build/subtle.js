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

function filterResponses(response) {
    if (response && response.photo) {
        let photoKeys = Object.keys(response.photo);
        let photos = response.photo;
        let storedSeenIds = storage.get('bg-seen') || [];
        let result = {};
        for (let i = 0; i < photoKeys.length; i++) {
            if (storedSeenIds.indexOf(photos[photoKeys[i]]) === -1) {
                result[photoKeys[i]] = photos[photoKeys[i]];
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
  /*  let url = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos';
    url += '&api_key=d42bcbb7a689163cfa7fcdc02f7e9110';
    url += "&min_upload_date=" + _config.minDate;
    url += "&photoset_id=" + _config.photoSets[theme.tags];
    url += '&extras=url_k,url_h,url_l,url_o';
    url += '&page=' + page;
    url += '&per_page=500&format=json&nojsoncallback=1';*/

    let url = 'http://ec2-52-74-214-57.ap-southeast-1.compute.amazonaws.com/';
    url += theme.tags + '/' + page;
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