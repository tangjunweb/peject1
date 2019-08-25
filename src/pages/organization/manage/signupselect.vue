<template>
    <div class='originalsignup orignalUploadPlain'>
        <Row :gutter="15" style="margin-bottom:20px;" type="flex">
            <Col style="width:100%">
            <top-card class='orginalmanage-topcard'>
                <ul class='formLine' style="padding:0 60px">
                    <li>
                        <div class='orginalmanage-title'>名称：</div>
                        <div class='orginalmanage-body title-red'>
                            <span class='tag'>{{info.lifeState}}</span>
                            {{info.title}}
                        </div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>所属党组织：</div>
                        <div class='orginalmanage-body'>{{info.lifeOrgans && info.lifeOrgans[0].organName}}</div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>是否固定党日：</div>
                        <div class='orginalmanage-body'>{{info.isPartyDay?'是':'否'}}</div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>会议类型：</div>
                        <div class='orginalmanage-body'>{{info.lifeType=1?'党员大会':"党课"}}</div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>会议时间：</div>
                        <div class='orginalmanage-body'>{{info.creationTime|DateFormat('yyyy-MM-dd')}}</div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>会议地址：</div>
                        <div class='orginalmanage-body'>{{info.address}}</div>
                    </li>
                </ul>
            </top-card>
            <Card>
                <Row :gutter="15" style="margin-bottom:20px" type="flex">
                    <Col :span="4" class='ivu-form'>
                    <span class='ivu-form-item-label '>填写报名信息</span>
                    </Col>
                    <Col :span="16">
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position='left' :label-width="290">
                        <FormItem label="报名党组织" prop="organLifeId">
                            <organization-cascader v-model="formValidate.organLifeId"></organization-cascader>
                            <!-- <Input v-model="formValidate.organLifeId" placeholder="显示当前党组织"></Input> -->
                        </FormItem>
                        <FormItem label="联系人" prop="contacts">
                            <Input v-model="formValidate.contacts" placeholder="请填写"></Input>
                        </FormItem>
                        <FormItem label="联系电话" prop="telephoneNumber">
                            <Input v-model="formValidate.telephoneNumber" placeholder="请填写"></Input>
                        </FormItem>
                        <FormItem label="报名人数" prop="organPeopleNumber">
                            <Button @click="showDialog=true" class="search" type="primary">选择</Button>
                            <span class="selected">
                                已选
                                <span style="color:#B8232B;margin:0px 5px;">{{formValidate.organPeopleNumber}}</span>人
                            </span>
                        </FormItem>
                        <!-- <FormItem prop="organPeopleIds">
                                            <div>
                                                {{formValidate.organPeopleIds}}
                                            </div>
                                        </FormItem> -->
                    </Form>
                    </Col>
                </Row>
            </Card>
            <div class='card-footer'>
                <Button @click="submit" class="confirm" style="margin-right:20px" type="primary">确认报名</Button>
                <Button class="quxiao" type='primary' ghost>取消</Button>
            </div>
            </Col>
        </Row>
        <OrinaglPlainDilaog @selectPeople='selectPeople' v-if="showDialog" :visible.sync='showDialog' ref='OrinaglPlainDilaog'></OrinaglPlainDilaog>
    </div>
</template>
<script>
import OrinaglPlainDilaog from './components/OrinaglPlainDilaog'
import OrganizationCascader from "@/components/OrganizationCascader";
import { Card, Select, RadioGroup, Radio } from 'iview'
import {ValidateTel} from '@/utils/validate'
import {
    SignUpOrganPeople, GetOrganLifeDetails
} from "@/api/orgazationNew";
export default {
    components: {
        OrinaglPlainDilaog,
        Card,
        Select,
        RadioGroup,
        Radio,
        OrganizationCascader
    },
    watch: {
        'formValidate.organPeopleIds': {
            immediate: true,
            // deep: true,
            handler (val) {
                this.formValidate.organPeopleNumber = val.length
            }
        }
    },
    data() {
        return {
            showDialog: false,
            formValidate: {
                organLifeId: this.$store.state.session.organId,
                contacts: '',
                telephoneNumber: '',
                organPeopleNumber: '',
                organPeopleIds: []
            },
            ruleValidate: {
                contacts: [
                    { required: true, message: '请填写联系人', trigger: 'blur' }
                ],
                telephoneNumber: [
                    { required: true, trigger: 'blur', validator: ValidateTel }
                ],
                organPeopleNumber: [
                    { required: true, trigger: 'blur', message: '请选择报名人数' }
                ]
            },
            info:{}

        }
    },
    mounted() {
        // 获取用户接口
        // this.loadData()
    },
    methods: {
        selectPeople (val) {
            this.formValidate.organPeopleIds = val
        },
        // confirm() {
        //     this.$refs.OrinaglPlainDilaog.add()
        // },
        loadData() {
              let id = this.$route.query.obj;
            GetOrganLifeDetails({ input: id }).then(res => {
                this.info = res;
                   if (this.info.lifeState == 0) {
                    this.info.lifeState = "未开始"
                } else if (this.info.lifeState == 1) {
                    this.info.lifeState = "待审核"
                } else if (this.info.lifeState == 2) {
                    this.info.lifeState = "通过"
                } else if (this.info.lifeState == 3) {
                    this.info.lifeState = "未通过"
                } else if (this.info.lifeState == 4) {
                    this.info.lifeState = "区委通过"
                } else if (this.info.lifeState == 5) {
                    this.info.lifeState = "区委未通过"
                } else if (this.info.lifeState == 6) {
                    this.info.lifeState = "已发布"
                } else if (this.info.lifeState == 7) {
                    this.info.lifeState = "已开始"
                } else if (this.info.lifeState == 8) {
                    this.info.lifeState = "已取消"
                } else if (this.info.lifeState == 9) {
                    this.info.lifeState = "已结束"
                }
            })
        },

        // add() {
        // },
        submit() {
            this.$refs['formValidate'].validate(valid => {
                if (valid) {
                    SignUpOrganPeople(this.formValidate)
                        .then(res => {
                            this.$Message.success('报名成功');
                            this.$router.push('/organization/manage/home');
                        })
                        .finally(() => {

                        });
                }
            });
        }
    },

}
</script>
<<style lang="less" scoped>
  .selected {
            margin-left: 90px;
            display: block;
            position: absolute;
            left: 0;
        }
</style>
