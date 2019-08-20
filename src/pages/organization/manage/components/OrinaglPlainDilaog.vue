<template>
    <Dialog 
        okText='确认选择' 
        width='1000px' 
        height='400px' 
        :visible.sync='dialogvisible'
        @confirm='confirm'>
            <div class='original-dialog'>
                <div class='original-dialog-header'>
                    <Form>
                        <FormItem label="姓名" :label-width="80">
                            <Input style="width:278px" v-model="searchParams.Keyword" placeholder="请填写"></Input>
                            <Button style="margin-left:20px" type="primary"  ghost>搜索</Button>
                            <Button style="float:right" type="primary">新增</Button>
                        </FormItem>
                    </Form>
                </div>
                <div  class="flexfull">
                    <div class='dialog-left heightfull'>
                        <div class='body-head'>
                            <span>已选择</span>
                            <span class="floatRight">6人</span>
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
                        <Table @on-selection-change='changeTable' :loading="loading" stripe :columns="columns" ref="table" :data="data"></Table>
                    </div>
                </div>
            </div>
        </Dialog>
   
</template>
<script>
import {Table} from 'iview'
export default {
    props: {
         visible: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Table
    },
    data () {
        return {
            dialogvisible: false,
            loading: false,
            columns: [
                 {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },{
                    title: "性别",
                    key: "sex"
                },{
                    title: "姓名",
                    key: "name"
                },{
                    title: "年龄",
                    key: "age"
                },{
                    title: "身份证号",
                    key: "card"
                },
                
            ],
            leftDate: [],
            data: [
                {
                    sex: '男',
                    age: 17,
                   name: '李四', 
                   card:1992
                }
            ],
            searchParams: {
                Keyword: ''
            }
        }
    },
    mounted() {
        // 获取用户接口
    },
    methods: {
        loadData () {},
        changeTable (selection) {
            this.leftDate = selection
        },
        remove (item, index) {
            this.leftDate.splice(index, 1)
            let _index = this.data.findIndex(row => row.card === item.card)
            if (_index >= 0) {
                 this.$refs.table.toggleSelect(index)
            }
        }, 
        submit () {

        }
    },
    watch: {
        visible: {
            immediate: true,
            handler (val) {
                // if (val) {
                //     this.loadData()
                // }
                this.dialogvisible = val
            }
        },
        dialogvisible: {
            handler (val) {
                this.$emit('update:visible', val)
            }
        }
    },
}
</script>
<style lang="less">
.floatRight{
    float: right;
}
    .original-dialog {
        height: 100%;
        display: flex;
        flex-direction: column;
        .flexfull{
            flex: 1;
            display: flex;
            justify-content: space-between;
            .dialog-left{
                width:202px;
                height:100%;
                background:rgba(250,250,250,1);
                border:1px solid rgba(223,223,230,1);
                border-radius:0px 0px 3px 3px;
                margin-right:76px;
                .body-head {
                    padding: 0 25px;
                    line-height: 56px;
                    height:56px;
                    background:rgba(247,247,250,1);
                    border:1px solid rgba(223,223,230,1);
                    border-radius:0px 0px 3px 3px;
                }
                .body-main{
                    height: 100%;
                    box-sizing: border-box;
                    padding-bottom:56px;
                    .body-main-inner{
                        width: 100%;
                        height: 100%;
                        overflow: auto;
                        ul{
                            padding: 0 25px;
                        }
                        li{
                            line-height: 40px;
                        }
                    }
                }
            }
            .dialog-right{
                flex: 1;
                background:rgba(255,255,255,1);
                border:1px solid rgba(223,223,230,1);
                border-radius:0px 0px 3px 3px
            }
            .heightfull{
                box-sizing: border-box;
                height: 100%;
            }
            
        }
    }
</style>