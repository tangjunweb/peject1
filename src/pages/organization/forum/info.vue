<template>
  <div class="organization-forum-info">
    <Form inline class="text-right">
      <FormItem>
        <Button @click="toggle(info.topMark)" type="primary" ghost>{{info.topMark ? '取消' : ''}}置顶</Button>
      </FormItem>
      <FormItem v-if="auth('/organization/forum/delete')">
        <Button @click="del" icon="ios-trash" type="primary" ghost>删帖</Button>
      </FormItem>
    </Form>
    <Card class="border" :dis-hover="true">
      <Spin fix v-if="loading"></Spin>
      <div v-if="info.id" class="layout-lr-form-scroll scroll">
        <div class="forum-info">
          <div class="forum-info-h">
            <Tag v-if="info.topMark" color="primary">置顶</Tag>
            <span>{{info.title}}</span>
          </div>
          <div class="forum-info-b">
            <div class="icon-group">
              <span class="icon-house"></span>
              <span style="margin: 0 10px">{{info.organName || '未知'}}</span>
            </div>
            <Time :time="info.createTime"></Time>
            <div style="margin-left:50px" class="icon-group">
              <span class="icon-eye"></span>
              <span style="margin: 0 10px">查看</span>
              <span>{{info.viewCount}}</span>
            </div>
            <div style="margin-left:20px" class="icon-group">
              <span class="icon-hands"></span>
              <span style="margin: 0 10px">点赞</span>
              <span>{{info.likeCount}}</span>
            </div>
          </div>
          <div class="forum-info-line"></div>
          <div class="forum-info-content" v-html="info.content"></div>
          <div class="forum-img-list">
            <img v-for="(el,i) in info.picList" :key="i" :src="el" alt>
          </div>
        </div>
        <div class="forum-ly">
          <div class="forum-ly-title icon-group">
            <i style="margin-right:5px;" class="icon-msg"></i>
            <span>留言</span>
            <span style="margin-left:5px">{{total}}</span>
            <Button @click="showModal = true" style="margin: 0 0 0 30px" type="primary" ghost>我要留言</Button>
          </div>
          <div class="forum-ly-list">
            <div class="forum-ly-list-item" v-for="(el,i) in data" :key="i">
              <div class="forum-ly-list-item-avatar">
                <Avatar :src="el.headImage||ZwAvatar" size="large"></Avatar>
              </div>
              <div class="forum-ly-list-item-h">
                <span class="forum-ly-list-item-h-user">{{el.nickName}}</span>
                <Time :time="el.replyTime"></Time>
              </div>
              <div class="forum-ly-list-item-b" v-html="el.content"></div>
              <div class="forum-ly-list-item-d">
                <Icon @click="delReply(el)" size="20" type="ios-trash"></Icon>
              </div>
            </div>
            <div style="padding:30px 0 0 0" class="text-right">
              <Page
                :current.sync="params.pageIndex"
                :total="total"
                :page-size="params.MaxResultCount"
                class-name="lhyj-page"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
    <Modal
      v-model="showModal"
      title="我要留言"
      class-name="blue-modal"
      :loading="loadingModal"
      transfer
      width="500px"
    >
      <Form ref="form" :model="model" :rules="rules">
        <FormItem prop="content">
          <Input v-model="model.content" type="textarea" :rows="5" placeholder="请输入留言内容"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="showModal = false" type="primary">取消</Button>
        <Button :disabled="!model.content" :loading="loadingModal" @click="save" type="primary">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import {
  Breadcrumb,
  BreadcrumbItem,
  Input,
  Avatar,
  Time,
  Modal,
  Form,
  FormItem,
  Page,
  Card,
  Icon
} from "iview";

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
    Modal,
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
      info: {},
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
  computed: {
    routeList() {
      return this.$route.matched
        .filter(e => {
          return e.meta.title;
        })
        .map(e => {
          return {
            title: e.meta.title,
            path: e.path
          };
        });
    }
  },
  methods: {
    loadData() {
      let params = JSON.parse(JSON.stringify(this.params));
      params.SkipCount = this.SkipCount(
        params.MaxResultCount,
        params.pageIndex
      );
      params.ForumId = this.$route.query.id;
      this.loading = true;
      ForumServiceRepliesPageList(this.ClearParams(params))
        .then(res => {
          this.total = res.totalCount;
          this.data = res.items;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    delReply(el) {
      this.$Modal.confirm({
        title: "系统提示",
        content: "确认删除回复？",
        onOk: () => {
          DeleteReply({
            id: el.id
          }).then(res => {
            this.loadData();
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
      ForumServiceGet({ id })
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
              this.loadData();
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
      this.loadData();
    } else {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less">
.organization-forum-info {
  .forum-info {
    .ivu-tag {
      height: 18px;
      line-height: 18px;
      margin-right: 5px;
    }
    .forum-info-user {
      margin-left: 15px;
      margin-right: 15px;
    }
    .forum-info-h {
      display: flex;
      align-items: center;
      line-height: 25px;
      font-size: 16px;
      color: #573e41;
    }
    .forum-info-b {
      margin: 20px 0 10px;
      display: flex;
      flex-direction: row;
    }
    .forum-info-line {
      width: 100%;
      height: 2px;
      background: #f2f2f2;
      margin: 20px 0;
    }
    .forum-info-content {
      line-height: 30px;
      padding-bottom: 30px;
    }
  }
  .forum-ly {
    .forum-ly-title {
      padding-bottom: 15px;
      i {
        margin-right: 5px;
      }
      border-bottom: 1px solid #e6e6e6;
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
        top: 15px;
      }
      .forum-ly-list-item-h {
        .forum-ly-list-item-h-user {
          margin-right: 15px;
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
  .forum-ly-list-item-d {
    position: absolute;
    right: 0;
    top: 15px;
    cursor: pointer;
    height: 20px;
    line-height: 20px;
    width: 50px;
    text-align: center;
  }
  .forum-ly-list-item {
    position: relative;
  }
}
</style>


