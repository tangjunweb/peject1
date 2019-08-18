<template>
  <div class="main-wrap">
    <div class="retrievepassword middle">
      <LCard>
        <Row slot="header">
          <Col :span="12">
            <Icon
              style="transform:translateY(-1px);margin-right:5px"
              type="ios-alert-outline"
              :size="16"
            />找回密码
          </Col>
          <Col :span="12" class="text-right">
            <Button @click="$router.go(-1)" type="primary" ghost>返回</Button>
          </Col>
        </Row>
        <div style="width:500px;" class="middle">
          <Form ref="form" :rules="rules" :model="model" :label-width="100">
            <FormItem label="手机号" prop="phoneNumber">
              <Input v-model="model.phoneNumber" placeholder="请输入手机号" size="large"></Input>
            </FormItem>
            <FormItem label="短信验证码" prop="code">
              <Input placeholder="请输入短信验证码" v-model="model.code" size="large">
                <!-- <Button :loading="loading2" @click="send" type="success" ghost slot="append">发送验证码</Button> -->
                <VertifyCodeSend @change="getCodeId" v-model="model.phoneNumber" slot="append" />
              </Input>
            </FormItem>
            <FormItem label="新密码" prop="newPassword">
              <Input type="password" v-model="model.newPassword" placeholder="请输入新密码" size="large"></Input>
              <p class="text-muted">密码包括数字、字母、下划线,必须包括数字字母</p>
            </FormItem>
            <FormItem label="确认密码" prop="newPasswordConfirm">
              <Input
                type="password"
                v-model="model.newPasswordConfirm"
                placeholder="请再次输入新密码"
                size="large"
              ></Input>
            </FormItem>
            <FormItem>
              <Button long :loading="loading" @click="save" type="primary" size="large">确定</Button>
            </FormItem>
          </Form>
        </div>
      </LCard>
    </div>
  </div>
</template>
<script>
import md5 from "md5";
import { Form, FormItem, Input } from "iview";
import LCard from "@/components/ui/LCard";
import VertifyCodeSend from "@/pages/common/VertifyCodeSend";
import { ValidateTel } from "@/utils/validate";
import { FindPassword, SendPhoneVierifCode } from "@/api";
export default {
  data() {
    let validateTels = (rule, value, callback) => {
      if (this.model.phoneNumber) {
        callback();
      } else {
        callback(new Error("请输入手机号"));
      }
    };
    let validatePass = (rule, value, callback) => {
      if (this.model.newPassword === this.model.newPasswordConfirm) {
        callback();
      } else {
        callback(new Error("两次密码不一致"));
      }
    };
    return {
      model: {
        newPassword: "",
        phoneNumber: "",
        codeId: "",
        code: "",
        newPasswordConfirm: ""
      },
      loading: false,
      loading2: false,
      rules: {
        newPassword: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur"
          },
          {
            validator(rule, value, callback) {
              let str = String(value);
              if (str.length < 6 || str.length > 16) {
                callback(new Error("请输入6~16位密码"));
              } else if (!/^(?![^a-zA-Z]+$)(?!\D+$)/.test(str)) {
                callback(new Error("请设置包含数字、字母的密码"));
              } else {
                callback();
              }
            }
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
        ],
        code: [
          {
            required: true,
            message: "请输入短信验证码",
            trigger: "blur"
          }
        ],
        newPasswordConfirm: [
          {
            required: true,
            message: "请再次输入密码",
            trigger: "blur"
          },
          {
            validator: validatePass
          }
        ]
      }
    };
  },
  methods: {
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
    getCodeId(id) {
      this.model.codeId = id;
    },
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          let d = JSON.parse(JSON.stringify(this.model));
          delete d.newPasswordConfirm;
          for (let key in d) {
            d[key] = String(d[key]).replace(/\s+/g, "");
          }
          d.newPassword = md5(d.newPassword);
          FindPassword(d)
            .then(res => {
              this.$Message.success("密码修改成功");
              this.$router.push("login");
            })
            .catch(e => {
              this.$Modal.error({
                title: "系统提示",
                content: e.details
              });
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    }
  },
  components: {
    Form,
    FormItem,
    Input,
    LCard,
    VertifyCodeSend
  }
};
</script>
<style lang="less" scoped>
.retrievepassword {
  width: 1000px;
  height: 600px;
  margin: 0 auto;
  // .code{
  //     .ivu-input-group-append{
  //         padding: 0;
  //     }
  // }
  .middle {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
}
</style>
