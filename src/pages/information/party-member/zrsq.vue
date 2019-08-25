<template>
  <div>
    <Form :label-width="60" inline>
      <Row :gutter="15">
        <Col :span="16">
          <FormItem label="党员姓名" :label-width="82">
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
      <div class="text-right" style="padding:30px 0 0 0">
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
import {
  OrganizationChangeServicePageList,
  OrganizationChangeServiceAudit
} from "@/api/service";
export default {
  mixins: [SkipCount, ClearParams],
  components: {
    Table,
    Page
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
          key: "reseon"
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
          className: "zdy-table-opration",
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
                          id: row.userId,
                          ListType: 1
                        }
                      });
                    }
                  }
                },
                "查看详情"
              )
            ];
            if (row.status === 2) {
              arr.push(
                h(
                  "a",
                  {
                    // class: 'zdy-table-link success',
                    on: {
                      click() {
                        that.$Modal.confirm({
                          title: "党员转入审批",
                          content: `请确认已在全国党员管理信息系统内收到${
                            row.name
                          }同志的转入申请，并已完成党员报道`,
                          cancelText: "退回",
                          okText: "确认转入",
                          closable: true,
                          onOk: () => {
                            OrganizationChangeServiceAudit({
                              id: row.id,
                              pass: true
                            }).then(res => {
                              that.loadData();
                              that.$Message.success("操作成功");
                            });
                          },
                          onCancel: () => {
                            OrganizationChangeServiceAudit({
                              id: row.id,
                              pass: false
                            }).then(res => {
                              that.loadData();
                              that.$Message.success("操作成功");
                            });
                          }
                        });
                      }
                    }
                  },
                  "转入审批"
                )
              );
            }
            return h("span", arr);
          }
        }
      ],
      total: 0,
      searchParams: {
        Name: "",
        ListType: 1,
        SearchType: 2
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
      OrganizationChangeServicePageList(this.ClearParams(params))
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