<template>
    <Modal
        :value="value"
        title="班子成员"
        transfer
        class-name="blue-modal"
        width="800px"
        @on-visible-change="visibleChange"
        >
        <div class="scroll modal-scroll">
            <Spin fix v-if="loading"></Spin>
            <div class="organ-form-item">
                <Alert type="success">
                    党组织班子成员信息
                </Alert>
                <Table :loading="loading1" :columns="columns1" :data="data1"></Table>  
                <div class="text-right" style="padding:30px 0 0 0">
                    <Page :current.sync="params1.pageIndex" :total="total1" :page-size="params1.MaxResultCount" class-name="lhyj-page" />
                </div>                        
            </div>
            <div class="organ-form-item">
                <Alert type="success">        
                    行政班子成员信息
                </Alert>        
                <Table :loading="loading2" :columns="columns2" :data="data2"></Table> 
                <div class="text-right" style="padding:30px 0 0 0">
                    <Page :current.sync="params2.pageIndex" :total="total2" :page-size="params2.MaxResultCount" class-name="lhyj-page"  />
                </div>                         
            </div>
            <div class="organ-form-item">
                <Alert type="success">
                    “两代表一委员”信息
                </Alert>         
                <Table :loading="loading3" :columns="columns3" :data="data3"></Table>   
                <div class="text-right" style="padding:30px 0 0 0">
                    <Page :current.sync="params3.pageIndex" :total="total3" :page-size="params3.MaxResultCount" class-name="lhyj-page"  />
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
    GetOrganAdminTeamMeberList, 
    GetOrganPartyTeamMeberList, 
    GetOrganTwoOneTeamMeberList
    } from '@/api/partyOrganizationService'
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
                title: '姓名',
                key: 'name',
                tooltip: true
            },{
                title: '身份证号码',
                key: 'idCard',
                tooltip: true
            },{
                title: '职务级别',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.GetCodeTableValue(row.partyDutyClass,'PartyDutyClass'))
                }
            },{
                title: '任职日期',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.FormatDate(row.partyDutyDate,'yyyy-MM-dd'))
                }
            },{
                title: '是否在任',
                tooltip: true,
                render (h,{row}) {
                    return row.partyDutyIsInOffice ? '是' : '否';
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
                title: '姓名',
                key: 'name',
                tooltip: true
            },{
                title: '身份证号码',
                key: 'idCard',
                tooltip: true
            },{
                title: '职务名称',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.GetCodeTableValue(row.adminDutyCode,'AdminDutyCode')||row.adminDutyCode)
                }                
            },{
                title: '任职日期',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.FormatDate(row.adminDutyDate,'yyyy-MM-dd'))
                }                
            },{
                title: '是否在任',
                tooltip: true,
                render (h,{row}) {
                    return row.adminDutyIsInOffice ? '是' : '否';
                }
            },{
                title: '兼任情况',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.GetCodeTableValue(row.adminPTSituation,'AdminDutyCode')||row.adminPTSituation)
                }                  
            },{
                title: '是否党员',
                key: '',
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
                title: '姓名',
                key: 'name',
                tooltip: true
            },{
                title: '身份证号码',
                key: 'idCard',
                tooltip: true
            },{
                title: '类别',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.GetCodeTableValue(row.coreType,'COREType'))
                }
            },{
                title: '当选日期',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.FormatDate(row.corElectedDate,'yyyy-MM-dd'))
                }                  
            },{
                title: '届满日期',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.FormatDate(row.corExpiryDate,'yyyy-MM-dd'))
                }                  
            },{
                title: '是否在任',
                tooltip: true,
                render (h,{row}) {
                    return h('span',row.coreIsInOffice ? '是' : '否');
                }
            }]            
        }
    },
    methods: {
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
            params.id = this.organization.id;          
            this.loading1 = true;      
            GetOrganPartyTeamMeberList(params).then(res=>{
                this.total1 = res.length;
                this.data1 = res;
            }).finally(()=>{
                this.loading1 = false;
            })            
        },
        loadData2 () {
            let params = JSON.parse(JSON.stringify(this.params2));
            params.SkipCount = this.params2.pageIndex*this.params2.MaxResultCount-this.params2.MaxResultCount; 
            params.id = this.organization.id;         
            this.loading2 = true;      
            GetOrganAdminTeamMeberList(params).then(res=>{
                this.total2 = res.length;
                this.data2 = res;
            }).finally(()=>{
                this.loading2 = false;
            })            
        },
        loadData3 () {
            let params = JSON.parse(JSON.stringify(this.params3));
            params.SkipCount = this.params3.pageIndex*this.params3.MaxResultCount-this.params3.MaxResultCount; 
            params.id = this.organization.id;          
            this.loading3 = true;      
            GetOrganTwoOneTeamMeberList(params).then(res=>{
                this.total3 = res.length;
                this.data3 = res;
            }).finally(()=>{
                this.loading3 = false;
            })            
        },        
    },
}
</script>

