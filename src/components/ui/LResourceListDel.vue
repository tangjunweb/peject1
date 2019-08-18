<template>
  <div class="lhyj-ui-videolist">
    <Row :gutter="25" type="flex" class="clearfix">
      <Col class="lhyj-ui-videoitem" v-for="(el,i) in data" :key="i">
        <Card>
          <dt class="lhyj-ui-videoitem-pic" @click="link(el)">
            <img v-imgerror.video :src="el.coverUrl||'@/assets/images/default-video.png'" alt />
          </dt>
          <dd class="lhyj-ui-videoitem-title" @click="link(el)">{{el.name}}</dd>
          <dd class="lhyj-ui-videoitem-bot" @click="link(el)">
            <div>
              <div class="lhyj-ui-videoitem-bot-l">
                <span class="icon-eye" style="margin-right:14px;"></span>
                <span>{{el.viewCount}}</span>
              </div>
              <div class="lhyj-ui-videoitem-bot-r">
                <span class="icon-fav" style="margin-right:14px;"></span>
                <span>{{el.collectionCount}}</span>
              </div>
            </div>
            <div class="list-item-util" v-if="isDel">
              <Icon @click.stop="del(el)" type="ios-trash" size="24"></Icon>
            </div>
          </dd>
        </Card>
      </Col>
    </Row>
    <div class="no-data" v-if="!data.length">
      <img src="@/assets/images/no-data.png" alt />
    </div>
  </div>
</template>
<script>
import { Card } from "iview";
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    isDel: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Card
  },
  methods: {
    link(el) {
      let r = "";
      switch (el.resourceType) {
        case 1:
          r = "video";
          break;
        case 2:
          r = "book";
          break;
        case 3:
          r = "audio";
          break;
        case 4:
          r = "files";
          break;
        case 5:
          r = "zt";
          break;
        case 6:
          r = "image";
          break;
        case 7:
          r = "animate";
          break;
      }
      if (r === "zt") {
        if (el.flvUrl) {
          window.open(el.flvUrl);
        } else {
          this.$Message.warning("请返回flvUrl字段");
        }
        return;
      } else {
        this.$router.push({
          path: `/resource/resource/${r}/info`,
          query: {
            id: el.id
          }
        });
      }
    },
    del(el) {
      this.$emit("change", this.data.splice(el, 1));
    }
  }
};
</script>
<style lang="less">
.lhyj-ui-videolist {
}
.lhyj-ui-videoitem-pic {
  img {
    width: 100%;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    height: 200px;
    display: block;
  }
}
.lhyj-ui-videoitem-bot {
  padding: 5px 15px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.lhyj-ui-videoitem-title {
  line-height: 30px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 15px;
  box-sizing: border-box;
  font-size: 16px;
  color: #303030;
}
.lhyj-ui-videoitem-bot-l,
.lhyj-ui-videoitem-bot-r {
  float: left;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #573e41;
  span {
    font-size: 12px;
  }
  i {
    font-size: 14px;
  }
}
.lhyj-ui-videoitem-bot-l {
  margin-right: 40px;
}
.lhyj-ui-videoitem {
  width: 20%;
  border-radius: 6px;
  margin-bottom: 15px;
  transition: all 0.2s linear;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  .list-item-util {
    float: right;
  }
  &:hover {
    .list-item-util {
      transform: translateY(0) !important;
    }
  }
}
.lhyj-ui-videoitem:nth-child(5n),
.lhyj-ui-videoitem:first-child {
  margin-left: 0;
}
@media screen and (max-width: 1500px) {
  .lhyj-ui-videoitem {
    width: 25%;
  }
}
.lhyj-ui-videoitem .ivu-card-body {
  padding: 0;
}
</style>


