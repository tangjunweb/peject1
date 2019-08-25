<template>
    <div class='orignalUploadPlain'>
        <Row :gutter="15" style="margin-bottom:20px;" type="flex">
            <Col style="width:100%">
            <top-card class='orginalmanage-topcard'>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position='left' :label-width="290">
                    <Row :gutter="15" style="margin-bottom:20px;border-bottom:1px solid #DFE5F2" type="flex">
                        <Col :span="4" class='ivu-form'>
                        <span class='ivu-form-item-label '>基本信息</span>
                        </Col>
                        <Col :span="16">
                        <FormItem label="时间范围" prop="startTime">
                            <DatePicker type="date" v-model="formValidate.startTime" placeholder="请选择开始时间"></DatePicker>
                        </FormItem>
                        <FormItem prop="endTime">
                            <DatePicker type="date" v-model="formValidate.endTime" placeholder="请选择结束时间"></DatePicker>
                        </FormItem>
                        <FormItem label="会议标题" prop="title">
                            <Input v-model="formValidate.title" placeholder="请填写"></Input>
                        </FormItem>
                        <FormItem label="会议地点" prop="address">
                            <Input v-model="formValidate.address" placeholder="请填写"></Input>
                        </FormItem>
                        <FormItem label="会议类型" prop="lifeType">
                            <Input v-model="formValidate.lifeType" placeholder="请填写"></Input>
                            <!-- <Select v-model="formValidate.lifeType">
                                                                                                                                <Option v-for="item in lifeTypeDown" :value="item.value" :key="item.value">{{ item.text }}</Option>
                                                                                                                            </Select> -->
                        </FormItem>
                        <FormItem label="会议人数" prop="peopleNumber">
                            <Input v-model="formValidate.peopleNumber" placeholder="请填写"></Input>
                        </FormItem>
                        <FormItem label="参与党组织" prop="lifeOrganIds">
                            <organization-cascader @change="changeOrg" v-model="lifeOrganIds"></organization-cascader>
                        </FormItem>
                        <FormItem label="活动内容" prop="lifeContent">
                            <Input v-model="formValidate.lifeContent" type="textarea" placeholder="请填写" />
                        </FormItem>
                        <FormItem label="是否固定党日" prop="isPartyDay">
                            <RadioGroup v-model="formValidate.isPartyDay">
                                <Radio label="是" style="margin-right:50px"></Radio>
                                <Radio label="否"></Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="是否需提供参加活动人员基本信息" prop="isNeedPeopleInfo">
                            <RadioGroup v-model="formValidate.isNeedPeopleInfo">
                                <Radio label="是" style="margin-right:50px"></Radio>
                                <Radio label="否"></Radio>
                            </RadioGroup>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="15" style="margin-bottom:20px;" type="flex">
                        <Col :span="4" class='ivu-form'>
                        <span class='ivu-form-item-label '>发布者信息</span>
                        </Col>
                        <Col :span="16">
                        <FormItem label="联系人" prop="contacts">
                            <Input v-model="formValidate.contacts" placeholder="请填写" />
                        </FormItem>
                        <FormItem label="联系电话" prop="telephoneNumber">
                            <Input v-model="formValidate.telephoneNumber" placeholder="请填写" />
                        </FormItem>
                        </Col>
                    </Row>
                </Form>

            </top-card>
            <div class='card-footer'>
                <Button @click="submit" class="confirm" style="margin-right:20px" type="primary">保存</Button>
                <Button @click="cancel" class="quxiao" type='primary' ghost>取消</Button>
            </div>
            </Col>

        </Row>
    </div>
