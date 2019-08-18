<template>
  <div class="organiztion-suggestion-info">
    <Card class="border" :dis-hover="true">
      <Spin fix v-if="loading"></Spin>
      <div class="layout-lr-form-scroll scroll">
        <div class="forum-info">
          <div class="forum-info-head">
            <img
              v-imgerror.avatar
              class="avatar"
              :src="info.headImage || require('@/assets/images/avatar.png')"
            >
            <div class="name">{{info.creatorUserName}}</div>
            <Time v-if="info.creationTime" :time="info.creationTime"/>
            <div class="openOrg"></div>
          </div>
          <div class="forum-content">
            <div class="text">{{info.opinionsContent}}</div>
            <div class="gallery">
              <img v-for="item in info.attachments" :src="item.path" :key="item.id" alt="">
            </div>
          </div>
        </div>
        <div class="forum-ly">
          <div class="forum-ly-title icon-group">
            <i style="margin-right:5px;" class="icon-msg"></i>
            <span>回复</span>
          </div>
          <div class="forum-ly-list">
            <div class="forum-ly-list-item" v-if='el.state == 2' v-for="(el,i) in info.opinionsReplys" :key="i">
              <div class="forum-ly-list-item-avatar">
                <Avatar v-imgerror.avatar :src="el.headImage||ZwAvatar" size="large"></Avatar>
              </div>
              <div class="forum-ly-list-item-h">
                <span class="forum-ly-list-item-h-user">{{el.auditUserName}}</span>
                <Time :time="el.replyTime"></Time>
              </div>
              <div class="forum-ly-list-item-b" v-html="el.replyContent"></div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import {
  Breadcrumb,
  BreadcrumbItem,
  Input,
  Avatar,
  Time,
  Form,
  FormItem,
  Page,
  Card,
  Icon
} from "iview";
import { GetOpinionsDetails } from "@/api";
import { SkipCount, ClearParams, Auth } from "@/mixins";
import ZwAvatar from "@/assets/images/avatar.png";
export default {
  mixins: [SkipCount, ClearParams, Auth],
  components: {
    Card,
    Breadcrumb,
    BreadcrumbItem,
    Avatar,
    Time,
    Form,
    FormItem,
    Input,
    Page,
    Icon
  },
  data() {
    let that = this;
    return {
      loading: false,
      data: [],
      info: {
        creationTime: ""
      },
      total: 0,
      ZwAvatar,
      showModal: false,
      loadingModal: false,
      params: {
        MaxResultCount: 5,
        SkipCount: 0,
        pageIndex: 1
      },
      model: {
        content: ""
      },
      rules: {
        content: [
          {
            required: true,
            message: "请输入回复内容"
          },
          {
            maxLen: 200,
            message: "不得超过200字"
          }
        ]
      }
    };
  },
  watch:{
    info:{
      deep: true,
      handler(n){
        console.log(n)
      }
    }
  },
  methods: {
    delReply(el) {
      this.$Modal.confirm({
        title: "系统提示",
        content: "确认删除回复？",
        onOk: () => {
          DeleteReply({
            id: el.id
          }).then(res => {
            this.init();
            this.$Message.success("删除成功");
          });
        }
      });
    },
    toggle(status = true) {
      this.$Modal.confirm({
        title: "系统提示",
        content: `确认${status ? "取消" : ""}置顶？`,
        onOk: () => {
          ForumServiceSetTopToggle({
            id: this.info.id
          }).then(res => {
            this.init();
            this.$Message.success(`${status ? "操作" : "置顶"}成功`);
          });
        }
      });
    },
    del() {
      this.$Modal.confirm({
        title: "系统提示",
        content: "确认删除帖子？",
        onOk: () => {
          ForumServiceDelete({
            id: this.info.id
          }).then(res => {
            this.$router.push("home");
            this.$Message.success("删除成功");
          });
        }
      });
    },
    init() {
      let id = this.$route.query.id;
      this.loading = true;
      GetOpinionsDetails({ id })
        .then(res => {
          this.info = res;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let m = JSON.parse(JSON.stringify(this.model));
          m.forumId = this.$route.query.id;
          this.loadingModal = true;
          ForumServiceReply(m)
            .then(res => {
              this.$Message.success("回复成功!");
              this.showModal = false;
              this.$refs["form"].resetFields();
              this.init();
            })
            .finally(() => {
              this.loadingModal = false;
            });
        }
      });
    }
  },
  mounted() {
    let id = this.$route.query.id;
    if (id) {
      this.init();
    } else {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less">
.organiztion-suggestion-info {
  .forum-info {
    .forum-info-head {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 84px;
      border-bottom: 1px solid #e6e6e6;
      margin-bottom: 15px;
      .avatar {
        width: 48px;
        height: 48px;
        display: block;
        border-radius: 50%;
        margin-right: 20px;
      }
      .name {
        font-size: 16px;
        margin-right: 13px;
      }
      .ivu-time {
        margin-top: 4px;
        font-size: 12px;
        color: #999;
      }
    }
    .forum-content {
      border-bottom: 1px solid #e6e6e6;
      margin-bottom: 15px;
      .text {
        font-size: 16px;
        margin-bottom: 15px;
      }
      .gallery{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        img{
          width: 120px;
          height: 120px;
          margin: 0 15px 15px 0;
        }
      }
    }
  }
  .forum-ly {
    .forum-ly-title {
      i {
        margin-right: 10px;
      }
    }
  }
  .forum-ly-list {
    position: relative;
    .forum-ly-list-item {
      position: relative;
      padding: 15px 15px 15px 80px;
      box-sizing: border-box;
      border-bottom: 1px solid #e6e6e6;
      .forum-ly-list-item-avatar {
        position: absolute;
        left: 15px;
        top: 12px;
      }
      .forum-ly-list-item-h {
        .forum-ly-list-item-h-user {
          font-size: 16px;
          margin-right: 15px;
        }
        .ivu-time {
          color:#999;
          font-size: 12px;
        }
      }
      .forum-ly-list-item-b {
        margin-top: 5px;
        font-size: 13px;
      }
    }
  }
  .forum-img-list {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 30px 0;
    img {
      max-width: 100%;
      height: 200px;
    }
    img + img {
      margin-left: 15px;
    }
  }
  .forum-ly-list-item {
    position: relative;
  }
}
</style>


