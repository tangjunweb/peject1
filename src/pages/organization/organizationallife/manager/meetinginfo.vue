<template>
  <div class="organization-life-meetinginfo">
    <Spin fix v-if="loading"></Spin>
    <Row type="flex" :gutter="30">
      <Col span="24">
      <Card class="border lhyj-card" :dis-hover="true">
        <div style="display:flex;justify-content:space-between">
          <div class="title-group-box">
            <div class="title">{{meeting.title}}</div>
            <div class="lhyj-ui-right-tag">{{meeting.meetingStatus | CodeTable('MeetingStatus')}}</div>
            <!-- <div>会议类型：{{meeting.meetingType | CodeTable('MeetingType')}}</div> -->

            <div>会议时间：{{meeting.startTime|DateFormat('yyyy-MM-dd hh:mm')}}~{{meeting.endTime|DateFormat('yyyy-MM-dd hh:mm')}}</div>
            <div>会议地点：{{meeting.address}}</div>            
            <div>所属党组织：{{meeting.organName}}</div>
            <div>是否主题党日：{{meeting.isFixedDay?'是':'否'}}</div>
            <div>签到类型：{{meeting.meetingSignType | CodeTable('MeetingSignType')}}</div>
          </div>

          <div style="display:flex;align-items:flex-end;margin-right:50px">
            <Button type="primary" ghost @click="qCode">签到二维码</Button>
          </div>
        </div>

      </Card>
      </Col>
      <Col span="24" style="margin-top:20px">
      <div>
        <Row class=" meet-tabs">
          <Tabs :value="meetTabName" @on-click="meetTabsSel">
            <TabPane label="会议详情" name="MeetDetail"></TabPane>
            <TabPane label="参会情况" name="MeetJoinInfo"></TabPane>
            <TabPane label="活动纪实" name="MeetActivitys"></TabPane>
          </Tabs>
        </Row>
        <Card class="border lhyj-card" :dis-hover="true" style="border-top:none;">
          <component :is="meetTabName" :meeting="meeting"></component>
        </Card>
      </div>

      </Col>
    </Row>
  </div>
</template>
<script>
import { Tabs, TabPane, Card } from "iview";
import { GetMeetingInfoNewById,new_meeting_info } from "@/api/partyOrganizationService";
import QRCode from "qrcode";
import { Auth } from "@/mixins";
import MeetDetail from "./meetDetail";
import MeetJoinInfo from "./meetJoinInfo";
import MeetActivitys from "./meetActivitys";

export default {
  mixins: [Auth],
  components: {
    Card,
    Tabs,
    TabPane,
    MeetDetail,
    MeetActivitys,
    MeetJoinInfo
  },
  data() {
    return {
      tabName: "hyxq",
      meeting: {},
      loading: false,
      meetTabName: "MeetDetail"
    };
  },
  mounted() {
    let { id, meetingStatus, organName } = this.$route.query;
    if (id) {
      this.loading = true;
      GetMeetingInfoNewById({ id })
        .then(res => {
          this.meeting = res;
          this.meeting.meetingStatus = meetingStatus;
          this.meeting.organName = organName;
        })
        .finally(() => {
          this.loading = false;
        });
    } else {
      this.$router.go(-1);
    }
  },
  computed: {
    meetingType() {
      return this.meeting.meetingType;
    },
    meetingStatusColor() {
      switch (this.meeting.meetingStatus) {
        case 0:
          return "primary";
          break;
        case 1:
          return "success";
          break;
        case 2:
          return "error";
          break;
      }
    }
  },
  methods: {
    meetTabsSel(name) {
      this.meetTabName = name;
    },
    qCode() {
      let that = this;
      let id = null;
      QRCode.toDataURL(`${new_meeting_info}?id=${id}&type=1`, {
        color: {
          dark: "#000000",
          light: "#ffffff"
        }
      }).then(res => {
        that.$Modal.info({
          title: "扫描二维码签到",
          render(h) {
            return h("img", {
              attrs: {
                src: res
              },
              style: {
                width: "300px",
                display: "block",
                margin: "0 auto"
              }
            });
          }
        });
      });
    }
  }
};
</script>
<style lang="less">
.meet-tabs {
  background: #fff;
  border: 1px solid #dfe5f2;
  padding: 0 10px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  .ivu-tabs-bar {
    border-bottom: none;
    margin-bottom: 0;
    .ivu-tabs-nav .ivu-tabs-tab {
      padding: 16px;
    }
  }

  > .ivu-card {
    border-top: none;
  }
}
.title-group-box {
  // display: flex;
  // align-items: center;
  .title {
    margin-bottom: 0;
  }
  & > div {
    height: 28px;
    line-height: 28px;
    margin-right: 20px;
  }
}
.lhyj-ui-right-tag {
  right: -60px;
  top: 15px;
}
</style>
