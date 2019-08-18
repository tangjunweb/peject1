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
    <Card class="zuzhi-tongji" :bordered="false">
      <p slot="title">组织生活统计</p>
      <div class>
        <div class="top">
          <p class="top-title">本月待开展组织生活</p>
        </div>
        <div class="next">
          <Row :span="24" :gutter="16">
            <Col span="6">
              <Card :dis-hover="true">
                <div>
                  <p>固定党日</p>
                  <span class="times">3</span>
                  <div class="col-span-con">
                    <span class="ci-lv">一般每月 / 1次</span>
                    <span class="com-w">
                      已开展
                      <span>1</span>
                      <span>期</span>
                    </span>
                  </div>
                </div>
              </Card>
              <div class="card-bttom"></div>
            </Col>
            <Col span="6">
              <Card :dis-hover="true">
                <div>
                  <p>党支部委员会</p>
                  <span class="times">3</span>
                  <div class="col-span-con">
                    <span class="ci-lv">一般每月 / 1次</span>
                    <span class="com-w">
                      已开展
                      <span>1</span>
                      <span>期</span>
                    </span>
                  </div>
                </div>
              </Card>
               <div class="card-bttom" style="background:#EC5015"></div>
            </Col>
            <Col span="6">
              <Card :dis-hover="true">
                <div>
                  <p>党支部党员大会</p>
                  <span class="times">3</span>
                  <div class="col-span-con">
                    <span class="ci-lv">一般每月 / 1次</span>
                    <span class="com-w">
                      已开展
                      <span>1</span>
                      <span>期</span>
                    </span>
                  </div>
                </div>
              </Card>
               <div class="card-bttom" style="background:#F96D01"></div>
            </Col>
            <Col span="6">
              <Card :dis-hover="true">
                <div>
                  <p>党课</p>
                  <span class="times">3</span>
                  <div class="col-span-con">
                    <span class="ci-lv">一般每月 / 1次</span>
                    <span class="com-w">
                      已开展
                      <span>1</span>
                      <span>期</span>
                    </span>
                  </div>
                </div>
              </Card>
               <div class="card-bttom" style="background:#FF9302"></div>
            </Col>
          </Row>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import {
  Card,
  Spin
} from "iview";

export default {
  components: {
    Card,
    Spin
  },
  data() {
    return {
      organId: this.$store.state.session.organId,
      loading: false,
      params: {
        organId: this.$store.state.session.organId
      },
      data: {}
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
      margin-bottom:26px;
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


