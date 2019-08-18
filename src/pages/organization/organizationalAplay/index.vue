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
      <Col span="6">
        <Card class="border" :dis-hover="true" style="height:622px">
          <bas-scroll ref="bascroll" style="height:100%;width:100%">
            <p class="title">党组织：</p>
            <Tree :data="treeData"></Tree>
          </bas-scroll>
        </Card>
      </Col>
      <Col span="18" style="height:622px">
        <Card class="border" :dis-hover="true" style="height:100%">
          <Form inline>
            <FormItem label="开展月份" :label-width="70">
              <Input style="width:180px" v-model="searchParams.month" ghost placeholder="请选择"></Input>
            </FormItem>
            <FormItem label="会议类型" :label-width="70">
              <Select v-model="formItem.select" clearable style="width:200px" placeholder="请选择党组织">
                <Option
                  v-for="item in selectList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="主题" :label-width="70">
              <Input style="width:180px" v-model="searchParams.month" ghost placeholder="请选择"></Input>
            </FormItem>
            <Button style="margin-left:18px" type="primary">查询</Button>
            <Button style="margin-left:18px" type="primary">重置</Button>
            <Button style="float:right" type="primary">上传组织生活</Button>
          </Form>
          <Table :loading="loading" stripe :columns="columns" :data="data">
            <template slot-scope="{ row }" slot="opration">
              <a @click="moreInfo(row)">查看</a>
              <a @click="edit(row)">编辑</a>
              <a @click="del(row)">删除</a>
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
      />
    </div>
  </div>
</template>
<script>
import { Tree, Table, Card, Page } from "iview";
export default {
  components: {
    Tree,
    Table,
    Card,
    Page
  },
  data() {
    return {
      searchParams: {
        month: ""
      },
      selectList:[],
      total: 1,
      params: {
        MaxResultCount: 9,
        SkipCount: 0,
        pageIndex: 1
      },
      columns: [
        {
          title: "主题",
          key: "name"
        },
        {
          title: "会议类型",
          key: "age"
        },
        {
          title: "开展组织",
          key: "address"
        },
        {
          title: "开展时间",
          key: "address"
        },
        {
          title: "状态",
          key: "address"
        },
        {
          title: "操作",
          tooltip: true,
          align: "right",
          width: "250px",
          slot: "opration"
          //  className: "zdy-table-opration"
        }
      ],
      treeData: [
        {
          expand: true,
          title: "上一级党组织",
          children: [
            {
              title: "下一级党组织",
              expand: true
            },
            {
              title: "下一级党组织",
              expand: true
            }
          ]
        },
        {
          expand: true,
          title: "上一级党组织",
          children: [
            {
              title: "下一级党组织",
              expand: true
            },
            {
              title: "下一级党组织",
              expand: true
            }
          ]
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
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.bascroll.updateScroll();
    });
  }
};
</script>
<style lang="less" scoped>
@root: .orginalupload;
@{root} {
  &-topcard {
    strong {
      font-size: 20px;
      font-weight: 500;
      color: rgba(184, 35, 43, 1);
      margin-left: 15px;
    }
  }
}
</style>