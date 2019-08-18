<template>
  <div class="step-components">
    <Steps :current="current">
      <Step :content="item" v-for="item in content" :key="item"></Step>
    </Steps>
  </div>
</template>

<script>
import { Steps, Step } from "iview";
export default {
  name: "step",
  components: {
    Steps,
    Step
  },
  props: {
    current: {
      type: Number,
      default: 0
    },
    content: {
      type: Array,
      default: []
    }
  }
};
</script>

<style lang='less'>
.step-components {
  .ivu-steps {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .ivu-steps-item {
      width: 344px !important;
      &:last-child {
        width: 67px !important;
      }
    }
  }
  .ivu-steps .ivu-steps-head {
    background: transparent;
  }
  .ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner,
  .ivu-steps-item.ivu-steps-status-wait .ivu-steps-head-inner {
    height: 67px;
    width: 67px;
    background: url("../assets/images/step-circle.png");
    border: 0;
    border-radius: 0;
    line-height: 67px;
    span {
      color: #ec5846;
    }
  }
  .ivu-steps-horizontal .ivu-steps-content {
    padding: 25px 0;
    font-size: 16px;
  }
  .ivu-steps-item.ivu-steps-status-process .ivu-steps-content {
    color: #856b6e;
  }
  .ivu-steps .ivu-steps-tail {
    top: 33.5px;
    left: 83px;
  }
  .ivu-steps .ivu-steps-tail > i {
    width: 240px;
    height: 4px;
    background: url("../assets/images/step-line.png");
  }
  .ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner {
    height: 67px;
    width: 67px;
    background: url("../assets/images/step-active-circle.png");
    border: 0;
    border-radius: 0;
    line-height: 67px;
  }
  .ivu-steps-item.ivu-steps-status-finish .ivu-steps-tail > i:after {
    width: 240px;
    height: 4px;
    background: url("../assets/images/step-active-line.png");
  }
}
</style>
