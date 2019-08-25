<template>
  <div>
    <Modal
      v-model="showModal1"
      title="编辑党内职务信息"
      :closable="false"
      :mask-closable="false"
      :loading="modalLoading"
      transfer
      width="800px"
      class-name="blue-modal"
    >
      <div class="scroll modal-scroll">
        <Form ref="form1" :model="model" :rules="rules">
          <Row :gutter="30">
            <Col :span="12">
              <FormItem label="是否在任" prop="partyMember.partyDutyIsInOffice">
                <checkbox v-model="model.partyMember.partyDutyIsInOffice"></checkbox>
              </FormItem>
            </Col>
            <Col :span="24">
              <FormItem label="职务名称" prop="partyMember.partyDutyCode">
                <Checkbox v-model="isZdyZwmc">自定义职务名称</Checkbox>
                <Input
                  v-if="isZdyZwmc"
                  
                  placeholder="请输入职务名称"
                  v-model="model.partyMember.partyDutyCode"
                ></Input>
                <common-select
                  v-if="!isZdyZwmc"
                  keys="PartyDutyCode"
                  v-model="model.partyMember.partyDutyCode"
                ></common-select>
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="任职日期" prop="partyMember.partyDutyDate">
                <DatePicker
                  style="width:100%"
                  :transfer="true"
                  
                  placeholder="选择日期"
                  v-model="model.partyMember.partyDutyDate"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="离职日期" prop="partyMember.partyDutyOutDate">
                <DatePicker
                  style="width:100%"
                  :transfer="true"
                  
                  placeholder="选择日期"
                  v-model="model.partyMember.partyDutyOutDate"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="职务级别" prop="partyMember.partyDutyClass">
                <common-select keys="PartyDutyClass" v-model="model.partyMember.partyDutyClass"></common-select>
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="任职届次" prop="partyMember.partyDutySession">
                <Input
                  
                  placeholder="请输入任职届次"
                  v-model="model.partyMember.partyDutySession"
                ></Input>
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="(法人单位)党组织书记身份类型" prop="partyMember.organSecretary">
                <common-select keys="PartyDutyClass" v-model="model.partyMember.organSecretary"></common-select>
              </FormItem>
            </Col>
            <Col :span="24">
              <FormItem label="党内职务说明" prop="partyMember.partyDutyIntro">
                <Input
                  type="textarea"
                  :rows="3"
                  
                  placeholder="请输入党内职务说明"
                  v-model="model.partyMember.partyDutyIntro"
                ></Input>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" :loading="modalLoading" @click="save(1)">保存</Button>
        <Button type="primary" @click="showModal1 = false">关闭</Button>
      </div>
    </Modal>
    <Modal
      v-model="showModal2"
      title="编辑行政职务信息"
      :closable="false"
      transfer
      :mask-closable="false"
      :loading="modalLoading"
      width="800px"
      class-name="blue-modal"
    >
      <div class="scroll modal-scroll">
        <Form ref="form2" :model="model" :rules="rules">
          <Row :gutter="30">
            <Col :span="12">
              <FormItem label="是否在任" prop="addition.adminDutyIsInOffice">
                <checkbox v-model="model.addition.adminDutyIsInOffice"></checkbox>
              </FormItem>
            </Col>
            <Col :span="24">
              <FormItem label="职务名称" prop="addition.adminDutyCode">
                <Checkbox v-model="isZdyZwmc">自定义职务名称</Checkbox>
                <Input
                  v-if="isZdyZwmc"
                  
                  placeholder="请输入职务名称"
                  v-model="model.addition.adminDutyCode"
                ></Input>
                <common-select
                  v-if="!isZdyZwmc"
                  keys="AdminDutyCode"
                  v-model="model.addition.adminDutyCode"
                ></common-select>
              </FormItem>
            </Col>
            <Col :span="24">
              <FormItem label="任职机构名称" prop="addition.adminDutyUnitName">
                <Input
                  
                  placeholder="请输入任职机构名称"
                  v-model="model.addition.adminDutyUnitName"
                ></Input>
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="任职日期" prop="addition.adminDutyDate">
                <DatePicker
                  style="width:100%"
                  :transfer="true"
                  
                  placeholder="选择日期"
                  v-model="model.addition.adminDutyDate"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="离职日期" prop="addition.adminDutyOutDate">
                <DatePicker
                  style="width:100%"
                  :transfer="true"
                  
                  placeholder="选择日期"
                  v-model="model.addition.adminDutyOutDate"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="兼任情况" prop="addition.adminPTSituation">
                <common-select keys="AdminDutyCode" v-model="model.addition.adminPTSituation"></common-select>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" :loading="modalLoading" @click="save(2)">保存</Button>
        <Button type="primary" @click="showModal2 = false">关闭</Button>
      </div>
    </Modal>
    <Modal
      v-model="showModal3"
      title="编辑“两代表一委员”信息"
      :closable="false"
      :mask-closable="false"
      transfer
      :loading="modalLoading"
      width="800px"
      class-name="blue-modal"
    >
      <div class="scroll modal-scroll">
        <Form ref="form3" :model="model" :rules="rules">
          <Row :gutter="30">
            <Col :span="12">
              <FormItem label="类别" prop="addition.coreType">
                <common-select keys="COREType" v-model="model.addition.coreType"></common-select>
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="当选日期" prop="addition.corElectedDate">
                <DatePicker
                  style="width:100%"
                  :transfer="true"
                  
                  placeholder="选择日期"
                  v-model="model.addition.corElectedDate"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="届满日期" prop="addition.corExpiryDate">
                <DatePicker
                  style="width:100%"
                  :transfer="true"
                  
                  placeholder="选择日期"
                  v-model="model.addition.corExpiryDate"
                ></DatePicker>
              </FormItem>
            </Col>
            <!-- <Col :span="12">
              <FormItem label="终止日期" prop="addition.corAbortDate">
                <DatePicker
                  style="width:100%"
                  :transfer="true"
                  
                  placeholder="选择日期"
                  v-model="model.addition.corAbortDate"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col :span="24">
              <FormItem label="终止原因" prop="addition.corAbortReason">
                <Input
                  type="textarea"
                  :rows="3"
                  
                  placeholder="请输入党内职务说明"
                  v-model="model.addition.corAbortReason"
                ></Input>
              </FormItem>
            </Col>-->
          </Row>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" :loading="modalLoading" @click="save(3)">保存</Button>
        <Button type="primary" @click="showModal3 = false">关闭</Button>
      </div>
    </Modal>
    <div class="organ-form-item" style="margin-bottom:20px">
      <Alert type="success">党内职务信息</Alert>
      <Table :columns="columns1" :data="data"></Table>
    </div>
    <!-- <div class="organ-form-item">
      <Alert type="info">行政职务信息</Alert>
      <Table :columns="columns2" :data="data"></Table>
    </div>-->
    <div class="organ-form-item">
      <Alert type="success">“两代表一委员”信息</Alert>
      <Table :columns="columns3" :data="data"></Table>
    </div>
  </div>
