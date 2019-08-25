<template>
  <div class="party-member">
    <!-- <TopCountTipsCard title="党员管理" :count="0" subTitle="党员总数" unit='人'></TopCountTipsCard> -->
    <div class="text-right">
      <Form inline>
        <Row type="flex" justify="space-between">
          <Col>
            <div>
              <FormItem label="党员姓名" :label-width="100">
                <Input v-model="searchParams.Keyword" type="text" placeholder="输入党员姓名搜索"></Input>
              </FormItem>
              <FormItem label="人员类别" :label-width="80">
                <common-select v-model="searchParams.PartyMemeberType" keys="PartyMemeberType"></common-select>
              </FormItem>
              <FormItem>
                <Button @click="search" type="primary">搜索</Button>
              </FormItem>
              <FormItem>
                <Button @click="reset" type="primary">重置</Button>
              </FormItem>
            </div>
          </Col>
          <Col>
            <FormItem v-if="auth('/information/party-member/create')">
              <Button
                @click="add"
                v-if="selectOrganization&&!selectOrganization.hasChild && auth('/information/party-member/create') && isIntranet"
                type="primary"
              >新增党员</Button>
            </FormItem>
            <FormItem v-if="auth('/information/party-member/audit')">
              <Button type="primary" @click="$router.push('audit')" ghost>账号转移管理</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <Card class="border" :dis-hover="true">
      <Row :gutter="15">
        <Col :span="7">
          <organization-tree @on-select="OrganSelect" theme="blue"></organization-tree>
        </Col>
        <Col :span="17">
          <component
            ref="childtable"
            :searchParams="searchParams"
            :organization="selectOrganization"
            :is="componentId"
          ></component>
        </Col>
      </Row>
    </Card>
  </div>
</template>
<script>
import TopCountTipsCard from "@/components/TopCountTipsCard";
import { Form, FormItem, Input, Card, Select, Option } from "iview";
import OrganizationTree from "@/components/OrganizationTree";
import PartyMemberMember from "@/pages/common/PartyMemberMember";
import PartyMemberOrganization from "@/pages/common/PartyMemberOrganization";
import CommonSelect from "@/components/CommonSelect";
import { Auth } from "@/mixins";
export default {
  mixins: [Auth],
  components: {
    CommonSelect,
    TopCountTipsCard,
    Form,
    FormItem,
    Input,
    OrganizationTree,
    Card,
    Select,
    Option
  },
  data() {
    return {
      searchParams: {
        PartyMemeberType: "",
        Keyword: ""
      },
      flag: false, //判断当前是组织统计还是党员列表
      selectOrganization: null
    };
  },
  computed: {
    isIntranet() {
      return this.$store.state.session.isIntranet;
    },
    componentId() {
      if ((this.searchParams.Keyword || this.searchParams.PartyMemeberType) && this.flag) {
        this.flag = false;
        return PartyMemberMember;
      }
      if (!this.selectOrganization) {
        return PartyMemberOrganization;
      } else if (this.selectOrganization.hasChild) {
        return PartyMemberOrganization;
      } else {
        return PartyMemberMember;
      }
    },
    EnumAnnouncementType() {
      return this.$store.state.baseCode.EnumAnnouncementType;
    }
  },
  methods: {
    OrganSelect(node) {
      this.selectOrganization = node;
    },
    reset() {
      this.searchParams.PartyMemeberType = "";
      this.searchParams.Keyword = "";
      this.params = {
        MaxResultCount: 10,
        SkipCount: 0,
        PreSkipCount: 0,
        LastId: "",
        PageIndex: 1
      };
      this.$refs["childtable"].loadData();
    },
    search() {
      this.flag = true;
      this.$refs["childtable"].loadData();
    },
    add() {
      let query = this.$route.query;
      this.$router.push({
        path: "create",
        query: {
          type: query.type,
          organId: this.selectOrganization.id,
          organName: this.selectOrganization.organName
        }
      });
    }
  }
};
</script>
<style lang="less">
</style>


