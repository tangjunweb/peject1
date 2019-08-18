<template>
  <div class="lhyj-ui-examdaylist">
    <Row :gutter="25" type="flex" class="clearfix">
      <Col style="width:25%" v-for="(el,i) in data" :key="i">
        <Card class="lhyj-ui-examitem">
          <div
            :class="['lhyj-ui-tag', !el.isAnswered ? 'lhyj-ui-tag-disable': '']"
          >{{!el.isAnswered? '未作答' : '已作答'}}</div>
          <img v-imgerror.exam class="cover" src alt />
          <div class="exam-info">
            <div class="title">
              <Tooltip :content="el.title" transfer max-width="300" theme="light">{{el.title}}</Tooltip>
            </div>
            <div class="option">
              <p class="text-ellipsis">时间：{{el.day | DateFormat('yyyy-MM-dd')}}</p>
            </div>
            <div class="button-group text-center">
              <Button
                type="primary"
                v-if="!el.isAnswered && (FormatDate(el.day,'yyyy-MM-dd') == getNowFormatDate())"
                @click.native="$router.push({
                path: 'question',
                query:{
                  id: el.id
                }
              })"
              >开始考试</Button>
              <Button
                v-if="!el.isAnswered && (FormatDate(el.day,'yyyy-MM-dd') != getNowFormatDate())"
              >下次早点来答题哦</Button>
              <Button v-if="el.isAnswered" @click="showAnalysis(el)" type="primary">查看解析</Button>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
    <AnalysisModal :show="showModal" :id="selectId" />
    <div class="no-data" v-if="!data.length">
      <img src="@/assets/images/no-data.png" alt />
    </div>
  </div>
</template>
<script>
import { GetClientExamEveryDayQuestionRecord } from "@/api/education";
import { getNowFormatDate } from "@/utils/util";
import AnalysisModal from "@/pages/member-client/member-education/exam/children/analysis";
import {
  Card,
  Poptip,
  Table,
  Tooltip,
} from "iview";
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
      showModal: false,
      selectId: ''
    };
  },
  components: {
    Card,
    Poptip,
    Table,
    Tooltip,
    AnalysisModal
  },
  methods: {
    getNowFormatDate() {
      return getNowFormatDate();
    },
    showAnalysis(el) {
      this.showModal = true;
      this.selectId = el.id;
    }
  }
};
</script>
<style lang="less">
.lhyj-ui-examdaylist {
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


