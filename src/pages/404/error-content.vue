<template>
  <div class="error-page">
    <div class="content-con">
      <img :src="src" :alt="code">
      <div class="text-con">
        <img src="@/assets/images/404-num.png" alt>
        <div>
          <h3>{{desc}}</h3>
          <back-btn-group class="back-btn-group"></back-btn-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./error.less";
import backBtnGroup from "./back-btn-group.vue";
export default {
  name: "error_content",
  components: {
    backBtnGroup
  },
  props: {
    code: String,
    desc: String,
    src: String
  }
};
</script>