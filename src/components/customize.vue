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
        <div class="flex-grow-1 flex">
                <div class="csidebar">
                    <ul>
                        <li>
                            <input type="radio" v-model="activeTab" value="general" id="tab4">
                            <label for="tab4" class="flex-center" :class="{'active': activeTab === 'general'}">
                                <img src="images/icons/general-icon.png">
                                <span>General</span>
                            </label>
                        </li>
                        <li>
                            <input type="radio" v-model="activeTab" value="background" id="tab1">
                            <label for="tab1" class="flex-center"  :class="{'active': activeTab === 'background'}">
                                <img src="images/icons/wallpaper-icon.png">
                                <span>Wallpaper</span>
                            </label>
                        </li>
                        <li>
                            <input type="radio" v-model="activeTab" value="clock" id="tab2">
                            <label for="tab2" class="flex-center" :class="{'active': activeTab === 'clock'}">
                                <img src="images/icons/clock-icon.png">
                                <span>Clock</span>
                            </label>
                        </li>
                        <li>
                            <input type="radio" v-model="activeTab" value="weather" id="tab3">
                            <label for="tab3" class="flex-center"  :class="{'active': activeTab === 'weather'}">
                                <img src="images/icons/weather-icon.png">
                                <span>Weather</span>
                            </label>
                        </li>
<<<<<<< Updated upstream
=======
                        <li>
                            <input type="radio" v-model="activeTab" value="todo" id="tab5">
                            <label for="tab5" class="flex-center"  :class="{'active': activeTab === 'todo'}">
                                <img src="images/icons/todo-icon.png">
                                <span>Todos</span>
                            </label>
                        </li>
>>>>>>> Stashed changes
                    </ul>
                </div>
                <div class="container">
                    <section v-if="activeTab === 'general'">
                        <div>
                            <h4>Features</h4>
                            <ul class="inline-list">
                                <li class="inline-list-item">
                                    <span class="sub-heading">Weather</span>
                                    <div class="switch">
                                        <label>
                                            <input type="checkbox" v-model="settings.showUtilities.showWeather">
                                            <span class="lever mar-0"></span>
                                        </label>
                                    </div>
                                </li>
                                <li class="inline-list-item">
                                    <span class="sub-heading">Date & Time</span>
                                    <div class="switch">
                                        <label>
                                            <input type="checkbox" v-model="settings.showUtilities.showClock">
                                            <span class="lever mar-0"></span>
                                        </label>
                                    </div>
                                </li>
                                <li class="inline-list-item">
                                    <span class="sub-heading">Notes</span>
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
                            <h4>Settings</h4>
                            <ul class="inline-list">
                                <li class="inline-list-item">
                                    <span class="sub-heading">Change Interval (tabs)</span>
                                    <div class="right">
                                        <input type="radio" v-model="settings.background.changeInterval" id="bgInterval5"
                                               class="filled-in" value="5">
                                        <label for="bgInterval5" class="inline-radio">5</label>
                                        <input type="radio" v-model="settings.background.changeInterval" id="bgInterval10"
                                               class="filled-in" value="10">
                                        <label for="bgInterval10" class="inline-radio">10</label>
                                        <input type="radio" v-model="settings.background.changeInterval" id="bgInterval15"
                                               class="filled-in" value="15">
                                        <label for="bgInterval15" class="inline-radio">15</label>
                                    </div>
                                </li>
                                <li class="inline-list-item">
                                    <span class="sub-heading">Wallpaper Type</span>
                                    <div class="right">
                                        <input type="radio" v-model="settings.background.type" id="wallpaperType1"
                                               class="filled-in" value="custom"/>
                                        <label for="wallpaperType1" class="inline-radio">Custom</label>
                                        <input type="radio" v-model="settings.background.type" id="wallpaperType2"
                                               class="filled-in" value="predefined"/>
                                        <label for="wallpaperType2" class="inline-radio">Default</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div v-if="settings.background.type !== 'custom'" :class="{'fade_in': settings.background.type !== 'custom'}">
                            <h4>Default Category</h4>
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
                            <h4>Custom List</h4>
                            <span>Add each image in new line and press save list button</span>
                            <textarea name="" id="" cols="30" rows="15" v-model="currentBgCustom"></textarea>
                            <button class="save-button mar-0" v-on:click.stop="saveCustomBg"
                                    :disabled="!currentBgCustom.trim().length">Save List</button>
                            <span v-html="isCustomBgSaveMsg"></span>
                        </div>
                    </section>
                    <section v-if="activeTab === 'clock'">
                        <div>
                            <h4>Options</h4>
                            <ul class="inline-list">
                                <li class="inline-list-item">
                                    <span class="sub-heading">Clock format</span>
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
                                    <span class="sub-heading">Show Date</span>
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
                            <h4>Weather location</h4>
                            <ul class="inline-list">
                                <li class="inline-list-item">
                                    <span class="sub-heading">Type</span>
                                    <div class="right">
                                        <input type="radio" v-model="settings.weather.location.type" id="weather-geo" class="filled-in"
                                               value="geo">
                                        <label for="weather-geo" class="inline-radio">Geolocation</label>
                                        <input type="radio" v-model="settings.weather.location.type" id="weather-custom" class="filled-in"
                                               value="custom">
                                        <label for="weather-custom" class="inline-radio">Custom</label>
                                    </div>
                                </li>
                                <li class="inline-list-item flex overflow-hidden flex-center flex-justify-space-between">
                                    <div>
                                        <div class="sub-heading">City/Town/Village</div>
                                        <span>Enter correct name and press save button.</span>
                                    </div>
                                    <div class="right flex">
                                        <input placeholder="e.g. Mumbai" type="text" v-model="customLocation" class="mar-0"
                                               :disabled="settings.weather.location.type==='geo'" v-on:keydown.stop="">
                                        <button class="save-button" v-on:click.stop="updateCustomLocation"
                                                :disabled="customLocation == settings.weather.location.name">Save</button>
                                    </div>
                                </li>
                            </ul>
                            <h4>Miscellaneous Options</h4>
                            <ul class="inline-list">
                                <li class="inline-list-item">
                                    <span class="sub-heading">Temperature Unit</span>
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
<<<<<<< Updated upstream
=======
                    <section v-if="activeTab === 'todo'">
                        <div>
                            <h4>Settings</h4>
                            <ul class="inline-list">
                                <li class="inline-list-item">
                                    <span class="sub-heading">Type</span>
                                    <div class="right">
                                        <input type="radio" v-model="todosType" @change="todoTypeChange" id="defaultTodo"
                                               class="filled-in" value="default"/>
                                        <label for="defaultTodo" class="inline-radio">Default</label>
                                        <input type="radio" v-model="todosType" @change="todoTypeChange" id="wTodos"
                                               class="filled-in" value="w"/>
                                        <label for="wTodos" class="inline-radio">Wunderlist</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div v-if="isAuthCodeVisible || settings.todos.type == 'w'"
                             :class="{'fade_in': settings.todos.type === 'w'}">
                            <h4>Setup Wunderlist</h4>
                            <a href="https://www.subtletab.com/verify/wunderlist.php" target="_blank">
                                Click here to setup
                            </a>
                            <input type="text" v-model="authCode" placeholder="Paste authentication code...">
                            <button class="save-button mar-0" v-on:click.stop="saveAuthCode('w')">Save</button>
                            <span v-html="saveMessage"></span>
                        </div>
                    </section>
