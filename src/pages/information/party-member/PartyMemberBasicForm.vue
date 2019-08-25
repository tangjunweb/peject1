<template>
  <Form ref="form" :rules="rules" :model="model">
    <Row :gutter="50">
      <Col :span="12">
        <FormItem label="姓名" prop="name">
          <Input placeholder="请输入党员姓名" v-model="model.name"></Input>
        </FormItem>
        <FormItem label="性别" prop="addition.sex">
          <common-select :transfer="false" keys="Sex" v-model="model.addition.sex"></common-select>
        </FormItem>
        <FormItem label="民族" prop="addition.nation">
          <common-select :transfer="false" keys="Nation" v-model="model.addition.nation"></common-select>
        </FormItem>
        <FormItem label="公民身份号码" prop="addition.idCard">
          <Input placeholder="请输入公民身份号码" v-model="model.addition.idCard"></Input>
        </FormItem>
        <FormItem label="出生日期" prop="addition.birthday">
          <DatePicker
            transfer
            placeholder="选择日期"
            style="width:100%"
            readonly
            v-model="model.addition.birthday"
          ></DatePicker>
        </FormItem>
        <FormItem label="学历" prop="addition.education">
          <common-select keys="Education" :format="formatSelect" v-model="model.addition.education"></common-select>
        </FormItem>
        <FormItem label="籍贯" prop="addition.nativePlace">
          <Input placeholder="请输入籍贯" v-model="model.addition.nativePlace"></Input>
        </FormItem>
        <FormItem label="一线情况" prop="addition.oneLineSituation">
          <common-select keys="OneLineSituation" v-model="model.addition.oneLineSituation"></common-select>
        </FormItem>
        <FormItem label="是否流动党员">
          <Checkbox v-model="model.partyMember.isFlowMember" style="width:100%"></Checkbox>
        </FormItem>
        <FormItem label="所在党支部">
          <Input v-model="model.organName" readonly></Input>
        </FormItem>
        <FormItem label="入党日期" prop="partyMember.joinPartyDate">
          <DatePicker
            transfer
            placeholder="选择日期"
            style="width:100%"
            v-model="model.partyMember.joinPartyDate"
          ></DatePicker>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="照片" prop="headImage">
          <div style="width:208px">
            <UploadImg
              @change="$refs['form'].validateField('headImage')"
              v-model="model.headImage"
              width="100%"
              :height="208"
              AttachClass="3"
            ></UploadImg>
          </div>
        </FormItem>
        <FormItem label="手机号码" prop="addition.mobilePhone">
          <Input number placeholder="请输入手机号码" v-model="model.addition.mobilePhone"></Input>
        </FormItem>
        <FormItem label="联系电话" prop="addition.otherContack">
          <Input number placeholder="请输入联系电话" v-model="model.addition.otherContack"></Input>
        </FormItem>
        <FormItem label="现居住地" prop="addition.livePlace">
          <Input placeholder="请输入现居住地" v-model="model.addition.livePlace"></Input>
        </FormItem>
        <FormItem label="党员类别" prop="partyMember.partyMemeberType">
          <common-select keys="PartyMemeberType" v-model="model.partyMember.partyMemeberType"></common-select>
        </FormItem>
        <FormItem label="考核标准">
          <common-select
            keys="PartyMemeberType"
            placeholder="请选择党员类别"
            disabled
            v-model="model.partyMember.partyMemeberType"
          ></common-select>
        </FormItem>
        <FormItem label="工作岗位" prop="partyMember.joinPost">
          <common-select keys="Post" :format="formatSelect" v-model="model.partyMember.joinPost"></common-select>
        </FormItem>
        <FormItem label="新的社会阶层" prop="partyMember.joinSocialClassType">
          <common-select keys="CurrentSocialClass" v-model="model.partyMember.joinSocialClassType"></common-select>
        </FormItem>
        <FormItem label="转正日期" prop="partyMember.formalMemberDate">
          <DatePicker
            transfer
            placeholder="选择日期"
            style="width:100%"
            v-model="model.partyMember.formalMemberDate"
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
import { Form, FormItem, Input, DatePicker, Checkbox } from "iview";
import CommonSelect from "@/components/CommonSelect";
import PartyMember from "@/pages/model/PartyMember";
import UploadImg from "@/components/UploadImg";
import { ValidateIDCardBirthday } from "@/utils/validate";
import { UpdatePartyMemberInfo } from "@/api/partyMember";
export default {
  components: {
    Form,
    FormItem,
    Input,
    DatePicker,
    UploadImg,
    CommonSelect,
    Checkbox
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
    },
    "model.addition.idCard": {
      immediate: true,
      handler(n) {
        if (n) {
          this.$nextTick(() => {
            this.getBirthdayByIdCard(n);
          });
        }
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
  methods: {
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          this.model.partyMember.isFlowMember = !!this.model.partyMember
            .isFlowMember;
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
    getBirthdayByIdCard(n) {
      this.$refs["form"].validateField("addition.idCard", valid => {
        if (!valid) {
          let obj = ValidateIDCardBirthday(n);
          this.model.addition.birthday = `${obj.year}-${obj.month}-${obj.day}`;
        }
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
    console.log(this.model);
  }
};
</script>

