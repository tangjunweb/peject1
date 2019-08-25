<template>
  <div style="margin-top:10px">
    <div class="form-info-box-inline">
      <span
        v-if="data.addition && data.addition.nation"
        class="form-info-value"
      >{{data.addition.nation | CodeTable('Nation')}}</span>
      <em v-if="data.addition && data.addition.nation">|</em>
      <span
        v-if="data.addition&&data.addition.birthday"
        class="form-info-value"
      >{{data.addition.birthday | DateFormat('yyyy-MM-dd')}}</span>
      <em v-if="data.addition&& data.addition.birthday">|</em>
      <span
        v-if="data.addition&&data.addition.education"
        class="form-info-value"
      >{{data.addition.education | CodeTable('Education')}}</span>
      <em v-if="data.addition&&data.addition.education">|</em>
      <span
        v-if="data.addition&&data.addition.nativePlace"
        class="form-info-value"
      >{{data.addition.nativePlace}}</span>
      <em v-if="data.addition&&data.addition.nativePlace">|</em>
      <span
        class="form-info-value"
        v-if="data.addition&&data.addition.idCard && isIntranet"
      >{{data.addition.idCard}}</span>
    </div>
    <div class="form-info-box">
      <span class="form-info-label">是否台湾省籍：</span>
      <span class="form-info-value">{{data.addition&&data.addition.isTaiWanDomicile ? '是' : '否'}}</span>
    </div>
    <div class="form-info-box" v-if="data.partyMember.joinPost">
      <span class="form-info-label">工作岗位：</span>
      <span class="form-info-value">{{data.partyMember.joinPost | CodeTable('Post')}}</span>
    </div>
    <div class="form-info-box" v-if="data.partyMember.partyMemeberAssess">
      <span class="form-info-label">考核标准：</span>
      <span class="form-info-value">{{data.partyMember.partyMemeberAssess | CodeTable('PartyMemberAssessment')}}</span>
    </div>
    <div class="form-info-box" v-if="data.partyMember.joinSocialClassType">
      <span class="form-info-label">新的社会阶层：</span>
      <span
        class="form-info-value"
      >{{data.partyMember.joinSocialClassType | CodeTable('CurrentSocialClass')}}</span>
    </div>
    <div class="form-info-box" v-if="data.addition.oneLineSituation">
      <span class="form-info-label">一线情况：</span>
      <span
        class="form-info-value"
      >{{data.addition.oneLineSituation | CodeTable('OneLineSituation')}}</span>
    </div>
    <div class="form-info-box">
      <span class="form-info-label">手机号码：</span>
      <span class="form-info-value">{{data.addition.mobilePhone || '未设置'}}</span>
    </div>
    <div class="form-info-box">
      <span class="form-info-label">联系电话：</span>
      <span class="form-info-value">{{data.addition.otherContack || '未设置'}}</span>
    </div>
    <div class="form-info-box">
      <span class="form-info-label">现居住地：</span>
      <span class="form-info-value">{{data.addition.livePlace || '未设置'}}</span>
    </div>
    <div class="form-info-box">
      <span class="form-info-label">是否为流动党员：</span>
      <span class="form-info-value">{{data.partyMember.isFlowMember ? '是' : '否'}}</span>
    </div>
    <div class="form-info-box">
      <span class="form-info-label">是否为失联党员：</span>
      <span class="form-info-value">{{data.partyMember.isLostMember ? '是' : '否'}}</span>
    </div>
    <div class="form-info-box" v-if="data.partyMember.joinPartyDate">
      <span class="form-info-label">入党日期：</span>
      <span class="form-info-value">{{data.partyMember.joinPartyDate | DateFormat('yyyy-MM-dd')}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    partyMember: {
      type: Object,
      default: {
        addition: {},
        nation: {}
      }
    }
  },
  computed: {
    data() {
      return this.partyMember;
    },

    isIntranet() {
      return this.$store.state.session.isIntranet;
    }
  }
};
</script>
