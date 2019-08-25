<template>
    <Modal
        :value="value"
        title="其他信息"
        class-name="blue-modal"
        width="800px"
        transfer
        @on-visible-change="visibleChange"
        >
        <div class="scroll modal-scroll">
            <Spin fix v-if="loading"></Spin>
            <div class="organ-form-item">
                <Alert type="success">
                    党组织奖惩信息
                </Alert>
                <Table :loading="loading1" :columns="columns1" :data="data1"></Table>  
                <div class="text-right" style="padding:30px 0 0 0">
                    <Page :current.sync="params1.pageIndex" :total="total1" :page-size="params1.MaxResultCount" class-name="lhyj-page" />
                </div>                        
            </div>
            <div class="organ-form-item">
                <Alert type="success">        
                    党组织换届信息
                </Alert>        
                <Table :loading="loading2" :columns="columns2" :data="data2"></Table> 
                <div class="text-right" style="padding:30px 0 0 0">
                    <Page :current.sync="params2.pageIndex" :total="total2" :page-size="params2.MaxResultCount" class-name="lhyj-page" />
                </div>                         
            </div>
            <div class="organ-form-item">
                <Alert type="success">
                    党组织考核信息
                </Alert>         
                <Table :loading="loading3" :columns="columns3" :data="data3"></Table>   
                <div class="text-right" style="padding:30px 0 0 0">
                    <Page :current.sync="params3.pageIndex" :total="total3" :page-size="params3.MaxResultCount" class-name="lhyj-page" />
                </div>                          
            </div>            
        </div>
        <div slot="footer">
            <Button @click="close" type="primary">关闭</Button>
        </div>
    </Modal>     
</template>
<script>
import { Table,Page,Modal } from 'iview'
import { 
    GetOgranBonusPenaltyByOrganIdAsync, 
    GetOrganReplacementByOrganIdAsync, 
    GetOrganAssessmentByOrganIdAsync, 
    } from '@/api/partyOrganizationService'
