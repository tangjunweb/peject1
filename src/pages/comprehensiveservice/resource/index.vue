<template>
  <div class="orginalupload">
    <Row :gutter="15" style="margin-bottom:20px;" type="flex">
      <Col style="width:100%">
        <top-card class="orginalupload-topcard">
          <Row>
            <Col span="6" v-for="(item, index) in nav" :key="index">
              <div>
                <span class="ivu-tag-dot-inner" :style="{background: item.color}"></span>
                <span class="ivu-tag-text">
                  {{item.name}}
                  <strong>{{item.count}}</strong>次
                </span>
              </div>
            </Col>
          </Row>
        </top-card>
      </Col>
    </Row>
    <Row :gutter="15" type="flex">
      <Col span="24" style="height:622px">
        <Card class="border" :bordered="false" style="height:100%">
          <Form ref="formValidate" :model="formValidate" inline>
            <FormItem label="当前范围:" :label-width="100">
              <!-- <Select v-model="">
                <Option
                  v-for="item in meetMapDown"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select> -->
            </FormItem>
            <FormItem>
              <Button
                @click="search"
                style="margin-left:18px"
                class="searchbtn"
                type="primary"
              >查询</Button>
              <Button
                @click="reset"
                style="margin-left:18px"
                class="resetbtn"
                ghost
                type="primary"
              >重置</Button>
            </FormItem>
            <Button @click="gotoUpload" class="add" type="primary">
              <span>上传资源清单</span>
            </Button>
          </Form>
          <Table
            class="oprationtable-btn"
            :loading="loading"
            stripe
            :columns="columns"
            :data="data"
          >
            <template slot-scope="{ row, index }" slot="opration">
              <a @click="detail(row)">查看</a>
              <a @click="edit(row)">编辑</a>
              <span class="del-btn" @click="del(row,index)">删除</span>
            </template>
          </Table>
        </Card>
      </Col>
    </Row>
    <div style="padding:30px 0 0 0" class="text-right">
      <Page
        :current.sync="params.pageIndex"
        :total="total"
        :page-size="params.MaxResultCount"
        class-name="lhyj-page"
        ghost
        show-elevator
      />
    </div>
  </div>
