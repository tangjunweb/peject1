<template>
  <div class="lhyj-ui-examlist">
    <Row :gutter="25" type="flex" class="clearfix">
      <Col style="width:25%" v-for="(el,i) in data" :key="i">
        <Card class="lhyj-ui-examitem">
          <div
            :class="['lhyj-ui-tag', el.testCount == 0 ? 'lhyj-ui-tag-disable': '']"
          >{{el.testCount == 0 ? '未作答' : '已作答'}}</div>
          <img v-imgerror.exam class="cover" src alt />
          <div class="exam-info">
            <div class="title">
              <Tooltip
                :content="el.paperName"
                transfer
                max-width="300"
                theme="light"
              >{{el.paperName}}</Tooltip>
            </div>
            <div class="option">
              <p class="text-ellipsis">创建党组织：{{el.organName}}</p>
              <p class="text-ellipsis" v-if="el.trainName">所属培训：{{el.trainName}}</p>
              <p>考试时间：{{el.beginTitme | DateFormat('yyyy-MM-dd hh:mm')}} 至 {{el.endTime | DateFormat('yyyy-MM-dd hh:mm')}}</p>
            </div>
            <div class="button-group text-center">
              <Button
                v-if="state && el.testCount == 0"
                type="primary"
                @click.native="$router.push({
                path: 'info',
                query:{
                  id: el.id
                }
              })"
              >开始考试</Button>
              <Button
                type="primary"
                v-if="state && el.testCount >= 1 && el.testCount < el.testTime"
                @click.native="$router.push({
                path: 'info',
                query:{
                  id: el.id
                }
              })"
              >重新考试</Button>
              <Poptip
                width="600"
                placement="bottom"
                transfer
                trigger="click"
                @on-popper-show="getResult(el.id)"
              >
                <Button
                  v-if="(state && el.testCount == el.testTime) || (!state && el.testCount > 0)"
                  type="primary"
                >查看解析</Button>
                <Table
                  slot="content"
                  :loading="loading"
                  stripe
                  :columns="columns"
                  :data="recordList"
                ></Table>
              </Poptip>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
    <div class="no-data" v-if="!data.length">
      <img src="@/assets/images/no-data.png" alt />
    </div>
  </div>
</template>
<script>
import { CurrentUserExamRecord } from "@/api/student";
import { Card, Poptip, Table, Tooltip } from "iview";
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    //true: 正在答题
    state: {
      type: Boolean,
      default: true
    }
  },
  data() {
    let that = this;
    return {
      loading: false,
      recordList: [],
      columns: [
        {
          width: 100,
          title: "成绩",
          key: "score",
          tooltip: true
        },
        {
          title: "用时",
          render(h, { row }) {
            return h("span", `${Math.ceil(row.examTime / (60 * 1000))}分钟`);
          }
        },
        {
          title: "答题时间",
          render(h, { row }) {
            return h(
              "span",
              `${that.FormatDate(row.createTime, "yyyy-MM-dd")}`
            );
          }
        },
        {
          title: "错题数",
          render(h, { row }) {
            return h("span", `做错${row.errorQuestionCout}题`);
          }
        },
        {
          title: "操作",
          render(h, { row }) {
            return h(
              "a",
              {
                on: {
                  click() {
                    that.$router.push({
                      path: "/member-education/exam/mistakesCollection",
                      query: {
                        resultId: row.resultId
                      }
                    });
                  }
                }
              },
              "查看错题"
            );
          }
        }
      ]
    };
  },
  components: {
    Card,
    Poptip,
    Table,
    Tooltip
  },
  methods: {
    getResult(paperId) {
      this.loadInfoData(paperId);
    },
    loadInfoData(paperId) {
      this.recordList = [];
      this.loading = true;
      CurrentUserExamRecord({ paperId })
        .then(res => {
          this.recordList = res;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="less">
.lhyj-ui-examlist {
  .lhyj-ui-examitem {
    overflow: hidden;
    cursor: pointer;
    margin-bottom: 20px;
    .ivu-card-body {
      padding: 0;
    }
    .cover {
      width: 100%;
      height: 200px;
      display: block;
    }
    .exam-info {
      padding: 16px;
      .title {
        font-size: 16px;
        padding-right: 10px;
        margin-bottom: 10px;
        color: #778094;
        box-sizing: border-box;
        .ivu-tooltip,
        .ivu-tooltip-rel {
          width: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
    .option {
      color: #778094;
      margin-bottom: 10px;
      p {
        margin-bottom: 5px;
      }
    }
  }
  @media screen and (max-width: 1700px) {
    .cover {
      height: 170px !important;
    }
  }
  @media screen and (max-width: 1500px) {
    .cover {
      height: 150px !important;
    }
  }
  @media screen and (max-width: 1200px) {
    .cover {
      height: 120px !important;
    }
  }
}
</style>


