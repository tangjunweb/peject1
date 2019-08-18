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
    :show-upload-list="false"
    >
        <Button v-if="!value" type="primary" icon="ios-cloud-upload-outline" ghost>上传文件</Button>
        <Button v-if="value" type="primary" icon="md-refresh" ghost>重新上传</Button>
        <Button @click.stop="download" v-if="value" type="primary" style="margin-left:15px;" icon="md-arrow-round-down" ghost>下载</Button>
    </Upload>    
</template>
<script>
import { Upload } from 'iview'
import { GetUpLoadAuth } from '@/api'
export default {
    components: {
        Upload
    },
    props: {
        accept: {
            type: String,
            default: '*'
        },
        format: {
            type: Array,
            default: []
        },
        maxSize: {
            type: Number,
            default: 2048000
        },
        value: {
            type: String
        },
        downloadId: {
            type: [String,Number]
        },
        AttachClass: {
            type: [String,Number],
            default: 4
        },
        project: {
            type: [String,Number],
            default: 'LyProduct'
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
        }
    },
    methods: {
        onSuccess (response, file, fileList) {
            this.$emit('input',response.result.id);
            this.$emit('change',response.result);
        },
        onError (error, file, fileList) {
            this.$Message.error(file.error.message);
        },
        onExceeded () {
            this.$Message.error('文件大小不能超过20M');
        },
        onFormatError () {
            this.$Message.error('文件格式错误');
        },
        remove (file, fileList) {
            this.$emit('input','');
        },
        download () {
            GetUpLoadAuth().then(res=>{
                window.open(`${UPLOAD_PATH}/file/download?project=${res.project}&token=${res.token}&id=${this.downloadId}`)
            })
        }
    },
    mounted () {
    }    
}
</script>
<style lang="less">

</style>


