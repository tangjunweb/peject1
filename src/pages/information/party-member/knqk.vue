<template>
    <div>
        <Table v-if="partyMember.id" :columns="columns" :data="data"></Table>       
    </div>
</template>
<script>
import { Table } from 'iview'
export default {
    props: {
        partyMember: {
            type: Object
        }
    },    
    components: {
        Table
    },
    computed: {
        data () {
            return [this.partyMember]
        }
    }, 
    data() {
        let that = this;
        return {
            columns: [{
                title: '生活困难类型',
                tooltip: true,
                render (h,{row}) {
                    let arr = [];
                    if(row.partyMember.difficultType){
                        row.partyMember.difficultType.split(',').forEach(e=>{
                            arr.push(that.GetCodeTableValue(e,'DifficultType'));
                        })
                    }
                    return h('span',arr.join(','))
                }
            },{
                title: '健康状况',
                tooltip: true,
                render (h,{row}) {
                    return h('span',row.partyMember.healthSituation);
                }
            },{
                title: '是否享受最低生活保障',
                tooltip: true,
                render (h,{row}) {
                    return h('span',row.isLowAllowance ? '是' : '否')
                }
            },{
                title: '是否享受抚恤补助',
                tooltip: true,
                render (h,{row}) {
                    return h('span',row.isPensionBenefits ? '是' : '否')
                }                
            }]
        }
    }
}
</script>

