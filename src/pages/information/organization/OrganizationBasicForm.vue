<template>
  <div>
    <Form ref="form" :model="model" :rules="rules">
      <Row :gutter="30" type="flex">
        <Col :span="8">
          <FormItem label="上级党组织" prop="parentId">
            <organization-cascader :label="model.parentOrgnization" v-model="model.parentId"></organization-cascader>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="党组织名称" prop="organName">
            <Input placeholder="党组织名称" v-model="model.organName"></Input>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="党组织类别" prop="organType">
            <common-select v-model="model.organType" keys="OrganType" placeholder="选择组织类别"></common-select>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="领域分类" prop="domainType">
            <common-select v-model="model.domainType" keys="DomainClassify" placeholder="选择领域分类"></common-select>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="党组织地址" prop="organAddress">
            <MapAddressSelect v-model="model.organAddress"></MapAddressSelect>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="党组织联系人" prop="contactor">
            <Input placeholder="党组织联系人" v-model="model.contactor"></Input>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="党组织联系电话" prop="contactMobilePhone">
            <Input placeholder="党组织联系电话" number v-model="model.contactMobilePhone"></Input>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="固定电话" prop="contactPhone">
            <Input placeholder="固定电话" v-model="model.contactPhone"></Input>
          </FormItem>
        </Col>
        <Col
          :span="12"
          v-if="model.organType == 'OrganType-631' || model.organType == 'OrganType-632' || model.organType == 'OrganType-931' ||model.organType == 'OrganType-932'"
        >
          <FormItem label="是否成立党小组" prop="isOrganGroup">
            <Checkbox v-model="model.isOrganGroup"></Checkbox>
          </FormItem>
        </Col>

        <Col
          :span="12"
          v-if="model.organType == 'OrganType-631' || model.organType == 'OrganType-632' || model.organType == 'OrganType-931' ||model.organType == 'OrganType-932'"
        >
          <FormItem label="是否成立支委会" prop="isBranch">
            <Checkbox v-model="model.isBranch"></Checkbox>
          </FormItem>
        </Col>
        <Col :span="24">
          <FormItem label="党组织所在单位情况" prop="unitSituation">
            <common-select
              v-model="model.unitSituation"
              keys="UnitSituation"
              placeholder="选择党组织所在单位情况"
            ></common-select>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="选择单位" prop="unitId">
            <Input :value="unitName||organization.unitName" placeholder="请选择单位" readonly>
              <UnitSelectModal slot="append" @change="unitSelect">
                <Button type="primary">选择单位</Button>
              </UnitSelectModal>
            </Input>
          </FormItem>
        </Col>
        <Col :span="24" style="margin-top:30px;" class="text-center">
          <Button :loading="loading" @click="submit" type="primary">提交</Button>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
import {
  Form,
  FormItem,
  Input,
  Select,
  Option,
  RadioGroup,
  Radio,
  Checkbox
} from "iview";
import Organization from "@/pages/model/Organization";
import OrganizationCascader from "@/components/OrganizationCascader";
import MapAddressSelect from "@/components/MapAddressSelect";
import CommonSelect from "@/components/CommonSelect";
import {
  CreateUnitAsync,
  CreatePartyOrgnizationAsync,
  UpdatePartyOrgnizationAsync
} from "@/api/partyOrganizationService";
import UnitSelectModal from "@/pages/common/UnitSelectModal";
import merge from "webpack-merge";
export default {
  components: {
    OrganizationCascader,
    Checkbox,
    Form,
    FormItem,
    Input,
    UnitSelectModal,
    Select,
    Option,
    RadioGroup,
    Radio,
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
      model: new Organization(),
      rules: Organization.getRules(),
      unitName: ""
    };
  },
  computed: {
    organName() {
      return this.$store.state.session.organName;
    }
  },
  watch: {
    organization: {
      deep: true,
      immediate: true,
      handler(n) {
        this.model = new Organization(n);
        if (!this.model.parentId) {
          this.model.parentId = this.$store.state.session.organId;
        }
      }
    },
    "model.organType"(n) {
      console.log(n);
    }
  },
  methods: {
    submit() {
      let fn = this.model.id
        ? UpdatePartyOrgnizationAsync
        : CreatePartyOrgnizationAsync;
      let title = this.model.id
        ? "党组织更新成功！"
        : "党组织创建成功！请完善信息!";
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          fn(Organization.getModel(this.model))
            .then(res => {
              // 修改原有参数
              if (!this.model.id) {
                this.$router.push({
                  query: merge(this.$route.query, { id: res })
                });
              }
              this.$emit("changeTab", "2");
              this.$emit("change");
              this.$Message.success(title);
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    unitSelect(unit) {
      this.unitName = unit.unitName;
      this.model.unitId = unit.id;
    }
  }
};
</script>
