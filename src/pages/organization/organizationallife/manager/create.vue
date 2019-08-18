<!-- 开展组织生活 -->
<template>
  <div class="organization-life organization-life-create">
    <Card class="border" :dis-hover="true">
      <Spin fix v-if="loading"></Spin>
      <Form ref="form" :model="model" :rules="rules">
        <Row :gutter="30">

          <Col :span="9">
          <FormItem label="时间范围" prop="timeType">
            <div style="width:100%;display:inline-block">
              <Row :gutter="15">
                <Col :span="6">
                <common-select keys="EnumTeachingPlanTimeType" v-model="model.timeType" :disabled="true"></common-select>
                </Col>
                <Col :span="6">
                <DatePicker @on-change="ychange" :value="model.year" type="year" transfer placeholder="请选择年份">
                </DatePicker>
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
          <Col :span="4">
          <FormItem label="会议标题" prop="title">
            <Input v-model="model.title" placeholder="请填写会议标题"></Input>
          </FormItem>
          </Col>
          <Col :span="4">
          <FormItem label="会议地址" prop="address">
            <MapAddressSelect @change="addressChange" v-model="model.address"></MapAddressSelect>
          </FormItem>

          </Col>
          <Col :span="4">
          <FormItem label="签到类型" prop="meetingSignType">
            <common-select size="large" keys="MeetingSignType" v-model="model.meetingSignType"></common-select>
          </FormItem>

          </Col>
        </Row>
        <Row :gutter="30">
          <Col :span="9">
          <FormItem class="inline-wrap" label="是否主题党日" prop="isFixedDay">
            <Checkbox v-model="model.isFixedDay" @on-change="isFixedDaychange"></Checkbox>
          </FormItem>
          </Col>
          <Col :span="4">
          <FormItem label="开始时间" prop="startTime">
            <DatePicker class="width-full" transfer format="yyyy-MM-dd HH:mm:ss" @on-change="model.startTime = $event" v-model="model.startTime" key="startTime" type="datetime" placeholder="请选择时间">
            </DatePicker>
          </FormItem>
          </Col>
          <Col :span="4">
          <FormItem label="结束时间" prop="endTime">
            <DatePicker class="width-full" transfer @on-change="model.endTime = $event" v-model="model.endTime" type="datetime" key="endTime" placeholder="请选择时间">
            </DatePicker>
          </FormItem>
          </Col>
          <Col :span="24" v-if="$route.query.id">
          <FormItem>
            <Button type="primary" @click="createMeet" :disabled="(!parentId&&mainFormState=='save')||(!parentId)">新增会议</Button>
          </FormItem>
          </Col>
          <Col :span="24" v-if="($route.query.id||$route.query.planId)&&model.infoOutDtos.length>0">
          <Table :columns="columns" :data="model.infoOutDtos">
            <template slot-scope="{ row, index }" slot="action">
              <a @click="editChildForm(row)" v-if="$route.query.id">编辑/</a>
              <a @click="delChildForm(row)" v-if="$route.query.id">删除</a>
            </template>

          </Table>
          </Col>
          <Col :span="24" class-name="text-center" style="margin-top:30px">
          <Button type="primary" @click="saveMainForm" ghost v-if="$route.query.planId||(!$route.query.id)">保存，并继续完善组织生活信息</Button>
           <Button type="primary" @click="saveMainForm2" ghost v-else>保存</Button>
          </Col>
        </Row>
      </Form>

    </Card>
    <compontent :is="dialogName" @addMeet="addMeet" @editMeet="editMeet" :optionType="optionType" :meetContent="meetItem" :isFixedDay="model.isFixedDay"></compontent>
  </div>
</template>

<script>
import { Select, Option, TimePicker, Modal, Form, FormItem, Input, DatePicker, Card, Checkbox, Table, RadioGroup, Radio } from 'iview';

