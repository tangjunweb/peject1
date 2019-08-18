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
    </Cascader>
</template>
<script>
import { Cascader } from 'iview'
import { getCascaderValue,GetLableByValue, FormatResourceTypeDataCascader } from '@/utils/util'
import { mapState } from 'vuex'
export default {
    components: {
        Cascader
    },
    props: {
        value: {
            type: [String,Number],
            default: ''
        },
        placeholder: {
            type: String,
            default: '请选择资源类型'
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
    computed: {
        selectedOptions () {
            return getCascaderValue(this.value, this.data);
        },
        ...mapState({
            resourceTypeLsit: state => state.resourceTypeLsit
        }),
        data () {
            return FormatResourceTypeDataCascader(this.resourceTypeLsit,null)
        }
    },
    methods: {
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
    },
    mounted () {
        this.$store.dispatch('getAllResourceClassList');
    }
}
</script>
<style lang="less" scoped>

</style>
