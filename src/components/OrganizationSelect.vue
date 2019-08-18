<!-- 组织树 -->
<template>
    <Tree @on-check-change="checkChange" class="lhyj-tree" :load-data="loadData" :render="renderContent" :data="data" show-checkbox multiple></Tree>  
</template>
<script>
import { GetListByParentIdAsync } from '@/api'
import { Tree } from 'iview'
export default {
    data() {
        return {
            initLoading: false,
            data: []
        }
    },
    props: {
        value: Array,
        default () {
            return []
        }
    },
    methods: {
        checkChange (v) {
            let d = v.map(e=>{
                return e.id;
            })
            this.$emit('input',d);
        },
        fetchData (Id) {
            let params = {};
            if(Id){
                params.id = Id;
            }
            return GetListByParentIdAsync(params);
        },
        loadData (item,callback) {
            this.fetchData(item.id).then(res=>{
                res.map(e=>{
                    if(e.hasChild){
                        e.children = [];              
                        e.loading = false;
                    }
                    if(this.value.includes(e.id)){
                        e.checked = true;
                    }
                    return e;
                })     
                callback(res);        
            }).catch(()=>{
                callback();
            });            
        },
        renderContent(h, { root, node, data }) {
            let that = this;
            return h('span',{
                class: ['organization-tree-node',node.node.selected ? 'selected' : ''],
                on: {
                    click () {
                        let fn = (arr) =>{
                            arr.forEach(e=>{
                                if(e.id === node.node.id){
                                    e.selected = true;
                                }else{
                                    e.selected = false;
                                }
                                if(e.children&&e.children.length){
                                    fn(e.children);
                                }                                
                            })
                        }
                        fn(that.data);  
                        that.$emit('on-select',node.node)                  
                    }
                }
            },[
                h('i',{
                    class: 'lhyj_swdj lhyj_swdj-danghui_fuzhi',
                    style: {
                        transform: 'translateY(-1px)',
                        margin: '0 7px',
                        fontSize: '12px'
                    }
                }),
                h('span',node.node.organName)
            ])
        }
    },
    components: {
        Tree
    },
    mounted () {
        this.initLoading = true;
        this.fetchData(null).then(res=>{
            res.map(e=>{
                if(e.hasChild){
                    e.children = [];              
                    e.loading = false;
                }
                e.selected = false;
                return e;
            })
            this.data = res;
        }).complete(()=>{
            this.initLoading = false;
        });
    }
}
</script>
<style lang="less">
</style>

