<template>
    <div @mousedown.left="closeWindows">
        <onboarding id="onboarding" v-if="!seenOnBoarding" v-on:stopOnboarding="stopOnBoarding"></onboarding>
        <div v-if="seenOnBoarding">
            <div class="loading" :class="{ 'show-loading': isLoading}"></div>
            <div id="viewport" :class="{'fade_in': !isLoading}">
                <background :settings="sharedData.background" v-on:stopLoading="stopLoad" v-on:startLoading="startLoad"></background>
                <div id="utilities">
                    <div id="position--bottom-right">
                        <ClockWrapper
                                :settings="sharedData.clock"
                                v-if="sharedData.showUtilities.showClock"
                                id="clock"/>
                    </div>
                    <div id="position--top-right" v-on:click.stop="" @mousedown.stop="">
                        <div class="flex flex-center">
                            <div class="notes-widget relative" v-on:keydown.stop=""  v-if="sharedData.showUtilities.showNotes">
                                <div class="notes-icon pointer" v-on:click.stop="showNotes = !showNotes">
                                    <svg x="0px" y="0px" viewBox="0 0 58.27 58.27" style="enable-background:new 0 0 58.27 58.27;" xml:space="preserve" width="1.8em" >
                                        <g id="note_btn">
                                            <path d="M56.261,35.724l-2.849-2.85c-1.128-1.127-3.094-1.127-4.222,0L33.799,48.265l-2.121,7.779l-0.519,0.519   c-0.388,0.388-0.389,1.014-0.006,1.405l-0.005,0.02l0.019-0.005c0.194,0.19,0.446,0.288,0.699,0.288   c0.256,0,0.512-0.098,0.707-0.293l0.52-0.52l7.778-2.121l15.39-15.391C57.425,38.781,57.425,36.888,56.261,35.724z M36.108,48.784   l10.243-10.243l4.243,4.243L40.351,53.027L36.108,48.784z M35.206,50.71l3.22,3.22l-4.428,1.208L35.206,50.71z M54.847,38.531   l-2.839,2.839l-4.243-4.243l2.839-2.839c0.372-0.373,1.021-0.373,1.393,0l2.85,2.85C55.231,37.521,55.231,38.147,54.847,38.531z" />
                                            <path d="M8.135,36h26c0.552,0,1-0.447,1-1s-0.448-1-1-1h-26c-0.552,0-1,0.447-1,1S7.583,36,8.135,36z" />
                                            <path d="M30.135,40h-22c-0.552,0-1,0.447-1,1s0.448,1,1,1h22c0.552,0,1-0.447,1-1S30.688,40,30.135,40z" />
                                            <path d="M8.135,18h13c0.552,0,1-0.447,1-1s-0.448-1-1-1h-13c-0.552,0-1,0.447-1,1S7.583,18,8.135,18z" />
                                            <path d="M21.135,48c0.552,0,1-0.447,1-1s-0.448-1-1-1h-13c-0.552,0-1,0.447-1,1s0.448,1,1,1H21.135z" />
                                            <path d="M37.135,22h-29c-0.552,0-1,0.447-1,1s0.448,1,1,1h29c0.552,0,1-0.447,1-1S37.688,22,37.135,22z" />
                                            <path d="M8.135,30h14c0.552,0,1-0.447,1-1s-0.448-1-1-1h-14c-0.552,0-1,0.447-1,1S7.583,30,8.135,30z" />
                                            <path d="M38.135,29c0-0.553-0.448-1-1-1h-7c-0.552,0-1,0.447-1,1s0.448,1,1,1h7C37.688,30,38.135,29.553,38.135,29z" />
                                            <path d="M26.845,29.709c0.18-0.189,0.29-0.45,0.29-0.71s-0.11-0.52-0.29-0.71c-0.38-0.37-1.05-0.37-1.42,0   c-0.18,0.19-0.29,0.45-0.29,0.71c0,0.271,0.11,0.521,0.29,0.71c0.19,0.181,0.45,0.29,0.71,0.29   C26.395,29.999,26.656,29.89,26.845,29.709z" />
                                            <path d="M26.135,56h-23V8h7v2c0,0.553,0.448,1,1,1h23c0.552,0,1-0.447,1-1V8h7v22c0,0.553,0.448,1,1,1s1-0.447,1-1V7   c0-0.553-0.448-1-1-1h-8V4c0-0.553-0.448-1-1-1h-6V1c0-0.553-0.448-1-1-1h-9c-0.552,0-1,0.447-1,1v2h-6c-0.552,0-1,0.447-1,1v2h-8   c-0.552,0-1,0.447-1,1v50c0,0.553,0.448,1,1,1h24c0.552,0,1-0.447,1-1S26.688,56,26.135,56z M19.135,2h7v2v2h-7V4V2z M12.135,5h5v2   c0,0.553,0.448,1,1,1h9c0.552,0,1-0.447,1-1V5h5v2v2h-21V7V5z" />
                                        </g>
                                    </svg>
                                </div>
                                <transition>
                                    <notes :settings="sharedData.notes" v-if="showNotes"/>
                                </transition>
                            </div>
                        </div>
                    </div>
                    <div id="position--top-left">
                        <transition>
                            <weather :settings="sharedData.weather"
                                     :otherSettings="otherSettings"
                                     v-if="sharedData.showUtilities.showWeather"
                                     v-on:weatherInfoStateChange="weatherInfoStateChange"/>
                        </transition>
                    </div>
                    <div id="position--bottom-left">
                        <div class="pointer nav-bar-opener relative" v-on:click.stop="toggleCustomizeMenu">
                            <svg enable-background="new 0 0 20 20" height="2em" version="1.1" viewBox="0 0 100 100" width="2em" xml:space="preserve">
                                    <g id="customize_btn">
                                        <path  d="M86.139,41.691l-8.095-1.175c-0.276-0.762-0.539-1.506-0.864-2.219l4.987-6.622c1.406-1.882,1.123-4.653-0.673-6.448   l-5.846-5.854c-1.006-1.007-2.358-1.578-3.715-1.578c-1.006,0-1.947,0.32-2.73,0.904l-6.615,4.97   c-0.729-0.337-1.472-0.605-2.22-0.883l-1.179-7.984C58.85,12.447,56.68,11,54.141,11h-8.28c-2.539,0-4.709,1.447-5.048,3.803   l-1.18,7.96c-0.748,0.279-1.495,0.551-2.226,0.892l-6.611-4.96c-0.782-0.584-1.727-0.903-2.731-0.903   c-1.359,0-2.716,0.571-3.722,1.58l-5.856,5.852c-1.799,1.8-2.1,4.572-0.693,6.452l4.94,6.617c-0.337,0.728-0.665,1.473-0.941,2.225   l-7.928,1.175C11.567,42.023,10,44.147,10,46.741v8.276c0,2.594,1.565,4.719,3.862,5.051l8.097,1.176   c0.276,0.763,0.538,1.507,0.863,2.219l-4.987,6.622c-1.407,1.883-1.124,4.654,0.672,6.449l5.846,5.854   c1.005,1.008,2.356,1.582,3.713,1.582c1.006,0,1.951-0.313,2.733-0.896l6.614-4.954c0.728,0.337,1.473,0.635,2.221,0.913   l1.18,8.043C41.152,89.432,43.322,91,45.861,91h8.28c2.539,0,4.709-1.566,5.049-3.924l1.18-8.079   c0.742-0.276,1.488-0.548,2.227-0.892l6.611,4.959c0.779,0.584,1.725,0.903,2.73,0.903c1.358,0,2.717-0.571,3.724-1.579   l5.854-5.853c1.799-1.8,2.1-4.57,0.694-6.453l-4.94-6.615c0.34-0.733,0.666-1.479,0.941-2.225l7.93-1.175   C88.436,59.736,90,57.611,90,55.02v-8.277C90,44.147,88.436,42.023,86.139,41.691z M73.882,58.236   c-0.455,1.479-1.06,2.935-1.796,4.324l-0.749,1.407l6.683,8.925c-0.017,0.025-0.037,0.056-0.068,0.086l-5.854,5.856   c-0.027,0.028-0.056,0.052-0.08,0.067l-8.929-6.666l-1.407,0.75c-1.434,0.761-2.888,1.378-4.326,1.82l-1.523,0.488L54.236,86.68   C54.211,86.688,54.18,87,54.141,87h-8.28c-0.036,0-0.067-0.313-0.093-0.318l-1.596-11.3l-1.526-0.563   c-1.474-0.451-2.928-1.086-4.324-1.824l-1.409-0.764l-8.941,6.664c-0.021-0.015-0.043-0.037-0.066-0.06l-5.852-5.856   c-0.026-0.025-0.049-0.054-0.065-0.076l6.692-8.932l-0.76-1.412c-0.703-1.324-1.304-2.738-1.791-4.324l-0.514-1.521l-11.193-1.574   C14.419,55.104,14,55.063,14,55.02v-8.277c0-0.045,0.419-0.085,0.424-0.12l11.112-1.575l0.526-1.521   c0.456-1.482,1.09-2.938,1.825-4.325l0.762-1.408l-6.674-8.926c0.016-0.025,0.041-0.054,0.072-0.085l5.854-5.854   c0.028-0.028,0.058-0.049,0.083-0.066l8.929,6.671l1.409-0.744c1.436-0.762,2.89-1.363,4.324-1.804l1.524-0.457L45.765,15.2   c0.025-0.007,0.058-0.2,0.096-0.2h8.28c0.037,0,0.068,0.191,0.094,0.198l1.597,11.214l1.524,0.528   c1.486,0.457,2.94,1.092,4.324,1.827l1.409,0.761l8.94-6.665c0.02,0.016,0.043,0.037,0.066,0.061l5.85,5.854   c0.027,0.027,0.051,0.055,0.066,0.078l-6.689,8.932l0.758,1.411c0.693,1.311,1.313,2.765,1.791,4.325l0.516,1.521l11.189,1.575   C85.581,46.656,86,46.696,86,46.741v8.276c0,0.047-0.419,0.086-0.424,0.121l-11.111,1.574L73.882,58.236z"/>
                                        <g>
                                            <path d="M50.001,67.971c-9.61,0-17.428-7.82-17.428-17.43c0-9.61,7.818-17.429,17.428-17.429c9.608,0,17.429,7.818,17.429,17.429    C67.43,60.15,59.609,67.971,50.001,67.971z M50.001,37.187c-7.363,0-13.354,5.991-13.354,13.354    c0,7.363,5.991,13.354,13.354,13.354c7.362,0,13.354-5.988,13.354-13.354C63.354,43.178,57.363,37.187,50.001,37.187z"/>
                                        </g>
                                    </g>
                                </svg>
                            <div class="whatsnew-notify" v-show="!miscSettings.update.isSeen">!</div>
                        </div>
                    </div>
                </div>
            </div>
            <transition>
                <div id="customize-section" v-if="showCustomizeMenu">
                    <div class="customization-overlay"></div>
                    <customize :settings="sharedData" id="customize"
                               v-on:closeCustomizeMenu="toggleCustomizeMenu"></customize>
                </div>
            </transition>
        </div>

        <svg style="display: none;">
            <defs>
                <g id="icon-next-arrow">
                    <path d="M1.52721417,18.9863124 C1.39838969,19.1151369 1.2373591,19.1795491 1.06022544,19.1795491 C0.883091787,19.1795491 0.722061192,19.1151369 0.593236715,18.9863124 C0.335587762,18.7286634 0.335587762,18.3099839 0.593236715,18.0523349 L8.8057971,9.83977456 L0.593236715,1.62721417 C0.335587762,1.36956522 0.335587762,0.950885668 0.593236715,0.693236715 C0.850885668,0.435587762 1.26956522,0.435587762 1.52721417,0.693236715 L10.2067633,9.37278583 C10.4644122,9.63043478 10.4644122,10.0491143 10.2067633,10.3067633 L1.52721417,18.9863124 L1.52721417,18.9863124 Z"></path>
                </g>
                <g id="icon-widget-arrow" transform="translate(-25.000000, -50.000000)" stroke="rgba(255,255,255,0.5)" fill="rgba(255,255,255,0.5)" stroke-width="2" fill-rule="nonzero">
                    <path d="M46.4347899,51.1140206 C45.950678,51.012669 45.6164104,51.012669 45.4319868,51.1140206 L36.6142361,55.969398 L27.7791956,51.1140206 C27.5025603,50.9619931 27.0530279,50.9619931 26.7763926,51.1140206 C26.4997572,51.2660481 26.4997572,51.5130927 26.7763926,51.6651202 L36.0955448,56.7865456 C36.2338625,56.8625594 36.4067596,56.9005662 36.5969463,56.9005662 C36.7698434,56.9005662 36.9600302,56.8625594 37.0983479,56.7865456 L46.4175001,51.6651202 C46.6134502,51.5637685 46.6192134,51.3800687 46.4347899,51.1140206 Z"></path>
                </g>
            </defs>
        </svg>
    </div>
