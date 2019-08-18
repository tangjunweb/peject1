<template>
  <div class="layout">
    <Spin fix v-if="loading"></Spin>
    <Layout>
      <Header class="layout-header">
        <Menu mode="horizontal" theme="dark">
          <div class="layout-logo">
            <img src="@/assets/images/logo/logo4.png" alt />
            <span class="logo-title">西宁城北区党建管理后台</span>
          </div>
          <!-- 导航 -->
          <ul class="navigator">
            <template v-if="$route.path !='/main' && $route.path !='/enter'">
              <router-link tag="li" :to="(item.children.length ? item.children[0].url : item.url) || ''" :class="['nav-item-wrap',$route.path.indexOf(item.url)  == 0 ? 'router-link-active': '']" v-for="(item, index) in menu" :key="index">
                <Icon class="nav-icon" :type="item.iconPath" size="20" />
                <div class="nav-item-box">
                  <div class="item-title">{{item.displayName}}</div>
                </div>
                <ul class="nav-sub-item" v-if="item.children.length">
                  <router-link :to="i.url || ''" tag="li" v-for="i in item.children" v-if="i.type == 1" :key="i.displayName" :class="{'is-selected':$route.path.includes(i.url)}">
                    <!-- <Icon style="margin-right:11px" v-if="i.iconPath" :type="i.iconPath" /> -->
                    <span>{{i.displayName}}</span>
                  </router-link>
                </ul>
              </router-link>
            </template>
          </ul>
          <!-- 用户操作 -->
          <div class="layout-option clearfix" v-if="$route.path !='/enter'">
            <MenuItem name="2" class="head-message">
            <div class="head-message" @click="$router.push('/member-serve/my-message/home')">
              <Badge :count="notice">
                <div class="loginout">
                  <img src="@/assets/images/notice.png" alt />
                </div>
              </Badge>
            </div>
            </MenuItem>
            <MenuItem name="3" class="header-user" @click.native="$router.push('/member-serve/my-setting/personal')">
            <div class="avatar">
              <img v-imgerror.avatar :src="session.headImage || require('@/assets/images/avatar.png')" alt />
            </div>
            <div class="name">{{session.nickName||session.userName | limit(6)}}</div>
            </MenuItem>
            <MenuItem name="4" class="header-user" @click.native="loginOut">
            <div class="loginout">
              <img src="@/assets/images/loginout.png" alt />
            </div>
            退出
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <div id="lhyj-content">
        <BreadCrumb v-if="$route.path !='/main' && $route.path !='/enter'">></BreadCrumb>
        <Content :style="{minHeight: '500px'}">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </Content>
      </div>
      <Footer class="layout-footer-center">中共西宁市城北区委组织部主办</Footer>
    </Layout>
    <!-- 右侧栏 -->
    <div class="layout-right">
      <div class="layout-option-item scroll-top" @click="scrollTop">
        <img src="@/assets/images/scroll-top.png" alt />
      </div>
    </div>
  </div>
