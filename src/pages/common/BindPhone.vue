<template>
  <!-- 忘记密码 -->
  <div class="layout-lr">
    <div class="layout-lr-l">
      <!-- <LCard> -->
      <!-- <Row slot="header">
                    <Col :span="12">
                        <Icon style="transform:translateY(-1px);margin-right:5px" type="ios-alert-outline" :size="16" color="#84D7FF" />绑定手机号
                    </Col>
                    <Col :span="12" class="text-right">
                        <Button type="primary" size="small" ghost @click="$router.go(-1)">返回</Button>
                    </Col>
      </Row>-->
      <div style="width:500px" class="middle">
        <Form ref="form" :label-width="100" :rules="rules" :model="model">
          <FormItem label="手机号" prop="phoneNumber">
            <Input v-model="model.phoneNumber" size="large" placeholder="请输入手机号"></Input>
          </FormItem>
          <FormItem label="验证码" prop="code">
            <Input placeholder="请输入短信验证码" v-model="model.code" size="large">
              <!-- <Button :loading="loading2" @click="send" type="success" ghost slot="append">发送验证码</Button> -->
              <VertifyCodeSend @change="getCodeId" v-model="model.phoneNumber" slot="append" />
            </Input>
          </FormItem>
          <FormItem>
            <Button :loading="loading" @click="save" long type="primary" size="large">确定</Button>
          </FormItem>
        </Form>
      </div>
      <!-- </LCard> -->
    </div>
  </div>
</template>
<script>
// import LCard from '@/components/ui/LCard'
import { PhoneNumberConfirmed, SendPhoneVierifCode } from "@/api";
import { Form, FormItem, Input } from "iview";
import VertifyCodeSend from "@/pages/common/VertifyCodeSend";
import { ValidateTel } from "@/utils/validate";
export default {
  components: {
    // LCard,
    VertifyCodeSend,
    Form,
    FormItem,
    Input
  },
  data() {
    return {
      loading: false,
      loading2: false,
      model: {
        codeId: "",
        code: "",
        phoneNumber: ""
      },
      rules: {
        code: [
          {
            required: true,
            message: "请输入短信验证码",
            trigger: "blur"
          }
        ],
        phoneNumber: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          },
          {
            validator: ValidateTel
          }
        ]
      }
    };
  },
  methods: {
    getCodeId(id) {
      this.model.codeId = id;
    },
    send() {
      if (this.model.phoneNumber) {
        this.loading2 = true;
        SendPhoneVierifCode({
          phoneNumber: this.model.phoneNumber
        })
          .then(res => {
            this.model.codeId = res;
            this.$Message.success("验证码发送成功");
          })
          .finally(() => {
            this.loading2 = false;
          });
      } else {
        this.$Message.warning("请输入手机号");
      }
    },
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          let d = JSON.parse(JSON.stringify(this.model));
          PhoneNumberConfirmed(d)
            .then(res => {
              this.$Message.success("手机号绑定成功");
              this.$router.go(-1);
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/style/mixin.less";
.layout-lr {
  .flex(@direction:column);
  height: 100%;
  // &.bindphone{
  //     padding: 30px;
  // }
}
</style>
