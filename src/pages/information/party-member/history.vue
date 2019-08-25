<!-- 组织关系转接历史记录 -->
<template>
  <div class="party-member-history">
    <Form :label-width="82" inline>
      <Row :gutter="15">
        <Col :span="16">
          <FormItem label="党员姓名">
            <Input v-model="searchParams.Name" placeholder="请输入党员姓名"></Input>
          </FormItem>
          <FormItem :label-width="0">
            <Button @click="loadData" type="primary" ghost>搜索</Button>
          </FormItem>
          <FormItem :label-width="0">
            <Button @click="reset" type="primary" ghost>重置</Button>
          </FormItem>
        </Col>
        <Col :span="8" class="text-right">
          <!-- <Button type="primary">导出</Button> -->
        </Col>
      </Row>
    </Form>
    <div>
      <Table :loading="loading" stripe border :columns="columns" :data="data"></Table>
      <div class="text-right" style="padding:30px 30px 0 0">
        <Page
          :current.sync="params.pageIndex"
          :total="total"
          :page-size="params.MaxResultCount"
          class-name="lhyj-page"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { Table, Page } from "iview";
import { SkipCount, ClearParams } from "@/mixins";
import { OrganizationChangeServiceHistoryPageList } from "@/api/service";
export default {
  mixins: [SkipCount, ClearParams],
  components: {
    Table,
    Page
    // LPanel
  },
  data() {
    let that = this;
    return {
      loading: false,
      organId: "",
      organName: "",
      columns: [
        {
          title: "姓名",
          tooltip: true,
          key: "name"
        },
        {
          title: "目标党组织",
          tooltip: true,
          key: "toOrganName"
        },
        {
          title: "转接申请日期",
          tooltip: true,
          render(h, { row }) {
            return h("span", that.FormatDate(row.applyTime, "yyyy-MM-dd"));
          }
        },
        {
          title: "转接原因",
          tooltip: true,
          key: "reason"
        },
        {
          title: "状态",
          tooltip: true,
          render(h, { row }) {
            return h(
              "span",
              that.GetCodeTableValue(row.status, "EnumChangeStatus")
            );
          }
        },
        {
          title: "操作",
          tooltip: true,
          align: "right",
          render(h, { row }) {
            let arr = [
              h(
                "a",
                {
                  // class: 'zdy-table-link info',
                  on: {
                    click() {
                      that.$router.push({
                        path: "info",
                        query: {
                          id: row.id
                        }
                      });
                    }
                  }
                },
                "查看详情"
              )
            ];
            return h("span", arr);
          }
        }
      ],
      total: 0,
      searchParams: {
        Name: ""
      },
      params: {
        MaxResultCount: 9,
        SkipCount: 0,
        pageIndex: 1
      },
      data: []
    };
  },
  methods: {
    loadData() {
      let params = JSON.parse(JSON.stringify(this.params));
      params.SkipCount = this.SkipCount(
        params.MaxResultCount,
        params.pageIndex
      );
      Object.assign(params, this.searchParams);
      this.loading = true;
      OrganizationChangeServiceHistoryPageList(this.ClearParams(params))
        .then(res => {
          this.total = res.totalCount;
          this.data = res.items;
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
    this.loadData();
  }
};
</script>
<style lang="less">
</style>