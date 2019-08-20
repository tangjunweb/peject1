<template>
  <div class="login-form login-pwd">
    <h3 class="login-title">登录</h3>
    <Form ref="form" :model="formModel" :rules="rules" @keyup.native.enter="login">
      <FormItem prop="userName">
        <Input v-model="formModel.userName" size="large" placeholder="请输入账号|手机号">
        <img src="@/assets/images/login-icon-user.png" slot="prefix" alt>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input :type="pwdType" v-model="formModel.password" size="large" placeholder="请输入您的密码">
        <img src="@/assets/images/login-icon-password.png" slot="prefix" alt>
        </Input>
        <Icon v-if="openeye" class="eye" type="ios-eye-outline" size="26" @click="changeType()" />
        <Icon v-else class="eye" size="26" type="ios-eye" @click="changeType()" />
      </FormItem>
      <FormItem class="validate-form-item" prop="code">
        <Input v-model="formModel.code" size="large" placeholder="请输入验证码" style="width:200px">
        <img src="@/assets/images/login-icon-yz.png" slot="prefix" alt>
        </Input>
        <div class="validate-form-wrap">
          <div class="validate-form-img" :style="{backgroundImage:'url(' + validateSrc + ')'}">
            <img :src="validateSrc" @load="load" alt style="display:none">
          </div>
          <Icon type="md-refresh" :class="imgLoading ? 'loading' : ''" @click="refresh" />
        </div>
      </FormItem>
      <FormItem class="validate-form-btn">
        <Button @click="login" size="large" :loading="loading" type="primary" long>登录</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { Form, FormItem, Input } from "iview";
import md5 from "md5";
import { buildRandomCode } from "@/utils/util";
export default {
  data() {
    return {
      loading: false,
      imgLoading: false,
      disabled: false,
      animate: null,
      pwdType: 'password', // 密码类型
      openeye: true,
      formModel: {
        code: "",
        codeId: "",
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          {
            required: true,
            trigger: "blur",
            message: "请输入账号|手机号"
          },
          {
            max: 18,
            message: "请输入正确的账号"
          }
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "请输入密码"
          }
        ],
        code: [
          {
            required: true,
            trigger: "blur",
            message: "请输入验证码"
          },
          {
            len: 4,
            message: "请输入正确的验证码"
          }
        ]
      }
    };
  },
  watch: {
    formModel: {
      deep: true,
      handler(p, n) {
        if (p.codeId !== n.codeId) {
          this.imgLoading = true;
        }
      }
    }
  },
  computed: {
    validateSrc() {
      return this.formModel.codeId
        ? `${API_PATH}/api/TokenAuth/VierificationCode?codeId=${
        this.formModel.codeId
        }`
        : "";
    }
  },
  methods: {
    load(e) {
      this.imgLoading = false;
    },
    login() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          let model = JSON.parse(JSON.stringify(this.formModel));
          model.password = md5(model.password);
          this.$store
            .dispatch("userLogin", model)
            .then(res => {
              this.$router.push("/basic/analyse");
              // if (this.$store.state.systemType == "adminAndUser") {
              //   this.$router.push("/enter");
              // }

              //  if (this.$store.state.systemType == "admin") {
              //   this.$store.dispatch("getCurrentUserPermissionNames");
              //   this.$router.push("/main");
              // } else {
              //   this.$store.dispatch("getCurrentUserPermissionNames").then(res => {
              //     this.$router.replace(res[0].url);
              //   });
              // }
              this.$Message.success("登录成功");
            })
            .catch(e => {
              this.refresh();
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    refresh() {
      if (!this.disabled) {
        this.disabled = true;
        this.formModel.codeId = buildRandomCode();
        setTimeout(() => {
          this.disabled = false;
        }, 1000);
      }
    },
    changeType() {
      this.pwdType = this.pwdType === 'password' ? 'text' : 'password';
      this.openeye = this.openeye == true ? false : true;
    },
  },
  mounted() {
    this.formModel.codeId = buildRandomCode();
  },
  components: {
    Form,
    FormItem,
    Input
  }
};
</script>
<style lang="less">
@keyframes rotateLogin {
  to {
    transform: rotate(360deg);
  }
}

.login-pwd {
  .ivu-form-item-content {
    line-height: 20px;
  }
  .validate-form-btn {
    margin-bottom: 18px;
  }
  .eye {
    position: absolute;
    right: 5px;
    top: 4px;
  }
  .ivu-btn-primary {
    background-color: #B8232B;
    border-color: #B8232B;
  }
}
</style>
