<template>
    <div class='orginalmanage'>
        <Row :gutter="15" style="margin-bottom:20px;" type="flex">
            <Col style="width:100%">
            <top-card class='orginalmanage-topcard'>
                <ul class='formLine' style="padding:0 60px">
                    <li>
                        <div class='orginalmanage-title'>名称：</div>
                        <div class='orginalmanage-body title-red'>
                            <!-- <span class='tag'>{{info.lifeState}}</span> -->
                            {{info.title}}
                        </div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>所属党组织：</div>
                        <div class='orginalmanage-body'>{{info.lifeOrgans[0].organName}}</div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>是否固定党日：</div>
                        <div class='orginalmanage-body'>{{info.isPartyDay?'是':'否'}}</div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>会议类型：</div>
                        <div class='orginalmanage-body'>{{info.lifeType=1?'党员大会':"党课"}}</div>
                    </li>
                </ul>
            </top-card>
            </Col>
        </Row>
        <Card class="upload-list" :bordered="false">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position='left' :label-width="290">
                <FormItem label="活动摘要" prop="record">
                    <Input v-model="formValidate.record" type="textarea" placeholder="请填写" />
                </FormItem>
                <FormItem label="上传附件：" prop="attachMents">
                    <UploadAttachmentMultipe v-model="formValidate.attachMents"></UploadAttachmentMultipe>
                    <span style="position: absolute;left: 127px;top:0;">可上传文件格式：.png、.jpg、.doc ，单个文件不能超过500kb</span>
                </FormItem>
            </Form>

        </Card>
        <div class="card-footer">
            <Button @click="submit" class="confirm" style="margin-right:20px" type="primary">确认提交</Button>
            <Button class="quxiao" type='primary' ghost>取消</Button>
        </div>
    </div>
</template>
<script>
import { Tabs, TabPane, Card, Table, Form, FormItem } from 'iview'
import UploadAttachmentMultipe from "@/components/UploadAttachmentMultipe";
import {
    UploadOrganLifeRecord, GetOrganLifeDetails
} from "@/api/orgazationNew";

export default {
    components: {
        Tabs,
        TabPane,
        Card,
        Table,
        Form, FormItem, UploadAttachmentMultipe
    },
    data() {
        return {
            loading: false,
            formValidate: {
                organLifeId: '',
                record: '',
                attachMents: []
            },
            ruleValidate: {
                record: [
                    { required: true, message: '请填写活动摘要', trigger: 'blur' }
                ],
                attachMents: [
                    { required: true, type: 'array', min: 1, message: '请上传附件', trigger: 'change' },
                    { type: 'array', max: 10, message: '最多上传10附件', trigger: 'change' }

                ]
            },
            info:{}
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
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
        submit() {
            this.$refs['formValidate'].validate(valid => {
                if (valid) {
                    let id = this.$route.query.obj;
                    // let organId = this.$store.state.session.organId
                    if (id) {
                        UploadOrganLifeRecord(this.formValidate)
                            .then(res => {
                                this.$Message.success('活动纪实上传成功');
                                this.$router.push('/organization/manage/home');
                            })
                            .finally(() => {
                            });
                    }
                }
            });
        },
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
        width: 450px;
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