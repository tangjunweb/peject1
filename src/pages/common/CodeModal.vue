<template>
    <Modal
        :value="show"
        :title="title"
        :closable="false"
        :mask-closable="false"
        width="800px"
        :transfer="true"
        class-name="modal-form"
        @on-visible-change="change">
        <div style="position:relative">
            <Form ref="form" :model="formModel" :rules="rules" :label-width="100">
                <Row :gutter="30">
                    <Col :span="12">
                        <FormItem label="父码表">
                            <Select :disabled="!!(this.code&&this.code.id)" clearable v-model="formModel.parentValue" :transfer="true">
                                <Option v-for="(el,i) in parentCode" :key="i" :value="el.value">{{el.text}}</Option>
                            </Select>
                        </FormItem>                            
                    </Col>    
                    <Col :span="12">
                        <FormItem label="码表类型" prop="codeType">
                            <Select disabled v-model="formModel.codeType" :transfer="true">
                                <Option v-for="(el,i) in codeTypes" :key="i" :value="el.value">{{el.text}}</Option>
                            </Select>
                        </FormItem>                            
                    </Col>  
                    <Col :span="12">
                        <FormItem label="码表名称" prop="text">
                            <Input v-model="formModel.text" placeholder="请输入码表名称"></Input>
                        </FormItem>                            
                    </Col>   
                    <Col :span="12" v-if="this.code&&this.code.id">
                        <FormItem label="码表值">
                            <Input disabled v-model="formModel.value" placeholder="请输入码表值"></Input>
                        </FormItem>                            
                    </Col>   
                    <Col :span="12">
                        <FormItem label="排序" prop="sortCode">
                            <InputNumber style="width:100%" :min="0" v-model="formModel.sortCode"></InputNumber>
                        </FormItem>                            
                    </Col>                                                                                                                                                                                                                                                       
                </Row>
            </Form>   
            <Spin v-show="spinShow" fix>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>加载中</div>
            </Spin>                 
        </div>                       
        <div slot="footer">
            <Button type="primary" :loading="loading" @click="save">保存</Button>
            <Button @click="cancel">关闭</Button>
        </div>        
    </Modal>        
</template>
<script>
import { Modal,Form,FormItem,Input,InputNumber,Select,Option } from 'iview'
import Code from '@/pages/model/Code'
import { CreateOrUpdateBaseCode } from '@/api'
export default {
    name: 'code-modal',
    components: {
        Modal,
        Form,
        FormItem,
        Input,
        InputNumber,
        Select,
        Option
    },
    props: {
        value: Boolean,
        code: Object,
        codeTypes: Array,
        codeType: [Number,String],
        title: {
            type: String,
            default: '新增码表'
        },
        codes: Array
    },
    data() {
        return {
            loading: false,
            spinShow: false,
            formModel: new Code(),
            rules: Code.getRules(),
        }
    },
    computed: {
        show () {
            return this.value; 
        },
        parentCode () {
            if(this.code&&this.code.id){
                return this.codes.filter(e=>{
                    return e.id !== this.code.id;
                })
            }
            return this.codes;
        }
    },
    watch: {
        value (n) {
            if(n){
                if(this.code&&this.code.id){
                    this.formModel = new Code(this.code);
                }else{
                    this.formModel = new Code();
                }
                if(this.codeType){
                    this.formModel.codeType = this.codeType;
                }                
            }
        },
        codeType (v) {
            this.formModel.codeType = this.codeType;
        }
    },
    methods: {
        cancel () {
            this.$emit('input',false);
        },
        change (f) {
            this.$emit('input',f);
        },
        save () {
            this.$refs['form'].validate(valid=>{
                if(valid){
                    this.loading = true;
                    CreateOrUpdateBaseCode({baseCode:Code.getModel(this.formModel)}).then(res=>{
                        this.$Message.success('操作成功');
                        this.$emit('input',false);
                        this.$emit('change');
                    }).complete(()=>{
                        this.loading = false;
                    })
                }
            })
        }
    }      
}
</script>
<style lang="less" scoped>

</style>


