<!--登录页面-->
<style lang="less" scoped>
.c-avatar-cutter {
  .content {
    display: flex;
    height: 310px;
  }
  .c-left {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 310px;
    height: 310px;
    border: solid 1px #e8e8e8;
    background-repeat: round;
    background-image: url(./imgs/empty.png);
    .container-box {
      position: relative;
    }
    .img-mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.3;
      background-color: white;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .select-box {
      position: absolute;
      top: 0;
      left: 0;
      cursor: move;
    }
    .x-line,
    .y-line {
      display: flex;
      justify-content: space-between;
      position: absolute;
      width: 100%;
      height: 100%;
      li {
        position: relative;
        border: dashed 1px white;
      }
      li:nth-child(1):before,
      li:nth-last-child(1):before {
        position: absolute;
        margin-left: -3px;
        margin-top: -3px;
        width: 6px;
        height: 6px;
        content: "";
        background-color: white;
      }
    }
    .x-line {
      flex-direction: column;
      li:nth-child(1) {
        cursor: n-resize;
        &:before {
          left: 50%;
        }
      }
      li:nth-last-child(1) {
        cursor: s-resize;
        &:before {
          left: 50%;
        }
      }
    }
    .y-line {
      li:nth-child(1) {
        cursor: w-resize;
        &:before {
          top: 50%;
        }
      }
      li:nth-last-child(1) {
        cursor: e-resize;
        &:before {
          top: 50%;
        }
      }
    }
    .point {
      width: 100%;
      height: 100%;
      li {
        position: absolute;
        margin-left: -3px;
        margin-top: -3px;
        width: 6px;
        height: 6px;
        content: "";
        cursor: crosshair;
        background-color: white;
      }
      li:nth-child(1) {
        top: 2px;
        left: 1px;
        cursor: nw-resize;
      }
      li:nth-child(2) {
        top: 2px;
        right: -2px;
        cursor: ne-resize;
      }
      li:nth-child(3) {
        bottom: -2px;
        left: 1px;
        cursor: sw-resize;
      }
      li:nth-child(4) {
        bottom: -2px;
        right: -2px;
        cursor: se-resize;
      }
    }
    .cross {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 6px;
      height: 6px;
      min-width: unset;
      margin-top: -3px;
      margin-left: -3px;
      background-size: cover;
      background-image: url(./imgs/icon-cancel.png);
    }
  }
  .c-left--doing {
    background-image: url(./imgs/empty--pure.png);
  }
  .c-right {
    flex: 1;
    position: relative;
    margin-left: 24px;
    font-size: 16px;
    color: #333333;
    text-align: center;
    .preview {
      padding: 0 16px 34px;
      border: solid 1px #e8e8e8;
      background-color: #fafafa;
      p {
        height: 30px;
        line-height: 30px;
      }
      canvas {
        display: block;
        width: 190px;
        height: 190px;
        border: solid 1px #e8e8e8;
        background-repeat: round;
        background-image: url(./imgs/empty.png);
      }
      .canvas--doing {
        background-image: url(./imgs/empty--pure.png);
      }
    }
    .btn-upload {
      margin-top: 20px;
      width: 100%;
    }
    input[type="file"] {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 42px;
      opacity: 0;
      background-color: white;
    }
  }
  .c-btn-group {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>

<template>
  <Modal
    v-model="show"
    class-name="c-avatar-cutter"
    transfer
    title="选择头像"
    width="594px"
    @on-visible-change="onVisibleChange"
  >
    <div class="content">
      <div class="c-left" :class="{'c-left--doing':imgURL}">
        <div
          class="container-box"
          :style="{
            width:`${containerBoxData.width}px`,
            height:`${containerBoxData.height}px`,
            }"
        >
          <img ref="$img" :src="imgURL" />
          <div class="img-mask"></div>
          <div
            class="select-box"
            v-if="imgURL"
            @mousedown="onMouseDown($event, 'move')"
            :style="{
              top:`${selectData.top}px`,
              left:`${selectData.left}px`,
              width:`${selectData.width}px`,
              height:`${selectData.width}px`,
              'background-image':`url(${imgURL})`,
              'background-position':`${-selectData.left}px ${-selectData.top}px`,
              'background-size':`${containerBoxData.width}px ${containerBoxData.height}px`,
            }"
          >
            <ul class="x-line">
              <li @mousedown.stop="onMouseDown($event, 'stretch', 'top')"></li>
              <li></li>
              <li></li>
              <li @mousedown.stop="onMouseDown($event, 'stretch', 'bottom')"></li>
            </ul>
            <ul class="y-line">
              <li @mousedown.stop="onMouseDown($event, 'stretch', 'left')"></li>
              <li></li>
              <li></li>
              <li @mousedown.stop="onMouseDown($event, 'stretch', 'right')"></li>
            </ul>
            <ul class="point">
              <li @mousedown.stop="onMouseDown($event, 'stretch', 'top-left')"></li>
              <li @mousedown.stop="onMouseDown($event, 'stretch', 'top-right')"></li>
              <li @mousedown.stop="onMouseDown($event, 'stretch', 'bottom-left')"></li>
              <li @mousedown.stop="onMouseDown($event, 'stretch', 'bottom-right')"></li>
            </ul>
            <div class="cross"></div>
          </div>
        </div>
      </div>
      <div class="c-right">
        <div class="preview">
          <p>预览</p>
          <canvas ref="$canvas" width="190" height="190" :class="{'canvas--doing':imgURL}">></canvas>
        </div>
        <Button type="primary" class="btn-upload">{{!imgURL ? '上传图片' : '重新上传'}}</Button>
        <input @change="fileChange" type="file" accept="image/*" />
      </div>
    </div>
    <div class="c-btn-group" slot="footer">
      <Button @click="onCancel" class="btn-cancel">取消</Button>
      <Button @click="onEnter" class="btn-enter" :disabled="!imgURL">确定</Button>
    </div>
  </Modal>
