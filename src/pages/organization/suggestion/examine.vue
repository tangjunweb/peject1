<template>
  <div class="organization-suggestion-examine">
    <TopCountTipsCard title="意见建议" :count="total" subTitle="待处理"></TopCountTipsCard>
    <Modal
      :value.sync="showModal"
      title="审核微党校"
      :closable="false"
      :loading="modalLoading"
      transfer
      :mask-closable="false"
      width="500px"
      class-name="blue-modal"
    >
      <Form ref="form" :model="model" :label-width="100" :rules="rules">
        <FormItem label="审核结果" prop="state">
          <RadioGroup v-model="model.state">
            <Radio :label="2">回复</Radio>
            <Radio :label="1">交办</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem v-if="model.state == 2" label="回复内容">
          <Input placeholder="请输入回复内容" v-model="model.replyContent" type="textarea" :rows="3"></Input>
        </FormItem>
        <FormItem v-if="model.state == 2" label="公开范围（不公开则不设置）" :label-width="200">
          <OrganizationCascader v-model="organId" @change="organChange" style="margin-top: 1px"></OrganizationCascader>
        </FormItem>
        <FormItem v-if="model.state == 1" label="交办对象" :label-width="100">
          <OrganizationCascader v-model="organId" @change="organChange" style="margin-top: 1px"></OrganizationCascader>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="modalLoading" @click="save">保存</Button>
        <Button @click="showModal = false">关闭</Button>
      </div>
    </Modal>
    <Form inline>
      <FormItem label="意见类型:" :label-width="80">
        <common-select keys="EnumOpinionsType" v-model="searchParams.OpinionsType"></common-select>
      </FormItem>
      <FormItem label="发布者姓名:" :label-width="100">
        <Input v-model="searchParams.NoticeTitle" type="text" placeholder="输入发布者姓名搜索"></Input>
      </FormItem>
      <FormItem>
        <Button @click="loadData" type="primary">搜索</Button>
      </FormItem>
      <FormItem>
        <Button @click="reset" type="primary">重置</Button>
      </FormItem>
    </Form>
    <Card class="border" :dis-hover="true">
      <Tabs :animated="false" @on-click="handleTabs">
        <TabPane label="待审核" name="1"></TabPane>
        <TabPane label="交办中" name="2"></TabPane>
        <TabPane label="已处理" name="3"></TabPane>
      </Tabs>
      <Table :loading="loading" stripe :columns="columns" :data="data"></Table>
      <div style="padding:30px 0 0 0" class="text-right">
        <Page
          :current.sync="params.pageIndex"
          :total="total"
          :page-size="params.MaxResultCount"
          class-name="lhyj-page"
          ghost
        />
      </div>
    </Card>
  </div>
</template>

<script>
import { GetAuditOpinionsPageList, SubmitOpinionsReplyHandle } from "@/api";
import {
  Form,
  FormItem,
  Input,
  Page,
  Table,
  Modal,
  Select,
  Option,
  Card,
  RadioGroup,
  Radio,
  Tabs,
  TabPane
} from "iview";
import TopCountTipsCard from "@/components/TopCountTipsCard";
import CommonSelect from "@/components/CommonSelect";
import OrganizationCascader from "@/components/OrganizationCascader";
import { SkipCount, ClearParams } from "@/mixins";
export default {
  mixins: [SkipCount, ClearParams],
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
    Card,
    CommonSelect,
    RadioGroup,
    Radio,
    OrganizationCascader,
    Tabs,
    TabPane
  },
  data() {
    let that = this;
    return {
      organId: "",
      loading: false,
      showModal: false,
      modalLoading: false,
      modalSpin: false,
      searchParams: {
        OpinionsType: "",
        CreationUserName: "",
        OrganPath: ""
      },
      model: {
        replyContent: "",
        state: 2,
        operOrganId: []
      },
      rules: {
        state: [
          {
            required: true,
            message: "请选择处理意见",
            trigger: "change",
            type: "integer"
          }
        ]
      },
      params: {
        MaxResultCount: 9,
        SkipCount: 0,
        pageIndex: 1,
        OpinionsStatus: 1
      },
      total: 0,
      data: [],
      columns: [
        {
          title: "意见类型",
          render(h, { row }) {
            return h(
              "span",
              that.GetCodeTableValue(row.opinionsType, "EnumOpinionsType")
            );
          }
        },
        {
          title: "发布者",
          key: "creatorUserName",
          ellipsis: true
        },
        {
          title: "发布时间",
          key: "creationTime"
        },
        {
          title: "操作",
          align: "right",
          width: 250,
          className: "zdy-table-opration",
          render(h, { row }) {
            let arr = [];
            arr.push(
              h(
                "a",
                {
                  on: {
                    click() {
                      that.$router.push({
                        path: "info",
                        query: {
                          id: row.opinionsId
                        }
                      });
                    }
                  }
                },
                "查看详情"
              )
            );
            if (that.params.OpinionsStatus == 1) {
              arr.push(
                h(
                  "a",
                  {
                    on: {
                      click() {
                        that.showModal = true;
                        that.model.replyIds = [row.id];
                      }
                    }
                  },
                  "处理"
                )
              );
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
      ]
    };
  },
  methods: {
    reset() {
      this.searchParams.CreationUserName = "";
      this.searchParams.OpinionsType = "";
      this.loadData();
    },

    handleTabs(v) {
      this.params.OpinionsStatus = v;
    },
    organChange(v) {
      this.model.operOrganId = v.value;
    },
    loadData() {
      let params = JSON.parse(JSON.stringify(this.params));
      params.SkipCount = this.SkipCount(
        params.MaxResultCount,
        params.pageIndex
      );
      Object.assign(params, this.searchParams);
      this.loading = true;
      GetAuditOpinionsPageList(this.ClearParams(params))
        .then(res => {
          this.total = res.totalCount;
          this.data = res.items;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.modalLoading = true;
          SubmitOpinionsReplyHandle(this.model)
            .then(res => {
              this.$Message.success("操作成功");
              this.showModal = false;
            })
            .finally(() => {
              this.loadData();
              this.modalLoading = false;
            });
        }
      });
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style>
</style>
