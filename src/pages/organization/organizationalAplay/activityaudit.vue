<template>
    <div class='orginalmanage'>
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
                        <div class='orginalmanage-body'>{{info.lifeOrgans&&info.lifeOrgans[0].organName}}</div>
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
                    <li>
                        <div class='orginalmanage-title'>活动纪实状态：</div>
                        <div class='orginalmanage-body'>{{info.lifeRecordState}}
                        </div>
                    </li>
                    <li class='block'>
                        <div class='orginalmanage-title'>活动摘要：</div>
                        <div class='orginalmanage-body'>{{info.record}}</div>
                    </li>
                    <li class='block' style="padding:40px 0px;" v-if="info.otherFiles && info.otherFiles.length">
                        <div class='orginalmanage-title'>附件：</div>
                        <div class='orginalmanage-body'>
                            <AttachmentList :data="info.otherFiles"></AttachmentList>
                        </div>
                    </li>
                    <li class='block' style="padding:40px 0px;" v-if="info.imageFiles && info.imageFiles.length">
                        <div class='orginalmanage-title'>附件：</div>
                        <div class='orginalmanage-body'>
                            <AttachmentList :data="info.imageFiles"></AttachmentList>
                        </div>
                    </li>
                </ul>
            </top-card>
            </Col>
        </Row>
        <Card class="upload-list" :bordered="false">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position='left' :label-width="290">
                <FormItem label="上级党组织审核意见：" prop="note">
                    <Input v-model="formValidate.note" type="textarea" placeholder="请填写审核意见" />
                </FormItem>
                <FormItem label="区委审核意见：" prop="note">
                    <Input v-model="formValidate.note" type="textarea" placeholder="请填写审核意见" />
                </FormItem>
            </Form>

        </Card>
        <div class="card-footer">
            <Button @click="audit" class="confirm" style="margin-right:20px" type="primary">审核通过</Button>
            <Button @click="noaudit" class="quxiao" type='primary' ghost>审核不通过</Button>
        </div>
    </div>
</template>
<script>
import { Tabs, TabPane, Card, Table, Form, FormItem } from 'iview'
import { AuditOrganLifeRecord, GetOrganLifeDetailsByAudit } from "@/api/orgazationNew";
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
                organLifeId: '',
                note: '',
                lifeRecordState: []
            },
            ruleValidate: {
                content: [
                    { required: true, message: '请填写审核意见', trigger: 'blur' }
                ],
                text: [
                    { required: true, message: '请填写审核意见', trigger: 'blur' }
                ]
            },
            info: {}
        }
    },
    mounted() {

        this.loadData()
    },
    methods: {
        loadData() {
            let id = this.$route.query.obj;
            GetOrganLifeDetailsByAudit({ input: id }).then(res => {
                if (res) {
                    this.info = res;
                }
            })
        },
        //审核通过
        audit() {
            this.formValidate.organLifeId = this.$route.query.obj;
            this.formValidate.lifeRecordState = true
            AuditOrganLifeRecord(this.formValidate).then(res => {
                this.$Message.success('审核通过');
                this.$router.push('/organization/organizationalAplay/index');
            })
        },
        //审核不通过
        noaudit() {
            this.formValidate.organLifeId = this.$route.query.obj;
            this.formValidate.lifeRecordState = false
            AuditOrganLifeRecord(this.formValidate).then(res => {
                this.$Message.success('审核不通过');
                this.$router.push('/organization/organizationalAplay/index');
            })
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