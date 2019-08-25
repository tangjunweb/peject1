<template>
  <div>
    <Row class="text-right">
      <Form ref="form" inline>
        <FormItem v-if="auth('/information/organization/create')">
          <Button @click="createOrgan" v-if="tabName === '1'" type="primary" ghost>新建党组织</Button>
        </FormItem>
        <FormItem v-if="auth('/information/organization/createunit')">
          <Button @click="createUnit" v-if="tabName === '2'" type="primary" ghost>新建单位</Button>
        </FormItem>
        <FormItem
          v-if="tabName === '1' && auth('/information/organization/organaudited') && !isBranch"
        >
          <Button type="primary" @click="$router.push('organaudited')" ghost>待审核党组织</Button>
        </FormItem>
        <FormItem
          v-if="tabName === '2' && auth('/information/organization/unitaudited') && !isBranch"
        >
          <Button type="primary" @click="$router.push('unitaudited')" ghost>待审核单位</Button>
        </FormItem>
      </Form>
    </Row>
    <Card class="border" :dis-hover="true">
      <Tabs v-model="tabName">
        <TabPane v-if="auth('/information/organization/manager')" label="党组织信息维护" name="1"></TabPane>
        <TabPane v-if="auth('/information/unit/manager')" label="单位信息维护" name="2"></TabPane>
      </Tabs>
      <Row>
        <Col :span="24">
          <Form ref="form" inline>
            <FormItem label="组织名称" :label-width="100" v-if="tabName==='1'">
              <Input v-model="searchParams.OrganizationName" type="text" placeholder="输入组织名称搜索"></Input>
            </FormItem>
            <FormItem label="组织类别" :label-width="100" v-if="tabName==='1'">
              <common-select
                size="default"
                v-model="searchParams.OrganizationType"
                keys="OrganType"
              ></common-select>
            </FormItem>
            <FormItem label="单位名称" :label-width="100" v-if="tabName==='2'">
              <Input v-model="searchParams2.UnitName" type="text" placeholder="输入单位名称搜索"></Input>
            </FormItem>
            <FormItem label="单位性质类别类别" :label-width="140" v-if="tabName==='2'">
              <common-select
                size="default"
                v-model="searchParams2.UnitNatrueType"
                keys="UnitNatrueType"
              ></common-select>
            </FormItem>
            <FormItem>
              <Button style="padding: 4px 25px" @click="loadData" type="primary">搜索</Button>
            </FormItem>
            <FormItem>
              <Button style="padding: 4px 25px" @click="reset" type="primary">重置</Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
      <Row :gutter="15">
        <Col :span="7">
          <organization-tree @on-select="OrganSelect" theme="blue"></organization-tree>
        </Col>
        <Col :span="17">
          <Table :loading="loading" border :columns="columns" :data="data"></Table>
          <div class="text-right" style="padding:30px 0 0 0">
            <Page
              :current.sync="params.pageIndex"
              :total="total"
              :page-size="params.MaxResultCount"
            />
          </div>
        </Col>
      </Row>
    </Card>
  </div>
