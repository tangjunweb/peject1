<template>
  <div class="scrollBar" ref="scroll" :style='{height:height}'>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
    props: {
        height: {
            type: String,
            default: '100%'
        }
    },
data () {
    return {
         $scroll: null
    }
},
methods: {
    updateScroll () {
        this.$scroll && this.$scroll.refresh()
    }
},
mounted() {
    this.$nextTick(() => {
      this.$scroll = new BScroll(this.$refs["scroll"], {
        // disableMouse: false,
        click: true,
        // scrollbar: {
        //     fade: true,
        //     interactive: false
        // },
        mouseWheel: {
          speed: 20,
          invert: false,
          easeTime: 300
        }
      });
    });
  }
}
</script>
<style lang="less">
.scrollBar {
  overflow: hidden;
}
</style>