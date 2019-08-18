<template>
  <div class="audio-player">
    <div class="audio-play-box" id="video-player"></div>
    <div class="audio-player-left">
      <div class="audio-player-c">
        <div class="audio-player-ci" :class="playState === 'play' ? 'animate' : ''"></div>
      </div>
      <div :class="playState === 'pause' ? 'passed' : ''" class="audio-player-cl"></div>
    </div>
    <div class="audio-player-right">
      <div class="apr-t">
        <span class="aprt-t">{{data.name}}</span>
        <span class="aprt-tag">{{data.keyWord ? data.keyWord.split(',').join(' / ') : ''}}</span>
      </div>
      <div class="apr-s icon-group">
        <span class="apr-span icon-group">
          <i class="icon-eye"></i>
          {{data.viewCount}}
        </span>
        <span class="apr-span icon-group">
          <i class="icon-fav"></i>
          {{data.collectionCount}}
        </span>
        <span class="apr-span notrans icon-group">
          <i class="icon-clock"></i>
          {{data.period}}学时
        </span>
      </div>
      <div class="apr-p">
        <div class="apr-playbtn" @click="play">
          <Icon :type="playState === 'play' ? 'ios-pause' : 'ios-play'" color="#FFF" size="24"></Icon>
        </div>
        <Slider
          :tip-format="tf"
          :step="0.1"
          :min="0"
          :max="total"
          :value="current"
          @on-change="change"
        ></Slider>
        <div class="apr-tip clearfix">
          <div class="apr-tip-s">{{currentTime}}</div>
          <div class="apr-tip-e text-right">{{totalTime}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { LoadAiplayer, LoadAiplayerMemory } from "@/utils/util";
import { GetVideoPlayAuth } from "@/api";
import { Slider, Dropdown, DropdownMenu } from "iview";
import { ResrouceStudy } from "@/api/education";
import { Auth } from "@/mixins";

export default {
  mixins: [Auth],
  components: {
    Slider,
    Dropdown,
    DropdownMenu
  },
  props: {
    aliVideoId: {
      type: [String, Number],
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      ready: false,
      player: null,
      playState: "pause",
      currentTime: "0:00",
      totalTime: "0:00",
      current: 0,
      total: 0,
      timeState: null,
      times: 0
    };
  },
  methods: {
    study() {
      this.timeState = setTimeout(() => {
        ResrouceStudy({
          periodSource: 1,
          resouceId: this.data.id,
          WatchDateTime: parseInt(this.player.getCurrentTime())
        }).then(res => {
          switch (res.studyState) {
            case 1:
              this.times = 1000 * 60;
              this.study();
              break;
            case 2:
              this.$Message.success(res.message);
              clearTimeout(this.timeState);
              this.timeState = null;
              break;
            case 3:
              this.$Message.warning(res.message);
              this.timeState = null;
              clearTimeout(this.timeState);
              break;
            case 4:
              // this.$Message.error(res.message);
              this.timeState = null;
              clearTimeout(this.timeState);
              break;
          }
        });
      }, this.times);
    },
    play() {
      if (this.playState == "play") {
        this.player.pause();
      } else {
        this.player.play();
      }
    },
    tf(t) {
      return new Date(t * 1000).Format("mm:ss");
    },
    change(v) {
      this.player.seek(v);
    },
    playerInit(res) {
      this.player = new Aliplayer({
        id: "video-player",
        vid: res.videoId,
        playauth: res.playAuth,
        mediaType: "audio",
        autoplay: true,
        isLive: false,
        language: "zh-cn",
        useH5Prism: true
      });
      this.loading = true;
      this.player.on("ready", () => {
        this.loading = false;
        let s = this.player.getDuration();
        this.total = s;
        this.totalTime = new Date(s * 1000).Format("mm:ss");
      });
      this.player.on("waiting", () => {
        this.loading = false;
        if (this.isParty && this.timeState) {
          this.times = 0;
          clearTimeout(this.timeState);
          this.timeState = null;
        }
      });
      this.player.on("playing", () => {
        this.playState = "play";
        this.loading = false;
        if (this.isParty && !this.timeState) {
          this.times = 0;
          this.study();
        }
      });
      this.player.on("error", e => {
        this.loading = false;
        throw e;
      });
      this.player.on("pause", () => {
        this.playState = "pause";
        if (this.isParty) {
          this.times = 0;
          clearTimeout(this.timeState);
          this.timeState = null;
        }
      });
      this.player.on("play", () => {
        this.playState = "play";
        console.log("播放");
        if (this.isParty) {
          this.times = 0;
          this.study();
        }
      });
      this.player.on("timeupdate", () => {
        let s = this.player.getCurrentTime();
        this.current = s;
        this.currentTime = new Date(s * 1000).Format("mm:ss");
      });
    },
    init() {
      GetVideoPlayAuth({
        id: this.aliVideoId
      }).then(res => {
        if (this.player) {
          this.player.replayByVidAndPlayAuth(res.videoId, res.playAuth);
        } else {
          this.playerInit(res);
        }
      });
    }
  },
  computed: {
    isParty() {
      //党员端开启记学时
      return this.auth('/member-education/net-school/classroom/tj');
    }
  },
  watch: {
    ready(n) {
      if (n) {
        this.$nextTick(() => {
          this.init();
        });
      }
    }
  },
  mounted() {},
  created() {
    Promise.all([LoadAiplayer(), LoadAiplayerMemory()]).then(() => {
      this.ready = true;
    });
  }
};
</script>
<style lang="less">
@keyframes rotates {
  to {
    transform: rotateZ(360deg);
  }
}
.audio-player {
  box-sizing: border-box;
  padding: 30px 30px 30px 240px;
  box-sizing: border-box;
}
.audio-player-left {
  width: 150px;
  height: 150px;
  position: absolute;
  left: 30px;
  top: 30px;
}
.audio-player-right {
  margin-top: 20px;
}
.audio-player-c {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-image: url("../../assets/audio-bg2.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.audio-player-ci {
  width: 62%;
  height: 62%;
  border-radius: 50%;
  background-image: url("../../assets/audio-bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  &.animate {
    animation: rotates 5s linear infinite;
  }
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.audio-player-cl {
  width: 121px;
  height: 121px;
  background-image: url("../../assets/audio-bg3.png");
  background-repeat: no-repeat;
  background-position: right top;
  position: absolute;
  right: 0;
  top: 0;
  transform-origin: 100% 0;
  transition: all 0.5s linear;
  &.passed {
    transform: rotateZ(-17deg);
  }
}
.audio-play-box {
  display: none;
}
.apr-s {
  margin-top: 10px;
}
.aprt-t {
  font-size: 18px;
  margin-right: 15px;
}
.apr-m {
  margin-top: 10px;
}
.apr-span {
  margin-right: 30px;
  i {
    font-size: 16px;
    margin-right: 10px;
  }
  &.notrans {
    i {
      transform: translateY(0);
    }
  }
}
.apr-playbtn {
  background: #1288ff;
  border-radius: 50%;
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  position: absolute;
  left: 0;
  top: -10px;
  cursor: pointer;
}
.apr-p {
  margin-top: 30px;
  position: relative;
  padding-left: 60px;
  box-sizing: border-box;
  padding-right: 30px;
}
.apr-tip {
  transform: translateY(-5px);
  .apr-tip-s,
  .apr-tip-e {
    float: left;
    width: 50%;
    font-size: 12px;
  }
}
</style>
