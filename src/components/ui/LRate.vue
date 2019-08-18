<template>
  <div class="lhyj-ui-rate" :style="style">
    <div class="default-box">
      <img v-for="item in count" :key='item' src="@/assets/images/icon-star-default.png" alt="">
    </div>
    <div class="active-box" :style="activeStyle">
      <img v-for="item in count" :key='item' src="@/assets/images/icon-star-active.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 5
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data(){
    return {
    }
  },
  computed: {
    style() {
      return {
        width: `${this.count * 15 + (this.count - 1) * 3 }px`
      }
    },
    activeStyle() {
      return {
        width: `${this.value * 15 + (this.value - 1) * 3 }px`
      }
    }
  }
}
</script>

<style lang='less'>
.lhyj-ui-rate{
  height: 15px;
  position: relative;
  .default-box, .active-box{
    position: absolute;
    height: 15px;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: row;
    img{
      margin-right: 3px;
      &:last-child{
        margin-right: 0;
      }
    }
  }
  .active-box{
    overflow: hidden;
    z-index: 10;
    width: 0;
  }
}
</style>
