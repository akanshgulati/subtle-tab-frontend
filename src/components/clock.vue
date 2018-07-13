<template>
    <div class="flex flex-center">
        <transition>
            <div v-if="settings.showDay" class="date flex flex-flow-column mr-10">
                <span class="semi-bold">{{day}}</span>
                <span class="semi-bold">{{date}} {{month}}</span>
            </div>
        </transition>
        <div class="time">{{hrs}}:{{min}}</div>
    </div>
</template>

<script>
    const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October','November', 'December'];
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
                if(this.settings.type === 'twelve'){
                    this.hrs = (this.hrs !== 0 && this.hrs !== 12) ? this.hrs % 12 : 12;
                }
                this.min = this.getZeroPad(current.getMinutes());
                this.day = dayArr[current.getDay()]
                this.date = current.getDate();
                this.month = monthArr[current.getMonth()]
            },
            getZeroPad (n) {
                return (parseInt(n, 10) >= 10 ? '' : '0') + n
            },
            concatAMPM () {
                if(this.settings.type === 'twelve') {
                    return this.hrs >= 12 ? 'PM' : 'AM'
                }
            }
        }
    }
</script>
