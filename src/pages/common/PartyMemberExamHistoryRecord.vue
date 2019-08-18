<template>
    <Modal
        :value="value"
        :title="title"
        :closable="false"
        :mask-closable="false"
        width="800px"
        transfer
        class-name="blue-modal"
        @on-visible-change="change">
        <div style="position:relative">
            <Table :loading="loading" stripe border :columns="columns" :data="data"></Table>
            <div class="text-right" style="padding:30px 0 0 0">
                <Page :current.sync="params.pageIndex" :total="total" :page-size="params.MaxResultCount" class-name="lhyj-page"/>
            </div>                
        </div>                       
        <div slot="footer">
            <Button @click="cancel">关闭</Button>
        </div>        
    </Modal>        
</template>
<script>
import { Modal,Table, Page } from 'iview'
import { UserOrdinaryPaperPagedList } from '@/api/education'
import { SkipCount, ClearParams } from '@/mixins'
export default {
    mixins: [SkipCount,ClearParams],
    components: {
        Modal,
        Table,
        Page
    },
    props: {
        value: Boolean,
        partyMember: Object
    },
    data() {
        let that = this;
        return {
            loading: false,
            data: [],
            columns: [{
                title: '考试名称',
                key: 'paperName',
                tooltip: true
            },{
                title: '考试时间',
                tooltip: true,
                render (h,{row}) {
                    return h('span',that.FormatDate(row.creationTime,'yyyy-MM-dd'))
                }
            },{
                title: '考试结果',
                tooltip: true,
                key: 'maxScore'
            },{
                title: '所在党支部',
                key: 'organName',
                tooltip: true
            }],
            total: 0,
            params: {
                MaxResultCount: 9,
                SkipCount: 0,
                pageIndex: 1
            },            
        }
    },
    computed: {
        title () {
            return `${this.partyMember.name}过往考试记录`;
        }
    },
    watch: {
        value (n) {
            if(n){
                this.loadData();
            }
        }
    },
    methods: {
        loadData () {
            let params = JSON.parse(JSON.stringify(this.params));
            params.SkipCount = this.SkipCount(params.MaxResultCount,params.pageIndex);
            params.UserId = this.partyMember.id; 
            this.loading = true;
            UserOrdinaryPaperPagedList(this.ClearParams(params)).then(res=>{
                this.total = res.totalCount;
                this.data = res.items;
            }).finally(()=>{
                this.loading = false;
            })                
        },
        cancel () {
            this.$emit('input',false);
        },
        change (f) {
            this.$emit('input',f);
        }
    }        
}
</script>
<style lang="less" scoped>

</style>


