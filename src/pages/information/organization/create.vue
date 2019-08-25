<template>
  <div class="layout-lr-lc">
    <Card class="border" :dis-hover="true">
      <Tabs v-model="tabName" class="lhyj-tabs" :animated="false">
        <TabPane label="党组织基本信息" name="1"></TabPane>
        <TabPane :disabled="!organization.id" label="班子成员" name="2"></TabPane>
        <TabPane :disabled="!organization.id" label="党小组成员" v-if="organization.isOrganGroup" name="3"></TabPane>
        <TabPane :disabled="!organization.id" label="支部委员会" name='5' v-if="organization.isBranch"></TabPane>
        <TabPane :disabled="!organization.id" label="奖惩" name="4"></TabPane>
      </Tabs>
      <Spin fix v-if="loading"></Spin>
      <component
        @change="loadData"
        @changeTab="changeTab"
        :organization="organization"
        :is="componentId"
      ></component>
    </Card>
  </div>
</template>
<script>
import { Tabs, TabPane, Card } from "iview";
import OrganizationBasicForm from "./OrganizationBasicForm";
import OrganizationBzcyForm from "./OrganizationBzcyForm";
import OrganizationOtherForm from "./OrganizationOtherForm";
import OrganizationDxzForm from "./OrganizationDxzForm";
import OrganizationZbwyhForm from "./OrganizationZbwyhForm";
import { GetOrgnizationByIdAsync } from "@/api/partyOrganizationService";
export default {
  components: {
    Tabs,
    TabPane,
    Card
  },
  data() {
    return {
      tabName: "1",
      loading: false,
      organization: {}
    };
  },
  computed: {
    componentId() {
      switch (parseInt(this.tabName)) {
        case 1:
          return OrganizationBasicForm;
          break;
        case 2:
          return OrganizationBzcyForm;
          break;
        case 3:
          return OrganizationDxzForm;
          break;
        case 4:
          return OrganizationOtherForm;
          break;
        case 5:
          return OrganizationZbwyhForm;
          break;
        default:
          return OrganizationBasicForm;
          break;
      }
    }
  },
  methods: {
    changeTab(name) {
      this.tabName = name;
    },
    loadData() {
      this.loading = true;
      GetOrgnizationByIdAsync({
        id: this.$route.query.id
      })
        .then(res => {
          this.organization = res;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.loadData();
    }
  }
};
</script>
