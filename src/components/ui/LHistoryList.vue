<template>
  <div class="LHistory">
    <Row :gutter="25" type="flex">
      <Col class="lhyj-ui-livecol" v-for="(el,i) in data" :key="i">
        <Card class="lhyj-ui-liveitem" @click.native="jump(el)">
          <div class="cover">
            <div
              class="watch-time"
              v-if="(el.resourceType == 1 || el.resourceType == 3) && el.watchDateTime < el.resoursePeriod"
            >已观看{{el.watchDateTime | FormatSeconds}}</div>
            <div
              class="watch-time"
              v-if="(el.resourceType == 1 || el.resourceType == 3) && el.watchDateTime >= el.resoursePeriod"
            >已看完</div>
            <img v-imgerror.video :src="el.coverUrl" alt />
            <div class="cover-util">
              <div
                class="cover-util-item text-ellipsis"
              >上次观看时间：{{FormatDate(el.latestStudyTime,"yyyy-MM-dd hh:mm:ss")}}</div>
            </div>
          </div>
          <p class="text-ellipsis">{{el.name}}</p>
          <div class="cover-option">
            <div class="cover-util-item icon-group">
              播放量：
              <span class="text-ellipsis">{{el.viewCount}}</span>
            </div>
            <div
              class="cover-util-item icon-group"
              v-if="el.resourceType == 1 || el.resourceType == 3"
            >
              视频时长：
              <span class="text-ellipsis">{{el.resoursePeriod | FormatSeconds}}</span>
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
import { Card, Alert } from "iview";
export default {
  name: "LLive",
  props: {
    //类型 [1、正在直播 2、即将直播 3、往期直播]
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
    jump(item) {
      switch (item.resourceType) {
        case 1:
          this.$router.push({
            path: "/member-education/net-school/classroom/videoInfo",
            query: {
              id: item.id
            }
          });
          break;
        case 3:
          this.$router.push({
            path: "/member-education/net-school/classroom/audioInfo",
            query: {
              id: item.id
            }
          });
          break;
        case 4:
          this.$router.push({
            path: "/member-education/net-school/classroom/fileInfo",
            query: {
              id: item.id
            }
          });
          break;
        case 2:
          this.$router.push({
            path: "/member-education/net-school/classroom/bookInfo",
            query: {
              id: item.id
            }
          });
          break;
      }
    }
  }
};
</script>

<style lang='less'>
.LHistory {
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
      margin: 0 10px;
      line-height: 34px;
      font-size: 16px;
    }
  }
  .cover {
    position: relative;
    .watch-time {
      position: absolute;
      left: 0;
      top: 0;
      line-height: 1;
      padding: 4px 10px;
      color: #fff;
      background-color: rgb(230, 6, 6);
    }
    .cover-util {
      box-sizing: border-box;
      height: 30px;
      background: rgba(0, 0, 0, 0.3);
      padding: 0 5px;
      position: absolute;
      bottom: 0;
      width: 100%;
      .cover-util-item {
        line-height: 30px;
        color: #fff;
      }
    }
  }
  .cover-option {
    display: flex;
    flex-direction: row;
    padding: 0 10px 10px;
    box-sizing: border-box;
    .cover-util-item {
      flex: 1;
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