>>>>>>> Stashed changes
                </div>
            </div>
        <footer class="customize-footer">
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
                <a href="https://goo.gl/forms/XcIS7fojHNT166nA2" target="_blank">Support</a>
                <a href="https://goo.gl/forms/hMD1i4sXIUVwkKtD2" target="_blank">Feedback</a>
            </div>
        </footer>
    </div>
</template>

<script>
    import bgData from '../utils/backgroundData'
    import storage from '../utils/storage'
    import constants from '../utils/Constants'

    export default{
        data: function(){
            return {
                selectedTheme: this.settings.background.themeId,
                themes: bgData.themes,
                version: chrome.runtime.getManifest().version,
<<<<<<< Updated upstream
                activeTab: 'general',
                customLocation: '',
=======
                activeTab: 'todo',
                customLocation: this.settings.weather.location.name,
>>>>>>> Stashed changes
                currentBgCustom: '',
                isCustomBgSaveMsg: '',
                todosType: this.settings.todos.type,
                authCode: storage.get('w-auth-code'),
                saveMessage: '',
                isAuthCodeVisible : false
            };
        },
        mounted(){
<<<<<<< Updated upstream
            // this is done for weather
            this.customLocation = this.settings.weather.location.name ||
                (storage.get(constants.STORAGE.WEATHER) && storage.get(constants.STORAGE.WEATHER)[4])
            // this is done for backgrounds
            let bgCustom = storage.get(constants.STORAGE.BACKGROUND_CUSTOM);

=======
            let bgCustom = storage.get(constants.STORAGE.BACKGROUND_CUSTOM) ||  bgData.customBackgrounds;
>>>>>>> Stashed changes
            if (bgCustom && Object.prototype.toString.call(bgCustom) === '[object Array]'
                && bgCustom.length) {
                this.currentBgCustom = bgCustom.join('\n');
            }
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
<<<<<<< Updated upstream
=======
            },
            todoTypeChange() {
                if (this.todosType === 'w') {
                    this.getPermission()
                } else {
                    storage.remove('w-auth-code')
                    this.settings.todos.type = this.todosType = 'default'
                    chrome.permissions.remove({origins: ['http://*.wunderlist.com/*']}, (removed) => {
                        if (removed) {
                            console.log('removed')

                        }
                    })
                }
            },
            getPermission(){
                let self = this;
                chrome.permissions.request({origins: ['http://*.wunderlist.com/*']}, (granted) =>{
                    // The callback argument will be true if the user granted the permissions.
                    if (granted) {
                        console.log('granted')
                        this.isAuthCodeVisible = true
                        //self.settings.todos.type = self.todosType = 'w'
                    } else {
                        console.log('notgranted' + 	chrome.runtime.lastError.message);
                        self.settings.todos.type = 'default'
                    }
                });
            },
            saveAuthCode(type) {
                if (type === 'w' && this.authCode && this.authCode.length === 60) {
                    storage.set('w-auth-code', this.authCode)
                    this.settings.todos.type = 'w'
                    this.saveMessage = `<span class='success'>Wunderlist Integrated</span>`
                } else {
                    this.settings.todos.type = 'default'
                    this.saveMessage = `<span class='error'>Invalid auth code</span>`
                }
>>>>>>> Stashed changes
            }
        },
        props:['settings']
    }
</script>