import { GetPartyMeetingPlanInfoById, CreatePaerentPartyMeetingNewInfo, ModifyPartyMeetingParentInfo, GetMeetingInfoNewById, CreatePartyMeetingNewInfo, CreatePartyMeetingInfo, DeleteMeetingInfoById } from '@/api/partyOrganizationService';
import CommonSelect from '@/components/CommonSelect';
import MapAddressSelect from '@/components/MapAddressSelect';
import PartyMemberSelect from '@/pages/common/PartyMemberSelect';
import OrganizationLifeMng from '@/pages/model/OrganizationLifeMng';
import OrganizationLifeMngType from '@/pages/model/OrganizationLifeMngType';
import MeetTySel from './meetTySel';
import OrganizationCascader from '@/components/OrganizationCascader';

export default {
  components: {
    Select,
    Option,
    TimePicker,
    Modal,
    Card,
    Form,
    FormItem,
    Input,
    Checkbox,
    Table,
    RadioGroup,
    Radio,
    CommonSelect,
    DatePicker,
    MapAddressSelect,
    PartyMemberSelect,
    MeetTySel,
    OrganizationCascader
  },
  data() {
    let that = this;
    return {
      model: new OrganizationLifeMng(),
      rules: OrganizationLifeMng.getRules(that),
      parentId: '',
      btnLoading: false,
      hostName: '',
      recordName: '',
      loading: false,
      mainFormState: 'edit',
      planModelMeetingType: '',
      meetItem: [],
      dialogName: null,
      optionType: '',
      optionIndex: '',
      columns: [
        {
          title: '组织生活类型',
          render(h, { row }) {
            return h('span', that.GetCodeTableValue(row.meetingType, 'MeetingType'));
          }
        },
        {
          title: '主持人',
          render(h, { row }) {
            return h('span', row.operUserName);
          }
        },
        {
          title: '参会人数',
          tooltip: 'true',
          render(h, { row }) {
            return h('span', row.meetingUserCount);
          }
        },
        {
          tooltip: 'true',
          title: '会议内容',
          key: 'content'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ]
    };
  },
  computed: {
    organName() {
      return this.$store.state.session.organName;
    }
  },
  mounted() {
    let planId = this.$route.query.planId;
    let id = this.$route.query.id;

    // 1、存在计划planId，由计划创建组织生活
    // 2、存在组织生活id ，为修改
    // 3、不存在id 和planId，为新增
    let that = this;
    if (!planId && !id) {
      this.mainFormState = 'save';
    }

    if (planId) {
      this.loading = true;
      GetPartyMeetingPlanInfoById({ id: planId })
        .then(res => {
          let obj = {
            id: '',
            title: res.title,
            year: res.year && res.year.toString(),
            quarte: res.quarte,
            month: res.month && res.month.toString(),
            address: res.address,
            isFixedDay: res.isFixedDay,
            startTime: res.startTime,
            endTime: res.endTime,
            timeType: res.timeType && res.timeType.toString(),
            meetingSignType: '1',
            infoOutDtos: res.meetingPlanDetailsDtos.map(item => {
              return {
                meetingAddress: res.address,
                title: res.title,
                meetingUserCount: item.meetingPlanDetailsUsersDtos.length,
                meetingType: item.meetingType,
                beginTime: res.startTime,
                endTime: res.endTime,
                meetingSignType: item.meetingSignType,
                isFixedDay: item.isFixedDay,
                isPartyClasses: item.isPartyClasses,
                isVideoconference: item.isVideoconference,
                content: item.content,
                operUserId: item.operUserId,
                operUserName: item.operUserName,
                planDetailsId: res.id,
                meetingUsers: item.meetingPlanDetailsUsersDtos,
                meetingAttachs: [],
                partyMeetingInfoResources: [],
                operUser: {},
                agendaContents: [{ id: '', agendaContent: '', parentInfoId: '' }]
              };
            })
          };

          that.model = OrganizationLifeMng.getModels(obj);
        })
        .finally(() => {
          this.loading = false;
        });
    } else if (id) {
      this.getInfoJson();
    } else {
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
      if (this.model.infoOutDtos.find(item => item.meetingType == 'MeetingType-104' && !this.model.isFixedDay)) {
        this.$Message.warning('主题党日不能创建党内集中活动，请先删除已创建党内集中活动');
        return false;
      } else {
        return true;
      }
    },
    delChildForm(row) {
      let that = this;
      that.$Modal.confirm({
        title: '系统提示',
        content: `确认删除会议'${that.GetCodeTableValue(row.meetingType, 'MeetingType')}'？`,
        onOk: () => {
          DeleteMeetingInfoById({
            id: row.id
          }).then(res => {
            this.getInfoJson();
            that.$Message.success('删除成功');
          });
        }
      });
    },
    editChildForm(row) {
      this.optionType = 'edit';
      this.dialogName = 'MeetTySel';
      this.meetItem = row;
      this.optionIndex = row.index;
    },
    getInfoJson() {
      let that = this;
      let id = this.$route.query.id;
      this.loading = true;
      GetMeetingInfoNewById({ id })
        .then(res => {
          this.parentId = res.id;
          that.model = new OrganizationLifeMng(res);
          that.model = OrganizationLifeMng.getModels(this.model);
          this.loading = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    saveMainForm2(){
       let length = this.model.infoOutDtos.length;
       if(length==0){
          this.$Message.warning('请新增会议');
         return 
       }
       this.saveMainForm();
    },
    saveMainForm() {
      let that = this;
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.btnLoading = true;
          let id = this.$route.query.id;
          //会议编辑
          if (id) {

            
            let params = OrganizationLifeMng.getModels(this.model);
            params.infoOutDtos = [];
            ModifyPartyMeetingParentInfo(params)
              .then(res => {
                this.$Message.success('组织会议编辑成功');
                this.mainFormState = 'edit';
                this.$router.push('/organization/organizationallife/manager/list');
              })
              .finally(() => {
                this.btnLoading = false;
              });


          } else {
            //会议新增
            let params = OrganizationLifeMng.getModels(this.model);
            params.infoOutDtos = [];
            if(this.$route.query.planId){
              params.PartyMeetingPlanId=this.$route.query.planId
            }
            CreatePaerentPartyMeetingNewInfo(params)
              .then(res => {
                this.$Message.success('组织会议开展成功');
                this.parentId = res;
                this.mainFormState = 'edit';
                this.$router.replace({
                  path: 'create',
                  query: {
                    id: this.parentId
                  }
                });
                this.model.id=res;
                let length = this.model.infoOutDtos.length;
                

                let i = 0;
                this.model.infoOutDtos.forEach(item => {
                  this.addMeetItem(item, () => {
                    if (i++ == length - 1) {
                      this.getInfoJson();
                    }
                  });
                });



              })
              .finally(() => {
                this.btnLoading = false;
              });
          }
        }
      });
    },
    addMeetItem(meetItem, callback) {
      meetItem.parentInfoId = this.$route.query.id;
      meetItem.agendaContents[0] = {
        id: '',
        agendaContent: this.GetCodeTableValue(meetItem.meetingType, 'MeetingType'),
        parentInfoId: this.$route.query.id
      };

      meetItem.meetingAddress = this.model.address;
      meetItem = OrganizationLifeMngType.getModels(meetItem);

      CreatePartyMeetingNewInfo(meetItem)
        .then(res => {
          this.$Message.success('新增会议成功');
          if (callback) callback();
        })
        .finally(() => {});
    },

    organChange(organ) {
      // this.searchParams.OrganPath = organ.path;
    },
    createMeet() {
      this.meetItem = this.model;
      this.dialogName = 'MeetTySel';
      this.optionType = 'add';
    },
    ychange(year) {
      this.model.year = year;
    },

    mchange(month) {
      this.model.month = month;
    },

    addMeet(item) {
      this.model.partyMeetingInfoNewInputDtos.push(item);
    },
    editMeet(item) {
      this.model.partyMeetingInfoNewInputDtos.splice(this.optionIndex, 1, item);
    },

    addressChange(address) {
      this.model.latitude = address.latitude;
      this.model.longitude = address.longitude;
    }
  }
};
</script>
<style lang="less">
.width-full {
  width: 100% !important;
}
.inline-wrap {
  & > .ivu-form-item-label {
    display: block;
    width: 100%;
    text-align: left !important;
  }
}
</style>
