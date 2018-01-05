<template>
    <div v-on:click.stop="" v-on:keydown.stop="" class="flex flex-flow-column">
        <header>
            <div class="flex flex-center right">
                <div class="close-btn" v-on:click="closeCustomizeMenu">
                    <svg width="1.5rem" height="1.5rem" viewBox="0 0 12 12" version="1.1"
                         xmlns="http://www.w3.org/2000/svg">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="close_btn" fill-rule="nonzero" fill="#999999">
                                <path d="M6,0 C2.69169231,0 0,2.69146154 0,6 C0,9.30853846 2.69169231,12 6,12 C9.30830769,12 12,9.30853846 12,6 C12,2.69146154 9.30830769,0 6,0 Z M6,11.5384615 C2.94623077,11.5384615 0.461538462,9.05376923 0.461538462,6 C0.461538462,2.94623077 2.94623077,0.461538462 6,0.461538462 C9.05376923,0.461538462 11.5384615,2.94623077 11.5384615,6 C11.5384615,9.05376923 9.05376923,11.5384615 6,11.5384615 Z"
                                      id="Shape"></path>
                                <path d="M8.24007692,3.75992308 C8.14984615,3.66969231 8.004,3.66969231 7.91376923,3.75992308 L6,5.67369231 L4.08623077,3.75992308 C3.996,3.66969231 3.85015385,3.66969231 3.75992308,3.75992308 C3.66969231,3.85015385 3.66969231,3.996 3.75992308,4.08623077 L5.67369231,6 L3.75992308,7.91376923 C3.66969231,8.004 3.66969231,8.14984615 3.75992308,8.24007692 C3.80492308,8.28507692 3.864,8.30769231 3.92307692,8.30769231 C3.98215385,8.30769231 4.04123077,8.28507692 4.08623077,8.24007692 L6,6.32630769 L7.91376923,8.24007692 C7.95876923,8.28507692 8.01784615,8.30769231 8.07692308,8.30769231 C8.136,8.30769231 8.19507692,8.28507692 8.24007692,8.24007692 C8.33030769,8.14984615 8.33030769,8.004 8.24007692,7.91376923 L6.32630769,6 L8.24007692,4.08623077 C8.33030769,3.996 8.33030769,3.85015385 8.24007692,3.75992308 Z"
                                      id="Shape"></path>
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
            <span>Customize (C)</span>
        </header>
        <div class="flex-grow-1 flex main-window">
                <aside class="csidebar">
                    <ul>
                        <li>
                            <input type="radio" v-model="activeTab" value="general" id="tab4" @change="categoryChange">
                            <label for="tab4" class="flex-center" :class="{'active': activeTab === 'general'}">
                                <svg viewBox="0 0 21 21">
                                    <use xlink:href="#icon-general"></use></svg>
                                <span>General</span>
                            </label>
                        </li>
                        <li>
                            <input type="radio" v-model="activeTab" value="background" id="tab1" @change="categoryChange">
                            <label for="tab1" class="flex-center"  :class="{'active': activeTab === 'background'}">
                                <svg viewBox="0 0 21 21">
                                    <use xlink:href="#icon-wallpaper"></use>
                                </svg>
                                <span>Wallpaper</span>
                            </label>
                        </li>
                        <li>
                            <input type="radio" v-model="activeTab" value="clock" id="tab2" :change="categoryChange">
                            <label for="tab2" class="flex-center" :class="{'active': activeTab === 'clock'}">
                                <svg><use xlink:href="#icon-clock"></use></svg>
                                <span>Clock</span>
                            </label>
                        </li>
                        <li>
                            <input type="radio" v-model="activeTab" value="weather" id="tab3" @change="categoryChange">
                            <label for="tab3" class="flex-center"  :class="{'active': activeTab === 'weather'}">
                                <svg viewBox="0 0 21 21">
                                    <use xlink:href="#icon-weather"></use>
                                </svg>
                                <span>Weather</span>
                            </label>
                        </li>
                        <li class="separator">
                            <input type="radio" v-model="activeTab" value="whatsnew" id="tab5" @change="categoryChange">
                            <label for="tab5" class="flex-center"  :class="{'active': activeTab === 'whatsnew'}">
                                <svg viewBox="0 0 21 21">
                                    <use xlink:href="#icon-whatsnew"></use>
                                </svg>
                                <span>What's new</span>
                            </label>
                        </li>
                    </ul>
                </aside>
                <div class="container">
                    <section v-if="activeTab === 'general'">
                        <div>
                            <h4 class="font-medium text-black semi-bold">Show/hide Widgets</h4>
                            <ul class="ph-10">
                                <li class="inline-list-item">
                                    <div>
                                        <div class="font-small semi-bold">Weather widget</div>
                                        <small>Show/hide weather widget</small>
                                    </div>
                                    <div class="switch">
                                        <label>
                                            <input type="checkbox" v-model="settings.showUtilities.showWeather">
                                            <span class="lever mar-0"></span>
                                        </label>
                                    </div>
                                </li>
                                <li class="inline-list-item">
                                    <div>
                                        <div class="font-small semi-bold">Date & Time widget</div>
                                        <small>Show/hide date and time widget</small>
                                    </div>
                                    <div class="switch">
                                        <label>
                                            <input type="checkbox" v-model="settings.showUtilities.showClock">
                                            <span class="lever mar-0"></span>
                                        </label>
                                    </div>
                                </li>
                                <li class="inline-list-item">
                                    <div>
                                        <div class="font-small semi-bold">Notes widget</div>
                                        <small>Show/hide notes widget</small>
                                    </div>
                                    <div class="switch">
                                        <label>
                                            <input type="checkbox" v-model="settings.showUtilities.showNotes">
                                            <span class="lever mar-0"></span>
                                        </label>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </section>
                    <section v-if="activeTab === 'background'">
                        <div>
                            <h4 class="font-medium text-black semi-bold">Settings</h4>
                            <ul class="ph-10">
                                <li class="inline-list-item">
                                    <div>
                                        <div class="font-small semi-bold">Wallpaper Change Interval (new tabs)</div>
                                        <small>Choose lower value with high internet speed to prevent loading.</small>
                                    </div>
                                    <div class="right">
                                        <input type="radio" v-model="settings.background.changeInterval" id="bgInterval1"
                                               class="filled-in" value="1">
                                        <label for="bgInterval1" class="inline-radio">1 tab</label>
                                        <input type="radio" v-model="settings.background.changeInterval" id="bgInterval2"
                                               class="filled-in" value="2">
                                        <label for="bgInterval2" class="inline-radio">2 tabs</label>
                                        <input type="radio" v-model="settings.background.changeInterval" id="bgInterval5"
                                               class="filled-in" value="5">
                                        <label for="bgInterval5" class="inline-radio">5 tabs</label>
                                        <input type="radio" v-model="settings.background.changeInterval" id="bgInterval10"
                                               class="filled-in" value="10">
                                        <label for="bgInterval10" class="inline-radio">10 tabs</label>
                                    </div>
                                </li>
                                <li class="inline-list-item">
                                    <div>
                                        <div class="font-small semi-bold">Wallpaper Type</div>
                                        <small>Choose default for Subtle collection or add custom wallpapers</small>
                                    </div>
                                    <div class="right">
                                        <input type="radio" v-model="settings.background.type" id="wallpaperType2"
                                               class="filled-in" value="predefined" @change="backgroundTypeChange"/>
                                        <label for="wallpaperType2" class="inline-radio">Default</label>
                                        <input type="radio" v-model="settings.background.type" id="wallpaperType1"
                                               class="filled-in" value="custom" @change="backgroundTypeChange"/>
                                        <label for="wallpaperType1" class="inline-radio">Custom</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div v-if="settings.background.type !== 'custom'" :class="{'fade_in': settings.background.type !== 'custom'}">
                            <h4 class="font-medium text-black semi-bold">Default Category</h4>
                            <ul class="flex">
                                <li v-for='(theme, index) in themes' v-bind:class="{active: isActiveTheme(index)}" class="thumbnail">
                                    <input type="radio" v-model="settings.background.themeId"
                                                       :id="theme.value" class="hide" :value="theme.id">
                                    <div v-on:click="selectActive(index)"
                                         :style=" { 'background-image' : 'url(' + theme.imgUrl + ')'}"
                                         class="thumbnail-image"></div>
                                    <p class="thumbnail-name font-center">{{theme.lValue}}</p>
                                </li>
                            </ul>
                        </div>
                        <div v-if="settings.background.type === 'custom'" :class="{'fade_in': settings.background.type === 'custom'}">
                            <h4 class="font-medium text-black semi-bold">Custom List</h4>
                            <small>Add each image url in new line and press save list button. Image url should end with (.png, .jpg)</small>
                            <textarea name="" id="" cols="30" rows="15" v-model="currentBgCustom"></textarea>
                            <button class="save-button font-xsmall mar-0" v-on:click.stop="saveCustomBg"
                                    :disabled="!currentBgCustom.trim().length">Save List</button>
                            <span v-html="isCustomBgSaveMsg"></span>
                        </div>
                    </section>
                    <section v-if="activeTab === 'clock'">
                        <div>
                            <h4 class="font-medium text-black semi-bold">Settings</h4>
                            <ul class="ph-10">
                                <li class="inline-list-item">
                                    <div>
                                        <div class="font-small semi-bold">Clock format</div>
                                        <small>Choose 12 hour or 24 hour clock format</small>
                                    </div>
                                    <div class="right">
                                        <input type="radio" v-model="settings.clock.type" id="clock12"
                                               class="filled-in" value="twelve">
                                        <label for="clock12" class="inline-radio">12 Hour</label>
                                        <input type="radio" v-model="settings.clock.type" id="clock24"
                                               class="filled-in" value="twentyfour">
                                        <label for="clock24" class="inline-radio">24 Hour</label>
                                    </div>
                                </li>
                                <li class="inline-list-item">
                                    <div>
                                        <div class="font-small semi-bold">Date (show/hide)</div>
                                        <small>Show/hide date along with time</small>
                                    </div>
                                    <div class="switch">
                                        <label>
                                            <input type="checkbox" v-model="settings.clock.showDay">
                                            <span class="lever mar-0"></span>
                                        </label>
                                    </div>

                                </li>
                            </ul>
                        </div>
                    </section>
                    <section v-if="activeTab === 'weather'">
                        <div>
                            <h4 class="font-medium text-black semi-bold">Location settings</h4>
                            <ul class="ph-10">
                                <li class="inline-list-item">
                                    <div>
                                        <div class="font-small semi-bold">Location type</div>
                                        <small>Choose either default geo-location or add custom location</small>
                                    </div>
                                    <div class="right">
                                        <input type="radio" v-model="settings.weather.location.type" id="weather-geo" class="filled-in"
                                               value="geo" @change="locationTypeChange">
                                        <label for="weather-geo" class="inline-radio">Default Geolocation</label>
                                        <input type="radio" v-model="settings.weather.location.type" id="weather-custom" class="filled-in"
                                               value="custom" @change="locationTypeChange">
                                        <label for="weather-custom" class="inline-radio">Custom</label>
                                    </div>
                                </li>
                                <li class="inline-list-item flex overflow-hidden flex-center flex-justify-space-between">
                                    <div>
                                        <div class="font-small semi-bold">City/Town/Village Name</div>
                                        <small>Enter correct name and press save button.</small>
                                    </div>
                                    <div class="right flex">
                                        <input placeholder="e.g. Mumbai" type="text" v-model="customLocation" class="mar-0"
                                               :disabled="settings.weather.location.type==='geo'" v-on:keydown.stop="">
                                        <button class="save-button font-xsmall" v-on:click.stop="updateCustomLocation"
                                                :disabled="customLocation == settings.weather.location.name">Save</button>
                                    </div>
                                </li>
                            </ul>
                            <h4 class="font-medium text-black semi-bold">Miscellaneous Settings</h4>
                            <ul class="ph-10">
                                <li class="inline-list-item">
                                    <span class="font-small semi-bold">Temperature Unit</span>
                                    <div class="right">
                                        <input type="radio" v-model="settings.weather.unit" id="weather-celcius" class="filled-in"
                                               value="c">
                                        <label for="weather-celcius" class="inline-radio">Celsius</label>
                                        <input type="radio" v-model="settings.weather.unit" id="weather-fehren" class="filled-in"
                                               value="f">
                                        <label for="weather-fehren" class="inline-radio">Fahrenheit</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section v-if="activeTab === 'whatsnew'" class="full-height">
                        <whats-new class="full-height"></whats-new>
                    </section>
                </div>
            </div>
        <footer class="customize-footer font-xsmall flex flex-justify-space-between bg-light-grey">
            <div class="flex">
                <span class="version">v{{version}}</span>
                <span style="margin:0 0.5rem">|</span>
                <div class="flex">
                    <span class="semi-bold">Shortcuts</span>
                    <ul class="flex shortcut-bar">
                        <li><span class="shortcut-key">N</span> Open Notes</li>
                        <li><span class="shortcut-key">C</span> Open Customize</li>
                        <li><span class="shortcut-key">Esc</span> Close all</li>
                    </ul>
                </div>
            </div>
            <div class="success-links">
                <a class="text-black" href="https://goo.gl/forms/XcIS7fojHNT166nA2" target="_blank">Support</a>
                <a class="text-black" href="https://goo.gl/forms/hMD1i4sXIUVwkKtD2" target="_blank">Feedback</a>
            </div>
        </footer>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: none;">
            <defs>
                <g id="icon-general">
                    <path d="M10.05774,8.83187063 L0.45885,8.83187063 C0.503546734,8.83187063 0.53885,8.86729826 0.53885,8.91039111 C0.53885,8.95348396 0.503546734,8.98891159 0.45885,8.98891159 L10.05774,8.98891159 C10.0130433,8.98891159 9.97774,8.95348396 9.97774,8.91039111 C9.97774,8.86729826 10.0130433,8.83187063 10.05774,8.83187063 Z" ></path>
                    <path d="M20.56047,8.83187063 L15.46755,8.83187063 C15.5122467,8.83187063 15.54755,8.86729826 15.54755,8.91039111 C15.54755,8.95348396 15.5122467,8.98891159 15.46755,8.98891159 L20.56047,8.98891159 C20.5157733,8.98891159 20.48047,8.95348396 20.48047,8.91039111 C20.48047,8.86740955 20.5158719,8.83187063 20.56047,8.83187063 Z" ></path>
                    <path d="M7.24563,16.1486849 L0.45885,16.1486849 C0.503546734,16.1486849 0.53885,16.1841125 0.53885,16.2272053 C0.53885,16.2702982 0.503546734,16.3057258 0.45885,16.3057258 L7.24563,16.3057258 C7.20093327,16.3057258 7.16563,16.2702982 7.16563,16.2272053 C7.16563,16.1841125 7.20093327,16.1486849 7.24563,16.1486849 Z" ></path>
                    <path d="M20.56047,16.1486849 L12.76254,16.1486849 C12.8072367,16.1486849 12.84254,16.1841125 12.84254,16.2272053 C12.84254,16.2702982 12.8072367,16.3057258 12.76254,16.3057258 L20.56047,16.3057258 C20.5157733,16.3057258 20.48047,16.2702982 20.48047,16.2272053 C20.48047,16.1842238 20.5158719,16.1486849 20.56047,16.1486849 Z" ></path>
                    <path d="M4.41273,1.95388683 L0.45885,1.95388683 C0.503546734,1.95388683 0.53885,1.98931445 0.53885,2.03240731 C0.53885,2.07550016 0.503546734,2.11092778 0.45885,2.11092778 L4.41273,2.11092778 C4.36803327,2.11092778 4.33273,2.07550016 4.33273,2.03240731 C4.33273,1.98931445 4.36803327,1.95388683 4.41273,1.95388683 Z" ></path>
                    <path d="M20.56047,1.95388683 L9.82296,1.95388683 C9.86765673,1.95388683 9.90296,1.98931445 9.90296,2.03240731 C9.90296,2.07550016 9.86765673,2.11092778 9.82296,2.11092778 L20.56047,2.11092778 C20.5157733,2.11092778 20.48047,2.07550016 20.48047,2.03240731 C20.48047,1.98942575 20.5158719,1.95388683 20.56047,1.95388683 Z" ></path>
                    <path d="M6.00936,3.55593048 C5.17394673,3.55593048 4.49252,2.87210331 4.49252,2.03198583 C4.49252,1.19192447 5.17389062,0.508251908 6.00936,0.508251908 C6.84482938,0.508251908 7.5262,1.19192447 7.5262,2.03198583 C7.5262,2.8722333 6.84485383,3.55593048 6.00936,3.55593048 Z M6.00936,0.351210949 C5.08396963,0.351210949 4.33252,1.10521479 4.33252,2.03198583 C4.33252,2.95892123 5.08392327,3.71297144 6.00936,3.71297144 C6.93479673,3.71297144 7.6862,2.95892123 7.6862,2.03198583 C7.6862,1.10521479 6.93475037,0.351210949 6.00936,0.351210949 Z" ></path>
                    <path d="M8.84226,17.7515715 C8.00682229,17.7515715 7.32542,17.0677197 7.32542,16.2274161 C7.32542,15.3872986 8.00684673,14.7034714 8.84226,14.7034714 C9.67798827,14.7034714 10.35931,15.3871932 10.35931,16.2274161 C10.3594681,17.0677807 9.67807764,17.7515715 8.84226,17.7515715 Z M8.84226,14.5464305 C7.91682327,14.5464305 7.16542,15.3004807 7.16542,16.2274161 C7.16542,17.1546676 7.91671827,17.9086124 8.84226,17.9086124 C9.76790673,17.9086124 10.51931,17.1545622 10.51931,16.2274161 C10.5196089,15.3005556 9.76794582,14.5464305 8.84226,14.5464305 Z" ></path>
                    <path d="M11.65521,10.4345465 C10.8192962,10.4345465 10.13774,9.75063858 10.13774,8.91039111 C10.13774,8.07028052 10.8193695,7.38644645 11.65521,7.38644645 C12.4904621,7.38644645 13.17163,8.07011212 13.17163,8.91039111 C13.17163,9.75072622 12.490406,10.4345465 11.65521,10.4345465 Z M11.65521,7.22940549 C10.7294337,7.22940549 9.97774,7.98337562 9.97774,8.91039111 C9.97774,9.83751199 10.7295386,10.5915875 11.65521,10.5915875 C12.5804586,10.5915875 13.33163,9.83730545 13.33163,8.91039111 C13.33163,7.98348942 12.5804708,7.22940549 11.65521,7.22940549 Z" ></path>
                </g>

                <g id="icon-clock">
                    <circle id="Oval" cx="10.5" cy="10.5" r="9.13133536"></circle>
                    <polyline id="Shape" transform="translate(10.842248, 8.898166) rotate(-51.000000) translate(-10.842248, -8.898166) " points="6.49624149 8.22774104 9.10632618 11.3606903 15.1882544 6.43564197"></polyline>
                </g>
                <g id="icon-wallpaper">
                    <polyline id="Shape" points="0.00857797986 14.8245426 5.23298105 8.6542509 11.1104345 15.595829"></polyline>
                    <polyline id="Shape" points="8.11946374 11.4834513 14.158003 0.170099836 20.8539462 12.7060758"></polyline>
                    <ellipse id="Oval" cx="6.9321391" cy="3.82227375" rx="1.95915115" ry="1.91656091"></ellipse>
                </g>
                <g id="icon-weather">
                    <path d="M18.9567406,12.9043462 C18.9567406,13.9575538 18.1324913,14.826995 17.1176733,14.826995 L7.25454115,14.826995 C5.60604239,14.826995 4.29641646,13.4258931 4.29641646,11.7177447 C4.29641646,11.0004029 4.53261347,10.3403561 4.93009726,9.81375234 C5.47417955,9.08629676 6.3244414,8.61870636 7.28064838,8.61870636 C7.42397756,8.61870636 7.56569576,8.62292862 7.70419202,8.64487453 C8.00392768,7.38065228 8.77112968,6.30589152 9.80551621,5.63244155 C10.5401671,5.15139885 11.4116559,4.87479193 12.343414,4.87479193 C14.9806708,4.87479193 17.1178155,7.08936565 17.1178155,9.82204956 C17.1178155,10.2237531 17.072187,10.6137227 16.9842469,10.9884235 C17.028217,10.9850358 17.0722344,10.9919093 17.1178155,10.9919093 C18.1325387,10.9918602 18.9567406,11.8527587 18.9567406,12.9043462 Z"></path>
                    <path d="M9.80542145,5.63278522 C8.77103491,6.30623519 8.00383292,7.38143781 7.70409726,8.64561097 C7.56564838,8.62366506 7.42393017,8.62027743 7.28055362,8.62027743 C6.32439401,8.62027743 5.47408479,9.089488 4.93000249,9.81699267 C3.83861596,9.2211635 3.09420449,8.03628039 3.09420449,6.6691038 C3.09420449,4.70609804 4.63031421,3.11445449 6.52472319,3.11445449 C8.07225187,3.11445449 9.37865586,4.17448644 9.80542145,5.63278522 Z"></path>
                    <path d="M6.46,0 L6.46,1.86564838"></path>
                    <path d="M0,6.69375 L1.80049875,6.69375"></path>
                    <path d="M9.74268828,3.39602011 L11.065818,2.02501403"></path>
                    <path d="M1.79016958,11.3939565 L3.11329925,10.0229504"></path>
                    <path d="M1.79016958,2.02501403 L3.11329925,3.39602011"></path>
                </g>
                <g id="icon-whatsnew">
                    <path d="M17.1432424,1.48612748 C18.8262781,1.48612748 20.1395453,2.95036374 19.9566757,4.62374579 L19.0055056,13.3268203 C18.8462784,14.7829455 17.6770643,15.8494186 16.0271805,15.8494186 L15.6098951,15.8494186 L15.5352461,16.2599727 L15.1542502,18.3553726 C15.0286389,19.0466277 14.1734653,19.3090833 13.681496,18.8089868 L10.9157511,15.9987006 L10.7688351,15.8494186 L10.5593849,15.8494186 L4.62197891,15.8494186 C3.17492962,15.8494186 1.96595019,14.765394 1.8086188,13.3267848 L0.857452054,4.62374096 C0.674511168,2.95069577 1.98743707,1.48612748 3.67080828,1.48612748 L17.1432424,1.48612748 Z"></path>
                    <circle  fill-rule="nonzero" cx="6.86892358" cy="9.03592685" r="1"></circle>
                    <circle  fill-rule="nonzero" cx="10.4069865" cy="9.03592685" r="1"></circle>
                    <circle  fill-rule="nonzero" cx="13.9450495" cy="9.03592685" r="1"></circle>
                </g>
            </defs>
        </svg>
    </div>
