<template>
    <div id="navbar">
        <header>
            <span>Customize</span>
        </header>
        <ul>
            <li>
                Choose Background Theme
                <ul>
                    <li v-for='theme in themes' >
                        <input type="radio" v-model="settings.background.themeId" :id="theme.value" class="filled-in" :value="theme.id">
                        <label :for="theme.value">{{theme.lValue}}</label>
                    </li>
                </ul>
            </li>
            <li>Clock
                <div class="switch">
                    <label>
                        Hide
                        <input type="checkbox" v-model="settings.showUtilities.showClock">
                        <span class="lever"></span>
                        Show
                    </label>
                </div>
                <ul>
                    <li><input type="checkbox" v-model="settings.clock.showTwelveHour" id="clock-twelveHour" class="filled-in"> <label
                            for="clock-twelveHour">Twelve Hour Format</label>
                    </li>
                    <li><input type="checkbox" v-model="settings.clock.showDay" id="clock-day" class="filled-in"> <label
                            for="clock-day">Show Day</label></li>
                </ul>
            </li>
            <li>
                Weather
                <div class="switch">
                    <label>
                        Hide
                        <input type="checkbox" v-model="settings.showUtilities.showWeather">
                        <span class="lever"></span>
                        Show
                    </label>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import bgData from '../utils/backgroundData'

    export default{
        data: function(){
            /*return {
                showUtilities : {
                    showWeather: true,
                    showClock: true,
                },
                time: {
                    showTwelveHour: false,
                    showDay: true
                },
                weather: {
                    showCelsius: true,
                },
                background: {
                    themeId: 2
                }
            }*/
            debugger;
            return {
                themes: bgData.themes
            };
        },
        props:['settings'],

        methods(){

        }
    }
</script>