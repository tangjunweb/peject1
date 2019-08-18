<template>
  <div class="organization-life-plan-create">
    <Spin fix v-if="loading"></Spin>
    <Card class="border" :dis-hover="true">
      <Form ref="form" :model="model" :rules="rules" label-position="left">
        <Row :gutter="30" type="flex">
          <Col :span="10">
          <FormItem label="时间范围" prop="timeType">
            <div style="width:100%;display:inline-block">
              <Row :gutter="15">
                <Col :span="6">
                <common-select :disabled='true' keys="EnumTeachingPlanTimeType" v-model="model.timeType"></common-select>
                </Col>
                <Col :span="6">
                <DatePicker @on-change="ychange" :value="model.year" type="year" transfer placeholder="请选择年份"></DatePicker>
                </Col>
                <Col :span="6" v-if="model.timeType == 2">
                <Select placeholder="请选择季度" v-model="model.quarte">
                  <Option label="第一季度" :value="1"></Option>
                  <Option label="第二季度" :value="2"></Option>
                  <Option label="第三季度" :value="3"></Option>
                  <Option label="第四季度" :value="4"></Option>
                </Select>
                </Col>
                <Col :span="6" v-if="model.timeType == 1">
                <DatePicker @on-change="mchange" format="MM" :value="model.month" type="month" transfer placeholder="请选择月份"></DatePicker>
                </Col>
              </Row>
            </div>
          </FormItem>
          </Col>
          <Col :span="6">
          <FormItem label="会议标题" prop="title">
            <Input v-model="model.title" placeholder="请填写会议标题"></Input>
          </FormItem>
          </Col>
          <Col :span="8">
          <FormItem label="会议地址" prop="address">
            <MapAddressSelect @change="addressChange" v-model="model.address"></MapAddressSelect>
          </FormItem>
          </Col>
          <Col :span="6">
          <FormItem label="开始时间" prop="startTime">
            <DatePicker transfer format="yyyy-MM-dd HH:mm:ss" @on-change="model.startTime = $event" v-model="model.startTime" key="startTime" type="datetime" placeholder="请选择时间"></DatePicker>
          </FormItem>
          </Col>
          <Col :span="6">
          <FormItem label="结束时间" prop="endTime">
            <DatePicker transfer @on-change="model.endTime = $event" v-model="model.endTime" type="datetime" key="endTime" placeholder="请选择时间"></DatePicker>
          </FormItem>
          </Col>
          <Col :span="6">
          <FormItem label="是否主题党日" prop="isFixedDay">
            <Checkbox v-model="model.isFixedDay" @on-change="isFixedDaychange"></Checkbox>
          </FormItem>
          </Col>
          <Col :span="24">
          <FormItem>
            <Button type="primary" @click="createMeet">新增会议</Button>
          </FormItem>
          </Col>
          <Col :span="24" v-if="model.meetingPlanDetailsDtos.length">
          <Table :columns="columns" :data="model.meetingPlanDetailsDtos"></Table>
          </Col>
          <Col :span="24" class-name="text-center" style="margin-top:30px">
          <Button :loading="btnLoading" type="primary" @click="save" ghost>保存</Button>
          </Col>
        </Row>
      </Form>
    </Card>
    <Modal :value="showModal" title="会议" :closable="false" :mask-closable="false" width="500px" class="modal-form">
      <Form ref="formA" :model="planModel" :rules="planRules" label-position="left">
        <FormItem label="会议类型" prop="meetingType">
          <!-- <common-select keys="MeetingType" v-model="planModelMeetingType"></common-select> -->

          <Select transfe :value="planModelMeetingType" @on-change="planModelMeetingTypeChange">
            <Option v-for="item in meetingTypeLists" :value="item.value" :key="item.value">{{ item.label}}</Option>
          </Select>
        </FormItem>

        <FormItem v-if="planModelMeetingType == 'MeetingType-100' || planModelMeetingType == 'MeetingType-104'" label="是否上党课">
          <Checkbox v-model="planModel.isPartyClasses"></Checkbox>
        </FormItem>

        <FormItem label="主持人（如非系统内党员，请直接填写主持人姓名）" prop="operUser"
          v-if="planModelMeetingType == 'MeetingType-100' || planModelMeetingType == 'MeetingType-101' || planModelMeetingType == 'MeetingType-102'">
          <Input v-model="planModel.operUserName" placeholder="请选择主持人">
          <PartyMemberSelect @change="operUserChange" type="single" slot="append" v-model="planModel.operUser">
            <Button type="default" ghost>选择主持人</Button>
          </PartyMemberSelect>
          </Input>
        </FormItem>
        <FormItem label="会议内容" prop="content" v-if="planModelMeetingType == 'MeetingType-100' || planModelMeetingType == 'MeetingType-101' || planModelMeetingType == 'MeetingType-102'">
          <Input type="textarea" :row="3" v-model="planModel.content" placeholder="请输入会议内容"></Input>
        </FormItem>
        <FormItem label="参会人员" prop="meetingPlanDetailsUsersDtos"
          v-if="planModelMeetingType == 'MeetingType-100' || planModelMeetingType == 'MeetingType-101' || planModelMeetingType == 'MeetingType-102'">
          <Input :readonly="true" required placeholder="请选择参会人员" v-model="meetingPlanDetailsUsersDtosText">
          <PartyMemberSelectByType type="multiple" slot="append" v-model="planModel.meetingPlanDetailsUsersDtos" :meetingType="planModelMeetingType">
            <Button type="default" ghost>参会人员</Button>
          </PartyMemberSelectByType>
          </Input>
        </FormItem>

        <!-- 党课 -->
        <FormItem label="授课人（如非系统内师资，请直接填写授课人姓名）" prop="operUser" v-if="planModelMeetingType == 'MeetingType-103'">
          <Input placeholder="请选择授课人" v-model="planModel.operUserName">
          <PartyMemberSelect @change="operUserChange" type="single" slot="append" v-model="planModel.operUser" :meetingType="planModelMeetingType">
            <Button type="default" ghost>选择授课人</Button>
          </PartyMemberSelect>
          </Input>
        </FormItem>
        <FormItem label="授课内容" prop="content" v-if="planModelMeetingType == 'MeetingType-103'">
          <Input type="textarea" v-model="planModel.content" :row="3" placeholder="请输入授课内容"></Input>
        </FormItem>
        <FormItem label="听课人员" prop="meetingPlanDetailsUsersDtos" v-if="planModelMeetingType == 'MeetingType-103'">
          <Input :readonly="true" placeholder="请选择听课人员" v-model="meetingPlanDetailsUsersDtosText">
          <PartyMemberSelectByType type="multiple" slot="append" v-model="planModel.meetingPlanDetailsUsersDtos" :meetingType="planModelMeetingType">
            <Button type="default" ghost>听课人员</Button>
          </PartyMemberSelectByType>
          </Input>
        </FormItem>
        <!-- 党内集中活动 -->
        <FormItem label="活动内容" prop="content" v-if="planModelMeetingType == 'MeetingType-104'">
          <Input type="textarea" v-model="planModel.content" :row="3" placeholder="请输入活动内容"></Input>
        </FormItem>
        <FormItem label="参加人员" prop="meetingPlanDetailsUsersDtos" v-if="planModelMeetingType == 'MeetingType-104'">
          <Input :readonly="true" placeholder="请选择参加人员" v-model="meetingPlanDetailsUsersDtosText">
          <PartyMemberSelectByType type="multiple" slot="append" v-model="planModel.meetingPlanDetailsUsersDtos" :meetingType="planModelMeetingType">
            <Button type="default" ghost>参加人员</Button>
          </PartyMemberSelectByType>
          </Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="add">保存</Button>
        <Button @click="showModal = false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { Card, Form, FormItem, Input, DatePicker, Select, Option, TimePicker, Checkbox, Modal, Table } from 'iview';
