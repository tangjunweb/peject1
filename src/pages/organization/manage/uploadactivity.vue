<template>
    <div class='orginalmanage'>
        <Row :gutter="15" style="margin-bottom:20px;" type="flex">
            <Col style="width:100%">
            <top-card class='orginalmanage-topcard'>
                <ul class='formLine' style="padding:0 60px">
                    <li>
                        <div class='orginalmanage-title'>名称：</div>
                        <div class='orginalmanage-body title-red'>
                            学习党的十九大精神</div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>所属党组织：</div>
                        <div class='orginalmanage-body'>中共青海省西宁市城北区委 </div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>是否固定党日：</div>
                        <div class='orginalmanage-body'>是</div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>会议类型：</div>
                        <div class='orginalmanage-body'>党员大会</div>
                    </li>
                </ul>
            </top-card>
            </Col>
        </Row>
        <Card class="upload-list" :bordered="false">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position='left' :label-width="290">
                <FormItem label="活动摘要" prop="content">
                    <Input v-model="formValidate.content" type="textarea" placeholder="请填写" />
                </FormItem>
                <FormItem label="上传附件：" prop="file">
                    <Button class="goupload" style="margin-right:20px" type="primary">点击上传</Button>
                    <span style="position: absolute;left: 100px;">可上传文件格式：.png、.jpg、.doc ，单个文件不能超过500kb</span>
                </FormItem>
                <FormItem>
                    <div class='orginalmanage-body'>
                        <span class='file'>已上传文档名称.png</span>
                        <span class='file'>已上传文档名称.png</span>
                        <span class='file'>已上传文档名称.png</span>
                        <span class='file'>已上传文档名称.png</span>
                        <span class='file'>已上传文档名称.png</span>
                    </div>
                </FormItem>
            </Form>

        </Card>
        <div class="card-footer">
            <Button class="confirm" style="margin-right:20px" type="primary">确认报名</Button>
            <Button class="quxiao" type='primary' ghost>取消</Button>
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
                file: ''
            },
            ruleValidate: {
                content: [
                    { required: true, message: '请填写活动摘要', trigger: 'blur' }
                ],
                file: [
                    { required: true, message: '请上传附件', trigger: 'blur' }
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
        background: rgba(179, 178, 178, 1);
        font-size: 14px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        position: relative;
        margin-right: 17px;
        &::after {
            content: '';
            position: absolute;
            border: 5px solid transparent;
            border-left: 5px solid rgba(179, 178, 178, 1);
            right: -10px;
            top: 50%;
            margin-top: -4px;
        }
    }
    .tag1 {
        padding: 5px 10px;
        font-size: 14px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        position: relative;
        margin-right: 17px;
        background: rgba(80, 162, 226, 1);
        &::after {
            content: '';
            position: absolute;
            border: 5px solid transparent;
            border-left: 5px solid rgba(80, 162, 226, 1);
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
        width:450px;
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