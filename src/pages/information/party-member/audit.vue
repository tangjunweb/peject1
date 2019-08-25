<!-- 组织关系转接列表 -->
<template>
  <div class="party-member-audit">
    <Row type="flex" justify="space-between">
      <Col>
        <Tabs class="lhyj-tabs" v-model="tabName">
          <TabPane name="zcsq" label="转出申请"></TabPane>
          <TabPane name="zrsq" label="转入申请"></TabPane>
        </Tabs>
      </Col>
      <Col>
        <Form inline>
          <FormItem v-if="auth('/information/party-member/apply')">
            <Button ghost @click="show=true" type="primary">发起转移</Button>
          </FormItem>
          <FormItem>
            <Button ghost @click="$router.push('history')" type="primary">党员转接历史记录</Button>
          </FormItem>
        </Form>
      </Col>
    </Row>
    <component :is="componentId"></component>
    <Modal
      v-model="show"
      :title="'账号转移'"
      :loading="loading"
      transfer
      class-name="blue-modal"
      width="500px"
    >
      <Form ref="form" :model="model" :label-width="120" :rules="rules">
        <FormItem label="党员：" prop="userId">
          <Input :readonly="true" placeholder="请输入姓名" v-model="member.name">
            <PartyMemberSelect
              :organId="orgId"
              @change="memeberChange"
              type="single"
              slot="append"
              v-model="model.userId"
            >
              <Button type="default">选择党员</Button>
            </PartyMemberSelect>
          </Input>
        </FormItem>
        <FormItem label="当前党组织：">
          <Input
            :readonly="true"
            disabled
          
            placeholder="选择党组织"
            v-model="member.organName"
          ></Input>
        </FormItem>
        <FormItem label="转入党组织：" prop="toOrganId">
          <Input readonly placeholder="请选择转入党组织名称" v-model="orgName">
            <OrgSearchModal slot="append" @change="orgChange" v-model="model.toOrganId">
              <Button type="default">选择党组织</Button>
            </OrgSearchModal>
          </Input>
        </FormItem>
        <FormItem label="转接原因：" prop="reason">
          <Input type="textarea" v-model="model.reason" placeholder="请填写转接原因"></Input>
        </FormItem>
        <FormItem label="备注：">
          <Input type="textarea" v-model="model.remark" placeholder="请填写备注"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="show = false" type="primary">取消</Button>
        <Button :loading="loading" @click="save" type="primary">确认</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { Auth } from '@/mixins';
import { Tabs, TabPane, Modal } from "iview";
import { OrganizationChangeServiceApply } from "@/api/service";
import OrgSearchModal from "@/pages/common/OrgSearchModal";
import PartyMemberSelect from "@/pages/common/PartyMemberSelect";
import Zcsq from "./zcsq";
import Zrsq from "./zrsq";
export default {
  mixins: [Auth],
  components: {
    OrgSearchModal,
    Modal,
    Tabs,
    TabPane,
    PartyMemberSelect
  },
  data() {
    let that = this;
    return {
      tabName: "zcsq",
      model: {
        userId: "",
        toOrganId: "",
        reason: "",
        remark: ""
      },
      orgName:"",
      member: {},
      rules: {
        userId: [
          {
            required: true,
            trigger: "change",
            message: "请选择转接党员"
          }
        ],
        toOrganId: [
          {
            required: true,
            trigger: "change",
            message: "请选择转入的党组织"
          }
        ],
        reason: [
          {
            required: true,
            trigger: "blur",
            message: "请输入转接原因"
          }
        ]
      },
      show: false,
      loading: false
    };
  },
  computed: {
    componentId() {
      switch (this.tabName) {
        case "zcsq":
          return Zcsq;
          break;
        case "zrsq":
          return Zrsq;
          break;
      }
    },
    orgId() {
      return this.$store.state.session.organId;
    }
  },
  methods: {
    memeberChange(data) {
      this.member = data;
      this.model.userId = data.id;
    },
    orgChange(n){
      this.orgName = n.organName;
    },
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          OrganizationChangeServiceApply(this.model)
            .then(res => {
              this.$Message.success("申请成功");
              this.show = false;
              this.model = {};
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    }
  },
  mounted() {
    let query = this.$route.query;
    if (query.tabName) {
      this.tabName = query.tabName;
    }
  }
};
</script>
<style lang="less" scoped>
.layout-lr.relationshipswitch {
  // padding: 30px 60px 30px 30px;
  .layout-lr-lc {
    // padding-top: 60px;
    .layout-lr-lch {
      height: 60px;
      line-height: 60px;
    }
  }
  .layout-lr-lcb {
    padding: 30px;
    position: relative;
    box-sizing: border-box;
  }
}
</style>