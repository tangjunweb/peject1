<template>
    <div class='orginalmanage'>
        <Row :gutter="15" style="margin-bottom:20px;" type="flex">
            <Col style="width:100%">
            <top-card class='orginalmanage-topcard'>
                <ul class='formLine' style="padding:0 60px">
                    <li>
                        <div class='orginalmanage-title'>机关党组织名称：</div>
                        <div class='orginalmanage-body'>
                            机关党组织名称</div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>联点村（社区）党组织名称：</div>
                        <div class='orginalmanage-body'>城北区支委 </div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>类型：</div>
                        <div class='orginalmanage-body'>党建/服务/其他 资源/需求</div>
                    </li>
                    <li>
                        <div class='orginalmanage-title'>任务内容：</div>
                        <div class='orginalmanage-body'>这里显示由资源或需求转化而来的任务内容</div>
                    </li>

                </ul>
            </top-card>
            </Col>
        </Row>
        <Card class="upload-list" :bordered="false">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position='left' :label-width="290">
                <FormItem label="区委审核意见：" prop="text">
                    <Input v-model="formValidate.text" type="textarea" placeholder="请填写审核意见" />
                </FormItem>
            </Form>

        </Card>
        <div class="card-footer">
            <Button class="confirm" style="margin-right:20px" type="primary">下发任务</Button>
        </div>
    </div>
</template>
<script>
import { Tabs, TabPane, Card, Form, FormItem } from 'iview'
export default {
    components: {
        Tabs,
        TabPane,
        Card,

        Form, FormItem
    },
    data() {
        return {
            loading: false,
            formValidate: {
                content: '',
                text: ''
            },
            ruleValidate: {
                content: [
                    { required: true, message: '请填写审核意见', trigger: 'blur' }
                ],
                text: [
                    { required: true, message: '请填写审核意见', trigger: 'blur' }
                ]
            }
        }
    }
}
</script>
<style lang="less" scoped>
.orginalmanage {
    .orginalmanage-title {
        width: 200px;
    }
    .tag {
        padding: 5px 10px;
        background: #BD2207;
        font-size: 14px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        position: relative;
        margin-right: 17px;
        &::after {
            content: '';
            position: absolute;
            border: 5px solid transparent;
            border-left: 5px solid #BD2207;
            right: -10px;
            top: 50%;
            margin-top: -4px;
        }
    }

    .goupload {
        width: 93px;
        height: 32px;
        background: rgba(200, 39, 33, 1);
        border-radius: 3px;
    }
    .orginalmanage-body {
        font-size: 14px; // font-weight: 500;
        color: rgba(51, 51, 51, 1);
        .file {
            padding: 16px 30px;
            background: rgba(250, 250, 252, 1);
            border: 1px solid rgba(233, 233, 240, 1);
            margin-right: 10px;

            font-size: 12px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
        }
        &.title-red {
            font-size: 16px;
            font-weight: 500;
            color: rgba(184, 35, 43, 1);
        }
    }
}
</style>