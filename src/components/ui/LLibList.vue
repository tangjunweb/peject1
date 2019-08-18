<template>
  <div class="lhyj-ui-liblist clearfix">
    <Row type="flex" :gutter="20">
      <Col class="lhyj-ui-libitem-col" v-for="(el,i) in data" :key="i">
        <Card class="lhyj-ui-libitem">
          <dt class="lhyj-ui-libitem-h" @click="link(el)">
            <img v-imgerror.video :src="el.headImage" class="avatar" alt />
            <div class="lhyj-ui-libitem-h-t">{{el.realName}}</div>
            <div class="lhyj-ui-libitem-h-b">{{el.organName || el.baseName}}</div>
          </dt>
          <dt class="lhyj-ui-libitem-top clearfix" @click="link(el)">
            <div class="lhyj-ui-libitem-topl">
              <div class="text-center lhyj-ui-libitem-toplb">上课次数</div>
              <div class="text-center lhyj-ui-libitem-toplt">{{el.classCount}}</div>
            </div>
            <div class="lhyj-ui-libitem-topr">
              <div class="text-center lhyj-ui-libitem-toplb">直播主讲</div>
              <div class="text-center lhyj-ui-libitem-toplt">{{el.liveCount}}</div>
            </div>
          </dt>
          <dd class="lhyj-ui-libitem-btn text-center" v-if="el.level-1===level">
            <Button @click="selectAndUse(el)" shape="circle">选择入库</Button>
          </dd>
          <dd class="lhyj-ui-siteitem-btn text-center" v-if="el.level===level && level != 0">
            <Button @click="selectAndReport(el)" type="primary" shape="circle">选择上报</Button>
          </dd>
          <div class="list-item-util" v-if="showOption">
            <Icon
              size="24"
              type="ios-create-outline"
              v-if="auth('/resource/lib/update')"
              @click="$router.push({path: 'create',query: {id: el.id}})"
            ></Icon>
            <Icon size="24" v-if="auth('/resource/lib/delete')" @click="del(el)" type="ios-trash"></Icon>
          </div>
        </Card>
      </Col>
    </Row>
    <div class="no-data" v-if="!data.length">
      <img src="@/assets/images/no-data.png" alt />
    </div>
    <Modal
      :value.sync="show"
      title="选择入库"
      :closable="false"
      transfer
      :mask-closable="false"
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
  </div>
</template>
<script>
import {
  TeacherLibaryServiceSelectAndUse,
  TeacherLibaryServiceReport,
  TeacherLibaryServiceDeleteAsync
} from "@/api/education";
import { Auth } from "@/mixins";
import { Modal, Form, FormItem, Input, Card, Icon, Alert } from "iview";
export default {
  mixins: [Auth],
  components: {
    Modal,
    Form,
    FormItem,
    Input,
    Card,
    Icon,
    Alert
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    showOption: {
      type: Boolean,
      default: true
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
    selectAndUse(el) {
      this.model.id = el.id;
      this.show = true;
    },
    selectAndReport(el) {
      this.$Modal.confirm({
        title: "系统提示",
        content: "确认上报师资？",
        onOk: () => {
          TeacherLibaryServiceReport({
            id: el.id
          }).then(res => {
            this.$emit("change");
            this.$Message.success("操作成功");
          });
        }
      });
    },
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          TeacherLibaryServiceSelectAndUse(this.model)
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
    link(el) {
      if (this.auth("/resource/lib/info")) {
        this.$router.push({
          path: "/resource/lib/info",
          query: {
            id: el.id
          }
        });
      } else {
        this.$Message.warn("暂无权限");
      }
    },
    del(el) {
      this.$Modal.confirm({
        title: "系统提示",
        content: `确认删除师资'${el.realName}'？`,
        onOk: () => {
          TeacherLibaryServiceDeleteAsync({
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
    level() {
      return this.$store.state.session.organLevel;
    }
  }
};
</script>
<style lang="less" scoped>
.lhyj-ui-liblist {
  .lhyj-ui-libitem {
    display: block;
    width: 100%;
    height: 250px;
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
  .lhyj-ui-libitem:nth-child(5n),
  .lhyj-ui-libitem:first-child {
    margin-left: 0;
  }
  .lhyj-ui-libitem-top {
    padding: 20px 0 0 0;
  }
  .lhyj-ui-libitem-toplb {
    margin-bottom: 15px;
  }
  .lhyj-ui-libitem-topl,
  .lhyj-ui-libitem-topr {
    float: left;
    width: 50%;
  }
  .lhyj-ui-libitem-toplt {
    color: #eb3939;
    font-size: 24px;
    font-weight: bold;
  }
  .lhyj-ui-libitem-bot {
    color: #84d7ff;
    margin-bottom: 15px;
  }
  .lhyj-ui-libitem-btn,
  .lhyj-ui-siteitem-btn {
    padding-bottom: 10px;
  }
  .lhyj-ui-libitem-h {
    width: 100%;
    height: 80px;
    line-height: 80px;
    position: relative;
    padding: 15px 15px 15px 80px;
    box-sizing: border-box;
    &::after {
      position: absolute;
      width: 100%;
      height: 2px;
      left: 0;
      bottom: 0;
      content: "";
      display: block;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-image: url(../../assets/login-line.png);
      opacity: 0.2;
    }
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      position: absolute;
      left: 15px;
      top: 15px;
    }
    .lhyj-ui-libitem-h-t {
      height: 25px;
      line-height: 25px;
      font-size: 18px;
      color: #573e41;
    }
    .lhyj-ui-libitem-h-b {
      height: 25px;
      line-height: 25px;
    }
  }
  .lhyj-ui-libitem-col {
    width: 25%;
  }
  @media screen and (max-width: 1600px) {
    .lhyj-ui-libitem-col {
      width: 33.3%;
    }
  }
}
</style>
