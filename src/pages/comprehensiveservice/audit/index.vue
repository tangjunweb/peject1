<template>
    <div class="orginalupload">
        <Row :gutter="15" style="margin-bottom:20px;" type="flex">
            <Col style="width:100%">
            <top-card class="orginalupload-topcard">
                <Row>
                    <Col span="6" v-for="(item, index) in nav" :key="index">
                    <div>
                        <span class="ivu-tag-dot-inner" :style="{background: item.color}"></span>
                        <span class="ivu-tag-text">
                            {{item.name}}
                            <strong>{{item.count}}</strong>次
                        </span>
                    </div>
                    </Col>
                </Row>
            </top-card>
            </Col>
        </Row>
        <Row :gutter="15" type="flex">
            <Col span="24" style="height:622px">
            <Card class="border" :bordered="false" style="height:100%">
                <Form ref="formValidate" :model="formValidate" inline>
                    <FormItem label="当前范围:" :label-width="100">
                        <Select v-model="formValidate.meetMap">
                            <Option v-for="item in meetMapDown" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button @click="searchlist" style="margin-left:18px" class="searchbtn" type="primary">查询</Button>
                        <Button @click="handleReset('formValidate')" style="margin-left:18px" class="resetbtn" ghost type="primary">重置</Button>
                    </FormItem>
                </Form>
                <Table class="oprationtable-btn" :loading="loading" stripe :columns="columns" :data="data">
                    <template slot-scope="{ row, index }" slot="opration">
                        <a @click="detail(row)">查看</a>
                        <a @click="audit(row)">审核</a>
                    </template>
                </Table>
            </Card>
            </Col>
        </Row>
        <div style="padding:30px 0 0 0" class="text-right">
            <Page :current.sync="params.pageIndex" :total="total" :page-size="params.MaxResultCount" class-name="lhyj-page" ghost show-elevator />
        </div>
    </div>
</template>
<script>
import { Tree, Table, Card, Page, Select, Form, FormItem } from "iview";
export default {
    components: {
        Table,
        Card,
        Page,
        Select, Form, FormItem
    },
    data() {
        return {
            formValidate: {
                meetMap: '',
                mail: ''
            },
            total: 1,
            params: {
                MaxResultCount: 9,
                pageIndex: 1
            },
            meetMapDown: [
                {
                    label: '中共青海省西宁市城北区委'
                }
            ],
            columns: [
                {
                    title: "组织",
                    key: "title"
                },
                {
                    title: "联点村（社区）党组织",
                    key: "type"
                },
                {
                    title: "提交时间",
                    key: "zuzhi"
                },
                {
                    title: "资源类型",
                    key: "time"
                },
                {
                    title: "状态",
                    key: "zuangtai"
                },
                {
                    title: '操作',
                    tooltip: true,
                    align: 'center',
                    width: '300px',
                    slot: 'opration',
                }
            ],
            nav: [
                {
                    color: "#43B9EA",
                    name: "待审核",
                    count: 15
                },
                {
                    color: "#C82721",
                    name: "已审核",
                    count: 8
                }
            ],
            data: [
                {
                    title: 'John Brown',
                    type: '18',
                    zuzhi: 'zuhu',
                    time: 2018 - 3 - 3,
                    zuangtai: '待审核'
                },
                {
                    title: 'John Brown',
                    type: '18',
                    zuzhi: 'zuhu',
                    time: 2018 - 3 - 3,
                    zuangtai: '待审核'
                },
                {
                    title: 'John Brown',
                    type: '18',
                    zuzhi: 'zuhu',
                    time: 2018 - 3 - 3,
                    zuangtai: '待审核'
                },
                {
                    title: 'John Brown',
                    type: '18',
                    zuzhi: 'zuhu',
                    time: 2018 - 3 - 3,
                    zuangtai: '待审核'
                }
            ]
        };
    },
    mounted() {

    },
    methods: {
        //查询
        searchlist(){
            this.loadData()
        },
        detail(row) {
            console.log(row)
            this.$router.push({
                name: "资源详情",
                query: { obj: row.id, flag: 1 }
            });
        },
        audit(row) {
            this.$router.push({
                name: "需求审核",
                query: { obj: row.id, flag: 2 }
            });
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        }
    }
};
</script>
<style lang="less" scoped>
@root: orginalupload;
.@{root} {
    &-topcard {
        strong {
            font-size: 20px;
            font-weight: 500;
            color: rgba(184, 35, 43, 1);
            margin-left: 15px;
        }
    }
}

.add {
    width: 139px;
    background: rgba(200, 39, 33, 1);
    border-radius: 3px;
    position: absolute;
    right: 16px;
    span {
        position: relative;
        padding-left: 20px;
        &:before {
            content: "";
            position: absolute;
            left: 0;
            top: 3px;
            width: 15px;
            height: 16px;
            background: url("~@/assets/images/xuqiu.png") left top no-repeat;
            background-size: 15px 16px;
        }
    }
}

.searchbtn {
    width: 80px;
    background: rgba(200, 39, 33, 1);
    border-radius: 3px;
}

.resetbtn {
    width: 80px;
    border: 1px solid rgba(200, 39, 33, 1);
    border-radius: 3px;
}
</style>