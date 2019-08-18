<template>
  <Card class="lCardNav text-center">
    <div class="head">
      <slot></slot>
      <h4>{{title}}</h4>
    </div>
    <div class="btn-group">
      <router-link tag="div" :to="{path: path}" class="lCardNav-btn">立即进入</router-link>
    </div>
  </Card>
</template>

<script>
import { Card } from "iview";
export default {
  name: "LCardNav",
  components: {
    Card
  },
  props: {
    title: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang='less'>
.lCardNav {
  .ivu-card-body {
    padding: 0;
  }
  .head {
    padding: 20px;
    img {
      height: 95px;
    }
    h4 {
      font-size: 18px;
      color: #856b6e;
      line-height: 36px;
      padding-top: 20px;
    }
  }
  .btn-group {
    height: 56px;
    background: rgba(246, 245, 245, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #dfe5f2;
    .lCardNav-btn {
      width: 110px;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      color: #fff;
      background: linear-gradient(
        90deg,
        rgba(254, 102, 71, 1),
        rgba(249, 68, 53, 1)
      );
      box-shadow: 0px 4px 7px 0px rgba(251, 158, 111, 0.54);
      border-radius: 14px;
      cursor: pointer;
    }
  }
}
</style>
