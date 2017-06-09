<template>
    <div>
        <div id="weather" :class="{'fade_in':!isLoading}">
            <div class="temperature" v-if="temp">
                <div class="temperature-value">{{temp}}</div>
                <sup class="temperature-unit" v-if="this.settings.unit === 'f'">&#8457;</sup>
                <sup class="temperature-unit" v-if="this.settings.unit === 'c'">&#8451;</sup>
            </div>
            <div class="weather-icon">
                <i class="w-icon" :class="'icon-'+weatherCode"></i>
            </div>
        </div>
        <div v-if="isLoading" class="weather-loading">Loading..</div>
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
                const oneHourTime = 3600000;
                if (this.localWeather) {
                    if((now - this.localWeather[0]) > oneHourTime){
                        navigator.geolocation.getCurrentPosition(function (position) {
                            self.loadWeather(position.coords.latitude, position.coords.longitude);
                        });
                    }else{
                        this.temp = this.settings.unit === 'f' ? this.localWeather[1] : this.localWeather[2];
                        this.weatherCode = this.localWeather[3];
                    }
                }else{
                    navigator.geolocation.getCurrentPosition(function (position) {
                        self.loadWeather(position.coords.latitude, position.coords.longitude);
                    });
                }
            },
            loadWeather(lat, lon){
                const self = this;
                this.isLoading = true;
                reallySimpleWeather.weather({
                    wunderkey: '',
                    location: lat + ',' + lon,
                    woeid: '',
                    unit: self.settings.unit === 'f' ? 'f' : 'c',
                    success: (weather) => {
                        this.isLoading = false;
                        let now = +new Date();
                        self.temp = weather.temp;
                        self.weatherCode = weather.code;
                        this.localWeather = [now, self.settings.unit === 'f' ? weather.temp : weather.alt.temp, self.settings.unit === 'c' ? weather.temp : weather.alt.temp, self.weatherCode];
                        storage.set('weather', this.localWeather);
                    },
                    error: function (error) {
                        console.log(error);
                        self.error = error
                    }
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