</template>
<script>
import { Form, FormItem, Input, Page, Tabs, TabPane, Table, Card } from "iview";
import OrganizationTree from "@/components/OrganizationTree";
import { SkipCount, ClearParams, Auth } from "@/mixins";
import {
  GetOrgnizationlistByFilterAsync,
  UnitPageList,
  DeletePartyOrganizationAsync,
  DeleteUnitAsync
} from "@/api/partyOrganizationService";
import CommonSelect from "@/components/CommonSelect";
export default {
  mixins: [SkipCount, ClearParams, Auth],
  components: {
    Card,
    Form,
    FormItem,
    Input,
    Page,
    Tabs,
    TabPane,
    OrganizationTree,
    Table,
    CommonSelect
  },
  data() {
    let that = this;
    return {
      tabName: "1",
      loading: false,
      columns: [],
      data: [],
      searchParams: {
        OrganizationName: "",
        OrganizationType: ""
      },
      searchParams2: {
        UnitName: "",
        UnitNatrueType: ""
      },
      total: 0,
      params: {},
      selectOrganization: null
    };
  },
  watch: {
    tabName() {
      this.selectData = [];
      this.init();
    }
  },
  computed: {
    isBranch() {
      return this.$store.state.session.isBranch;
    }
  },
  methods: {
    OrganSelect(node) {
      this.selectOrganization = node;
      this.loadData();
    },
    createOrgan() {
      this.$router.push({
        path: "create",
        query: {
          type: this.$route.query.type || "all"
        }
      });
    },
    createUnit() {
      this.$router.push({
        path: "createunit",
        query: {
          type: this.$route.query.type || "all"
        }
      });
    },
    loadData() {
      let params = JSON.parse(JSON.stringify(this.params));
      params.SkipCount = this.SkipCount(
        params.MaxResultCount,
        params.pageIndex
      );
      if (this.tabName === "2") {
        Object.assign(params, this.searchParams2);
        this.loading = true;
        if (this.selectOrganization) {
          params.OrganId = this.selectOrganization.id;
        }
        UnitPageList(this.ClearParams(params))
          .then(res => {
            this.data = res.items;
            this.total = res.totalCount;
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        Object.assign(params, this.searchParams);
        if (this.selectOrganization) {
          params.OrganPath = this.selectOrganization.organPath;
        }
        this.loading = true;
        GetOrgnizationlistByFilterAsync(this.ClearParams(params))
          .then(res => {
            this.data = res.items;
            this.total = res.totalCount;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    reset() {
      this.searchParams.OrganizationName = "";
      this.searchParams.OrganizationType = "";
      this.searchParams2.UnitNatrueType = "";
      this.searchParams2.UnitName = "";
    },
    init() {
      let that = this;
      let columns = [
        {
          title: "组织名称",
          key: "organName",
          tooltip: true
          // width: 200
        },
        {
          title: "组织类别",
          tooltip: true,
          // width: 150,
          render(h, { row }) {
            return h(
              "span",
              that.GetCodeTableValue(row.organType, "OrganType")
            );
          }
        },
        // {
        //   title: "党组织代码",
        //   key: "organCode",
        //   // width: 150,
        //   tooltip: true
        // },
        {
          title: "党组织书记",
          key: "secretary",
          // width: 150,
          tooltip: true
        }
        // {
        //   title: "信息完整度",
        //   tooltip: true,
        //   key: "integrity"
        //   // width: 100,
        // }
      ];
      switch (this.tabName) {
        case "1":
          columns.push({
            title: "操作",
            align: "right",
            width: 200,
            className: "zdy-table-opration",
            fixed: "right",
            render(h, { row }) {
              let arr = [];
              if (that.auth("/information/organization/update")) {
                arr.push(
                  h(
                    "a",
                    {
                      on: {
                        click() {
                          that.$router.push({
                            path: "update",
                            query: {
                              type: that.$route.query.type || "all",
                              id: row.id
                            }
                          });
                        }
                      }
                    },
                    "编辑"
                  )
                );
              }
              if (that.auth("/information/organization/organinfo")) {
                arr.push(
                  h(
                    "a",
                    {
                      on: {
                        click() {
                          that.$router.push({
                            path: "organinfo",
                            query: {
                              type: that.$route.query.type || "all",
                              id: row.id
                            }
                          });
                        }
                      }
                    },
                    "查看"
                  )
                );
              }
              if (that.auth("/information/organization/delete")) {
                arr.push(
                  h(
                    "a",
                    {
                      on: {
                        click() {
                          that.$Modal.confirm({
                            title: "系统提示",
                            content: "确认删除党组织？",
                            onOk: () => {
                              DeletePartyOrganizationAsync({
                                id: row.id
                              }).then(res => {
                                that.loadData();
                                that.$Message.success("删除成功");
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
              return h("span", arr);
            }
          });
          this.columns = columns;
          this.data = [];
          this.params = {
            MaxResultCount: 9,
            SkipCount: 0,
            pageIndex: 1,
            AuditStatus: 1
          };
          this.searchParams = {
            OrganizationName: "",
            OrganizationType: ""
          };
          break;
        case "2":
          this.columns = [
            {
              title: "单位名称",
              key: "unitName",
              tooltip: true
            },
            {
              title: "单位类别",
              key: "unitNatrueType",
              tooltip: true,
              render(h, { row }) {
                return h(
                  "span",
                  that.GetCodeTableValue(row.unitNatrueType, "UnitNatrueType")
                );
              }
            },
            {
              title: "单位建立党组织情况",
              tooltip: true,
              render(h, { row }) {
                return h(
                  "span",
                  that.GetCodeTableValue(
                    row.establishmentOfOrg,
                    "EstablishmentOfOrg"
                  )
                );
              }
            },
            {
              title: "法人单位标识",
              tooltip: true,
              render(h, { row }) {
                return h("span", row.legalEntityFlag ? "是" : "否");
              }
            },
            {
              title: "操作",
              align: "right",
              className: "zdy-table-opration",
              render(h, { row }) {
                let arrs = [];
                if (that.auth("/information/organization/editunit")) {
                  arrs.push(
                    h(
                      "a",
                      {
                        on: {
                          click() {
                            that.$router.push({
                              path: "editunit",
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
                }
                if (that.auth("/information/organization/deleteunit")) {
                  arrs.push(
                    h(
                      "a",
                      {
                        style: {
                          marginLeft: "5px"
                        },
                        on: {
                          click() {
                            that.$Modal.confirm({
                              title: "系统提示",
                              content: `确认删除单位"${row.unitName}"？`,
                              onOk: () => {
                                DeleteUnitAsync({
                                  id: row.id
                                }).then(res => {
                                  that.loadData();
                                  that.$Message.success("删除成功");
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
                return h("span", arrs);
              }
            }
          ];
          this.data = [];
          this.params = {
            MaxResultCount: 9,
            SkipCount: 0,
            pageIndex: 1
          };
          this.searchParams = {
            OrganizationName: "",
            OrganizationType: ""
          };
          break;
      }
      this.loadData();
    }
  },
  mounted() {
    let tn = this.$route.query.tabName;
    if (tn) {
      this.tabName = tn + "";
    }
    this.init();
  }
};
</script>
<style lang="less">
</style>
