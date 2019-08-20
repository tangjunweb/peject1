<template>
    <div class='orginalmanage'>
        <Row :gutter="15" style="margin-bottom:20px;" type="flex">
            <Col style="width:100%">
            <top-card class='orginalmanage-topcard'>
                <ul class='formLine' style="padding:0 60px">
                    <li>
                        <div class='orginalmanage-title'>机关党组织名称:</div>
                        <div class='orginalmanage-body'>
                            学习党的十九大精神</div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>联点村（社区）党组织名称:</div>
                        <div class='orginalmanage-body'>城北区东光社区委员 </div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>资源/需求类型：</div>
                        <div class='orginalmanage-body'>党建/服务/其他 资源/需求</div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>提交时间：</div>
                        <div class='orginalmanage-body'>2019-09-09</div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>资源/需求内容：</div>
                        <div class='orginalmanage-body'>这里显示资源或需求的具体内容</div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>当前状态：</div>
                        <div class='orginalmanage-body'>已完成</div>
                    </li>
                </ul>
            </top-card>
            </Col>
        </Row>
        <Card class="tabs-list" :dis-hover="true" style="height:100%">
            <Tabs value="name1" style="padding:0 100px">
                <TabPane label="审核情况" name="name1">
                    <ul class='formLine' style="margin-left:-40px;margin-right: -40px;">
                        <li style="width:100%">
                            <div class='orginalmanage-title'>上级党组织审核意：</div>
                            <div class='orginalmanage-body'>
                                <span class="status">审核通过</span>
                                <span class="status1">审核不通过</span>
                                这里显示详细意见</div>
                        </li>
                        <li style="width:100%">
                            <div class='orginalmanage-title'>区委审核意见：</div>
                            <div class='orginalmanage-body'>
                                <span class="status">审核通过</span>
                                <span class="status1">审核不通过</span>
                                这里显示详细意见</div>
                        </li>
                    </ul>
                </TabPane>
                <TabPane label="完成情况" name="name2">
                    <ul class='formLine' style="margin-left:-40px;margin-right: -40px;">
                        <li style="width:100%">
                            <div class='orginalmanage-title'>机关党组织完成描述：</div>
                            <div class='orginalmanage-body'>
                                <span class="status">完成</span>
                                <span class="status1">未完成</span>
                                这里显示详细完成描述</div>
                        </li>
                        <li style="width:100%">
                            <div class='orginalmanage-title'>村（社区）党组织描述：</div>
                            <div class='orginalmanage-body'>
                                 <span class="status">完成</span>
                                <span class="status1">未完成</span>
                                这里显示详细未完成描述</div>
                        </li>
                    </ul>
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
    .orginalmanage-title {
        width: 200px;
        color: #666;
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
        .status {
            background: rgba(226, 239, 228, 1);
            border-radius: 18px;
            padding: 5px 15px;
            margin-right: 30px;
        }
        .status1 {
            background: rgba(242, 220, 221, 1);
            border-radius: 18px;
            padding: 5px 15px;
            margin-right: 30px;
        }
    }
}
</style>