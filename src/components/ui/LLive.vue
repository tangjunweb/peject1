<template>
  <div class="LLive">
    <Row :gutter="25" type="flex">
      <Col class="lhyj-ui-livecol" v-for="(el,i) in data" :key="i">
        <Card class="lhyj-ui-liveitem" @click.native="jump(el)">
          <div class="cover">
            <div v-if="type==3 && el.resourceId" class="lhyj-ui-tag">直播回放</div>
            <div v-if="type==3 && !el.resourceId" class="lhyj-ui-tag lhyj-ui-tag-disable">已结束</div>
            <div
              v-if="type==1 || type==2"
              class="lhyj-ui-tag"
            >{{GetCodeTableValue(el.deviceType, "EnumDeviceType")}}</div>
            <img v-imgerror.video :src="el.coverImage" alt />
            <div class="cover-util" v-if="type == 1">
              <!-- <div class="cover-util-item">
                <Icon type="md-person " size="14" color="#fff" />
                <span class="text-ellipsis">{{el.uname}}</span>
              </div>-->
              <div class="cover-util-item">
                <Icon type="md-eye" size="16" color="#fff" />
                <span class="text-ellipsis">{{el.watchUserCount}}</span>
              </div>
            </div>
            <div class="cover-util" v-if="type == 2 || type == 3">
              <div
                class="cover-util-item text-ellipsis"
              >直播时间：{{el.startTime | DateFormat('MM-dd hh:mm:ss')}} 至 {{el.endTime | DateFormat('MM-dd hh:mm:ss')}}</div>
            </div>
          </div>
          <p>{{el.title}}</p>
        </Card>
      </Col>
    </Row>
    <div class="no-data" v-if="!data.length">
      <img src="@/assets/images/no-data.png" alt />
    </div>
  </div>
</template>

<script>
import { Card, Alert } from "iview";
export default {
  name: "LLive",
  props: {
    //类型 [1、正在直播 2、即将直播 3、往期直播]
    type: {
      type: [String, Number],
      default: 1
    },
    data: {
      type: Array,
      default: []
    }
  },
  components: {
    Card,
    Alert
  },
  methods: {
    jump(el) {
      if (this.type == 3) {
        if (el.resourceId) {
          this.$router.push({
            path: "/member-education/net-school/classroom/videoInfo",
            query: {
              id: el.resourceId
            }
          });
        } else {
          this.$Message.info("直播已经结束");
        }
      } else {
        this.$router.push({
          path: "info",
          query: {
            id: el.id
          }
        });
      }
    }
  }
};
</script>

<style lang='less'>
.LLive {
  .ivu-card-body {
    padding: 0;
  }
  .lhyj-ui-livecol {
    width: 20%;
  }
  .lhyj-ui-liveitem {
    position: relative;
    margin-bottom: 20px;
    cursor: pointer;
    p {
      height: 68px;
      padding: 0 10px;
      line-height: 34px;
      font-size: 16px;
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .cover {
    position: relative;
    overflow: hidden;
    .top-tag {
      position: absolute;
      top: 0;
      left: 0;
      line-height: 1;
      padding: 4px 10px;
      color: #fff;
      background-color: rgb(230, 6, 6);
    }
    .cover-util {
      height: 30px;
      background: rgba(0, 0, 0, 0.3);
      padding: 0 5px;
      position: absolute;
      bottom: 0;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .cover-util-item {
        color: #fff;
        span {
          margin-left: 5px;
        }
      }
    }
  }
  .cover > img {
    width: 100%;
    height: 220px;
    display: block;
  }
  @media screen and (max-width: 1760px) {
    .cover > img {
      height: 200px !important;
    }
  }
  @media screen and (max-width: 1660px) {
    .cover > img {
      height: 170px !important;
    }
  }
  @media screen and (max-width: 1500px) {
    .cover > img {
      height: 150px !important;
    }
  }
  @media screen and (max-width: 1200px) {
    .cover > img {
      height: 150px !important;
    }
  }
}
</style>
