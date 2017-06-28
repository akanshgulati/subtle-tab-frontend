<template>
    <div>
        <div v-if="isLoading" class="weather-loading">Loading..</div>
        <div id="weather" :class="{'fade_in':!isLoading}">
            <div class="temperature" v-if="temp">
                <div class="temperature-value">{{temp}}</div>
                <sup class="temperature-unit" v-if="this.settings.unit === 'f'">&#8457;</sup>
                <sup class="temperature-unit" v-if="this.settings.unit === 'c'">&#8451;</sup>
            </div>
            <div class="weather-icon flex flex-center">
                <i class="wi" :class="'wi-'+weatherClass"></i>
                <span class="weather-city">{{weatherCity}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import storage from '../utils/storage';
    import weatherUtil from '../utils/weatherUtil';

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
                weatherClass: null,
                weatherCity: null,
                temp: null,
                localWeather: this.localWeather,
                error: null,
                isLoading: false
            }
        },
        methods: {
            checkWeather(){
                if(!navigator.onLine){
                    this.weatherCity = 'Offline';
                    return;
                }
                let self = this;
                let now = +new Date();
                const oneHourTime = 900000;
                if (this.localWeather) {
                    if((now - this.localWeather[0]) > oneHourTime){
                        navigator.geolocation.getCurrentPosition((position) => {
                                self.loadWeather(position.coords.latitude, position.coords.longitude);
                            }, (error) => {
                                console.log(error)
                            }, {timeout: 10000}
                        );
                    }else{
                        this.temp = this.settings.unit === 'f' ? this.localWeather[2] : this.localWeather[1];
                        this.weatherCode = this.localWeather[3];
                        this.weatherClass = weatherUtil[this.localWeather[3]];
                        this.weatherCity = this.localWeather[4];
                    }
                }else{
                    navigator.geolocation.getCurrentPosition((position) => {
                            self.loadWeather(position.coords.latitude, position.coords.longitude);
                        }, (error) => {
                            console.log(error)
                        }, {timeout: 10000}
                    );
                }
            },
            loadWeather(lat, long){
                const self = this;
                this.isLoading = true;
                chrome.runtime.sendMessage({query: 'startWeather'});

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
                            self.temp = self.settings.unit === 'f' ? weather.alt.temp : weather.temp;
                            self.weatherCode = weather.code;
                            self.weatherClass = weatherUtil[weather.code];
                            self.weatherCity = weather.city;

                            self.localWeather = [now, weather.temp, weather.alt.temp, weather.code, weather.city];
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