</template>
<script>
    import bgData from '../utils/backgroundData'
    import storage from '../utils/storage'
    import constants from '../utils/Constants'
    import WhatsNew from './whatsNew.vue'

    export default{
        components: {
            WhatsNew
        },
        data: function(){
            return {
                selectedTheme: this.settings.background.themeId,
                themes: bgData.themes,
                version: chrome.runtime.getManifest().version,
                activeTab: storage.get(constants.STORAGE.CURRENT_CUSTOMIZATION_TAB) || 'general',
                customLocation: '',
                currentBgCustom: '',
                isCustomBgSaveMsg: ''
            };
        },
        mounted(){
            // this is done for weather
            this.customLocation = this.settings.weather.location.name ||
                (storage.get(constants.STORAGE.WEATHER) && storage.get(constants.STORAGE.WEATHER)[4])
            // this is done for backgrounds
            let bgCustom = storage.get(constants.STORAGE.BACKGROUND_CUSTOM);

            if (bgCustom && Object.prototype.toString.call(bgCustom) === '[object Array]'
                && bgCustom.length) {
                this.currentBgCustom = bgCustom.join('\n');
            }
            this.$ga.event('customize', 'open')
        },
        methods: {
            isActiveTheme: function(index){
                return this.settings.background.themeId === (index + 1);
            },
            selectActive(index){
                this.settings.background.themeId = (index + 1);
                this.$ga.event('customize', 'wallpaper', 'category', this.themes[index].lValue)
            },
            closeCustomizeMenu(){
                storage.remove(constants.STORAGE.CURRENT_CUSTOMIZATION_TAB)
                this.$emit('closeCustomizeMenu');
            },
            updateCustomLocation() {
                if (this.customLocation !== this.settings.weather.location.name) {
                    this.settings.weather.location.name = this.customLocation;
                }
            },
            saveCustomBg(){
                let validateImgUrls = (backgrounds)=> {
                    for (let i = 0; i < backgrounds.length; i++) {
                        if (backgrounds[i].match(/^(http?|https):\/\/.*(jpeg|png|gif|bmp|jpg)/g) === null) {
                            this.isCustomBgSaveMsg = `<span class='error'>Wallpapers links are not in correct format.</span>`;
                            return false;
                        }
                    }
                    return true;
                };

                let cleanUrls = (backgrounds)=> {
                    return backgrounds.reduce((filtered, background) => {
                        if (typeof background === 'string' && background.length > 5) {
                            filtered.push(background.trim());
                        }
                        return filtered;
                    }, []);
                };

                if(this.currentBgCustom){
                    let backgrounds = this.currentBgCustom.split('\n');
                    if(backgrounds && backgrounds.length && validateImgUrls(backgrounds)) {
                        backgrounds = cleanUrls(backgrounds);
                        storage.set(constants.STORAGE.BACKGROUND_CUSTOM, backgrounds);
                        this.isCustomBgSaveMsg = `<span class='success'>Wallpapers saved successfully.</span>`;
                    }
                }else{
                    this.isCustomBgSaveMsg = `<span class='error'>Wallpapers not saved</span>`;
                }
                setTimeout(()=>{
                    this.isCustomBgSaveMsg = ''
                }, 2000);
            },
            backgroundTypeChange() {
                if (this.settings.background && this.settings.background.type) {
                    this.$ga.event('customize', 'customType', 'wallpaper', this.settings.background.type)
                }
            },
            locationTypeChange() {
                if (this.settings.weather && this.settings.weather.location && this.settings.weather.location.type) {
                    this.$ga.event('customize', 'customType', 'weather', this.settings.weather.location.type)
                }
            },
            categoryChange() {
                // this.$ga.event('customize', 'changeTab', this.activeTab)
            }
        },
        props:['settings'],
        computed: {

        }
    }
</script>
