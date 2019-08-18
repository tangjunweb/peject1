<template>
  <span @click="show = true">
    <slot>
      <Button size="large">选择资源</Button>
    </slot>
    <Modal
      v-model="show"
      :title="title"
      :loading="loading"
      transfer
      class-name="blue-modal"
      width="1100px"
    >
      <div class="lhyj-party-member-select-modal">
        <Row>
          <Col :span="24" class="partymember-select">
            <Form inline>
              <LClassic @change="loadData" v-model="searchParams.ResourceClassPath"></LClassic>
              <Row :gutter="30" type="flex">
                <Col>
                  <FormItem label="资源名称" :label-width="80">
                    <Input v-model="searchParams.Name" placeholder="输入资源名称"></Input>
                  </FormItem>
                  <FormItem>
                    <Button style="margin-left:15px;" @click="search" type="primary">搜索</Button>
                  </FormItem>
                </Col>
                <Col></Col>
              </Row>
            </Form>
          </Col>
          <Col :span="24" class="partymember-selecttable">
            <Table
              @on-select-cancel="selectCancel"
              @on-select="selectChange"
              @on-select-all="selectAllChange"
              @on-select-all-cancel="selectAllCancel"
              :show-header="type != 'single'"
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
        <Button :disabled="!selectData.length" :loading="loading" @click="save" type="primary">确认选择</Button>
      </div>
    </Modal>
  </span>
</template>
<script>
import LClassic from "@/components/ui/LClassic";
import { Modal, Checkbox, Form, FormItem, Input, Table, Page } from "iview";
import { GetParentOrganManageResourceList } from "@/api/education";
import OrganizationCascader from "@/components/OrganizationCascader";
import { SkipCount, ClearParams } from "@/mixins";
export default {
  mixins: [SkipCount, ClearParams],
  components: {
    Modal,
    Checkbox,
    OrganizationCascader,
    Form,
    FormItem,
    Input,
    Table,
    Page,
    LClassic
  },
  props: {
    value: {
      type: [String, Number, Array]
    },
    ResourceType: {
      type: [String, Number],
      default: 1
    },
    type: {
      type: String,
      default: "single"
    },
    operation: Object,
    title: {
      type: String,
      default: "选择资源"
    },
    name: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      loading: false,
      tableLoading: false,
      show: false,
      data: [],
      total: 0,
      OrganId: "",
      searchParams: {
        Name: "",
        ResourceClassPath: ""
      },
      params: {
        SkipCount: 0,
        MaxResultCount: 10
      },
      selectData: []
    };
  },
  watch: {
    show(f) {
      if (f) {
        this.loadData();
      } else {
        this.selectData = [];
        this.searchParams = {
          Name: ""
        };
      }
    }
  },
  computed: {
    columns() {
      let columns = [
        {
          type: "selection",
          width: 60
        },
        {
          title: "资源名称",
          key: "name"
        },
        {
          title: "所属党组织",
          width: 300,
          key: "createOrgan"
        },
        {
          title: "学时",
          width: 80,
          render(h, { row }) {
            return h("span", (row.period / 3600).toFixed(1));
          }
        }
      ];
      return columns;
    }
  },
  methods: {
    selectChange(selection, row) {
      if (this.type === "single") {
        let d = JSON.parse(JSON.stringify(this.data));
        d.forEach(e => {
          if (e.id !== row.id) {
            e._checked = false;
          } else {
            e._checked = true;
          }
        });
        this.data = d;
        this.selectData = [row];
      } else {
        selection.forEach(e => {
          if (!this.selectData.some(el => el.id === e.id)) {
            this.selectData.push(e);
          }
        });
      }
    },
    selectCancel(data, row) {
      this.selectData.forEach((e, i) => {
        if (e.id === row.id) {
          this.selectData.splice(i, 1);
        }
      });
    },
    selectAllChange(selection, row) {
      if (this.type === "single") {
        let d = JSON.parse(JSON.stringify(this.data));
        d.forEach(e => {
          if (e.id !== row.id) {
            e._checked = false;
          } else {
            e._checked = true;
          }
        });
        this.data = d;
        this.selectData = [row];
      } else {
        selection.forEach(e => {
          if (!this.selectData.some(el => el.id === e.id)) {
            this.selectData.push(e);
          }
        });
      }
    },
    selectAllCancel(selection, row) {
      this.data.forEach(el => {
        this.selectData.forEach((e, i) => {
          if (el.id == e.id) {
            this.selectData.splice(i, 1);
          }
        });
      });
    },
    loadData() {
      let params = JSON.parse(JSON.stringify(this.params));
      params.SkipCount = this.SkipCount(
        params.MaxResultCount,
        params.pageIndex
      );
      Object.assign(params, this.searchParams);
      this.tableLoading = true;
      console.log(this.ResourceType);
      params.ResourceType = this.ResourceType;
      GetParentOrganManageResourceList(this.ClearParams(params))
        .then(res => {
          this.total = res.totalCount;
          let d = this.selectData.map(e => e.id);
          res.items.forEach(e => {
            if (d.includes(e.id)) {
              e._checked = true;
            }
          });
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
    // reset() {
    //   this.searchParams.Name = "";
    //   this.searchParams.ResourceClassPath = "";
    //   this.params.SkipCount = 0;
    //   this.loadData();
    // },
    save() {
      if (this.type === "single") {
        this.$emit("input", this.selectData[0] || "");
        this.$emit("change", this.selectData[0] || {});
      } else {
        this.$emit("input", this.selectData);
        this.$emit("change", this.selectData);
      }
      this.show = false;
    }
  }
};
</script>

