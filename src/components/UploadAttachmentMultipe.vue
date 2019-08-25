<template>
  <Upload
    :action="uploadAction"
    :on-success="onSuccess"
    :on-progress="onProgress"
    :headers="headers"
    :on-exceeded-size="onExceeded"
    :on-format-error="onFormatError"
    :on-error="onError"
    :show-upload-list="false"
    :max-size="maxSize"
    :accept="accept"
  >
    <Button :disabled="disabled" type="primary" icon="ios-cloud-upload-outline">上传文件</Button>
    <span
      class="tips"
      style="font-size:16px;color:red;margin-left:20px"
      v-if="showTips && unExceed"
    >文件大小限制{{maxSize/1024}}M</span>
    <div class="upload-attachment-multipe" :class="theme" slot="tip">
      <div class="uam-item" v-for="(el,i) in list" :key="i">
        <Progress v-if="el.showProgress" :percent="el.percentage" :status="getStatus(el.status)" />
        <Alert type="success" show-icon v-else>
          <span>{{el.name}}</span>
          <span class="uam-size">{{getSize(el.size)}}kb</span>
          <!-- <span class="uam-btn" @click="download(el)">下载</span> -->
          <span v-if="!disabled" class="uam-btn error" @click="remove(i)">删除</span>
        </Alert>
        {{el.percent}}
      </div>
    </div>
  </Upload>
</template>
<script>
import { Upload } from "iview";
import { GetUpLoadAuth } from "@/api";
import { Progress } from "iview";
export default {
  components: {
    Upload,
    Progress
  },
  data() {
    return {
      list: [],
      unExceed: false
    };
  },
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: ['.png','.jpg','.docx','.doc']
    },
    maxSize: {
      type: Number,
      default: 500 * 1024
    },
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    theme: {
      type: String,
      default: ""
    },
    AttachClass: {
      type: [String, Number],
      default: 2
    },
    project: {
      type: [String, Number],
      default: "LyProduct"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showTips: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    uploadAction() {
      return `${UPLOAD_PATH}/file/Upload?project=${this.project}&AttachClass=${this.AttachClass}`;
    },
    headers() {
      return {
        Authorization: `Bearer ${this.$store.state.session.accessToken}`
      };
    }
  },
  watch: {
    value() {
      this.init();
    }
  },
  methods: {
    getSize(size) {
      return (size / 1024).toFixed(2);
    },
    init() {
      this.list = JSON.parse(JSON.stringify(this.value));
    },
    remove(i) {
      let d = JSON.parse(JSON.stringify(this.list));
      d.splice(i, 1);
      this.$emit("input", d);
    },
    getStatus(status) {
      switch (status) {
        case "finished":
          return "success";
          break;
        case "fail":
          return "wrong";
          break;
        default:
          return "active";
          break;
      }
    },
    onProgress(response, file, fileList) {
      this.unExceed = false;
      let f = this.list.find(e => e.uid === file.uid);
      if (f) {
        f = file;
      } else {
        this.list.push(file);
      }
    },
    onSuccess(response, file, fileList) {
      console.log(this.list);
      this.$emit(
        "input",
        this.list.map(e => {
          let d = {
            id: e.id || null,
            name: e.name,
            // size: e.size,
            type: e.type || (e.response ? e.response.result.ext : null),
            path: e.path || (e.response ? e.response.result.path : null)
          };
          if (e.response) {
            d.id = e.response.result.id;
            if (!e.response.result.path) {
              d.path = e.response.result.id;
            }
          }
          return d;
        })
      );
    },
    onError(error, file, fileList) {
      this.$Message.error(file.error.message);
      this.list = this.list.filter(e => {
        return e.status !== "fail";
      });
    },
    onExceeded() {
      this.$Message.error("文件大小超出范围");
      this.unExceed = true;
    },
    onFormatError() {
      this.$Message.error("文件格式错误");
    },
    download(el) {
      GetUpLoadAuth().then(res => {
        window.open(
          `${UPLOAD_PATH}/file/download?project=${res.project}&token=${res.token}&id=${el.id}`
        );
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less">
.upload-attachment-multipe {
  padding: 15px 0;
  .uam-file-item {
    position: relative;
    padding: 5px 0;
    box-sizing: border-box;
    &:hover {
      cursor: pointer;
    }
  }
  .uam-item {
    position: relative;
  }
  .uam-size {
    margin: 0 30px;
  }
  .uam-btn {
    cursor: pointer;
    &.error {
      color: #ed4014;
    }
  }
  .uam-btn + .uam-btn {
    margin-left: 15px;
  }
  &.blue {
    .uam-item {
      color: #fff;
    }
  }
}
</style>