</template>

<script>
    import config from './utils/config'
    import storage from './utils/storage'
    import commonUtils from './utils/common'
    import Constants from './utils/Constants'
    import ClockWrapper from './components/ClockWrapper.vue'
    import Background from './components/background.vue'
    import Customize from './components/customize.vue'
    import Weather from './components/weather.vue'
    import Notes from './components/notes.vue'
    import Onboarding from './components/onboarding.vue'
    import bgData from './utils/backgroundData'
    import { EventBus } from './utils/EventBus.js';

    export default {
        beforeCreate(){
            this.sharedData = storage.get(Constants.STORAGE.SHARED_DATA) || config.defaultCustomization;
            this.seenOnBoarding = storage.get(Constants.STORAGE.SEEN_ONBOARDING) || false;
            this.showNotes = this.sharedData.notes.isPinned;
        },
        data () {
            return {
                sharedData: this.sharedData,
                showCustomizeMenu: false,
                showNotes: this.showNotes,
                isLoading: true,
                seenOnBoarding: this.seenOnBoarding,
                miscSettings : storage.get(Constants.STORAGE.MISC_SETTINGS) || config.misc,
                otherSettings: config.other
            }
        },
        mounted(){
            let self = this;
            document.addEventListener('keydown', (e)=>{
                if (e.keyCode === 78) {
                    self.showNotes = true;
                    this.$ga.event('app', 'keydown', 'notes')
                } else if (e.keyCode === 67) {
                    self.toggleCustomizeMenu(true)
                    this.$ga.event('app', 'keydown', 'customize')
                } else if (e.keyCode === 27) {
                    self.closeWindows();
                    this.$ga.event('app', 'keydown', 'closeAll')
                } else if (e.keyCode === 87) {
                    self.otherSettings.weather.showWeatherInfo = true;
                    this.$ga.event('app', 'keydown', 'weather')
                } else if(e.keyCode === 71){
                  this.$ga.event('app', 'keydown', 'calendar')
                  EventBus.$emit('calendar', {message: 'open'})
                }
            });

          EventBus.$on('app', e => {
            if (e.message === 'OpenCustomize') {
              self.toggleCustomizeMenu(true)
            }
          })

            this.init()
            this.initWhenIdle()
        },
        watch: {
            sharedData: {
                handler(newValue) {
                    storage.set(Constants.STORAGE.SHARED_DATA, newValue)
                },
                deep: true
            },
            miscSettings: {
                handler: function (newValue) {
                    storage.set(Constants.STORAGE.MISC_SETTINGS, newValue);
                },
                deep: true
            }
        },
        methods: {
          toggle(el, option) {
            EventBus.$emit(el, option)
          },
            toggleCustomizeMenu(state) {
                this.showCustomizeMenu = commonUtils.isUndefined(state) ? !this.showCustomizeMenu: state
                if(!this.miscSettings.update.isSeen) {
                    this.miscSettings.update.isSeen = true;
                }
                this.showNotes = state ? !state : this.sharedData.notes.isPinned
                this.otherSettings.weather.showWeatherInfo = false
              this.toggle('calendar', {message: 'close', force: state})
            },
            stopLoad() {
                this.isLoading = false
            },
            startLoad() {
                this.isLoading = true
            },
            stopOnBoarding() {
                this.seenOnBoarding = true
                storage.set(Constants.STORAGE.SEEN_ONBOARDING, this.seenOnBoarding)
                this.$ga.event('app', 'onboarding', 'close')
            },
            closeWindows() {
                storage.remove(Constants.STORAGE.CURRENT_CUSTOMIZATION_TAB)
                this.toggleCustomizeMenu(false)
            },
            showUpdateNotification(newVersion){
                if (!newVersion) {
                    return
                }
                let v = +newVersion.replace(/\./g,'')
                if(+this.miscSettings.update.lastChecked < v){
                    this.miscSettings.update.isSeen = false;
                    this.miscSettings.update.lastChecked = v;
                    storage.set(Constants.STORAGE.CURRENT_CUSTOMIZATION_TAB, 'whatsnew')
                }
            },
            checkForUpdates (){
                if (!this.miscSettings.update || !this.miscSettings.update.isToBeFetched) {
                    return
                }
                commonUtils.http(Constants.URL.WHATS_NEW).then((data) => {
                    this.miscSettings.update.isToBeFetched = false;
                    storage.set(Constants.STORAGE.WHATS_NEW, data.response);
                    this.showUpdateNotification(data.response[0].version)
                })
            },
            initWhenIdle() {
                let self = this;
                setTimeout(()=>{
                    self.checkForUpdates();
                    self.initAnalytics();
                }, 0)
            },
            init() {
                // this is done for backgrounds
                let bgCustom = storage.get(Constants.STORAGE.BACKGROUND_CUSTOM)
                if (!bgCustom) {
                    bgCustom = bgData.customBackgrounds
                    storage.set(Constants.STORAGE.BACKGROUND_CUSTOM, bgCustom)
                }
            },
            initAnalytics() {
                if (!this.seenOnBoarding) {
                    this.$ga.event('app', 'onboarding', 'shown')
                } else if (navigator.userAgent.indexOf('Firefox') > -1) {
                    this.$ga.page('/firefox-app')
                } else if(navigator.userAgent.indexOf('Chrome') > -1){
                    this.$ga.page('/chrome-app')
                }
            },
            weatherInfoStateChange (state){
                this.otherSettings.weather.showWeatherInfo = state
            }
        },
        components: {
            Background,
            ClockWrapper,
            Customize,
            Weather,
            Onboarding,
            Notes
        }
    }
</script>
