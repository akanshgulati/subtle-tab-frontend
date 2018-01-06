<template>
    <div class="flex flex-end">
        <div class="container">
            <div class="row onboarding-message flex">
                <div class="col s6">
                    <img src="images/welcome_mockup.png" alt="Desktop Mockup" width="90%">
                </div>
                <div class="col s6 flex flex-flow-column flex-justify-center">
                    <h1>Hi, Thank you for <br> choosing
                        <span class="italics semi-bold relative">Subtle tab<span class="version">v{{version}}</span></span>
                    </h1>
                    <div class="onboarding-btn semi-bold" v-on:click="closeOnboarding">Explore Now</div>
                </div>
            </div>
            <div class="row change-row">
                <div class="col s3 center">
                    <div class="change-heading">Inspiring Wallpapers</div>
                    <div class="change-description">Refreshing wallpapers <br/> of various category</div>
                </div>
                <div class="col s3 center">
                    <div class="change-heading">Keeps you updated</div>
                    <div class="change-description">Latest weather updates <br/>with date and time</div>
                </div>
                <div class="col s3 center">
                    <div class="change-heading">Notes Widget</div>
                    <div class="change-description">Sticky notes to <br/> keep important content.  </div>
                </div>
                <div class="col s3 center">
                    <div class="change-heading">Remain Synced</div>
                    <div class="change-description">Keep your settings <br> and notes synced </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import storage from '../utils/storage';
    export default {
        data(){
            return {
                version: chrome.runtime.getManifest().version
            };
        },
        mounted() {
            if(storage.get('sync')) {
                storage.chromeSync.get(null, (details) => {
                    let key;
                    for (key in details) {
                        if (!details.hasOwnProperty(key)) {
                            continue;
                        }
                        storage.setLocal(key, details[key]);
                    }
                });
            }
        },
        props: ['settings'],
        methods: {
            closeOnboarding(){
                this.$emit('stopOnboarding');
            }
        }
    }
</script>
