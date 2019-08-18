<template>
  <!-- 参会情况 -->
  <div>
    <Form inline :label-width="100">
      <FormItem label="签到情况:">
        <Input placeholder="请输入党员姓名"></Input>
      </FormItem>
      <FormItem label="发言情况:">
        <Input placeholder="请输入党员姓名"></Input>
      </FormItem>
      <FormItem :label-width="0">
        <Button @click="loadData" type="primary" ghost style="margin-right:15px">搜索</Button>
        <Button @click="reset" type="primary" ghost style="margin-right:15px">重置</Button>
        <Button @click="batchSign(null)" :disabled="selectData.length===0" type="primary" ghost>批量补签</Button>
      </FormItem>
    </Form>
    <Table
      @on-selection-change="selectChange"
      :loading="loading"
      stripe
      border
      :columns="columns"
      :data="data"
    ></Table>
    <div class="text-right" style="padding:30px 0 0 0">
      <Page
        :current.sync="params.pageIndex"
        :total="total"
        :page-size="params.MaxResultCount"
        class-name="lhyj-page"
      />
    </div>
  </div>
</template>
<script>
import {
  GetPagedMeetingUsers,
  PartyMeetingSupplementSign
} from "@/api/service";
import { SkipCount, ClearParams } from "@/mixins";
import { Table, Page, Form, FormItem, Input } from "iview";
export default {
  components: {
    Table,
    Page,
    Form,
    FormItem,
    Input
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
          title: "所属组织",
          tooltip: true,
          key: "organName"
        },
        {
          title: "签到情况",
          tooltip: true,
          render(h, { row }) {
            return h(
              "span",
              that.GetCodeTableValue(row.signStatus, "SignStatus")
            );
          }
        },
        {
          title: "发言情况",
          tooltip: true,
          render(h, { row }) {
            return h("span", row.isComment ? "已发言" : "未发言");
          }
        },
        {
          title: "操作",
          tooltip: true,
          className: "zdy-table-opration",
          align: "right",
          render(h, { row }) {
            if (!row.signInMark && that.meeting.meetingStatus !== 2) {
              return h(
                "a",
                {
                  on: {
                    click() {
                      let params = {
                        userIdList: [row.userId],
                        meetingId: that.meeting.id
                      };
                      that.batchSign(params);
                    }
                  }
                },
                "补签"
              );
            } else {
              return h("span", "--");
            }
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
      }
    };
  },
  methods: {
    selectChange(d) {
      this.selectData = d;
    },
    batchSign(signParams = null) {
      if (!signParams) {
        signParams = {
          userIdList: this.selectData.map(e => e.userId),
          meetingId: this.meeting.id
        };
      }
      this.$Modal.confirm({
        title: "系统提示",
        content: "确认补签？",
        onOk: () => {
          PartyMeetingSupplementSign(signParams).then(res => {
            this.$Message.success("补签成功");
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
      params.MeetingId = this.meeting.id;
      Object.assign(params, this.searchParams);
      this.loading = true;
      GetPagedMeetingUsers(this.ClearParams(params))
        .then(res => {
          this.total = res.totalCount;
          this.data = res.items;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    reset() {}
  },
  mounted() {
    this.loadData();
  }
};
</script>
<style lang="less">
</style>
