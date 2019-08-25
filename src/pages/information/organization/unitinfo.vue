<template>
  <div class="organization-unitinfo">
    <Card class="border" :dis-hover="true">
      <Row>
        <Col :span="8">
          <div style="font-size:16px;">{{unit.unitName}}</div>
        </Col>
        <Col :span="16" class="clearfix">
          <Tabs v-model="tabName" style="float:right">
            <TabPane label="单位概况" name="1"></TabPane>
            <TabPane label="班子成员" name="2"></TabPane>
            <div slot="extra">
              <Button v-if="unit.unitVerify === 0" type="primary" @click="batch">审核</Button>
            </div>
          </Tabs>
        </Col>
      </Row>
      <Spin fix v-if="loading"></Spin>
      <div v-else>
        <component @changeTab="changeTab" :unit="unit" :is="componentId"></component>
      </div>
    </Card>

    <Modal
      :value.sync="showModal"
      title="审核单位"
      :closable="false"
      :mask-closable="false"
      transfer
      :loading="modalLoading"
      width="500px"
      class-name="blue-modal"
    >
      <Form ref="form">
        <FormItem label="审核结果">
          <i-switch  v-model="model.pass">
            <span slot="open">通过</span>
            <span slot="close">拒绝</span>
          </i-switch>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="showModal = false">关闭</Button>
        <Button @click="audit" :loading="modalLoading">审核</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { Tabs, TabPane, Modal, Form, FormItem, Switch, Card } from "iview";
import Dwgk from "./dwgk";
import Dwbzcy from "./dwbzcy";
import { GetUnitById, AuditUnitAsync } from "@/api/partyOrganizationService";
export default {
  components: {
    Card,
    Tabs,
    TabPane,
    Modal,
    Form,
    FormItem,
    "i-switch": Switch
  },
  data() {
    return {
      tabName: "1",
      loading: false,
      unit: {},
      model: {
        pass: true,
        ids: ""
      },
      showModal: false,
      modalLoading: false
    };
  },
  computed: {
    componentId() {
      switch (parseInt(this.tabName)) {
        case 1:
          return Dwgk;
          break;
        case 2:
          return Dwbzcy;
          break;
        default:
          return Dwgk;
          break;
      }
    }
  },
  methods: {
    changeTab(name) {
      this.tabName = name;
    },
    batch() {
      this.showModal = true;
      this.model.ids = this.$route.query.id;
    },
    audit() {
      this.modalLoading = true;
      AuditUnitAsync(this.model)
        .then(res => {
          this.$Message.success("审核成功");
          this.showModal = false;
          this.loadData();
        })
        .finally(() => {
          this.modalLoading = false;
        });
    },
    loadData() {
      this.loading = true;
      GetUnitById({
        id: this.$route.query.id
      })
        .then(res => {
          this.unit = res;
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

<style lang="less">
</style>
