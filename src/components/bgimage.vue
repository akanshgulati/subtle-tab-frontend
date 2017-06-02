<template>
    <div id="background"></div>
</template>
<script>
    export default {
        data(){
            return {}
        },
        props: ['url', 'isLoading'],
        watch: {
            url: {
                handler: function (newValue) {
                    if (!newValue) {
                        return;
                    }
                    this.$el.classList.remove("fade_in");
                    let img = new Image();
                    img.src = newValue;
                    img.onload = function () {
                        this.$emit('bgLoaded');
                        this.$el.style.backgroundImage = 'url(' + newValue + ')';
                        this.$el.classList.add("fade_in");
                    }.bind(this);

                }
            }
        }
    }
</script>