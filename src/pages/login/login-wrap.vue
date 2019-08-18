<template>
  <div class="login-main">
    <div class="login-wrap">
      <div class="login-modal">
        <div class="left-login">
          <img class="logo-1" src="@/assets/images/logo/logo.png" alt />
        </div>
        <div class="right-login">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <div class="login-bottom"></div>
    <Footer class="layout-footer-center">中共西宁市城北区委组织部主办</Footer>
  </div>
</template>

<script>
import { Poptip } from "iview";
export default {
  components: {
    Poptip
  },
  data() {
    return {
      modal: false
    };
  },
  
};
</script>

<style lang='less'>
.login-main {
  .login-wrap {
    width: 1200px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -600px;
    transform: translateY(-50%);
    background: #fff;
    .login-modal {
      width: 1200px;
      position: relative;
      display: flex;
      flex-direction: row;
      box-sizing: border-box;
      .login-qr {
        position: absolute;
        right: 25px;
        top: 25px;
        cursor: pointer;
        .ivu-poptip-inner {
          background: #e53d3d;
        }
        .ivu-poptip-popper {
          min-width: 120px;
        }
        .ivu-poptip-body-content-inner {
          color: #fff;
          font-size: 16px;
        }
        .ivu-poptip-popper[x-placement^="left"] .ivu-poptip-arrow:after {
          border-left-color: #e53d3d;
        }
      }
      .left-login {
        margin-right: 100px;
        img {
          display: block;
        }
        .logo-1 {
          width: 659px;
        }
      }
      .right-login {
        margin-top: 90px;
        width: 375px;
      }
    }
  }
  .login-bottom{
    width:100%;
    position: absolute;
    bottom: 33px;
    max-height: 247px;
    height:18%;
    background: url("~@/assets/images/login-bottom.png") left top no-repeat;
    background-size: 100% 100%;
  }
  .layout-footer-center {
    text-align: center;
    background: #B8232B;
    padding: 6px 50px;
    color: #fff;
    width: 100%;
    position: fixed;
    bottom: 0;
  }
}
</style>
