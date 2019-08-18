<template>
  <div class="organization-life">
    <div>
      <div class="ivu-card organization-body">
        <div class="organization-body-head"></div>
        <div class="organization-body-main">
          <span>预警信息</span>
          <p>本月固定党日还未开展，请及时开展</p>
        </div>
      </div>
    </div>
    <Form inline :model="formItem" :label-width="80">
      <FormItem label="党组织:">
        <Select v-model="formItem.select" clearable style="width:200px">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="类型：">
        <Select v-model="formItem.select" clearable style="width:200px">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button @click="loadData" ghost type="primary">搜索</Button>
      </FormItem>
      <FormItem>
        <Button @click="reset" ghost type="primary">重置</Button>
      </FormItem>
    </Form>

    <Card class="border" :dis-hover="true">
      <Table :show-header="false" :loading="loading" stripe :columns="columns" :data="data"></Table>
      <div style="padding:30px 0 0 0" class="text-right">
        <Page
          :current.sync="params.pageIndex"
          :total="total"
          :page-size="params.MaxResultCount"
          class-name="lhyj-page"
          ghost
        />
      </div>
    </Card>
  </div>
</template>
<script>
import { Form, FormItem, Card, Select, Option, Spin ,Table,Page} from "iview";

export default {
  components: {
   Form, FormItem, Card, Select, Option, Spin,Table,Page
  },
  data() {
    return {
      organId: this.$store.state.session.organId,
      loading: false,
      params: {
        organId: this.$store.state.session.organId
      },
      data: {},
      formItem: {
        select: ""
      }
    };
  },
  watch: {},
  mounted() {
    //  this.loadData();
  },
  computed: {},
  methods: {
    loadData() {}
  }
};
</script>
<style lang="less" scoped>
.organization-life .ivu-tabs-nav {
  padding-bottom: 10px !important;
}
@variable: .organization-body;
@{variable} {
  background: #fff;
  display: flex;
  height: 97px;
  box-sizing: border-box;
  align-items: center;
  margin-bottom: 30px;
  &-head {
    margin-right: 18px;
    width: 107px;
    height: 97px;
    background: rgba(255, 229, 231, 1);
    border-radius: 6px 0px 0px 6px;
  }
  &-main {
    span {
      height: 17px;
      font-size: 17px;
      font-weight: 500;
      color: rgba(184, 35, 43, 1);
    }
    p {
      height: 15px;
      font-size: 14px;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
    }
  }
}
.zuzhi-tongji {
  .ivu-card-head p {
    font-size: 20px;
    font-weight: bold;
    color: #1a1a1a;
  }
  .top {
    .top-title {
      position: relative;
      padding-left: 30px;
      font-size: 18px;
      font-weight: 500;
      color: rgba(26, 26, 26, 1);
      margin-bottom: 26px;
      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 2px;
        width: 16px;
        height: 18px;
        background: url("~@/assets/images/kaizhan.png") left top no-repeat;
        background-size: 16px 18px;
      }
    }
  }
  .next {
    p {
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .times {
      font-size: 54px;
      font-weight: 500;
      color: rgba(26, 26, 26, 1);
    }
    .col-span-con {
      display: flex;
      justify-content: space-between;
      span {
        display: inline-block;
      }
    }
    .ci-lv {
      font-size: 13px;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      padding: 16px 22px;
      border: 1px solid rgba(233, 233, 240, 1);
      border-radius: 2px;
    }
    .com-w {
      font-size: 14px;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      position: relative;
      padding-left: 21px;
      height: 53px;
      line-height: 53px;
      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 18px;
        width: 16px;
        height: 15px;
        background: url("~@/assets/images/yes.png") left top no-repeat;
        background-size: 16px 15px;
      }
    }
    .card-bttom {
      width: 100%;
      height: 17px;
      background: rgba(219, 57, 32, 1);
      border-radius: 0px 0px 6px 6px;
    }
  }
}
</style>


