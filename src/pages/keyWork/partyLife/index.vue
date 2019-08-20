<template>
  <div class="dev-work">
    <Row :gutter="15" style="margin-bottom:20px;" type="flex">
      <Col style="width:100%">
        <top-card class="orginalupload-topcard" :bordered="false">
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

    <Card :dis-hover="true" :bordered="false">
      <Form style="position:relative;" inline :model="formItem" :label-width="80">
        <FormItem label="党组织:">
          <Select v-model="formItem.select" clearable style="width:200px" placeholder="请选择党组织">
            <Option
              v-for="item in selectList"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="类型：">
          <Select v-model="formItem.type" clearable style="width:200px">
            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <Button @click="loadData" class="search" type="primary">查询</Button>
        <Button @click="reset" class="reset" ghost type="primary">重置</Button>
        <Button @click="addPoeple" class="add" type="primary">
          <span>添加入党积极分子</span>
        </Button>
      </Form>
      <Table :show-header="false" :loading="loading" stripe :columns="columns" :data="data"></Table>
    </Card>
    <div style="padding:30px 0 0 0" class="text-right">
      <Page
        :current.sync="params.pageIndex"
        :total="total"
        :page-size="params.pageSize"
        class-name="lhyj-page"
        ghost
      />
    </div>
  </div>
</template>
<script>
import { Form, FormItem, Card, Select, Option, Spin, Table, Page } from "iview";

export default {
  components: {
    Form,
    FormItem,
    Card,
    Select,
    Option,
    Spin,
    Table,
    Page
  },
  data() {
    return {
      organId: this.$store.state.session.organId,
      loading: false,
      params: {
        organId: this.$store.state.session.organId,
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      data: [],
      formItem: {
        select: ""
      },
      selectList: [],
      typeList: [],
      nav: [
        {
          color: "#E74F49",
          name: "积极分子",
          count: 15
        },
        {
          color: "#F18F1C",
          name: "支委会研究确定发展对象",
          count: 15
        },
        {
          color: "#3AA4D2",
          name: "接收预备党员",
          count: 15
        },
        {
          color: "#50D166",
          name: "预备党员转正",
          count: 15
        }
      ]
    };
  },
  watch: {},
  mounted() {
    this.loadData();
  },
  computed: {},
  methods: {
    loadData() {},
    reset() {},
    addPoeple() {
      this.$router.push({ name: "加入党积极分子", path: "create" });
    }
  }
};
</script>
<style lang="less" scoped>
.dev-work {
}

.search {
  width: 110px;
  background: rgba(200, 39, 33, 1);
  border-radius: 3px;
  margin-right: 14px;
  margin-left: 31px;
}
.reset {
  width: 110px;
  border: 1px solid rgba(200, 39, 33, 1);
  border-radius: 3px;
}
.add {
  width: 180px;
  background: rgba(200, 39, 33, 1);
  border-radius: 3px;
  position: absolute;
  right: 0;
  span {
    position: relative;
    padding-left: 20px;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 4px;
      width: 16px;
      height: 16px;
      background: url("~@/assets/images/add-people.png") left top no-repeat;
      background-size: 16px 16px;
    }
  }
}
</style>


