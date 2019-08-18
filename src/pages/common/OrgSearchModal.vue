<template>
  <span @click="show = true;" class="OrgSearchModal">
    <slot>
      <Button size="large">选择党组织</Button>
    </slot>
    <Modal
      v-model="show"
      title="选择党组织"
      :loading="loading"
      transfer
      class-name="blue-modal"
      width="800px"
    >
      <div class="lhyj-party-member-select-modal">
        <Row>
          <Col :span="24" class="partymember-select">
            <Form :label-width="82" inline>
              <FormItem label="选择党组织">
                <Input v-model="searchParams.OrganizationName" placeholder="输入党组织名称"></Input>
              </FormItem>
              <FormItem :label-width="0">
                <Button style="margin-left:15px;" @click="reset" type="primary">重置</Button>
                <Button
                  style="margin-left:15px;"
                  @click="search"
                  :disabled="!searchParams.OrganizationName.length"
                  type="primary"
                >搜索</Button>
              </FormItem>
            </Form>
          </Col>
          <Col :span="24" class="partymember-selecttable">
            <Table
              @on-select-cancel="selectCancel"
              @on-select="selectChange"
              :show-header="false"
              :loading="tableLoading"
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
          </Col>
        </Row>
      </div>
      <div slot="footer">
        <Button @click="show = false" type="primary">取消</Button>
        <Button :loading="loading" @click="save" type="primary">确认选择</Button>
      </div>
    </Modal>
  </span>
</template>
<script>
import { GetOrgnizationlistByNameAsync } from "@/api/partyMember";
import { Modal, Form, FormItem, Input, Table, Page } from "iview";
import { SkipCount, ClearParams } from "@/mixins";
export default {
  name: "OrgSearchModal",
  mixins: [SkipCount, ClearParams],
  components: {
    Modal,
    Form,
    FormItem,
    Input,
    Table,
    Page
  },
  props: {
    value: {
      type: [Object, String],
      default: ""
    }
  },
  data() {
    let that = this;
    return {
      loading: false,
      tableLoading: false,
      show: false,
      data: [],
      total: 0,
      searchParams: {
        OrganizationName: ""
      },
      params: {
        SkipCount: 0,
        MaxResultCount: 7
      },
      selectData: {},
      columns: [
        {
          type: "selection",
          width: 40
        },
        {
          width: 180,
          key: "organName",
          tooltip: true
        },
        {
          width: 180,
          tooltip: true,
          render(h, { row }) {
            return h(
              "span",
              that.GetCodeTableValue(row.organType, "OrganType")
            );
          }
        },
        {
          key: "organAddress",
          tooltip: true
        }
      ]
    };
  },
  methods: {
    selectChange(selection, row) {
      let d = JSON.parse(JSON.stringify(this.data));
      d.forEach(e => {
        if (e.id !== row.id) {
          e._checked = false;
        } else {
          e._checked = true;
        }
      });
      this.data = d;
      this.selectData = row;
    },
    selectCancel(data, row) {
      this.selectData = {};
    },
    loadData() {
      let params = JSON.parse(JSON.stringify(this.params));
      params.SkipCount = this.SkipCount(
        params.MaxResultCount,
        params.pageIndex
      );
      Object.assign(params, this.searchParams);
      this.tableLoading = true;
      GetOrgnizationlistByNameAsync(this.ClearParams(params))
        .then(res => {
          this.total = res.totalCount;
          this.data = res.items;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    search() {
      this.params.SkipCount = 0;
      this.loadData();
    },
    reset() {
      this.searchParams.OrganizationName = "";
      this.params.SkipCount = 0;
      this.total = 0;
      this.data = 0;
    },
    save() {
      this.$emit("input", this.selectData.id || "");
      this.$emit("change", this.selectData || {});
      this.show = false;
    }
  }
};
</script>

