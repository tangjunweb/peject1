<template>
  <div class="lhyj-ui-LResourceAbout-scroll" :style="{height: factHeight + 'px'}" ref="scroll">
    <div class="lhyj-ui-LResourceAbout">
      <Spin fix v-if="loading"></Spin>
      <Alert v-if="list.length===0" type="info" show-icon>暂无相关资源</Alert>
      <Card
        class="lhyj-ui-LResourceAbout-item"
        v-for="(el,i) in list"
        :key="i"
        @click.native="link(el)"
      >
        <div class="lhyj-ui-LResourceAbout-item-pic">
          <img :src="el.coverUrl||'@/assets/images/default-video.png'" alt />
        </div>
        <div class="lu-l-i-lab-tit">{{el.name}}</div>
        <div class="lu-l-i-l-bot clearfix">
          <div class="lu-l-i-l-bot-l icon-group">
            <span class="icon-eye"></span>
            <span>{{el.viewCount}}</span>
          </div>
          <div class="lu-l-i-l-bot-r icon-group">
            <span class="icon-fav"></span>
            <span>{{el.collectionCount}}</span>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import { Card, Spin } from "iview";
import { setTimeout } from "timers";
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    height: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      $scroll: null,
      loading: true,
      factHeight: 285
    };
  },
  components: {
    Card,
    Spin
  },
  methods: {
    getIndexClass(i) {
      switch (i) {
        case 0:
          return "first";
          break;
        case 1:
          return "second";
          break;
        case 2:
          return "third";
          break;
        default:
          return "default";
          break;
      }
    },
    link(item) {
      switch (item.resourceType) {
        case 1:
          this.$router.push({
            path: "videoInfo",
            query: {
              id: item.id
            }
          });
          break;
        case 3:
          this.$router.push({
            path: "audioInfo",
            query: {
              id: item.id
            }
          });
          break;
        case 4:
          this.$router.push({
            path: "fileInfo",
            query: {
              id: item.id
            }
          });
          break;
        case 2:
          this.$router.push({
            path: "bookInfo",
            query: {
              id: item.id
            }
          });
          break;
      }
    }
  },
  watch: {
    list(n) {
      let that = this;
      if (n.length == 0) {
        setTimeout(() => {
          that.loading = false;
        }, 1000);
      } else {
        that.loading = false;
      }
    },
    height(n) {
      if (n) this.factHeight = n - 75;
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
.lhyj-ui-LResourceAbout-item-pic {
  width: 332px;
  img {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    width: 332px;
    height: 200px;
    display: block;
  }
}
.lhyj-ui-LResourceAbout-scroll {
  overflow: hidden;
  width: 332px;
}
.lhyj-ui-LResourceAbout {
  width: 100%;
  height: auto;
  overflow-y: auto;
  position: relative;
}
.lhyj-ui-LResourceAbout-item {
  cursor: pointer;
  .ivu-card-body {
    padding: 0;
  }
}
.lhyj-ui-LResourceAbout-item + .lhyj-ui-LResourceAbout-item {
  margin-top: 15px;
}
.lu-l-i-lab-tit {
  font-size: 16px;
  padding: 10px 15px;
  color: #573e41;
  &:extend(.text-elips);
}
.lu-l-i-l-bot {
  padding: 0 15px 15px;
}
.lu-l-i-l-bot-l,
.lu-l-i-l-bot-r {
  float: left;
  width: 50%;
  span + span {
    margin-left: 15px;
    transform: translateY(1px);
  }
}
</style>


