<template>
    <div class='originalsignup orignalUploadPlain'>
             <Row :gutter="15" style="margin-bottom:20px;" type="flex">
                <Col style="width:100%" >
                    <!-- <svg-icon name='file-list' style="font-size:50px"></svg-icon> -->
                        <top-card class='orginalmanage-topcard'>
                            <ul class='formLine' style="padding:0 60px">
                                <li>
                                    <div class='orginalmanage-title'>名称：</div>
                                    <div class='orginalmanage-body'><span class='tag'>未开始</span> 学习党的十九大精神</div>
                                </li>
                                <li >
                                    <div class='orginalmanage-title'>所属党组织：</div>
                                    <div class='orginalmanage-body'>中共青海省西宁市城北区委  </div>
                                </li>
                                <li >
                                    <div class='orginalmanage-title'>是否固定党日：</div>
                                    <div class='orginalmanage-body'>是</div>
                                </li>
                                <li >
                                    <div class='orginalmanage-title'>会议类型：</div>
                                    <div class='orginalmanage-body'>党员大会</div>
                                </li>
                                <li >
                                    <div class='orginalmanage-title'>会议时间：</div>
                                    <div class='orginalmanage-body'>是</div>
                                </li>
                                <li >
                                    <div class='orginalmanage-title'>会议地址：</div>
                                    <div class='orginalmanage-body'>党员大会</div>
                                </li>
                            </ul>
                        </top-card>
                        <Card>
                        <Row :gutter="15" style="margin-bottom:20px" type="flex">
                             <Col :span="4" class='ivu-form'>
                                <span class='ivu-form-item-label '>基本信息</span>
                             </Col>
                             <Col :span="16">
                                <Form  ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position='left' :label-width="290">
                                    <FormItem label="会议标题" prop="timeRange">
                                          <Input v-model="formValidate.MeetTitle" placeholder="请填写"></Input>
                                    </FormItem>
                                   
                                    <FormItem label="会议地点" prop="timeRange">
                                         <Input v-model="formValidate.MeetPlace" placeholder="请填写"></Input>
                                    </FormItem>
                                    <FormItem label="会议人数" prop="timeRange">
                                         <Input v-model="formValidate.MeetPersonSum" placeholder="请填写"></Input>
                                    </FormItem>
                                    <FormItem label="参与党组织分布要求" prop="timeRange">
                                        <Select v-model="formValidate.meetMap">
                                            <Option v-for="item in meetMapDown" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </FormItem>
                                </Form>
                             
                             </Col>
                         </Row>
                        </Card>
                        <div class='card-footer'>
                            <Button style="margin-right:20px" type="primary">保存</Button>
                            <Button type='primary' ghost>取消</Button>
                        </div>
                </Col>
         </Row>
    </div>
</template>
<script>
import {Card, Select, RadioGroup, Radio} from 'iview'
export default {
    components: {
        Card,
        Select,
        RadioGroup,
        Radio
    },
    data () {
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