<template>
  <Card class="information-score-member border" :dis-hover="true">
    <Form inline>
      <FormItem label="党组织" :label-width="60">
        <OrganizationCascader style="width:200px" @change="orgChange" v-model="organId"></OrganizationCascader>
      </FormItem>
      <FormItem label="姓名" :label-width="60">
        <Input v-model="searchParams.name" placeholder="请输入姓名"></Input>
      </FormItem>
      <FormItem label="年份" :label-width="60">
        <DatePicker
          type="year"
          style="width:100%"
          disabled
          placeholder="选择年份"
          v-model="searchParams.year"
        ></DatePicker>
      </FormItem>
      <FormItem label="人员类别：" :label-width="100">
        <common-select
          size="default"
          keys="PartyMemeberType"
          v-model="searchParams.partyMemeberType"
        ></common-select>
      </FormItem>
      <FormItem label="考核标准：" :label-width="100">
        <common-select
          size="default"
          keys="PartyMemberAssessment"
          v-model="searchParams.partyMemberAssessment"
        ></common-select>
      </FormItem>
      <FormItem label="是否达标：" :label-width="100">
        <Select v-model="searchParams.upToScratch">
          <Option :value="true">是</Option>
          <Option :value="false">否</Option>
        </Select>
      </FormItem>
      <FormItem :label-width="10">
        <Button @click="loadData" type="primary" :disabled="!searchParams.organPath">查询</Button>
      </FormItem>
      <FormItem :label-width="10">
        <Button @click="reset" type="primary">重置</Button>
      </FormItem>
    </Form>
    <Table :loading="loading" stripe :columns="columns" :data="data"></Table>
    <div class="text-right" style="padding:30px 0 0 0">
      <Page
        :current.sync="params.pageIndex"
        :total="total"
        :page-size="params.MaxResultCount"
        class-name="lhyj-page"
      />
    </div>

    <!-- 积分明细 -->
    <Modal
      v-model="showModal"
      title="查看详情"
      :loading="modalLoading"
      transfer
      class-name="info-modal"
      width="1000px"
    >
      <Tabs class="lhyj-tabs" v-model="tabName">
        <TabPane label="基本情况" :name="3"></TabPane>
        <TabPane label="获得积分" name="1"></TabPane>
        <TabPane label="异常行为扣分" name="2"></TabPane>
        <TabPane label="人工积分" name="0"></TabPane>
        <Button
          slot="extra"
          v-show="tabName == 0"
          @click="showFormModal = true"
          type="primary"
        >新增扣分记录</Button>
      </Tabs>
      <template v-if="tabName == 3">
        <Form label-position="left" :show-message="false">
          <FormItem>
            <h2>{{`${user.name}${searchParams.year.getFullYear()}年学习详情`}}</h2>
          </FormItem>
          <FormItem label="人员类别：">{{GetCodeTableValue(user.partyMemeberType, "PartyMemeberType")}}</FormItem>
          <FormItem
            label="考核标准："
          >{{GetCodeTableValue(user.partyMemeberAssess, "PartyMemberAssessment")}}</FormItem>
          <FormItem label="是否达标：">{{user.upToScratch ? '是': '否'}}</FormItem>
          <FormItem label="总积分：">{{user.totalCreditS1}} （≥{{user.passTotalScore}}达标）</FormItem>
          <FormItem label="集中学习培训积分：">{{user.studyCreditS1}} （≥{{user.passTotalScore}}达标）</FormItem>
          <FormItem label="必修课：">{{user.study}}/ {{user.mustStudy}}门</FormItem>
        </Form>
      </template>
      <template v-else>
        <Form inline>
          <FormItem label="日期" style="margin-bottom:20px" :label-width="50">
            <DatePicker type="date" style="width:100%" placeholder="选择日期" v-model="userDate"></DatePicker>
          </FormItem>
          <FormItem>
            <Button @click="getUserDetail" type="primary">查询</Button>
          </FormItem>
        </Form>
        <Table :loading="modalLoading" stripe :columns="userColumns" :data="userData"></Table>
        <div class="text-right" style="padding:30px 0 0 0">
          <Page
            :current.sync="userParams.pageIndex"
            :total="userTotal"
            :page-size="userParams.MaxResultCount"
            class-name="lhyj-page"
          />
        </div>
      </template>
      <div slot="footer">
        <Button @click="showModal = false" type="primary">关闭</Button>
      </div>
    </Modal>

    <!-- 新增扣分记录 -->
    <Modal
      v-model="showFormModal"
      title="新增扣分记录"
      :loading="formModalLoading"
      :closable="false"
      :mask-closable="false"
      transfer
      class-name="blue-modal"
      width="800px"
    >
      <Form ref="form" :model="formModal" :rules="rules">
        <FormItem label="扣除积分" prop="creditS1">
          <InputNumber :min="-100" style="width: 100%" v-model="formModal.creditS1"></InputNumber>
        </FormItem>
        <FormItem label="扣分内容" prop="text">
          <Input type="textarea" v-model="formModal.text"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="save" type="primary" ghost>提交</Button>
        <Button @click="showFormModal = false" type="primary" ghost>取消</Button>
      </div>
    </Modal>
  </Card>
