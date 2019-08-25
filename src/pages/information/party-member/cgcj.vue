<template>
    <div>
        <Table :columns="columns" :data="data"></Table>       
    </div>
</template>
<script>
import {  Table } from 'iview'
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
            showModal: false,
            modalLoading: false,
            columns: [{
                title: '前往国家（地区）',
                key: 'abroadCountry'
            },{
                title: '出国（境）原因',
                key: 'abroadReason'
            },{
                title: '出国（境）日期',
                render (h,{row}) {
                    return h('span',that.FormatDate(row.abroadDate,'yyyy-MM-dd'))
                }                
            },{
                title: '回国日期',
                render (h,{row}) {
                    return h('span',that.FormatDate(row.backDate,'yyyy-MM-dd'))
                }
            }]
        }
    },
    computed: {
        data () {
            return this.partyMember.abroad;
        }
    }
}
</script>
