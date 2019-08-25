<template>
  <div class="organization-create">
    <Card :bordered="false" :dis-hover="true">
      <Form ref="form" :rules="rules" :model="model">
        <Row :gutter="15">
          <Col :span="12">
            <FormItem label="姓名" prop="name">
              <Input  placeholder="请输入姓名" v-model="model.name"></Input>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="身份证号" prop="addition.idCard">
              <Input placeholder="请输入身份证号"  v-model="model.addition.idCard"></Input>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="人员类别" prop="partyMember.partyMemeberType">
              <common-select
                :disabled="$route.query.id!==undefined"
                keys="PartyMemeberType"
                
                v-model="model.partyMember.partyMemeberType"
              ></common-select>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="所在党组织" prop="organId">
              <OrganizationCascader
                :label="organName"
                
                :disabled="model.organId!==''"
                v-model="model.organId"
              ></OrganizationCascader>
            </FormItem>
          </Col>
          <Col :span="24">
            <FormItem>
              <Button :loading="btnLoading" @click="save" type="primary" >保存</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
  </div>
</template>
<script>
import { PartyMemberCreate } from "@/api/partyMember";
import PartyMember from "@/pages/model/PartyMember";
import OrganizationCascader from "@/components/OrganizationCascader";
import { Form, FormItem, Input, Card } from "iview";
import CommonSelect from "@/components/CommonSelect";
export default {
  components: {
    OrganizationCascader,
    Form,
    FormItem,
    Input,
    Card,
    CommonSelect
  },
  data() {
    return {
      btnLoading: false,
      rules: PartyMember.getRules(),
      model: new PartyMember(),
      organName: ""
    };
  },
  methods: {
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.btnLoading = true;
          PartyMemberCreate(PartyMember.getModel(this.model))
            .then(res => {
              this.$Message.success("创建成功");
              this.$router.push({
                path: "info",
                query: {
                  id: res
                }
              });
            })
            .finally(() => {
              this.btnLoading = false;
            });
        }
      });
    }
  },
  mounted() {
    let organId = this.$route.query.organId;
    let organName = this.$route.query.organName;
    if (organId) {
      this.model = new PartyMember({ organId });
    }
    if (organName) {
      this.organName = organName;
    }
  }
};
</script>
<style lang="less">
.layout-lr.organization-create {
  padding: 30px;
}
</style>


