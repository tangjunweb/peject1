<template>
    <div>
        <Table :columns="columns" :data="data"></Table>        
    </div>
</template>
<script>
import { Table} from 'iview'
import { GetUpLoadAuth } from '@/api'
export default {
    props: {
        partyMember: {
            type: Object
        }
    },    
    components: {
        Table
    },
    data() {
        let that = this;
        return {
            columns: [{
                title: '奖惩名称',
                render (h,{row}) {
                    return h('span',that.GetCodeTableValue(row.bonnusPenaltyName,'BonnusPenalty'))
                }
            },{
                title: '奖惩批准日期',
                render (h,{row}) {
                    return h('span',that.FormatDate(row.approvalDate,'yyyy-MM-dd'))
                }
            },{
                title: '奖惩批准机关',
                key: 'approvaOrganName'
            },{
                title: '附件',
                render (h,{row}) {
                    if(row.attachMent){
                        return h('span',{
                            class: 'zdy-table-link success',
                            on: {
                                click () {
                                    GetUpLoadAuth().then(res=>{
                                        window.open(`${UPLOAD_PATH}/file/download?project=${res.project}&token=${res.token}&id=${row.attachMent.id}`)
                                    })   
                                }
                            }
                        },row.attachMent.name)                        
                    }else{
                        return h('span','无')
                    }
                }
            }]
        }
    },
    computed: {
        data () {
            return this.partyMember.bonusPenalty;
        }
    }
}
</script>

