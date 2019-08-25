<template>
  <div class="organization-edit">
    <Card class="border" :dis-hover="true">
      <Tabs v-model="tabName">
        <TabPane name="dyjbxx" label="党员基本信息"></TabPane>
        <TabPane name="dyfzxx" label="入党信息"></TabPane>
        <TabPane name="zw" label="职务"></TabPane>
        <TabPane name="jc" label="奖惩"></TabPane>
        <TabPane name="cgcj" label="出国（境）"></TabPane>
        <TabPane name="knqk" label="困难情况"></TabPane>
      </Tabs>
      <Spin fix v-if="loading"></Spin>
      <div v-else class="layout-lr-form-scroll scroll">
        <div v-show="tabName === 'dyjbxx'">
          <PartyMemberBasicForm @change="loadData" :partyMember="partyMember"></PartyMemberBasicForm>
        </div>
        <div v-show="tabName === 'dyfzxx'">
          <PartyMemberFzxxForm @change="loadData" :partyMember="partyMember"></PartyMemberFzxxForm>
        </div>
        <div v-show="tabName === 'zw'">
          <PartyMemberZwForm @change="loadData" :partyMember="partyMember"></PartyMemberZwForm>
        </div>
        <div v-show="tabName === 'jc'">
          <PartyMemberJcForm @change="loadData" :partyMember="partyMember"></PartyMemberJcForm>
        </div>
        <div v-show="tabName === 'cgcj'">
          <PartyMemberCgcjForm @change="loadData" :partyMember="partyMember"></PartyMemberCgcjForm>
        </div>
        <div v-show="tabName === 'knqk'">
          <PartyMemberKnqkForm @change="loadData" :partyMember="partyMember"></PartyMemberKnqkForm>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import { Tabs, TabPane, Card } from "iview";
import PartyMemberBasicForm from "./PartyMemberBasicForm";
import PartyMemberFzxxForm from "./PartyMemberFzxxForm";
import PartyMemberZwForm from "./PartyMemberZwForm";
import PartyMemberJcForm from "./PartyMemberJcForm";
import PartyMemberCgcjForm from "./PartyMemberCgcjForm";
import PartyMemberKnqkForm from "./PartyMemberKnqkForm";
import { PartyMemberServiceGet } from "@/api/partyMember";
export default {
  components: {
    Card,
    Tabs,
    TabPane,
    PartyMemberBasicForm,
    PartyMemberFzxxForm,
    PartyMemberZwForm,
    PartyMemberJcForm,
    PartyMemberCgcjForm,
    PartyMemberKnqkForm
  },
  data() {
    return {
      tabName: "dyjbxx",
      loading: false,
      partyMember: {
          partyMember: {},
          addition: {
            adminDutyUnitName:""
          }
      }
    };
  },
  methods: {
    loadData() {
      let id = this.$route.query.id;
      this.loading = true;
      PartyMemberServiceGet({ id })
        .then(res => {
          this.partyMember = res;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    let id = this.$route.query.id;
    if (id) {
      this.loadData();
    } else {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less">
</style>


