<template>
    <div style="margin-top:10px">
        <div class="form-info-box" v-if="data.partyMember.joinPartyType">
            <span class="form-info-label">人员类别：</span>
            <span class="form-info-value">{{data.partyMember.joinPartyType | CodeTable('JoinPartyType')}}</span>
        </div>   
        <div class="form-info-box">
            <span class="form-info-label">预备党员转正情况：</span>
            <span class="form-info-value">{{data.partyMember.partyMemeberType | CodeTable('PartyMemeberType')}}</span>
        </div>       
        <div class="form-info-box" v-if="data.partyMember.joinEducation">
            <span class="form-info-label">入党时学历：</span>
            <span class="form-info-value">{{data.partyMember.joinEducation | CodeTable('Education')}}</span>
        </div>       
        <div class="form-info-box" v-if="data.partyMember.joinPost">
            <span class="form-info-label">入党时工作岗位：</span>
            <span class="form-info-value">{{data.partyMember.joinPost | CodeTable('Post')}}</span>
        </div>       
        <div class="form-info-box" v-if="data.partyMember.joinOrgName">
            <span class="form-info-label">入党时所在支部：</span>
            <span class="form-info-value">{{data.partyMember.joinOrgName}}</span>
        </div>       
        <div class="form-info-box" v-if="data.partyMember.applicationDate">
            <span class="form-info-label">申请入党日期：</span>
            <span class="form-info-value">{{data.partyMember.applicationDate | DateFormat('yyyy-MM-dd')}}</span>
        </div>       
        <div class="form-info-box" v-if="data.partyMember.activeDate"> 
            <span class="form-info-label">确定为入党积极分子日期：</span>
            <span class="form-info-value">{{data.partyMember.activeDate | DateFormat('yyyy-MM-dd')}}</span>
        </div>       
        <div class="form-info-box" v-if="data.partyMember.developMentDate">
            <span class="form-info-label">列为发展对象日期：</span>
            <span class="form-info-value">{{data.partyMember.developMentDate | DateFormat('yyyy-MM-dd')}}</span>
        </div>       
        <div class="form-info-box" v-if="data.presentDuty">
            <span class="form-info-label">入党介绍人：</span>
            <span class="form-info-value">{{data.presentDuty | CodeTable('PartyDutyCode')}}</span>
        </div>                                                                        
    </div>
</template>
<script>
export default {
    props: {
        partyMember: {
            type: Object
        }
    },   
    computed: {
        data () {
            return this.partyMember;
        }
    }
}
</script>

