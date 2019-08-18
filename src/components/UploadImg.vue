<template>
  <Upload
    class="upload-img"
    style="display:inline-block"
    :style="style"
    :multiple="multiple"
    type="drag"
    :max-size="maxSize"
    :accept="accept"
    :show-upload-list="false"
    :on-progress="onProgress"
    :on-success="onSuccess"
    :headers="headers"
    :on-exceeded-size="onExceeded"
    :on-format-error="onFormatError"
    :on-error="onError"
    :action="uploadAction"
  >
    <div :style="style" class="upload-mask" v-if="!loading&&!value">
      <div class="middle">
        <Icon color="#24A7EA" :size="28" type="md-add-circle"/>
        <p class="upload-mask-tit">点击上传图片</p>
        <p class="upload-mask-des">或将图片拖到此处</p>
      </div>
    </div>
    <div :style="style" class="upload-img-wrap" v-if="value&&!loading">
      <img v-imgerror.video :style="style" class="upload-img" :src="value" alt>
      <div class="upload-img-wrap-util">
        <Icon @click.stop="remove" type="ios-trash" color="#fff" size="24"/>
      </div>
    </div>
    <i-circle :size="width/2" v-if="loading" :percent="percent">
      <span class="demo-Circle-inner" style="font-size:24px">{{percent}}%</span>
    </i-circle>
  </Upload>
</template>
<script>
import { Upload } from "iview";
import { GetUpLoadAuth } from "@/api";
export default {
  data() {
    return {
      percent: 0,
      loading: false
    };
  },
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
      default: "image/*"
    },
    maxSize: {
      type: Number,
      default: 5120
    },
    value: {
      type: String
    },
    width: {
      type: [String, Number],
      default: 130
    },
    height: {
      type: [String, Number],
      default: 183
    },
    AttachClass: {
      type: [String, Number],
      default: 3
    },
    project: {
      type: [String, Number],
      default: "LyProduct"
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
    },
    style() {
      return {
        width: typeof this.width === "number" ? `${this.width}px` : this.width,
        height:
          typeof this.height === "number" ? `${this.height}px` : this.height
      };
    }
  },
  methods: {
    onProgress(response, file, fileList) {
      this.percent = response.percent;
      this.loading = true;
    },
    onSuccess(response, file, fileList) {
      this.$emit("input", response.result.path);
      this.percent = 0;
      this.loading = false;
      this.$emit("change");
    },
    onError(error, file, fileList) {
      this.percent = 0;
      this.loading = false;
      this.$Message.error(file.error.message);
    },
    onExceeded() {
      this.$Message.error("文件大小超出范围");
    },
    onFormatError() {
      this.$Message.error("文件格式错误");
    },
    remove() {
      this.$emit("input", "");
      this.$emit("change");
    }
  }
};
</script>
<style lang="less" scoped>
.upload-img {
  position: relative;
  .upload-mask {
    border: 1px solid #e6e6e6;
    .upload-mask-tit {
      font-size: 14px;
    }
    .upload-mask-des {
      color: #999;
      font-size: 12px;
    }
    i {
      margin-top: 35px;
    }
  }
  .ivu-upload-drag {
    height: 100% !important;
    border: none !important;
    background: transparent !important;
  }
  .ivu-upload-drag:hover {
    border: none !important;
  }
  .upload-img {
    display: block;
    border: 1px solid #e6e6e6;
  }
  .upload-img-wrap {
    position: relative;
    overflow: hidden;
    .upload-img-wrap-util {
      position: absolute;
      padding: 5px 20px;
      right: 0;
      top: 0;
      border-top-right-radius: 6px;
      transform: translateY(-200px);
      transition: all 0.5s linear;
    }
    &:hover {
      .upload-img-wrap-util {
        transform: translateY(0);
      }
    }
  }
}
</style>


