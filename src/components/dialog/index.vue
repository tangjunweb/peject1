<template>
        <Modal
            :styles="{top: top}"
            v-bind="$attrs"
            v-on='$listeners'
            :title="title"
             v-model="dialogvisible">
            <div :style="{height: height,overflow: scroll ? 'auto' :'hidden' }">
                <slot></slot>
            </div>
            <div slot="footer">
                <Button type="primary" @click="sure">{{okText}}</Button>
                <Button type="text" @click="cancel" ghost>{{cancelText}}</Button>
            </div>
        </Modal>
</template>

<script>
import {Modal} from 'iview'
export default {
    name: 'commonDialog',
    components: {
       Modal 
    },
    props: {
        top: {
           type: String,
            default: '20px' 
        },
        scroll : {
            type: Boolean,
            default: false
        },
        height : {
            type: String,
            default: '40vh'
        },
        okText: {
            type: String,
            default: '确认'
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        title: {
            type: String,
            default: '提示'
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            dialogvisible: false
        }
    },
    computed: {
        
    },
    watch: {
        visible: {
            immediate: true,
            handler (val) {
                this.dialogvisible = val
            }
        },
        dialogvisible: {
            handler (val) {
                this.$emit('update:visible', val)
            }
        }
    },
    methods: {
        close () {
            this.dialogvisible = false
        },
        sure () {
           this.$emit('confirm', this.close) 
        },
        cancel () {
            this.close()
        }
    }
}
</script>
