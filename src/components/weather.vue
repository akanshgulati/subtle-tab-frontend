<template>
    <div>
        <div v-if="isLoading" class="weather-loading">Loading..</div>
        <div id="weather" :class="{'fade_in':!isLoading}">
            <div class="temperature" v-if="temp">
                <div class="temperature-value">{{temp}}</div>
                <sup class="temperature-unit" v-if="this.settings.unit === 'f'">&#8457;</sup>
                <sup class="temperature-unit" v-if="this.settings.unit === 'c'">&#8451;</sup>
            </div>
            <div class="weather-icon flex">
                <i class="w-icon" :class="'icon-'+weatherCode"></i>
                <span class="weather-city">{{weatherCity}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import storage from '../utils/storage';

    export default {
        beforeCreate(){
            this.localWeather = storage.get('weather');
        },
        props: ['settings'],
        mounted () {
            this.checkWeather();
        },
        data () {
            return {
                weatherCode: null,
                weatherCity: null,
                temp: null,
                localWeather: this.localWeather,
                error: null,
                isLoading: false
            }
        },
        methods: {
            checkWeather(){
                let self = this;
                let now = +new Date();
                const oneHourTime = 1800000;
                if (this.localWeather) {
                    if((now - this.localWeather[0]) > oneHourTime){
                        navigator.geolocation.getCurrentPosition(function (position) {
                            self.loadWeather(position.coords.latitude, position.coords.longitude);
                        });
                    }else{
                        this.temp = this.settings.unit === 'f' ? this.localWeather[1] : this.localWeather[2];
                        this.weatherCode = this.localWeather[3];
                        this.weatherCity = this.localWeather[4];
                    }
                }else{
                    navigator.geolocation.getCurrentPosition(function (position) {
                        self.loadWeather(position.coords.latitude, position.coords.longitude);
                    });
                }
            },
            loadWeather(lat, long){
                const self = this;
                this.isLoading = true;

                return new Promise((resolve, reject) => {

                    let xmlhttp = new XMLHttpRequest();

                    let url = 'http://api.subtletab.com/weather/';
                    url += '?lat=' + lat + '&long=' + long;

                    xmlhttp.open('GET', url);
                    xmlhttp.setRequestHeader('chrome-extension', btoa(chrome.runtime.id));
                    xmlhttp.onreadystatechange = () => {
                        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                            let weather = JSON.parse(xmlhttp.responseText);
                            let now = +new Date();
                            self.isLoading = false;
                            self.temp = weather.temp;
                            self.weatherCode = weather.code;
                            self.weatherCity = weather.city;

                            self.localWeather = [now, self.settings.unit === 'f' ? weather.temp : weather.alt.temp, self.settings.unit === 'c' ? weather.temp : weather.alt.temp, self.weatherCode, self.weatherCity];
                            storage.set('weather', this.localWeather);
                            resolve();
                        }
                    };
                    xmlhttp.onerror = ()=>{
                        reject(xmlhttp.status);
                    };
                    xmlhttp.send();
                });
            }
        },
        watch:{
            settings:{
                handler:function(newValue){
                    this.checkWeather();
                },
                deep: true
            }
        }
    }
</script>