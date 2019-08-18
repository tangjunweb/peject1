<template>
  <div class="bread-crumb">
    <Breadcrumb>
      <Icon class="icon-back" style="margin-top:-3px;margin-right:13px;cursor:pointer" @click="$router.go(-1)" size="20"></Icon>
      <BreadcrumbItem v-for="(el,index) in routeList" :key="index" :to="{ path: el.path }">{{el.title}}</BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
import { Breadcrumb, BreadcrumbItem, Icon } from "iview";
export default {
  name: "bread-crumb",
  components: {
    Breadcrumb,
    BreadcrumbItem,
    Icon
  },
  computed: {
    routeList() {
      return this.$route.matched
        .filter(e => {
          return e.meta.title;
        })
        .map(e => {
          return {
            title: e.meta.title,
            path: e.path
          };
        });
    }
  }
};
</script>

<style lang='less' scoped>
@import "../../style/common.less";
.bread-crumb {
  margin-bottom: 20px;
  .icon-back {
    background: url("~@/assets/images/goback.png") left top no-repeat;
    background-size: 100% 100%;
    width: 15px;
    height: 15px;
    &:hover {
      color: @primary-color;
    }
  }
  .ivu-breadcrumb {
    height: 40px;
    // background: #fff;
    // border: 1px solid rgba(229, 223, 223, 1);
    font-size: 14px;
    border-radius: 3px;
    line-height: 40px;
    // a{
    //   color: #C82721 !important;
    // }
  }
}
</style>
