<template>
  <div class="error-page">
    <div class="content-con content-con-403">
      <img :src="src" :alt="403">
      <div class="text-con">
        <div>
          <h3>功能开发中</h3>
          <back-btn-group class="back-btn-group"></back-btn-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import error404 from "@/assets/images/403.png";
import "./error.less";
import backBtnGroup from "./back-btn-group.vue";
export default {
  name: "error",
  components: {
    backBtnGroup
  },
  data(){
    return {
      src: error404
    }
  }
};
</script>