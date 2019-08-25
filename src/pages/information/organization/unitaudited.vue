<!-- 待审核单位 -->
<template>
  <div>
    <TopCountTipsCard title="待审核单位" :count="total" subTitle="当前共有"></TopCountTipsCard>
    <Form :label-width="80" inline>
      <FormItem label="单位名称">
        <Input placeholder="请输入单位名称" v-model="searchParams.UnitName"></Input>
      </FormItem>
      <FormItem :label-width="0">
        <Button @click="loadData" style="margin-right:15px;" type="primary">搜索</Button>
        <Button @click="reset"  style="margin-right:15px;" type="primary">重置</Button>
        <Button :disabled="selectData.length===0" @click="batchAudit" type="error">批量审核</Button>
      </FormItem>
    </Form>
    <Card class="border" :dis-hover="true">
      <div>
        <Table
          @on-selection-change="selectionChange"
          :loading="loading"
          border
          :columns="columns"
          :data="data"
        ></Table>
        <div class="text-right" style="padding:30px 0 0 0">
          <Page
            :current.sync="params.pageIndex"
            :total="total"
            :page-size="params.MaxResultCount"
            class-name="lhyj-page"
          />
        </div>
      </div>
    </Card>
    <Modal
      :value.sync="showModal"
      title="审核单位"
      :closable="false"
      :mask-closable="false"
      transfer
      :loading="modalLoading"
      width="500px"
      class-name="blue-modal"
    >
      <Form ref="form">
        <FormItem label="审核结果">
          <i-switch  v-model="model.pass">
            <span slot="open">通过</span>
            <span slot="close">拒绝</span>
          </i-switch>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="showModal = false">关闭</Button>
        <Button @click="audit" :loading="modalLoading">审核</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import TopCountTipsCard from "@/components/TopCountTipsCard";
import { Form, FormItem, Input, Page, Table, Modal, Switch, Card } from "iview";
import { SkipCount, ClearParams } from "@/mixins";
import {
  AuditingPageList,
  AuditUnitAsync
} from "@/api/partyOrganizationService";
export default {
  mixins: [SkipCount, ClearParams],
  components: {
    TopCountTipsCard,
    Form,
    FormItem,
    Page,
    Table,
    Input,
    Modal,
    Card,
    "i-switch": Switch
  },
  data() {
    let that = this;
    return {
      loading: false,
      showModal: false,
      modalLoading: false,
      selectData: [],
      columns: [
        {
          width: 60,
          type: "selection"
        },
        {
          title: "单位名称",
          key: "unitName",
          tooltip: true
        },
        {
          title: "开展工作党组织",
          key: "createdOrganName"
        },
        {
          title: "信息完整度",
          key: "integrity",
          render(h, { row }) {
            return h("span", "100%");
          }
        },
        {
          title: "操作",
          align: "right",
          fixed: "right",
          width: 200,
          className: "zdy-table-opration",
          render(h, { row }) {
            let arr = [];
            arr.push(
              h(
                "a",
                {
                  on: {
                    click() {
                      that.$router.push({
                        path: "unitinfo",
                        query: {
                          type: that.$route.query.type || "all",
                          id: row.id
                        }
                      });
                    }
                  }
                },
                "查看"
              )
            );
            arr.push(
              h(
                "a",
                {
                  on: {
                    click() {
                      that.model.ids = [row.id];
                      that.showModal = true;
                    }
                  }
                },
                "审核"
              )
            );
            return h(
              "span",
              {
                class: "table-btn-group"
              },
              arr
            );
          }
        }
      ],
      data: [],
      searchParams: {
        UnitName: ""
      },
      total: 0,
      params: {
        MaxResultCount: 9,
        SkipCount: 0,
        pageIndex: 1
      },
      model: {
        pass: true,
        ids: ""
      }
    };
  },
  methods: {
    selectionChange(data) {
      this.selectData = data;
    },
    loadData() {
      let params = JSON.parse(JSON.stringify(this.params));
      params.SkipCount = this.SkipCount(
        params.MaxResultCount,
        params.pageIndex
      );
      Object.assign(params, this.searchParams);
      this.loading = true;
      AuditingPageList(this.ClearParams(params))
        .then(res => {
          this.total = res.totalCount;
          this.data = res.items;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    batchAudit() {
      this.model.ids = this.selectData.map(e => e.id);
      this.showModal = true;
    },
    audit() {
      this.modalLoading = true;
      AuditUnitAsync(this.model)
        .then(res => {
          this.$Message.success("审核成功");
          this.loadData();
          this.showModal = false;
        })
        .finally(() => {
          this.modalLoading = false;
        });
    },
    reset() {
      this.searchParams.UnitName = "";
      this.loadData();
    },
    back() {
      let type = this.$route.query.type;
      let query = {};
      if (type) {
        query.type = type;
      }
      query.tabName = "2";
      this.$router.push({
        path: "home",
        query
      });
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
<style lang="less" scoped>
.layout-lr {
  .layout-lr-lc {
    .layout-lr-lch {
      height: 80px;
      line-height: 80px;
      display: flex;
    }
  }
  .layout-lr-lcb {
    padding: 30px;
    position: relative;
    box-sizing: border-box;
  }
}
</style>
