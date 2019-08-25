<template>
    <div>
        <Alert show-icon type="info">行政班子成员</Alert>
        <Table :loading="loading" :columns="columns" :data="data"></Table>
        <div class="text-right" style="padding:30px 0 0 0">
            <Page :current.sync="params.pageIndex" :total="total" :page-size="params.MaxResultCount" class-name="lhyj-page" />
        </div>            
    </div>
</template>
<script>
import { Table, Page } from 'iview'
import { GetOrganAdminTeamMeberList } from '@/api/partyOrganizationService'
import { SkipCount, ClearParams } from '@/mixins'
export default {
    mixins: [SkipCount,ClearParams],
    components: {
        Table,
        Page
    },
    props: {
        unit: Object
    },
    data() {
        let that = this;
        return {
            loading: false,
            columns: [{
                title: '姓名',
                tooltip: true,
                key: 'name'
            },{
                title: '身份证号码',
                tooltip: true,
                key: 'idCard'
            },{
                title: '职务名称',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.GetCodeTableValue(row.adminDutyCode,'AdminDutyCode'))
                }
            },{
                title: '任职日期',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.DateFormat(row.adminDutyDate,'yyyy-MM-dd'))
                }
            },{
                title: '是否在任',
                tooltip: true,
                render (h,{row}) {
                    return h('span',row.adminDutyIsInOffice ? '是' : '否')
                }
            },{
                title: '是否党员',
                tooltip: true,
                render (h,{row}) {
                    return h('span',row.isPartyMember ? '是' : '否')
                }
            }],
            data: [],
            total: 0,
            params: {
                MaxResultCount: 9,
                SkipCount: 0,
                pageIndex: 1
            }
        }
    },
    methods: {
        loadData () {
            let params = JSON.parse(JSON.stringify(this.params));
            params.SkipCount = this.SkipCount(params.MaxResultCount,params.pageIndex);
            Object.assign(params,this.searchParams);    
            this.loading = true;
            GetOrganAdminTeamMeberList(this.ClearParams(params)).then(res=>{
                this.total = res.totalCount;
                this.data = res.items;
            }).finally(()=>{
                this.loading = false;
            })                
        }
    },
    mounted () {

    }
}
</script>

