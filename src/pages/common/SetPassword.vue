<template>
  <!-- 忘记密码 -->
  <div class="layout-lr setpassword">
    <div class="layout-lr-l">
      <div style="width:500px" class="middle">
        <Form ref="form" :label-width="100" :rules="rules" :model="model">
          <FormItem label="旧密码" prop="oldPassword">
            <Input type="password" v-model="model.oldPassword" size="large" placeholder="请输入旧密码"></Input>
          </FormItem>
          <FormItem label="新密码" prop="newPassword">
            <Input type="password" v-model="model.newPassword" size="large" placeholder="请输入新密码"></Input>
            <div class="pass-strong" v-show="showPassStrong">
              <div class="pass-strong-inner">
                <div class="pass-strong-process" :class="passStrong"></div>
              </div>
              <div class="pass-strong-text">{{passStrongText}}</div>
            </div>
            <p class="text-muted">密码包括数字、字母、下划线,必须包括数字与字母</p>
          </FormItem>
          <FormItem label="确认密码" prop="newPasswordConfirm">
            <Input type="password" v-model="model.newPasswordConfirm" size="large" placeholder="请再次输入新密码"></Input>
          </FormItem>
          <FormItem>
            <Button :loading="loading" @click="save" long type="primary" size="large">确定</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import VertifyCodeSend from "@/pages/common/VertifyCodeSend";
import { UpdatePassword } from "@/api";
import md5 from "md5";
import { Form, FormItem, Input, Modal } from "iview";
export default {
  components: {
    Form,
    FormItem,
    Input,
    Modal,
    VertifyCodeSend
  },
  computed: {
    phoneNumber() {
      return this.$store.state.session.phoneNumber;
    },
    showPassStrong() {
      return String(this.model.newPassword).length > 5;
    },
    passStrongText() {
      let str = "";
      switch (this.passStrong) {
        case "ruo":
          str = "弱";
          break;
        case "zhong":
          str = "中";
          break;
        case "qiang":
          str = "强";
          break;
      }
      return str;
    },
    passStrong() {
      let s = "ruo";
      if (String(this.model.newPassword).length > 5) {
        let v = this.model.newPassword;
        let result = 0;
        let level = 0;
        for (let i = 0, len = v.length; i < len; ++i) {
          result |= this.charType(v.charCodeAt(i));
        }
        for (let i = 0; i <= 4; i++) {
          if (result & 1) {
            level++;
          }
          result = result >>> 1;
        }
        switch (level) {
          case 1:
            s = "ruo";
            break;
          case 2:
            s = "zhong";
            break;
          case 3:
            break;
          case 4:
            s = "qiang";
            break;
        }
      }
      return s;
    }
  },
  data() {
    let validatePass = (rule, value, callback) => {
      if (this.model.newPassword === this.model.newPasswordConfirm) {
        callback();
      } else {
        callback(new Error("两次密码不一致"));
      }
    };
    return {
      loading: false,
      loading2: false,
      model2: {
        codeId: "",
        code: "",
        phoneNumber: ""
      },
      rules2: {
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      },
      showModal: true,
      modalLoading: false,
      model: {
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
      },
      rules: {
        oldPassword: [
          {
            required: true,
            message: "请输入旧密码",
            trigger: "blur"
          }
        ],
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
    charType(num) {
      if (num >= 48 && num <= 57) {
        return 1;
      }
      if (num >= 97 && num <= 122) {
        return 2;
      }
      if (num >= 65 && num <= 90) {
        return 4;
      }
      return 8;
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
          d.oldPassword = md5(d.oldPassword);
          d.newPassword = md5(d.newPassword);
          UpdatePassword(d)
            .then(res => {
              this.$Message.success("密码修改成功");
              this.$store.dispatch("loginOut");
              this.$router.push("/login");
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    confirm() {
      this.$refs["form2"].validate(valid => {
        if (valid) {
          this.$router.push({
            path: "retrievepassword",
            query: this.model2
          });
        }
      });
    },
    wjmm() {
      this.$Modal.confirm({
        title: "系统提示",
        content: `您的账号当前已绑定手机号，可通过短信验证码重置登录密码。即将发送验证码到${this.phoneNumber}`,
        onOk: () => {
          SendPhoneVierifCode({
            phoneNumber: this.phoneNumber
          }).then(res => {
            this.model2.codeId = res;
            this.model2.phoneNumber = this.phoneNumber;
            this.$Message.success("验证码发送成功");
            this.showModal = true;
          });
        }
      });
    }
  },
  mounted() {
    // if (!this.phoneNumber) {
    //   this.$Message.warning("请先绑定手机号");
    //   this.$router.push("bindphone");
    // }
  }
};
</script>
<style lang="less" scoped>
@import "~@/style/mixin.less";
.layout-lr {
  .flex(@direction:column);
  height: 100%;
  &.setpassword {
    // padding: 30px;
    .pass-strong {
      width: 100%;
      position: relative;
      padding: 15px 25px 15px 0;
      box-sizing: border-box;
    }
    .pass-strong-text {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0;
      height: 25px;
      line-height: 25px;
    }
    .pass-strong-inner {
      background: #31498b;
      border-radius: 2px;
      height: 5px;
      .pass-strong-process {
        height: 5px;
        border-radius: 2px;
        &.qiang {
          background: linear-gradient(to right, #2db7f5, #19be6b);
          width: 100%;
        }
        &.zhong {
          background: linear-gradient(to right, #ff9900, #2db7f5);
          width: 50%;
        }
        &.ruo {
          background: linear-gradient(to right, #ed4014, #ff9900);
          width: 25%;
        }
      }
    }
  }
}
</style>
