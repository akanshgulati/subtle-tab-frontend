import Vue from 'vue'
import App from './app.vue'
import {generateId} from './utils/common.js'
const USER = 'subtle_user'
/*
* Analytics code
 */
const GA_TRACKING_ID = 'UA-111434172-1';

let GA_CLIENT_ID
if (localStorage && localStorage[USER]) {
    GA_CLIENT_ID = localStorage[USER]
} else {
    GA_CLIENT_ID = generateId()
    localStorage.setItem(USER, GA_CLIENT_ID)
}


const $ga = {
    event(category, action, label, prop){
        if (!category || !action) {
            return
        }
        let message = `v=1&tid=${GA_TRACKING_ID}&cid=${GA_CLIENT_ID}&aip=1
        &t=event&ec=${category}&ea=${action}&sr=${window.screen.width}x${window.screen.height}&dl=${window.location.href}`
        if (label) {
            message += `&el=${label}`
        }
        if (prop) {
            message += `&ev=${prop}`
        }
        this.send(message)
    },
    page(title){
        let message = `v=1&tid=${GA_TRACKING_ID}&cid=${GA_CLIENT_ID}&aip=1
        &t=pageview&dp=${title}&sr=${window.screen.width}x${window.screen.height}`
        this.send(message);
    },
    send(message){
        let request = new XMLHttpRequest()
        request.open('GET', `https://www.google-analytics.com/collect?${message}`)
        request.send();
    }
}

Vue.prototype.$ga = Vue.$ga = $ga;

new Vue({
    el: '#app',
    render: createElement => createElement(App)
});
