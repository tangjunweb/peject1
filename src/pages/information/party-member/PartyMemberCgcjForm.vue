<template>
    <div>
        <div class="text-right" style="margin-bottom: 20px">
            <Button type="primary" @click="add">新增</Button>
        </div>
        <Table :columns="columns" :data="data"></Table>
        <Modal
            v-model="showModal"
            :title="model.id ? '编辑出国（出境）信息' : '新增出国（出境）信息'"
            :closable="false"
            :mask-closable="false"
            transfer
            :loading="modalLoading"
            width="800px"
            class-name="blue-modal"
            >          
            <div class="scroll modal-scroll">         
            <Form ref="form" :model="model" :rules="rules">
                <Row :gutter="30">   
                    <Col :span="12">
                        <FormItem label="前往国家（地区）" prop="abroadCountry">
                            <Input  v-model="model.abroadCountry" placeholder="请输入前往国家（地区）"></Input>
                        </FormItem>                      
                    </Col>                       
                    <Col :span="12">
                        <FormItem label="出国日期" prop="abroadDate">
                            <DatePicker style="width:100%" :transfer="true"  placeholder="选择日期" v-model="model.abroadDate"></DatePicker>
                        </FormItem>                      
                    </Col> 
                    <Col :span="12">
                        <FormItem label="回国日期" prop="backDate">
                            <DatePicker style="width:100%" :transfer="true"  placeholder="选择日期" v-model="model.backDate"></DatePicker>
                        </FormItem>                      
                    </Col>                     
                    <Col :span="24">
                        <FormItem label="出国原因" prop="abroadReason">
                            <Input type="textarea" :rows="3"  v-model="model.abroadReason" placeholder="请输入出国原因"></Input>
                        </FormItem>                     
                    </Col>                          
                </Row>
            </Form>
            </div>
            <div slot="footer">
                <Button type="primary" @click="showModal = false">取消</Button>
                <Button type="primary" :loading="modalLoading" @click="save">保存</Button>
            </div>        
        </Modal>          
    </div>
</template>
<script>
import { Form, FormItem, Modal, Table, DatePicker, Input } from 'iview'
import { DeleteAbroad,UpdateAbroad } from '@/api/partyOrganizationService'
import Abroad from '@/pages/model/Abroad'
export default {
    props: {
        partyMember: {
            type: Object
        }
    },    
    components: {
        Form,
        FormItem,
        Modal,
        Table,
        DatePicker,
        Input,
    },
    data() {
        let that = this;
        return {
            model: new Abroad(),
            rules: Abroad.getRules(),
            showModal: false,
            modalLoading: false,
            columns: [{
                title: '前往国家（地区）',
                key: 'abroadCountry'
            },{
                title: '出国（境）原因',
                key: 'abroadReason'
            },{
                title: '出国（境）日期',
                render (h,{row}) {
                    return h('span',that.FormatDate(row.abroadDate,'yyyy-MM-dd'))
                }                
            },{
                title: '回国日期',
                render (h,{row}) {
                    return h('span',that.FormatDate(row.backDate,'yyyy-MM-dd'))
                }
            },{
                title: '操作',
                align: 'right',
                className: "zdy-table-opration",
                render (h,{row}) {
                    return h('span',[
                        h('a',{
                            on: {
                                click () {
                                    that.model = new Abroad(row);
                                    that.showModal = true;
                                }
                            }
                        },'编辑'),
                        h('a',{
                            on: {
                                click () {
                                    this.$Modal.confirm({
                                        title: '系统提示',
                                        content: '确认删除该条出国（境）信息？',
                                        onOk: () => {
                                            DeleteAbroad({
                                                id: row.id
                                            }).then(res => {
                                                that.$emit('change');
                                                that.$Message.success('删除成功');
                                            })
                                        }
                                    });  
                                }
                            }
                        },'删除')                        
                    ])
                }
            }]
        }
    },
    computed: {
        data () {
            return this.partyMember.abroad;
        }
    },
    methods: {
        save () {
            this.$refs['form'].validate(valid=>{
                if(valid){
                    this.modalLoading = true;
                    UpdateAbroad(Abroad.getModel(this.model)).then(res=>{
                        this.$Message.success('保存成功');
                        this.showModal = false;
                        this.$emit('change');
                    }).finally(()=>{
                        this.modalLoading = false;
                    })
                }
            })
        },
        add () {
            this.model = new Abroad({userId: this.$route.query.id});
            this.showModal = true;
        }
    }
}
</script>
