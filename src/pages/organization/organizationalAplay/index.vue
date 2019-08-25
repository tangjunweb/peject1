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
      <Col span="4">
      <Card class="border" :dis-hover="true" style="height:622px">
        <bas-scroll ref="bascroll" style="height:100%;width:100%">
          <p class="title">党组织：</p>
           
          <OrganizationSelect v-model="searchParams.OrganId"></OrganizationSelect>
          <!-- <Tree :data="treeData"></Tree> -->
        </bas-scroll>
      </Card>
      </Col>
      <Col span="20" style="height:622px">
      <Card class="border" :dis-hover="true" style="height:100%">
        <Form :model="searchParams" inline>
          <FormItem label="开展月份" :label-width="100">
            <DatePicker @on-change="mchange" format="MM" v-model="searchParams.StartMonth" type="date" placeholder="请选择月份"></DatePicker>
          </FormItem>
          <FormItem label="会议类型" :label-width="70">
            <Select v-model="searchParams.LifeType" clearable style="width:200px" placeholder="请选择会议类型">
              <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="主题" :label-width="70">
            <Input style="width:180px" v-model="searchParams.tilte" ghost placeholder="请输入主题"></Input>
          </FormItem>
          <Button style="margin-left:18px" @click="search" class="searchbtn" type="primary">查询</Button>
          <Button style="margin-left:18px" @click="reset" class="resetbtn" ghost type="primary">重置</Button>
        </Form>
        <Table class="oprationtable-btn" :loading="loading" stripe :columns="columns" :data="data">
          <template slot-scope="{ row, index }" slot="opration">
            <div class="btnlist">
              <a @click="detail(row)">查看</a>
              <a @click="signup(row)">发布</a>
              <a class="large-btn" @click="upload(row)">活动纪实审核</a>
              <a @click="aplay(row)">审核</a>
            </div>

          </template>
        </Table>
      </Card>
      </Col>
    </Row>
    <div style="padding:30px 0 0 0" class="text-right">
      <Page :current.sync="params.pageIndex" :total="total" :page-size="params.MaxResultCount" class-name="lhyj-page" ghost show-elevator/>
    </div>
  </div>
</template>
<script>
import { Tree, Table, Card, Page, Select, DatePicker } from "iview";
import { SkipCount, ClearParams } from "@/mixins";
import { getNowFormatDate } from '@/utils/util'
import {
  GetOrganLifeAuditPagedList, PublishOrganLife
} from "@/api/orgazationNew";
import OrganizationSelect from "@/components/OrganizationSelect";
export default {
  mixins: [SkipCount, ClearParams],
  components: {
    Tree,
    Table,
    Card,
    Page, Select, DatePicker,OrganizationSelect
  },
  data() {
    return {
      searchParams: {
        OrganId: "",
        IsNotIncludeSubOrgan: true,
        StartMonth: '',
        LifeType: '',
        Name: ''
      },
      selectList: [],
      total: 1,
      params: {
        MaxResultCount: 8,
        SkipCount: 0,
        pageIndex: 1
      },
      columns: [
        {
          title: "主题",
          key: "title",
          tooltip:true
        },
        {
          title: "会议类型",
          key: "lifeType"
        },
        {
          title: "开展组织",
          key: "organName",
          tooltip:true
        },
        {
          title: "开展时间",
          render(h, { row }) {
            return h('span', getNowFormatDate(row.startDate))
          }
        },
        {
          title: "状态",
          key: "lifeState"
        },
        {
          title: '操作',
          align: 'center',
          width: '500px',
          slot: 'opration',
        }
      ],
      nav: [
        {
          color: "#43B9EA",
          name: "待审核",
          count: 15
        },
        {
          color: "#47B87A",
          name: "审核通过",
          count: 15
        },
        {
          color: "#C82721",
          name: "审核未通过",
          count: 15
        },
        {
          color: "#A7ADAF",
          name: "过期未审核",
          count: 15
        }
      ],
      data: [
        // {
        //   title:'sss',
        //   lifeType:'aaa',
        //   organName:'ssw',
        //   startDate:'2019-2-2',
        //   lifeState:"www"
        // }
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.bascroll.updateScroll();
    });
    this.selectList = this.$store.state.baseCode.LifeTypeEnum

    //  console.log(this.$store.state.baseCode.LifeStateEnum)
    //  console.log(this.$store.state.baseCode.LifeRecordStateEnum)

    this.loadData()

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
      GetOrganLifeAuditPagedList(this.ClearParams(params)).then(res => {
        if (res) {
          this.data = res.items
          this.total = res.totalCount
            this.loading = false;
        }
        this.data.map((item, index) => {
          if (item.lifeState == 0) {
            item.lifeState = "未开始"
          } else if (item.lifeState == 1) {
            item.lifeState = "待审核"
          } else if (item.lifeState == 2) {
            item.lifeState = "通过"
          } else if (item.lifeState == 3) {
            item.lifeState = "未通过"
          } else if (item.lifeState == 4) {
            item.lifeState = "区委通过"
          } else if (item.lifeState == 5) {
            item.lifeState = "区委未通过"
          } else if (item.lifeState == 6) {
            item.lifeState = "已发布"
          } else if (item.lifeState == 7) {
            item.lifeState = "已开始"
          } else if (item.lifeState == 8) {
            item.lifeState = "已取消"
          } else if (item.lifeState == 9) {
            item.lifeState = "已结束"
          }

          if (item.lifeType == 1) {
            item.lifeType = "党员大会"
          } else {
            item.lifeType = "党课"
          }
        })
      }).finally(() => {
        this.loading = false;
      });
    },
    mchange(StartMonth) {
      this.searchParams.StartMonth = StartMonth;
    },  //查询
    search() {
      this.params.SkipCount = 0;
      this.params.pageIndex = 1;
      this.loadData();
    },
    reset() {
      this.searchParams.StartMonth = "";
      this.searchParams.LifeType = "";
      this.searchParams.Name = "";
       this.searchParams.OrganId = "";
      this.params.pageIndex = 1;
      this.loadData();
    },
    detail(row) {
      this.$router.push({
        name: "组织生活详情",
        query: { obj: row.id, flag: 2 }//审核人
      });
    },
    aplay(row) {
      this.$router.push({
        name: "组织生活审核",
        query: { obj: row.id }
      });
    },
    signup(row) {
      PublishOrganLife({ input: row.id }).then(res => {
        this.$Message.success("组织生活已发布！");
      })
        .catch(err => {
          this.$Message.error(err);
        });
    },
    upload(row) {
      this.$router.push({
        name: "审核活动纪实",
        query: { obj: row.id }
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
}
</style>