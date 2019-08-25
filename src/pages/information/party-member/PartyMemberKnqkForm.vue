<template>
    <div>
        <Table v-if="partyMember.id" :columns="columns" :data="data"></Table>
        <Modal
            v-model="showModal"
            title="编辑困难信息"
            :closable="false"
            :mask-closable="false"
            :loading="modalLoading"
            transfer
            width="800px"
            class-name="blue-modal"
            >
            <div class="scroll modal-scroll">
            <Form ref="form" :model="model" :rules="rules">
                <Row :gutter="30">
                    <Col :span="24">
                        <FormItem label="生活困难类型" prop="difficultType">
                            <common-select keys="DifficultType" multiple v-model="partyMember.difficultType"></common-select>
                        </FormItem>
                    </Col>
                    <Col :span="24">
                        <FormItem label="是否享受最低生活保障" prop="approvalDate">
                            <Checkbox v-model="model.partyMember.isLowAllowance"></Checkbox>
                        </FormItem>
                    </Col>
                    <Col :span="24">
                        <FormItem label="健康状况" prop="partyMember.healthSituation">
                            <Input  type="textarea" :rows="5" placeholder="请输入生活困难情况补充" v-model="model.partyMember.healthSituation"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="24">
                        <FormItem label="是否享受抚恤补助" prop="partyMember.isPensionBenefits">
                            <Checkbox v-model="model.partyMember.isPensionBenefits"></Checkbox>
                        </FormItem>
                    </Col>
                    <Col :span="24">
                        <FormItem label="生活困难情况补充" prop="partyMember.difficulInstruction">
                            <Input  type="textarea" :rows="5" placeholder="请输入生活困难情况补充" v-model="model.partyMember.difficulInstruction"></Input>
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
import { Form, FormItem, Modal, Table, DatePicker, Input, Checkbox } from 'iview'
import { UpdatePartyMemberInfo } from '@/api/partyMember'
import PartyMember from '@/pages/model/PartyMember'
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
        Checkbox,
        CommonSelect
    },
    computed: {
        data () {
            return [this.partyMember]
        }
    },
    watch: {
        partyMember: {
            deep: true,
            handler () {
                this.model = new PartyMember(this.partyMember);
            }
        }
    },
    data() {
        let that = this;
        return {
            model: new PartyMember(),
            rules: PartyMember.getRules(),
            showModal: false,
            modalLoading: false,
            columns: [{
                title: '生活困难类型',
                tooltip: true,
                render (h,{row}) {
                    let arr = [];
                    if(row.partyMember.difficultType){
                        row.partyMember.difficultType.split(',').forEach(e=>{
                            arr.push(that.GetCodeTableValue(e,'DifficultType'));
                        })
                    }
                    return h('span',arr.join(','))
                }
            },{
                title: '健康状况',
                tooltip: true,
                render (h,{row}) {
                    return h('span',row.partyMember.healthSituation);
                }
            },{
                title: '是否享受最低生活保障',
                tooltip: true,
                render (h,{row}) {
                    return h('span',row.isLowAllowance ? '是' : '否')
                }
            },{
                title: '是否享受抚恤补助',
                tooltip: true,
                render (h,{row}) {
                    return h('span',row.isPensionBenefits ? '是' : '否')
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
                                    that.showModal = true;
                                }
                            }
                        },'编辑')
                    ])
                }
            }]
        }
    },
    methods: {
        save () {
            this.$refs['form'].validate(valid=>{
                if(valid){
                    this.modalLoading = true;
                    let data = PartyMember.getModel(this.model);
                    data.difficultType = data.difficultType?data.difficultType.join(','):'';
                    UpdatePartyMemberInfo(data).then(res=>{
                        this.$Message.success('保存成功');
                        this.showModal = false;
                        this.$emit('change');
                    }).finally(()=>{
                        this.modalLoading = false;
                    })
                }
            })
        }
    },
    mounted () {
        this.model = new PartyMember(this.partyMember);
    }
}
</script>
