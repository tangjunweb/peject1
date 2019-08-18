<template>
  <Card class="topCountTipsCard" :dis-hover="true">
    <div class="topCountTipsCard-wrap">
      <div class="img">
        <slot>
          <img src="../assets/images/bread.png" alt>
        </slot>
      </div>
      <div class="topCountTipsCard-info">
        <h3>{{title}}</h3>
        <p>
          {{subTitle}}
          <span>{{count}}</span>
          <i>{{unit}}</i>
        </p>
      </div>
      <div v-if="subTitle1">
        <h3 style="visibility:hidden">{{title}}</h3>
        <p style="margin-left:50px">
          {{subTitle1}}
          <span>{{count1}}</span>
          <i>{{unit1}}</i>
        </p>
      </div>
    </div>
  </Card>
</template>

<script>
import { Card } from "iview";
export default {
  name: "topCountTipsCard",
  props: {
    title: {
      type: String,
      default: ""
    },
    unit:{
      default : '个'
    },
    count: {
      type: [String, Number],
      default: 0
    },
    subTitle: {
      type: String,
      default: ""
    },
    unit1:{
      default : '个'
    },
    count1: {
      type: [String, Number],
      default: 0
    },
    subTitle1: {
      type: String,
      default: ""
    }
  },
  components: {
    Card
  }
};
</script>

<style lang='less' scoped>
.topCountTipsCard {
  margin-bottom: 35px;
  border: 1px solid #e5dfdf;
  .topCountTipsCard-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    .img {
      height: 62px;
      margin-left: 37px;
      margin-right: 52px;
      display: block;
    }
    h3 {
      font-size: 18px;
      color: #573e41;
    }
    p {
      font-size: 14px;
      color: #573e41;
      line-height: 1;
      span {
        font-size: 24px;
        color: #eb3939;
        font-weight: 600;
        margin-left: 10px;
      }
      i {
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        margin-left: 10px;
      }
    }
  }
}
</style>
