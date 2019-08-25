<template>
    <div>
        <Dialog okText='确认选择' width='1000px' height='500px' :visible.sync='dialogvisible' @confirm='confirm'>
            <div class='original-dialog'>
                <div class='original-dialog-header'>
                    <Form>
                        <FormItem label="姓名" :label-width="80">
                            <Input style="width:278px" v-model="searchParams.Name" placeholder="请填写"></Input>
                            <Button @click="search" style="margin-left:20px" type="primary" ghost>搜索</Button>
                            <Button @click="modal=true" style="float:right" type="primary">新增</Button>
                        </FormItem>
                    </Form>
                </div>
                <div class="flexfull">
                    <div class='dialog-left heightfull'>
                        <div class='body-head'>
                            <span>已选择</span>
                            <span class="floatRight">{{leftDate.length}}人</span>
                        </div>
                        <div class='body-main'>
                            <div class='body-main-inner'>
                                <ul>
                                    <li v-for="(item, index) in leftDate" :key="index">
                                        <span>{{item.name}}</span>
                                        <a @click="remove(item, index)" class='floatRight'>移除</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class='dialog-right heightfull'>
                        <Table @on-selection-change='changeTable' :loading="loading" stripe :columns="columns" ref="table" :data="data">
                            <template slot-scope="{ row, index }" slot="opration">
                                <span class="del-btn" @click="del(row)">删除</span>
                            </template>
                        </Table>
                        <div style="padding:30px 0 0 0" class="text-right">
                            <Page :current.sync="params.pageIndex" :total="total" :page-size="params.MaxResultCount" class-name="lhyj-page" ghost />
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
        <Modal title="新增" v-model="modal">
            <Form ref="formLeft" :model="formLeft" :rules="ruleValidate" label-position="left" :label-width="100">
                <FormItem label="姓名" prop="name">
                    <Input v-model="formLeft.name" placeholder="请填写"></Input>
                </FormItem>
                <FormItem label="身份证号" prop="idCard">
                    <Input v-model="formLeft.idCard" placeholder="请填写"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="sure">确认</Button>
                <Button type="text" @click="cancel" ghost>取消</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import { Table, Page, Modal } from 'iview'