</template>

<script>
import { Modal } from "iview";
import { Stream } from "stream";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    imgURL: {
      type: String,
      default: ""
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
  components: {
    Modal
  },
  data() {
    return {
      scaleRate: 1, // 图片缩放比
      minWidth: 20, // 选择框最小宽度
      containerBoxData: {
        width: 0,
        height: 0
      },
      selectData: {
        top: 0,
        left: 0,
        width: 0,
        action: "", // 当前进行的操作
        originPoint: {}, // 点击时所在位置
        selectLine: "" // 选择那一条边进行拉伸，为空则不是在拉伸
      }
    };
  },
  created() {
    // 全局监听松开事件，放在在内容选择框外松开
    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("mousemove", this.onMouseMove);
  },

  beforeDestroy() {
    document.removeEventListener("mouseup", this.onMouseUp);
    document.removeEventListener("mousemove", this.onMouseMove);
  },
  computed: {
    uploadAction() {
      return `${UPLOAD_PATH}/file/Upload?project=${this.project}&AttachClass=${this.AttachClass}`;
    },
    headers() {
      return `Bearer ${this.$store.state.session.accessToken}`;
    },
  },
  methods: {
    // 获取图片宽高
    getImgSize(url) {
      return new Promise(resolve => {
        let $img = document.createElement("img");
        $img.src = url;
        $img.style.opacity = 0;
        $img.addEventListener("error", () => {
          document.body.removeChild($img);
          resolve(false);
        });
        $img.addEventListener("load", () => {
          const data = {
            width: $img.naturalWidth,
            height: $img.naturalHeight
          };
          document.body.removeChild($img);
          resolve(data);
        });
        document.body.appendChild($img);
      });
    },

    // 从base64转化为file文件
    base64ToFile(base64Str, fileName) {
      const params = base64Str.split(",");
      const mime = params[0].match(/:(.*?)/)[1];
      const fileData = atob(params[1]); // 解码Base64
      let { length } = fileData;
      const uint8Array = new Uint8Array(length);
      while (length) {
        length -= 1;
        uint8Array[length] = fileData.charCodeAt(length);
      }
      return new File([uint8Array], fileName, { type: mime });
    },

    // 获取驼峰写法
    getCamelCase(text) {
      return text.replace(/-[a-z]+?/g, matchStr => matchStr[1].toUpperCase());
    },

    // 获取首单词大写
    getWord(text) {
      return text[0].toUpperCase() + text.substr(1);
    },

    // 鼠标点击
    onMouseDown(event, action, direction) {
      const { selectData } = this;
      selectData.action = action;
      selectData.direction = direction || "";
      selectData.originPoint = {
        x: event.clientX > 0 ? event.clientX : 0,
        y: event.clientY > 0 ? event.clientY : 0
      };
    },

    // 鼠标松开
    onMouseUp() {
      const { selectData } = this;
      selectData.action = "";
      selectData.direction = "";
    },

    // 鼠标移动
    onMouseMove(event) {
      const { selectData, containerBoxData } = this;
      const { x, y } = selectData.originPoint;
      const moveX = event.clientX - x; // X轴移动的距离
      const moveY = event.clientY - y; // Y轴移动的距离
      if (selectData.action === "move") {
        // 移动选择框
        this.doMove(selectData, containerBoxData, moveX, moveY);
      } else if (selectData.action === "stretch") {
        // 拉伸选择框
        this.doStretch(selectData, containerBoxData, moveX, moveY);
      } else {
        return;
      }

      selectData.originPoint = {
        x: event.clientX > 0 ? event.clientX : 0,
        y: event.clientY > 0 ? event.clientY : 0
      };

      this.setPreview();
    },

    // 选择框移动
    doMove(selectData, containerBoxData, moveX, moveY) {
      selectData.top += moveY;
      selectData.left += moveX;
      if (selectData.top < 0) {
        selectData.top = 0;
      }
      if (selectData.left < 0) {
        selectData.left = 0;
      }
      if (selectData.top + selectData.width > containerBoxData.height) {
        selectData.top = containerBoxData.height - selectData.width;
      }
      if (selectData.left + selectData.width > containerBoxData.width) {
        selectData.left = containerBoxData.width - selectData.width;
      }
    },

    // 选择框拉伸
    doStretch(selectData, containerBoxData, moveX, moveY) {
      const { minWidth } = this;

      // 获取溢出长度
      function getOverflowLength() {
        const overflowLeft = selectData.left < 0 ? -selectData.left : 0;
        const overflowTop = selectData.top < 0 ? -selectData.top : 0;
        const overflowRight =
          selectData.left + selectData.width > containerBoxData.width
            ? selectData.left + selectData.width - containerBoxData.width
            : 0;
        const overflowBottom =
          selectData.top + selectData.width > containerBoxData.height
            ? selectData.top + selectData.width - containerBoxData.height
            : 0;
        const overflowWidth =
          selectData.width < minWidth ? minWidth - selectData.width : 0;
        return Math.max(
          overflowLeft,
          overflowTop,
          overflowRight,
          overflowBottom,
          overflowWidth
        );
      }

      // 向左拉伸
      function doStretchLeft(action) {
        let space = moveX;
        space = action === "preDo" ? space : -space;
        selectData.top += space / 2;
        selectData.left += space;
        selectData.width -= space;
      }

      function doStretchRight(action) {
        let space = moveX;
        space = action === "preDo" ? space : -space;
        selectData.top -= space / 2;
        selectData.width += space;
      }

      function doStretchTop(action) {
        let space = moveY;
        space = action === "preDo" ? space : -space;
        selectData.top += space;
        selectData.left += space / 2;
        selectData.width -= space;
      }

      function doStretchBottom(action) {
        let space = moveY;
        space = action === "preDo" ? space : -space;
        selectData.left -= space / 2;
        selectData.width += space;
      }

      function doStretchTopLeft(action) {
        let space = Math.abs(moveX) > Math.abs(moveY) ? moveX : moveY;
        space = action === "preDo" ? space : -space;
        selectData.top += space;
        selectData.left += space;
        selectData.width -= space;
      }

      function doStretchTopRight(action) {
        let space = Math.abs(moveX) > Math.abs(moveY) ? moveX : -moveY;
        space = action === "preDo" ? space : -space;
        selectData.top -= space;
        selectData.width += space;
      }

      function doStretchBottomLeft(action) {
        let space = Math.abs(moveX) > Math.abs(moveY) ? moveX : -moveY;
        space = action === "preDo" ? space : -space;
        selectData.left += space;
        selectData.width -= space;
      }

      function doStretchBottomRight(action) {
        let space = Math.abs(moveX) > Math.abs(moveY) ? moveX : moveY;
        space = action === "preDo" ? space : -space;
        selectData.width += space;
      }

      const doStretchFun = {
        doStretchLeft,
        doStretchRight,
        doStretchTop,
        doStretchBottom,
        doStretchTopLeft,
        doStretchTopRight,
        doStretchBottomLeft,
        doStretchBottomRight
      }[`doStretch${this.getWord(this.getCamelCase(selectData.direction))}`];

      doStretchFun("preDo");
      let overflowLength = getOverflowLength();
      if (overflowLength > 0) {
        doStretchFun("reset");
      }
    },

    // 设置预览图
    setPreview() {
      const { selectData, scaleRate } = this;
      const $canvas = this.$refs.$canvas.getContext("2d");
      $canvas.clearRect(0, 0, 190, 190);
      $canvas.drawImage(
        this.$refs.$img,
        Math.floor(selectData.left / scaleRate),
        Math.floor(selectData.top / scaleRate),
        selectData.width / scaleRate,
        selectData.width / scaleRate,
        0,
        0,
        190,
        190
      );
    },

    // 选择图片
    fileChange(event) {
      const fileObj = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const { selectData, containerBoxData } = this;
        this.imgURL = reader.result;
        this.getImgSize(this.imgURL).then(result => {
          if (result.width > result.height) {
            // 310为外盒子宽高
            this.scaleRate = 310 / result.width;
            containerBoxData.width = 310;
            containerBoxData.height = Math.floor(
              result.height * this.scaleRate
            );
            selectData.top = 0;
            selectData.left = (310 - containerBoxData.height) / 2;
            selectData.width = containerBoxData.height;
          } else {
            this.scaleRate = 310 / result.height;
            containerBoxData.height = 310;
            containerBoxData.width = Math.floor(result.width * this.scaleRate);
            selectData.left = 0;
            selectData.top = (310 - containerBoxData.width) / 2;
            selectData.width = containerBoxData.width;
          }
          this.setPreview();
        });
      };
      reader.readAsDataURL(fileObj);
    },

    // 确认
    onEnter() {
      if (this.imgURL) {
        let that = this;
        let src = this.$refs.$canvas.toDataURL("image/png");
        var b64 = src.substring(22);
        this.$refs.$canvas.toBlob(function(blob) {
          // 图片ajax上传
          let form = new FormData(); // FormData 对象
          form.append("file", blob, 'avatar.png'); // 文件对象
          let xhr = new XMLHttpRequest(); // XMLHttpRequest 对象
          xhr.open("post", that.uploadAction, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
          xhr.setRequestHeader("Authorization", that.headers);
          xhr.send(form); //开始上传，发送form数据
          xhr.onload = function(e) {
            if (this.status == 200) {
              let res = JSON.parse(this.response);
              that.$emit("enter", res.result.path);
            } else {
              that.$Message.error("上传失败");
            }
          };
        });
      } else {
        this.$Message.error("请上传图片");
      }
    },

    // 取消
    onCancel() {
      this.$emit("update:show", false);
    },
    onVisibleChange(n) {
      this.$emit("update:show", n);
    }
  }
};
</script>
