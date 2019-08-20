<template>
  <div class="basic-analyse">
    <Row :gutter="30" type="flex">
      <Spin fix v-if="loading"></Spin>
      <Col style="width:100%">
      <Row :gutter="15" style="margin-bottom:20px;" type="flex">
        <Col style="width:100%">
        <Card class="top-card" :bordered="false">
          <p slot="title">党组织概况</p>
          <div class="card1">
            <p>
              <span class="card-item-tilte">
                名称：
              </span>
              <span class="card-item-name">{{data.name}}</span>
            </p>
            <p class="p-middle">
              <span class="card-item-tilte">
                联系人：
              </span>
              <span class="card-item-p1">{{data.lianxiren}}</span>
            </p>
            <p>
              <span class="card-item-tilte">
                电话：
              </span>
              <span class="card-item-p1">{{data.phone}}</span>
            </p>
          </div>
          <div class="card2">
            <div class="left-reg-item">
              <img class="user-icon" src="@/assets/images/xiaji.png" alt />
              <div>
                <span>{{data.registePartyNumber}}</span>
                <p>下级党组织数量</p>
              </div>
            </div>
            <div class="left-reg-item">
              <img class="user-icon" src="@/assets/images/dangyuan.png" alt />
              <div>
                <span>{{data.realRegisteUserNumber}}</span>
                <p>党员数量</p>
              </div>
            </div>

          </div>
        </Card>
        </Col>
      </Row>
      <Card class="bottom-card" :bordered="false">
        <p slot="title">党组织活动分析</p>
        <div class="dy-wrap">
          <div class="left-wrap">
            <div class="etitle">开展类型</div>
            <div id="nljg" style="width:90%;height:380px"></div>
          </div>
          <div class="right-wrap">
            <div id="xbjg" style="width:90%;height:380px"></div>
          </div>
        </div>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { Card, Spin } from "iview";
