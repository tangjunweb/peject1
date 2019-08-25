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
                </ul>
            </top-card>
            </Col>
        </Row>
        <Card class="tabs-list" :dis-hover="true" style="height:100%">
            <Tabs value="name1" style="padding:0 100px">
                <TabPane label="会议详情" name="name1">
                    <ul class='formLine' style="margin-left:-40px;margin-right: -40px;">
                        <li>
                            <div class='orginalmanage-title'>时间：</div>
                            <div class='orginalmanage-body'>{{info.creationTime|DateFormat('yyyy-MM-dd')}}</div>
                        </li>
                        <li>
                            <div class='orginalmanage-title'>地点：</div>
                            <div class='orginalmanage-body'>{{info.address}}</div>
                        </li>

                        <li>
                            <div class='orginalmanage-title'>会议主题：</div>
                            <div class='orginalmanage-body'>{{info.title}}</div>
                        </li>
                        <li>
                            <div class='orginalmanage-title'>主持人：</div>
                            <div class='orginalmanage-body'>{{info.contacts}}</div>
                        </li>
                        <li class='block'>
                            <div class='orginalmanage-title'>主要内容：</div>
                            <div class='orginalmanage-body'>{{info.lifeContent}}</div>
                        </li>
                        <li class='block'>
                            <div class='orginalmanage-title'>议程：</div>
                            <div class='orginalmanage-body'></div>
                        </li>
                        <li class='block' style="padding:40px 0px;" v-if="info.attachments && info.attachments.length">
                            <div class='orginalmanage-title'>文件：</div>
                            <div class='orginalmanage-body'>
                                <AttachmentList :data="info.attachments"></AttachmentList>
                            </div>
                        </li>
                    </ul>
                </TabPane>
                <TabPane label="报名情况" name="name2">
                    <Form inline>
                        <FormItem style="width:25%;margin-right:0" label="发起党组织：" :label-width="100">
                            西宁市城北区xxx街道
                        </FormItem>
                        <FormItem style="width:25%;margin-right:0" label="联系人：" :label-width="100">
                            李四
                        </FormItem>
                        <FormItem style="width:25%;margin-right:0" label="联系电话：" :label-width="100">
                            13655555555
                        </FormItem>
                        <FormItem style="width:25%;margin-right:0" label="报名人数：" :label-width="100">
                            50人
                        </FormItem>
                    </Form>
                    <Table :loading="loading" stripe :columns="columns" :data="datatable"></Table>
                </TabPane>

                <TabPane label="活动纪实" name="name3">
                    <ul class='formLine' style="margin-left:-40px;margin-right: -40px;">
                        <li class='block'>
                            <div class='orginalmanage-title'>活动摘要：</div>
                            <div class='orginalmanage-body'>{{info.record}}</div>
                        </li>
                        <li class='block' style="padding:40px 0px;">
                            <div class='orginalmanage-title'>活动纪实状态：</div>
                            <div class='orginalmanage-body'>{{info.lifeRecordState}}
                            </div>
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
                </TabPane>
                <TabPane label="审核意见" name="name4">
                    <ul class='formLine' style="margin-left:-40px;margin-right: -40px;">
                        <li style="width:100%">
                            <div class='orginalmanage-title'>街道(社区/镇)党委审核意见：</div>
                            <div class='orginalmanage-body'>
                                这里显示详细意见</div>
                        </li>
                        <li style="width:100%">
                            <div class='orginalmanage-title'>区委审核意见：</div>
                            <div class='orginalmanage-body'>
                                这里显示详细意见</div>
                        </li>
                    </ul>
                </TabPane>
            </Tabs>
        </Card>
    </div>
</template>
<script>
import { Tabs, TabPane, Card, Table, Form, FormItem } from 'iview'
import AttachmentList from "@/components/AttachmentList";
import {
    GetOrganLifeDetails,
    GetOrganLifeDetailsByAudit
} from "@/api/orgazationNew";
export default {
    components: {
        Tabs,
        TabPane,
        Card,
        Table,
        Form, FormItem, AttachmentList
    },
    data() {
        return {
            loading: false,
            data: [],
            columns: [
                {
                    title: '党组织',
                    key: 'dzz'
                },
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '年龄',
                    key: 'age'
                },
                {
                    title: '性别',
                    key: 'sex'
                },
                {
                    title: '身份证号',
                    key: 'sfz'
                }
            ],
            datatable: [
                {
                    dzz: 'zuhu',
                    name: 'John Brown',
                    age: '18',
                    sex: '女',
                    sfz: '51340129993673778'
                },
                {
                    dzz: 'zuhu',
                    name: 'John Brown',
                    age: '18',
                    sex: '女',
                    sfz: '51340129993673778'
                },
                {
                    dzz: 'zuhu',
                    name: 'John Brown',
                    age: '18',
                    sex: '女',
                    sfz: '51340129993673778'
                },
                {
                    dzz: 'zuhu',
                    name: 'John Brown',
                    age: '18',
                    sex: '女',
                    sfz: '51340129993673778'
                }
            ],
            info: {}
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
                if (this.info.lifeRecordState == 1) {
                    this.info.lifeRecordState = "待审核"
                } else if (this.info.lifeRecordState == 2) {
                    this.info.lifeRecordState = "通过"
                } else if (this.info.lifeRecordState == 3) {
                    this.info.lifeRecordState = "未通过"
                } else if (this.info.lifeRecordState == 4) {
                    this.info.lifeRecordState = "区委通过"
                } else if (this.info.lifeRecordState == 5) {
                    this.info.lifeRecordState = "区委未通过"
                }


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
                console.log(this.info)
            });
        }
    }
   

}
</script>
<style lang="less" scoped>
.orginalmanage {
    .orginalmanage-title {
        width: 200px !important;
    }
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