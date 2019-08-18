<template>
  <div class="basic-organizational-space">
    <Spin fix v-if="loading"></Spin>
    <Row type="flex" justify="space-between">
      <Col class="top-title">
        {{data.organName}}
        <!-- <span>切换</span> -->
      </Col>
    </Row>
    <Row type="flex" :gutter="25">
      <Col style="width:450px;">
        <Card class="user-info">
          <div class="info-title">党组织概况</div>
          <div class="cover-wrap">
            <img src="@/assets/images/avatar.png" alt />
          </div>
          <div class="info-wrap">
            <p class="info-item">联系人：{{data.leadingName || '未设置'}}</p>
            <p class="info-item">联系方式：{{data.leadingPost || '未设置'}}</p>
          </div>
          <div class="count-info">
            <div class="count-info-item">
              <img src="@/assets/images/icon-org-1.png" alt />
              <div class="count-info-item-wrap">
                <div class="t">下级党组织数量</div>
                <div class="n">{{data.lowerPartyOrganNumber}}</div>
              </div>
            </div>
            <div class="count-info-item">
              <img src="@/assets/images/icon-org-2.png" alt />
              <div class="count-info-item-wrap">
                <div class="t">下级党员数量</div>
                <div class="n">{{data.lowerPartyUserNumber}}</div>
              </div>
            </div>
            <div class="count-info-item">
              <img src="@/assets/images/icon-org-3.png" alt />
              <div class="count-info-item-wrap">
                <div class="t">终端覆盖率</div>
                <div class="n">{{data.terminalCoverage || 0}}%</div>
              </div>
            </div>
          </div>
        </Card>
      </Col>
      <Col style="width:655px;">
        <Card class="team-info">
          <div class="info-title" style="margin-bottom:15px">党员队伍</div>
          <div class="nlfb">
            <div class="stitle">年龄段分布</div>
            <Row type="flex" justify="space-between" :gutter="20">
              <Col :span="11">
                <div id="nlfb-left" style="height:300px"></div>
              </Col>
              <Col :span="11">
                <div id="nlfb-right" style="height:300px"></div>
              </Col>
            </Row>
          </div>
          <div class="people-info">
            <div class="stitle">党员占比及数量</div>
            <div id="people-chart" style="height:150px"></div>
          </div>
          <div class="edu-info">
            <div class="stitle">党员学历结构</div>
            <div id="edu-chart" style="height:150px"></div>
          </div>
        </Card>
      </Col>
      <Col style="flex:1; overflow:hidden">
        <Card>
          <!-- <div class="info-title" style="margin-bottom:15px">“三会一课”</div>
          <Table :columns="columns" style="width:100%;margin-bottom:15px" :data="data"></Table>
          <div class="info-title" style="margin-bottom:15px">党组织活动分析</div>
          <div id="anal-chart" style="height:200px"></div> -->
          <div class="info-title" style="margin-bottom:15px">开展活动类型</div>
          <div id="orgA-chart" style="height:200px"></div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { Card, Table, Spin } from "iview";
