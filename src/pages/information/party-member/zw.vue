<template>
    <div>                         
        <div class="organ-form-item">
            <Alert type="success">
                党内职务信息
            </Alert>
            <Table :columns="columns1" :data="data"></Table>                       
        </div>
        <!-- <div class="organ-form-item">
            <Alert type="info" show-icon>        
                行政职务信息
            </Alert>        
            <Table :columns="columns2" :data="data"></Table>                        
        </div> -->
        <div class="organ-form-item">
            <Alert type="success">
                “两代表一委员”信息
            </Alert>         
            <Table :columns="columns3" :data="data"></Table>                          
        </div>           
    </div>
</template>
<script>
import { Table } from 'iview'
export default {
    components: {
        Table
    },
    props: {
        partyMember: {
            type: Object
        }
    },  
    computed: {
        data () {
            return [this.partyMember]
        },
        columns1 () {
            let that = this;
            return [{
                title: '任职党组织',
                tooltip: true,
                render (h,{row}) {
                    return h('span',row.organName)
                }
            },{
                title: '党内职务名称',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.GetCodeTableValue(row.partyMember.partyDutyCode,'PartyDutyCode')||row.partyMember.partyDutyCode)
                }
            },{
                title: '任职日期',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.FormatDate(row.partyMember.partyDutyDate,'yyyy-MM-dd'))
                }
            },{
                title: '离职日期',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.FormatDate(row.partyMember.partyDutyOutDate,'yyyy-MM-dd'))
                }                
            }]
        },
        columns2 () {
            let that = this;
            return [{
                title: '任职机构名称',
                tooltip: true,
                render (h,{row}) {
                    return h('span',row.partyMember.archiveUnitName)
                }                
            },{
                title: '党内职务名称',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.GetCodeTableValue(row.addition.adminDutyCode,'AdminDutyCode')||row.addition.adminDutyCode)
                }                
            },{
                title: '任职日期',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.FormatDate(row.addition.adminDutyDate,'yyyy-MM-dd'))
                }                
            },{
                title: '是否在任',
                tooltip: true,
                render (h,{row}) {
                    return h('span',row.addition.adminDutyIsInOffice ? '是' : '否')
                }                
            },{
                title: '离职日期',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.FormatDate(row.addition.adminDutyOutDate,'yyyy-MM-dd'))
                }                   
            },{
                title: '兼任情况',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.GetCodeTableValue(row.addition.adminPTSituation,'AdminDutyCode')||row.addition.adminPTSituation)
                }                   
            }]
        },
        columns3 () {
            let that = this;
            return [{
                title: '类别',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.GetCodeTableValue(row.addition.coreType,'COREType')||row.addition.coreType)
                }                 
            },{
                title: '当选日期',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.FormatDate(row.addition.corElectedDate,'yyyy-MM-dd'))
                }                    
            },{
                title: '届满日期',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.FormatDate(row.addition.corExpiryDate,'yyyy-MM-dd'))
                }                    
            },{
                title: '终止日期',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.FormatDate(row.addition.corAbortDate,'yyyy-MM-dd'))
                }                    
            },{
                title: '终止原因',
                tooltip: true,
                render (h,{row}) {
                    return h('span',row.addition.corAbortReason)
                }                    
            }]
        }                
    }
}
</script>

