<template>
    <button
        @click.stop="clicked"
        class="btn semi-bold basic"
        :class="computedClass"
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
        },
        computed: {
            computedClass() {
                return `${this.sizeClass} ${this.typeClass}`;
            },
            sizeClass() {
                return this.size ? this.size : 'small'
            },
            typeClass() {
                return this.type === 'primary' ? 'primary' : this.type === 'save' ? 'save' : '';
            }
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
        font-size: 0.9rem;
    }
    .medium {
        padding: 5px 10px;
        line-height: 20px;
        height: 29px;
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
    .save {
        background-color: #2196f3;
        color: #fff;
    }
</style>