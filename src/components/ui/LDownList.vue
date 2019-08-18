<template>
  <div class="lhyj-ui-ldownlist-scroll" ref="scroll">
    <div class="lhyj-ui-ldownlist">
      <Alert v-if="list.length===0" type="info" show-icon>暂无下级资源</Alert>
      <div class="lhyj-ui-ldownlist-item" v-for="(el,i) in list" :key="i" @click="link(el)">
        <div class="lhyj-ui-ldownlist-item-l">
          <div class="lu-l-i-l-tit">{{el.name}}</div>
          <div class="lu-l-i-l-des">{{el.createOrgan}}上传</div>
          <div class="lu-l-i-l-bot clearfix">
            <div class="lu-l-i-l-bot-l icon-group">
              <i class="icon-eye"></i>
              <span>{{el.viewCount}}</span>
            </div>
            <div class="lu-l-i-l-bot-r icon-group">
              <i class="icon-fav"></i>
              <span>{{el.collectionCount}}</span>
            </div>
          </div>
        </div>
        <div class="lhyj-ui-ldownlist-item-r" :class="getIndexClass(i)">
          <span v-if="i > 2">{{i+1}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    type: Number
  },
  data() {
    return {
      $scroll: null
    };
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
  mounted() {
    this.$nextTick(() => {
      this.$scroll = new BScroll(this.$refs["scroll"], {
        disableMouse: false,
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
};
</script>
<style lang="less">
@import "../../style/base.less";
.lhyj-ui-ldownlist-scroll {
  width: 100%;
  max-height: 500px;
  overflow: hidden;
}
.lhyj-ui-ldownlist {
  width: 100%;
  height: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
.lhyj-ui-ldownlist-item-l {
  max-width: 260px;
}
.lhyj-ui-ldownlist-item + .lhyj-ui-ldownlist-item {
  margin-top: 15px;
}
.lhyj-ui-ldownlist-item {
  border-radius: 6px;
  padding: 20px 80px 20px 15px;
  box-sizing: border-box;
  position: relative;
  transition: all 0.2s linear;
  &:hover {
    cursor: pointer;
  }
}
.lu-l-i-l-tit {
  font-size: 16px;
  &:extend(.text-elips);
}
.lu-l-i-l-des {
  font-size: 14px;
  padding: 10px 0 20px 0;
}
.lu-l-i-l-bot-l,
.lu-l-i-l-bot-r {
  float: left;
  width: 50%;
  span {
    font-size: 12px;
    margin-left: 5px;
    display: inline-block;
    transform: translateY(1px);
  }
  i {
    font-size: 14px;
  }
}
.lhyj-ui-ldownlist-item-r {
  position: absolute;
  width: 44px;
  height: 35px;
  top: 50px;
  right: 10px;
  background-repeat: no-repeat;
  &.default {
    background-image: url(../../assets/panel-icon2.png);
    background-position: center -120px;
  }
  &.first {
    background-image: url(../../assets/panel-icon2.png);
    background-position: center 0;
  }
  &.second {
    background-image: url(../../assets/panel-icon2.png);
    background-position: center -40px;
  }
  &.third {
    background-image: url(../../assets/panel-icon2.png);
    background-position: center -80px;
  }
  text-align: center;
  line-height: 38px;
  color: #212661;
  //text-shadow: 1px 1px 2px #212661;
  font-weight: 600;
  font-size: 14px;
  &::before {
    content: "";
    display: block;
    width: 100px;
    height: 3px;
    background-image: url(../../assets/login-line.png);
    background-repeat: no-repeat;
    background-size: contain;
    transform: rotate(90deg);
    left: -65px;
    position: absolute;
    top: 15px;
  }
}
</style>


