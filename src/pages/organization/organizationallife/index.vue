<!-- 组织生活首页 -->
<template>
  <div class="organization-life">
    <Row :gutter="20">
      <Col :span="19">
        <Card class="border" :dis-hover="true">
          <Row :gutter="15">
            <Col :span="24">
              <Row type="flex" justify="space-between">
                <Col>
                  <Tabs :value="tabName" @on-click="tabSelect" v-show="organType==1">
                    <TabPane label="按月统计" name="mounth"></TabPane>
                    <TabPane label="按季度统计" name="quarte"></TabPane>
                  </Tabs>
                </Col>
                <Col>
                  <Form inline>
                    <FormItem v-if="organType==2">
                      <Button @click="$router.push('manager/create')" type="primary" ghost>开展组织生活</Button>
                    </FormItem>
                    <FormItem v-if="organType==2">
                      <Button @click="$router.push('manager/list')" type="primary" ghost>历史会议记录</Button>
                    </FormItem>
                    <FormItem>
                      <organization-cascader @change="changeOrg" v-model="params.organId"></organization-cascader>
                    </FormItem>
                    <FormItem v-if="(tabName=='mounth' && organType==1) || organType==2">
                      <DatePicker
                        format="yyyy"
                        v-model="params.year"
                        placeholder="选择年份"
                        type="year"
                      ></DatePicker>
                    </FormItem>
                    <FormItem v-if="(tabName=='mounth' && organType==1) || organType==2">
                      <DatePicker
                        format="MM"
                        v-model="params.month"
                        placeholder="选择月份"
                        type="month"
                      ></DatePicker>
                    </FormItem>
                    <FormItem v-if="tabName=='quarte' && organType==1">
                      <Select placeholder="请选择季度" v-model="params.quarter">
                        <Option label="第一季度" :value="1"></Option>
                        <Option label="第二季度" :value="2"></Option>
                        <Option label="第三季度" :value="3"></Option>
                        <Option label="第四季度" :value="4"></Option>
                      </Select>
                    </FormItem>
                  </Form>
                </Col>
              </Row>
              <Spin fix v-if="loading"></Spin>
              <div class="no-data" v-if="nodata">
                <img src="@/assets/images/no-data.png" alt />
              </div>
              <template v-else>
                <div v-if="organType==1" class="or-body" ref="chart"></div>
                <template v-if="organType==2">
                  <Card class="border" :dis-hover="true">
                    <Row>
                      <Col span="24" class="total-item">
                        <span>{{data.meetingMonthCount}}</span>
                        <label>本月待开展组织生活</label>
                      </Col>
                      <Col span="5" class="item">
                        <label>主题党日（一般每月/1次）</label>
                        <span>已开展{{data.gddrCount}}}期</span>
                      </Col>
                      <Col span="5" class="item">
                        <label>党支部委员会（一般每月 / 1次）</label>
                        <span>已开展{{data.dzbwyhCount}}期</span>
                      </Col>
                      <Col span="5" class="item">
                        <label>党小组会（一般每月 / 1次）</label>
                        <span>已开展{{data.dxzhCount}}期</span>
                      </Col>
                    </Row>
                  </Card>
                  <Card class="border" :dis-hover="true" style="margin-top:20px">
                    <Row>
                      <Col span="24" class="total-item">
                        <span>{{data.meetingQuarterCount}}</span>
                        <label>本季度待开展组织生活</label>
                      </Col>
                      <Col span="5" class="item">
                        <label>党员大会（一般每季度 / 1次）</label>
                        <span>已开展{{data.dydhCount}}期</span>
                      </Col>
                      <Col span="5" class="item">
                        <label>党课（一般每季度 / 1次）</label>
                        <span>已开展{{data.dkCount}}期</span>
                      </Col>
                    </Row>
                  </Card>
                </template>
              </template>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col :span="5">
        <LCardNav
          v-if="auth('/organization/organizationallife/plan/home')"
          title="组织生活计划制定"
          path="plan"
          style="margin-bottom:25px"
        >
          <img src="@/assets/zhdx-t.png" alt />
        </LCardNav>
        <LCardNav
          v-if="auth('/organization/organizationallife/manager/info')"
          title="组织生活管理"
          path="manager"
        >
          <img src="@/assets/zhdx-s.png" alt />
        </LCardNav>
      </Col>
    </Row>
  </div>
