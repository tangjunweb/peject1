<template>
  <div>
    <div class="organ-form-item">
      <Alert type="success">
        党组织班子成员信息
        <!-- <template slot="desc">
          <p class="org-form-alert-desc">本届班子当选日期：请在其他信息-党组织换届信息中维护</p>
          <p class="org-form-alert-desc">本届班子届满日期：请在其他信息-党组织换届信息中维护</p>
          <p class="org-form-alert-desc">本届班子产生方式：请在其他信息-党组织换届信息中维护</p>
        </template> -->
      </Alert>
      <div class="table-h-btn text-right">
        <Button @click="add1(null)" type="primary">新增</Button>
      </div>
      <Table :loading="loading1" :columns="columns1" :data="data1"></Table>
      <div class="text-right" style="padding:30px 0">
        <Page
          :current.sync="params1.pageIndex"
          :total="total1"
          :page-size="params1.MaxResultCount"
          class-name="lhyj-page"
        />
      </div>
    </div>
    <div class="organ-form-item">
      <Alert type="success">行政班子成员信息</Alert>
      <div class="table-h-btn text-right">
        <Button @click="add2(null)" type="primary">新增</Button>
      </div>
      <Table :loading="loading2" :columns="columns2" :data="data2"></Table>
      <div class="text-right" style="padding:30px 0">
        <Page
          :current.sync="params2.pageIndex"
          :total="total2"
          :page-size="params2.MaxResultCount"
          class-name="lhyj-page"
        />
      </div>
    </div>
    <div class="organ-form-item">
      <Alert type="success">“两代表一委员”信息</Alert>
      <div class="table-h-btn text-right">
        <Button @click="add3(null)" type="primary">新增</Button>
      </div>
      <Table :loading="loading3" :columns="columns3" :data="data3"></Table>
      <div class="text-right" style="padding:30px 0">
        <Page
          :current.sync="params3.pageIndex"
          :total="total3"
          :page-size="params3.MaxResultCount"
          class-name="lhyj-page"
        />
      </div>
    </div>
    <Modal
      v-model="showModal1"
      :title="modalTitle1"
      :loading="modalLoading1"
      class-name="blue-modal"
      transfer
      width="700px"
    >
      <div class="scroll modal-scroll">
        <Form :label-width="120" ref="form1" :model="model1" :rules="rules1">
          <FormItem label="姓名" prop="name">
            <Input :readonly="true" placeholder="请输入姓名" v-model="model1.name">
              <PartyMemberSelect
                @change="memeberChange"
                type="single"
                slot="append"
                v-model="model1.userId"
              >
                <Button type="default">选择党员</Button>
              </PartyMemberSelect>
            </Input>
          </FormItem>
          <FormItem label="公民身份号码" prop="idCard">
            <Input :readonly="true" placeholder="请输入公民身份号码" v-model="model1.idCard"></Input>
          </FormItem>
          <FormItem label="性别" prop="sex">
            <common-select :disabled="true" keys="Sex" v-model="model1.sex"></common-select>
          </FormItem>
          <FormItem label="学历" prop="education">
            <common-select :disabled="true" keys="Education" v-model="model1.education"></common-select>
          </FormItem>
          <FormItem label="是否在任" prop="organDuty.partyDutyIsInOffice">
            <checkbox v-model="model1.organDuty.partyDutyIsInOffice"></checkbox>
          </FormItem>
          <FormItem label="职务名称" prop="organDuty.partyDutyCode">
            <Checkbox v-model="isZdyZwmc">自定义职务名称</Checkbox>
            <Input
              v-if="isZdyZwmc"
            
              placeholder="请输入职务名称"
              v-model="model1.organDuty.partyDutyCode"
            ></Input>
            <common-select
              v-if="!isZdyZwmc"
              keys="PartyDutyCode"
              v-model="model1.organDuty.partyDutyCode"
            ></common-select>
            <p>（如职务代码中不包括党员所任职务可在【职务名称】中手动输入）</p>
          </FormItem>
          <FormItem label="任职日期" prop="organDuty.partyDutyDate">
            <DatePicker
              :transfer="true"
            
              placeholder="选择日期"
              v-model="model1.organDuty.partyDutyDate"
            ></DatePicker>
          </FormItem>
          <FormItem label="离职日期" prop="organDuty.partyDutyOutDate">
            <DatePicker
              :transfer="true"
            
              placeholder="选择日期"
              v-model="model1.organDuty.partyDutyOutDate"
            ></DatePicker>
          </FormItem>
          <FormItem label="职务级别" prop="organDuty.partyDutyClass">
            <common-select keys="PartyDutyClass" v-model="model1.organDuty.partyDutyClass"></common-select>
          </FormItem>
          <FormItem label="任职届次" prop="organDuty.partyDutySession">
            <Input placeholder="请输入任职届次" v-model="model1.organDuty.partyDutySession"></Input>
          </FormItem>
          <FormItem label="党内职务说明" prop="organDuty.partyDutyIntro">
            <Input
              type="textarea"
              :rows="3"
            
              placeholder="请输入党内职务说明"
              v-model="model1.organDuty.partyDutyIntro"
            ></Input>
          </FormItem>
          <FormItem label="(法人单位)党组织书记身份类型" prop="organDuty.organSecretary">
            <common-select keys="PartyDutyClass" v-model="model1.organDuty.organSecretary"></common-select>
          </FormItem>
        </Form>
      </div>
      <Spin fix v-if="modalSpin1"></Spin>
      <div slot="footer">
        <Button @click="showModal1 = false" type="primary">取消</Button>
        <Button :loading="modalLoading1" @click="save1" type="primary">保存</Button>
      </div>
    </Modal>
    <Modal
      v-model="showModal2"
      :title="modalTitle2"
      :loading="modalLoading2"
      class-name="blue-modal"
      transfer
      width="700px"
    >
      <div class="scroll modal-scroll">
        <Form :label-width="120" ref="form2" :model="model2" :rules="rules2">
          <FormItem label="姓名" prop="name">
            <Input
              :readonly="model2.userId !== ''"
            
              placeholder="请输入姓名"
              v-model="model2.name"
            >
              <PartyMemberSelect
                @change="memeberChange"
                type="single"
                slot="append"
                v-model="model2.userId"
              >
                <Button type="default">选择党员</Button>
              </PartyMemberSelect>
            </Input>
          </FormItem>
          <FormItem label="公民身份号码" prop="idCard">
            <Input
              :readonly="model2.userId !== ''"
            
              placeholder="请输入公民身份号码"
              v-model="model2.idCard"
            ></Input>
          </FormItem>
          <FormItem label="性别" prop="sex">
            <common-select :disabled="model2.userId !== ''" keys="Sex" v-model="model2.sex"></common-select>
          </FormItem>
          <FormItem label="学历" prop="education">
            <common-select
              :disabled="model2.userId !== ''"
              keys="Education"
              v-model="model2.education"
            ></common-select>
          </FormItem>
          <FormItem label="是否在任" prop="adminDuty.adminDutyIsInOffice">
            <checkbox v-model="model2.adminDuty.partyDutyIsInOffice"></checkbox>
          </FormItem>
          <FormItem label="职务名称" prop="adminDuty.adminDutyCode">
            <Checkbox v-model="isZdyZwmc">自定义职务名称</Checkbox>
            <Input
              v-if="isZdyZwmc"
            
              placeholder="请输入职务名称"
              v-model="model2.adminDuty.adminDutyCode"
            ></Input>
            <common-select
              v-if="!isZdyZwmc"
              keys="AdminDutyCode"
              v-model="model2.adminDuty.adminDutyCode"
            ></common-select>
            <p>（如职务代码中不包括党员所任职务可在【职务名称】中手动输入）</p>
          </FormItem>
          <FormItem label="任职日期" prop="adminDuty.adminDutyDate">
            <DatePicker
              :transfer="true"
            
              placeholder="选择日期"
              v-model="model2.adminDuty.adminDutyDate"
            ></DatePicker>
          </FormItem>
          <FormItem label="离职日期" prop="adminDuty.adminDutyOutDate">
            <DatePicker
              :transfer="true"
            
              placeholder="选择日期"
              v-model="model2.adminDuty.adminDutyOutDate"
            ></DatePicker>
          </FormItem>
          <FormItem label="行政职务兼任情况" prop="adminDuty.adminPTSituation">
            <common-select keys="AdminDutyCode" v-model="model2.adminDuty.adminPTSituation"></common-select>
          </FormItem>
          <FormItem label="生日" prop="birthDay">
            <DatePicker
              :transfer="true"
            
              placeholder="选择日期"
              v-model="model2.adminDuty.birthDay"
            ></DatePicker>
          </FormItem>
          <FormItem label="联系电话" prop="mobilePhone">
            <Input placeholder="请输入联系电话" v-model="model2.mobilePhone"></Input>
          </FormItem>
        </Form>
      </div>
      <Spin fix v-if="modalSpin2"></Spin>
      <div slot="footer">
        <Button @click="showModal2 = false" type="primary">取消</Button>
        <Button :loading="modalLoading2" @click="save2" type="primary">保存</Button>
      </div>
    </Modal>
    <Modal
      v-model="showModal3"
      :title="modalTitle3"
      :loading="modalLoading3"
      class-name="blue-modal"
      transfer
      width="700px"
    >
      <div class="scroll modal-scroll">
        <Form :label-width="120" ref="form3" :model="model3" :rules="rules3">
          <FormItem label="姓名" prop="name">
            <Input
              :readonly="model3.userId !== ''"
            
              placeholder="请输入姓名"
              v-model="model3.name"
            >
              <PartyMemberSelect
                @change="memeberChange"
                type="single"
                slot="append"
                v-model="model3.userId"
              >
                <Button type="default">选择党员</Button>
              </PartyMemberSelect>
            </Input>
          </FormItem>
          <FormItem label="公民身份号码" prop="idCard">
            <Input
              :readonly="model3.userId !== ''"
            
              placeholder="请输入公民身份号码"
              v-model="model3.idCard"
            ></Input>
          </FormItem>
          <FormItem label="性别" prop="sex">
            <common-select :disabled="model3.userId !== ''" keys="Sex" v-model="model3.sex"></common-select>
          </FormItem>
          <FormItem label="学历" prop="education">
            <common-select
              :disabled="model3.userId !== ''"
              keys="Education"
              v-model="model3.education"
            ></common-select>
          </FormItem>
          <FormItem label="类别" prop="twoOneDuty.coreType">
            <common-select keys="COREType" v-model="model3.twoOneDuty.adminDutyCode"></common-select>
          </FormItem>
          <FormItem label="当选日期" prop="twoOneDuty.corElectedDate">
            <DatePicker
              :transfer="true"
            
              placeholder="选择日期"
              v-model="model3.twoOneDuty.corElectedDate"
            ></DatePicker>
          </FormItem>
          <FormItem label="届满日期" prop="twoOneDuty.corExpiryDate">
            <DatePicker
              :transfer="true"
            
              placeholder="选择日期"
              v-model="model3.twoOneDuty.corExpiryDate"
            ></DatePicker>
          </FormItem>
          <FormItem label="是否在任" prop="twoOneDuty.coreIsInOffice">
            <checkbox v-model="model3.twoOneDuty.coreIsInOffice"></checkbox>
          </FormItem>
          <!-- <FormItem label="终止日期" prop="twoOneDuty.corExpiryDate">
            <DatePicker
              :transfer="true"
            
              placeholder="选择日期"
              v-model="model3.twoOneDuty.corExpiryDate"
            ></DatePicker>
          </FormItem>
          <FormItem label="终止原因" prop="twoOneDuty.corAbortReason">
            <Input
              type="textarea"
              :rows="3"
            
              placeholder="请输入党内职务说明"
              v-model="model3.twoOneDuty.corAbortReason"
            ></Input>
          </FormItem> -->
        </Form>
      </div>
      <Spin fix v-if="modalSpin3"></Spin>
      <div slot="footer">
        <Button @click="showModal3 = false" type="primary">取消</Button>
        <Button :loading="modalLoading3" @click="save3" type="primary">保存</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import {
  Table,
  Page,
  Modal,
  FormItem,
  Input,
  Form,
  Checkbox,
  DatePicker
} from "iview";
import {
  GetOrganAdminTeamMeberList,
  GetOrganPartyTeamMeberList,
  GetOrganTwoOneTeamMeberList,
  UpdateOrganTeamMeberDtoAsync,
  CreateOrganTeamMemberAsync,
  DeleteOrganTeamMemberGuidAsync
} from "@/api/partyOrganizationService";
import CommonSelect from "@/components/CommonSelect";
import OrganTeamMember from "@/pages/model/OrganTeamMember";
import PartyMemberSelect from "@/pages/common/PartyMemberSelect";
import { GetTeamMemberDetail } from "@/api/partyMember";
export default {
  components: {
    Table,
    Page,
    Modal,
    FormItem,
    Form,
    Input,
    Checkbox,
    DatePicker,
    PartyMemberSelect,
    CommonSelect
  },
  props: {
    organization: {
      type: Object
    }
  },
  watch: {
    params1: {
      deep: true,
      handler() {
        this.loadData1();
      }
    },
    params2: {
      deep: true,
      handler() {
        this.loadData2();
      }
    },
    params3: {
      deep: true,
      handler() {
        this.loadData3();
      }
    }
  },
  data() {
    let that = this;
    return {
      isZdyZwmc: false,
      showModal1: false,
      showModal2: false,
      showModal3: false,
      modalTitle1: "",
      modalTitle2: "",
      modalTitle3: "",
      modalLoading1: false,
      modalLoading2: false,
      modalLoading3: false,
      model1: new OrganTeamMember(),
      model2: new OrganTeamMember(),
      model3: new OrganTeamMember(),
      rules1: OrganTeamMember.getRules(),
      rules2: OrganTeamMember.getRules(),
      rules3: OrganTeamMember.getRules(),
      modalSpin1: false,
      modalSpin2: false,
      modalSpin3: false,
      data1: [],
      loading1: false,
      params1: {
        MaxResultCount: 5,
        SkipCount: 0,
        pageIndex: 1
      },
      total1: 0,
      columns1: [
        {
          title: "姓名",
          key: "name",
          tooltip: true
        },
        {
          title: "身份证号码",
          key: "idCard",
          tooltip: true
        },
        {
          title: "职务级别",
          tooltip: true,
          render(h, { row }) {
            return h(
              "span",
              that.GetCodeTableValue(row.partyDutyClass, "PartyDutyClass")
            );
          }
        },
        {
          title: "任职日期",
          tooltip: true,
          render(h, { row }) {
            return h("span", that.FormatDate(row.partyDutyDate, "yyyy-MM-dd"));
          }
        },
        {
          title: "是否在任",
          tooltip: true,
          render(h, { row }) {
            return h("span", row.partyDutyIsInOffice ? "是" : "否");
          }
        },
        {
          title: "操作",
          align: "right",
          width: 120,
          className: "zdy-table-opration",
          render(h, { row }) {
            return h("span", [
              h(
                "a",
                {
                  on: {
                    click() {
                      that.add1(row);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "a",
                {
                  on: {
                    click() {
                      that.del(row.id, 1);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data2: [],
      loading2: false,
      params2: {
        MaxResultCount: 5,
        SkipCount: 0,
        pageIndex: 1
      },
      total2: 0,
      columns2: [
        {
          title: "姓名",
          key: "name",
          tooltip: true
        },
        {
          title: "身份证号码",
          key: "idCard",
          tooltip: true
        },
        {
          title: "职务名称",
          tooltip: true,
          render(h, { row }) {
            return h(
              "span",
              that.GetCodeTableValue(row.adminDutyCode, "AdminDutyCode") ||
                row.adminDutyCode
            );
          }
        },
        {
          title: "任职日期",
          tooltip: true,
          render(h, { row }) {
            return h("span", that.FormatDate(row.adminDutyDate, "yyyy-MM-dd"));
          }
        },
        {
          title: "是否在任",
          tooltip: true,
          render(h, { row }) {
            return h("span", row.adminDutyIsInOffice ? "是" : "否");
          }
        },
        {
          title: "兼任情况",
          tooltip: true,
          render(h, { row }) {
            return h(
              "span",
              that.GetCodeTableValue(row.adminPTSituation, "AdminDutyCode") ||
                row.adminPTSituation
            );
          }
        },
        {
          title: "是否党员",
          key: "",
          tooltip: true
        },
        {
          title: "操作",
          align: "right",
          width: 120,
          className: "zdy-table-opration",
          render(h, { row }) {
            return h("span", [
              h(
                "a",
                {
                  on: {
                    click() {
                      that.add2(row);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "a",
                {
                  on: {
                    click() {
                      that.del(row.id, 2);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data3: [],
      loading3: false,
      params3: {
        MaxResultCount: 5,
        SkipCount: 0,
        pageIndex: 1
      },
      total3: 0,
      columns3: [
        {
          title: "姓名",
          key: "name",
          tooltip: true
        },
        {
          title: "身份证号码",
          key: "idCard",
          tooltip: true
        },
        {
          title: "类别",
          tooltip: true,
          render(h, { row }) {
            return h("span", that.GetCodeTableValue(row.coreType, "COREType"));
          }
        },
        {
          title: "当选日期",
          tooltip: true,
          render(h, { row }) {
            return h("span", that.FormatDate(row.corElectedDate, "yyyy-MM-dd"));
          }
        },
        {
          title: "届满日期",
          tooltip: true,
          render(h, { row }) {
            return h("span", that.FormatDate(row.corExpiryDate, "yyyy-MM-dd"));
          }
        },
        {
          title: "是否在任",
          tooltip: true,
          render(h, { row }) {
            return h("span", row.coreIsInOffice ? "是" : "否");
          }
        },
        {
          title: "操作",
          align: "right",
          width: 120,
          className: "zdy-table-opration",
          render(h, { row }) {
            return h("span", [
              h(
                "a",
                {
                  on: {
                    click() {
                      that.add3(row);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "a",
                {
                  on: {
                    click() {
                      that.del(row.id, 3);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    loadData1() {
      let params = JSON.parse(JSON.stringify(this.params1));
      params.SkipCount =
        this.params1.pageIndex * this.params1.MaxResultCount -
        this.params1.MaxResultCount;
      params.id = this.organization.id;
      this.loading1 = true;
      GetOrganPartyTeamMeberList(params)
        .then(res => {
          this.total1 = res.length;
          this.data1 = res;
        })
        .finally(() => {
          this.loading1 = false;
        });
    },
    loadData2() {
      let params = JSON.parse(JSON.stringify(this.params2));
      params.SkipCount =
        this.params2.pageIndex * this.params2.MaxResultCount -
        this.params2.MaxResultCount;
      params.id = this.organization.id;
      this.loading2 = true;
      GetOrganAdminTeamMeberList(params)
        .then(res => {
          this.total2 = res.length;
          this.data2 = res;
        })
        .finally(() => {
          this.loading2 = false;
        });
    },
    loadData3() {
      let params = JSON.parse(JSON.stringify(this.params3));
      params.SkipCount =
        this.params3.pageIndex * this.params3.MaxResultCount -
        this.params3.MaxResultCount;
      params.id = this.organization.id;
      this.loading3 = true;
      GetOrganTwoOneTeamMeberList(params)
        .then(res => {
          this.total3 = res.length;
          this.data3 = res;
        })
        .finally(() => {
          this.loading3 = false;
        });
    },
    save1() {
      this.$refs["form1"].validate(valid => {
        if (valid) {
          this.modalLoading1 = true;
          let fn = this.model1.id
            ? UpdateOrganTeamMeberDtoAsync
            : CreateOrganTeamMemberAsync;
          let title = this.model1.id
            ? "班子成员修改成功！"
            : "班子成员添加成功！";
          this.model1.organId = this.organization.id;
          this.model1.teamMemberType = 1;
          fn(OrganTeamMember.getModel(this.model1))
            .then(res => {
              this.$Message.success(title);
              this.loadData1();
              this.showModal1 = false;
            })
            .finally(() => {
              this.modalLoading1 = false;
            });
        }
      });
    },
    save2() {
      this.$refs["form2"].validate(valid => {
        if (valid) {
          this.modalLoading2 = true;
          let fn = this.model2.id
            ? UpdateOrganTeamMeberDtoAsync
            : CreateOrganTeamMemberAsync;
          let title = this.model2.id
            ? "班子成员修改成功！"
            : "班子成员添加成功！";
          this.model2.organId = this.organization.id;
          this.model2.teamMemberType = 2;
          fn(OrganTeamMember.getModel(this.model2))
            .then(res => {
              this.$Message.success(title);
              this.loadData2();
              this.showModal2 = false;
            })
            .finally(() => {
              this.modalLoading2 = false;
            });
        }
      });
    },
    save3() {
      this.$refs["form3"].validate(valid => {
        if (valid) {
          this.modalLoading3 = true;
          let fn = this.model3.id
            ? UpdateOrganTeamMeberDtoAsync
            : CreateOrganTeamMemberAsync;
          let title = this.model3.id
            ? '"两代表一委员"修改成功！'
            : '"两代表一委员"添加成功！';
          this.model3.organId = this.organization.id;
          this.model3.teamMemberType = 3;
          fn(OrganTeamMember.getModel(this.model3))
            .then(res => {
              this.$Message.success(title);
              this.loadData3();
              this.showModal3 = false;
            })
            .finally(() => {
              this.modalLoading3 = false;
            });
        }
      });
    },
    add1(data = null) {
      this.showModal1 = true;
      this.modalTitle1 = data ? "编辑党组织班子成员" : "创建党组织班子成员";
      if (data) {
        this.model1 = new OrganTeamMember({
          organId: this.organization.id,
          organDuty: data
        });
      } else {
        this.model1 = new OrganTeamMember({ organId: this.organization.id });
      }
      delete this.model1.twoOneDuty;
      delete this.model1.adminDuty;
    },
    add2(data = null) {
      this.showModal2 = true;
      this.modalTitle2 = data ? "编辑行政班子成员" : "创建行政班子成员";
      if (data) {
        this.model2 = new OrganTeamMember({
          organId: this.organization.id,
          adminDuty: data
        });
      } else {
        this.model2 = new OrganTeamMember({ organId: this.organization.id });
      }
      delete this.model2.twoOneDuty;
      delete this.model2.organDuty;
    },
    add3(data = null) {
      this.showModal3 = true;
      this.modalTitle3 = data ? "编辑‘两代表一委员’" : "创建‘两代表一委员’";
      if (data) {
        this.model3 = new OrganTeamMember({
          organId: this.organization.id,
          twoOneDuty: data
        });
      } else {
        this.model3 = new OrganTeamMember({ organId: this.organization.id });
      }
      delete this.model3.organDuty;
      delete this.model3.adminDuty;
    },
    memeberChange(member) {
      if (this.showModal1) {
        this.modalSpin1 = true;
      } else if (this.showModal2) {
        this.modalSpin2 = true;
      } else {
        this.modalSpin3 = true;
      }
      GetTeamMemberDetail({ id: member.id })
        .then(res => {
          if (res.organDuty) {
            res.organDuty.partyDutyIsInOffice = !!res.organDuty
              .partyDutyIsInOffice;
          }
          if (res.twoOneDuty) {
            res.twoOneDuty.coreIsInOffice = !!res.twoOneDuty.coreIsInOffice;
          }
          if (res.adminDuty) {
            res.adminDuty.adminDutyIsInOffice = !!res.adminDuty
              .adminDutyIsInOffice;
          }
          let d = new OrganTeamMember(res);
          if (this.showModal1) {
            delete d.twoOneDuty;
            delete d.adminDuty;
            this.model1 = d;
          } else if (this.showModal2) {
            delete d.twoOneDuty;
            delete d.organDuty;
            this.model2 = d;
          } else {
            delete d.organDuty;
            delete d.adminDuty;
            this.model3 = d;
          }
        })
        .finally(() => {
          if (this.showModal1) {
            this.modalSpin1 = false;
          } else if (this.showModal2) {
            this.modalSpin2 = false;
          } else {
            this.modalSpin3 = false;
          }
        });
      // this.model1.name = member.name;
      // this.model1.idCard = member.idCard;
      // this.model1.sex = member.sex;
      // this.model1.education = member.education;
    },
    del(id, type) {
      this.$Modal.confirm({
        title: "系统提示",
        content: "确认删除？",
        onOk: () => {
          DeleteOrganTeamMemberGuidAsync({
            id
          }).then(res => {
            switch (type) {
              case 1:
                this.loadData1();
                break;
              case 2:
                this.loadData2();
                break;
              case 3:
                this.loadData3();
                break;
            }
            this.$Message.success("操作成功");
          });
        }
      });
    }
  },
  mounted() {
    this.loadData1();
    this.loadData2();
    this.loadData3();
  }
};
</script>
<style lang="less">
.table-h-btn {
  margin: 15px 0;
}
</style>
