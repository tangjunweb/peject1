<template>
  <div>
    <TopCountTipsCard title="码表管理" :count="totals" subTitle="码表类型总数"></TopCountTipsCard>
    <Row class="text-right">
      <Form ref="form" inline>
        <FormItem>
          <Button type="primary" ghost @click="add">新增</Button>
        </FormItem>
      </Form>
    </Row>
    <Card class="border" :dis-hover="true">
      <Row :gutter="30">
        <Col :sm="24" :md="7" :lg="5" class="code-type-menu scroll">
          <Menu theme="light" :active-name="activeName" ref="menu" @on-select="menuSelect">
            <MenuItem v-for="(el,i) in codeTypes" :name="el.value" :key="i">{{el.text}}</MenuItem>
          </Menu>
        </Col>
        <Col :sm="24" :md="17" :lg="19">
          <Table height="700" :loading="loading" :columns="columns" :data="data"></Table>
        </Col>
      </Row>
      <code-modal
        :code="code"
        @change="codeChange"
        :codes="data"
        :codeType="activeName"
        :codeTypes="codeTypes"
        v-model="createCodeModal"
      ></code-modal>
    </Card>
  </div>
</template>
<script>
import { Card, Menu, MenuItem, Table } from "iview";
import TopCountTipsCard from "@/components/TopCountTipsCard";
import CodeModal from "../../common/CodeModal";
import {
  GetBaseCodeTypes,
  GetBaseCodeByTypeOrParentValue,
  DeleteBaseCode
} from "@/api";
export default {
  components: {
    TopCountTipsCard,
    CodeModal,
    Card,
    Menu,
    MenuItem,
    Table
  },
  data() {
    let that = this;
    return {
      createCodeModal: false,
      loading: false,
      codeTypes: [],
      activeName: "",
      code: null,
      data: [],
      totals: 0,
      columns: [
        {
          title: "名称",
          key: "text",
          width: 300
        },
        {
          title: "值",
          key: "value"
        },
        {
          title: "父码表",
          render(h, { row }) {
            let str = "-";
            if (row.parentValue) {
              str = that.data.find(e => {
                return e.value === row.parentValue;
              }).text;
            }
            return h("span", str);
          }
        },
        {
          title: "排序",
          key: "sortCode",
          width: 80
        },
        {
          title: "操作",
          align: "right",
          className: "zdy-table-opration",
          render(h, { row }) {
            return h("span", [
              h(
                "a",
                {
                  on: {
                    click() {
                      that.$Modal.confirm({
                        title: "系统提示",
                        content: "确认删除码表？",
                        onOk: () => {
                          DeleteBaseCode({ Id: row.id }).then(res => {
                            that.loadData();
                          });
                        }
                      });
                    }
                  }
                },
                "删除"
              ),
              h(
                "a",
                {
                  on: {
                    click() {
                      that.code = row;
                      that.createCodeModal = true;
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    menuSelect(name) {
      this.activeName = name;
    },
    loadData() {
      this.loading = true;
      GetBaseCodeByTypeOrParentValue({
        BaseCodeType: this.activeName
      })
        .then(res => {
          this.data = res;
        })
        .complete(() => {
          this.loading = false;
        });
    },
    codeChange() {
      this.loadData();
      this.$store.dispatch("getAllBaseCodes", true);
    },
    add() {
      this.createCodeModal = true;
      this.code = null;
    }
  },
  watch: {
    activeName(v) {
      if (v) {
        this.loadData();
      }
    }
  },
  mounted() {
    this.$store.commit("UPDATESTATE", {
      loading: true
    });
    GetBaseCodeTypes()
      .then(res => {
        this.codeTypes = res;
        if (res.length) {
          this.totals = res.length;
          this.activeName = res[0].value;
          this.$nextTick(() => {
            this.$refs["menu"].updateActiveName();
          });
        }
      })
      .complete(() => {
        this.$store.commit("UPDATESTATE", {
          loading: false
        });
      });
  }
};
</script>
<style lang="less">
.code-type-menu {
  .ivu-menu-light.ivu-menu-vertical
    .ivu-menu-item-active:not(.ivu-menu-submenu):after {
    background-color: transparent;
  }
  height: 600px;
  overflow-y: auto;
  padding: 0 !important;
  .ivu-menu {
    width: 100% !important;
  }
}
</style>