</template>
<script>
import echarts from "echarts";
import LCardNav from "@/components/ui/LCardNav";
import {
  GetPartyMeetingStatisticsMonth,
  GetPartyMeetingStatisticsQuarter,
  GetPartyMeetingStatisticsOne
} from "@/api";
import OrganizationCascader from "@/components/OrganizationCascader";
import {
  DatePicker,
  Form,
  FormItem,
  Card,
  Tabs,
  TabPane,
  Select,
  Option,
  Spin
} from "iview";
import { Auth } from "@/mixins";
export default {
  mixins: [Auth],
  components: {
    Card,
    OrganizationCascader,
    DatePicker,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Select,
    Option,
    LCardNav,
    Spin
  },
  data() {
    return {
      organId: this.$store.state.session.organId,
      tabName: "mounth",
      loading: false,
      org: {},
      params: {
        organId: this.$store.state.session.organId,
        year: new Date(),
        month: new Date(),
        quarter: 1
      },
      data: {},
      nodata: false
    };
  },
  watch: {
    params: {
      deep: true,
      handler(n) {
        this.loadData();
      }
    },
    tabName(n) {
      this.loadData();
    }
  },
  mounted() {
    this.loadData();
  },
  computed: {
    isBranch() {
      return this.$store.state.session.isBranch;
    },
    organType() {
      if (this.isBranch) {
        return 2;
      } else if (
        this.org.organType == "OrganType-631" ||
        this.org.organType == "OrganType-632" ||
        this.org.organType == "OrganType-931" ||
        this.org.organType == "OrganType-932"
      ) {
        return 2;
      } else {
        return 1;
      }
    }
  },
  methods: {
    loadData() {
      this.loading = true;
      this.nodata = false;
      let params = JSON.parse(JSON.stringify(this.params));
      params.year = new Date(params.year).getFullYear();
      params.month = new Date(params.month).getMonth() + 1;
      let fn = "";
      if (this.organType == 1) {
        fn =
          this.tabName == "mounth"
            ? GetPartyMeetingStatisticsMonth
            : GetPartyMeetingStatisticsQuarter;
      } else {
        fn = GetPartyMeetingStatisticsOne;
      }

      fn(params)
        .then(
          res => {
            this.data = res;
            this.chatInit();
            this.nodata = false;
          },
          err => {
            this.nodata = true;
          }
        )
        .finally(() => {
          this.loading = false;
        });
    },
    changeOrg(n) {
      this.org = n;
    },
    tabSelect(val) {
      this.tabName = val;
    },
    chatInit() {
      let arr = [];
      let response =
        this.data.partyMeetingMonthList || this.data.partyMeetingQuarterList;
      for (let item in response) {
        arr.push(response[item]);
      }
      let chart = echarts.init(this.$refs["chart"]);
      let dataAxis = arr.map(e => e.partyMeetingName);
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          confine: true
        },
        legend: {
          data: ["应开展数", "已开展数"],
          x: "center",
          y: "bottom"
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            fontSize: 12
          },
          axisTick: {
            show: true
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        grid: {
          left: 45,
          bottom: 55,
          right: 0,
          top: 30
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: true
          },
          axisLabel: {
            show: true
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: "应开展数",
            type: "bar",

            barMaxWidth: 50,
            itemStyle: {
              normal: {
                color: "#3B96F3"
              }
            },
            data: arr.map(e => e.shouldCount)
          },
          {
            name: "已开展数",
            type: "bar",

            barMaxWidth: 50,
            itemStyle: {
              normal: {
                color: "#1BC91B"
              }
            },
            data: arr.map(e => e.alreadyCount)
          }
        ]
      };
      chart.setOption(option, true);
      window.onresize = () => {
        chart.resize();
      };
    },
    moreInfo() {}
  }
};
</script>
<style lang="less" scoped>
.organization-life {
  .or-body {
    width: 100%;
    height: 440px;
  }
  .total-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 10px;
    span {
      display: inline-block;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: red;
      color: #fff;
      line-height: 60px;
      text-align: center;
      font-size: 36px;
      margin-left: 30px;
    }
    label {
      margin-top: 10px;
    }
  }
  .item {
    span {
      display: block;
      margin-top: 30px;
    }
    label {
      display: block;
    }
  }

  .more {
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
}
</style>

<style lang="less">
.organization-life .ivu-tabs-nav {
  padding-bottom: 10px !important;
}
</style>