</template>

<script>
import {
  Form,
  FormItem,
  Card,
  Table,
  Page,
  Modal,
  Tabs,
  TabPane,
  DatePicker,
  InputNumber,
  Select,
  Option
} from "iview";
import { SkipCount, ClearParams, Auth } from "@/mixins";
import CommonSelect from "@/components/CommonSelect";
import OrganizationCascader from "@/components/OrganizationCascader";
import {
  GetPartyMemberCreditRankStatistics,
  GetPartyMemberCreditDetailPagedList,
  CreatePartyCreditLogOfMember
} from "@/api";
export default {
  mixins: [SkipCount, ClearParams, Auth],
  components: {
    Form,
    FormItem,
    Card,
    Table,
    Page,
    Modal,
    Tabs,
    TabPane,
    OrganizationCascader,
    DatePicker,
    InputNumber,
    CommonSelect,
    Select,
    Option
  },
  data() {
    let that = this;
    return {
      tabName: 3,
      loading: false,
      showModal: false,
      modalLoading: false,
      formModalLoading: false,
      showFormModal: false,
      userDate: new Date(),
      user: {},
      formModal: {
        userId: "",
        creditS1: 0,
        text: ""
      },
      organId: "",
      params: {
        MaxResultCount: 10,
        SkipCount: 0,
        pageIndex: 1
      },
      userParams: {
        MaxResultCount: 10,
        SkipCount: 0,
        pageIndex: 1
      },
      searchParams: {
        organPath: "",
        year: new Date(),
        name: "",
        partyMemeberType: "",
        partyMemberAssessment: "",
        upToScratch: ""
      },
      total: 0,
      data: [],
      userData: [],
      userTotal: 0,
      columns: [
        {
          title: "排名",
          key: "rank",
          align: "center",
          width: 100
        },
        {
          title: "姓名",
          key: "name",
          align: "center",
          tooltip: true,
          width: 150
        },
        {
          title: "账号",
          key: "userName",
          align: "center",
          width: 200,
          tooltip: true,
          ellipsis: true
        },
        {
          title: "所在党组织",
          minWidth: 200,
          key: "organName",
          tooltip: true
        },
        {
          title: "是否达标",
          width: 100,
          align: "center",
          tooltip: true,
          render(h, { row }) {
            return h("span", row.upToScratch ? "是" : "否");
          }
        },
        {
          title: "必修课",
          width: 100,
          align: "center",
          tooltip: true,
          render(h, { row }) {
            return h("span", `${row.study}/${row.mustStudy}`);
          }
        },
        {
          title: "集中学习培训积分",
          width: 200,
          align: "center",
          tooltip: true,
          key: "studyCreditS1"
        },
        {
          title: "总积分",
          width: 100,
          align: "center",
          tooltip: true,
          key: "totalCreditS1"
        },
        {
          title: "操作",
          align: "right",
          fixed: "right",
          width: 200,
          className: "zdy-table-opration",
          render(h, { row }) {
            let arr = [];
            arr.push(
              h(
                "a",
                {
                  on: {
                    click() {
                      that.showModal = true;
                      that.user = row;
                    }
                  }
                },
                "查看"
              )
            );
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
      userColumns: [
        {
          title: "内容",
          key: "text",
          align: "center",
          tooltip: "true"
        },
        {
          title: "所属功能",
          key: "funcName",
          align: "center",
          width: 150
        },
        {
          title: "获得积分",
          key: "creditS1",
          align: "center",
          width: 150
        },
        {
          title: "获得时间",
          align: "center",
          width: 200,
          render(h, { row }) {
            return h(
              "span",
              that.FormatDate(row.dateLine, "yyyy-MM-dd hh:mm:ss")
            );
          }
        }
      ],
      rules: {
        creditS1: [
          {
            type: "number",
            required: true,
            message: "请填写扣除积分数",
            trigger: "blur"
          }
        ],
        text: [
          {
            required: true,
            message: "请填写扣分内容",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    //判断当前登录用户是否是支部，如果是支部才能加载

    this.organId = this.session.organId;
    if (this.session.isBranch) {
      this.searchParams.organPath = this.session.organPath;
      this.loadData();
    }
  },
  watch: {
    tabName(n) {
      if (n != 3) {
        this.userParams = {
          MaxResultCount: 9,
          SkipCount: 0,
          pageIndex: 1
        };
        this.getUserDetail();
      }
    },
    "userParams.pageIndex"() {
      this.getUserDetail();
    },
    showFormModal(n) {
      if (!n) {
        this.$refs["form"].resetFields();
      }
    }
  },
  methods: {
    reset() {
      this.searchParams.name = "";
      this.searchParams.year = new Date();
      this.searchParams.partyMemeberType = "";
      this.searchParams.partyMemberAssessment = "";
      this.searchParams.upToScratch = "";
      this.loadData();
    },
    getUserDetail() {
      let params = JSON.parse(JSON.stringify(this.userParams));
      params.SkipCount = this.SkipCount(
        params.MaxResultCount,
        params.pageIndex
      );
      this.modalLoading = true;
      params.year = new Date(this.userDate).getFullYear();
      params.month = new Date(this.userDate).getMonth() + 1;
      params.day = new Date(this.userDate).getDate();
      params.userId = this.user.id;
      params.type = this.tabName;
      GetPartyMemberCreditDetailPagedList(params)
        .then(res => {
          this.userData = res.items;
          this.userTotal = res.totalCount;
        })
        .finally(() => {
          this.modalLoading = false;
        });
    },
    orgChange(n) {
      // 如果是支部

      this.params.pageIndex = 1;
      if (
        n.organType == "OrganType-631" ||
        n.organType == "OrganType-632" ||
        n.organType == "OrganType-931" ||
        n.organType == "OrganType-932"
      ) {
        this.searchParams.organPath = n.path;
        this.loadData();
      } else {
        this.searchParams.organPath = "";
        this.data = [];
      }
    },
    loadData() {
      // 判断当前查询组织是否是支部
      if (!this.searchParams.organPath) {
        this.$Message.error("请选择支部查看积分数据");
        return;
      }
      let params = JSON.parse(JSON.stringify(this.params));
      params.SkipCount = this.SkipCount(
        params.MaxResultCount,
        params.pageIndex
      );
      Object.assign(params, this.searchParams);
      this.loading = true;
      GetPartyMemberCreditRankStatistics(this.ClearParams(params))
        .then(res => {
          this.data = res.items;
          this.total = res.totalCount;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.formModal));
          params.userId = this.user.id;
          CreatePartyCreditLogOfMember(params).then(res => {
            this.$Message.success("提交成功");
            this.showFormModal = false;
            this.getUserDetail();
          });
        }
      });
    }
  }
};
</script>

<style lang='less'>
.information-score-member {
  margin-top: 20px;
}
.info-modal {
  .ivu-form-item {
    margin-bottom: 5px;
  }
}
</style>
