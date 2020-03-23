<template>
    <div @mousedown.left="closeWindows">
        <onboarding id="onboarding" v-if="!seenOnBoarding" v-on:stopOnboarding="stopOnBoarding"></onboarding>
        <div v-if="seenOnBoarding">
            <div id="loading" :class="{ 'show-loading': isLoading}"></div>
            <div id="viewport" :class="{'fade_in': !isLoading}">
                <background :settings="sharedData.background" v-on:stopLoading="stopLoad"
                            v-on:startLoading="startLoad" :misc-settings="miscSettings"></background>
                <transition>
                    <div id="position--top-banner" v-if="showBanner">
                        <TopBanner/>
                    </div>
                </transition>
                <div id="utilities">
                    <div id="position--bottom-right">
                        <ClockWrapper
                            :settings="sharedData.clock"
                            v-if="sharedData.showUtilities.showClock"
                            id="clock"/>
                    </div>
                    <div id="position--top-right" v-on:click.stop="" @mousedown.stop="">
                        <div class="flex flex-center">
                            <!-- TO-DO SECTION -->
                            <transition>
                                <div class="todo-widget relative" v-on:keydown.stop=""
                                     v-if="sharedData.showUtilities.showTodos">
                                    <div class="todo-icon pointer" v-on:click.stop="toggleTodos()">
                                        <svg viewBox="0 0 512 512" enable-background="new 0 0 512 512" width="1.8em">
                                            <g>
                                                <g id="todo_btn">
                                                    <path
                                                        d="M370,95.4V53.9h-62.2V12.5H204.2v41.5H142v41.5H69.5v404.1h373.1V95.4H370z M224.9,33.2h62.2v20.7h-62.2V33.2z M162.7,74.7h186.5v62.2H162.7V74.7z M421.8,478.8H90.2V116.1H142v41.4h228v-41.4h51.8V478.8z"/>
                                                    <rect width="20.7" x="131.6" y="222.8" height="20.7"/>
                                                    <rect width="20.7" x="131.6" y="307.8" height="20.7"/>
                                                    <rect width="20.7" x="131.6" y="393.8" height="20.7"/>
                                                    <rect width="207.3" x="173.1" y="222.8" height="20.7"/>
                                                    <rect width="207.3" x="173.1" y="307.8" height="20.7"/>
                                                    <rect width="207.3" x="173.1" y="393.8" height="20.7"/>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                    <transition>
                                        <TodoWrapper :type="sharedData.todos.type" :settings="sharedData.todos"
                                                     v-if="showTodos"/>
                                    </transition>
                                </div>
                            </transition>
                            <!-- NOTE SECTION -->
                            <transition>
                                <div class="notes-widget relative" v-on:keydown.stop=""
                                     v-if="sharedData.showUtilities.showNotes">
                                    <div class="notes-icon pointer" v-on:click.stop="toggleNotes()">
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
                            </transition>
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
                    <div id="position--top-middle">
                        <transition>
                            <BookmarksWrapper class="pointer fade_in" v-if="sharedData.showUtilities.showBookmarks"/>
                        </transition>
                    </div>
                    <div id="position--bottom-left">
                        <div class="flex flex-end">
                            <div class="pointer nav-bar-opener relative" v-on:click.stop="toggleCustomizeMenu" style="height:2em;">
                                <svg enable-background="new 0 0 20 20" height="1.8em" version="1.1" viewBox="0 0 100 100"
                                     width="2em" xml:space="preserve">
                                    <g id="customize_btn">
                                        <path
                                            d="M86.139,41.691l-8.095-1.175c-0.276-0.762-0.539-1.506-0.864-2.219l4.987-6.622c1.406-1.882,1.123-4.653-0.673-6.448   l-5.846-5.854c-1.006-1.007-2.358-1.578-3.715-1.578c-1.006,0-1.947,0.32-2.73,0.904l-6.615,4.97   c-0.729-0.337-1.472-0.605-2.22-0.883l-1.179-7.984C58.85,12.447,56.68,11,54.141,11h-8.28c-2.539,0-4.709,1.447-5.048,3.803   l-1.18,7.96c-0.748,0.279-1.495,0.551-2.226,0.892l-6.611-4.96c-0.782-0.584-1.727-0.903-2.731-0.903   c-1.359,0-2.716,0.571-3.722,1.58l-5.856,5.852c-1.799,1.8-2.1,4.572-0.693,6.452l4.94,6.617c-0.337,0.728-0.665,1.473-0.941,2.225   l-7.928,1.175C11.567,42.023,10,44.147,10,46.741v8.276c0,2.594,1.565,4.719,3.862,5.051l8.097,1.176   c0.276,0.763,0.538,1.507,0.863,2.219l-4.987,6.622c-1.407,1.883-1.124,4.654,0.672,6.449l5.846,5.854   c1.005,1.008,2.356,1.582,3.713,1.582c1.006,0,1.951-0.313,2.733-0.896l6.614-4.954c0.728,0.337,1.473,0.635,2.221,0.913   l1.18,8.043C41.152,89.432,43.322,91,45.861,91h8.28c2.539,0,4.709-1.566,5.049-3.924l1.18-8.079   c0.742-0.276,1.488-0.548,2.227-0.892l6.611,4.959c0.779,0.584,1.725,0.903,2.73,0.903c1.358,0,2.717-0.571,3.724-1.579   l5.854-5.853c1.799-1.8,2.1-4.57,0.694-6.453l-4.94-6.615c0.34-0.733,0.666-1.479,0.941-2.225l7.93-1.175   C88.436,59.736,90,57.611,90,55.02v-8.277C90,44.147,88.436,42.023,86.139,41.691z M73.882,58.236   c-0.455,1.479-1.06,2.935-1.796,4.324l-0.749,1.407l6.683,8.925c-0.017,0.025-0.037,0.056-0.068,0.086l-5.854,5.856   c-0.027,0.028-0.056,0.052-0.08,0.067l-8.929-6.666l-1.407,0.75c-1.434,0.761-2.888,1.378-4.326,1.82l-1.523,0.488L54.236,86.68   C54.211,86.688,54.18,87,54.141,87h-8.28c-0.036,0-0.067-0.313-0.093-0.318l-1.596-11.3l-1.526-0.563   c-1.474-0.451-2.928-1.086-4.324-1.824l-1.409-0.764l-8.941,6.664c-0.021-0.015-0.043-0.037-0.066-0.06l-5.852-5.856   c-0.026-0.025-0.049-0.054-0.065-0.076l6.692-8.932l-0.76-1.412c-0.703-1.324-1.304-2.738-1.791-4.324l-0.514-1.521l-11.193-1.574   C14.419,55.104,14,55.063,14,55.02v-8.277c0-0.045,0.419-0.085,0.424-0.12l11.112-1.575l0.526-1.521   c0.456-1.482,1.09-2.938,1.825-4.325l0.762-1.408l-6.674-8.926c0.016-0.025,0.041-0.054,0.072-0.085l5.854-5.854   c0.028-0.028,0.058-0.049,0.083-0.066l8.929,6.671l1.409-0.744c1.436-0.762,2.89-1.363,4.324-1.804l1.524-0.457L45.765,15.2   c0.025-0.007,0.058-0.2,0.096-0.2h8.28c0.037,0,0.068,0.191,0.094,0.198l1.597,11.214l1.524,0.528   c1.486,0.457,2.94,1.092,4.324,1.827l1.409,0.761l8.94-6.665c0.02,0.016,0.043,0.037,0.066,0.061l5.85,5.854   c0.027,0.027,0.051,0.055,0.066,0.078l-6.689,8.932l0.758,1.411c0.693,1.311,1.313,2.765,1.791,4.325l0.516,1.521l11.189,1.575   C85.581,46.656,86,46.696,86,46.741v8.276c0,0.047-0.419,0.086-0.424,0.121l-11.111,1.574L73.882,58.236z"/>
                                        <g>
                                            <path
                                                d="M50.001,67.971c-9.61,0-17.428-7.82-17.428-17.43c0-9.61,7.818-17.429,17.428-17.429c9.608,0,17.429,7.818,17.429,17.429    C67.43,60.15,59.609,67.971,50.001,67.971z M50.001,37.187c-7.363,0-13.354,5.991-13.354,13.354    c0,7.363,5.991,13.354,13.354,13.354c7.362,0,13.354-5.988,13.354-13.354C63.354,43.178,57.363,37.187,50.001,37.187z"/>
                                        </g>
                                    </g>
                                </svg>
                                <div class="whatsnew-notify" v-show="!miscSettings.update.isSeen">!</div>
                            </div>
                            <div class="pointer ml-20" @click.stop="showHistory = true">
                                <transition>
                                    <svg v-if="isBackgroundChangeLocked" key='locked' width="2.6em" height="1.8em" viewBox="0 0 34 26" version="1.1">
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" id="locked-wallpaper-icon" >
                                            <g transform="translate(-10.000000, -4.000000)">
                                                <g transform="translate(11.000000, 4.000000)">
                                                    <path d="M20.3371974,9 C20.3371974,9 13.5581316,9 0,9 L0,25 L29,25 L29,16.4553162"></path>
                                                    <path d="M31.8999096,6.20467534 L30.8087788,6.20467534 L30.8087788,3.31324389 C30.8087788,1.48630645 29.3224428,0 27.4955941,0 C25.6686862,0 24.1823798,1.48630645 24.1823798,3.31324389 L24.1823798,6.20467534 L23.0912194,6.20467534 C22.4895129,6.20467534 22,6.69421782 22,7.29589478 L22,14.0452781 C22,14.6469847 22.4895129,15.1364976 23.0912194,15.1364976 L31.8999096,15.1364976 C32.5016161,15.1364976 32.991129,14.6469847 32.991129,14.0452781 L32.991129,7.29592434 C32.991129,6.69421782 32.5016161,6.20467534 31.8999096,6.20467534 Z M24.90982,3.31324389 C24.90982,1.88748355 26.0697746,0.72749934 27.4955645,0.72749934 C28.9213249,0.72749934 30.0812795,1.88748355 30.0812795,3.31324389 L30.0812795,6.20467534 L24.90982,6.20467534 L24.90982,3.31324389 Z M32.2636593,14.0453077 C32.2636593,14.2458667 32.1004686,14.4090574 31.8999096,14.4090574 L23.0912194,14.4090574 C22.8906605,14.4090574 22.7274698,14.2458963 22.7274698,14.0453077 L22.7274698,7.29592434 C22.7274698,7.09536536 22.8906605,6.93217467 23.0912194,6.93217467 L31.8999096,6.93217467 C32.1004686,6.93217467 32.2636593,7.09533579 32.2636593,7.29592434 L32.2636593,14.0453077 Z" id="wallpaper-lock-icon" fill-rule="nonzero" stroke="none"></path>
                                                    <polyline stroke-linecap="square"
                                                              transform="translate(4.914229, 21.385445) rotate(-10.000000) translate(-4.914229, -21.385445) "
                                                              points="0.60663155 23.9218261 5.7429435 18.8490641 9.22182612 22.4984239"></polyline>
                                                    <polyline stroke-linecap="square"
                                                              points="9.4 21.7628663 15.8130386 12.0857913 26.9867739 24.4322118"></polyline>
                                                    <ellipse id="Oval" cx="7.9321391" cy="12.8222737" rx="1.95915115" ry="1.91656091"></ellipse>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                    <svg v-else key='history' width="2.6em" viewBox="0 0 39 24" version="1.1">
                                        <g id="wallpaper-history-icon" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <g transform="translate(-10.000000, -5.000000)">
                                                <g transform="translate(11.000000, 6.000000)">
                                                    <rect id="Rectangle" x="0" y="0" width="29" height="16"></rect>
                                                    <g id="Stack-2" transform="translate(6.000000, 4.000000)">
                                                        <path d="M-1.89179639e-16,15.5 L27.2636593,15.5" id="Line"></path>
                                                        <path d="M19.5,8 L35.5,8" id="Line-Copy" transform="translate(27.500000, 8.000000) rotate(90.000000) translate(-27.500000, -8.000000) "></path>
                                                    </g>
                                                    <g id="Stack-1" transform="translate(10.000000, 7.000000)">
                                                        <path d="M-1.89179639e-16,15.5 L27.2636593,15.5" id="Line"></path>
                                                        <path d="M19.5,8 L35.5,8" id="Line-Copy" transform="translate(27.500000, 8.000000) rotate(90.000000) translate(-27.500000, -8.000000) "></path>
                                                    </g>
                                                    <polyline id="Shape" stroke-linecap="square" transform="translate(4.914229, 12.385445) rotate(-10.000000) translate(-4.914229, -12.385445) " points="0.60663155 14.9218261 5.7429435 9.84906413 9.22182612 13.4984239"></polyline>
                                                    <polyline id="Shape" stroke-linecap="square" points="9.4 12.7628663 15.8130386 3.08579126 26.9867739 15.4322118"></polyline>
                                                    <ellipse id="Oval" cx="7.9321391" cy="3.8222737" rx="1.95915115" ry="1.91656091"></ellipse>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </transition>
                            </div>
                        </div>
                    </div>
                    <div id="position--bottom-middle">
                        <BackgroundInfo class="pointer ml-20"/>
                    </div>
                </div>
            </div>
            <transition>
                <div id="customize-section" v-if="showCustomizeMenu">
                    <div class="customization-overlay"></div>
                    <customize :settings="sharedData" id="customize" :misc-settings="miscSettings"
                               v-on:closeCustomizeMenu="toggleCustomizeMenu"></customize>
                </div>
            </transition>
            <transition name="slide-up">
                <History v-if="showHistory"/>
            </transition>
            <ContextMenu></ContextMenu>
            <Modal></Modal>
        </div>

        <svg style="display: none;">
            <defs>
                <g id="icon-next-arrow">
                    <path
                        d="M1.52721417,18.9863124 C1.39838969,19.1151369 1.2373591,19.1795491 1.06022544,19.1795491 C0.883091787,19.1795491 0.722061192,19.1151369 0.593236715,18.9863124 C0.335587762,18.7286634 0.335587762,18.3099839 0.593236715,18.0523349 L8.8057971,9.83977456 L0.593236715,1.62721417 C0.335587762,1.36956522 0.335587762,0.950885668 0.593236715,0.693236715 C0.850885668,0.435587762 1.26956522,0.435587762 1.52721417,0.693236715 L10.2067633,9.37278583 C10.4644122,9.63043478 10.4644122,10.0491143 10.2067633,10.3067633 L1.52721417,18.9863124 L1.52721417,18.9863124 Z"></path>
                </g>
                <g id="icon-widget-arrow" transform="translate(-25.000000, -50.000000)" stroke="rgba(255,255,255,0.5)"
                   fill="rgba(255,255,255,0.5)" stroke-width="2" fill-rule="nonzero">
                    <path
                        d="M46.4347899,51.1140206 C45.950678,51.012669 45.6164104,51.012669 45.4319868,51.1140206 L36.6142361,55.969398 L27.7791956,51.1140206 C27.5025603,50.9619931 27.0530279,50.9619931 26.7763926,51.1140206 C26.4997572,51.2660481 26.4997572,51.5130927 26.7763926,51.6651202 L36.0955448,56.7865456 C36.2338625,56.8625594 36.4067596,56.9005662 36.5969463,56.9005662 C36.7698434,56.9005662 36.9600302,56.8625594 37.0983479,56.7865456 L46.4175001,51.6651202 C46.6134502,51.5637685 46.6192134,51.3800687 46.4347899,51.1140206 Z"></path>
                </g>
                <g fill-rule="nonzero" fill="#000" id="icon-close">
                    <path
                        d="M6,0 C2.69169231,0 0,2.69146154 0,6 C0,9.30853846 2.69169231,12 6,12 C9.30830769,12 12,9.30853846 12,6 C12,2.69146154 9.30830769,0 6,0 Z M6,11.5384615 C2.94623077,11.5384615 0.461538462,9.05376923 0.461538462,6 C0.461538462,2.94623077 2.94623077,0.461538462 6,0.461538462 C9.05376923,0.461538462 11.5384615,2.94623077 11.5384615,6 C11.5384615,9.05376923 9.05376923,11.5384615 6,11.5384615 Z"
                        id="Shape"></path>
                    <path
                        d="M8.24007692,3.75992308 C8.14984615,3.66969231 8.004,3.66969231 7.91376923,3.75992308 L6,5.67369231 L4.08623077,3.75992308 C3.996,3.66969231 3.85015385,3.66969231 3.75992308,3.75992308 C3.66969231,3.85015385 3.66969231,3.996 3.75992308,4.08623077 L5.67369231,6 L3.75992308,7.91376923 C3.66969231,8.004 3.66969231,8.14984615 3.75992308,8.24007692 C3.80492308,8.28507692 3.864,8.30769231 3.92307692,8.30769231 C3.98215385,8.30769231 4.04123077,8.28507692 4.08623077,8.24007692 L6,6.32630769 L7.91376923,8.24007692 C7.95876923,8.28507692 8.01784615,8.30769231 8.07692308,8.30769231 C8.136,8.30769231 8.19507692,8.28507692 8.24007692,8.24007692 C8.33030769,8.14984615 8.33030769,8.004 8.24007692,7.91376923 L6.32630769,6 L8.24007692,4.08623077 C8.33030769,3.996 8.33030769,3.85015385 8.24007692,3.75992308 Z"
                        id="Shape"></path>
                </g>
            </defs>
        </svg>
    </div>
