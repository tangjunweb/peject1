<template>
  <div class="lhyj-ui-newslist">
    <Row :gutter="25" type="flex" class="clearfix">
      <Col :style="{width:width}" v-for="(el,i) in data" :key="i">
        <Card class="lhyj-ui-newsitem" @click.native="jump(el)">
          <img v-imgerror.video class="cover" :src="el.coverPhoto" alt />
          <div class="news-info">
            <div class="title text-ellipsis">{{el.name}}</div>
            <div class="option">
              <div class="icon-group">
                <i class="icon-eye-white"></i>
                <span>{{el.viewCount}}</span>
              </div>
              <div class="icon-group">
                <i class="icon-resource"></i>
                <span>共{{el.resourceCount}}个资源</span>
              </div>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
    <div class="no-data" v-if="!data.length">
      <img src="@/assets/images/no-data.png" alt />
    </div>
  </div>
</template>
<script>
import { Card, Icon } from "iview";
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    width: {
      type: String,
      default: "20%"
    }
  },
  components: {
    Card,
    Icon
  },
  methods: {
    jump(item) {
      this.$router.push({
        path: "ztInfo",
        query: {
          id: item.id
        }
      });
    }
  }
};
</script>
<style lang="less">
.lhyj-ui-newslist {
  .lhyj-ui-newsitem {
    margin-bottom: 20px;
    cursor: pointer;
    .ivu-card-body {
      padding: 0;
    }
    .cover {
      width: 100%;
      height: 200px;
      display: block;
    }
    .news-info {
      padding: 16px;
      .title {
        font-size: 16px;
        margin-bottom: 15px;
      }
    }
    .option {
      display: flex;
      .icon-group {
        margin-right: 36px;
        i {
          margin-right: 13px;
        }
      }
    }
  }
  @media screen and (max-width: 1700px) {
    .cover {
      height: 170px !important;
    }
  }
  @media screen and (max-width: 1500px) {
    .cover {
      height: 150px !important;
    }
  }
  @media screen and (max-width: 1200px) {
    .cover {
      height: 120px !important;
    }
  }
}
</style>


