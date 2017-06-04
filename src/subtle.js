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
let tabsCount = 0;
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
import config from './utils/config';
import storage from './utils/storage';

function filterResponse(response){
    return response.id +','+ response.secret +','+  response.farm +','+  response.server;
}
function filterResponses(response){
    if(response && response.photos && response.photos.photo.length){
        let photos = response.photos.photo;
        let storedSeenIds = storage.get('bg-seen') || [];
        let result = {};
        for(let i = 0; i < config.background.lStoreLimit; i++){
            let photo = photos[i];
            if(storedSeenIds.indexOf(photo.id) > -1) {
                if (photo.url_l && photo.url_h && photo.url_k && photo.views > config.background.minViews) {
                    result[photo.id] = filterResponse(photo);
                }
            }
        }
    }
}
function getBackground(theme){
    let xmlhttp = new XMLHttpRequest();
    let _config = config.background;
    //let url = 'https://pixabay.com/api/?key=2363059-65b4954bde19ecbe197d0f47e&response_group=high_resolution&image_type=photo&orientation=horizontal&per_page=10&editor_choice=true';
    /*let url = 'https://pixabay.com/api/?key=2363059-65b4954bde19ecbe197d0f47e&response_group=high_resolution&image_type=photo&orientation=horizontal&per_page=10&order=ec&colors=black';
     url += '&min_width=' + requestWidth + '&min_height=' + requestHeight;
     if(theme !=='random') {
     url += '&q=' + theme;
     }*/
    let url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
    url += '&api_key=004a2a979699ede40ed45e56a70b7d11';
    url += "&min_upload_date='"+_config.minDate+ "'";
    url += '&tag_mode=any&sort=interestingness-desc&safe_search=1&media=photos&per_page=200&format=json&nojsoncallback=1';
    url += "&tags='" + theme.tags + "'" ;
    url = +'&extras=url_k,url_h,url_l, views';
    xmlhttp.open('GET', url);

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            //responses will be other than seen, having good views and sizes
            let bgData = filterResponses(xmlhttp.responseText);
            storage.set('bg-'+ theme.key, bgData);
            callback(bgData);
        }
        //TODO: Cover failed condition
    };
    xmlhttp.send();
}
init();