<template>
    <div class="flex flex-end">
        <div class="container">
            <div class="row onboarding-message flex">
                <div class="col s6">
                    <img src="images/welcome_mockup.png" alt="Desktop Mockup" width="90%">
                </div>
                <div class="col s6 flex flex-flow-column flex-justify-center">
                    <h1>Hi, Thank you for <br> choosing
                        <span class="italics semi-bold">Subtle</span>
                    </h1>
                    <div class="onboarding-btn" v-on:click="closeOnboarding">Let's Start</div>
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
                    <div class="change-heading">Customizations</div>
                    <div class="change-description">Various customizations <br/>for widgets</div>
                </div>
                <div class="col s3 center">
                    <div class="change-heading">Remain Synced</div>
                    <div class="change-description">Keep your settings synced <br/>across various devices</div>
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
                welcomeMockup: './images/welcome_mockup.png'
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