<template>
  <div class="hyjs-wrap">
    <div class="text-right" style="margin-bottom:20px">
      <Button
        v-show="!isEdit"
        type="primary"
        @click="edit"
        ghost
      >编辑</Button>
      <Button v-show="isEdit" type="primary" ghost @click="edit">取消</Button>
      <Button :loading="loading" type="primary" style="margin-left:15px" v-show="isEdit" @click="save" ghost>保存</Button>
    </div>
    <div class="hyjs-item" v-for="(el,i) in model.agendaContents" :key="i">
      <Alert>{{i + 1}}、{{el.agendaContent}}</Alert>
      <Input :disabled="!isEdit" type="textarea" v-model="el.agendaResultRecord"></Input>
    </div>
    <div class="hyjs-summary">
      <span class="label">总结附件:</span>
      <UploadAttachmentMultipe theme="blue" :disabled="!isEdit" v-model="model.summaryAttachs"></UploadAttachmentMultipe>
    </div>
  </div>
</template>
<script>
import { Input } from "iview";
import { Auth } from "@/mixins";
import { AddMeetingAgendaRecord } from "@/api/service";
import UploadAttachmentMultipe from "@/components/UploadAttachmentMultipe";
export default {
  components: {
    Input,
    UploadAttachmentMultipe
  },
  props: {
    meeting: Object
  },
  mixins: [Auth],
  data() {
    return {
      isEdit: false,
      model: {
        meetingId: "",
        agendaContents: [],
        summaryAttachs: []
      },
      loading: false
    };
  },
  watch: {
    meeting: {
      deep: true,
      handler() {
        this.init();
      }
    }
  },
  methods: {
    edit() {
      this.isEdit = !this.isEdit;
    },
    save() {
      this.loading = true;
      AddMeetingAgendaRecord(this.model)
        .then(res => {
          this.$Message.success("修改成功");
          this.isEdit = false;
          this.$emit("change");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    init() {
      this.model.meetingId = this.meeting.id;
      this.model.agendaContents = this.meeting.agendaContents;
      this.model.summaryAttachs = this.meeting.summaryAttachs;
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="less">
.hyjs-wrap {
  .hyjs-item + .hyjs-item {
    margin-top: 30px;
  }
}
.hyjs-summary {
  margin-top: 20px;
  .label {
    margin-bottom: 20px;
    display: inline-block;
  }
}
</style>
