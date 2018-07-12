<template>
    <div v-on:click.stop="" @mousedown.stop="">
        <transition mode="out-in">
            <div v-if="isLoading" class="weather-loading" key="loading">Loading..</div>
            <div v-else id="weather" @click="toggle('showWeatherInfo')" key="notLoading" class="flex flex-center">
                <transition mode="out-in" name="fast-fade">
                    <div :key="weatherCity + temp" class="flex flex-center pr-10">
                        <div class="temperature" v-if="temp">
                            <div class="temperature-value">{{temp}}</div>
                            <sup class="temperature-unit" v-if="this.settings.unit === 'f'">&#8457;</sup>
                            <sup class="temperature-unit" v-if="this.settings.unit === 'c'">&#8451;</sup>
                        </div>
                        <div class="weather-icon flex flex-center flex-flow-column">
                            <i class="wi" :class="'wi-'+weatherClass"></i>
                            <span class="weather-city">{{weatherCity}}</span>
                        </div>
                    </div>
                </transition>
                <div class="arrow-down font-center opacity-0" v-show="!showWeatherInfo">
                    <svg width="23px" height="8px" viewBox="0 0 23 8">
                        <g transform="translate(-25.000000, -50.000000)" stroke="rgba(255,255,255,0.5)" fill="rgba(255,255,255,0.5)" stroke-width="2" fill-rule="nonzero">
                            <path d="M46.4347899,51.1140206 C45.950678,51.012669 45.6164104,51.012669 45.4319868,51.1140206 L36.6142361,55.969398 L27.7791956,51.1140206 C27.5025603,50.9619931 27.0530279,50.9619931 26.7763926,51.1140206 C26.4997572,51.2660481 26.4997572,51.5130927 26.7763926,51.6651202 L36.0955448,56.7865456 C36.2338625,56.8625594 36.4067596,56.9005662 36.5969463,56.9005662 C36.7698434,56.9005662 36.9600302,56.8625594 37.0983479,56.7865456 L46.4175001,51.6651202 C46.6134502,51.5637685 46.6192134,51.3800687 46.4347899,51.1140206 Z" id="Shape"></path>
                        </g>
                    </svg>
                </div>
            </div>
        </transition>
        <transition>
            <WeatherInfo
                    v-if="showWeatherInfo && localWeather && !isLoading" :data="localWeather"
                    :settings="settings"/>
        </transition>
    </div>
</template>
<style>
    #weather:hover .arrow-down {
        opacity: 1;
        animation: fade_in 0.4s;
        left: calc(50% - 11.5px)
    }
</style>
<script>
    import storage from '../utils/storage'
    import weatherUtil from '../utils/weatherUtil'
    import constants from '../utils/Constants'
    import CommonUtils from '../utils/common'
    import WeatherInfo from './WeatherInfo.vue'

    export default {
        beforeCreate() {
            this.localWeather = storage.get(constants.STORAGE.WEATHER)
        },
        props: ['settings', 'otherSettings'],
        mounted() {
            this.checkWeather()
        },
        data() {
            return {
                weatherClass: null,
                weatherCity: null,
                temp: null,
                localWeather: this.localWeather,
                error: null,
                isLoading: false,
                localSettings: Object.assign({}, this.settings)
            }
        },
        methods: {
            toggle(prop) {
                if (prop === 'showWeatherInfo') {
                    if (!this.otherSettings.weather.showWeatherInfo) {
                        this.$ga.event('weatherInfo', 'open')
                    }
                    this.otherSettings.weather.showWeatherInfo = !this.otherSettings.weather.showWeatherInfo
                }
            },
            getTemp(unit, temp) {
                // use for only converting fahrenheit
                if (!unit || !temp) {
                    return
                }
                return unit === "f" ? Math.round((9.0 / 5.0) * temp + 32.0) : temp
            },
            getWeatherClass(code) {
                if (!code) {
                    return
                }
                return weatherUtil[code]
            },
            checkWeather(forceUpdate) {

                if (!navigator.onLine) {
                    this.weatherCity = 'Offline'
                    return
                }

                let now = +new Date()
                const fifteenMin = 900000

                if (!this.localWeather || forceUpdate) {
                    this.prepareWeatherCall()
                    return
                }
                if (this.localWeather) {
                    // Check if local weather is not more than an hour old and also
                    // checks if local city
                    if ((now - this.localWeather.updatedOn) < fifteenMin) {
                        this.showWeather(this.localWeather)
                        this.isLoading = false

                    } else {
                        this.showWeather(this.localWeather)
                        this.prepareWeatherCall(true)
                    }
                }
            },
            getWeather(data) {
                if (!this.localWeather) {
                    this.isLoading = true
                }
                chrome.runtime.sendMessage({query: 'startWeather'})

                let url = 'https://api.subtletab.com/weather'
                if (data.type !== 'custom') {
                    url += '?lat=' + data.lat + '&long=' + data.long + '&type=geo'
                } else {
                    url += '?location=' + data.location + '&type=custom'
                }

                return CommonUtils.http(url).then(_resp => {
                    this.isLoading = false
                    this.updateLocalWeather(_resp)
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
                            //console.log(error)
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
                let current = weatherObj.current
                this.temp = this.getTemp(this.settings.unit, current.temp)
                this.weatherClass = this.getWeatherClass(current.code)
                this.weatherCity = current.city
            },
            updateLocalWeather(weatherObj) {
                if (!CommonUtils.isObject(weatherObj) || Object.keys(weatherObj).length === 0) {
                    return
                }
                this.localWeather = weatherObj
                storage.set(constants.STORAGE.WEATHER, this.localWeather)
            }
        },
        watch: {
            settings: {
                handler: function (newValue) {
                    if (this.localSettings.unit !== newValue.unit) {
                        this.checkWeather()
                    } else if (this.localSettings.location.name !== newValue.location.name ||
                        this.localSettings.location.type !== newValue.location.type) {
                        this.checkWeather(true)
                    }
                    this.localSettings = JSON.parse(JSON.stringify(newValue))
                },
                deep: true
            }
        },
        computed: {
            showWeatherInfo() {
                return this.otherSettings.weather.showWeatherInfo || false
            }
        },
        components: {
            WeatherInfo
        }
    }
</script>
