<template>
  <div class="notice">
    <TopCountTipsCard title="通知公告" :count="total" subTitle="总条数" unit='条'></TopCountTipsCard>
    <Row>
      <Col :span="12">
        <Form ref="form" inline>
          <FormItem label="标题:" :label-width="50">
            <Input v-model="searchParams.NoticeTitle" type="text" placeholder="输入标题搜索"></Input>
          </FormItem>
          <FormItem label="发送状态:" :label-width="80">
            <Select v-model="searchParams.SendType" placeholder="请选择" style="width:100px">
              <Option
                v-for="item in EnumAnnouncementSendType"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button @click="loadData" type="primary">搜索</Button>
          </FormItem>
          <FormItem>
            <Button @click="reset" type="primary">重置</Button>
          </FormItem>
        </Form>
      </Col>
      <Col :span="12" class="text-right">
        <Button
          type="primary"
          v-if="auth('/information/notice/create')"
          ghost
          @click="$router.push('/information/notice/create')"
        >新增</Button>
      </Col>
    </Row>
    <Card class="border" :dis-hover="true">
      <Table :loading="loading" stripe :columns="columns" :data="data"></Table>
    </Card>
    <div class="text-right" style="padding:30px 0 0 0">
      <Page
        :current.sync="params.pageIndex"
        :total="total"
        :page-size="params.MaxResultCount"
        class-name="lhyj-page"
      />
    </div>
    <Modal
      v-model="showModal"
      title="通知公告详情"
      :loading="modalLoading"
      transfer
      width="800px"
      class-name="blue-modal"
    >
      <Form class="notice-info" :label-width="100" ref="form" :model="model">
        <FormItem label="标题：">
          <p>{{model.noticeTitle}}</p>
        </FormItem>
        <FormItem label="内容：">
          <p>{{model.noticeContent}}</p>
        </FormItem>
        <FormItem label="通知时间：">
          <p>{{model.creationTime | DateFormat('yyyy-MM-dd hh:mm:ss')}}</p>
        </FormItem>
        <FormItem label="通知状态：">
          <p>
            {{GetCodeTableValue(
            model.sendState,
            "EnumAnnouncementSendType"
            )}}
          </p>
        </FormItem>
        <FormItem label="已读人数：">
          <p>{{`${model.noticeReadCount}/${model.noticeCount}`}}</p>
        </FormItem>
      </Form>
      <Spin fix v-if="modalSpin"></Spin>
      <div slot="footer">
        <Button @click="showModal = false" type="primary">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import TopCountTipsCard from "@/components/TopCountTipsCard";
import { isEmptyObject } from "@/utils/util";
import {
  Form,
  FormItem,
  Input,
  Page,
  Table,
  Modal,
  Select,
  Option,
  Card
} from "iview";
import {
  AnnouncemenPageList,
  DeleteAnnouncement,
  SeeAnnouncemenPageList,
  GetAnnouncement,
  SendAnnouncement
} from "@/api";
import { PartyMemberServiceGet } from "@/api/partyMember";
import { SkipCount, ClearParams, Auth } from "@/mixins";
import { mapState } from "vuex";
export default {
  mixins: [SkipCount, ClearParams, Auth],
  components: {
    TopCountTipsCard,
    Form,
    FormItem,
    Input,
    Page,
    Table,
    Modal,
    Select,
    Option,
    Card
  },
  computed: {
    ...mapState({
      allroles: state => state.allroles,
      EnumAnnouncementSendType: state => state.baseCode.EnumAnnouncementSendType
    })
  },
  data() {
    let that = this;
    return {
      loading: false,
      showModal: false,
      modalLoading: false,
      modalSpin: false,
      isEdit: true,
      isUpdate: false,
      searchParams: {
        NoticeTitle: "",
        SendType: ""
      },
      model: {},
      params: {
        MaxResultCount: 9,
        SkipCount: 0,
        pageIndex: 1
      },
      total: 0,
      columns: [
        {
          title: "标题",
          key: "noticeTitle",
          minWidth: 300
        },
        {
          title: "内容",
          key: "noticeContent",
          minWidth: 400,
          ellipsis: true
        },
        {
          title: "创建时间",
          width: 180,
          render(h, { row }) {
            return h(
              "span",
              new Date(row.creationTime).Format("yyyy-MM-dd hh:mm:ss")
            );
          }
        },
        {
          title: "类型",
          width: 100,
          render(h, { row }) {
            return h(
              "span",
              that.GetCodeTableValue(
                row.announcementType,
                "EnumAnnouncementType"
              )
            );
          }
        },
        {
          title: "状态",
          width: 100,
          render(h, { row }) {
            return h(
              "span",
              that.GetCodeTableValue(
                row.announcementSendType,
                "EnumAnnouncementSendType"
              )
            );
          }
        },
        {
          title: "操作",
          align: "right",
          width: 200,
          className: "zdy-table-opration",
          render(h, { row }) {
            let arr = [];
            if (that.auth("/information/notice/delete")) {
              arr.push(
                h(
                  "a",
                  {
                    on: {
                      click() {
                        that.$Modal.confirm({
                          title: "系统提示",
                          content: `确认删除通知公告'${row.noticeTitle}'?`,
                          onOk() {
                            DeleteAnnouncement({
                              id: row.id
                            }).then(res => {
                              that.$Message.success("删除成功！");
                              that.loadData();
                            });
                          }
                        });
                      }
                    }
                  },
                  "删除"
                )
              );
            }
            if (that.auth("/information/notice/info")) {
              if (row.announcementSendType) {
                arr.push(
                  h(
                    "a",
                    {
                      on: {
                        click() {
                          GetAnnouncement({
                            id: row.id
                          }).then(res => {
                            that.model = res;
                            that.showModal = true;
                          });
                        }
                      }
                    },
                    "查看"
                  )
                );
              }
            }
            if (that.auth("/information/notice/create")) {
              if (!row.announcementSendType) {
                arr.push(
                  h(
                    "a",
                    {
                      on: {
                        click() {
                          that.$router.push({
                            path: "edit",
                            query: {
                              id: row.id
                            }
                          });
                        }
                      }
                    },
                    "编辑"
                  )
                );

                arr.push(
                  h(
                    "a",
                    {
                      on: {
                        click() {
                          that.$Modal.confirm({
                            title: "系统提示",
                            content: `确认发送通知公告'${row.noticeTitle}'?`,
                            onOk() {
                              SendAnnouncement({
                                id: row.id
                              }).then(res => {
                                that.$Message.success("发送成功！");
                                that.loadData();
                              });
                            }
                          });
                        }
                      }
                    },
                    "发送"
                  )
                );
              }
            }
            return h(
              "span",
              {
                class: "table-btn-group"
              },
              [...arr]
            );
          }
        }
      ],
      data: []
    };
  },
  methods: {
    reset() {
      this.searchParams.SendType = "";
      this.searchParams.NoticeTitle = "";
      this.loadData();
    },
    loadData() {
      let params = JSON.parse(JSON.stringify(this.params));
      params.SkipCount = this.SkipCount(
        params.MaxResultCount,
        params.pageIndex
      );
      Object.assign(params, this.searchParams);
      this.loading = true;
      AnnouncemenPageList(this.ClearParams(params))
        .then(res => {
          this.data = res.items;
          if (isEmptyObject(this.ClearParams(this.searchParams)))
            this.total = res.totalCount;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
<style lang="less">
</style>
