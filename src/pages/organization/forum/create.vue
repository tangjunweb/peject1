<template>
  <div class="organization-forum-create">
    <Card class="border" :dis-hover="true">
      <Spin fix v-if="loading"></Spin>
      <Form ref="form" :model="model" :rules="rules" :label-width="60">
        <Row :gutter="30">
          <Col :span="12">
            <FormItem label="主题" prop="title">
              <Input size="large" v-model="model.title" placeholder="请填写主题"></Input>
            </FormItem>
          </Col>
          <Col :span="24">
            <FormItem label="内容" prop="content">
              <div ref="editor" style="text-align:left"></div>
            </FormItem>
          </Col>
          <Col :span="24">
            <FormItem label="图片" v-if="!loading">
              <UploadImgMultiple :defaultList="model.defaultList" @change="uploadChange"></UploadImgMultiple>
            </FormItem>
          </Col>
          <Col :span="24" class-name="text-center">
            <FormItem>
              <Button :loading="btnLoading" type="primary" @click="save" ghost>{{$route.id ? '保存': '发布'}}</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
  </div>
</template>
<script>
import { Form, FormItem, Input, Card } from "iview";
import ForumPost from "@/pages/model/ForumPost";
import UploadImgMultiple from "@/components/UploadImgMultiple";

import E from "wangeditor";
import emojiJSON from "../../../../static/emoji/emoji.json";
export default {
  components: {
    Card,
    Form,
    FormItem,
    Input,
    UploadImgMultiple
  },
  data() {
    return {
      loading: false,
      model: new ForumPost(),
      rules: ForumPost.getRules(),
      btnLoading: false,
      editor: null,
      emojiList: emojiJSON
    };
  },
  methods: {
    uploadChange(list) {
      this.model.picList = list.map(e => e.url);
    },
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.btnLoading = true;
          let fn = this.$route.query.id
            ? ForumServiceUpdate
            : ForumServiceCreate;
          let title = this.$route.query.id ? "修改成功" : "发布成功";
          let model = ForumPost.getModel(this.model);
          delete model.defaultList;
          fn(model)
            .then(res => {
              this.$Message.success(title);
              this.$router.go(-1);
            })
            .finally(() => {
              this.btnLoading = false;
            });
        }
      });
    }
  },
  async mounted() {
    let that = this;
    let fn = () => {
      this.editor = new E(this.$refs.editor);
      this.editor.customConfig.menus = [
        "fontSize",
        "emoticon",
        "image",
        "justify"
      ];
      this.editor.customConfig.emotions = [
        {
          title: "默认",
          type: "image",
          content: this.emojiList
        }
      ];

      this.editor.customConfig.uploadImgServer = `${UPLOAD_PATH}/file/Upload?project=LyProduct&AttachClass=3`;
      this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
      this.editor.customConfig.uploadImgHeaders = {
        Authorization: `Bearer ${this.$store.state.session.accessToken}`
      };
      this.editor.customConfig.uploadImgHooks = {
        customInsert(insertImg, result, editor) {
          insertImg(result.result.path);
        }
      };
      this.editor.customConfig.onchange = html => {
        this.model.content = html;
      };
      this.editor.customConfig.customAlert = info => {
        this.$Message.info(info);
      };
      this.editor.create();
      this.editor.txt.html(this.model.content);
    };
    if (this.$route.query.id) {
      this.loading = true;
      ForumServiceGet({
        id: this.$route.query.id
      })
        .then(res => {
          this.model = new ForumPost(res);
          fn();
        })
        .finally(() => {
          this.loading = false;
        });
    } else {
      fn();
    }
  }
};
</script>
<style lang="less">
.organization-forum-create {
}
</style>


