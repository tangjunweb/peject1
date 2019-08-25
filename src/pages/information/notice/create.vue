<template>
  <div class="notice-create">
    <TopEditTipsCard
      v-if="$route.query.id"
      :editor="'sun'"
      :creatime="model.creationTime"
      :lastime="model.lastModificationTime || model.creationTime"
    ></TopEditTipsCard>
    <Card class="border" :dis-hover="true">
      <Spin fix v-if="loadState"></Spin>
      <Form ref="form" :model="model" :rules="rules">
        <Row :gutter="32">
          <Col :span="8">
            <FormItem label="消息类型" prop="announcementType">
              <Select v-model="model.announcementType">
                <Option
                  v-for="item in EnumAnnouncementType"
                  :value="item.value"
                  :key="item.value"
                >{{item.label}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="标题" prop="noticeTitle">
              <Input placeholder="标题" v-model="model.noticeTitle"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col :span="4">
            <FormItem label="用户范围" prop="announRecUsers">
              <Input :readonly="true" placeholder="请选择用户范围" v-model="rangeName">
                <RangeSelectMultipeSelect
                  title="选择用户范围"
                  type="multiple"
                  @change="rangeChange"
                  v-model="model.announRecUsers"
                  slot="append"
                >
                  <Button type="default" ghost>选择用户范围</Button>
                </RangeSelectMultipeSelect>
              </Input>
            </FormItem>
          </Col>
          <Col :span="24">
            <FormItem label="内容" prop="noticeContent">
              <Input :rows="5" type="textarea" placeholder="内容" v-model="model.noticeContent"></Input>
            </FormItem>
          </Col>
          <Col :span="24">
            <FormItem label="附件" prop="uploadUrl">
              <UploadAttachmentMultipe v-model="model.announcementAttachs" showTips></UploadAttachmentMultipe>
            </FormItem>
          </Col>
          <Col :span="24">
            <Checkbox v-model="model.isSendMsg">短信同步通知</Checkbox>
          </Col>
          <Col :span="24" style="margin-top:30px">
            <Row :gutter="20" class="text-center" type="flex" justify="center">
              <Col>
                <Button :loading="loading" @click="submit(true)" type="primary">存为草稿</Button>
              </Col>
              <Col>
                <Button :loading="loading" @click="submit(false)" type="primary">保存并发布</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Card>
  </div>
</template>
<script>
import {
  FormItem,
  Form,
  Input,
  Tree,
  Select,
  Option,
  Card,
  Checkbox
} from "iview";
import Notice from "@/pages/model/Notice";
import RangeSelectMultipeSelect from "@/components/RangeSelectMultipeSelect";
import UploadAttachmentMultipe from "@/components/UploadAttachmentMultipe";
import TopEditTipsCard from "@/components/TopEditTipsCard";
import {
  CreateAnnouncement,
  UpdateAnnouncement,
  GetEditAnnouncement
} from "@/api";
import { mapState } from "vuex";
export default {
  components: {
    Card,
    FormItem,
    Form,
    Input,
    Tree,
    Select,
    Option,
    Checkbox,
    UploadAttachmentMultipe,
    TopEditTipsCard,
    RangeSelectMultipeSelect
  },
  data() {
    return {
      model: new Notice(),
      rules: Notice.getRules(),
      loading: false,
      loadState: false,
      roleLevels: [],
      files: {},
      rangeName: ""
    };
  },
  computed: {
    EnumAnnouncementType() {
      return this.$store.state.baseCode.EnumAnnouncementType;
    }
  },
  methods: {
    submit(boolean) {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.$route.query.id) {
            this.model.isDraft = boolean;
            UpdateAnnouncement(Notice.getModels(this.model))
              .then(res => {
                this.$Message.success(boolean ? "草稿修改成功" : "发送成功");
                this.$router.go(-1);
              })
              .finally(() => {
                this.loading = false;
              });
          } else {
            this.model.isDraft = boolean;
            CreateAnnouncement(Notice.getModels(this.model))
              .then(res => {
                this.$Message.success(boolean ? "草稿创建成功" : "发送成功");
                this.$router.go(-1);
              })
              .finally(() => {
                this.loading = false;
              });
          }
        }
      });
    },
    uploadChange(result) {
      this.model.flvUrl = result.id;
      this.files = result;
    },
    rangeChange(v) {
      this.rangeName = `已选择${v.length}人`;
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.loadState = true;
      GetEditAnnouncement({ id: this.$route.query.id })
        .then(res => {
          this.model = new Notice.setModels(res);
          this.rangeName = `已选择${this.model.announRecUsers.length}人`;
        })
        .finally(() => {
          this.loadState = false;
        });
    }
  }
};
</script>
