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
          <Form :model="searchParams" inline>
            <FormItem label="开展月份" :label-width="100">
              <DatePicker
                @on-change="mchange"
                format="MM"
                v-model="searchParams.StartMonth"
                placeholder="选择月份"
                type="date"
              ></DatePicker>
            </FormItem>
            <FormItem label="会议类型" :label-width="100">
              <Select
                @on-change="change"
                v-model="searchParams.LifeType"
                clearable
                style="width:200px"
                placeholder="请选择会议类型"
              >
                <Option
                  v-for="item in selectList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="主题" :label-width="70">
              <Input style="width:180px" v-model="searchParams.Name" ghost placeholder="请输入关键词"></Input>
            </FormItem>
            <Button style="margin-left:18px" @click="search" class="searchbtn" type="primary">查询</Button>
            <Button style="margin-left:18px" @click="reset" class="resetbtn" ghost type="primary">重置</Button>
            <Button @click="gotoUpload" class="add" type="primary">
              <span>上传组织生活</span>
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
              <a @click="signup(row)">报名</a>
              <a v-if="row.lifeState=='已发布'&&istrue" @click="start(row)">开始</a>
              <a v-if="row.lifeState=='已发布'&&istrue" @click="cancel(row)">取消</a>
              <a class="large-btn" @click="upload(row)">上传活动纪实</a>
              <span class="del-btn" @click="del(row)">删除</span>
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
import { Table, Card, Page, DatePicker, Select ,Option} from "iview";
import {
  GetOrganLifePagedList,
  DeleteOrganLife,
  StartOrganLife,
  CancelOrganLife
} from "@/api/orgazationNew";
import { SkipCount, ClearParams } from "@/mixins";
import { getNowFormatDate } from "@/utils/util";
export default {
  mixins: [SkipCount, ClearParams],
  components: {
    Table,
    Card,
    Page,
    DatePicker,
    Select,
    Option
  },
  data() {
    let that = this;
    return {
      loading: false,
      searchParams: {
        StartMonth: "",
        LifeType: "",
        Name: ""
        // Sorting: '',
      },
      istrue: true,
      params: {
        MaxResultCount: 8, //每页条数
        SkipCount: 0, //页数
        pageIndex: 1
      },
      total: 1,
      columns: [
        {
          title: "主题",
          key: "title",
          tooltip: true
        },
        {
          title: "会议类型",
          key: "lifeType"
        },
        {
          title: "开展组织",
          key: "organName",
          tooltip: true
        },
        {
          title: "开展时间",
          // key: "startDate",
          render(h, { row }) {
            return h("span", getNowFormatDate(row.startDate));
          }
        },
        {
          title: "状态",
          key: "lifeState"
        },
        {
          title: "操作",
          tooltip: true,
          align: "center",
          width: "500px",
          slot: "opration"
        }
      ],
      nav: [
        {
          color: "#43B9EA",
          name: "已报名",
          count: 15
        },
        {
          color: "#47B87A",
          name: "审核未通过 ",
          count: 15
        },
        {
          color: "#C82721",
          name: "审核通过未开始",
          count: 15
        },
        {
          color: "#A7ADAF",
          name: "结束待审核",
          count: 15
        }
      ],
      data: [],
      selectList: []
    };
  },
  created() {
    // if (this.searchParams.StartMonth) {
    //   this.searchParams.StartMonth = this.searchParams.StartMonth.getMonth() + 1
    // }
  },
  mounted() {
    this.selectList = this.$store.state.baseCode.LifeTypeEnum;
    console.log(this.selectList);
    this.loadData();
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
      GetOrganLifePagedList(this.ClearParams(params))
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
    },
    mchange(StartMonth) {
      this.searchParams.StartMonth = StartMonth;
    },
    change(LifeType) {
      this.searchParams.LifeType = LifeType;
    },
    //查询
    search() {
      this.params.SkipCount = 0;
      this.params.pageIndex = 1;
      this.loadData();
    },
    reset() {
      this.searchParams.StartMonth = "";
      this.searchParams.LifeType = "";
      this.searchParams.Name = "";
      this.params.pageIndex = 1;
      this.loadData();
    },
    detail(row) {
      console.log(row);
      this.$router.push({
        name: "组织生活详情",
        query: { obj: row.id, flag: 1 } //创建者和参与者
      });
    },
    //新增--1   编辑--2
    gotoUpload() {
      this.$router.push({
        name: "上传组织生活计划",
        query: { flag: 1 }
      });
    },
    edit(row) {
      this.$router.push({
        name: "上传组织生活计划",
        query: { obj: row.id, flag: 2 }
      });
    },
    upload(row) {
      this.$router.push({
        name: "上传活动纪实",
        query: { obj: row.id }
      });
    },
    signup(row) {
      if (row.isNeedPeopleInfo) {
        this.$router.push({
          name: "选择报名",
          query: { obj: row.id }
        });
      } else {
        this.$router.push({
          name: "填写报名",
          query: { obj: row.id }
        });
      }
    },
    del(row) {
      this.$Modal.confirm({
        title: "系统提示",
        content: `确认删除主题"${row.title}"？`,
        onOk: () => {
          DeleteOrganLife({
            input: row.id
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
    },
    start(row) {
      StartOrganLife({ input: row.id })
        .then(res => {
          this.$Message.success("组织生活已开始！");
          this.istrue = false;
          // if (res.Success) {
          //   this.$Message.success("发布成功！");
          //   this.loadData();
          // } else {
          //   this.$Message.error(res.data.Error);
          // }
        })
        .catch(err => {
          this.$Message.error(err);
        });
    },
    cancel(row) {
      CancelOrganLife({ input: row.id })
        .then(res => {
          this.$Message.success("组织生活已取消！");
          this.istrue = false;
          // if (res.Success) {
          //   this.$Message.success("发布成功！");
          //   this.loadData();
          // } else {
          //   this.$Message.error(res.data.Error);
          // }
        })
        .catch(err => {
          this.$Message.error(err);
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
      top: 4px;
      width: 15px;
      height: 16px;
      background: url("~@/assets/images/upload-dang.png") left top no-repeat;
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