<template>
    <Upload
    :action="uploadAction"
    :on-success="onSuccess"
    :headers="headers"
    :on-exceeded-size="onExceeded"
    :on-format-error="onFormatError"
    :on-error="onError"    
    :max-size="maxSize"
    :accept="accept"   
    :format="format"
    :on-remove="remove"
    :default-file-list="defaultFileList" 
    >
        <slot>
            <Button type="primary" icon="ios-cloud-upload-outline">上传文件</Button>
        </slot>
    </Upload>    
</template>
<script>
import { Upload } from 'iview'
export default {
    components: {
        Upload
    },
    props: {
        multiple: {
            type: Boolean,
            default: false
        },
        accept: {
            type: String,
            default: '*'
        },
        format: {
            type: Array,
            default() {
                return []
            }
        },
        maxSize: {
            type: Number,
            default: 200*1024
        },
        value: {
            type: String
        },
        AttachClass: {
            type: [String,Number],
            default: 2
        },
        project: {
            type: [String,Number],
            default: 'LyProduct'
        },
        index: {
            type: Number
        }        
    },
    computed: {
        uploadAction () {
            return `${UPLOAD_PATH}/file/Upload?project=${this.project}&AttachClass=${this.AttachClass}`;
        },
        headers () {
            return {
                Authorization: `Bearer ${this.$store.state.session.accessToken}`
            }
        },
        defaultFileList () {
            let arr = [];
            if(this.value){
                arr.push({
                    name: this.value,
                    url: this.value
                })
            }
            return arr;
        }
    },
    methods: {
        onSuccess (response, file, fileList) {
            if(this.AttachClass == 2 || this.AttachClass == 4){
                this.$emit('input',response.result.id);
            }else{
                this.$emit('input',response.result.path);
            }
            this.$emit('change',response.result,this.index);
        },
        onError (error, file, fileList) {
            this.$Message.error(file.error.message);
        },
        onExceeded () {
            this.$Message.error('文件大小超出范围');
        },
        onFormatError () {
            this.$Message.error('文件格式错误');
        },
        remove (file, fileList) {
            this.$emit('input','');
        }
    },
    mounted () {
    }    
}
</script>
<style lang="less">

</style>


