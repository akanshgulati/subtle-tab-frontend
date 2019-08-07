<template>
    <a class="bookmark-item flex flex-end mr-10 pv-10 ph-10 text-black" :title="item.title" :href="item.url">
        <div class="bookmark-edit" @click.stop="onDotClick" title="Edit Bookmark">...</div>
        <div class="bookmark-favicon" :style="getIcon(item.icon)"></div>
        <div class="bookmark-name">{{item.title}}</div>
    </a>
</template>
<script>
    export default {
        data(){
            return {
                style: 'background-image: url("images/icons/icon128.png");'
            }
        },
        methods: {
            onDotClick(e) {
                e.preventDefault();
                this.$emit("onDotClick", this.index);
            },
            getIcon(url) {
                return `background-image: url("${url}");`
            },
            navigate() {
                window.location.href = this.item.url;
            }
        },
        props: {
            item: {
                type: Object,
                required: true
            },
            index: {
                type: Number
            }
        }
    }
</script>
<style>
    .bookmark-edit {
        color: #333333;
        position: absolute;
        top: 1px;
        right: 4px;
        line-height: 0;
        height: 12px;
        font-size: 1.3rem;
        font-weight: 600;
        width: 18px;
        text-align: center;
        border-radius: 2px;
        opacity: 0;
        transition: all 0.2s linear;
    }

    .bookmark-edit:hover {
        background: rgba(128, 128, 128, 0.2);
    }

    .bookmark-item {
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05);
        background-color: rgba(255, 255, 255, 0.80);
        border-radius: 5px;
        transition: background-color 0.3s ease-in-out, padding-top 0.2s linear;
        user-select: none;
        max-width: 6.99rem;
        min-width: 36px;
        position: relative;
    }

    .bookmark-item:hover {
        background-color: rgba(255, 255, 255, 1);
        /*padding-top: 1rem;*/
    }

    .bookmark-item:hover .bookmark-edit {
        opacity: 1;
    }

    .bookmark-favicon {
        background-repeat: no-repeat;
        background-position: center;
        background-size: 16px;
        width: 1.2rem;
        height: 1.2rem;
        flex-shrink: 0;
    }
    .bookmark-name {
        font-weight: 500;
        font-size: 0.7rem;
        max-width: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 5px;
    }
</style>