import echarts from "echarts";
import { GetHomeOrganizationalStatistics } from "@/api";
export default {
  components: {
    Card,
    Table,
    Spin
  },
  data() {
    return {
      d: "0",
      h: "0",
      m: "0",
      s: "0",
      columns: [
        {
          title: "“三会一课”名称",
          key: "name"
        },
        {
          title: "开课时间 ",
          key: "date"
        },
        {
          title: "党组织名称",
          key: "org"
        }
      ],
      loading: false,
      data: {}
    };
  },
  mounted() {
    this.loadData();
  },
  computed: {
    organId() {
      return this.$store.state.session.organId;
    }
  },
  methods: {
    loadData() {
      this.loading = true;
      GetHomeOrganizationalStatistics({ id: this.organId })
        .then(res => {
          this.data = res;
          this.nlfbLeftEchartInit();
          this.nlfbRightEchartInit();
          this.ageEchartInit();
          this.eduChart();
          this.orgAChart();
          this.analChart();
        })
        .finally(() => {
          this.loading = false;
        });
    },
  
    nlfbLeftEchartInit() {
      let arr = [];
      for (let item in this.data.ageADetailNum) {
        arr.push(this.data.ageADetailNum[item]);
      }
      let data = arr.map(e => {
        return {
          name: e.ageName,
          value: e.ageNum
        };
      });
      this.nlfbLeftChart = echarts.init(document.querySelector("#nlfb-left"));
      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)"
        },
        legend: {
          align: "left",
          x: "center",
          y: "bottom",
          itemWidth: 10,
          itemHeight: 10,
          data: data,
          textStyle: {
            fontSize: 11
          }
        },
        series: [
          {
            type: "pie",
            minAngle: 15,
            roseType: "radius",
            radius: "50%",
            color: [
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#9365ef" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#1745d0" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#460da7" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#f0152d" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#e98d48" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#faf063" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#3991ea" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#3cc7cd" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#ee8825" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#2a1f15" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#4ccdd5" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#c1ca2b" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            ],
            hoverAnimation: false, //鼠标移入变大
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: "outside",
                formatter: "{d}%",
                textStyle: {
                  fontWeight: "100"
                }
              }
            },
            labelLine: {
              normal: {
                length: 15,
                length2: 15
              }
            },
            data: data
          }
        ]
      };
      this.nlfbLeftChart.setOption(option);
    },
    nlfbRightEchartInit() {
      let arr = [];
      for (let item in this.data.ageBDetailNum) {
        arr.push(this.data.ageBDetailNum[item]);
      }
      let data = arr.map(e => {
        return {
          name: e.ageName,
          value: e.ageNum
        };
      });
      this.nlfbRightChart = echarts.init(document.querySelector("#nlfb-right"));
      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)"
        },
        legend: {
          align: "left",
          x: "center",
          y: "bottom",
          itemWidth: 10,
          itemHeight: 10,
          data: data,
          textStyle: {
            fontSize: 11
          }
        },
        series: [
          {
            type: "pie",
            minAngle: 15,
            roseType: "radius",
            radius: "50%",
            color: [
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#9365ef" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#1745d0" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#460da7" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#f0152d" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#e98d48" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#faf063" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#3991ea" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#3cc7cd" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#ee8825" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#2a1f15" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#4ccdd5" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#c1ca2b" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            ],
            hoverAnimation: false, //鼠标移入变大
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: "outside",
                formatter: "{d}%",
                textStyle: {
                  fontWeight: "100"
                }
              }
            },
            labelLine: {
              normal: {
                length: 15,
                length2: 15
              }
            },
            data: data
          }
        ]
      };
      this.nlfbRightChart.setOption(option);
    },
    ageEchartInit() {
      this.ageEchart = echarts.init(document.querySelector("#people-chart"));
      var labelFromatter = {
        normal: {
          label: {
            formatter: function(params) {
              return params.data.value;
            },
            position: "center"
          }
        }
      };
      var labelBottom = {
        normal: {
          color: "#E5DFDF"
        },
        emphasis: {
          color: "#E5DFDF"
        }
      };
      var radius = [35, 45];
      var option = {
        legend: [
          {
            data: ["女性党员", "流动党员", "老党员"],
            y: "bottom",
            left: "-30",
            itemWidth: 112,
            padding: 0,
            itemHeight: 0,
            textStyle: {
              fontSize: 14
            }
          }
        ],
        tooltip: {
          trigger: "item"
        },
        series: [
          {
            name: "女性党员",
            type: "pie",
            clockwise: false,
            hoverAnimation: false,
            center: ["20%", "55%"],
            radius: radius,
            itemStyle: labelFromatter,
            data: [
              {
                value: this.data.partyScaleNum.partyScaleSex.overallNum,
                itemStyle: labelBottom,
                label: { show: false, position: "inside" }
              },
              {
                value: this.data.partyScaleNum.partyScaleSex.moduleNum,
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#FE6647" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#F94435" // 100% 处的颜色
                      }
                    ],
                    globalCoord: false // 缺省为 false
                  }
                }
              }
            ]
          },
          {
            name: "流动党员",
            type: "pie",
            clockwise: false,
            hoverAnimation: false,
            center: ["50%", "55%"],
            radius: radius,
            x: "20%", // for funnel
            itemStyle: labelFromatter,
            data: [
              {
                value: this.data.partyScaleNum.partyScaleFlow.overallNum,
                itemStyle: labelBottom,
                label: { show: false, position: "inside" }
              },
              {
                value: this.data.partyScaleNum.partyScaleFlow.moduleNum,
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#4074F8" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#40C2F8" // 100% 处的颜色
                      }
                    ],
                    globalCoord: false // 缺省为 false
                  }
                }
              }
            ]
          },
          {
            name: "老党员",
            type: "pie",
            clockwise: false,
            hoverAnimation: false,
            center: ["80%", "55%"],
            radius: radius,
            x: "40%", // for funnel
            itemStyle: labelFromatter,
            data: [
              {
                value: this.data.partyScaleNum.partyScaleOld.overallNum,
                itemStyle: labelBottom,
                label: { show: false, position: "inside" }
              },
              {
                value: this.data.partyScaleNum.partyScaleOld.moduleNum,
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#FF8400" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#FFC000" // 100% 处的颜色
                      }
                    ],
                    globalCoord: false // 缺省为 false
                  }
                }
              }
            ]
          }
        ]
      };
      this.ageEchart.setOption(option);
    },
    eduChart() {
      let e1 = echarts.init(document.getElementById("edu-chart"));
      let data = [];
      for (let item in this.data.partyEduUserNum) {
        data.push(this.data.partyEduUserNum[item]);
      }
      let category = data.map(e => e.eduName);
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: {
          type: "value",
          show: false
        },
        grid: {
          left: 45,
          bottom: 0,
          right: 20,
          top: 10
        },
        yAxis: {
          type: "category",
          data: category,
          splitLine: { show: false },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#573E41",
              fontSize: 14
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            type: "bar",
            barWidth: 12,
            itemStyle: {
              normal: {
                barBorderRadius: 6,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: "#FFC028" },
                  { offset: 1, color: "#D50000" }
                ]),
                label: {
                  show: true, //开启显示
                  position: "right",
                  textStyle: {
                    color: "#573E41",
                    fontSize: 12,
                    offset: [5, -2]
                  }
                }
              },
              emphasis: {
                show: true,
                barBorderRadius: 6,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: "#FFC028" },
                  { offset: 1, color: "#D50000" }
                ]),
                label: {
                  show: true, //开启显示
                  position: "right",
                  textStyle: {
                    color: "#573E41",
                    fontSize: 12,
                    offset: [5, -2]
                  }
                }
              }
            },
            data: data.map(e => e.eduNum)
          }
        ]
      };
      e1.setOption(option);
    },
    orgAChart() {
      let e1 = echarts.init(document.getElementById("orgA-chart"));
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
        "#4074F8",
        "#FF3E00",
        "#BDF188",
        "#417505",
        "#0067F0",
        "#94BEFD"
      ];
      var xdata = [
        "支部委员会",
        "党小组会",
        "党课",
        "组织生活会",
        "其他会议",
        "支部书记会议"
      ];

      let option = {
        color: color,
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
            center: ["35%", "50%"],
            radius: ["40%", "65%"],
            clockwise: false, //饼图的扇区是否是顺时针排布
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: "outter"
              }
            },
            labelLine: {
              normal: {
                smooth: true
              }
            },
            data: ydata
          }
        ]
      };
      e1.setOption(option);
      window.addEventListener("resize", function() {
        e1.resize();
      });
    },
    analChart() {
      let e1 = echarts.init(document.getElementById("anal-chart"));
      let option = {
        tooltip: {},
        legend: {
          orient: "vertical",
          align: "left",
          x: "right",
          y: "center",
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: 11
          }
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: "党组织活动开展率", max: 1 },
            { name: "党员活跃度", max: 1 },
            { name: "党员参与率", max: 1 },
            { name: "党组织活动达标率", max: 1 }
          ],
          splitNumber: 3,
          center: ["50%", "40%"],
          name: {
            formatter: "{value}",
            textStyle: {
              fontSize: 12,
              color: "rgba(0, 0, 2, 1)"
            }
          },
          splitArea: {
            areaStyle: {
              color: [
                "rgba(0, 0, 0, 0)",
                "rgba(87, 203, 204, 0.2)",
                "rgba(0, 0, 0, 0)",
                "rgba(0, 0, 0, 0)",
                "rgba(0, 0, 0, 0)"
              ],
              shadowColor: "rgba(255, 255, 255, 1)",
              shadowBlur: 40
            }
          },
          axisLine: {
            lineStyle: {
              color: "rgba(87, 203, 204, 0.3)"
            }
          },
          splitLine: {
            lineStyle: {}
          },
          radius: 50
        },
        series: [
          {
            name: "党组织活动分析",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: [0.73, 0.98, 0.99, 0.94]
              }
            ]
          }
        ]
      };
      e1.setOption(option);
      window.addEventListener("resize", function() {
        e1.resize();
      });
    }
  }
};
</script>

