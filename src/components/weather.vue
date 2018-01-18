<template>
    <div>
        <div v-if="isLoading" class="weather-loading">Loading..</div>
        <div id="weather" @click="toggle('showWeatherInfo')" :class="{'fade_in':!isLoading}">
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
        <WeatherInfo v-if="showWeatherInfo && localWeather" :data="localWeather" :settings="settings"></WeatherInfo>
    </div>
</template>
<script>
    import storage from '../utils/storage';
    import weatherUtil from '../utils/weatherUtil';
    import constants from '../utils/Constants';
    import commonUtils from '../utils/common';
    import WeatherInfo from './WeatherInfo.vue';

    export default {
        beforeCreate(){
            this.localWeather = storage.get(constants.STORAGE.WEATHER);
        },
        props: ['settings'],
        mounted () {
            this.checkWeather();
        },
        data () {
            return {
                weatherClass: null,
                weatherCity: null,
                temp: null,
                localWeather: this.localWeather,
                error: null,
                isLoading: false,
                localSettings: Object.assign({}, this.settings),
                showWeatherInfo: false
            }
        },
        methods: {
            toggle(prop) {
                this[prop] = !this[prop];
            },
            getTemp(unit, temp) {
                // use for only converting fahrenheit
                if(!unit || !temp){
                    return;
                }
                return unit === "f"? Math.round((5.0 / 9.0) * (temp - 32.0)): temp;
            },
            getWeatherClass(code) {
                if (!code) {
                    return
                }
                return weatherUtil[code]
            },
            checkWeather(forceUpdate){

                if (!navigator.onLine) {
                    this.weatherCity = 'Offline'
                    return
                }

                let now = +new Date();
                const oneHourTime = 900000;

                if(!this.localWeather || forceUpdate){
                    this.prepareWeatherCall();
                    return;
                }
                if (this.localWeather) {
                    // Check if local weather is not more than an hour old and also
                    // checks if local city
                    if ((now - this.localWeather[0]) < oneHourTime) {
                        this.showWeather(this.localWeather)
                        this.isLoading = false;

                    } else {
                        this.showWeather(this.localWeather)
                        this.prepareWeatherCall(true);
                    }
                }
            },
            getWeather(data){
                if(!this.localWeather) {
                    this.isLoading = true;
                }
                chrome.runtime.sendMessage({query: 'startWeather'});

                let url = 'https://api.subtletab.com/weather'
                if (data.type !== 'custom') {
                    url += '?lat=' + data.lat + '&long=' + data.long + '&type=geo'
                } else {
                    url += '?location=' + data.location + '&type=custom'
                }

                return commonUtils.http(url).then(_resp =>{
                    let weather = _resp
                    this.isLoading = false;
                    this.updateLocalWeather(weather)
                    this.showWeather(this.localWeather)
                })
            },
            prepareWeatherCall(noLoading) {
                let options
                if (this.settings.location.type !== 'custom') {
                    // adding loading because below call takes time
                    this.isLoading = !noLoading
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            options = {
                                lat: position.coords.latitude,
                                long: position.coords.longitude,
                                type: 'geo'
                            }
                            this.getWeather(options)
                        },
                        (error) => {
                            console.log(error)
                        },
                        {
                            timeout: 10000
                        }
                    )
                } else {
                    if (this.settings.location && this.settings.location.name) {
                        options = {
                            location: this.settings.location.name,
                            type: 'custom'
                        }
                        this.getWeather(options)
                    }
                }
            },
            showWeather(weatherObj) {
                let current = weatherObj.current;
                this.temp = this.getTemp(this.settings.unit, current.temp)
                this.weatherClass = this.getWeatherClass(current.code)
                this.weatherCity = current.city
            },
            updateLocalWeather(weatherObj) {
                if (Object.keys(weatherObj).length !== 4) {
                    return
                }
                weatherObj.timeStamp = +new Date();
                this.localWeather = weatherObj
                storage.set(constants.STORAGE.WEATHER, this.localWeather);
            }
        },
        watch:{
            settings:{
                handler: function (newValue) {
                    if (this.localSettings.unit !== newValue.unit) {
                        this.checkWeather()
                    } else if (this.localSettings.location.name !== newValue.location.name ||
                        this.localSettings.location.type !== newValue.location.type) {
                        this.checkWeather(true)
                    }
                    this.localSettings = JSON.parse(JSON.stringify(newValue));
                },
                deep: true
            }
        },
        components:{
            WeatherInfo
        }
    }
</script>
