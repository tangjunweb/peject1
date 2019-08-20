<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  
  </div>
</template>

<script>
export default {
  name: "Admin",
  created() { }
};
</script>

<style lang="less">
#app {
  background: #f5f7f9;
 
}
</style>
