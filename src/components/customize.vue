<template>
    <div>
        <header>
            <div class="flex flex-center right">
                <div class="close-btn" v-on:click="closeCustomizeMenu">
                    <svg width="1.5rem" height="1.5rem" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="close_btn"  fill-rule="nonzero" fill="#999999">
                                <path d="M6,0 C2.69169231,0 0,2.69146154 0,6 C0,9.30853846 2.69169231,12 6,12 C9.30830769,12 12,9.30853846 12,6 C12,2.69146154 9.30830769,0 6,0 Z M6,11.5384615 C2.94623077,11.5384615 0.461538462,9.05376923 0.461538462,6 C0.461538462,2.94623077 2.94623077,0.461538462 6,0.461538462 C9.05376923,0.461538462 11.5384615,2.94623077 11.5384615,6 C11.5384615,9.05376923 9.05376923,11.5384615 6,11.5384615 Z"
                                      id="Shape"></path>
                                <path d="M8.24007692,3.75992308 C8.14984615,3.66969231 8.004,3.66969231 7.91376923,3.75992308 L6,5.67369231 L4.08623077,3.75992308 C3.996,3.66969231 3.85015385,3.66969231 3.75992308,3.75992308 C3.66969231,3.85015385 3.66969231,3.996 3.75992308,4.08623077 L5.67369231,6 L3.75992308,7.91376923 C3.66969231,8.004 3.66969231,8.14984615 3.75992308,8.24007692 C3.80492308,8.28507692 3.864,8.30769231 3.92307692,8.30769231 C3.98215385,8.30769231 4.04123077,8.28507692 4.08623077,8.24007692 L6,6.32630769 L7.91376923,8.24007692 C7.95876923,8.28507692 8.01784615,8.30769231 8.07692308,8.30769231 C8.136,8.30769231 8.19507692,8.28507692 8.24007692,8.24007692 C8.33030769,8.14984615 8.33030769,8.004 8.24007692,7.91376923 L6.32630769,6 L8.24007692,4.08623077 C8.33030769,3.996 8.33030769,3.85015385 8.24007692,3.75992308 Z"
                                      id="Shape"></path>
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
            <span>Customize</span>
        </header>
        <ul>
            <li>
                <h4>Wallpaper Category</h4>
                <ul class="thumbnails">
                    <li v-for='(theme, index) in themes' v-bind:class="{active: isActiveTheme(index)}" class="thumbnail">
                        <!--<input type="radio" v-model="settings.background.themeId" :id="theme.value" class="hide" :value="theme.id">-->
                        <div v-on:click="selectActive(index)" :style=" { 'background-image': 'url(' + theme.imgUrl + ')'}" class="thumbnail-image"></div>
                        <p class="thumbnail-name font-center">{{theme.lValue}}</p>
                    </li>
                </ul>
            </li>
            <li class="flex flex-center">
                <h4 class="btn-group-header">Change wallpaper after</h4>
                <div class="btn-group">
                    <div class="btn-inner" :class="{'active': settings.background.changeInterval === 5}" v-on:click="setBgInterval(5)">5 Tabs</div>
                    <div class="btn-inner" :class="{'active': settings.background.changeInterval === 10}" v-on:click="setBgInterval(10)">10 Tabs</div>
                    <div class="btn-inner" :class="{'active': settings.background.changeInterval === 15}" v-on:click="setBgInterval(15)">15 Tabs</div>
                    <div class="btn-inner" :class="{'active': settings.background.changeInterval === 20}" v-on:click="setBgInterval(20)">20 Tabs</div>
                </div>
            </li>
            <li class="flex flex-center">
                <div class="flex-grow-1 flex flex-flow-column">
                    <div class="flex flex-center">
                        <h4>Clock</h4>
                        <div class="switch">
                            <label>
                                <input type="checkbox" v-model="settings.showUtilities.showClock">
                                <span class="lever"></span>
                            </label>
                        </div>
                    </div>

                    <ul>
                        <li><input type="checkbox" v-model="settings.clock.showTwelveHour" id="clock-twelveHour" class="filled-in" :disabled="!settings.showUtilities.showClock">
                            <label for="clock-twelveHour">12 Hour Format</label>
                        </li>
                        <li><input type="checkbox" v-model="settings.clock.showDay" id="clock-day" class="filled-in" :disabled="!settings.showUtilities.showClock">
                            <label for="clock-day">Show Day</label></li>
                    </ul>
                </div>
                <div class="flex-grow-1 flex flex-flow-column">
                    <div class="flex flex-center">
                        <h4>Weather</h4>
                        <div class="switch">
                            <label>
                                <input type="checkbox" v-model="settings.showUtilities.showWeather">
                                <span class="lever"></span>
                            </label>
                        </div>
                    </div>

                    <ul>
                        <li>
                            <input type="radio" v-model="settings.weather.unit" id="weather-celcius" class="filled-in" value="c" :disabled="!settings.showUtilities.showWeather">
                            <label for="weather-celcius">Celsius</label>
                        </li>
                        <li>
                            <input type="radio" v-model="settings.weather.unit" id="weather-fehren" class="filled-in" value="f" :disabled="!settings.showUtilities.showWeather">
                            <label for="weather-fehren">Fahrenheit</label>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
        <div class="customize-footer">
            <span class="version">v{{version}}</span>
            <div class="success-links">
                <a href="https://goo.gl/forms/XcIS7fojHNT166nA2" target="_blank">Support</a>
                <a href="https://goo.gl/forms/hMD1i4sXIUVwkKtD2" target="_blank">Feedback</a>
            </div>
        </div>
    </div>
</template>

<script>
    import bgData from '../utils/backgroundData'
    import storage from '../utils/storage'

    export default{
        data: function(){
            return {
                selectedTheme: this.settings.background.themeId,
                themes: bgData.themes,
                version: chrome.runtime.getManifest().version
            };
        },
        methods: {
            isActiveTheme: function(index){
                return this.settings.background.themeId === (index + 1);
            },
            selectActive(index){
                this.settings.background.themeId = (index + 1);
            },
            closeCustomizeMenu(){
                this.$emit('closeCustomizeMenu');
            },
            setBgInterval(value){
                this.settings.background.changeInterval = value;
            }
        },
        props:['settings'],
        computed: {

        }
    }
</script>