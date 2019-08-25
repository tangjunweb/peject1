<template>
  <div class="layout-lr organization-info">
    <Row>
      <Col :span="8">
        <div style="font-size:16px;color:#84D7FF">{{organization.organName}}</div>
      </Col>
      <Col :span="16" class="clearfix">
        <Tabs v-model="tabName" style="float:right">
          <TabPane label="党组织基本信息" name="1"></TabPane>
          <TabPane :disabled="!organization.id" label="班子成员" name="2"></TabPane>
          <TabPane :disabled="!organization.id" label="单位基本信息" name="3"></TabPane>
          <TabPane :disabled="!organization.id" label="其他信息" name="4"></TabPane>
        </Tabs>
      </Col>
    </Row>
    <Spin fix v-if="loading"></Spin>
    <div v-else class="layout-lr-form-scroll scroll">
      <component @changeTab="changeTab" :organization="organization" :is="componentId"></component>
    </div>
  </div>
</template>
<script>
import { Tabs, TabPane } from "iview";
import OrganizationBasicForm from "./OrganizationBasicForm";
import OrganizationBzcyForm from "./OrganizationBzcyForm";
import OrganizationOtherForm from "./OrganizationOtherForm";
import OrganizationUnitForm from "./OrganizationUnitForm";
import { GetOrgnizationByIdAsync } from "@/api/partyOrganizationService";
export default {
  components: {
    Tabs,
    TabPane
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
          return OrganizationUnitForm;
          break;
        case 4:
          return OrganizationOtherForm;
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
    }
  },
  mounted() {
    if (this.$route.query.id) {
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
  }
};
</script>

<style lang="less">
.layout-lr {
  &.organization-info {
    padding: 30px;
    .ivu-tabs {
      margin-top: 24px;
      .ivu-tabs-bar {
        border-bottom: none;
      }
    }
    .layout-lr-lc {
      padding-top: 60px;
    }
    .layout-lr-lch {
      height: 60px;
      line-height: 60px;
    }
  }
}
</style>
