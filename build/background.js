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
init();