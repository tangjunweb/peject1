<template>
  <div class="error-page">
    <div class="content-con">
      <img :src="src" :alt="404">
      <div class="text-con">
        <img src="@/assets/images/404-num.png" alt>
        <div>
          <h3>对不起，我把您的页面弄丢了......</h3>
          <back-btn-group class="back-btn-group"></back-btn-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import error404 from "@/assets/images/404.png";
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