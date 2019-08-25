<template>
  <div class="partymember-info">
    <Row type="flex" :gutter="partyMember.id? 25:0" class-name="common-row2">
      <Col class-name="common-col">
        <Card class="lib-info-panel border" :dis-hover="true" v-if="partyMember.id">
          <div class="main-info">
            <div class="avatar">
              <img
                v-imgerror.avatar
                :src="partyMember.headImage || '../../../assets/images/avatar-default.png'"
                alt
              >
            </div>
            <div class="common-col-name text-center">
              {{partyMember.name}}
              <Icon
                class="icon-sex"
                :color="partyMember.addition && partyMember.addition.sex == 'Sex-100' ? '#84D7FF' : '#c08134'"
                :type="partyMember.addition && partyMember.addition.sex == 'Sex-100' ? 'md-male' : 'md-female'"
              />
            </div>
            <div class="common-col-text text-center">
              <p class="text-ellipsis">{{partyMember.organName}}</p>
            </div>
            <div class="common-col-join text-center" v-if="partyMember.partyMember.joinPartyDate">
              <p class="text-ellipsis">
                <i></i>
                {{partyMember.partyMember.joinPartyDate | DateFormat('yyyy年MM月dd日')}}入党
              </p>
            </div>
          </div>
          <div class="main-foot">
            <!-- <div class="main-foot-item">
              <img src="../../../assets/images/icon-book.png" alt>
              <div>
                <span class="current-text">当前学时</span>
                <span class="current-time">23.5h</span>
              </div>
            </div>
            <div class="main-foot-item">
              <img src="../../../assets/images/icon-cup.png" alt>
              <div>
                <span class="current-text">排名</span>
                <span class="current-time">23</span>
              </div>
            </div> -->
          </div>
        </Card>
      </Col>
      <Col class-name="common-col common-col2" style="flex:1;overflow:hidden">
        <Card class="border lib-info-panel-tabs" :dis-hover="true">
          <div class="layout-lr-lch">
            <Tabs v-model="tabName" style="margin-top:23px">
              <TabPane label="党员基本信息" name="dyjbxx"></TabPane>
              <TabPane label="入党信息" name="dyfzxx"></TabPane>
              <TabPane label="职务" name="zw"></TabPane>
              <TabPane label="奖惩" name="jc"></TabPane>
              <TabPane label="出国（境）" name="cgcj"></TabPane>
              <TabPane label="困难情况" name="knqk"></TabPane>
            </Tabs>
          </div>
          <div class="layout-lr-lcb">
            <div class="layout-lr-lcb-scroll">
              <component :partyMember="partyMember" :is="componentId"></component>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
import { Tabs, TabPane, Card } from "iview";
import Dyjbxx from "./dyjbxx";
import Dyfzxx from "./dyfzxx";
import Zw from "./zw";
import Jc from "./jc";
import Cgcj from "./cgcj";
import Knqk from "./knqk";
import { PartyMemberServiceGet } from "@/api/partyMember";
export default {
  components: {
    Card,
    Tabs,
    TabPane,
    Dyjbxx,
    Dyfzxx,
    Zw,
    Jc,
    Cgcj,
    Knqk
  },
  data() {
    return {
      tabName: "dyjbxx",
      loading: false,
      partyMember: {
        partyMember: {},
        addition: {}
      }
    };
  },
  computed: {
    componentId() {
      switch (this.tabName) {
        case "dyjbxx":
          return Dyjbxx;
          break;
        case "dyfzxx":
          return Dyfzxx;
          break;
        case "zw":
          return Zw;
          break;
        case "jc":
          return Jc;
          break;
        case "cgcj":
          return Cgcj;
          break;
        case "knqk":
          return Knqk;
          break;
      }
    },
  },
  methods: {
    loadData() {
      let id = this.$route.query.id;
      this.loading = true;
      PartyMemberServiceGet({ id })
        .then(res => {
          this.partyMember = res;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    let id = this.$route.query.id;
    if (id) {
      this.loadData();
    } else {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less">
@import "../../../style/common.less";
.partymember-info {
  .common-row2 {
    height: 90%;
  }
  .main-info {
    height: 350px;
    border-bottom: 1px solid #f1e7e6;
  }
  .lib-info-panel-tabs {
    height: 600px;
  }
  .main-foot {
    height: 150px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .main-foot-item {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      border-left: 1px solid #f1e7e6;

      img {
        margin-right: 14px;
      }
      div {
        display: flex;
        flex-direction: column;
        .current-text {
          font-size: 14px;
          color: #573e41;
        }
        .current-time {
          font-size: 20px;
          color: #f53d3d;
          font-weight: bold;
        }
      }
    }
    &:first-child {
      border: 0;
    }
  }
  .common-col {
    height: 100%;
    overflow: hidden;
    .avatar {
      text-align: center;
      width: 166px;
      height: 174px;
      margin: 94px auto 15px;
      background: url(../../../assets/images/avatar-bg.png) no-repeat;
      overflow: hidden;
      img {
        width: 140px;
        margin-top: 15px;
        height: 140px;
        border-radius: 50%;
        border: 0;
      }
    }
    .layout-lr-lch {
      height: 60px;
      line-height: 60px;
      .ivu-tabs-bar {
        border-bottom: none;
      }
    }
  }
  .lib-info-panel {
    width: 450px;
    height: 600px;
    background: #fff url("../../../assets/images/user-bg.png") no-repeat top
      center;
    .ivu-card-body {
      padding: 0;
    }
  }
  .libinfo-left {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .common-col-name {
    font-size: 18px;
    color: #573e41;
    position: relative;
    i {
      margin-left: 5px;
    }
    .icon-sex {
      top: 5px;
      position: absolute;
    }
  }
  .common-col-btn {
    margin-top: 20px;
  }
  .common-col-text {
    padding: 20px 0 20px;
    font-size: 14px;
    color: #573e41;
    p {
      line-height: 30px;
    }
  }
  .common-col-join {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    p {
      padding: 0 35px;
      height: 34px;
      border: 1px dashed #f53d3d;
      color: #f53d3d;
      border-radius: 34px;
      display: flex;
      flex-direction: row;
      align-items: center;
      i {
        width: 18px;
        height: 18px;
        margin-right: 12px;
        background: url(../../../assets/images/icon-logo.png);
        display: block;
      }
    }
  }
  .sz-info-list {
    .sz-info-list-item {
      padding: 15px 15px 15px 70px;
      box-sizing: border-box;
      position: relative;
      .sz-info-list-l {
        position: absolute;
        left: 15px;
        top: 10px;
      }
      .sz-info-list-r {
        .sz-info-list-t {
          height: 25px;
          line-height: 25px;
        }
        .sz-info-list-b {
          height: 25px;
          line-height: 25px;
          font-size: 12px;
        }
      }
    }
    .sz-info-list-item + .sz-info-list-item {
      border-top: 1px solid #dfe5f2;
    }
  }
  .organ-form-item {
    margin-bottom: 20px;
  }
  .form-info-box {
    font-size: 14px;
    margin-bottom: 18px;
    .form-info-label {
      color: #b5a1a3;
      margin-right: 18px;
    }
  }
  .form-info-value {
    color: #573e41;
  }
  .form-info-box-inline {
    display: flex;
    flex-direction: row;
    margin-bottom: 25px;
    em {
      font-style: normal;
      padding: 0 20px;
      text-align: center;
      color: #f1e7e6;
    }
  }
}
</style>