</template>
<script>
import { Tree, Table, Card, Page, Select, Form, FormItem } from "iview";
import { PageZhResourceInventoryAsync,DeleteZhResourceInventoryAsync } from "@/api/Comprehensive";
import { SkipCount, ClearParams } from "@/mixins";
import { getNowFormatDate } from "@/utils/util";
export default {
  mixins: [SkipCount, ClearParams],
  components: {
    Table,
    Card,
    Page,
    Select,
    Form,
    FormItem
  },
  data() {
    return {
      loading: false,
      searchParams: {
        OrganId: ""
      },
      params: {
        MaxResultCount: 8, //每页条数
        SkipCount: 0, //页数
        pageIndex: 1
      },
      total: 1,
      meetMapDown: [
        {
          label: "中共青海省西宁市城北区委"
        }
      ],
      columns: [
        {
          title: "组织",
          key: "officeOrganName",
          tooltip: true
        },
        {
          title: "联点村（社区）党组织",
          key: "villageOrganName",
          tooltip: true
        },
        {
          title: "提交时间",
          render(h, { row }) {
            return h("span", getNowFormatDate(row.startDate));
          }
        },
        {
          title: "资源类型",
          key: "invertoryType"
        },
        {
          title: "状态",
          key: "auditStatus"
        },
        {
          title: "操作",
          tooltip: true,
          align: "center",
          width: "300px",
          slot: "opration"
        }
      ],
      nav: [
        {
          color: "#43B9EA",
          name: "待审核",
          count: 15
        },
        {
          color: "#C82721",
          name: "已开展 ",
          count: 8
        }
      ],
      data: [
        {
          title: "John Brown",
          type: "18",
          zuzhi: "zuhu",
          time: 2018 - 3 - 3,
          zuangtai: "待审核"
        },
        {
          title: "John Brown",
          type: "18",
          zuzhi: "zuhu",
          time: 2018 - 3 - 3,
          zuangtai: "待审核"
        },
        {
          title: "John Brown",
          type: "18",
          zuzhi: "zuhu",
          time: 2018 - 3 - 3,
          zuangtai: "待审核"
        },
        {
          title: "John Brown",
          type: "18",
          zuzhi: "zuhu",
          time: 2018 - 3 - 3,
          zuangtai: "待审核"
        }
      ]
    };
  },
  mounted() {
   // this.loadData();
  },
  methods: {
    loadData() {
      this.loading = true;
      let params = JSON.parse(JSON.stringify(this.params));
      params.SkipCount = this.SkipCount(
        params.MaxResultCount,
        params.pageIndex
      );
      Object.assign(params, this.searchParams);
      PageZhResourceInventoryAsync(this.ClearParams(params))
        .then(res => {
          this.total = res.totalCount;
          this.data = res.items;
          this.loading = false;
          this.data.map((item, index) => {
            if (item.lifeState == 0) {
              item.lifeState = "未开始";
            } else if (item.lifeState == 1) {
              item.lifeState = "待审核";
            } else if (item.lifeState == 2) {
              item.lifeState = "通过";
            } else if (item.lifeState == 3) {
              item.lifeState = "未通过";
            } else if (item.lifeState == 4) {
              item.lifeState = "区委通过";
            } else if (item.lifeState == 5) {
              item.lifeState = "区委未通过";
            } else if (item.lifeState == 6) {
              item.lifeState = "已发布";
            } else if (item.lifeState == 7) {
              item.lifeState = "已开始";
            } else if (item.lifeState == 8) {
              item.lifeState = "已取消";
            } else if (item.lifeState == 9) {
              item.lifeState = "已结束";
            }

            if (item.lifeType == 1) {
              item.lifeType = "党员大会";
            } else {
              item.lifeType = "党课";
            }
          });
        })
        .finally(() => {
          this.loading = false;
        });
    }, //查询
    search() {
      this.params.SkipCount = 0;
      this.params.pageIndex = 1;
      this.loadData();
    },
    reset() {
      this.searchParams.OrganId = "";
      this.params.pageIndex = 1;
      this.loadData();
    },

    detail(row) {
      this.$router.push({
        name: "资源详情",
        query: { obj: row.id }
      });
    },
    //新增--1   编辑--2
    gotoUpload() {
      this.$router.push({
        name: "上传资源清单"
      });
    },
    edit(row) {
      this.$router.push({
        name: "上传资源清单",
        query: { obj: row.id }
      });
    },
    del(row) {
      this.$Modal.confirm({
        title: "系统提示",
        content: `确认删除清单"${row.title}"？`,
        onOk: () => {
          DeleteZhResourceInventoryAsync({
            ids: row.id
          })
            .then(res => {
              this.loadData();
              this.$Message.success("删除成功");
            })
            .catch(err => {
              this.$Message.error(err);
            });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@root: orginalupload;
.@{root} {
  &-topcard {
    strong {
      font-size: 20px;
      font-weight: 500;
      color: rgba(184, 35, 43, 1);
      margin-left: 15px;
    }
  }
}

.add {
  width: 139px;
  background: rgba(200, 39, 33, 1);
  border-radius: 3px;
  position: absolute;
  right: 16px;
  span {
    position: relative;
    padding-left: 20px;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 3px;
      width: 15px;
      height: 16px;
      background: url("~@/assets/images/xuqiu.png") left top no-repeat;
      background-size: 15px 16px;
    }
  }
}

.searchbtn {
  width: 80px;
  background: rgba(200, 39, 33, 1);
  border-radius: 3px;
}

.resetbtn {
  width: 80px;
  border: 1px solid rgba(200, 39, 33, 1);
  border-radius: 3px;
}
</style>