</template>

<script>
    import config from './utils/config'
    import storage from './utils/storage'
    import commonUtils, {isUndefined} from './utils/common'
    import Constants from './utils/Constants'
    import bgData from './utils/backgroundData'
    import {EventBus} from './utils/EventBus.js';
    import {AppMessage, ContextMenuMessage, MessageTypeEnum} from './constants/Message';
    import {TabTypeEnum} from './enums/CustomizeEnum';

    import ClockWrapper from './components/ClockWrapper.vue'
    import Background from './components/background.vue'
    import Customize from './components/customize.vue'
    import Weather from './components/weather.vue'
    import Notes from './components/notes.vue'
    import TodoWrapper from './components/TodoWrapper.vue'
    import Onboarding from './components/onboarding.vue'
    import History from './components/History.vue'
    import BackgroundInfo from './components/BackgroundInfo.vue'
    import BookmarksWrapper from './components/BookmarksWrapper.vue'
    import ContextMenu from './shared/ContextMenu.vue'
    import Modal from './shared/Modal.vue'
    import TopBanner from './components/topBanner.vue'

    let _sharedData, _isOnBoardingSeen, _showNotes, _showTodos;
    export default {
        beforeCreate() {
            _sharedData = storage.get(Constants.STORAGE.SHARED_DATA) || config.defaultCustomization;
            _isOnBoardingSeen = storage.get(Constants.STORAGE.SEEN_ONBOARDING) || false;
            _showNotes = _sharedData.notes.isPinned;
            _showTodos = _sharedData.todos.isPinned;
            
            if (process.env.NODE_ENV === 'production') {
                window.console.log = () => {
                }
            }
        },
        data() {
            return {
                sharedData: _sharedData,
                showCustomizeMenu: false,
                showNotes: _showNotes,
                isLoading: true,
                seenOnBoarding: _isOnBoardingSeen,
                miscSettings: storage.get(Constants.STORAGE.MISC_SETTINGS) || config.misc,
                otherSettings: config.other,
                showTodos: _showTodos,
                showHistory: false,
                showBanner: true
            }
        },
        mounted() {
            let self = this;
            document.addEventListener('keydown', (e) => {
                if (e.keyCode === 84) {
                    self.toggleTodos(true);
                    this.$ga.event('app', 'keydown', 'todos')
                }
                else if (e.keyCode === 78) {
                    self.toggleNotes(true);
                    this.$ga.event('app', 'keydown', 'notes')
                } else if (e.keyCode === 67) {
                    self.toggleCustomizeMenu(true);
                    this.$ga.event('app', 'keydown', 'customize')
                } else if (e.keyCode === 27) {
                    self.closeWindows();
                    this.$ga.event('app', 'keydown', 'closeAll')
                } else if (e.keyCode === 87) {
                    self.otherSettings.weather.showWeatherInfo = true;
                    this.$ga.event('app', 'keydown', 'weather')
                } else if (e.keyCode === 71) {
                    this.$ga.event('app', 'keydown', 'calendar');
                    EventBus.$emit('calendar', {message: 'open'})
                } else if(e.keyCode === 72) {
                    this.$ga.event('app', 'keydown', 'history');
                    this.showHistory = true;
                }
            });
            // App Messages
            EventBus.$on(MessageTypeEnum.APP, e => {
                if (!e || !e.message) {
                    return;
                }
                switch (e.message) {
                    case AppMessage.OPEN_CUSTOMIZE:
                        if (e.tab) {
                            storage.set(Constants.STORAGE.CURRENT_CUSTOMIZATION_TAB, e.tab);
                        }
                        self.toggleCustomizeMenu(true);
                        return;
                    case AppMessage.PIN:
                        this.toggleNotesTodoPin(e);
                        return;
                    case AppMessage.TOGGLE_HISTORY:
                        this.showHistory = false;
                        break;
                    case AppMessage.HIDE_BOOKMARKS:
                        this.sharedData.showUtilities.showBookmarks = false;
                        break;
                    case AppMessage.BANNER_CLOSE:
                        this.showBanner = false;
                        break;
                }
            });

            this.init();
            this.initWhenIdle()
        },
        computed: {
            isBackgroundChangeLocked() {
                return this.miscSettings.background.isLocked || false
            }
        },
        watch: {
            sharedData: {
                handler(newValue) {
                    storage.set(Constants.STORAGE.SHARED_DATA, newValue)
                },
                deep: true
            },
            miscSettings: {
                handler: function(newValue) {
                    storage.set(Constants.STORAGE.MISC_SETTINGS, newValue);
                },
                deep: true
            }
        },
        methods: {
            toggle(el, option) {
                EventBus.$emit(el, option)
            },
            toggleNotesTodoPin(data) {
                const widget = data.widget;
                const value = data.value;
                if (widget === 'todos' && this.sharedData.notes.isPinned) {
                    this.sharedData.notes.isPinned = false;
                    this.sharedData.todos.isPinned = true;
                } else if (widget === 'notes' && this.sharedData.todos.isPinned) {
                    this.sharedData.notes.isPinned = true;
                    this.sharedData.todos.isPinned = false;
                } else {
                    this.sharedData[widget].isPinned = value;
                }
            },
            toggleCustomizeMenu(state) {
                if (!this.miscSettings.update.isSeen && this.showCustomizeMenu) {
                    this.miscSettings.update.isSeen = true;
                }
                this.showCustomizeMenu = commonUtils.isUndefined(state) ? !this.showCustomizeMenu : state;
                this.showNotes = state ? !state : this.sharedData.notes.isPinned;
                this.showTodos = state ? !state : this.sharedData.todos.isPinned;
                this.otherSettings.weather.showWeatherInfo = false;
                this.showHistory = false;
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
                // storage.remove(Constants.STORAGE.CURRENT_CUSTOMIZATION_TAB);
                this.toggleCustomizeMenu(false)
            },
            showUpdateNotification(newVersion) {
                if (!newVersion) {
                    return
                }
                let v = +newVersion.replace(/\./g, '');
                const currentVersion = +(chrome.runtime.getManifest().version.replace(/\./g, ''));
                if (+this.miscSettings.update.lastChecked < v && currentVersion >= v) {
                    this.miscSettings.update.isSeen = false;
                    this.miscSettings.update.lastChecked = v;
                    storage.set(Constants.STORAGE.CURRENT_CUSTOMIZATION_TAB, TabTypeEnum.WHATS_NEW);
                }
            },
            checkForUpdates() {
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
                setTimeout(() => {
                    self.checkForUpdates();
                    self.initAnalytics();
                }, 0)
            },
            toggleNotes(state) {
                this.showNotes = !isUndefined(state) ? state : !this.showNotes;
                this.showTodos = false;
                if (!this.showNotes) {
                    this.showTodos = this.sharedData.todos.isPinned;
                }
            },
            toggleTodos(state) {
                this.showTodos = !isUndefined(state) ? state : !this.showTodos;
                this.showNotes = false;
                if (!this.showTodos) {
                    this.showNotes = this.sharedData.notes.isPinned;
                }
            },
            generateId() {
                return 'xxxxxxxx3-0xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            },
            weatherInfoStateChange(state) {
                this.otherSettings.weather.showWeatherInfo = state
            },
            init() {
                // this is done for backgrounds
                let bgCustom = storage.get(Constants.STORAGE.BACKGROUND_CUSTOM);
                if (!bgCustom) {
                    bgCustom = bgData.customBackgrounds;
                    storage.set(Constants.STORAGE.BACKGROUND_CUSTOM, bgCustom)
                }
            },
            initAnalytics() {
                if (!this.seenOnBoarding) {
                    this.$ga.event('app', 'onboarding', 'shown')
                } else if (navigator.userAgent.indexOf('Firefox') > -1) {
                    this.$ga.page('/firefox-app')
                } else if (navigator.userAgent.indexOf('Chrome') > -1) {
                    this.$ga.page('/chrome-app')
                }
            }
        },
        components: {
            Background,
            ClockWrapper,
            Customize,
            Weather,
            Onboarding,
            Notes,
            TodoWrapper,
            History,
            BackgroundInfo,
            BookmarksWrapper,
            ContextMenu,
            Modal,
            TopBanner
        }
    }
</script>
