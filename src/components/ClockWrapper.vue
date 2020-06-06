<template>
  <div class="relative" @mousedown.stop="">
    <transition>
      <Calendar id="g-cal" v-if="showCalendar" :settings="settings.calendar"></Calendar>
    </transition>

    <div class="flex flex-center pointer" @click="toggleCalendar">
      <div class="arrow-up font-center opacity-0 mr-10" v-show="!showCalendar">
        <svg width="23px" height="8px" viewBox="0 0 23 8">
          <use xlink:href="#icon-widget-arrow"></use>
        </svg>
      </div>
      <Clock :settings="settings"></Clock>
    </div>

  </div>
</template>

<script>
  import Clock from './Clock.vue'
  import Calendar from './Calendar.vue'
  import {EventBus} from '../utils/EventBus.js'

  export default {
    props: ['settings'],
    data() {
      return {
        showCalendar: this.settings.calendar && this.settings.calendar.isPinned
      }
    },
    methods: {
      toggleCalendar() {
        this.showCalendar = !this.showCalendar
        this.$ga.event('clock', 'clicked', this.showCalendar? 'open': 'close')
      },
    },
    mounted() {
      EventBus.$on('calendar', e => {
        if (e.force) {
          this.showCalendar = e.message === 'open'
          return
        }
        this.showCalendar = this.settings.calendar.isPinned || e.message === 'open'
      })
    },
    components: {
      Clock,
      Calendar,
    },
  }
</script>
<style>
  .arrow-up {
    transform: rotate(180deg);
  }

  #clock:hover .arrow-up {
    opacity: 1;
    animation: fade_in 0.3s;
    left: calc(50% - 11.5px)
  }

  #g-cal {
    position: absolute;
    right: 0;
    width: 22vw;
    min-width: 300px;
    margin-bottom: 1rem;
    max-height: 40vh;
    bottom: 100%
  }

  #g-cal:before {
    top: 99%;
    right: 2rem;
    border: 0.7rem solid transparent;
    border-bottom-color: rgb(255, 255, 255);
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    transform: rotate(180deg);
  }

  #g-cal:before {

  }
</style>
