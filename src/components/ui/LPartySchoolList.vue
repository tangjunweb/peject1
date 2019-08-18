<template>
  <div class="lhyj-ui-party-school-list clearfix">
    <Modal
      :value.sync="show"
      title="选择入库"
      :closable="false"
      :mask-closable="false"
      transfer
      width="500px"
      class-name="blue-modal"
    >
      <Form ref="form" :model="model" :rules="rules" :label-width="100">
        <FormItem label="备注" prop="remark">
          <Input placeholder="请输入备注" v-model="model.remark" type="textarea" :rows="3"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading" @click="save">保存</Button>
        <Button @click="show = false">关闭</Button>
      </div>
    </Modal>
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
            <div class="text-center lhyj-ui-siteitem-toplb">教材数</div>
            <div class="text-center lhyj-ui-siteitem-toplt">{{el.resourceCount}}</div>
          </div>
        </dt>
        <div style="padding: 5px 15px 0">
          <dd class="lhyj-ui-siteitem-title text-ellipsis">{{el.microName}}</dd>
          <!-- <dd class="lhyj-ui-tag">{{el.teachType | CodeTable('SchoolTeachType')}}</dd> -->
          <dd class="lhyj-ui-siteitem-bot text-ellipsis icon-group">
            <span style="margin-right:13px;" class="icon-house"></span>
            {{el.createOrganName}}
          </dd>
          <Row type="flex" justify="space-between">
            <Col class="icon-group">
              <span style="margin-right:13px;" class="icon-user"></span>
              {{el.contact}}
            </Col>
            <Col class="icon-group">
              <span style="margin-right:13px;" class="icon-phone"></span>
              {{el.contactPhoneNumber}}
            </Col>
          </Row>
        </div>
      </dl>
      <dd
        class="lhyj-ui-siteitem-btn text-center"
        v-if="organId == el.publicOrganId && el.state == 0 && auth('/resource/party-school/report')"
      >
        <Button @click="selectAndReport(el)" shape="circle" type="primary">选择上报</Button>
      </dd>
      <dd
        class="lhyj-ui-siteitem-btn text-center"
        v-if="organId == el.publicOrganId && el.state == 1 && auth('/resource/party-school/report')"
      >
        <Button shape="circle" type="default">已上报</Button>
      </dd>
      <div class="list-item-util">
        <i
          v-if="auth('/resource/party-school/update')"
          @click="$router.push({path: 'update',query: {id: el.id}})"
          class="lhyj_swdj lhyj_swdj-edit"
        ></i>
        <i
          v-if="auth('/resource/party-school/delete')"
          @click="del(el)"
          class="lhyj_swdj lhyj_swdj-del"
        ></i>
      </div>
    </Card>
  </div>
</template>
<script>
import {
  SelectEduSiteAndUse,
  RecommendMicroPartySchools,
  MicroPartySchoolServiceDeleteAsync
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
      show: false,
      loading: false,
      model: {
        id: "",
        remark: ""
      },
      rules: {
        remark: [
          {
            required: true,
            message: "请输入备注",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    jump(el) {
      if (this.auth("/resource/party-school/info")) {
        this.$router.push({
          path: "info",
          query: {
            id: el.id
          }
        });
      }
    },
    selectAndUse(el) {
      this.model.id = el.id;
      this.show = true;
    },
    selectAndReport(el) {
      this.$Modal.confirm({
        title: "系统提示",
        content: "确认上报微党校？",
        onOk: () => {
          RecommendMicroPartySchools({
            microPartySchoolId: el.id
          }).then(res => {
            this.$emit("change");
            this.$Message.success("上报成功");
          });
        }
      });
    },
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          SelectEduSiteAndUse(this.model)
            .then(res => {
              this.$Message.success("入库成功");
              this.show = false;
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    del(el) {
      this.$Modal.confirm({
        title: "系统提示",
        content: `确认删除微党校'${el.microName}'？`,
        onOk: () => {
          MicroPartySchoolServiceDeleteAsync({
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
.lhyj-ui-party-school-list {
  .lhyj-ui-siteitem {
    float: left;
    width: 23%;
    height: 266px;
    margin-left: 2.66%;
    border-radius: 6px;
    margin-bottom: 20px;
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
}
</style>


