<template>
    <header class="flex widget-header flex-center">
        <!-- HAMBURGER ICON -->
        <svg class="pointer flex-no-shrink one-rem-height one-rem-width" viewBox="0 0 23 21" version="1.1"
             @click="viewList">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="hamburger" transform="translate(0.000000, 2.000000)" stroke="#7d7d7d" stroke-width="4">
                    <path d="M0.132183908,0 L22.8678161,0" id="XMLID_6_"></path>
                    <polyline id="XMLID_9_" points="0.132183908 16.8 20.0697663 16.8 22.8678161 16.8"></polyline>
                    <path d="M0.132183908,8.4 L22.8678161,8.4" id="XMLID_8_"></path>
                </g>
            </g>
        </svg>
        <!-- INTEGRATION ICON -->
        <i v-if="getIntegrationIcon()" class="integrate-icon mh-5 flex-no-shrink" :class="getIntegrationIcon()"></i>
        <!-- LIST NAME -->
        <h4 class="widget-heading ml-5 mv-0">Todo {{ currentList ? ': '+ titleCase(currentList.title): ''}}</h4>
        <!-- BUTTON SECTION -->
        <div class="button-section flex">
            <!-- DELETE -->
            <div class="tooltip" rel="Delete">
                <svg
                    v-if="_showDeleteIcon()"
                    @click.stop="deleteList"
                    class="delete-icon pointer"
                    width="16px"
                    height="16px"
                    xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 482.428 482.429"
                    style="enable-background:new 0 0 482.428 482.429;" xml:space="preserve">
                    <g>
                        <g>
                            <path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098    c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117    h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828    C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879    C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096    c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266    c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979    V115.744z"/>
                            <path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07    c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"/>
                            <path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07    c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"/>
                            <path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07    c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"/>
                        </g>
                    </g>
                </svg>
            </div>
            <!-- PIN -->
            <div class="tooltip tooltip-left " :rel="isPinned?'Unpin':'Pin'">
                <svg viewBox="0 0 19 19"
                     width="16px"
                     height="16px"
                     class="pointer svg-blue-stroke-hover"
                     @click.stop="togglePin">
                    <g transform="translate(1.000000, 0.000000)" stroke="#7d7d7d"
                       fill-rule="nonzero"
                       stroke-width="1" fill="none">
                        <transition>
                            <rect stroke-opacity="0.801007699" stroke-linecap="round"
                                  class="svg-blue-fill-hover"
                                  transform="translate(10.960155, 10.960155) rotate(45.000000) translate(-10.960155, -10.960155)"
                                  x="-3" y="9.96015511" width="23" height="1" rx="1" fill="#7d7d7d"
                                  v-if="isPinned"></rect>
                        </transition>
                        <path
                            d="M7.00281655,13.1229233 L5.02119635,14.6064885 C2.80029168,16.6351126 1.71102055,17.5657233 1.3663145,17.6821377 C0.717957794,17.9011014 0.313245364,17.422429 0.463782908,16.7897514 L0.554073071,16.6003974 L4.87282785,10.9929336 L1.94236285,8.0624593 C1.80229043,7.92389304 1.69177273,7.7573543 1.61501465,7.57223164 C1.46332845,7.2057818 1.46332845,6.7922182 1.61568559,6.42415545 C1.76866074,6.05821492 2.05960746,5.76687235 2.42515545,5.61468559 C2.60729352,5.53854591 2.80269457,5.5 3,5.5 C5.09770613,5.5 6.54093376,5.16919277 7.9623932,4.4677864 C9.04738884,3.92528859 9.87551287,2.99917711 10.6230457,1.44324406 C10.6996323,1.24318117 10.8110815,1.06381172 10.9632597,0.911642801 C11.5519462,0.328947954 12.4998328,0.33172768 13.0834588,0.918354316 L13.0835662,0.918462371 L17.0786457,4.93654123 C17.6652723,5.52016722 17.668052,6.46805376 17.0852572,7.0568413 C16.9348715,7.20868708 16.755096,7.32085792 16.5919941,7.38093962 C14.9978136,8.14453096 14.0717905,8.97257596 13.5301435,10.0577468 C12.8318981,11.453145 12.5,12.8996296 12.5,15 C12.5,15.1964255 12.4603765,15.3933891 12.3855335,15.570902 C12.2343297,15.9391806 11.9424432,16.2302739 11.5748445,16.3833144 C11.3916194,16.4599085 11.1961257,16.5 11,16.5 C10.8038743,16.5 10.6083806,16.4599085 10.4264925,16.3838711 C10.2399036,16.3065049 10.0731494,16.1962259 9.93844661,16.0585534 L7.00281655,13.1229233 Z"></path>
                    </g>
                </svg>
            </div>
        </div>
    </header>
</template>
<script>
    import {titleCase} from '../utils/StringUtils';
    import {TodoListItemAction, TodosType} from '../constants/Todos';
    import {showDeleteIcon} from '../utils/TodoUtil'

    export default {
        data() {
            return {
                titleCase
            }
        },
        props: {
            currentList: {
                default: ''
            },
            todoType: String,
            isPinned: Boolean
        },
        methods: {
            _showDeleteIcon() {
                if (this.currentList && this.currentList.title) {
                    return showDeleteIcon(this.currentList.title);
                }
            },
            getIntegrationIcon() {
                switch (this.todoType) {
                    case TodosType.WUNDERLIST:
                        return 'icon--wunderlist';
                    case TodosType.TODOIST:
                        return 'icon--todoist';
                }
            },
            deleteList() {
                this.$emit('changed', {
                    action: TodoListItemAction.DELETE
                });
            },
            togglePin() {
                this.$emit('changed', {
                    action: 'pinned'
                });
            },
            viewList() {
                this.$emit('changed', {
                    action: 'viewList'
                });
            }
        }
    }
</script>
<style>

    .svg-blue-stroke-hover:hover g {
        stroke: #2196F3;
    }
</style>