</template>
<script>
import nav from '@/mock/nav'
import {
  Layout,
  Header,
  Menu,
  MenuItem,
  Content,
  Badge,
  Icon,
  Poptip,
  Spin
} from "iview";
// import "./signalr";
import BreadCrumb from "./bread-crumb";
import { mapState } from "vuex";
import BScroll from "better-scroll";
export default {
  components: {
    Layout,
    Header,
    Menu,
    MenuItem,
    Content,
    Badge,
    Icon,
    BreadCrumb,
    Poptip,
    Spin
  },
  data() {
    return {
      loading: false,
      menu: nav
    };
  },
  mounted() {
    this.$store.dispatch("getNotice");
  },
  computed: {
    ...mapState(["permissions", "session", "notice"]),
    menu() {
      return this.permissions.filter(e => e.type == 1);
    },
    userRoleofAdminAndUser() {
      const roles = this.$store.state.session.roleIds.split(",");
      const index = roles.findIndex(e => e.toString() == 9);
      if (index > -1 && roles.length > 1) {
        return true;
      } else {
        return false;
      }
    },
    isIntranet() {
      return this.$store.state.session.isIntranet;
    }
  },
  methods: {
    openQQ() {
      window.open("//wpa.qq.com/msgrd?v=3&uin=1972692145&site=qq&menu=yes");
    },
    loginOut() {
      this.$store.dispatch("loginOut").then(() => {
        this.$router.push("/login");
      });
    },
    scrollTop() {
      window.scrollTo(0, 0);
    }
  }
};
</script>
<style lang='less'>
@import "../../style/common.less";
.layout {
  background: #f5f7f9;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  // height:80vw;
  .ivu-layout-footer {
    background: #B8232B;
    padding: 6px 50px;
    color: #fff;
    margin-top:50px;
  } // 管理端主题
  .layout-header {
    width: 100%;
    height: 86px;
    position: fixed;
    margin-bottom: 50px;
    background: #B8232B;
    z-index: 990;
    .ivu-badge-count {
      height: 14px;
      padding: 0;
      line-height: 14px;
      min-width: 16px;
    }
    .navigator {
      height: 90px;
      flex: 1;
      overflow: hidden;
      line-height: 1;
      display: flex;
      .nav-item-wrap {
        height: 86px;
        padding: 20px 10px;
        box-sizing: border-box;
        display: flex; // flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;
        i.nav-icon,
        .item-title {
          color: rgba(255, 255, 255, 0.6);
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          // padding-left: 10px;
        }
        i {
          font-weight: bold;
        }
        &.router-link-active {
          // height: 90px;
          // padding: 22px 0;
          .item-title,
          i.nav-icon {
            color: rgba(255, 255, 255, 1) !important;
          }
          // background: rgb(230, 6, 6);
          &:after{
            content: '';
            position: absolute;
            bottom: 0;
            border: 8px solid transparent;
            border-bottom: 8px solid #fff;
            width: 0;
            height: 0;
          }
        }
        &:hover {
          // height: 90px;
          // padding: 22px 0;
          .item-title,
          i.nav-icon {
            color: rgba(255, 255, 255, 1) !important;
          }
          // background: rgb(230, 6, 6);
          .nav-sub-item {
            display: flex;
            z-index: 99;
          }
        }
        .nav-sub-item {
          position: fixed;
          left: 0;
          top: 86px;
          width: 100%;
          height: 50px;
          display: none;
          flex-direction: row;
          align-items: center;
          padding-left: 300px;
          font-size: 16px;
          background: #fff;
          z-index: 10;
          border-bottom: 1px solid rgba(229, 223, 223, 1);
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          li {
            line-height: 50px;
            height: 100%;
            margin-left: 68px;
            // padding-left: 57px;
            // padding-right: 24px;
            // border-right: 1px solid #d2c2c2;
            &:hover {
              .ivu-icon::before,
              span {
                color: #eb3939 !important;
              }
            }
          }
          .is-selected {
            position: relative;
            color: @primary-color;
            &::after {
              content: '';
              position: absolute;
              bottom: 0;
              width:20px;
              height:3px;
              background:rgba(184,35,43,1);
              border-radius:2px;
              left: 50%;
              transform: translateX(-50%)
            }
          }
        }
      }
    }
    .ivu-menu-dark {
      background: none;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .ivu-menu-horizontal {
      height: 86px;
      line-height: 86px;
    }
    .ivu-menu-item {
      color: #fff;
      height: 86px;
      font-size: 16px;
    }
    .transfor-wrap {
      display: flex;
      flex-direction: row;
      align-items: center;
      .transfor-btn {
        height: 44px;
        padding: 0 15px 0 40px;
        background: url(../../assets/images/icon-transfor.png) no-repeat 15px center;
        line-height: 44px;
        color: #fff;
        border-radius: 44px;
        border: 1px solid #fff;
        &:hover {
          color: @primary-color;
          background: #fff url(../../assets/images/icon-transfor-active.png) no-repeat 15px;
        }
      }
    }
    .head-message {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .loginout {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-right: 10px;
    }
    .header-user {
      display: flex;
      flex-direction: row;
      align-items: center;
      .avatar {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-right: 10px;
        img {
          width: 51px;
          height: 58px;
          border-radius: 50%;
          margin-top: 15px;
        }
      }
    }
  }
}

.layout-logo {
  // width: 266px;
  width: 330px;
  height: 86px;
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 20px;
  .logo-title {
    font-size: 20px;
    font-weight: 800;
    color: rgba(255, 255, 255, 1);
    padding-left: 9px;
  }
}

.layout-option {
  margin: 0 auto;
  margin-right: 20px;
}

.layout-footer-center {
  text-align: center;
  background: #B8232B;
  padding: 6px 50px;
  color: #fff;
  width: 100%;
  position: absolute;
  bottom: 0;
}

#lhyj-content {
  padding: 128px 52px 0 61px;
  box-sizing: border-box;
  margin-bottom:100px;
}

.layout-right {
  position: fixed;
  right: 0;
  top: 70%;
  transform: translateY(-50%);
  z-index: 100;
  .layout-option-item {
    width: 40px;
    height: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(223, 228, 242, 1);
    background: #fff;
    box-shadow: 0px 4px 15px 5px rgba(235, 237, 242, 1);
    cursor: pointer;
  }
  .scroll-top {
    margin-top: 50px;
    height: 40px;
  }
}
</style>