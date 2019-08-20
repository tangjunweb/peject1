<template>
    <div class='originalsignup orignalUploadPlain'>
        <Row :gutter="15" style="margin-bottom:20px;" type="flex">
            <Col style="width:100%">
            <top-card class='orginalmanage-topcard'>
                <ul class='formLine' style="padding:0 60px">
                    <li>
                        <div class='orginalmanage-title'>名称：</div>
                        <div class='orginalmanage-body title-red'>学习党的十九大精神</div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>所属党组织：</div>
                        <div class='orginalmanage-body'>中共青海省西宁市城北区委</div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>是否固定党日：</div>
                        <div class='orginalmanage-body'>是</div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>会议类型：</div>
                        <div class='orginalmanage-body'>党员大会、党课</div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>会议时间：</div>
                        <div class='orginalmanage-body'>2018-10-10 14:00~17:00</div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>会议地址：</div>
                        <div class='orginalmanage-body'>西宁市城北区某某街道19号附3号</div>
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
                        <FormItem label="报名党组织" prop="timeRange">
                            <Input v-model="formValidate.MeetTitle" placeholder="显示当前党组织"></Input>
                        </FormItem>
                        <FormItem label="联系人" prop="timeRange">
                            <Input v-model="formValidate.MeetPlace" placeholder="请填写"></Input>
                        </FormItem>
                        <FormItem label="联系电话" prop="timeRange">
                            <Input v-model="formValidate.MeetPersonSum" placeholder="请填写"></Input>
                        </FormItem>
                        <FormItem label="报名人数" prop="timeRange">
                            <Button @click="toselect" class="search" type="primary">选择</Button>
                            <span class="selected">
                                已选
                                <span style="color:#B8232B;margin:0px 5px;">9</span>人
                            </span>

                        </FormItem>
                        <FormItem>
                            <div>
                                李四李四；李四；李四李四李四
                            </div>
                        </FormItem>
                    </Form>

                    </Col>
                </Row>
            </Card>
            <div class='card-footer'>
                <Button class="confirm" style="margin-right:20px" type="primary">确认报名</Button>
                <Button class="quxiao" type='primary' ghost>取消</Button>
            </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import { Card, Select, RadioGroup, Radio } from 'iview'
export default {
    components: {
        Card,
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
            ruleValidate: {
                timeRange: [
                    { required: true, message: '请选择时间范围', trigger: 'blur' }
                ],
            }
        }
    }
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
