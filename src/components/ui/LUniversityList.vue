<template>
  <div class="lhyj-ui-universitylist clearfix">
    <div class="no-data" v-if="!data.length">
      <img src="@/assets/images/no-data.png" alt />
    </div>
    <Card class="lhyj-ui-siteitem" v-for="(el,i) in data" :key="i">
      <dl style="margin-bottom:15px" @click="jump(el)">
        <dt class="lhyj-ui-siteitem-top clearfix">
          <div class="lhyj-ui-siteitem-topl">
            <div class="text-center lhyj-ui-siteitem-toplb">师资数</div>
            <div class="text-center lhyj-ui-siteitem-toplt">{{el.teacherCount}}</div>
          </div>
          <div class="lhyj-ui-siteitem-topr">
            <div class="text-center lhyj-ui-siteitem-toplb">开展课程数</div>
            <div class="text-center lhyj-ui-siteitem-toplt">{{el.courseCount}}</div>
          </div>
        </dt>
        <div style="padding: 5px 15px 0">
          <dd class="lhyj-ui-siteitem-title text-ellipsis">{{el.schoolName}}</dd>
          <dd
            class="lhyj-ui-tag"
            v-if="el.teachType"
          >{{el.teachType | CodeTable('SchoolTeachType')}}</dd>
          <dd class="lhyj-ui-siteitem-bot text-ellipsis icon-group">
            <span style="margin-right:13px;" class="icon-house"></span>
            {{el.createOrganName}}
          </dd>
          <Row type="flex" justify="space-between">
            <Col class="icon-group">
              <span style="margin-right:13px;" class="icon-user"></span>
              <span>{{el.contact}}</span>
            </Col>
            <Col class="icon-group">
              <span style="margin-right:13px;" class="icon-phone"></span>
              <span>{{el.contactPhoneNumber}}</span>
            </Col>
          </Row>
        </div>
      </dl>
      <dd
        class="lhyj-ui-siteitem-btn text-center"
        v-if="organId == el.publicOrganId && el.state == 0 &&auth('/resource/university/report')"
      >
        <Button @click="selectAndReport(el)" shape="circle" type="primary">选择上报</Button>
      </dd>
      <dd
        class="lhyj-ui-siteitem-btn text-center"
        v-if="organId == el.publicOrganId && el.state == 1 &&auth('/resource/university/report')"
      >
        <Button shape="circle" type="default">已上报</Button>
      </dd>
      <div class="list-item-util">
        <i
          v-if="auth('/resource/university/update')"
          @click="$router.push({path: 'update',query: {id: el.id}})"
          class="lhyj_swdj lhyj_swdj-edit"
        ></i>
        <i
          v-if="auth('/resource/university/delete')"
          @click="del(el)"
          class="lhyj_swdj lhyj_swdj-del"
        ></i>
      </div>
    </Card>
  </div>
</template>
<script>
import {
  RecommendPartySchools,
  PartySchoolServiceDeleteAsync
} from "@/api/education";
import { Auth } from "@/mixins";
import { Modal, Form, FormItem, Input, Card } from "iview";
export default {
  mixins: [Auth],
  components: {
    Modal,
    Form,
    FormItem,
    Input,
    Card
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    jump(el) {
      if (this.auth("/resource/university/info")) {
        this.$router.push({
          path: "info",
          query: {
            id: el.id
          }
        });
      }
    },
    selectAndReport(el) {
      this.$Modal.confirm({
        title: "系统提示",
        content: "确认上报院校？",
        onOk: () => {
          RecommendPartySchools({
            partySchoolId: el.id
          }).then(res => {
            this.$emit("change");
            this.$Message.success("操作成功");
          });
        }
      });
    },
    del(el) {
      this.$Modal.confirm({
        title: "系统提示",
        content: `确认删除院校'${el.schoolName}'？`,
        onOk: () => {
          PartySchoolServiceDeleteAsync({
            ids: [el.id]
          }).then(res => {
            this.$emit("change");
            this.$Message.success("操作成功");
          });
        }
      });
    }
  },
  computed: {
    organId() {
      return this.$store.state.session.organId;
    }
  }
};
</script>
<style lang="less">
@import "../../style/base.less";
.lhyj-ui-universitylist {
  padding: 0 15px;
  box-sizing: border-box;
  .lhyj-ui-siteitem {
    float: left;
    width: 23%;
    height: 266px;
    margin-left: 2.66%;
    border-radius: 6px;
    margin-top: 20px;
    transition: all 0.2s linear;
    overflow: hidden;
    position: relative;
    &:hover {
      cursor: pointer;
      .list-item-util {
        transform: translateY(0) !important;
      }
    }
  }
  .lhyj-ui-siteitem:nth-child(4n + 1) {
    margin-left: 0;
  }
  .lhyj-ui-siteitem-top {
    border-bottom: 1px solid #dfe5f2;
    padding-bottom: 17px;
  }
  .lhyj-ui-siteitem-topl,
  .lhyj-ui-siteitem-topr {
    float: left;
    width: 50%;
  }
  .lhyj-ui-siteitem-toplt {
    font-size: 24px;
    color: #eb3939;
    font-weight: bold;
  }
  .lhyj-ui-siteitem-toplb {
    margin-bottom: 10px;
    color: #573e41;
  }
  .lhyj-ui-siteitem-title,
  .lhyj-ui-siteitem-bot {
    padding: 10px 0;
    font-size: 16px;
    box-sizing: border-box;
    color: #573e41;
    &:extend(.text-elips);
  }
  .lhyj-ui-siteitem-title {
    padding-bottom: 0;
  }
  .lhyj-ui-siteitem-bot {
    font-size: 14px;
  }
  .lhyj-ui-siteitem-btn {
    padding-bottom: 0px;
  }
}
</style>