import { SkipCount, ClearParams } from "@/mixins";
import { ValidateIDCardBirthday } from '@/utils/validate'
import {
    CreateOrganPeople,
    GetOrganPeoplePagedList,
    DeleteOrganPeople
} from "@/api/orgazationNew";
export default {
    mixins: [SkipCount, ClearParams],
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Table,
        Page,
        Modal
    },
    data() {
        const ValidateIDCard = (rule, value, callback) => {
            let str = String(value);
            if (!str) {
                callback(new Error('请输入身份证号'))
            } else if (!str.match(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)) {
                callback(new Error('身份证号格式错误'))
            } else if (str.match(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)) {
                let obj = ValidateIDCardBirthday(str);
                let currentYear = new Date().getFullYear();
                if (currentYear - obj.year < 15 || currentYear - obj.year > 200) {
                    callback(new Error('您输入的身份证号码出生年限不在范围只能内'))
                } else if (obj.month < 1 || obj.month > 12) {
                    callback(new Error('您输入的身份证号码出生月份不在范围只能内'))
                } else if (obj.day < 1 || obj.day > 31) {
                    callback(new Error('您输入的身份证号码出生日期不在范围只能内'))
                }
                // else if (str.length == 18 && !ValidateIDCardLastNum(str)) {
                //     callback(new Error('您输入的身份证号码校验位错误'))
                // } 
                else {
                    callback()
                }
            } else {
                callback()
            }
        };
        return {
            modal: false,
            total: 1,
            searchParams: {
                Name: ''
            },
            params: {
                MaxResultCount: 7,//每页条数
                SkipCount: 0,//页数
                pageIndex: 1
            },
            dialogvisible: false,
            loading: false,
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, {
                    title: "性别",
                    key: "sex"
                }, {
                    title: "姓名",
                    key: "name"
                }, {
                    title: "年龄",
                    key: "age"
                }, {
                    title: "身份证号",
                    width: '200px',
                    key: "idCard"
                },
                {
                    title: '操作',
                    align: 'center',
                    slot: 'opration',
                }
            ],
            leftDate: [],
            data: [],
            formLeft: {
                name: '',
                idCard: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请填写姓名', trigger: 'blur' }
                ],
                idCard: [
                    { required: true, trigger: 'blur', validator: ValidateIDCard }
                ],
            },
            organPeopleIds: []
        }
    },
    mounted() {

    },
    methods: {
        loadData() {
            this.loading = true;
            let params = JSON.parse(JSON.stringify(this.params));
            params.SkipCount = this.SkipCount(
                params.MaxResultCount,
                params.pageIndex
            );
            Object.assign(params, this.searchParams);
            GetOrganPeoplePagedList(this.ClearParams(params)).then(res => {
                this.data = res.items;
                this.total = res.totalCount;
                this.data.map((item, index) => {
                    if (item.sex) {
                        item.sex = '男'
                    }
                    else {
                        item.sex = '女'
                    }
                })

            }).finally(() => {
                this.loading = false;
            });
        },
        search() {
            this.params.SkipCount = 0;
            this.params.pageIndex = 1;
            this.loadData();
        },
        changeTable(selection) {
            this.leftDate = selection
        },
        remove(item, index) {
            this.leftDate.splice(index, 1)
            let _index = this.data.findIndex(row => row.id === item.id)
            if (_index >= 0) {
                this.$refs.table.toggleSelect(_index)
            }
        },
        del(row) {
            this.$Modal.confirm({
                title: '系统提示',
                content: `确认删除"${row.name}"？`,
                onOk: () => {
                    DeleteOrganPeople({
                        input: row.id
                    }).then(res => {
                        this.loadData();
                        this.$Message.success('删除成功');
                    }).catch(err => {
                        this.$Message.error(err);
                    });;
                }
            });
        },
        //确认选择人数
        okpeople() {
            this.leftDate.map((item, index) => {
                this.organPeopleIds.push(item.id)
            })
            console.log(this.organPeopleIds)
        },
        confirm() {
            this.okpeople()
            this.modal = false;
        },

        //modal弹框新增人
        close() {
            this.modal = false;
            this.formLeft.name = "";
            this.formLeft.idCard = ''
        },
        sure() {
            this.$refs['formLeft'].validate(valid => {
                if (valid) {
                    CreateOrganPeople(this.formLeft).then(res => {
                        this.$Message.success('添加成功');
                        this.params.SkipCount = 0;
                        this.params.pageIndex = 1;
                        this.loadData();
                        this.modal = false;
                    }).catch(err => {

                    })
                }
            });

        },
        cancel() {
            this.close()
        }
    },
    watch: {
        visible: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.loadData()
                }
                this.dialogvisible = val
            }
        },
        dialogvisible: {
            handler(val) {
                this.$emit('update:visible', val)
                //  this.formLeft.name = "";
                //   this.formLeft.idCard = '';

            }
        }
    },
}
</script>
<style lang="less">
.floatRight {
    float: right;
}

.original-dialog {
    height: 100%;
    display: flex;
    flex-direction: column;
    .flexfull {
        flex: 1;
        display: flex;
        justify-content: space-between;
        .dialog-left {
            width: 202px;
            height: 100%;
            background: rgba(250, 250, 250, 1);
            border: 1px solid rgba(223, 223, 230, 1);
            border-radius: 0px 0px 3px 3px;
            margin-right: 76px;
            .body-head {
                padding: 0 25px;
                line-height: 56px;
                height: 56px;
                background: rgba(247, 247, 250, 1);
                border: 1px solid rgba(223, 223, 230, 1);
                border-radius: 0px 0px 3px 3px;
            }
            .body-main {
                height: 100%;
                box-sizing: border-box;
                padding-bottom: 56px;
                .body-main-inner {
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                    ul {
                        padding: 0 25px;
                    }
                    li {
                        line-height: 40px;
                    }
                }
            }
        }
        .dialog-right {
            flex: 1;
            background: rgba(255, 255, 255, 1); // border: 1px solid rgba(223, 223, 230, 1);
            border-radius: 0px 0px 3px 3px
        }
        .heightfull {
            box-sizing: border-box;
            height: 100%;
        }
    }
}
</style>