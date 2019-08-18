<template>
  <div>
    <Modal v-model="showModal" title="会议" :closable="false" :mask-closable="false" width="750px" class="modal-form">
      <Form ref="formA" label-position="left" :rules="rules" :model="meetItem">
        <FormItem label="组织生活类型" prop="meetingType">
          <!-- <common-select keys="MeetingType" v-model="meetItem.meetingType" @change="meetTypeChange"></common-select> -->
          <Select transfe :value="meetItem.meetingType" @on-change="meetTypeChange">
            <Option v-for="item in meetingTypeLists" :value="item.value" :key="item.value">{{ item.label}}</Option>
          </Select>
        </FormItem>

      </Form>
      <template v-if="meetingType">
        <Form ref="form" :model="meetItem" :rules="rules">
          <Row :gutter="30" type="flex">

            <template v-if="meetingType == 'MeetingType-100' || meetingType == 'MeetingType-101'|| meetingType == 'MeetingType-102'">
              <Col :span="24">
              <FormItem label="主持人（如非系统内党员，请直接填写主持人姓名）" prop="operUser">
                <Input v-model="meetItem.operUser.name" placeholder="请选择主持人">
                <PartyMemberSelect @change="operUserChange" type="single" slot="append" v-model="meetItem.operUser">
                  <Button type="default" ghost>选择主持人</Button>
                </PartyMemberSelect>
                </Input>
              </FormItem>
              </Col>
            </template>

            <template v-if="meetingType == 'MeetingType-103'">
              <Col :span="24">
              <FormItem label="授课人（如非系统内党员，请直接填写授课人姓名）" prop="operUser">
                <Input v-model="meetItem.operUser.name" placeholder="请选择授课人">
                <PartyMemberSelect @change="operUserChange" type="single" slot="append" v-model="meetItem.operUser">
                  <Button type="default" ghost>选择授课人</Button>
                </PartyMemberSelect>
                </Input>
              </FormItem>
              </Col>
            </template>

            <Col :span="12" v-if="meetingType == 'MeetingType-100'||meetingType == 'MeetingType-104'">
            <FormItem class="inline-wrap" prop="isPartyClasses" label="是否上党课">
              <Row>
                <Checkbox v-model="meetItem.isPartyClasses"></Checkbox>
              </Row>
            </FormItem>
            </Col>
            <Col :span="12">
            <FormItem class="inline-wrap" label="是否使用视频会议" prop="isVideoconference">
              <!--新增字段-->
              <Checkbox v-model="meetItem.isVideoconference"></Checkbox>
            </FormItem>
            </Col>
            <Col :span="24">
            <template v-if="meetingType == 'MeetingType-100' || meetingType == 'MeetingType-101'|| meetingType == 'MeetingType-102'">
              <FormItem label="会议内容" prop="content">
                <Input type="textarea" :row="3" v-model="meetItem.content" placeholder="请输入会议内容"></Input>
              </FormItem>
            </template>
            <template v-if="meetingType == 'MeetingType-103'">
              <FormItem label="授课内容" prop="content">
                <Input type="textarea" :row="3" v-model="meetItem.content" placeholder="请输入会议内容"></Input>
              </FormItem>
            </template>
            <template v-if="meetingType == 'MeetingType-104'">
              <FormItem label="活动内容" prop="content">
                <Input type="textarea" :row="3" v-model="meetItem.content" placeholder="请输入会议内容"></Input>
              </FormItem>
            </template>
            </Col>

            <Col :span="24">
            <template v-if="meetingType == 'MeetingType-100'||meetingType == 'MeetingType-101'||meetingType == 'MeetingType-102'">
              <FormItem label="参会人员" prop="meetingUsers">
                <Input :readonly="true" placeholder="请选择参会人员" v-model="meetingUsersDtosText">
                <PartyMemberSelectByType type="multiple" slot="append" v-model="meetItem.meetingUsers" :meetingType="meetingType">
                  <Button type="default" ghost>参会人员</Button>
                </PartyMemberSelectByType>
                </Input>
              </FormItem>
            </template>
            <template v-if="meetingType == 'MeetingType-103'">
              <FormItem label="听课人员" prop="meetingUsers">
                <Input :readonly="true" placeholder="请选择听课人员" v-model="meetingUsersDtosText">
                <PartyMemberSelectByType type="multiple" slot="append" v-model="meetItem.meetingUsers" :meetingType="meetingType">
                  <Button type="default" ghost>听课人员</Button>
                </PartyMemberSelectByType>
                </Input>
              </FormItem>
            </template>
            <template v-if="meetingType == 'MeetingType-104'">
              <FormItem label="参加人员" prop="meetingUsers">
                <Input :readonly="true" placeholder="请选择参加人员" v-model="meetingUsersDtosText">
                <PartyMemberSelectByType type="multiple" slot="append" v-model="meetItem.meetingUsers" :meetingType="meetingType">
                  <Button type="default" ghost>参加人员</Button>
                </PartyMemberSelectByType>
                </Input>
              </FormItem>
            </template>
            </Col>
            <Col :span="24">
            <FormItem class="inline-wrap" label="上传文件" prop="uploadUrl">
              <Alert :type="files.name ? 'success' : 'info'" show-icon>
                {{files.name||'请上传pdf、word、excel、ppt、pptx等文件格式（文件大小不能超过20M）'}}</Alert>
              <CourseFileUpload :downloadId="files.id" @change="uploadChange" :format="['pdf', 'word', 'excel', 'ppt', 'pptx', 'doc', 'docx']" v-model="files.name">
              </CourseFileUpload>
            </FormItem>
            </Col>
          </Row>
        </Form>
      </template>

      <div slot="footer">
        <Button type="primary" @click="save">保存</Button>
        <Button @click="closeDialog">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { Select, Option, TimePicker, Modal, Form, FormItem, Input, DatePicker, Card, Checkbox } from 'iview';

