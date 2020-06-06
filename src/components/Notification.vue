<template>
    <div :class="getNotificationClass">
        <div class="n-container flex flex-center">
            <div class="meta" v-if="thumbnail && !media && !video">
                <div class="thumbnail" v-if="thumbnail">
                    <img
                        :src="thumbnail.url"
                        :alt="thumbnail.alt ? thumbnail.alt : ''"
                        :width="thumbnail.w"
                        :height="thumbnail.h"
                        :style="{'width': thumbnail.w, 'height': thumbnail.h}"
                    />
                </div>
            </div>
            <div class="content" v-if="text">
                <div class="header flex flex-justify-space-between flex-center">
                    <div class="heading flex-grow-1">
                        {{ text.heading }}
                    </div>
                    <div
                        class="resize pointer"
                        v-if="media || video"
                        @click.stop="resizeClick"
                    >
                        <transition>
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#333333"
                                v-if="!resize"
                            >
                                <path
                                    d="M15.375 0H10.7566C10.4114 0 10.1316 0.279813 10.1316 0.625C10.1316 0.970187 10.4114 1.25 10.7566 1.25H13.8661L8.85606 6.26006C8.61197 6.50416 8.61197 6.89988 8.85606 7.14394C9.10012 7.388 9.49584 7.38803 9.73993 7.14394L14.75 2.13387V5.24334C14.75 5.58853 15.0298 5.86834 15.375 5.86834C15.7202 5.86834 16 5.58853 16 5.24334V0.625C16 0.284844 15.7236 0 15.375 0Z"
                                />
                                <path
                                    d="M7.14394 8.85603C6.89984 8.61197 6.50413 8.61194 6.26006 8.85603L1.25 13.8661V10.7566C1.25 10.4114 0.970187 10.1316 0.625 10.1316C0.279813 10.1316 0 10.4114 0 10.7566V15.375C0 15.7145 0.276656 16 0.625 16H5.24337C5.58856 16 5.86837 15.7202 5.86837 15.375C5.86837 15.0298 5.58856 14.75 5.24337 14.75H2.13387L7.14394 9.73991C7.38803 9.49581 7.38803 9.10009 7.14394 8.85603Z"
                                />
                            </svg>
                            <svg
                                v-else
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clip-path="url(#clip0)">
                                    <path
                                        d="M9.29809 7.32703L13.9165 7.32703C14.2617 7.32703 14.5415 7.04721 14.5415 6.70203C14.5415 6.35684 14.2617 6.07703 13.9165 6.07703L10.807 6.07703L15.817 1.06696C16.0611 0.82287 16.0611 0.427151 15.817 0.183089C15.573 -0.0609738 15.1772 -0.061005 14.9332 0.183089L9.92309 5.19315L9.92309 2.08368C9.92309 1.73849 9.64328 1.45868 9.29809 1.45868C8.95291 1.45868 8.67309 1.73849 8.67309 2.08368L8.67309 6.70203C8.67309 7.04218 8.94953 7.32703 9.29809 7.32703Z"
                                        fill="#333333"
                                    />
                                    <path
                                        d="M0.183074 15.8169C0.427167 16.061 0.822886 16.061 1.06695 15.8169L6.07701 10.8069L6.07701 13.9163C6.07701 14.2615 6.35682 14.5413 6.70201 14.5413C7.0472 14.5413 7.32701 14.2615 7.32701 13.9163L7.32701 9.298C7.32701 8.95844 7.05035 8.673 6.70201 8.673L2.08364 8.673C1.73845 8.673 1.45864 8.95282 1.45864 9.298C1.45864 9.64319 1.73845 9.923 2.08364 9.923L5.19314 9.923L0.183073 14.9331C-0.0610203 15.1772 -0.0610203 15.5729 0.183074 15.8169Z"
                                        fill="#333333"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0">
                                        <rect
                                            width="16"
                                            height="16"
                                            fill="white"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                        </transition>
                    </div>
                </div>
                <div class="media mt-10 mb-10" v-if="media && !video">
                    <img
                        :src="media.url"
                        :alt="media.alt ? media.alt : ''"
                        :height="getMediaHeight"
                        :width="getMediaWidth"
                    />
                </div>
                <div class="media mt-10 mb-10" v-if="video">
                    <video 
                        autoplay
                        loop
                        muted
                        :height="getVideoHeight"
                        :width="getVideoWidth"
                        :src="video.url"/>
                </div>
                <div class="subHeading">{{ text.subHeading }}</div>
            </div>
        </div>
        <div
            class="controls mt-15 flex flex-center flex-justify-end"
            v-if="action"
        >
            <div class="secondary" v-if="action.secondary">
                <Button
                    class="btn-notification"
                    :text="action.secondary.text"
                    type="secondary"
                    theme="green"
                    size="medium"
                    v-on:clicked="secondaryClick"
                />
            </div>
            <div class="primary" v-if="action.primary">
                <Button
                    class="btn-notification ml-15 shadow"
                    :text="action.primary.text"
                    type="primary"
                    theme="green"
                    size="medium"
                    v-on:clicked="primaryClick"
                />
            </div>
        </div>
    </div>
</template>
<script>
    import Button from "../shared/Button.vue";


    export default {
        beforeCreate() {
        },
        data() {
            const obj = {
                resize: false,
            };
            return Object.assign({}, this.data, obj);
        },
        props: {
            data: {
                required: true
            },
            primaryClick: {
                required: true
            },
            secondaryClick: {
                required: true
            }
        },
        mounted() {
        },
        components: {
            Button,
        },
        computed: {
            getMediaHeight() {
                return this.media && this.media.h ? this.media.h : "130px";
            },
            getMediaWidth() {
                return this.media && this.media.w ? this.media.w : "100%";
            },
            getVideoHeight() {
                return this.video && this.video.h ? this.video.h : "auto";
            },
            getVideoWidth() {
                return this.video && this.video.w ? this.video.w : "100%";
            },
            getNotificationClass() {
                return "notifications" + (this.resize ? " large" : "");
            },
        },
        methods: {
            resizeClick() {
                this.resize = !this.resize;
            },
        },
    };
</script>
<style>
    .notifications {
        position: fixed;
        bottom: 4.65rem;
        left: 20px;
        background: white;
        max-width: 25rem;
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        transition: all 0.3s linear;
        padding: 0.9rem 1.4rem 0.9rem 1.1rem;
    }

    .notifications.large {
        max-width: 70vw;
    }

    .meta {
        margin-right: 16px;
    }

    .heading {
        font-size: 1.1rem;
        font-weight: 500;
    }

    .subHeading {
        font-size: 1rem;
        color: #666666;
        line-height: 1.35rem;
    }

    .primary button {
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    }

    .btn-notification {
        border-radius: 4px;
        padding: 0.35rem 1.1rem !important;
        height: auto !important;
    }

    .btn-notification.shadow {
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25) !important;
    }

    .media {
        margin-left: -11px;
        margin-right: -15px;
    }
</style>
