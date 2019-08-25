<template>
  <div>
    <div class="uploadimg-multiple-upload-list" v-for="(item,i) in uploadList" :key="i">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="uploadimg-multiple-upload-list-cover">
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :default-file-list="defaultList"
      :on-success="handleSuccess"
      :format="['jpg','jpeg','png']"
      :max-size="5120"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      :headers="headers"
      multiple
      type="drag"
      :action="uploadAction"
      style="display: inline-block;width:58px;"
    >
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon color="#84D7FF" type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
  </div>
</template>
<script>
import { Upload } from "iview";
import { GetUpLoadAuth } from "@/api";
export default {
  data() {
    return {
      uploadList: []
    };
  },
  components: {
    Upload
  },
  props: {
    AttachClass: {
      type: [String, Number],
      default: 3
    },
    project: {
      type: [String, Number],
      default: "LyProduct"
    },
    defaultList: {
      type: Array,
      default() {
        return [];
      }
    },
    max: {
      type: Number,
      default: 5
    }
  },
  computed: {
    uploadAction() {
      return `${UPLOAD_PATH}/file/Upload?project=${this.project}&AttachClass=${
        this.AttachClass
      }`;
    },
    headers() {
      return {
        Authorization: `Bearer ${this.$store.state.session.accessToken}`
      };
    }
  },
  methods: {
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      this.$emit(
        "change",
        this.$refs.upload.fileList
          .filter(e => {
            return e.status === "finished";
          })
      );
    },
    handleSuccess(res, file) {
      file.url = res.result.path;
      file.name = res.result.name;
      this.$emit(
        "change",
        this.$refs.upload.fileList
          .filter(e => {
            return e.status === "finished";
          })
      );
    },
    handleFormatError(file) {
      this.$Message.warning("请选择正确的图片格式");
    },
    handleMaxSize(file) {
      this.$Message.warning("请上传小于5M的图片");
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < this.max;
      if (!check) {
        this.$Message.warning(`最多上传${this.max}张图片`);
      }
      return check;
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  }
};
</script>
<style lang="less">
.uploadimg-multiple-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #04216d;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.uploadimg-multiple-upload-list img {
  width: 100%;
  height: 100%;
}
.uploadimg-multiple-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.uploadimg-multiple-upload-list:hover .uploadimg-multiple-upload-list-cover {
  display: block;
}
.uploadimg-multiple-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>


