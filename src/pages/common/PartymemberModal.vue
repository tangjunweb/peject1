<template>
    <Modal
        :value="show"
        :title="title"
        :closable="false"
        :mask-closable="false"
        width="800px"
        transfer
        class-name="modal-form"
        @on-visible-change="change">
        <div style="position:relative">
            <Tabs :value="tabName">
                <TabPane label="党员基本信息" name="dyjbxx">
                    <Form ref="formA" :model="formModelA" :rules="rulesA" :label-width="100">
                        <Row :gutter="30">
                            <Col :span="12">
                                <FormItem label="上级党组织">
                                    <Input placeholder="上级党组织"></Input>
                                </FormItem>                            
                            </Col>                                                                                                                                                                       
                        </Row>
                    </Form>
                </TabPane>
                <TabPane label="入党信息" name="dyfzxx">
                    <Form ref="formB" :model="formModelB" :rules="rulesB" :label-width="100">
                        <Row :gutter="30">
                            <Col :span="12">
                                <FormItem label="上级党组织">
                                    <Input placeholder="上级党组织"></Input>
                                </FormItem>                            
                            </Col>                                                                                                                                                                       
                        </Row>
                    </Form>                    
                </TabPane>
                <TabPane label="职务" name="zw">
                    <Form ref="formC" :model="formModelC" :rules="rulesC" :label-width="100">
                        <Row :gutter="30">
                            <Col :span="12">
                                <FormItem label="上级党组织">
                                    <Input placeholder="上级党组织"></Input>
                                </FormItem>                            
                            </Col>                                                                                                                                                                       
                        </Row>
                    </Form>
                </TabPane>
                <TabPane label="奖惩" name="jc">
                    <Form ref="formD" :model="formModelD" :rules="rulesD" :label-width="100">
                        <Row :gutter="30">
                            <Col :span="12">
                                <FormItem label="上级党组织">
                                    <Input placeholder="上级党组织"></Input>
                                </FormItem>                            
                            </Col>                                                                                                                                                                       
                        </Row>
                    </Form>
                </TabPane>
                <TabPane label="出国（境）" name="cgcj">
                    <Form ref="formE" :model="formModelE" :rules="rulesE" :label-width="100">
                        <Row :gutter="30">
                            <Col :span="12">
                                <FormItem label="上级党组织">
                                    <Input placeholder="上级党组织"></Input>
                                </FormItem>                            
                            </Col>                                                                                                                                                                       
                        </Row>
                    </Form>
                </TabPane>
                <TabPane label="困难情况" name="knqk">
                    <Form ref="formF" :model="formModelF" :rules="rulesF" :label-width="100">
                        <Row :gutter="30">
                            <Col :span="12">
                                <FormItem label="上级党组织">
                                    <Input placeholder="上级党组织"></Input>
                                </FormItem>                            
                            </Col>                                                                                                                                                                       
                        </Row>
                    </Form>
                </TabPane>                                
            </Tabs>    
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
import { Modal,Form,FormItem,Tabs,TabPane,Input } from 'iview'
export default {
    name: 'partymember-modal',
    components: {
        Modal,
        Form,
        FormItem,
        Tabs,
        TabPane,
        Input
    },
    props: {
        value: Boolean,
        id: [String,Number],
        title: {
            type: String,
            default: '新建党员'
        }
    },
    data() {
        return {
            loading: false,
            spinShow: false,
            formModelA: {},
            rulesA: {},
            formModelB: {},
            rulesB: {},
            formModelC: {},
            rulesC: {},
            formModelD: {},
            rulesD: {},  
            formModelE: {},
            rulesE: {},  
            formModelF: {},
            rulesF: {},                                                                     
            tabName: 'dyjbxx'
        }
    },
    computed: {
        show () {
            return this.value; 
        }
    },
    watch: {
        value (n) {
            if(n&&this.id){
                this.loadData();
            }
        }
    },
    methods: {
        loadData () {

        },
        cancel () {
            this.$emit('input',false);
        },
        change (f) {
            this.$emit('input',f);
        },
        save () {
            
        }
    }        
}
</script>
<style lang="less" scoped>

</style>


