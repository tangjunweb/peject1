<template>
  <div class="dev-work">
    <Card :dis-hover="true" :bordered="false">
      <p slot="title">汇总</p>
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
        <FormItem label="时间：">
          <Select placeholder="按季度" v-model="formItem.quarter">
            <Option label="第一季度" :value="1"></Option>
            <Option label="第二季度" :value="2"></Option>
            <Option label="第三季度" :value="3"></Option>
            <Option label="第四季度" :value="4"></Option>
          </Select>
        </FormItem>
        <Button @click="loadData" class="search" type="primary">查询</Button>
        <Button @click="reset" class="reset" ghost type="primary">重置</Button>
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
        select: "",
        quarter: '第一季度'
      },
      selectList: []
    };
  },
  watch: {},
  mounted() {
    this.loadData();
  },
  computed: {},
  methods: {
    loadData() {},
    reset() {}
  }
};
</script>
<style lang="less" scoped>
.dev-work {
}

.search {
  width: 110px;
  height: 32px;
  background: rgba(200, 39, 33, 1);
  border-radius: 3px;
  margin-right: 14px;
  margin-left: 31px;
}
.reset {
  width: 110px;
  height: 32px;
  border: 1px solid rgba(200, 39, 33, 1);
  border-radius: 3px;
}

</style>


