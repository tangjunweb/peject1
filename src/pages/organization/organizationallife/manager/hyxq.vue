<template>
  <!-- 会议详情 -->
  <div class="llb-item">
    <div class="lll-hitem">
      <span class="label">主持人:</span>
      <span class="value">{{meeting.hostName}}</span>
    </div>
    <div class="lll-hitem">
      <span class="label">记录人:</span>
      <span class="value">{{meeting.recorderName}}</span>
    </div>
    <div class="lll-hitem">
      <span class="label">参会人数:</span>
      <span class="value">{{meeting.meetingUserCount}}</span>
    </div>
    <div class="lll-hitem" v-if="meeting.agendaContents">
      <span class="label">会议议程:</span>
      <ul style="margin-left:70px;margin-top:-30px;">
        <li v-for="(el,i) in meeting.agendaContents" :key="i">{{i+1}}.{{el.agendaContent}}</li>
      </ul>
    </div>
    <div class="lll-hitem">
      <span class="label">相关附件:</span>
      <AttachmentList :data="meeting.meetingAttachs"></AttachmentList>
    </div>
  </div>
</template>
<script>
import AttachmentList from "@/components/AttachmentList";
export default {
  components: {
    AttachmentList
  },
  props: {
    meeting: Object
  }
};
</script>
<style lang="less" scoped>
.llb-item {
  .lll-hitem {
    line-height: 30px;
    .label {
      margin-right: 5px;
    }
    .value {
      margin-left: 15px;
    }
  }
}
</style>