</template>
<script>
import { DatePicker, Select, RadioGroup, Radio } from 'iview'
import OrganizationCascader from "@/components/OrganizationCascader";
// import OrganizationLifeMng from '@/pages/model/OrganizationLifeMng';
import { getNowFormatDate } from '@/utils/util.js'
import {
    CreateOrUpdateOrganLife, GetMyOrganLife, GetBaseCodeTypes
} from "@/api/orgazationNew";
export default {
    components: {
        DatePicker,
        Select,
        RadioGroup,
        Radio, OrganizationCascader,
    },

    data() {
        const validPhone = (rule, value, callback) => {
            let reg = /^((13[0-9])|(14[0-9])|(15([0-9]))|(17[0-9])|(18[0-9])|(16[0-9])|(19[0-9]))[0-9]{8}$/;
            if (!value) {
                callback(new Error("请输入手机号"));
            } else if (!reg.test(value)) {
                callback(new Error("请输入正确的手机号格式"));
            } else {
                callback();
            }
        };
        return {
            formValidate: {
                title: '',
                startTime: '',
                endTime: '',
                address: '',
                peopleNumber: '',
                lifeOrganIds: [],
                lifeContent: '',
                isPartyDay: '',
                isNeedPeopleInfo: '',
                contacts: '',
                telephoneNumber: '',
                lifeType: ''
            },
            lifeOrganIds: this.$store.state.session.organId,
            lifeTypeDown: [],//会议类型
            ruleValidate: {
                startTime: [
                    { required: true, type: 'date', message: '请选择开始时间', trigger: 'change' }
                ],
                endTime: [
                    { required: true, type: 'date', message: '请选择结束时间', trigger: 'change' }
                ],
                title: [
                    { required: true, message: '请填写会议标题', trigger: 'change' }
                ],
                address: [
                    { required: true, message: '请填写会议地点', trigger: 'blur' }
                ],
                peopleNumber: [
                    { required: true, message: '请填写会议人数', trigger: 'blur' }
                ],
                lifeContent: [
                    { required: true, message: '请填写活动内容', trigger: 'blur' }
                ],
                isPartyDay: [
                    { required: true, message: '请选择是否固定党日', trigger: 'change' }
                ],
                isNeedPeopleInfo: [
                    { required: true, message: '请选择是否需人员信息', trigger: 'change' }
                ],
                contacts: [
                    { required: true, message: '请填写联系人', trigger: 'blur' }
                ],
                telephoneNumber: [
                    { required: true, trigger: 'blur', validator: validPhone }
                ],
                lifeType: [
                    { required: true, message: '请选择会议类型', trigger: 'blur' }
                ]
            },
            org: {},
        }
    },
    mounted() {
        let id = this.$route.query.obj || ''
        console.log(id)
        if (id) {
            GetMyOrganLife({ input: id }).then(res => {
                this.formValidate = res;
                if (this.formValidate.isPartyDay == true) {
                    this.formValidate.isPartyDay = '是'
                }
                else {
                    this.formValidate.isPartyDay = '否'
                }
                if (this.formValidate.isNeedPeopleInfo == true) {
                    this.formValidate.isNeedPeopleInfo = '是'
                }
                else {
                    this.formValidate.isNeedPeopleInfo = '否'
                }
                this.formValidate.startTime = getNowFormatDate(this.formValidate.startTime)
                this.formValidate.endTime = getNowFormatDate(this.formValidate.endTime)
            });
        }


    },
    methods: {
        getGetBaseCodeTypes() {
            GetBaseCodeTypes().then(res => {
                this.lifeTypeDown = res;
            });
        },
        changeOrg(n) {
            this.org = n;
        },
        submit() {

            this.$refs['formValidate'].validate(valid => {
                if (valid) {
                    let id = this.$route.query.obj;
                    // let organId = this.$store.state.session.organId
                    this.formValidate.lifeOrganIds.push(this.lifeOrganIds)
                    console.log(this.formValidate.lifeOrganIds)
                    if (this.formValidate.isPartyDay == '是') {
                        this.formValidate.isPartyDay = true
                    }
                    else {
                        this.formValidate.isPartyDay = false
                    }
                    if (this.formValidate.isNeedPeopleInfo == '是') {
                        this.formValidate.isNeedPeopleInfo = true
                    }
                    else {
                        this.formValidate.isNeedPeopleInfo = false
                    }
                    //  this.formValidate.isPartyDay == '是' ? true : false;
                    //  this.formValidate.isNeedPeopleInfo == '是' ? true : false;
                    console.log(this.formValidate)
                    let formda = this.formValidate;
                    //会议编辑
                    if (id) {
                        CreateOrUpdateOrganLife(formda)
                            .then(res => {
                                this.$Message.success('组织生活编辑成功');
                                this.$router.push('/organization/manage/home');
                            })
                            .finally(() => {
                            });
                    } else {
                        //会议新增
                        // let params = OrganizationLifeMng.getModels(this.model);
                        // params.infoOutDtos = [];
                        // if (this.$route.query.planId) {
                        //     params.PartyMeetingPlanId = this.$route.query.planId
                        // }
                        CreateOrUpdateOrganLife(formda)
                            .then(res => {
                                this.$Message.success('组织生活上传成功');
                                this.$router.push('/organization/manage/home');
                            })
                            .finally(() => {

                            });
                    }
                }
            });
        },
        cancel() {
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less">
.orignalUploadPlain {
    .ivu-form-item-content {
        width: 450px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .ivu-input {
            background: rgba(250, 250, 252, 1);
            &:focus {
                background: rgba(255, 255, 255, 1);
            }
        }
    }
}
</style>