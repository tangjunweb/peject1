<template>
  <span class="lhyj-attachment-list">
    <span class="attachment-item" v-for="(el,i) in data" :key="i" @click="download(el)">{{el.name}}</span>
  </span>
</template>
<script>
import { GetUpLoadAuth } from "@/api";
export default {
  props: {
    data: Array
  },
  methods: {
    download(el) {
      GetUpLoadAuth().then(res => {
        window.open(
          `${UPLOAD_PATH}/file/download?project=${res.project}&token=${
            res.token
          }&id=${el.id}`
        );
      });
    }
  }
};
</script>
<style lang="less" scoped>
.lhyj-attachment-list {
  .attachment-item {
    color: #1288ff;
    text-decoration: underline;
    cursor: pointer;
  }
  .attachment-item + .attachment-item {
    margin-left: 15px;
  }
}
</style>


