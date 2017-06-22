<template>
    <div class="flex flex-end">
        <div class="container">
            <div class="row onboarding-message flex">
                <div class="col s6">
                    <img src="images/welcome_mockup.png" alt="Desktop Mockup" width="90%">
                </div>
                <div class="col s6 flex flex-flow-column flex-justify-center">
                    <h1>Hi, Thank you for choosing<br>
                        <span class="italics semi-bold">Subtle</span>
                    </h1>
                    <div class="onboarding-btn" v-on:click="closeOnboarding">Let's Start</div>
                </div>
            </div>
            <div class="row change-row">
                <div class="col s3 center">
                    <div class="change-heading">Inspiring Wallpapers</div>
                    <div class="change-description">Vibrant and refreshing wallpapers of specific category.</div>
                </div>
                <div class="col s3 center">
                    <div class="change-heading">Keeps you updated</div>
                    <div class="change-description">Latest weather updates with date and time.</div>
                </div>
                <div class="col s3 center">
                    <div class="change-heading">Customizations</div>
                    <div class="change-description">Various customizations for widgets.</div>
                </div>
                <div class="col s3 center">
                    <div class="change-heading">Remain Synced</div>
                    <div class="change-description">Keep your settings synced to various devices.</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                welcomeMockup: './images/welcome_mockup.png'
            };
        },
        props: ['settings'],
        methods: {
            closeOnboarding(){
                this.$emit('stopOnboarding');
            }
        }
    }
</script>