<template>
    <div class="flex flex-center flex-flow-column flex-justify-center covid-19-banner relative" style="height:100%;">
        <div class="font-xsmall bold">BE SUPPORTIVE. BE CAREFUL. BE KIND.</div>
        <div class="font-xsmall">We will deal with this as a community, as a country and as one world. Surely these are tough
            times but we will overcome this.
            <a href="https://www.who.int/COVID-19" title="WHO info link"
               style="text-decoration: underline; color: #409aeb;">Learn more</a>
        </div>
        <svg viewBox="0 0 12 12" width="1em" height="1em"
             style="float: right; position: absolute; right: 1rem; font-size: 25px;"
             class="pointer" @click.stop="onClose" id="close_btn">
            <use xlink:href="#icon-close"></use>
        </svg>
    </div>
</template>
<script>
    import {EventBus} from "../utils/EventBus";
    import {AppMessage, MessageTypeEnum} from "../constants/Message";
    import {Set} from "../utils/storage";
    import {STORAGE} from "../utils/Constants";

    export default {
        methods: {
            onClose() {
                Set(STORAGE.TOP_BANNER, true);
                EventBus.$emit(MessageTypeEnum.APP, {
                    message: AppMessage.BANNER_CLOSE
                });
            }
        }
    }
</script>