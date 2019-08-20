<template>
    <div class='orginalmanage'>
        <Row :gutter="15" style="margin-bottom:20px;" type="flex">
            <Col style="width:100%">
            <top-card class='orginalmanage-topcard'>
                <ul class='formLine' style="padding:0 60px">
                    <li>
                        <div class='orginalmanage-title'>名称：</div>
                        <div class='orginalmanage-body title-red'>
                            <span class='tag'>未开始</span>
                            <span class='tag1'>已结束待审核</span>
                            <span class='tag'>已结束</span>
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
        <Card class="tabs-list" :dis-hover="true" style="height:100%">
            <Tabs value="name1" style="padding:0 100px">
                <TabPane label="会议详情" name="name1">
                    <ul class='formLine' style="margin-left:-40px;margin-right: -40px;">
                        <li>
                            <div class='orginalmanage-title'>时间：</div>
                            <div class='orginalmanage-body'>2019-09-08</div>
                        </li>
                        <li>
                            <div class='orginalmanage-title'>地点：</div>
                            <div class='orginalmanage-body'>中共青海省西宁市城北区委第一办公室</div>
                        </li>

                        <li>
                            <div class='orginalmanage-title'>会议主题：</div>
                            <div class='orginalmanage-body'>学习党的十九大精神</div>
                        </li>
                        <li>
                            <div class='orginalmanage-title'>主持人：</div>
                            <div class='orginalmanage-body'>张三</div>
                        </li>
                        <li class='block'>
                            <div class='orginalmanage-title'>主要内容：</div>
                            <div class='orginalmanage-body'>学习党的十九大精神，全面落实工作部署</div>
                        </li>
                        <li class='block'>
                            <div class='orginalmanage-title'>议程：</div>
                            <div class='orginalmanage-body'>
                                <p>会议议程一：这里显示会议议程1的内容，这里显示会议议程1的内容；</p>
                                <p>会议议程二：这里显示会议议程1的内容，这里显示会议议程1的内容；</p>
                            </div>
                        </li>
                        <li class='block' style="padding:40px 0px;">
                            <div class='orginalmanage-title'>文件：</div>
                            <div class='orginalmanage-body'>
                                <span class='file'>已上传文档名称.png</span>
                                <span class='file'>已上传文档名称.png</span>
                                <span class='file'>已上传文档名称.png</span>
                                <span class='file'>已上传文档名称.png</span>
                                <span class='file'>已上传文档名称.png</span>
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
                <TabPane label="参会情况" name="name3">
                    <div>
                        <Tabs type="card">
                            <TabPane label="党员大会"></TabPane>
                            <TabPane label="党支部委员会"></TabPane>
                            <TabPane label="党小组会"></TabPane>
                            <TabPane label="党课"></TabPane>
                            <TabPane label="党内集中活动"></TabPane>
                        </Tabs>
                        <Table :loading="loading" stripe :columns="columns" :data="datatable"></Table>
                    </div>
                </TabPane>
                <TabPane label="活动纪实" name="name4">
                  
                </TabPane>
            </Tabs>
        </Card>
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
            loading: flase,
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
            ]
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