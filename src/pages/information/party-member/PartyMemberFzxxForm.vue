<template>
  <Form ref="form" :rules="rules" :model="model" v-if="partyMember.id">
    <Row :gutter="50">
      <Col :span="12">
        <FormItem label="人员类别" prop="partyMember.joinPartyType">
          <common-select keys="JoinPartyType" v-model="model.partyMember.joinPartyType"></common-select>
        </FormItem>
        <FormItem label="入党时学历" prop="partyMember.joinEducation">
          <common-select
            keys="Education"
            :format="formatSelect"
            v-model="model.partyMember.joinEducation"
          ></common-select>
        </FormItem>
        <FormItem label="入党时所在支部" prop="partyMember.joinOrgId">
          <OrganizationCascader
            :label="model.partyMember.joinOrgName"
            v-model="model.partyMember.joinOrgId"
          ></OrganizationCascader>
        </FormItem>
        <FormItem label="确定为入党积极分子日期" prop="partyMember.activeDate">
          <DatePicker
            transfer
            placeholder="选择日期"
            style="width:100%"
            v-model="model.partyMember.activeDate"
          ></DatePicker>
        </FormItem>
        <FormItem label="入党介绍人" prop="partyMember.joinIntroducers">
          <Input placeholder="选择入党介绍人" :value="joinIntroducers" readonly>
            <PartyMemberSelect @change="partyMemberChange" type="multiple" slot="append"></PartyMemberSelect>
          </Input>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="预备党员转正情况" prop="partyMember.positiveSituation">
          <common-select keys="PositiveSituation" v-model="model.partyMember.positiveSituation"></common-select>
        </FormItem>
        <FormItem label="入党时工作岗位" prop="partyMember.joinPost">
          <common-select keys="Post" :format="formatSelect" v-model="model.partyMember.joinPost"></common-select>
        </FormItem>
        <FormItem label="申请入党日期" prop="partyMember.applicationDate">
          <DatePicker
            transfer
            placeholder="选择日期"
            style="width:100%"
            v-model="model.partyMember.applicationDate"
          ></DatePicker>
        </FormItem>
        <FormItem label="列为发展对象日期" prop="partyMember.developMentDate">
          <DatePicker
            transfer
            placeholder="选择日期"
            style="width:100%"
            v-model="model.partyMember.developMentDate"
          ></DatePicker>
        </FormItem>
      </Col>
      <Col :span="24">
        <FormItem class="text-center">
          <Button :loading="loading" @click="save" type="primary" ghost>保存</Button>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>
<script>
import { Form, FormItem, Input, DatePicker } from "iview";
import CommonSelect from "@/components/CommonSelect";
import PartyMember from "@/pages/model/PartyMember";
import UploadImg from "@/components/UploadImg";
import { UpdatePartyMemberInfo } from "@/api/partyMember";
import OrganizationCascader from "@/components/OrganizationCascader";
import PartyMemberSelect from "@/pages/common/PartyMemberSelect";
export default {
  components: {
    Form,
    FormItem,
    Input,
    DatePicker,
    UploadImg,
    CommonSelect,
    OrganizationCascader,
    PartyMemberSelect
  },
  props: {
    partyMember: {
      type: Object
    }
  },
  watch: {
    partyMember: {
      deep: true,
      handler() {
        this.model = new PartyMember(this.partyMember);
      }
    }
  },
  data() {
    return {
      model: new PartyMember(),
      rules: PartyMember.getRules(),
      loading: false
    };
  },
  computed: {
    joinIntroducers() {
      return this.model.partyMember.joinIntroducers.map(e => e.name).join(",");
    }
  },
  methods: {
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          UpdatePartyMemberInfo(PartyMember.getModel(this.model))
            .then(res => {
              this.$Message.success("保存成功");
              this.$emit("change");
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    partyMemberChange(data) {
      this.model.partyMember.joinIntroducers = data.map(e => {
        return {
          userId: e.id,
          name: e.name
        };
      });
    },
    formatSelect(labels, selectedData) {
      const index = labels.length - 1;
      const data = selectedData[index] || false;
      return labels[index];
    }
  },
  mounted() {
    this.model = new PartyMember(this.partyMember);
  }
};
</script>

