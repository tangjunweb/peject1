<template>
  <div class="organization">
    <Card class="border" :dis-hover="true">
      <Spin fix v-if="loadState"></Spin>
      <Form ref="form" :model="model" :rules="rules">
        <Row :gutter="30" type="flex">
          <Col :span="24">
            <FormItem label="是否法人单位" prop="legalEntityFlag">
              <Checkbox v-model="model.legalEntityFlag"></Checkbox>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="单位名称" prop="unitName">
              <Input  placeholder="单位名称" v-model="model.unitName"></Input>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="单位性质类别" prop="unitNatrueType">
              <common-select
                v-model="model.unitNatrueType"
                keys="UnitNatrueType"
                placeholder="选择单位性质类别"
              ></common-select>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="建立党组织情况" prop="establishmentOfOrg">
              <common-select
                v-model="model.establishmentOfOrg"
                keys="EstablishmentOfOrg"
                placeholder="选择单位性质类别"
              ></common-select>
            </FormItem>
          </Col>
          <Col :span="8" v-if="model.legalEntityFlag">
            <FormItem
              :class="{'no-require': !model.legalEntityFlag}"
              label="单位信用代码"
              prop="socialCrediitCode"
            >
              <Input  placeholder="单位信用代码" v-model="model.socialCrediitCode"></Input>
            </FormItem>
          </Col>
          <Col :span="8" v-if="!model.legalEntityFlag">
            <FormItem
              :class="{'no-require': !model.legalEntityFlag}"
              label="单位信用代码"
              prop="socialCrediitCode1"
            >
              <Input  placeholder="单位信用代码" v-model="model.socialCrediitCode1"></Input>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="负责人" prop="principal">
              <Input  placeholder="负责人" v-model="model.principal"></Input>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="负责人身份证" prop="principalIdCard">
              <Input  placeholder="负责人身份证" v-model="model.principalIdCard"></Input>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="联系人" prop="contrator">
              <Input  placeholder="联系人" v-model="model.contrator"></Input>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="直接联系电话" prop="contratPhone">
              <Input  placeholder="直接联系电话" v-model="model.contratPhone"></Input>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="单位地址" prop="address">
              <MapAddressSelect  v-model="model.address"></MapAddressSelect>
            </FormItem>
          </Col>
          <Col :span="24" style="margin-top:30px;margin-left:30px" class="text-center">
            <Button :loading="loading" @click="submit" type="primary" >提交</Button>
          </Col>
        </Row>
      </Form>
    </Card>
  </div>
</template>
<script>
import { FormItem, Form, Input, Checkbox, Card } from "iview";
import Unit from "@/pages/model/Unit";
import CommonSelect from "@/components/CommonSelect";
import {
  CreateUnitAsync,
  GetUnitById,
  UpdateUnitAsync
} from "@/api/partyOrganizationService";
import MapAddressSelect from "@/components/MapAddressSelect";
export default {
  components: {
    Card,
    FormItem,
    Form,
    Input,
    MapAddressSelect,
    Checkbox,
    CommonSelect
  },
  data() {
    return {
      model: new Unit(),
      rules: Unit.getRules(),
      loading: false,
      loadState: false
    };
  },
  watch: {
    "model.legalEntityFlag": {
      immediate: true,
      handler(n) {
        if(n){
          this.model.socialCrediitCode = this.model.socialCrediitCode1
        } else {
          this.model.socialCrediitCode1 = this.model.socialCrediitCode  
        }
      }
    }
  },
  methods: {
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.$route.query.id) {
            UpdateUnitAsync(Unit.getModels(this.model))
              .then(res => {
                this.$Message.success("修改成功");
                this.$router.go(-1);
              })
              .finally(() => {
                this.loading = false;
              });
          } else {
            CreateUnitAsync(Unit.getModels(this.model))
              .then(res => {
                this.$Message.success("创建成功");
                this.$router.go(-1);
              })
              .finally(() => {
                this.loading = false;
              });
          }
        }
      });
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.loadState = true;
      GetUnitById({
        id: this.$route.query.id
      })
        .then(res => {
          this.model = new Unit(res);
          this.model.socialCrediitCode1 = this.model.socialCrediitCode;
        })
        .finally(() => {
          this.loadState = false;
        });
    }
  }
};
</script>
<style lang='less'>
.organization {
  .no-require.ivu-form-item-required .ivu-form-item-label:before {
    content: "";
  }
}
</style>
