<template>
  <div class="score-role">积分规则</div>
</template>

<script>
import { PartyCreditRuleSettingsList, PartyCreditRuleSettingsInit } from '@/api'
export default {
  mounted(){
    this.init();
    this.loadData();
  },
  methods:{
    init(){
      PartyCreditRuleSettingsInit().then(res => {

      })
    },
    loadData(){
      PartyCreditRuleSettingsList().then(res => {

      })
    }
  }
}
</script>

<style>

</style>
