<template>
    <div>
        <div class="onboarding-message">
            <img src="images/icons/onboarding-icon.png" class="onboarding-icon" alt="Subtle">
            <h1>Hi, Thanks you for choosing<br>
                <span class="italics bold">Subtle</span>
            </h1>
            <div class="onboarding-btn" v-on:click="closeOnboarding">Let's Start</div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {};
        },
        props: ['settings'],
        methods: {
            closeOnboarding(){
                this.$emit('stopOnboarding');
            }
        }
    }
</script>