import { GetUpLoadAuth } from '@/api'    
export default {
    components: {
        Table,
        Page,
        Modal
    },
    props: {
        value: Boolean,
        organization: Object        
    },
    watch: {
        params1: {
            deep: true,
            handler () {
                this.loadData1();
            }
        },
        params2: {
            deep: true,
            handler () {
                this.loadData2();
            }
        },
        params3: {
            deep: true,
            handler () {
                this.loadData3();
            }
        },
        value (f) {
            if(f){
                this.loadData1();
                this.loadData2();
                this.loadData3();
            }
        }              
    },    
    data() {
        let that = this;
        return {
            loading: false,
            data1: [],
            loading1: false,
            params1: {
                MaxResultCount: 5,
                SkipCount: 0,
                pageIndex: 1,                
            },
            total1: 0,
            columns1: [{
                title: '党组织受奖惩名称',
                key: 'bonnusPenaltyName',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.GetCodeTableValue(row.bonnusPenaltyName,'BonnusPenalty'))
                }
            },{
                title: '党组织受奖惩批准日期',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.FormatDate(row.approvalDate,'yyyy-MM-dd'))
                }
            },{
                title: '奖惩批准党组织名称',
                key: 'approvalOrganName',
                tooltip: true
            },{
                title: '奖惩依据',
                tooltip: true,
                render (h,{row}) {
                    return h('span',{
                        class: 'zdy-table-link success',
                        on: {
                            click () {
                                that.downLoad(row.accordingAttach.id);
                            }
                        }
                    },row.accordingAttach.name)
                }
            }],
            data2: [],
            loading2: false,
            params2: {
                MaxResultCount: 5,
                SkipCount: 0,
                pageIndex: 1,                
            },            
            total2: 0,
            columns2: [{
                title: '班子届次（届）',
                key: 'teamTime',
                tooltip: true
            },{
                title: '班子当选日期',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.FormatDate(row.eletedDate,'yyyy-MM-dd'))
                }
            },{
                title: '班子届满日期',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.FormatDate(row.expiryDate,'yyyy-MM-dd'))
                }                
            },{
                title: '当前届次标识',
                tooltip: true,
                render (h,{row}) {
                    return h('span',row.isCurrentTeamTime ? '是' : '否')
                }
            },{
                title: '班子产生方式',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.GetCodeTableValue(row.produceWay,'ProduceWay'))
                }
            },{
                title: '选举应到会人数',
                key: 'meetingUserCount',
                tooltip: true
            }],
            data3: [],
            loading3: false,
            params3: {
                MaxResultCount: 5,
                SkipCount: 0,
                pageIndex: 1,                
            },     
            total3: 0,       
            columns3: [{
                title: '考核时间',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.FormatDate(row.assessDate,'yyyy-MM-dd'))
                }
            },{
                title: '实施方案',
                tooltip: true,
                render (h,{row}) {
                    let a = row.attachs.find(e=>e.type===10001);
                    if(a){
                        return h('span',{
                            class: 'zdy-table-link success',
                            on: {
                                click () {
                                    that.downLoad(a.id);
                                }
                            }
                        },a.name)                        
                    }else{
                        return h('span','-')
                    }
                }
            },{
                title: '述职报告',
                tooltip: true,
                render (h,{row}) {
                    let a = row.attachs.find(e=>e.type===10002);
                    if(a){
                        return h('span',{
                            class: 'zdy-table-link success',
                            on: {
                                click () {
                                    that.downLoad(a.id);
                                }
                            }
                        },a.name)                        
                    }else{
                        return h('span','-')
                    }
                }                
            },{
                title: '点评讲话',
                tooltip: true,
                render (h,{row}) {
                    let a = row.attachs.find(e=>e.type===10003);
                    if(a){
                        return h('span',{
                            class: 'zdy-table-link success',
                            on: {
                                click () {
                                    that.downLoad(a.id);
                                }
                            }
                        },a.name)                        
                    }else{
                        return h('span','-')
                    }
                }                  
            },{
                title: '测评考核结果及运用情况',
                tooltip: true,
                render (h,{row}) {
                    let a = row.attachs.find(e=>e.type===10004);
                    if(a){
                        return h('span',{
                            class: 'zdy-table-link success',
                            on: {
                                click () {
                                    that.downLoad(a.id);
                                }
                            }
                        },a.name)                        
                    }else{
                        return h('span','-')
                    }
                }                  
            },{
                title: '整改情况',
                tooltip: true,
                render (h,{row}) {
                    let a = row.attachs.find(e=>e.type===10005);
                    if(a){
                        return h('span',{
                            class: 'zdy-table-link success',
                            on: {
                                click () {
                                    that.downLoad(a.id);
                                }
                            }
                        },a.name)                        
                    }else{
                        return h('span','-')
                    }
                }                  
            }]
        }
    },
    methods: {
        downLoad (id) {
            GetUpLoadAuth().then(res=>{
                window.open(`${UPLOAD_PATH}/file/download?project=${res.project}&token=${res.token}&id=${id}`)
            })               
        },        
        visibleChange (flag) {
            if(!flag){
                this.$emit('input',false);
            }
        },
        close () {
            this.$emit('input',false);
        },
        loadData1 () {
            let params = JSON.parse(JSON.stringify(this.params1));
            params.SkipCount = this.params1.pageIndex*this.params1.MaxResultCount-this.params1.MaxResultCount; 
            params.key = this.organization.id;         
            this.loading1 = true;      
            GetOgranBonusPenaltyByOrganIdAsync(params).then(res=>{
                this.total1 = res.totalCount;
                this.data1 = res.items;
            }).finally(()=>{
                this.loading1 = false;
            })            
        },
        loadData2 () {
            let params = JSON.parse(JSON.stringify(this.params2));
            params.SkipCount = this.params2.pageIndex*this.params2.MaxResultCount-this.params2.MaxResultCount; 
            params.key = this.organization.id;         
            this.loading2 = true;      
            GetOrganReplacementByOrganIdAsync(params).then(res=>{
                this.total2 = res.totalCount;
                this.data2 = res.items;
            }).finally(()=>{
                this.loading2 = false;
            })            
        },
        loadData3 () {
            let params = JSON.parse(JSON.stringify(this.params3));
            params.SkipCount = this.params3.pageIndex*this.params3.MaxResultCount-this.params3.MaxResultCount; 
            params.key = this.organization.id;           
            this.loading3 = true;      
            GetOrganAssessmentByOrganIdAsync(params).then(res=>{
                this.total3 = res.totalCount;
                this.data3 = res.items;
            }).finally(()=>{
                this.loading3 = false;
            })            
        },       
    },
}
</script>

