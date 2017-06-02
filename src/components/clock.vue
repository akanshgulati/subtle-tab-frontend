<template>
    <div id="clock">
        <div class="time">{{hrs}}:{{min}}</div>
        <div class="date" v-bind:class="{'fade_in' : settings.showDay}">{{day}}, {{date}} {{month}}</div>
    </div>
</template>

<script>
    const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov', 'Dec'];
    const dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    export default {
        data () {
            return {
                hrs : '',
                min: '',
                day: '',
                date: '',
                month: ''
            }
        },
        props:['settings'],
        created(){
            this.updateDateTime();
        },
        mounted () {
            setInterval(this.updateDateTime, 1000);
        },
        methods: {
            updateDateTime () {
                let current = new Date();
                this.hrs = current.getHours();
                if(this.settings.showTwelveHour){
                    this.hrs = this.hrs !== 0 ? this.hrs % 12 : 12;
                }
                this.hrs = this.getZeroPad(this.hrs);
                this.min = this.getZeroPad(current.getMinutes());
                this.day = dayArr[current.getDay()];
                this.date = current.getDate();
                this.month = monthArr[current.getMonth()];
            },
            getZeroPad (n) {
                return (parseInt(n, 10) >= 10 ? '' : '0') + n
            },
            concatAMPM () {
                if(this.settings.showTwelveHour) {
                    return this.hours >= 12 ? 'PM' : 'AM'
                }
            }
        }
    }
</script>