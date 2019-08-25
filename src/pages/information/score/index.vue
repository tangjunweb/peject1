<template>
  <div class="information-score">
    <div class="lhyj-tabs-nav">
      <!-- <router-link tag="li" :to="{path: 'member'}">党员积分排行</router-link> -->
      <!-- <router-link tag="li" :to="{path: 'organization'}">党组织积分排行</router-link> -->
    </div>
    <router-view />
  </div>
</template>

<script>
import { Card } from "iview";
export default {
  components: {
    Card
  }
};
</script>

<style>
</style>
