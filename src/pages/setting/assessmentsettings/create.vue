<!-- 开展组织生活 -->
<template>
  <div class="assessmentsettings-create">
    <TopEditTipsCard :creatime="'2019-01-01'" :lastime="'2019-02-02'"></TopEditTipsCard>
    <Card :bordered="false" :dis-hover="true">
      <Form ref="form" :model="model" :rules="rules">
        <Row :gutter="30">
          <Col :span="12">
            <FormItem label="适用对象">
              <common-select
                :disabled="true"
                size="large"
                keys="EnumAssessType"
                v-model="model.assessType"
              ></common-select>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="线上学时最低要求" prop="onlinePassPeriodForYear">
              <Input placeholder="请输入学时" v-model="model.onlinePassPeriodForYear" size="large">
                <span slot="append">h/年</span>
              </Input>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="线下学时最低要求" prop="offlinePassPeriodForYear">
              <Input placeholder="请输入学时" v-model="model.offlinePassPeriodForYear" size="large">
                <span slot="append">h/年</span>
              </Input>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="每人每日学时上限" prop="dayPeriodLimit">
              <Input placeholder="请输入学时" v-model="model.dayPeriodLimit" size="large">
                <span slot="append">h</span>
              </Input>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="参加组织生活最低要求" prop="partyMeetingPassTimeForMonth">
              <Input placeholder="请输入次数" v-model="model.partyMeetingPassTimeForMonth" size="large">
                <span slot="append">次/月</span>
              </Input>
            </FormItem>
          </Col>
          <Col :span="24" class-name="text-center" style="margin-top:30px">
            <Button :loading="btnLoading" type="primary" @click="save">保存</Button>
          </Col>
        </Row>
      </Form>
    </Card>
  </div>
</template>
<script>
import TopEditTipsCard from "@/components/TopEditTipsCard";
import { Form, FormItem, Input, Card } from "iview";
import { SetUserExRuleForCurrentYear } from "@/api";
import CommonSelect from "@/components/CommonSelect";
export default {
  components: {
    TopEditTipsCard,
    Form,
    FormItem,
    Input,
    CommonSelect,
    Card
  },
  data() {
    let that = this;
    let validatePeroid = (rule, value, callback) => {
      if (!/^-?\d*\.?\d+$/.test(value)) {
        callback(new Error("请输入数字"));
      } else if (value < 0) {
        callback(new Error("学时不能小于0"));
      } else {
        callback();
      }
    };
    let validateTimes = (rule, value, callback) => {
      if (!/^\d*\.?\d+$/.test(value)) {
        callback(new Error("请输入正整数"));
      } else {
        callback();
      }
    };
    return {
      model: {
        assessType: "",
        onlinePassPeriodForYear: 0,
        offlinePassPeriodForYear: 0,
        dayPeriodLimit: 0,
        partyMeetingPassTimeForMonth: 0
      },
      rules: {
        onlinePassPeriodForYear: [
          {
            required: true,
            message: "请输入线上学时年度达标最低学时",
            trigger: "blur"
          },
          {
            validator: validatePeroid
          }
        ],
        offlinePassPeriodForYear: [
          {
            required: true,
            message: "请输入线下学时年度达标最低学时",
            trigger: "blur"
          },
          {
            validator: validatePeroid
          }
        ],
        dayPeriodLimit: [
          {
            required: true,
            message: "请输入每日学时上限",
            trigger: "blur"
          },
          {
            validator: validatePeroid
          }
        ],
        partyMeetingPassTimeForMonth: [
          {
            required: true,
            message: "请输入每月参加组织生活最低次数",
            trigger: "blur"
          },
          {
            validator: validateTimes
          }
        ]
      },
      loading: false,
      btnLoading: false
    };
  },
  methods: {
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.btnLoading = true;
          SetUserExRuleForCurrentYear(this.model)
            .then(res => {
              this.$Message.success("设置成功");
              this.$router.go(-1);
            })
            .finally(() => {
              this.btnLoading = false;
            });
        }
      });
    }
  },
  mounted() {
    let query = this.$route.query;
    if (!query.assessType) {
      this.$router.go(-1);
    } else {
      Object.assign(this.model, query);
    }
  }
};
</script>
<style lang="less">
</style>
