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
                <TabPane label="单位基本信息" name="dwjbxx">
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
                <TabPane label="行政班子成员" name="xzbzcy">
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
    name: 'unit-modal',
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
            default: '新建单位'
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
            tabName: 'dwjbxx'
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


