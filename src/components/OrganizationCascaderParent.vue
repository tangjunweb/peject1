<template>
    <Cascader
        :disabled="disabled"
        :change-on-select="isChangeOnSelect"
        :placeholder="placeholder"
        :transfer="transfer"
        :trigger="trigger"
        :data="data"
        :clearable="clearable"
        :value="selectedOptions"
        :size="size"
        @on-change="handleChange">
        <Input readonly :value="selectLable" :placeholder="placeholder" :size="size"></Input>
    </Cascader>
</template>
<script>
import { Cascader,Input } from 'iview'
import { getCascaderValue,GetLableByValue } from '@/utils/util'
import { SearchSups } from '@/api'
export default {
    name: 'organization-cascader-parent',
    components: {
        Cascader,
        Input
    },
    props: {
        value: {
            type: [String,Number],
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '请选择党组织'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        isChangeOnSelect: {
            type: Boolean,
            default: true
        },
        transfer: {
            type: Boolean,
            default: true
        },
        size: {
            type: String,
            default: 'default'
        },
        trigger: {
            type: String,
            default: 'click'
        },
        clearable: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            data: []
        }
    },
    computed: {
        selectedOptions () {
            return getCascaderValue(this.value, this.data);
        },
        selectLable () {
            return GetLableByValue(this.value,this.data) || this.label;
        },
        organizationChange () {
            return this.$store.state.organizationChange;
        },
        organId () {
            return this.$store.state.session.organId;
        }
    },
    watch: {
        organizationChange (n) {
            if(n){
                this.init();
                this.$store.commit('UPDATESTATE',{
                    organizationChange: false
                })
            }
        }
    },
    methods: {
        fetchData (Id=null) {
            return new Promise((resolve,reject)=>{
                let params = {};
                if(Id){
                    params.id = Id;
                }
                SearchSups(params).then(res=>{
                    let data = this.tree(res,null); //转换成树形结构
                    resolve(data)
                }).catch(e=>{
                    reject(e);
                })
            })
        },
        tree(data,pid){ //递归转换成树形结构
            let result = [];
            for(let i =0; i< data.length;i++){
                if(data[i].parentId==pid){
                    let obj = {
                        label: data[i].organName,
                        value: data[i].id,
                        path: data[i].organPath,
                    }
                    let temp = this.tree(data,obj.value);
                    if(temp.length>0){
                        obj.children=temp;
                    }
                    result.push(obj);
                }
            }
            return result;
        },
        handleChange (v) {
            this.$emit('input',v.length ? v[v.length-1] : '');
            let fn = (arr) => {
                let obj = {};
                for (let a of arr) {
                    if(a.value === v[v.length-1]){
                        obj = a;
                        break;
                    }else if(a.children&&a.children.length){
                        obj = fn(a.children);
                        if(obj.value){
                            break;
                        }
                    }
                }
                return obj;
            }
            this.$emit('change',fn(this.data));
        },
        init () {
            this.fetchData(this.organId).then(res=>{
                this.data = res;
            });
        }
    },
    mounted () {
        this.init();
    }
}
</script>
