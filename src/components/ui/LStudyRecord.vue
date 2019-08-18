<template>
  <div class="lhyj-ui-record-scroll" ref="scroll">
    <div class="lhyj-ui-record">
      <Alert v-if="list.length===0" type="info" show-icon>暂无学习记录</Alert>
      <Card
        class="lhyj-ui-record-item"
        v-for="(el,i) in list"
        :key="i"
        @click="link(el)"
        :bordered="false"
        :dis-hover="true"
      >
        <div class="content">
          <span class="num">{{i + 1}}</span>
          <div class="record-info">
            <div class="item-title">{{el.name}}</div>
            <div class="item-org">{{el.organName}}</div>
            <div class="item-count">
              <span class="item-count item-eye">
                <Icon type="ios-eye" size="20"/>1241231
              </span>
              <span class="item-count">
                <Icon type="md-star" size="18"/>123123
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import { Card, Icon } from "iview";
export default {
  components: {
    Icon,
    Card
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      $scroll: null
    };
  },
  methods: {
    link(el) {
      this.$router.push({
        path: "info",
        query: {
          id: el.id
        }
      });
    },
    getPercent(el) {
      let m = el.period / el.resoursePeriod;
      let n = parseFloat((m * 100).toFixed(2));
      return n;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$scroll = new BScroll(this.$refs["scroll"], {
        disableMouse: false,
        click: true,
        mouseWheel: {
          speed: 20,
          invert: false,
          easeTime: 300
        }
      });
    });
  }
};
</script>
<style lang="less">
@import "../../style/base.less";
.lhyj-ui-record-scroll {
  width: 100%;
  height: 100%;
  max-height: 800px;
  overflow: hidden;
}
.lhyj-ui-record {
  width: 100%;
  height: auto;
  overflow-y: auto;
  .ivu-alert.ivu-alert-with-icon{
      margin: 0 20px;
  }
}
.lhyj-ui-record-item + .lhyj-ui-record-item {
  margin-top: 2px;
}
.lhyj-ui-record-item {
  .content {
    padding: 30px 42px 20px 40px;
    box-sizing: border-box;
    position: relative;
    transition: all 0.2s linear;
    display: flex;
    flex-direction: row;
    overflow: auto;
    &:hover {
      cursor: pointer;
      box-shadow: 0px 0px 10px 0px rgba(196, 203, 214, 0.6);
    }
    span.num {
      display: block;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 18px;
      font-size: 14px;
      box-sizing: border-box;
      border-radius: 2px;
      margin-right: 10px;
      color: #c4cbd6;
      border: 1px solid #c4cbd6;
    }
    .item-title {
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 10px;
    }
    .item-org {
      font-size: 14px;
      color: #C4CBD6;
      margin-bottom:10px;
    }
    .item-count {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 20px;
      font-size: 14px;
      line-height: 1;
      color: #C4CBD6;
    }
    .item-eye{
        margin-right: 10px;
    }
  }
  &:nth-child(1) {
    span.num {
      color: #ffc000;
      border: 1px solid #ffc000;
    }
  }
  &:nth-child(2) {
    span.num {
      color: #ff6c60;
      border: 1px solid #ff6c60;
    }
  }
  &:nth-child(3) {
    span.num {
      color: #2c9aff;
      border: 1px solid #2c9aff;
    }
  }
}
.lhyj-ui-record-item .ivu-card-body {
  padding: 0;
}
</style>


