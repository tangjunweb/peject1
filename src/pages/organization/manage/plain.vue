<template>
    <div class='orignalUploadPlain'>
        <Row :gutter="15" style="margin-bottom:20px;" type="flex">
            <Col style="width:100%">
            <top-card class='orginalmanage-topcard'>
                <Row :gutter="15" style="margin-bottom:20px;border-bottom:1px solid #DFE5F2" type="flex">
                    <Col :span="4" class='ivu-form'>
                    <span class='ivu-form-item-label '>基本信息</span>
                    </Col>
                    <Col :span="16">
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position='left' :label-width="290">
                        <FormItem label="时间范围" prop="startTime">
                            <DatePicker type="date" :options="formValidate.startTime" placeholder="请选择开始时间" style="width: 200px"></DatePicker>
                            -
                            <DatePicker type="date" :options="formValidate.endTime" placeholder="请选择结束时间" style="width: 200px"></DatePicker>
                        </FormItem>
                        <FormItem label="会议标题" prop="MeetTitle">
                            <Input v-model="formValidate.MeetTitle" placeholder="请填写"></Input>
                        </FormItem>
                        <FormItem label="会议时间" prop="MeetTime">
                            <DatePicker style="width:100%" type="date" :options="formValidate.MeetTime" placeholder="请选择"></DatePicker>
                        </FormItem>
                        <FormItem label="会议地点" prop="MeetPlace">
                            <Input v-model="formValidate.MeetPlace" placeholder="请填写"></Input>
                        </FormItem>
                        <FormItem label="会议人数" prop="MeetPersonSum">
                            <Input v-model="formValidate.MeetPersonSum" placeholder="请填写"></Input>
                        </FormItem>
                        <FormItem label="参与党组织分布要求" prop="meetMap">
                            <Select v-model="formValidate.meetMap">
                                <Option v-for="item in meetMapDown" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="活动内容" prop="content">
                            <Input v-model="formValidate.content" type="textarea" placeholder="请填写" />
                        </FormItem>
                        <FormItem label="是否固定党日" prop="fixTime">
                            <RadioGroup v-model="formValidate.fixTime">
                                <Radio label="是" style="margin-right:50px"></Radio>
                                <Radio label="否"></Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="是否需提供参加活动人员基本信息" prop="joinMsg">
                            <RadioGroup v-model="formValidate.joinMsg">
                                <Radio label="是" style="margin-right:50px"></Radio>
                                <Radio label="否"></Radio>
                            </RadioGroup>
                        </FormItem>

                    </Form>

                    </Col>
                </Row>
                <Row :gutter="15" style="margin-bottom:20px;" type="flex">
                    <Col :span="4" class='ivu-form'>
                    <span class='ivu-form-item-label '>发布者信息</span>
                    </Col>
                    <Col :span="16">
                    <Form ref="publicForm" :model="publicForm" :rules="ruleValidate" label-position='left' :label-width="290">
                        <FormItem label="联系人" prop="timeRange">
                            <Input v-model="publicForm.Contacts" placeholder="请填写" />
                        </FormItem>
                        <FormItem label="联系电话" prop="timeRange">
                            <Input v-model="publicForm.phone" placeholder="请填写" />
                        </FormItem>
                    </Form>
                    </Col>
                </Row>

            </top-card>
            <div class='card-footer'>
                <Button class="confirm" style="margin-right:20px" type="primary">保存</Button>
                <Button class="quxiao" type='primary' ghost>取消</Button>
            </div>
            </Col>

        </Row>
    </div>
</template>
<script>
import { DatePicker, Select, RadioGroup, Radio } from 'iview'
export default {
    components: {
        DatePicker,
        Select,
        RadioGroup,
        Radio
    },
    data() {
        return {
            formValidate: {
                timeRange: '',
                startTime: '',
                endTime: '',
                MeetTitle: '',
                MeetTime: '',
                MeetPlace: '',
                MeetPersonSum: '',
                meetMap: '',
                content: '',
                fixTime: '',
                joinMsg: '',
            },
            publicForm: {
                Contacts: '',
                phone: ''
            },
            meetMapDown: [],
            ruleValidate: {
                timeRange: [
                    { required: true, message: '请选择时间范围', trigger: 'blur' }
                ],
            }
        }
    },
    mounted() {
        this.$router.query.flag
    },
    methods: {}
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