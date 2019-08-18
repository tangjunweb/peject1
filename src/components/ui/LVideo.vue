<template>
  <div class="video-play-box" id="video-player">
    <Spin fix v-if="!ready||loading||waiting">
      <span class="video-tips-text">{{tips}}</span>
    </Spin>
  </div>
</template>
<script>
import { LoadAiplayer, LoadAiplayerMemory } from "@/utils/util";
import { GetVideoPlayAuth } from "@/api";
import { ResrouceStudy } from "@/api/education";
import { Auth } from "@/mixins";
import { parse } from "path";
export default {
  mixins: [Auth],
  props: {
    aliVideoId: {
      type: [String, Number],
      required: true
    },
    id: [Number, String]
  },
  data() {
    return {
      loading: false,
      ready: false,
      waiting: false,
      player: null,
      timeState: null,
      times: 0
    };
  },
  methods: {
    study() {
      this.timeState = setTimeout(() => {
        console.log(parseInt(this.player.getCurrentTime()));
        ResrouceStudy({
          periodSource: 1,
          resouceId: this.id,
          WatchDateTime: parseInt(this.player.getCurrentTime())
        }).then(res => {
          let period = res.userStudyDetail;
          if(period) this.$emit('updatePeroid', period)
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
    playerInit(res) {
      this.player = new Aliplayer({
        id: "video-player",
        source: this.src,
        width: "100%",
        height: "100%",
        videoHeight: "100%",
        videoWidth: "100%",
        vid: res.videoId,
        playauth: res.playAuth,
        mediaType: "video",
        autoplay: true,
        isLive: false,
        language: "zh-cn",
        useH5Prism: true,
        definition: "HD,SD,LD,FD",
        defaultDefinition: "LD",
        components: [
          {
            name: "MemoryPlayComponent",
            type: AliPlayerComponent.MemoryPlayComponent
          }
        ]
      });
      this.loading = true;
      this.player.on("ready", () => {
        this.loading = false;
      });
      this.player.on("waiting", () => {
        this.loading = false;
        this.waiting = true;
        if (this.isParty && this.timeState) {
          this.times = 0;
          clearTimeout(this.timeState);
          this.timeState = null;
        }
      });
      this.player.on("playing", () => {
        this.loading = false;
        this.waiting = false;
        if (this.isParty && !this.timeState) {
          this.times = 0;
          this.study();
        }
      });
      this.player.on("error", e => {
        this.loading = false;
        throw e;
      });
      this.player.on("play", () => {
        if (this.isParty) {
          this.times = 0;
          this.study();
        }
      });
      this.player.on("pause", () => {
        if (this.isParty) {
          this.times = 0;
          clearTimeout(this.timeState);
          this.timeState = null;
        }
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
    tips() {
      if (!this.ready) {
        return "准备中...";
      } else if (this.loading) {
        return "视频加载中...";
      } else if (this.waiting) {
        return "缓冲中...";
      } else {
        return "";
      }
    },
    isParty() {
      //党员端开启记学时
      return this.auth("/member-education/net-school/classroom/tj");
    }
  },
  watch: {
    ready(n) {
      if (n) {
        this.$nextTick(() => {
          this.init();
        });
      }
    },
    aliVideoId() {
      if (this.ready) {
        this.init();
      }
    }
  },
  created() {
    Promise.all([LoadAiplayer(), LoadAiplayerMemory()]).then(() => {
      this.ready = true;
    });
  }
};
</script>
<style lang="less">
.prism-player .prism-big-play-btn {
  left: 0 !important;
  bottom: 0 !important;
  margin: auto;
  right: 0;
  top: 0;
  z-index: 100 !important;
}
@keyframes loadanim {
  to {
    transform: rotate(360deg);
  }
}
.video-loading-icon {
  animation: 2s loadanim infinite linear;
}
.video-tips-text {
  margin-left: 10px;
}
.video-play-box {
  width: 100%;
  height: 100%;
  position: relative;
  .video-toolbar {
    position: absolute;
    height: 40px;
    line-height: 40px;
    width: 100%;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
  }
  .ivu-spin-fix {
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>


