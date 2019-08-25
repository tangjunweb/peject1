<template>
    <div class='orginalmanage'>
        <Row :gutter="15" style="margin-bottom:20px;" type="flex">
            <Col style="width:100%">
            <top-card class='orginalmanage-topcard'>
                <Row :gutter="15" style="margin-bottom:20px;border-bottom:1px solid #DFE5F2" type="flex">
                    <Col :span="4" class='ivu-form'>
                    <span class='ivu-form-item-label '>党组织</span>
                    </Col>
                    <Col :span="16">
                    <Form class="upload-list" ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position='left' :label-width="290">
                        <FormItem label="机关党组织名称" prop="jiguanname">
                            <Input disabled v-model="formValidate.jiguanname">城北区支委</Input>
                        </FormItem>
                        <FormItem label="联点村（社区）党组织名称" prop="sehquname">
                            <Select v-model="formValidate.sehquname" placeholder="请选择">
                                <Option v-for="item in meetMapDown" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Form>
                    </Col>
                </Row>
                <Row :gutter="15" style="margin-bottom:20px;" type="flex">
                    <Col :span="4" class='ivu-form'>
                    <span class='ivu-form-item-label '>需求清单</span>
                    </Col>
                    <Col :span="19">
                    <Form ref="publicForm" :model="publicForm" :rules="ruleValidate" label-position='left' :label-width="290">
                        <FormItem label="上传需求清单" prop="qingdan">
                            <Table style="margin-bottom:20px" :loading="loading" stripe :columns="columns" :data="publicForm.qingdan">
                                <template slot-scope="{ row, index }" slot="opration">
                                    <a class="editiocn" @click="edit(row)">编辑</a>
                                    <a class="del-btn" @click="del(row,index)">删除</a>
                                </template>
                            </Table>
                            <Button @click="modal=true" class="goupload" style="margin-right:20px" type="primary">
                                <Icon style="margin-top: -3px;" type="ios-add" size="21" />
                                <span>新增</span>
                            </Button>
                            <span style="position: absolute;left: 100px;">注：最多可上传10个需求清单</span>
                        </FormItem>
                    </Form>
                    </Col>
                </Row>

            </top-card>
            <div class='card-footer'>
                <Button class="confirm" style="margin-right:20px" type="primary">保存</Button>
                <Button class="confirm" type='primary'>上传</Button>
            </div>
            </Col>

        </Row>
        <Modal title="新增" v-model="modal">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                <FormItem label="需求类型：" style="display:block;">
                    <RadioGroup v-model="formInline.radio">
                        <Radio label="党建需求"></Radio>
                        <Radio label="服务需求"></Radio>
                        <Radio label="其他需求"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem style="display:block;">
                    <Input v-model="formInline.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写需求内容"></Input>
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
import { Select, Table, Modal, RadioGroup, Radio } from 'iview'
export default {
    components: {
        Select, Table, Modal, RadioGroup, Radio
    },
    data() {
        return {
            modal: false,
            formValidate: {
                jiguanname: '城北区支委',
                sehquname: ''
            },
            publicForm: {
                qingdan: [
                    {
                        title: 'John Brown',
                        type: '18'
                    },
                    {
                        title: 'John Brown',
                        type: '18'
                    },
                    {
                        title: 'John Brown',
                        type: '18'
                    },
                    {
                        title: 'John Brown',
                        type: '18'
                    }
                ]
            },
            meetMapDown: [],
            ruleValidate: {
                jiguanname: [
                    { required: true, message: '请选择机关党组织名称', trigger: 'blur' }
                ],
                sehquname: [
                    { required: true, message: '请选择联点村（社区）党组织名称', trigger: 'change' }
                ],
                qingdan: [
                    {
                        required: true, message: '请上传需求清单', trigger: 'change'
                    }
                ]
            },
            columns: [
                {
                    title: "需求类型",
                    key: "title"
                },
                {
                    title: "需求内容",
                    key: "type"
                },
                {
                    title: '操作',
                    tooltip: true,
                    align: 'center',
                    width: '200px',
                    slot: 'opration',
                }
            ],
            formInline: {
                radio: '',
                textarea: ''
            }

        }
    },
    mounted() {

    },
    methods: {
        close() {
            this.modal = false
        },
        sure() {
            this.close()
        },
        cancel() {
            this.close()
        }
    }
}
</script>
<style lang="less">
.orginalmanage {
    .goupload {
        width: 93px;
        background: rgba(200, 39, 33, 1);
        border-radius: 3px;
    }
    .editiocn {
        position: relative;
        padding-left: 18px;
        margin-right: 25px;
        &:before {
            content: "";
            position: absolute;
            left: 0;
            top: 4px;
            width: 14px;
            height: 14px;
            background: url("~@/assets/images/edit.png") left top no-repeat;
            background-size: 14px 14px;
        }
    }
    .del-btn {
        position: relative;
        padding-left: 18px;
        &:before {
            content: "";
            position: absolute;
            left: 0;
            top: 5px;
            width: 14px;
            height: 14px;
            background: url("~@/assets/images/delete.png") left top no-repeat;
            background-size: 14px 14px;
        }
    }
}
</style>