import { CreatePartyMeetingNewInfo, GetMeetingInfoById, ModifyPartyMeetingInfo, CreatePartyMeetingInfo, GetOrganBranchTeamMeberList, GetOrganizationUser, GetOrganGroupUserList } from '@/api/partyOrganizationService';
import CommonSelect from '@/components/CommonSelect';
import PartyMemberSelect from '@/pages/common/PartyMemberSelect';
import PartyMemberSelectByType from '@/pages/common/PartyMemberSelectByType';

import OrganizationLifeMngType from '@/pages/model/OrganizationLifeMngType';
import Resource from '@/pages/model/Resource';
import CourseFileUpload from '@/components/CourseFileUpload';
export default {
  props: ['optionType', 'meetContent', 'isFixedDay'],
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
    CommonSelect,
    DatePicker,
    PartyMemberSelect,
    PartyMemberSelectByType,
    CourseFileUpload
  },
  data() {
    return {
      showModal: true,
      meetItem: new OrganizationLifeMngType(),
      rules: OrganizationLifeMngType.getRules(),
      model: new Resource({ resourceType: 4 }),
      files: {},
      meetingTypeLists: []
    };
  },
  mounted() {
    this.meetingTypeLists = JSON.parse(JSON.stringify(this.$store.state.baseCode)).MeetingType;
    if (!this.isFixedDay) {
      this.meetingTypeLists = this.meetingTypeLists.filter(item => item.value != 'MeetingType-104');
      // 是否成立支委会
      if (!this.$store.state.session.IsOrganBranch) this.meetingTypeLists = this.meetingTypeLists.filter(item => item.value != 'MeetingType-101');
      // 是否成立党小组
      if (!this.$store.state.session.IsOrganGroup ) this.meetingTypeLists = this.meetingTypeLists.filter(item => item.value != 'MeetingType-102');
    }

    let that = this;
    let obj = Object.assign({}, this.meetContent);

    if (this.optionType == 'add') {
      let a = {
        id: '',
        title: obj.title,
        address: obj.address,
        isFixedDay: obj.isFixedDay,
        beginTime: obj.startTime,
        endTime: obj.endTime,
        meetingSignType: obj.meetingSignType,
        operUser: {},
        agendaContents: {}
      };
      Object.assign(that.meetItem, a);
      that.meetItem = OrganizationLifeMngType.getModels(that.meetItem);
    }

    if (this.optionType == 'edit') {
      if (obj.operUserId) {
        obj.operUser = { name: obj.operUserName, id: obj.operUserId };
        this.$set(obj, 'operUserName', '');
        this.$set(obj, 'operUserId', '');
      } else {
        obj.operUser = {
          name: obj.operUserName
        };
      }
      if (obj.meetingUsers) {
        obj.meetingUsers.map(item => {
          item.name = item.userName;
          item.userId = item.userId;
        });
      } else {
        obj.meetingUsers = [];
      }
      that.meetItem = obj;
      this.files = obj.meetingAttachs[0] ? obj.meetingAttachs[0] : {};
      this.model.id = this.files.id;
    }
  },

  computed: {
    meetingUsersDtosText() {
      let length = this.meetItem.meetingUsers.length;
      if (length == 0) return '请添加人员';
      else return `已选择${length}人`;
    },
    meetingType() {
      return this.meetItem.meetingType;
    }
  },

  methods: {
    operUserChange(member) {
      // this.meetItem.operUserId = member.id;
      // this.meetItem.operUserName=member.name;
    },

    uploadChange(result) {
      this.meetItem.meetingAttachs[0] = result;
      this.files = result;
    },
    meetTypeChange(val) {
      this.meetItem.meetingType = val;

      this.meetItem.meetingUsers = [];
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
        this.meetItem.meetingUsers = res;
      });
    },
    resetform() {
      this.meetItem = new OrganizationLifeMngType();
      let that = this;
      let obj = Object.assign({}, this.meetContent);
      let a = {
        id: '',
        title: obj.title,
        address: obj.address,
        isFixedDay: obj.isFixedDay,
        beginTime: obj.startTime,
        endTime: obj.endTime,
        meetingSignType: obj.meetingSignType,
        operUser: {},
        agendaContents: {}
      };
      Object.assign(that.meetItem, a);
      that.meetItem = OrganizationLifeMngType.getModels(that.meetItem);
      this.files = {};
    },
    save() {
      this.$refs['formA'].validate(validformA => {
        if (validformA) {
          this.$refs['form'].validate(validform => {
            if (validform) {
              switch (this.optionType) {
                case 'add':
                  this.addMeet();
                  break;
                case 'edit':
                  this.editMeet();
                  break;
              }
            }
          });
        }
      });
    },
    addMeet() {
      this.meetItem.meetingAddress = this.meetContent.address;
      this.meetItem.parentInfoId = this.$route.query.id;
      this.meetItem.agendaContents = [];
      this.meetItem.agendaContents.push({
        id: '',
        agendaContent: this.GetCodeTableValue(this.meetItem.meetingType, 'MeetingType'),
        parentInfoId: this.$route.query.id
      });

      this.meetItem = OrganizationLifeMngType.getModels(this.meetItem);

      CreatePartyMeetingNewInfo(this.meetItem)
        .then(res => {
          this.$Message.success('新增会议成功');
          this.closeDialog();
          this.$parent.getInfoJson();
          this.btnLoading = false;
        })
        .finally(() => {
          this.btnLoading = false;
        });
    },
    editMeet() {
      this.meetItem = OrganizationLifeMngType.getModels(this.meetItem);

      ModifyPartyMeetingInfo(this.meetItem)
        .then(res => {
          this.$Message.success('修改会议成功');
          this.closeDialog();
          this.$parent.getInfoJson();
        })
        .finally(() => {
          this.btnLoading = false;
        });
    },
    closeDialog() {
      this.$parent.dialogName = null;
    }
  }
};
</script>
<style lang="less" >
.inline-wrap {
  & > .ivu-form-item-label {
    display: block;
    width: 100%;
    text-align: left !important;
  }
}
.modal-form .ivu-alert.ivu-alert-with-icon {
  display: flex;
}
</style>
