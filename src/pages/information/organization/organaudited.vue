<!-- 待审核党组织 -->
<template>
  <div class="layout-lr">
    <TopCountTipsCard title="待审核党组织" :count="total" subTitle="当前共有"></TopCountTipsCard>
    <Form :label-width="100" inline>
      <FormItem label="党组织名称">
        <Input placeholder="请输入党组织名称" v-model="searchParams.OrganizationName"></Input>
      </FormItem>
      <FormItem :label-width="0">
        <Button @click="loadData" style="margin-right:15px;" type="primary">搜索</Button>
        <Button @click="reset" style="margin-right:15px;" type="primary">重置</Button>
        <Button :disabled="selectData.length===0" style="margin-right:15px;" @click="batchAudit" type="error">批量审核</Button>
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
      title="审核党组织"
      :closable="false"
      transfer
      :mask-closable="false"
      :loading="modalLoading"
      width="500px"
      class-name="blue-modal"
    >
      <Form ref="form" :rules="rules" :model="model">
        <FormItem label="审核结果" prop="auditStatus">
          <common-select keys="CommAuditStatus" v-model="model.auditStatus"></common-select>
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
import { Form, FormItem, Input, Page, Table, Modal, Card } from "iview";
import { SkipCount, ClearParams } from "@/mixins";
import CommonSelect from "@/components/CommonSelect";
import {
  GetOrgnizationlistByFilterAsync,
  AuditPartyOrgnization
} from "@/api/partyOrganizationService";
export default {
  mixins: [SkipCount, ClearParams],
  components: {
    Form,
    FormItem,
    Page,
    Table,
    Input,
    TopCountTipsCard,
    Card,
    Modal,
    CommonSelect
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
          title: "组织名称",
          key: "organName",
          tooltip: true
        },
        {
          title: "所属上级党组织",
          key: "parentOrgnization"
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
          width: 150,
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
                        path: "organinfo",
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
                      that.model.organIdList = [row.id];
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
        OrganizationName: ""
      },
      total: 0,
      params: {
        MaxResultCount: 9,
        SkipCount: 0,
        pageIndex: 1,
        AuditStatus: 0
      },
      model: {
        auditStatus: "",
        organIdList: []
      },
      rules: {
        auditStatus: [
          {
            required: true,
            trigger: "change",
            message: "请选择审核状态"
          }
        ]
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
      GetOrgnizationlistByFilterAsync(this.ClearParams(params))
        .then(res => {
          this.total = res.totalCount;
          this.data = res.items;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    batchAudit() {
      this.model.organIdList = this.selectData.map(e => e.id);
      this.showModal = true;
    },
    audit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.modalLoading = true;
          AuditPartyOrgnization(this.model)
            .then(res => {
              this.$Message.success("审核成功");
              this.loadData();
              this.showModal = false;
            })
            .finally(() => {
              this.modalLoading = false;
            });
        }
      });
    },
    reset() {
      this.searchParams.OrganizationName = "";
      this.loadData();
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
      display: flex;
      height: 80px;
      line-height: 80px;
    }
  }
  .layout-lr-lcb {
    padding: 30px;
    position: relative;
    box-sizing: border-box;
  }
}
</style>
