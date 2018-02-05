import Vue from 'vue'
import vueAnalytics from 'vue-analytics'
import App from './app.vue'
Vue.use(vueAnalytics, {
    id: 'UA-111434172-1',
    set: [
        { field: 'checkProtocolTask', value: function(){} }
    ],
    config: {
        'cookieDomain': 'none'
    },
    fields: {
        'cookieDomain': 'none'
    }
})
new Vue({
    el: '#app',
    render: h => h(App)
});