import OrganizationLifePlan from '@/pages/model/OrganizationLifePlan';
import MapAddressSelect from '@/components/MapAddressSelect';
import { CreatePartyMeetingPlanInfo, ModifyPartyMeetingPlanInfo, GetPartyMeetingPlanInfoById, GetOrganBranchTeamMeberList, GetOrganizationUser, GetOrganGroupUserList } from '@/api/partyOrganizationService';

import PartyMemberSelect from '@/pages/common/PartyMemberSelect';
import PartyMemberSelectByType from '@/pages/common/PartyMemberSelectByType';
import OrganizationMultipeSelect from '@/components/OrganizationMultipeSelect';
import CommonSelect from '@/components/CommonSelect';
import { setTimeout } from 'timers';
export default {
  components: {
    Card,
    Form,
    FormItem,
    Input,
    OrganizationMultipeSelect,
    DatePicker,
    Select,
    Option,
    TimePicker,
    Checkbox,
    CommonSelect,
    MapAddressSelect,
    Modal,
    PartyMemberSelect,
    PartyMemberSelectByType,
    Table
  },
  data() {
    let that = this;
    return {
      model: new OrganizationLifePlan(),
      rules: OrganizationLifePlan.getRules(that),
      loading: false,
      showModal: false,
      btnLoading: false,
      planModelMeetingType: '', //会议类型
      optionType: 'add',
      optionIndex: 0,
      columns: [
        {
          title: '会议类型',
          render(h, { row }) {
            return h('span', that.GetCodeTableValue(row.meetingType, 'MeetingType'));
          }
        },
        {
          title: '主持人/授课人',
          render(h, { row }) {
            return h('span', row.operUser.id ? row.operUser.name : row.operUserName);
          }
        },
        {
          title: '参会人员/听课人员',
          tooltip: 'true',
          ellipsis: true,
          render(h, { row }) {
            return h('span', row.meetingPlanDetailsUsersDtos.map(e => e.name).join(','));
          }
        },
        {
          tooltip: 'true',
          title: '会议内容',
          key: 'content'
        },
        {
          title: '操作',
          tooltip: true,
          align: 'right',
          className: 'zdy-table-opration',
          render(h, params) {
            let arr = [
              h(
                'a',
                {
                  on: {
                    click() {
                      that.optionType = 'edit';
                      that.optionIndex = params.index;
                      params.row.meetingPlanDetailsUsersDtos.map(e => {
                        e.id = e.userId || e.id;
                      });

                      that.showModal = true;
                      that.planModelMeetingType = params.row.meetingType;
                      setTimeout(() => {
                        that.planModel = JSON.parse(JSON.stringify(params.row));
                      }, 300);
                    }
                  }
                },
                '编辑'
              ),
              h(
                'a',
                {
                  on: {
                    click() {
                      that.$Modal.confirm({
                        title: '系统提示',
                        content: `确认删除会议'${that.GetCodeTableValue(params.row.meetingType, 'MeetingType')}'？`,
                        onOk: () => {
                          that.model.meetingPlanDetailsDtos.splice(params.index, 1);
                        }
                      });
                    }
                  }
                },
                '删除'
              )
            ];
            return h('span', arr);
          }
        }
      ],
      planModel: {
        operUser: {},
        meetingPlanDetailsUsersDtos: [],
        content: ''
      },
      // meetingPlanDetailsUsersDtosText: '',
      planRules: {
        meetingPlanDetailsUsersDtos: [
          {
            type: 'array',
            required: true,
            trigger: 'change',
            message: '请选择参会人员'
          }
        ],
        content: [
          {
            type: 'string',
            required: true,
            trigger: 'blur',
            message: '请输入会议内容'
          }
        ]
      }
    };
  },
  watch: {
    planModelMeetingType(n) {
      this.resetPlanForm();
    }
  },
  computed: {
    meetingTypeLists() {
      let meetingTypeLists = JSON.parse(JSON.stringify(this.$store.state.baseCode)).MeetingType;
      if (!this.model.isFixedDay) {
        meetingTypeLists = meetingTypeLists.filter(item => item.value != 'MeetingType-104');
      // 是否成立支委会
      if (!this.$store.state.session.IsOrganBranch) meetingTypeLists = meetingTypeLists.filter(item => item.value != 'MeetingType-101');
      // 是否成立党小组
      if (!this.$store.state.session.IsOrganGroup ) meetingTypeLists = meetingTypeLists.filter(item => item.value != 'MeetingType-102');
      }
      return meetingTypeLists;
    },
    meetingPlanDetailsUsersDtosText() {
      let length = this.planModel.meetingPlanDetailsUsersDtos.length;
      if (length == 0) return '请添加人员';
      else return `已选择${length}人`;
    }
  },
  methods: {
    isFixedDaychange(val) {
      if (!val) {
        let state = this.dealIsFixedDay();
        if (!state) {
          this.$nextTick(_ => {
            this.$set(this.model, 'isFixedDay', true);
          });
        }
      }
    },
    dealIsFixedDay() {
      if (this.model.meetingPlanDetailsDtos.find(item => item.meetingType == 'MeetingType-104' && !this.model.isFixedDay)) {
        this.$Message.warning('主题党日不能创建党内集中活动，请先删除已创建党内集中活动');
        return false;
      } else {
        return true;
      }
    },

    planModelMeetingTypeChange(val) {
      this.planModelMeetingType = val;
      this.planModel.meetingPlanDetailsUsersDtos = [];
      let fun, params;
      if (val == 'MeetingType-100' || val == 'MeetingType-103' || val == 'MeetingType-104') {
        fun = GetOrganizationUser;
        params = { MeetingType: val };
      } else if (val == 'MeetingType-101') {
        fun = GetOrganBranchTeamMeberList;
        params = { Id: this.$store.state.session.organId };
      } else if (val == 'MeetingType-102') {
        fun = GetOrganGroupUserList;
        params = {};
      }
      fun(params).then(res => {
        res.forEach(item => {
          item.id = item.userId;
        });
        this.planModel.meetingPlanDetailsUsersDtos = res;
      });
    },
    createMeet() {
      this.optionType = 'add';
      this.planModelMeetingType = '';
      this.showModal = true;
    },
    resetPlanForm() {
      this.planModel.meetingType = '';
      this.planModel.isPartyClasses = '';
      this.planModel.operUser = '';
      this.planModel.operUserName = '';
      // this.planModel.meetingPlanDetailsUsersDtos = [];
      // this.meetingPlanDetailsUsersDtosText = '';
      this.planModel.content = '';
      this.$refs['formA'].resetFields();
    },
    add() {
      if (this.model.isFixedDay && !this.planModelMeetingType) {
        this.$Message.warning('请选择会议类型');
        return;
      }
      this.$refs['formA'].validate(valid => {
        if (valid) {
          this.planModel.meetingType = this.planModelMeetingType;
          if (this.optionType == 'add') {
            this.model.meetingPlanDetailsDtos.push(JSON.parse(JSON.stringify(this.planModel)));
          } else {
            let meetingPlanDetailsDtos = JSON.parse(JSON.stringify(this.model.meetingPlanDetailsDtos));
            meetingPlanDetailsDtos[this.optionIndex] = JSON.parse(JSON.stringify(this.planModel));
            this.model.meetingPlanDetailsDtos = meetingPlanDetailsDtos;
          }
          this.showModal = false;
          this.meetingPlanDetailsUsersDtosText = '';
        }
      });
    },
    addressChange(address) {
      this.model.latitude = address.latitude;
      this.model.longitude = address.longitude;
    },
    operUserChange(member) {

      this.planModel.operUser.id = member.id;
      this.planModel.operUser.name = member.name;
      this.planModel.operUserName=member.name;
    },
    ychange(year) {
      this.model.year = year;
    },
    mchange(month) {
      this.model.month = month;
    },
    save() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (!this.model.year) {
            this.$Message.warning('请选择年份');
          } else if (this.model.timeType == 2 && !this.model.quarte) {
            this.$Message.warning('请选择季度');
          } else if (this.model.timeType == 1 && !this.model.month) {
            this.$Message.warning('请选择月份');
          } else if (!this.model.meetingPlanDetailsDtos.length && this.model.isFixedDay) {
            this.$Message.warning('请新增会议');
          } else {
            let fn = this.$route.query.id ? ModifyPartyMeetingPlanInfo : CreatePartyMeetingPlanInfo;
            let message = this.$route.query.id ? '更新成功' : '添加成功';
            this.btnLoading = true;
            let params = OrganizationLifePlan.setModels(this.model);
            params.meetingPlanDetailsDtos.forEach(child => {
              child.meetingPlanDetailsUsersDtos.forEach(item => {
                delete item.id;
              });
            });

            fn(params)
              .then(res => {
                this.$Message.success(message);
                this.$router.push({ path: '/organization/organizationallife/plan/home' });
              })
              .finally(() => {
                this.btnLoading = false;
              });
          }
        }
      });
    }
  },
  mounted() {
    let that = this;
    let id = this.$route.query.id;
    if (id) {
      this.loading = true;
      GetPartyMeetingPlanInfoById({ id })
        .then(res => {
          res.year = res.year && res.year.toString();
          res.month = res.month && res.month.toString();
          res.timeType = res.timeType && res.timeType.toString();
          // res.meetingPlanDetailsDtos.forEach(child=>{
          //     // child.meetingPlanDetailsUsersDtos.forEach(item=>{
          //     //     item.userId=item.id
          //     // });
          // })

          that.model = OrganizationLifePlan.getModels(res);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="less">
</style>
