<template>
  <div class="login-face-tips">
    <Modal
      v-model="modal"
      title="提示"
      :width="1100"
      :mask-closable="false"
      :closable="false"
      :scrollable="false"
      transfer
      class-name="login-face-tips"
    >
      <div class="tips-wrap">
        <img class="tips-img" src="@/assets/images/login-face-tips.png" alt />
        <div class="tips-text">
          <p>
            <span>1</span>请开启摄像头，开始录制
          </p>
          <p>
            <span>2</span>完成录制，显示验证结果
          </p>
        </div>
      </div>
      <div slot="footer">
        <Button type="primary" style="margin-left:15px" @click="$router.go(-1)">返回</Button>
        <Button @click="beginLoad" type="primary">开始录制</Button>
      </div>
    </Modal>
    <div class="login-face-camera">
      <div class="camera-wrap">
        <Spin size="large" fix v-if="spinShow">
          <Icon type="ios-loading" size="30" class="demo-spin-icon-load"></Icon>
          <div style="font-size:40px">正在识别中</div>
        </Spin>
        <Spin size="large" style="background:transparent" fix v-if="spinCountDown">
          <div class="count-time">{{this.time}}</div>
        </Spin>
        <img v-show="cameraReady" src="@/assets/images/focus-ready.png" alt class="cameraReady" />
        <video id="video" autoplay></video>
        <div v-show="cameraErr" class="cameraErr">
          <img src="@/assets/images/check-fail.png" alt />
          <p>未获取到摄像头</p>
        </div>
        <canvas style hidden="hidden" id="canvas" width="520" height="250"></canvas>
      </div>
      <Row type="flex">
        <Col>
          <Button type="primary" v-if="reloadCamera" @click="setTime">重新录制</Button>
        </Col>
        <Col>
          <Button
            type="primary"
            style="margin-left:15px"
            v-if="$route.query.type == 'sign'"
            @click="$router.push('login')"
          >密码登录</Button>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import store from "@/vuex/store";
import axios from "@/api/axios";
import { UpdateFaceImgCode, SiginFaceImgCode } from "@/api";
import { setTimeout, setInterval, clearInterval } from "timers";
import { Modal, Spin, Icon } from "iview";
export default {
  components: {
    Modal,
    Spin,
    Icon
  },
  data() {
    return {
      modal: true,
      spinShow: false,
      mediaStreamTrack: "",
      initCamera: false,
      notFoundCamera: false,
      cameraReady: false,
      cameraErr: false,
      reloadCamera: false,
      interval: null,
      time: 3,
      spinCountDown: false
    };
  },
  mounted() {
    if (
      this.$route.query.type == "sign" ||
      this.$route.query.type == "setting"
    ) {
    } else {
      this.$router.go(-1);
    }
  },
  watch: {
    cameraReady(n) {
      if (n) {
        this.setTime();
      }
    }
  },
  methods: {
    beginLoad() {
      this.modal = false;
      this.getVideo();
    },
    //倒计时截图
    setTime() {
      let that = this;
      this.spinCountDown = true;
      this.reloadCamera = false;
      this.time = 3;
      this.interval = setInterval(() => {
        if (this.time <= 0) {
          that.spinCountDown = false;
          that.CatchCode();
          clearInterval(this.interval);
        } else {
          this.time--;
        }
      }, 1000);
    },
    //canvas => video
    getVideo() {
      let that = this;
      var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        video = document.getElementById("video"),
        videoObj = { video: true },
        errBack = function(error) {
          that.cameraErr = true;
        };
      //拍照每秒一次
      setInterval(function() {
        if (that.cameraReady) {
          context.drawImage(video, 0, 0, 330, 250);
        }
      }, 1000);
      //navigator.getUserMedia这个写法在Opera中好像是navigator.getUserMedianow
      //更新兼容火狐浏览器
      if (
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia
      ) {
        navigator.getUserMedia =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia;
        navigator.getUserMedia(
          videoObj,
          function(stream) {
            that.cameraReady = true;
            that.mediaStreamTrack =
              typeof stream.stop === "function"
                ? stream
                : stream.getTracks()[1];
            video.srcObject = stream;
            video.play();
          },
          errBack
        );
      }
    },
    async CatchCode() {
      let that = this;
      var canvans = document.getElementById("canvas");
      //获取浏览器页面的画布对象
      //以下开始编 数据
      var imageBase64 = canvans.toDataURL();
      that.spinShow = true;
      if (that.$route.query.type == "setting") {
        UpdateFaceImgCode({ faceImgCode: imageBase64 }).then(
          res => {
            that.spinShow = false;
            that.reloadCamera = true;
            that.$Message.success("设置成功");
            that.$router.go(-1);
          },
          err => {
            that.spinShow = false;
            that.reloadCamera = true;
          }
        );
      } else {
        try {
          let res = await SiginFaceImgCode({
            faceImgCode: imageBase64,
            userName: that.$route.query.userName,
            password: "1",
            tenantId: "2"
          });
          localStorage.setItem(`${PREFIX}session`, JSON.stringify(res));
          store.commit("UPDATESTATE", {
            session: res
          });
          axios.setOption("Authorization", `Bearer ${res.accessToken}`);
          await store.dispatch("getAllBaseCodes");
          await store.dispatch("systemTypeSelect", res).then(res => {
            if (that.$store.state.systemType == "adminAndUser") {
              that.$router.push("/enter");
            } else if (that.$store.state.systemType == "admin") {
              that.$store.dispatch("getCurrentUserPermissionNames", {
                isadmin: true,
                refresh: true
              });

              that.$router.replace("/main");
            } else {
              that.$store
                .dispatch("getCurrentUserPermissionNames", {
                  isadmin: false,
                  refresh: true
                })
                .then(res => {
                  if (res.length) {
                    that.$router.replace(res[0].url);
                  } else {
                    that.$Message.error("你没有开通任何权限");
                    that.$router.replace("/login");
                  }
                });
            }
            that.$Message.success("登录成功");
          });
        } catch (e) {
          that.spinShow = false;
          that.reloadCamera = true;
        }
      }
    }
  },
  destroyed() {
    this.mediaStreamTrack && this.mediaStreamTrack.stop();
  }
};
</script>

<style lang='less'>
.login-face-tips {
  .tips-wrap {
    width: 850px;
    margin: 20px auto 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .tips-img {
      display: block;
      width: 550px;
      height: 300px;
      margin-right: 20px;
    }
    .tips-text {
      flex: 1;
      p {
        margin-bottom: 50px;
        font-size: 20px;
      }
      span {
        display: inline-block;
        box-sizing: border-box;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        text-align: center;
        line-height: 25px;
        color: #eb3939;
        font-weight: bold;
        border: 2px solid #eb3939;
        margin-right: 15px;
      }
    }
  }
  .login-face-camera {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    .camera-wrap {
      width: 698px;
      height: 498px;
      margin-top: 50px;
      margin-bottom: 20px;
      position: relative;
      .cameraReady {
        width: 310px;
        height: 310px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -155px;
        margin-top: -155px;
      }
      .cameraErr {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 99;
        img {
          width: 210px;
          display: block;
          margin: 110px auto 60px;
        }
        p {
          font-size: 18px;
          color: #666;
          text-align: center;
        }
      }
    }
    video {
      display: block;
      width: 698px;
      height: 498px;
      border: 1px solid #e6e6e6;
    }
    .ivu-spin-fix {
      z-index: 999;
    }
    .count-time {
      font-size: 90px;
      width: 130px;
      height: 130px;
      line-height: 130px;
      text-align: center;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      color: #fff;
    }
  }
}
</style>
