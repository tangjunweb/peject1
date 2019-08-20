<template>
    <div class='orginalmanage'>
        <Row :gutter="15" style="margin-bottom:20px;" type="flex">
            <Col style="width:100%">
            <top-card class='orginalmanage-topcard'>
                <ul class='formLine' style="padding:0 60px">
                    <li>
                        <div class='orginalmanage-title'>名称：</div>
                        <div class='orginalmanage-body title-red'>
                            <span class='tag'>待审核</span> 学习党的十九大精神</div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>所属党组织：</div>
                        <div class='orginalmanage-body'>中共青海省西宁市城北区委 </div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>会议类型：</div>
                        <div class='orginalmanage-body'>支部大会</div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>会议时间：</div>
                        <div class='orginalmanage-body'>2019-08-09 14:00-17:00</div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>会议地址：</div>
                        <div class='orginalmanage-body'>西宁市城北区某某街道19号附3号</div>
                    </li>
                    <li>

                    </li>
                </ul>
            </top-card>
            </Col>
        </Row>
        <Card class="upload-list" :bordered="false">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position='left' :label-width="290">
                <FormItem label="上级党组织审核意见：" prop="content">
                    <Input v-model="formValidate.content" type="textarea" placeholder="请填写审核意见" />
                </FormItem>
                <FormItem label="区委审核意见：" prop="text">
                    <Input v-model="formValidate.text" type="textarea" placeholder="请填写审核意见" />
                </FormItem>
            </Form>

        </Card>
        <div class="card-footer">
            <Button class="confirm" style="margin-right:20px" type="primary">审核通过</Button>
            <Button class="quxiao" type='primary' ghost>审核不通过</Button>
        </div>
    </div>
</template>
<script>
import { Tabs, TabPane, Card, Table, Form, FormItem } from 'iview'
export default {
    components: {
        Tabs,
        TabPane,
        Card,
        Table,
        Form, FormItem
    },
    data() {
        return {
            loading: false,
            formValidate: {
                content: '',
                text: ''
            },
            ruleValidate: {
                content: [
                    { required: true, message: '请填写审核意见', trigger: 'blur' }
                ],
                text: [
                    { required: true, message: '请填写审核意见', trigger: 'blur' }
                ]
            }
        }
    }
}
</script>
<style lang="less" scoped>
.orginalmanage {
    .tag {
        padding: 5px 10px;
        background: #BD2207;
        font-size: 14px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        position: relative;
        margin-right: 17px;
        &::after {
            content: '';
            position: absolute;
            border: 5px solid transparent;
            border-left: 5px solid #BD2207;
            right: -10px;
            top: 50%;
            margin-top: -4px;
        }
    }

    .goupload {
        width: 93px;
        height: 32px;
        background: rgba(200, 39, 33, 1);
        border-radius: 3px;
    }
    .orginalmanage-body {
        font-size: 14px; // font-weight: 500;
        color: rgba(51, 51, 51, 1);
        .file {
            padding: 16px 30px;
            background: rgba(250, 250, 252, 1);
            border: 1px solid rgba(233, 233, 240, 1);
            margin-right: 10px;

            font-size: 12px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
        }
        &.title-red {
            font-size: 16px;
            font-weight: 500;
            color: rgba(184, 35, 43, 1);
        }
    }
}
</style>