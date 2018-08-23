<template>
    <button
        class="btn small semi-bold basic"
        :class="{'primary': type === 'primary'}"
        :disabled="isDisabled">
        {{text}}
    </button>

</template>
<script>
    export default {
        data() {
            return {}
        },
        methods: {
            clicked() {
                this.$emit('clicked');
            }
        },
        props: {
            type: {
                type: String,
                default: 'basic'
            },
            text: {
                required: true
            },
            isDisabled: {
                default: false
            },
            size: String
        }
    }
</script>
<style scoped>
    .btn {
        padding: 0 10px;
        color: white;
        margin-left: 0.3rem;
    }
    .small {
        height: 20px;
        line-height: 20px;
        padding: 0 5px;
    }
    .basic {
        background: none;
        color: #666;
        border: none;
        box-shadow: none;
    }
    .primary {
        background-color: rgba(33, 150, 243, 0.21);
        color: #2196F3;
    }
</style>