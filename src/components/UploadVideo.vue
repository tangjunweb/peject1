<template>
    <Upload
        style="display:block"
        type="drag"
        :max-size="maxSize"
        :accept="accept"
        :format="format"
        :show-upload-list="false"
        :on-format-error="validateError"
        :on-exceeded-size="sizeValidateError"
        :before-upload="beforeUpload"
        action=""
        >
        <div class="upload-mask-video" :style="style">
            <Spin fix v-if="spin"></Spin>
            <div v-if="!file.name">
                <Icon color="#24A7EA" :size="28" type="md-add-circle" />
                <p class="upload-mask-tit">点击上传视频</p>
                <p class="upload-mask-des">或将视频拖到此处</p>
            </div>
            <div v-else class="upload-video-info" :style="style" @click.stop.prevent="fn">
                <div class="list text-ellipsis">
                    <span class="label">视频名称：</span>
                    <span class="value">{{file.name}}</span>
                </div>
                <div class="list">
                    <span class="label">视频大小：</span>
                    <span class="value">{{parseFloat(file.size/(1024*1024)).toFixed(2)}}M</span>
                </div>
                <div class="video-upload-progress">
                    <Progress :percent="percent" :status="status" />
                </div>
                <div class="text-left">
                    <Button @click.stop="start" v-if="state === 0" type="primary" ghost style="margin-right:5px;">开始上传</Button>
                    <Button @click.stop="stop" v-if="state === 1" type="warning" ghost>停止上传</Button>
                    <Button @click.stop="replay" v-if="state === 2" type="success" ghost>恢复上传</Button>
                    <Button @click.stop="reset" type="error" ghost>重新选择</Button>
                </div>
            </div>
        </div>
    </Upload>
</template>
<script>
import { Upload, Progress } from 'iview'
import { GetUploadAuthor } from '@/api'
import Uploader from '@/utils/aliupload'
export default {
    data() {
        return {
            percent: 0,
            loading: false,
            data: {},
            uploader: null,
            config: {},
            status: 'normal',
            state: 0,
            file: {},
            spin: false
        }
    },
    components: {
        Upload,
        Progress
    },
    props: {
        accept: {
            type: String,
            default: 'video/*'
        },
        format: {
            type: Array,
            default () {
                return ['mp4','avi','3gp','rmvb','mpeg1-4','wmv','mtv','mov','flv']
            }
        },
        maxSize: {
            type: Number,
            default: 200*1024
        },
        value: {
            type: String
        },
        ResourceTypeId: {
            type: [String,Number],
            required: true
        },
        Title: {
            type: [String,Number],
            required: true
        },
        width: {
            type: [String,Number],
            default: '100%'
        },
        height: {
            type: [String,Number],
            default: '180px'
        }
    },
    computed: {
        style () {
            return {
                width: typeof this.width === 'number' ? `${this.width}px` : this.width,
                height: typeof this.height === 'number' ? `${this.height}px` : this.height
            }
        }
    },
    methods: {
        validateError () {
            this.$Message.warning('请上传正确的文件格式');
        },
        sizeValidateError () {
            this.$Message.warning(`文件大小不能超过${this.maxSize/1024}M`);
        },
        beforeUpload (file) {
            if(!this.ResourceTypeId){
                this.$Message.warning('请选择资源类目');
            }else if(!this.Title){
                this.$Message.warning('请填写资源名称');
            }else{
                this.spin = true;
                GetUploadAuthor({
                    ResourceTypeId: this.ResourceTypeId,
                    Title: this.Title,
                    FileName : file.name
                }).then(res=>{
                    this.config = res;
                    this.uploader.addFile(file,null, null, null);
                    this.file = file;
                }).finally(()=>{
                    this.spin = false;
                })
            }
            return false;
        },
        fn () {
            return false;
        },
        start () {
            this.uploader.startUpload();
        },
        stop () {
            this.uploader.stopUpload();
        },
        replay () {
            this.uploader.resumeUploadWithAuth(this.config.uploadAuth);
        },
        reset () {
            this.$emit('change','');
            this.state = 0;
            this.file = {};
            this.status = 'normal';
            this.percent = 0;
            this.uploader.cleanList();
        }
    },
    mounted () {
        let that = this;
        this.uploader = new Uploader({
            partSize: 1048576,
            parallel: 5,
            retryCount: 3,
            retryDuration: 2,
            onUploadstarted (uploadInfo) {
                that.uploader.setUploadAuthAndAddress(uploadInfo,that.config.uploadAuth,that.config.uploadAddress,that.config.videoId);
                that.status = 'active';
            },
            onUploadSucceed (uploadInfo) {
                that.state = 3;
                that.status = 'success';
                that.$emit('change',uploadInfo);
            },
            onUploadFailed (uploadInfo, code, message) {
                that.$Message.error(`文件上传失败: ${uploadInfo.file.name},code: ${code}, message: ${message}`);
                that.status = 'wrong';
                that.state = 2;
            },
            onUploadProgress (uploadInfo, totalSize, loadedPercent) {
                that.percent = parseFloat((loadedPercent*100).toFixed(2));
                that.state = 1;
            },
            onUploadTokenExpired (uploadInfo) {
                that.uploader.resumeUploadWithAuth(that.config.uploadAuth);
            },
            onUploadEnd (uploadInfo) {

            }
        })
    }
}
</script>
<style lang="less">
.upload-mask-video{
    border: 1px solid #e6e6e6;
    position: relative;
    .upload-mask-tit{
        font-size: 14px;
    }
    .upload-mask-des{
        color: #999;
        font-size: 12px;
    }
    i{
        margin-top: 35px;
    }
}
.ivu-upload-drag{
    border: none!important;
    width: 100%;
}
.video-upload-progress{
    width: 100%;
    .ivu-progress-text-inner{
        color: #fff;
    }
}
.ivu-upload-drag:hover{
    border: none!important;
}
.upload-video-info{
    position: absolute;
    left: 0;
    top: 0;
    padding: 30px;
    box-sizing: border-box;
    .list{
        text-align: left;
    }
    .ivu-progress{
        transform: translateX(-15px);
    }
    .ivu-btn-warning{
        color: #FFD74F!important;
    }
    i{
        margin-top: 0;
    }
}
</style>
