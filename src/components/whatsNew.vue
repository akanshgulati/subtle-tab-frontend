<template>
    <div>
        <div v-for="data in updates" :key="data.time">
            <div class="flex flex-justify-space-between mb-10">
                <h4 class="font-medium bold text-green">v{{data.version}}</h4>
                <h4 class="font-small ">{{data.time | date}}</h4>
            </div>
            <ul class="pl-10 update-list" style="list-style: disc">
                <li v-for="log in data.updates" class="font-small pl-10 mb-10">
                    <p class="semi-bold mar-0 font-medium">{{log.title}}</p>
                    <p class="mar-0">
                        {{log.desc}}
                    </p>
                </li>
            </ul>
        </div>
        <!-- <div v-if="update.improvements" class="pl-10">
                <p class="text-green mar-0 font-small">Improvement</p>
                <ul class="pl-10">
                    <li v-for="data in update.improvements" class="font-small pl-10 mb-10">
                        <p class="semi-bold mar-0 font-medium">{{data.title}}</p>
                        <p class="mar-0">
                            {{data.desc}}
                        </p>
                    </li>
                </ul>
            </div>-->
    </div>
</template>
<script>
    import bgData from '../utils/backgroundData'
    import storage from '../utils/storage'
    import constants from '../utils/Constants'
    import commonUtil from '../utils/common'

    export default{
        data: function(){
            return {
                updates : storage.get(constants.STORAGE.WHATS_NEW),
                isLoading : false
            };
        },
        mounted(){
            if(!this.updates){
                this.getUpdates();
            }
        },
        methods: {
            getUpdates() {
                this.isLoading = true;
                commonUtil.http(constants.URL.WHATS_NEW).then((data) => {
                    this.isLoading = false;
                    this.updates = data.response
                    storage.set(constants.STORAGE.WHATS_NEW, data.response)
                })
            }
        },
        filters: {
            date(value) {
                if (!value) {
                    return
                }
                let date = new Date(value)
                date = date.toDateString().split(' ')
                return date[2] + ' ' + date[1] + ', ' + date[3]
            }
        },
    }
</script>