</template>
<script>
import {
  Form,
  FormItem,
  Input,
  DatePicker,
  Table,
  Modal,
  Checkbox
} from "iview";
import CommonSelect from "@/components/CommonSelect";
import PartyMember from "@/pages/model/PartyMember";
import { UpdatePartyMemberInfo } from "@/api/partyMember";
import OrganizationCascader from "@/components/OrganizationCascader";
export default {
  components: {
    Form,
    FormItem,
    Input,
    DatePicker,
    Table,
    Checkbox,
    Modal,
    CommonSelect,
    OrganizationCascader
  },
  props: {
    partyMember: {
      type: Object
    }
  },
  watch: {
    partyMember: {
      deep: true,
      handler() {
        this.model = new PartyMember(this.partyMember);
      }
    }
  },
  computed: {
    data() {
      return [this.partyMember];
    },
    columns1() {
      let that = this;
      return [
        {
          title: "任职党组织",
          tooltip: true,
          width: 500,
          key: "organName"
        },
        {
          title: "党内职务名称",
          tooltip: true,
          width: 400,
          render(h, { row }) {
            return h(
              "span",
              that.GetCodeTableValue(
                row.partyMember.partyDutyCode,
                "PartyDutyCode"
              ) || row.partyMember.partyDutyCode
            );
          }
        },
        {
          title: "任职日期",
          tooltip: true,
          width: 300,
          render(h, { row }) {
            return h(
              "span",
              that.FormatDate(row.partyMember.partyDutyDate, "yyyy-MM-dd")
            );
          }
        },
        // {
        //   title: "是否在任",
        //   tooltip: true,
        //   render(h, { row }) {
        //     return h("span", row.partyMember.partyDutyIsInOffice ? "是" : "否");
        //   }
        // },
        {
          title: "离职日期",
          tooltip: true,
          minWidth: 200,
          render(h, { row }) {
            return h(
              "span",
              that.FormatDate(row.partyMember.partyDutyOutDate, "yyyy-MM-dd")
            );
          }
        },
        {
          title: "操作",
          align: "right",
          fixed: "right",
        width: 200,
          className: "zdy-table-opration",
          render(h, { row }) {
            return h("span", [
              h(
                "a",
                {
                  on: {
                    click() {
                      that.showModal1 = true;
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ];
    },
    columns2() {
      let that = this;
      return [
        {
          title: "任职机构名称",
          tooltip: true,
          width: 500,
          key: "addition.adminDutyUnitName"
        },
        {
          title: "党内职务名称",
          tooltip: true,
          render(h, { row }) {
            return h(
              "span",
              that.GetCodeTableValue(
                row.addition.adminDutyCode,
                "AdminDutyCode"
              ) || row.addition.adminDutyCode
            );
          }
        },
        {
          title: "任职日期",
          tooltip: true,
          render(h, { row }) {
            return h(
              "span",
              that.FormatDate(row.addition.adminDutyDate, "yyyy-MM-dd")
            );
          }
        },
        {
          title: "是否在任",
          tooltip: true,
          render(h, { row }) {
            return h("span", row.addition.adminDutyIsInOffice ? "是" : "否");
          }
        },
        {
          title: "离职日期",
          tooltip: true,
          render(h, { row }) {
            return h(
              "span",
              that.FormatDate(row.addition.adminDutyOutDate, "yyyy-MM-dd")
            );
          }
        },
        {
          title: "兼任情况",
          tooltip: true,
          render(h, { row }) {
            return h(
              "span",
              that.GetCodeTableValue(
                row.addition.adminPTSituation,
                "AdminDutyCode"
              ) || row.addition.adminPTSituation
            );
          }
        },
        {
          title: "操作",
          align: "right",
          className: "zdy-table-opration",
          render(h, { row }) {
            return h("span", [
              h(
                "a",
                {
                  on: {
                    click() {
                      that.showModal2 = true;
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ];
    },
    columns3() {
      let that = this;
      return [
        {
          title: "类别",
          width: 500,
          tooltip: true,
          render(h, { row }) {
            return h(
              "span",
              that.GetCodeTableValue(row.addition.coreType, "COREType") ||
                row.addition.coreType
            );
          }
        },
        {
          title: "当选日期",
          tooltip: true,
          render(h, { row }) {
            return h(
              "span",
              that.FormatDate(row.addition.corElectedDate, "yyyy-MM-dd")
            );
          }
        },
        {
          title: "届满日期",
          tooltip: true,
          render(h, { row }) {
            return h(
              "span",
              that.FormatDate(row.addition.corExpiryDate, "yyyy-MM-dd")
            );
          }
        },
        // {
        //   title: "终止日期",
        //   tooltip: true,
        //   render(h, { row }) {
        //     return h(
        //       "span",
        //       that.FormatDate(row.addition.corAbortDate, "yyyy-MM-dd")
        //     );
        //   }
        // },
        // {
        //   title: "终止原因",
        //   tooltip: true,
        //   render(h, { row }) {
        //     return h("span", row.addition.corAbortReason);
        //   }
        // },
        {
          title: "操作",
          align: "right",
          fixed: "right",
          width: 200,
          className: "zdy-table-opration",
          render(h, { row }) {
            return h("span", [
              h(
                "a",
                {
                  on: {
                    click() {
                      that.showModal3 = true;
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ];
    }
  },
  data() {
    return {
      model: new PartyMember(),
      rules: PartyMember.getRules(),
      unit: {},
      isZdyZwmc: false,
      modalLoading: false,
      showModal1: false,
      showModal2: false,
      showModal3: false,
      rules: {}
    };
  },
  methods: {
    save(type) {
      this.$refs[`form${type}`].validate(valid => {
        if (valid) {
          this.modalLoading = true;
          UpdatePartyMemberInfo(PartyMember.getModel(this.model))
            .then(res => {
              this.$Message.success("保存成功");
              this[`showModal${type}`] = false;
              this.$emit("change");
            })
            .finally(() => {
              this.modalLoading = false;
            });
        }
      });
    }
  },
  mounted() {
    this.model = new PartyMember(this.partyMember);
  }
};
</script>
