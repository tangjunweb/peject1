<template>
  <!-- 分配参会人员情况 -->
  <div class="organization-life-list">
    <Form inline>
      <FormItem label="党员姓名:" :label-width="100">
        <Input v-model="searchParams.Name" placeholder="请输入党员姓名"></Input>
      </FormItem>
      <FormItem>
        <Button @click="loadData" type="primary" ghost>搜索</Button>
      </FormItem>
      <FormItem>
        <Button @click="reset" type="primary" ghost>重置</Button>
      </FormItem>
      <FormItem>
        <PartyMemberSelect
          title="新增参会人员"
          :operation="operation"
          type="multiple"
          @change="memberChange"
        >
          <Button type="primary" ghost>新增人员</Button>
        </PartyMemberSelect>
      </FormItem>
      <FormItem>
        <Button :disabled="selectData.length===0" @click="batchDel" type="error" ghost>批量删除</Button>
      </FormItem>
    </Form>
    <Card class="border" :dis-hover="true">
      <Table
        @on-selection-change="selectChange"
        :loading="loading"
        stripe
        border
        :columns="columns"
        :data="data"
      ></Table>
      <div style="padding:30px 0 0 0" class="text-right">
        <Page
          :current.sync="params.pageIndex"
          :total="total"
          :page-size="params.MaxResultCount"
          class-name="lhyj-page"
        />
      </div>
    </Card>
    <PartyMemberOrganLifeRecord :partyMember="partyMember" v-model="showModal"></PartyMemberOrganLifeRecord>
  </div>
</template>
<script>
import {
  GetPagedMeetingUsers,
  DeletePartyMeetingUser,
  AddPartyMeetingUser
} from "@/api/service";
import { SkipCount, ClearParams } from "@/mixins";
import { Table, Page, Form, FormItem, Input, Card } from "iview";
import PartyMemberSelect from "@/pages/common/PartyMemberSelect";
import PartyMemberOrganLifeRecord from "@/pages/common/PartyMemberOrganLifeRecord";
export default {
  components: {
    Table,
    Page,
    Form,
    FormItem,
    Input,
    Card,
    PartyMemberSelect,
    PartyMemberOrganLifeRecord
  },
  mixins: [SkipCount, ClearParams],
  props: {
    meeting: Object
  },
  data() {
    let that = this;
    return {
      data: [],
      loading: false,
      selectData: [],
      showModal: false,
      partyMember: {},
      columns: [
        {
          type: "selection",
          width: 60
        },
        {
          title: "姓名",
          tooltip: true,
          key: "name"
        },
        {
          title: "身份证",
          tooltip: true,
          key: "idCard"
        },
        {
          title: "手机号",
          tooltip: true,
          key: "mobilePhone"
        },
        {
          title: "性别",
          tooltip: true,
          render(h, { row }) {
            return h("span", that.GetCodeTableValue(row.sex, "Sex"));
          }
        },
        {
          title: "民族",
          tooltip: true,
          render(h, { row }) {
            return h("span", that.GetCodeTableValue(row.nation, "Nation"));
          }
        },
        {
          title: "年龄",
          tooltip: true,
          render(h, { row }) {
            return h("span", that.GetCodeTableValue(row.sex, "Sex"));
          }
        },
        {
          title: "所在党支部",
          tooltip: true,
          key: "organName"
        },
        {
          title: "分配时间",
          tooltip: true,
          render(h, { row }) {
            return h("span", that.FormatDate(row.creationDate, "yyyy-MM-dd"));
          }
        }
      ],
      searchParams: {
        Name: ""
      },
      total: 0,
      params: {
        MaxResultCount: 9,
        SkipCount: 0,
        pageIndex: 1
      },
      operation: {
        align: "right",
        render(h, { row }) {
          return h(
            "span",
            {
              class: "zdy-table-link primary",
              on: {
                click() {
                  that.partyMember = row;
                  that.showModal = true;
                }
              }
            },
            "查看过往会议经历"
          );
        }
      }
    };
  },
  methods: {
    selectChange(d) {
      this.selectData = d;
    },
    memberChange(data) {
      AddPartyMeetingUser({
        meetingId: this.$route.query.id,
        userLists: data.map(e => {
          return {
            userId: e.id,
            name: e.name
          };
        })
      }).then(res => {
        this.loadData();
        this.$Message.success("添加成功");
      });
    },
    batchDel() {
      this.$Modal.confirm({
        title: "系统提示",
        content: "确认删除？",
        onOk: () => {
          DeletePartyMeetingUser({
            MeetingId: this.$route.query.id,
            UserIds: this.selectData.map(e => e.userId)
          }).then(res => {
            this.$Message.success("删除成功");
            this.loadData();
          });
        }
      });
    },
    loadData() {
      let params = JSON.parse(JSON.stringify(this.params));
      params.SkipCount = this.SkipCount(
        params.MaxResultCount,
        params.pageIndex
      );
      params.MeetingId = this.$route.query.id;
      Object.assign(params, this.searchParams);
      this.loading = true;
      GetPagedMeetingUsers(this.ClearParams(params))
        .then(res => {
          this.total = res.totalCount;
          this.data = res.items;
          this.selectData = []
        })
        .finally(() => {
          this.loading = false;
        });
    },
    reset() {
      this.searchParams.Name = "";
      this.loadData();
    }
  },
  mounted() {
    let id = this.$route.query.id;
    if (id) {
      this.loadData();
    } else {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less">
</style>


