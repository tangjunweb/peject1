<template>
  <div>
    <Row :gutter="30" class="meeting-list">
      <Col class="item-group-box" :span="24" style="margin-bottom:20px" v-for="item in meetList" :key="item">

      <Card >
        <template v-if="item.meetingType=='MeetingType-100'||item.meetingType=='MeetingType-101'||item.meetingType=='MeetingType-102'">
          <div class="card-item">

            <div class="item-group-title ">组织生活类型: {{item.meetingType | CodeTable('MeetingType')}}</div>
            <div>主持人：{{item.operUserName}}</div>
            <div>主持人姓名：{{item.operUserName}}</div>
            <div v-if="item.meetingType=='MeetingType-100'">是否上党课：{{item.isPartyClasses?'是':'否'}}</div>
            <div>是否需要使用视频会议：{{item.isVideoconference?'是':'否'}}</div>
            <div >参会人员：{{item.userList}}</span></div>
            <div>会议内容：{{item.content}}</div>
            <div class="download" v-if="item.meetingAttachs.length>0">文件：<span @click="download(item)">{{item.meetingAttachs[0].name}}</span></div>
            <div v-else>文件：暂无相关文件</div>
          </div>
        </template>
        <template v-if="item.meetingType=='MeetingType-103'">
          <div class="card-item">
            <div class="item-group-title">组织生活类型: {{item.meetingType | CodeTable('MeetingType')}}</div>
            <div>授课人：{{item.operUserName}}</div>
            <div>授课人姓名：{{item.operUserName}}</div>
            <div>会议内容：{{item.content}}</div>
            <div>是否需要使用视频会议：{{item.isVideoconference?'是':'否'}}</div>
            <div >参会人员：{{item.userList}}</div>
            <div>会议内容：{{item.content}}</div>
            <div class="download" v-if="item.meetingAttachs.length>0">文件：<span @click="download(item)">{{item.meetingAttachs[0].name}}</span></div>
            <div v-else>文件：暂无相关文件</div>
          </div>
        </template>
        <template v-if="item.meetingType=='MeetingType-104'">
          <div class="card-item">
            <div class="item-group-title">组织生活类型: {{item.meetingType | CodeTable('MeetingType')}}</div>
            <div>是否上党课：{{item.isPartyClasses?'是':'否'}}</div>
            <div>是否需要使用视频会议：{{item.isVideoconference?'是':'否'}}</div>
            <div >参会人员：{{item.userList}}</div>
            <div>会议内容：{{item.content}}</div>
            <div class="download" v-if="item.meetingAttachs.length>0">文件：<span @click="download(item)">{{item.meetingAttachs[0].name}}</span></div>
            <div v-else>文件：暂无相关文件</div>
          </div>
        </template>
      </Card>
      </Col>

    </Row>

  </div>
</template>
<script>
import { GetUpLoadAuth } from '@/api';
import { Card } from 'iview';
export default {
  props: ['meeting'],
  data() {
    return {
      meetList: []
    };
  },
  components: { Card },
  // computed: {
  //   meetList() {
  //     let meetList = [...this.meeting.infoOutDtos];
  //     meetList.forEach(item => {
  //       let nameList = item.meetingUsers.map(child => child.userName);
  //       this.$set(item, 'userList', nameList.join('、'));
  //     });
  //     return meetList;
  //   }
  // },
  mounted() {
    if (this.meeting.infoOutDtos&&this.meeting.infoOutDtos.length > 0) {
      this.meetList = [...this.meeting.infoOutDtos];
      this.meetList.forEach(item => {
        let nameList = item.meetingUsers.map(child => child.userName);
        this.$set(item, 'userList', nameList.join('、'));
      });
    }
  },
  methods: {
    download(item) {
      GetUpLoadAuth().then(res => {
        window.open(`${UPLOAD_PATH}/file/download?project=${res.project}&token=${res.token}&id=${item.meetingAttachs[0].id}`);
      });
    }
  },
  watch: {
    meeting() {
      this.meetList = [...this.meeting.infoOutDtos];
      this.meetList.forEach(item => {
        let nameList = item.meetingUsers.map(child => child.userName);
        this.$set(item, 'userList', nameList.join('、'));
      });
    }
  }
};
</script>
<style scoped lang="less">
.meeting-list {
  // height: 450px;
  // overflow-y: auto;
}
.download span {
  text-decoration: underline;
  cursor: pointer;
  color: #9cf092;
}
.card-item {
  > div {
    line-height: 30px;
  }
}
</style>
