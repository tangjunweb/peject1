<template>
    <Row :gutter="15">
        <Col :span="16" class="zzgk-head">
            <span class="zzgk-head-item">
                <span class="common-label">当前状态:</span>
                <span class="common-value">{{unit.unitVerify | CodeTable('CommAuditStatus')}}</span>                
            </span>
            <span class="zzgk-head-item">
                <span class="common-label">创建时间:</span>
                <span class="common-value">无</span>                
            </span>            
            <span class="zzgk-head-item">
                <span class="common-label">更新时间:</span>
                <span class="common-value">无</span>                
            </span>            
        </Col>
        <Col :span="24" style="margin-top:15px">
            <Row :gutter="30">
                <Col :span="24">
                    <Alert show-icon type="info">单位信息</Alert>
                </Col>
                <Col :span="8" class="common-col">
                    <span class="common-label">单位名称:</span>
                    <span class="common-value">{{unit.unitName}}</span>                    
                </Col>     
                <Col :span="8" class="common-col">
                    <span class="common-label">法人单位统一社会信用代码:</span>
                    <span class="common-value">{{unit.socialCrediitCode}}</span>                    
                </Col>     
                <Col :span="8" class="common-col">
                    <span class="common-label">单位地址:</span>
                    <span class="common-value">{{unit.address}}</span>                    
                </Col>     
                <Col :span="8" class="common-col">
                    <span class="common-label">单位性质类别:</span>
                    <span class="common-value">{{unit.unitNatrueType | CodeTable('UnitNatrueType')}}</span>                    
                </Col>     
                <Col :span="8" class="common-col">
                    <span class="common-label">单位建立党组织情况:</span>
                    <span class="common-value">{{unit.establishmentOfOrg}}</span>                    
                </Col>     
                <Col :span="8" class="common-col">
                    <span class="common-label">单位负责人:</span>
                    <span class="common-value">{{unit.principal}}</span>                    
                </Col>     
                <Col :span="8" class="common-col">
                    <span class="common-label">单位负责人公民身份号码:</span>
                    <span class="common-value">{{unit.principalIdCard}}</span>                    
                </Col>     
                <Col :span="8" class="common-col">
                    <span class="common-label">单位联系电话:</span>
                    <span class="common-value">{{unit.contratPhone}}</span>                    
                </Col>                                                                                                                                                                                                                                                 
            </Row>
        </Col>    
        <Col :span="24" style="margin-top:15px">
            <Row :gutter="30">
                <Col :span="24">
                    <Alert show-icon type="info">党组织信息</Alert>
                </Col>
                <Col :span="12" class="common-col">
                    <span class="common-label">上级党组织名称:</span>
                    <span class="common-value">{{orgnization.organName}}</span>                    
                </Col>
                <Col :span="12" class="common-col">
                    <span class="common-label">组织类别:</span>
                    <span class="common-value">{{orgnization.organType | CodeTable('OrganType')}}</span>                    
                </Col>
                <Col :span="12" class="common-col">
                    <span class="common-label">党组织所在单位情况:</span>
                    <span class="common-value">{{orgnization.unitSituation | CodeTable('UnitSituation')}}</span>                    
                </Col>
                <Col :span="12" class="common-col">
                    <span class="common-label">党组织联系人:</span>
                    <span class="common-value">{{orgnization.contactor}}</span>                    
                </Col>
                <Col :span="12" class="common-col">
                    <span class="common-label">党组织联系电话:</span>
                    <span class="common-value">{{orgnization.contactMobilePhone||orgnization.contactPhone}}</span>                    
                </Col>                                                                                
            </Row>
        </Col>            
    </Row>
</template>
<script>
export default {
    props: {
        unit: Object
    },
    computed: {
        orgnization () {
            return this.unit&&this.unit.orgnization ? this.unit.orgnization : {};
        }
    }
}
</script>
<style lang="less" scoped>
.common-label{
}
.common-value{
    margin-left: 5px;
}
.zzgk-head-item + .zzgk-head-item{
    margin-left: 30px;
}
.common-col{
    margin-top: 15px;
}
</style>

