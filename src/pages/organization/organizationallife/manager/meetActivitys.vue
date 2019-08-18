<template>
  <div>
    <Row style="">
      <Form ref="form" :model="list">
        <Row>
          <Col :span="24" v-for="item in list" :key="item" style="margin-bottom:20px">
          <Card dis-hover>
            <template>
              <h4>{{item.agendaContent}}</h4>
              <FormItem label="">
                <Input type="textarea" :row="3" v-model="item.agendaResultRecord" placeholder="请输入，可添加多个议程"></Input>
              </FormItem>
            </template>
            <FormItem label="总结附件" prop="uploadUrl">
              <UploadAttachmentMultipe v-model="item.agendaAttachs" showTips></UploadAttachmentMultipe>
            </FormItem>
          </Card>
          </Col>

        </Row>
        </Card>

      </Form>
      <Col :span="24" class-name="text-center" style="margin-top:30px">
      <Button :loading="btnLoading" type="primary" @click="save" ghost>保存</Button>
      </Col>
    </Row>

  </div>
</template>
<script>
import { CreatePartyMeetingAgenda, GetPartyMeetingAgendaLists } from '@/api/partyOrganizationService';
import { Select, Option, Modal, Form, FormItem, Input, Card } from 'iview';
import CourseFileUpload from '@/components/CourseFileUpload';
import UploadAttachmentMultipe from '@/components/UploadAttachmentMultipe';
export default {
  props: ['meeting'],
  components: {
    UploadAttachmentMultipe,
    Select,
    Option,
    Modal,
    Form,
    FormItem,
    Input,
    Card
  },
  data() {
    return {
      list: [],
      btnLoading: false
    };
  },

  mounted() {
    this.getJson();
  },
  methods: {
    getJson() {
      this.loading = false;
      GetPartyMeetingAgendaLists({ id: this.$route.query.id })
        .then(res => {
          this.list = res;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    uploadChange(result) {
      this.meetItem.meetingAttachs = result;
      this.files = result;
    },
    save() {
      let params = {
        partyMeetingAgendas: this.list
      };
      this.btnLoading = true;
      CreatePartyMeetingAgenda(params)
        .then(res => {
          this.$Message.success('保存成功');
          this.getJson();
        })
        .finally(() => {
          this.btnLoading = false;
        });
    }
  }
};
</script>
