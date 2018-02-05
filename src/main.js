import Vue from 'vue'
import vueAnalytics from 'vue-analytics'
import App from './app.vue'
import {generateId} from './utils/common.js'
const USER = 'subtle_user'

let gaFields = {
    'storeGac': false,
    'storage': 'none'
}

if (localStorage && localStorage[USER]) {
    gaFields.clientId = localStorage[USER];
} else {
    gaFields.clientId = generateId();
    localStorage.setItem(USER, gaFields.clientId);
}

Vue.use(vueAnalytics, {
    id: 'UA-113476704-1',
    set: [
        { field: 'checkProtocolTask', value: function(){} }
    ],
    config: {
        'cookieDomain': 'none'
    },
    fields:  gaFields
})

new Vue({
    el: '#app',
    render: h => h(App)
});
