<template>
  <div class="lhyj-ui-courselist">
    <Row :gutter="25" type="flex" class="clearfix">
      <Col :span="12" v-for="(el,i) in data" :key="i">
        <Card
          class="lhyj-ui-courseitem"
          @click.native="$router.push({path: 'classinfo',query:{id: el.id}})"
        >
          <div class="lhyj-ui-courseitem-cover">
            <div class="lhyj-ui-tag" v-if="el.offWorkStatus == 1">已请假</div>
            <div class="lhyj-ui-tag lhyj-ui-tag-disable" v-if="el.offWorkStatus == -1">请假不通过</div>
            <img v-imgerror.school :src="el.coverPicture || 'default'" alt />
          </div>
          <div class="lhyj-ui-courseitem-info">
            <div class="title">{{el.className}}</div>
            <div class="intr">
              <p>创建单位：{{el.createOrganName}}</p>
              <p>培训时间：{{el.startTime | DateFormat('yyyy-MM-dd hh:mm:ss')}} 至 {{el.endTime | DateFormat('yyyy-MM-dd hh:mm:ss')}}</p>
            </div>
            <div class="tag">
              <span class="loading-tag" v-if="el.statusText == '进行中'">{{el.statusText}}</span>
              <span class="finish-tag" v-else>{{el.statusText}}</span>
              <span
                class="primary-tag"
                v-if="el.classType"
              >{{GetCodeTableValue(el.classType, "ClassType")}}</span>
            </div>
            <div style="margin-bottom:12px">
              <Button
                v-if="state == 1 && compareDate(el.serverTime, el.startTime) > 24"
                type="primary"
                style="margin-right:10px"
                @click.stop="remove(el)"
              >取消报名</Button>

              <Button
                v-if="state == 2"
                style="margin-right:10px"
                type="primary"
                @click.stop="apply(el)"
              >报名</Button>

              <Button
                v-if="state == 1 && (el.offWorkStatus == -2 || el.offWorkStatus == -1) && !isOnline &&(el.statusText != '进行中')"
                style="margin-right:10px"
                type="primary"
                @click.stop="off(el)"
              >请假</Button>
              <!-- <Button
                v-if="state == 1 && el.isLevel && !isOnline"
                style="margin-right:10px"
                type="primary"
                @click.stop="off(el)"
              >取消请假</Button>-->
              <Button
                v-if="state == 1 && (el.offWorkStatus == -1) && !isOnline"
                style="margin-right:10px"
                type="warning"
                @click.stop="getResult(el)"
              >查看审批</Button>
            </div>
            <div
              v-if="state == 1 && compareDate(el.serverTime, el.startTime) > 24"
              class="tips"
            >可不晚于开班前24小时取消报名</div>
          </div>
        </Card>
      </Col>
    </Row>
    <div class="no-data" v-if="!data.length">
      <img src="@/assets/images/no-data.png" alt />
    </div>
    <Modal
      v-model="showModal"
      title="请假"
      :mask-closable="false"
      :loading="loading"
      width="600px"
      class="modal-form"
    >
      <Form ref="form" :rules="rules" :model="model">
        <FormItem prop="leaveContent" label="请假原因">
          <Input type="textarea" :row="5" v-model="model.leaveContent" placeholder="请填写请假理由"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="submit" type="primary" style="margin-right:15px;" class="btn-red">确定</Button>
        <Button @click="showModal=false" type="primary" class="btn-red">取消</Button>
      </div>
    </Modal>
    <Modal
      v-model="showModal1"
      title="审核记录"
      :mask-closable="false"
      :loading="loading1"
      width="1000px"
      class="modal-form"
    >
      <Table :loading="loading1" stripe border :columns="columns" :data="list"></Table>
      <div slot="footer">
        <Button @click="showModal1=false" type="primary" class="btn-red">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import {
  TrainClassServiceApply,
  CancelTrainClassUserSigned,
  CreateTrainClassUserOffWork,
  GetClassUserOffWorkList
} from "@/api/education";
import { Card, Tooltip, Modal, Form, FormItem, Table } from "iview";
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    state: {
      type: [Number, String],
      default: 1
    },
    isOnline: {
      type: Boolean,
      default: true
    }
  },
  data() {
    let that = this;
    return {
      model: {
        leaveContent: ""
      },
      showModal: false,
      loading: false,
      rules: {
        leaveContent: [
          {
            required: true,
            message: "请输入请假原因",
            trigger: "blur"
          }
        ]
      },
      columns: [
        {
          title: "姓名",
          width: 120,
          tooltip: true,
          key: "offWorkUserName"
        },
        {
          title: "申请时间",
          width: 200,
          tooltip: true,
          render(h, { row }) {
            return h(
              "span",
              that.FormatDate(row.auditTime, "yyyy-MM-dd hh:mm:ss")
            );
          }
        },
        {
          title: "审核状态",
          width: 120,
          render(h, { row }) {
            return h(
              "span",
              that.GetCodeTableValue(
                row.offWorkStatus,
                "EnumOffWorkAuditStatus"
              )
            );
          }
        },
        {
          title: "审批意见",
          tooltip: true,
          key: "opinions"
        }
      ],
      list: [],
      model1: {},
      showModal1: false,
      loading1: false
    };
  },
  components: {
    Card,
    Tooltip,
    Modal,
    Form,
    FormItem,
    Table
  },
  methods: {
    compareDate(currentDate, startDate) {
      return (
        (Date.parse(startDate) - Date.parse(currentDate)) / (60 * 1000 * 60)
      );
    },
    apply(el) {
      let that = this;
      this.$Modal.confirm({
        title: "系统提示",
        content: `确认参加培训'${el.className}'？`,
        onOk: () => {
          TrainClassServiceApply({
            classId: el.id
          }).then(res => {
            that.$Message.success("操作成功");
            that.$emit("update");
          });
        }
      });
    },
    getResult(el) {
      this.showModal1 = true;
      let params = {
        SearchType: 1,
        TrainClassId: el.id
      };
      GetClassUserOffWorkList(params).then(res => {
        this.list = res.items;
      });
    },
    off(el) {
      let that = this;
      that.model = el;
      that.showModal = true;
    },
    submit() {
      this.loading = true;
      let params = {
        trainClassId: this.model.id,
        leaveContent: this.model.leaveContent
      };
      this.$refs["form"].validate(valid => {
        if (valid) {
          CreateTrainClassUserOffWork(params)
            .then(res => {
              this.$Message.success("提交成功");
              this.$emit("update");
            })
            .finally(() => {
              this.loading = false;
              this.showModal = false;
            });
        }
      });
    },
    remove(el) {
      let that = this;
      this.$Modal.confirm({
        title: "系统提示",
        content: `确认取消报名培训'${el.className}'？`,
        onOk: () => {
          CancelTrainClassUserSigned({
            trainClassId: el.id
          }).then(res => {
            that.$Message.success("操作成功");
            that.$emit("update");
          });
        }
      });
    }
  }
};
</script>
<style lang="less">
.lhyj-ui-courselist {
  .lhyj-ui-courseitem {
    overflow: hidden;
    margin-bottom: 20px;
    cursor: pointer;
    & > .ivu-card-body {
      display: flex;
    }
    .lhyj-ui-courseitem-cover {
      position: relative;
      overflow: hidden;
      margin-right: 23px;
      img {
        display: block;
        width: 330px;
        height: 220px;
      }
    }
    .lhyj-ui-courseitem-info {
      flex: 1;
      .title {
        height: 48px;
        overflow: hidden;
        font-size: 16px;
        font-weight: bold;
        color: #373940;
      }
      .intr {
        color: #778094;
        line-height: 24px;
        margin-bottom: 25px;
      }
      .tag {
        margin-bottom: 15px;
        span {
          padding: 0 13px;
          height: 18px;
          line-height: 18px;
          margin-right: 6px;
        }
        .loading-tag {
          color: #f55a51;
          border: 1px dotted #f55a51;
          border-radius: 18px;
        }
        .primary-tag {
          color: #3b96f3;
          border: 1px dotted #3b96f3;
          border-radius: 18px;
        }
        .finish-tag {
          color: #573e41;
          border: 1px dotted #573e41;
          border-radius: 18px;
        }
      }
      .tips {
        font-size: 12px;
        color: #778094;
      }
    }
  }
}
</style>


