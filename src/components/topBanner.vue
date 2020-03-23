<template>
    <div class="flex flex-center flex-flow-column flex-justify-center covid-19-banner relative" style="height:100%;">
        <div class="font-small bold">BE SUPPORTIVE. BE CAREFUL. BE KIND.</div>
        <div>We will deal with this as a community, as a country and as one world. Surely these are tough
            times but we will overcome this.
            <a href="https://www.who.int/COVID-19" title="WHO info link"
               style="text-decoration: underline; color: #409aeb;">Learn more</a>
        </div>
        <svg viewBox="0 0 12 12" width="1em" height="1em"
             style="float: right; margin-right: -10px; position: absolute; right: 1rem; font-size: 20px;"
             class="pointer" @click.stop="onClose">
            <use xlink:href="#icon-close"></use>
        </svg>
    </div>
</template>
<script>
    import {EventBus} from "../utils/EventBus";
    import {AppMessage, MessageTypeEnum} from "../constants/Message";

    export default {
        methods: {
            onClose(){
                EventBus.$emit(MessageTypeEnum.APP, {
                    message: AppMessage.BANNER_CLOSE
                });
            }
        }
    }
</script>