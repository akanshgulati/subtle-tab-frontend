<template>
    <div class="full-height">
        <div class="full-height full-width">
            <div class="loading-thumbnail" v-if="isLoading" key="loading"></div>
            <div class="thumbnail-image fade_in relative" v-else key="loaded"
                 @mouseleave="onMouseLeave" @mouseover="onMouseEnter()" @click.stop="onMouseEnter(true)">
                <div :style="background" class="thumbnail-background"></div>
                <section class="flex flex-center full-height flex-justify-center thumbnail-icon-section pointer relative">
                    <div class="thumbnail-icon thumbnail-lock pointer" @click.stop="toggleLock"
                         :class="{'active': isLocked, 'loading': isLocking}"></div>
                    <!--<div v-if="false" class="thumbnail-icon thumbnail-favourite pointer" @click.stop="toggleFavourite" :class="{'active': isFavourite}"></div>-->
                </section>
            </div>
        </div>
    </div>
</template>
<script>
    let hoverTimeout;
    export default {
        data() {
            return {
                isLoading: true,
                src: '',
                background: '',
                isFavourite: false
            }
        },
        props: ['url', 'isLocked', 'isLocking'],
        mounted() {
            this.loadImage(this.url);
        },
        methods: {
            loadImage(url) {
                this.isLoading = true;
                const image = new Image();
                image.src = url;
                image.onload = () => {
                    this.isLoading = false;
                    this.background = `background-image:url(${url});`
                };
            },
            onMouseLeave() {
                this.$emit('changeBackground');
                clearTimeout(hoverTimeout);
            },
            onMouseEnter(immediate) {
                if (immediate) {
                    // this.$emit('changeBackground', {url: this.url, permanent: true});
                    return;
                }
                this.$emit('changeBackground', {url: this.url});
                /*hoverTimeout = setTimeout(() => {
                    this.$emit('changeBackground', {url: this.url});
                }, 2000);*/
            },
            toggleFavourite() {
                this.isFavourite = !this.isFavourite;
            },
            toggleLock() {
                this.$emit('toggleLock', {value: !this.isLocked, url: this.url});
            }
        },
        watch:{
            url:{
                handler(newValue, oldValue) {
                    if (newValue !== oldValue) {
                        this.loadImage(newValue)
                    }
                }
            }
        }
    }
</script>
<style>
    .thumbnail-icon {
        width: 2vw;
        height: 2vw;
        margin: 0 5px;
        background-position: center;
        background-size: cover;
        opacity: 0;
        transition: all 1s;
        z-index: 100;
    }

    .thumbnail-image {
        width: 100%;
        height: 100%;
        background-position: center center;
        border-radius: 3px;
        overflow: hidden;
        background-repeat: no-repeat;
    }
    .thumbnail-background {
        transition: transform 2s linear;
        background-size: 100%;
        position: absolute;
        z-index: 1;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
    }
    .thumbnail-image:hover .thumbnail-background{
        transform: scale(1.5);
    }

    .thumbnail-icon-section {
        transition: background 0.25s ease-in-out;
        z-index: 2;
    }

    .thumbnail-image:hover .thumbnail-icon-section {
        background: rgba(0, 0, 0, 0.3);
    }

    .thumbnail-image:hover .thumbnail-icon, .thumbnail-icon.active {
        opacity: 1;
    }

    .thumbnail-favourite {
        background-image: url('/images/mark_favourite.png');
    }

    .thumbnail-lock {
        background-image: url('/images/mark_lock.png');
    }

    .thumbnail-favourite:hover, .thumbnail-favourite.active {
        background-image: url('/images/favourited.png');
    }

    .thumbnail-lock:hover, .thumbnail-lock.active {
        background-image: url('/images/locked.png');
    }
    .thumbnail-lock.loading {
        background-image: url('/images/loading-white.svg');
    }
</style>