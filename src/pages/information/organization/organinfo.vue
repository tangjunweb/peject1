<template>
  <div class="layout-lr-lc">
    <Card class="border" :dis-hover="true">
      <Tabs class="lhyj-tabs" :animated="false" v-model="tabName">
        <TabPane label="党组织基本信息" name="1"></TabPane>
        <TabPane :disabled="!organization.id" label="班子成员" name="2"></TabPane>
        <TabPane
          v-if="organization.isOrganGroup"
          :disabled="!organization.id"
          label="党小组成员"
          name="3"
        ></TabPane>
        <TabPane :disabled="!organization.id" label="奖惩" name="4"></TabPane>
        <TabPane v-if="organization.isBranch" :disabled="!organization.id" label="支委会成员" name="5"></TabPane>
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
import OrganizationBasicFormInfo from "./OrganizationBasicFormInfo";
import OrganizationBzcyFormInfo from "./OrganizationBzcyFormInfo";
import OrganizationOtherFormInfo from "./OrganizationOtherFormInfo";
import OrganizationDxzFormInfo from "./OrganizationDxzFormInfo";
import OrganizationZbwyhFormInfo from "./OrganizationZbwyhFormInfo";
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
          return OrganizationBasicFormInfo;
          break;
        case 2:
          return OrganizationBzcyFormInfo;
          break;
        case 3:
          return OrganizationDxzFormInfo;
          break;
        case 4:
          return OrganizationOtherFormInfo;
          break;
        case 5:
          return OrganizationZbwyhFormInfo;
          break;
        default:
          return OrganizationBasicFormInfo;
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
