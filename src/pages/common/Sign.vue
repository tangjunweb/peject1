<template>
  <Modal
    :value="value"
    :title="title"
    :mask-closable="false"
    width="500px"
    :loading="loading"
    transfer
    class-name="blue-modal sign-modal"
  >
    <div>
      <div class="sign-map" id="signmap"></div>
      <Alert show-icon type='info'>
        <Icon type="ios-navigate" slot="icon"></Icon>
        <template>当前地址:{{address.address || local}}</template>
      </Alert>
    </div>
    <div slot="footer">
      <Button :loading="loading" type="primary" @click="sign">确定签到</Button>
      <Button type="primary" @click="$emit('input',false)">取消</Button>
    </div>
  </Modal>
</template>
<script>
import { TrainClassCourseServiceSignin } from "@/api/education";
import { Modal, Icon, Alert } from "iview";
import { UseMap } from "@/utils/util";
export default {
  components: {
    Modal,
    Icon, Alert
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object
    },
    title: "签到",
    fn: {
      type: Function,
      default: TrainClassCourseServiceSignin
    }
  },
  data() {
    return {
      loading: false,
      $map: null,
      address: {},
      local: ''
    };
  },
  watch: {
    value(n) {
      let that = this;
      if (n && !this.$map) {
        that.$nextTick(() => {
          UseMap(() => {
            let opts = {
              resizeEnable: true,
              zoom: 11
            };
            that.$map = new AMap.Map("signmap", opts);
            AMap.plugin("AMap.Geolocation", () => {
              let geolocation = new AMap.Geolocation({
                enableHighAccuracy: true, //是否使用高精度定位，默认:true
                timeout: 10000, //超过10秒后停止定位，默认：5s
                buttonPosition: "RB", //定位按钮的停靠位置
                buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
              });
              that.$map.addControl(geolocation);
              geolocation.getCurrentPosition((status, result) => {
                if (status == "complete") {
                  that.local = result.formattedAddress;
                  that.address.address = result.formattedAddress;
                  that.address.longitude = result.position.lng;
                  that.address.latitude = result.position.lat;
                  let marker = (that.$marker = new AMap.Marker());
                  that.$map.add(that.$marker);
                  marker.setPosition(result.position);
                  that.$map.setFitView(that.$marker);
                }
              });
            });
          });
        });
      }
    }
  },
  methods: {
    sign() {
      let params = JSON.parse(JSON.stringify(this.address));
      Object.assign(params, this.params);
      this.loading = true;
      this.fn(params)
        .then(res => {
          this.$Message.success("签到成功");
          this.$emit("input", false);
          this.$emit("change");
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.sign-modal {
  .sign-map {
    width: 100%;
    height: 300px;
    margin-bottom: 15px;
  }
}
</style>