import { GetHomeEnsembleStatistics } from "@/api";
import echarts from "echarts";
import chartInit from "@/utils/map";
export default {
  components: {
    Card,
    Spin
  },
  data() {
    return {
      loading: false,
      data: {
        name: "中共西宁市城北区委",
        lianxiren: '王某某',
        phone: '13000000000',
        registePartyNumber: '23',
        realRegisteUserNumber: '234',
        meetingTypeNum: [
          {
            meetingTypeName: '党内集中活动：',
            meetingTypeNum: '36.28%'
          },
          {
            meetingTypeName: '党小组会：',
            meetingTypeNum: '42.27%'
          },
          {
            meetingTypeName: '党支部委员会：',
            meetingTypeNum: '12.68%'
          },
          {
            meetingTypeName: '党员大会：',
            meetingTypeNum: '36.21%'
          }
        ]
      }
    };
  },
  computed: {
    organId() {
      return this.$store.state.session.organId;
    }
  },
  mounted() {
    this.nljgChart();
    // this.loadData();
  },
  methods: {
    loadData() {
      this.loading = true;
      GetHomeEnsembleStatistics({ id: this.organId })
        .then(res => {
          this.data = res;
          this.nljgChart();
          this.xbjgChart();
          //地图
          let data = [];
          for (let item in this.data.districtPartyUser) {
            data.push(this.data.districtPartyUser[item]);
          }
          data = data.map(e => {
            return {
              name: e.districtName,
              value: e.districtNum
            };
          });
          let chart = chartInit(this.$refs["map"], data);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    nljgChart() {
      let e1 = echarts.init(document.getElementById("nljg"));
      let arr = [];
      for (let item in this.data.meetingTypeNum) {
        arr.push(this.data.meetingTypeNum[item]);
      }
      var ydata = arr.map(e => {
        return {
          name: e.meetingTypeName,
          value: e.meetingTypeNum
        };
      });
      var color = [
        "#EF5A2C",
        "#199AE3",
        "#59C544",
        "#2DC174"
      ];
      //  var xdata = ydata;

      let option = {
        color: color,
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          left: "70%",
          align: "left",
          top: "middle",
          textStyle: {
            color: "#8C8C8C"
          },
          height: 250
        },
        series: [
          {
            type: "pie",
            radius: ['40%', '55%'],
            label: {
              normal: {
                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                backgroundColor: '#eee',
                borderColor: '#aaa',
                borderWidth: 1,
                borderRadius: 4,
                rich: {
                  a: {
                    color: '#999',
                    lineHeight: 22,
                    align: 'center'
                  },

                  hr: {
                    borderColor: '#aaa',
                    width: '100%',
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    color: '#eee',
                    backgroundColor: '#334455',
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            data: ydata
          }
        ]
      };
      e1.setOption(option);

    },
    xbjgChart() {
      let arr = [];
      for (let item in this.data.domainTypeSex) {
        let children = [];
        for (let el in this.data.domainTypeSex[item]) {
          if (el != "sexName") {
            children.push(this.data.domainTypeSex[item][el]);
          }
        }
        let obj = {
          name: this.data.domainTypeSex[item].sexName,
          children: children
        };
        arr.push(obj);
      }
      let e1 = echarts.init(document.getElementById("xbjg"));
      let option = {
        color: ["#2461EF", "#FF6C00"],
        tooltip: {},
        xAxis: {
          show: false
        },
        yAxis: {
          show: false
        },
        legend: {
          data: arr.map(e => e.name),
          x: "center", // 'center' | 'left' | {number},
          y: "bottom", // 'center' | 'bottom' | {number}
          align: "left"
        },
        radar: {
          // shape: 'circle',
          indicator: [
            {
              name: "事业单位",
              max: 99999
            },
            {
              name: "学校",
              max: 99999
            },
            {
              name: "两新",
              max: 99999
            },
            {
              name: "国企",
              max: 99999
            },
            {
              name: "机关",
              max: 99999
            },
            {
              name: "城市",
              max: 99999
            },
            {
              name: "农村",
              max: 99999
            }
          ]
        },
        series: [
          {
            type: "radar",
            name: "男性",
            data: [
              {
                value: arr[0].children.map(e => e.domainTypeSexNum)
              }
            ],
            itemStyle: {
              normal: {
                color: "#2461EF"
              }
            }
          },
          {
            type: "radar",
            data: [
              {
                value: arr[1].children.map(e => e.domainTypeSexNum)
              }
            ],
            name: "女性",
            itemStyle: {
              normal: {
                color: "#FF6C00"
              }
            }
          }
        ]
      };
      e1.setOption(option);
    },

  }
};
</script>

<style lang='less'>
.basic-analyse {
  .system-times {
    float: right;
    display: flex;
    height: 43px;
    align-items: center;
    margin-bottom: 16px;
    img {
      margin-right: 15px;
    }
    .time-tips {
      font-size: 18px;
      color: #573e41;
      font-weight: bold;
      margin-right: 18px;
      letter-spacing: 2px;
    }
    .time {
      font-size: 24px;
      color: #eb3939;
      em {
        font-size: 14px;
        color: #856b6e;
        font-style: normal;
        margin-left: 12px;
        margin-right: 15px;
      }
    }
  }
  .card1 {
    width: 31.25%;
    margin-right: 10%;
    .p-middle {
      padding: 20px 0px;
    }
  }
  .top-card {
    // .ivu-card-head {
    //   padding: 30px;
    //   p {
    //     font-size: 20px;
    //     font-weight: bold;
    //     color: rgba(26, 26, 26, 1);
    //   }
    // }
    .ivu-card-body {
      display: flex;
      flex-direction: row;
      padding: 0;
      img {

        margin-right: 11px;
      }
      padding: 41px 29px 55px;
    }
    .card-item-tilte {
      width: 90px;
      display: inline-block;
      font-size: 14px;
     // font-weight: 500;
      color: rgba(102, 102, 102, 1);
    }
    .card-item-name {
      font-size: 14px;
     // font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    .card-item-p1 {
      font-size: 14px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
  }
  .card2 {
    display: flex;
    flex-direction: row;
    width: 68%;
    .left-reg-item {
      width: 50%;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 19px;
      .user-icon {
        margin: 10px 14px 0 21px;
      }
      p {
        // font-size: 16px;
        // font-weight: 500;
        color: rgba(102, 102, 102, 1);
      }
      span {
        font-size: 40px;
        font-weight: 500;
        color: rgba(26, 26, 26, 1);
        background: linear-gradient(0deg, rgba(245, 84, 77, 0.88) 0%, rgba(252, 108, 56, 0.88) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  .bottom-card {
    margin-bottom: 60px;
    // .ivu-card-head {
    //   padding: 30px;
    //   p {
    //     font-size: 20px;
    //     font-weight: bold;
    //     color: rgba(26, 26, 26, 1);
    //   }
    // }
    .ivu-card-body {
      padding: 0;
    }
  }
  .echart-title {
    font-size: 18px;
    color: #573e41;
    font-weight: bold;
  }
  .dy-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
    padding-left: 30px;
    padding-right: 30px; // margin-top: 20px;
    .left-wrap,
    .right-wrap {
      width: 50%;
      box-sizing: border-box;
      .etitle {
        width: 90%;
        padding-left: 30px;
        margin-top: 38px;
        // font-size: 18px;
        color: rgba(26, 26, 26, 1);
        position: relative;
        &:before {
          content: '';
          position: absolute;
          left: 0;
          top: 1px;
          width: 16px;
          height: 18px;
          background: url("~@/assets/images/kaizhan.png") left top no-repeat;
          background-size: 16px 18px;
        }
      }
    }
    .left-wrap {
      border-right: 1px solid #F2F2FA;
    }
    .right-wrap {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
  .reg-info-wrap {
    display: flex;
    justify-content: center;
    position: relative;
    .left-reg {
      //padding-top: 50px;
      position: absolute;
      left: 0;
      top: 50px;
      z-index: 1;
    }
    .left-reg-item {
      background: url("~@/assets/images/icon-bg-1.png");
      width: 226px;
      height: 90px;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 19px;
      .user-icon {
        width: 59px;
        height: 49px;
        margin: 10px 14px 0 21px;
      }
      h3 {
        color: #573e41;
        line-height: 1;
      }
      span {
        font-size: 24px;
        color: #eb3939;
        font-weight: bold;
      }
    }
    #map {
      width: 580px;
    }
    .right-reg {
      // padding-top: 50px;
      position: absolute;
      right: 0;
      top: 50px;
      z-index: 1;
    }
    .right-reg-item {
      width: 220px;
      height: 38px;
      border: 1px solid rgba(229, 223, 223, 1);
      border-radius: 4px;
      text-align: center;
      line-height: 38px;
      margin-bottom: 14px;
      cursor: pointer;
    }
  }
}
</style>
