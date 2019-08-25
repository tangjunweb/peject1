<template>
  <div class="roles">
    <TopCountTipsCard title="角色管理" :count="total" subTitle="角色总数"></TopCountTipsCard>
    <Row>
      <Col :span="12">
        <Form ref="form" inline>
          <FormItem>
            <Input v-model="searchParams.Name" type="text" placeholder="输入角色名称"></Input>
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
        <Button @click="$router.push('create')" type="primary" ghost>新建角色</Button>
      </Col>
    </Row>
    <Card class="border" :dis-hover="true">
      <Table :loading="loading" stripe :columns="columns" :data="data"></Table>
      <div class="text-right" style="padding:30px 0 0 0">
        <Page
          :current.sync="params.pageIndex"
          :total="total"
          :page-size="params.MaxResultCount"
          class-name="lhyj-page"
        />
      </div>
    </Card>
    <permiss-modal v-model="choicePermiss" :roleId="roleId"/>
  </div>
</template>
<script>
import TopCountTipsCard from "@/components/TopCountTipsCard";
import { Form, FormItem, Input, Page, Table, Card } from "iview";
import { GetPageRoleList, RoleDelete } from "@/api";
import { SkipCount, ClearParams, Auth } from "@/mixins";
import { FormatDate } from "@/utils/util";
import PermissModal from "./children/PermissModal";
export default {
  mixins: [SkipCount, ClearParams, Auth],
  components: {
    TopCountTipsCard,
    Form,
    FormItem,
    Input,
    Page,
    Table,
    PermissModal,
    Card
  },
  data() {
    let that = this;
    return {
      choicePermiss: false,
      roleId: "",
      loading: false,
      searchParams: {
        Name: ""
      },
      params: {
        MaxResultCount: 9,
        SkipCount: 0,
        pageIndex: 1
      },
      total: 0,
      columns: [
        {
          title: "角色名称",
          key: "name"
        },
        {
          title: "单位管理范围权限",
          render(h, { row }) {
            let arr = [];
            if (row.managedUnitNatrues) {
              row.managedUnitNatrues.split(",").forEach(e => {
                arr.push(that.GetCodeTableValue(e, "UnitNatrueType"));
              });
            }
            return h("span", arr.join(","));
          }
        },
        {
          title: "创建时间",
          render(h, { row }) {
            return h(
              "span",
              FormatDate(row.creationTime, "yyyy-MM-dd hh:mm:ss")
            );
          }
        },
        {
          title: "操作",
          align: "right",
          className: "zdy-table-opration",
          render(h, { row }) {
            let arr = [];
            arr.push(
                h(
                  "a",
                  {
                    // props: {
                    //     type: 'info',
                    //     ghost: true,
                    //     size: 'small'
                    // },
                    on: {
                      click() {
                        that.roleId = row.id;
                        that.choicePermiss = true;
                      }
                    }
                  },
                  "选择菜单"
                )
              );
            arr.push(
                h(
                  "a",
                  {
                    // props: {
                    //     type: 'info',
                    //     ghost: true,
                    //     size: 'small'
                    // },
                    on: {
                      click() {
                        that.$router.push({
                          path: "update",
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
                    // props: {
                    //     type: 'error',
                    //     ghost: true,
                    //     size: 'small'
                    // },
                    on: {
                      click() {
                        that.$Modal.confirm({
                          title: "系统提示",
                          content: `确认删除角色'${row.name}'?`,
                          onOk() {
                            RoleDelete({
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
            return h(
              "span",
              {
                class: "table-btn-group"
              },
              arr
            );
          }
        }
      ],
      data: []
    };
  },
  methods: {
    reset() {
      this.searchParams.Name = "";
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
      GetPageRoleList(this.ClearParams(params))
        .then(res => {
          this.data = res.items;
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
.layout-lr.roles {
  .ivu-form-item {
    margin-bottom: 0;
  }
  // padding: 30px;
  .layout-lr-lc {
    // padding-top: 70px;
    .layout-lr-lch {
      height: 70px;
      line-height: 80px;
    }
  }
  .layout-lr-lcb {
    // padding: 0 15px 30px 0;
    position: relative;
    box-sizing: border-box;
    .layout-lr-lcb-box {
      padding: 10px 0;
    }
  }
}
</style>
