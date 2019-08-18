<template>
    <div>
        <Table :loading="loading" stripe border :columns="columns" :data="data"></Table>
        <div class="text-right" style="padding:30px 0 0 0">
            <Page :current.sync="params.pageIndex" :total="total" :page-size="params.MaxResultCount" class-name="lhyj-page" />
        </div>           
    </div>
</template>
<script>
import { Table, Page } from 'iview'
import { SkipCount, ClearParams } from '@/mixins'
import { GetPagedPartyMemberListStatitics } from '@/api/statistics'
export default {
    mixins: [SkipCount,ClearParams],
    components: {
        Table,
        Page
    },
    props: {
        organization: {
            type: Object
        },
        searchParams: {
            type: Object
        }
    },
    watch: {
        organization: {
            deep: true,
            handler () {
                this.loadData();
            }
        }
    },
    data() {
        return {
            loading: false,
            params: {
                MaxResultCount: 9,
                SkipCount: 0,
                pageIndex: 1                
            },
            columns: [{
                title: '组织名称',
                key: 'organName'
            },{
                title: '入库党员',
                key: 'dyCount'
            },{
                title: '正式党员',
                key: 'zsdyCount'
            },{
                title: '预备党员',
                key: 'ybdyCount'
            },{
                title: '女党员',
                key: 'womenCount'
            },{
                title: '少数名族党员',
                key: 'notHanNationCount'
            },{
                title: '大专以上学历党员',
                key: 'dzUpEducationCount'
            }],
            data: [],
            total: 0
        }
    },
    methods: {
        loadData () {
            this.loading = true;
            let params = JSON.parse(JSON.stringify(this.params));
            params.SkipCount = this.SkipCount(params.MaxResultCount,params.pageIndex);
            Object.assign(params,this.searchParams);             
            if(this.organization){
                params.OrganId = this.organization.id;
            }
            GetPagedPartyMemberListStatitics(this.ClearParams(params)).then(res=>{
                this.total = res.totalCount||res.length;
                this.data = res.items||res;
            }).finally(()=>{
                this.loading = false;
            })
        }
    },
    mounted () {
        this.loadData();
    }
}
</script>

