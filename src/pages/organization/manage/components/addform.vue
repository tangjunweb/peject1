<template>
    <Modal title="新增" v-model="modal">
        <Form :model="formLeft" label-position="left" :label-width="100">
            <FormItem label="姓名">
                <Input v-model="formLeft.input1"></Input>
            </FormItem>
            <FormItem label="年龄">
                <Input v-model="formLeft.input2"></Input>
            </FormItem>
            <FormItem label="性别">
                <Input v-model="formLeft.input3"></Input>
            </FormItem>
            <FormItem label="身份证号">
                <Input v-model="formLeft.input3"></Input>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="primary" @click="sure">确认</Button>
            <Button type="text" @click="cancel" ghost>取消</Button>
        </div>
    </Modal>
</template>
<script>
import { Modal } from 'iview'
export default {
    components: {
        Modal
    },
    data() {
        return {
            showDialog: false,
            loading: false,
            modal:false
        }
    },
    mounted() {
        // 获取用户接口
    },
    methods: {


    },

}
</script>
<style lang="less">
.floatRight {
    float: right;
}

.original-dialog {
    height: 100%;
    display: flex;
    flex-direction: column;
    .flexfull {
        flex: 1;
        display: flex;
        justify-content: space-between;
        .dialog-left {
            width: 202px;
            height: 100%;
            background: rgba(250, 250, 250, 1);
            border: 1px solid rgba(223, 223, 230, 1);
            border-radius: 0px 0px 3px 3px;
            margin-right: 76px;
            .body-head {
                padding: 0 25px;
                line-height: 56px;
                height: 56px;
                background: rgba(247, 247, 250, 1);
                border: 1px solid rgba(223, 223, 230, 1);
                border-radius: 0px 0px 3px 3px;
            }
            .body-main {
                height: 100%;
                box-sizing: border-box;
                padding-bottom: 56px;
                .body-main-inner {
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                    ul {
                        padding: 0 25px;
                    }
                    li {
                        line-height: 40px;
                    }
                }
            }
        }
        .dialog-right {
            flex: 1;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(223, 223, 230, 1);
            border-radius: 0px 0px 3px 3px
        }
        .heightfull {
            box-sizing: border-box;
            height: 100%;
        }
    }
}
</style>