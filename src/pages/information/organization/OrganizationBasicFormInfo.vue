<template>
  <div class="org-basic-info">
    <Row :gutter="15">
      <Col :span="24">
        <Row style="border-bottom: 1px solid #e5dfdf">
          <Col :span="16" class="zzgk-head">
            <span class="zzgk-head-item">
              <span class="common-label">当前状态：</span>
              <span class="common-value">{{organization.auditStatus | CodeTable('CommAuditStatus')}}</span>
            </span>
            <span class="zzgk-head-item">
              <span class="common-label">创建时间：</span>
              <span class="common-value">无</span>
            </span>
            <span class="zzgk-head-item">
              <span class="common-label">更新时间：</span>
              <span class="common-value">无</span>
            </span>
          </Col>
        </Row>
      </Col>
      <Col :span="12" style="margin-top:15px">
        <div slot="header" class="zzgk-tit">党组织信息</div>
        <Row :gutter="30" class="zzgk-row">
          <Col :span="24" class="common-col">
            <span class="common-label">上级党组织名称：</span>
            <span
              class="common-value"
            >{{organization.parentOrgnization ? organization.parentOrgnization.organName : ''}}</span>
          </Col>
          <Col :span="24" class="common-col">
            <span class="common-label">组织类别：</span>
            <span class="common-value">{{organization.organType | CodeTable('OrganType')}}</span>
          </Col>
          <Col :span="24" class="common-col">
            <span class="common-label">党组织书记：</span>
            <span
              class="common-value"
            >{{organization.secretary ? organization.secretary.userName : ''}}</span>
          </Col>
          <Col :span="24" class="common-col">
            <span class="common-label">党组织所在单位情况：</span>
            <span class="common-value">{{organization.unitSituation | CodeTable('UnitSituation')}}</span>
          </Col>
          <Col :span="24" class="common-col">
            <span class="common-label">党组织联系人：</span>
            <span class="common-value">{{organization.contactor}}</span>
          </Col>
          <Col :span="24" class="common-col">
            <span class="common-label">党组织联系电话：</span>
            <span
              class="common-value"
            >{{organization.contactMobilePhone||organization.contactPhone}}</span>
          </Col>
        </Row>
      </Col>
      <Col :span="12" style="margin-top:15px" v-if="organization.unit">
        <div slot="header" class="zzgk-tit">单位信息</div>
        <Row :gutter="30" class="zzgk-row">
          <Col :span="24" class="common-col">
            <span class="common-label">单位名称：</span>
            <span class="common-value">{{organization.unit.unitName}}</span>
          </Col>
          <Col :span="24" class="common-col">
            <span class="common-label">法人单位统一社会信用代码：</span>
            <span class="common-value">{{organization.unit.socialCrediitCode}}</span>
          </Col>
          <Col :span="24" class="common-col">
            <span class="common-label">单位地址：</span>
            <span class="common-value">{{organization.unit.address}}</span>
          </Col>
          <Col :span="24" class="common-col">
            <span class="common-label">单位性质类别：</span>
            <span
              class="common-value"
            >{{organization.unit.unitNatrueType | CodeTable('UnitNatrueType')}}</span>
          </Col>
          <Col :span="24" class="common-col">
            <span class="common-label">单位建立党组织情况：</span>
            <span class="common-value">{{organization.unit.establishmentOfOrg}}</span>
          </Col>
          <Col :span="24" class="common-col">
            <span class="common-label">单位负责人：</span>
            <span class="common-value">{{organization.unit.principal}}</span>
          </Col>
          <Col :span="24" class="common-col">
            <span class="common-label">单位负责人公民身份号码：</span>
            <span class="common-value">{{organization.unit.principalIdCard}}</span>
          </Col>
          <Col :span="24" class="common-col">
            <span class="common-label">单位联系电话：</span>
            <span class="common-value">{{organization.unit.contratPhone}}</span>
          </Col>
        </Row>
      </Col>
    </Row>
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
  Radio
} from "iview";
import Organization from "@/pages/model/Organization";
import OrganizationCascader from "@/components/OrganizationCascader";
import MapAddressSelect from "@/components/MapAddressSelect";
import {
  CreateUnitAsync,
  CreatePartyOrgnizationAsync,
  UpdatePartyOrgnizationAsync
} from "@/api/partyOrganizationService";
import UnitSelectModal from "@/pages/common/UnitSelectModal";
export default {
  components: {
    OrganizationCascader,
    Form,
    FormItem,
    Input,
    UnitSelectModal,
    Select,
    Option,
    RadioGroup,
    Radio,
    MapAddressSelect
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
  },
  mounted() {
    this.model = new Organization(this.organization);
    if (!this.model.parentId) {
      this.model.parentId = this.$store.state.session.organId;
    }
  }
};
</script>
<style lang="less">
.org-basic-info {
  .zzgk-head{
    padding-bottom: 15px;
    .zzgk-head-item{
      margin-right: 15px;
    }
  }
  .common-col {
    font-size: 14px;
    margin-bottom: 18px;
    .common-label {
      color: #b5a1a3;
      margin-right: 18px;
    }
    .common-value {
      color: #573e41;
    }
  }
}
</style>