<style lang='less'>
.basic-organizational-space {
  .top-title {
    font-size: 18px;
    color: #573e41;
    letter-spacing: 3px;
    padding-top: 6px;
    font-weight: bold;
    span {
      padding: 3px 7px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 400;
      margin-left: 10px;
      text-align: center;
      color: rgba(255, 255, 255, 1);
      background: #eb3939;
    }
  }
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
  .info-title {
    font-size: 18px;
    color: #573e41;
    font-weight: bold;
  }
  .user-info {
    height: 810px;
    background: #fff url("~@/assets/images/user-bg.png") no-repeat top center;
    overflow: hidden;
    .cover-wrap {
      width: 168px;
      height: 172px;
      background: url("~@/assets/images/avatar-bg.png") no-repeat center;
      margin: 73px auto 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      img {
        width: 140px;
        height: 140px;
        border-radius: 50%;
      }
    }
    .info-wrap {
      margin-bottom: 20px;
      p {
        color: #573e41;
        line-height: 36px;
        padding-left: 106px;
      }
    }
    .count-info {
      height: 350px;
      background: #f9f9f9;
      display: flex;
      flex-direction: column;
      padding: 0 16px;
      .count-info-item {
        flex: 1;
        border-bottom: 1px solid #f1e7e6;
        display: flex;
        flex-direction: row;
        align-items: center;
        img {
          margin-right: 17px;
          margin-left: 70px;
        }
        .t {
          color: #573e41;
          font-weight: bold;
        }
        .n {
          color: #eb3939;
          font-size: 20px;
          font-weight: bold;
        }
        &:last-child {
          border: 0;
        }
      }
    }
  }
  .team-info {
    .nlfb,
    .people-info {
      border-bottom: 1px solid #f1e7e6;
      padding-bottom: 15px;
      margin-bottom: 15px;
    }
    .stitle {
      border-left: 4px solid #eb3939;
      padding-left: 8px;
      font-size: 16px;
      color: #856b6e;
    }
  }
}
</style>
