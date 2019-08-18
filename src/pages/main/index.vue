<template>
  <div class="nav">
    <Row type="flex" justify="center" :gutter="20">
      <Col
        v-if="item.type == 1 && item.children.length"
        v-for="(item, i) in permissions"
        :key="i"
        style="margin-bottom:20px"
      >
        <div class="text-center nav-tabs">
          <div class="nav-img">
            <img
              :src="i < 6 ? require(`../../assets/images/logo-nav-${i + 1}.png`): require(`../../assets/images/logo-nav-6.png`)"
              alt
            />
          </div>
          <div class="nav-title">{{item.displayName}}</div>
          <ul >
            <router-link
              tag="li"
              :to="i.url || ''"
              v-for="(i, n) in item.children"
              v-if="i.type == 1"
              :key="n"
            >{{i.displayName}}</router-link>
          </ul>
        </div>
      </Col>
    </Row>
    <!-- guid引导 -->
    <div id="guid-mask">
      <img src="@/assets/images/guid-1.png" alt id="guid-step-1" />
      <img src="@/assets/images/guid-2.png" alt id="guid-step-2" @click="nextGuid" />
      <img src="@/assets/images/guid-3.png" alt id="guid-step-3" @click="closeGuid" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["permissions"])
  },
  mounted() {
    let maskGuid = localStorage.getItem(
      `${PREFIX}_${this.$store.state.session.userName}guid-step-1`
    );
    if (!maskGuid) {
      document.querySelector("#guid-mask").style.display = "block";
    }
  },
  methods: {
    nextGuid() {
      this.closeGuid();
      this.$router.push("/member-serve/my-setting/personal");
    },
    closeGuid() {
      document.querySelector("#guid-mask").style.display = "none";
      localStorage.setItem(
        `${PREFIX}_${this.$store.state.session.userName}guid-step-1`,
        true
      );
    }
  }
};
</script>

<style lang='less'>
@import "../../style/common.less";
.nav {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 0;
  .nav-tabs {
    width: 260px;
    height: 530px;
    box-shadow: 0px 10px 25px 4px rgba(109, 109, 109, 0.25);
    // padding: 47px 27px 20px 32px;
    padding-top: 40px;
    border-radius: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .nav-img {
      height: 140px;
      margin-bottom: 30px;
      img {
        height: auto;
        max-width: 100%;
        max-height: 140px;
      }
    }
    .nav-title {
      font-size: 24px;
      color: #080808;
      line-height: 1;
      margin-bottom: 20px;
      font-weight: bold;
    }
    li {
      margin: 0 25px;
      font-size: 16px;
      color: #080808;
      cursor: pointer;
      line-height: 34px;
      height: 34px;
      margin-bottom: 10px;
      border-radius: 34px;
      &:hover {
        color: #fff;
        background: @primary-color;
      }
    }
  }
  @media screen and (max-width: 1780px) {
    .nav-tabs {
      width: 240px !important;
    }
  }
  @media screen and (max-width: 1660px) {
    .nav-tabs {
      width: 220px !important;
    }
  }
  @media screen and (max-width: 1540px) {
    .nav-tabs {
      width: 260px !important;
    }
  }
}
</style>
