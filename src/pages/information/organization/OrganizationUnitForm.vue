<template>
  <Form ref="form" :model="model" :rules="rules">
    <Spin fix v-show="loading"></Spin>
    <Alert>所在单位信息</Alert>
    <Row :gutter="30">
      <Col :span="16">
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
      <Col :span="24">
        <FormItem label="建立党组织情况" prop="establishmentOfOrg">
          <Input
            type="textarea"
            :rows="5"
            
            placeholder="建立党组织情况"
            v-model="model.establishmentOfOrg"
          ></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="法人单位统一社会信用代码" prop="socialCrediitCode">
          <Input  placeholder="法人单位统一社会信用代码" v-model="model.socialCrediitCode"></Input>
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
        <FormItem label="联系人电话" prop="contratPhone">
          <Input  placeholder="联系人电话" v-model="model.contratPhone"></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="单位地址" prop="address">
          <MapAddressSelect  v-model="model.address"></MapAddressSelect>
        </FormItem>
      </Col>
      <Col :span="24" style="margin-top:30px;margin-left:30px" class="text-left">
        <Button :loading="btnLoading" @click="submit" type="primary" >提交</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>
import {
  GetUnitByOrganId,
  UpdateUnitAsync
} from "@/api/partyOrganizationService";
import { Form, FormItem, Input } from "iview";
import MapAddressSelect from "@/components/MapAddressSelect";
import Unit from "@/pages/model/Unit";
import CommonSelect from "@/components/CommonSelect";
export default {
  components: {
    Form,
    FormItem,
    Input,
    MapAddressSelect,
    CommonSelect
  },
  props: {
    organization: {
      type: Object
    }
  },
  data() {
    return {
      loading: false,
      btnLoading: false,
      model: new Unit(),
      rules: Unit.getRules()
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.btnLoading = true;
          UpdateUnitAsync(Unit.getModel(this.model))
            .then(res => {
              this.$Message.success("单位信息保存成功");
            })
            .finally(() => {
              this.btnLoading = false;
            });
        }
      });
    }
  },
  mounted() {
    this.loading = true;
    GetUnitByOrganId({ id: this.organization.id })
      .then(res => {
        this.model = new Unit(res);
      })
      .finally(() => {
        this.loading = false;
      });
  }
};
</script>
