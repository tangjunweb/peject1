<template>
  <span @click="showModel">
    <slot>
      <Button size="large">选择直播</Button>
    </slot>
    <Modal
      v-model="show"
      :title="title"
      :loading="loading"
      transfer
      class-name="blue-modal"
      width="800px"
    >
      <div class="lhyj-party-member-select-modal">
        <Row>
          <Col :span="24" class="partymember-select">
            <Form>
              <Row :gutter="30" type='flex'>
                <Col>
                  <FormItem label="姓名或电话关键字" :label-width="100">
                    <Input v-model="searchParams.Keyword" placeholder="输入姓名或电话关键字"></Input>
                  </FormItem>
                </Col>
                <Col>
                  <Button
                    @click="reset"
                    type="primary"
                  >重置</Button>
                  <Button style="margin-left:15px;" @click="search" type="primary">搜索</Button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col :span="7">
            <div class="party-member-right">
              <div class="party-member-head">
                <div class="party-member-hc">已选择管理员</div>
                <div class="party-member-hr">{{selectData.length}}</div>
              </div>
              <div class="party-member-list-scroll">
                <div class="party-member-list scroll">
                  <div class="party-member-list-item" v-for="(el,i) in selectData" :key="i">
                    <Row :gutter="15">
                      <Col :span="20">{{el.name}}</Col>
                      <Col :span="4" class="text-right">
                        <Icon size='18' @click="del(i)" type="ios-trash-outline"/>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col :span="16" :offset="1" class="partymember-selecttable">
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
        <Button :disabled="!selectData.length" :loading="loading" @click="save" type="primary">确认选择</Button>
      </div>
    </Modal>
  </span>
</template>
<script>
import { Modal, Checkbox, Form, FormItem, Input, Table, Page } from "iview";
import { AdminPageList } from "@/api";
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
    Page
  },
  props: {
    value: {
      type: [String, Number, Array]
    },
    showOrgan: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: "single"
    },
    operation: Object,
    title: {
      type: String,
      default: "选择管理员"
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
        Keyword: ""
      },
      params: {
        SkipCount: 0,
        MaxResultCount: 7
      },
      selectData: []
    };
  },
  watch: {
    show(f) {
      if (f) {
        this.loadData();
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
          key: "name"
        },
        {
          key: "phoneNumber"
        }
      ];
      if (this.operation) {
        columns.push(this.operation);
      }
      return columns;
    }
  },
  methods: {
    showModel() {
      this.show = true;
      if (this.type == "single") {
        if (this.value) {
          this.selectData = [
            {
              id: this.value,
              name: this.name
            }
          ];
        } else {
          this.selectData = [];
        }
      } else {
        this.selectData = this.value;
      }
    },
    del(i) {
      this.selectData.splice(i, 1);
      let d = JSON.parse(JSON.stringify(this.data));
      let d2 = this.selectData.map(e => e.id);
      d.forEach(e => {
        if (d2.includes(e.id)) {
          e._checked = true;
        } else {
          e._checked = false;
        }
      });
      this.data = d;
    },
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
    loadData() {
      let params = JSON.parse(JSON.stringify(this.params));
      params.SkipCount = this.SkipCount(
        params.MaxResultCount,
        params.pageIndex
      );
      Object.assign(params, this.searchParams);
      this.tableLoading = true;
      if (!params.OrganPath) {
        params.OrganPath = this.$store.state.session.organPath;
      }
      AdminPageList(this.ClearParams(params))
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
    reset() {
      this.searchParams.Keyword = "";
      this.params.SkipCount = 0;
      this.loadData();
    },
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

