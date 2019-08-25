<template>
    <div>
        <div class="text-right" style="margin-bottom: 20px">
            <Button type="primary" @click="add">新增</Button>
        </div>
        <Table :columns="columns" :data="data"></Table>
        <Modal
            v-model="showModal"
            :title="model.id ? '编辑奖惩信息' : '新增奖惩信息'"
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
                        <FormItem label="受奖惩名称" prop="bonnusPenaltyName">
                            <common-select keys="BonnusPenalty"  v-model="model.bonnusPenaltyName"></common-select>
                        </FormItem>                      
                    </Col>                       
                    <Col :span="12">
                        <FormItem label="批准时间" prop="approvalDate">
                            <DatePicker style="width:100%" :transfer="true"  placeholder="选择日期" v-model="model.approvalDate"></DatePicker>
                        </FormItem>                      
                    </Col> 
                    <Col :span="24">
                        <FormItem label="情况说明" prop="instruction">
                            <Input type="textarea" :rows="3"  v-model="model.instruction" placeholder="请输入奖惩名称"></Input>
                        </FormItem>                     
                    </Col>  
                    <Col :span="12">
                        <FormItem label="批准机关" prop="approvaOrganId">
                            <OrganizationCascader :label="model.approvaOrganName"  v-model="model.approvaOrganId"></OrganizationCascader>
                        </FormItem>                     
                    </Col>  
                    <Col :span="24">
                        <FormItem label="附件">
                            {{model.attachMent ? model.attachMent.name : ''}}
                            <UploadAttachment @change="uploadChange" AttachClass="2" ></UploadAttachment>
                        </FormItem>                     
                    </Col>                                               
                </Row>
            </Form>
            </div>
            <div slot="footer">
                <Button type="primary" :loading="modalLoading" @click="save">保存</Button>
                <Button type="primary" @click="showModal = false">关闭</Button>
            </div>        
        </Modal>          
    </div>
</template>
<script>
import { Form, FormItem, Modal, Table, DatePicker, Input } from 'iview'
import { UpdateBonusPenalty } from '@/api/partyOrganizationService'
import { DeleteBonusPenalty } from '@/api/partyMember'
import BonusPenalty from '@/pages/model/BonusPenalty'
import OrganizationCascader from '@/components/OrganizationCascader'
import UploadAttachment from '@/components/UploadAttachment'
import { GetUpLoadAuth } from '@/api'
import CommonSelect from '@/components/CommonSelect'
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
        OrganizationCascader,
        UploadAttachment,
        CommonSelect
    },
    data() {
        let that = this;
        return {
            model: new BonusPenalty(),
            rules: BonusPenalty.getRules(),
            showModal: false,
            modalLoading: false,
            columns: [{
                title: '奖惩名称',
                render (h,{row}) {
                    return h('span',that.GetCodeTableValue(row.bonnusPenaltyName,'BonnusPenalty'))
                }
            },{
                title: '奖惩批准日期',
                render (h,{row}) {
                    return h('span',that.FormatDate(row.approvalDate,'yyyy-MM-dd'))
                }
            },{
                title: '奖惩批准机关',
                key: 'approvaOrganName'
            },{
                title: '附件',
                className: "zdy-table-opration",
                render (h,{row}) {
                    if(row.attachMent){
                        return h('a',{
                            on: {
                                click () {
                                    GetUpLoadAuth().then(res=>{
                                        window.open(`${UPLOAD_PATH}/file/download?project=${res.project}&token=${res.token}&id=${row.attachMent.id}`)
                                    })   
                                }
                            }
                        },row.attachMent.name)                        
                    }else{
                        return h('span','无')
                    }
                }
            },{
                title: '操作',
                align: 'right',
                className: "zdy-table-opration",
                render (h,{row}) {
                    if(!row.tag){
                        return h('span',[
                            h('a',{
                                on: {
                                    click () {
                                        that.model = new BonusPenalty(row);
                                        that.showModal = true;
                                    }
                                }
                            },'编辑'),
                            h('a',{
                                on: {
                                    click () {
                                        this.$Modal.confirm({
                                            title: '系统提示',
                                            content: '确认删除该条奖惩信息？',
                                            onOk: () => {
                                                DeleteBonusPenalty({
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
                    }else{
                        return h('span','-')
                    }
                }
            }]
        }
    },
    computed: {
        data () {
            return this.partyMember.bonusPenalty;
        }
    },
    methods: {
        save () {
            this.$refs['form'].validate(valid=>{
                if(valid){
                    this.modalLoading = true;
                    UpdateBonusPenalty(BonusPenalty.getModel(this.model)).then(res=>{
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
            this.model = new BonusPenalty({userId: this.$route.query.id});
            this.showModal = true;
        },
        uploadChange (file) {
            Object.assign(this.model.attachMent,file);
        },          
    }
}
</script>

