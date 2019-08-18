<template>
  <span @click="show = true">
    <slot>
      <Button size="large">选择单位</Button>
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
            <Form inline>
              <FormItem label="单位名称" :label-width="80">
                <Input placeholder="请输入单位名称" v-model="searchParams.UnitName"></Input>
              </FormItem>
              <FormItem label="单位类别" :label-width="80">
                <common-select
                  size="default"
                  keys="UnitNatrueType"
                  v-model="searchParams.UnitNatrueType"
                ></common-select>
              </FormItem>
              <FormItem :label-width="0">
                <Button @click="reset" type="primary" ghost>重置</Button>
                <Button @click="search" type="primary" ghost style="margin-left:10px;">搜索</Button>
                <Button @click="$router.push('/information/organization/createunit?type=all')" v-if="auth('/information/organization/createunit')" type="primary" ghost style="margin-left:10px;">新增单位</Button>
              </FormItem>
            </Form>
          </Col>
          <Col :span="7">
            <div class="party-member-right">
              <div class="party-member-head">
                <span class="party-member-hc">已选择单位</span>
                <span class="party-member-hr">{{selectData.length}}</span>
              </div>
              <div class="party-member-list-scroll">
                <div class="party-member-list scroll">
                  <div class="party-member-list-item" v-for="(el,i) in selectData" :key="i">
                    <Row :gutter="15">
                      <Col :span="20">{{el.unitName}}</Col>
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
import { UnitPageList } from "@/api/partyOrganizationService";
import { SkipCount, ClearParams, Auth } from "@/mixins";
import CommonSelect from "@/components/CommonSelect";
export default {
  mixins: [SkipCount, ClearParams, Auth],
  components: {
    Modal,
    Form,
    FormItem,
    Input,
    Table,
    Page,
    CommonSelect
  },
  props: {
    value: {
      type: [String, Number, Array]
    },
    type: {
      type: String,
      default: "single"
    },
    title: {
      type: String,
      default: "选择单位"
    }
  },
  data() {
    return {
      loading: false,
      tableLoading: false,
      show: false,
      data: [],
      total: 0,
      searchParams: {
        UnitName: "",
        UnitNatrueType: ""
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
          width: 40
        },
        {
          key: "unitName",
          tooltip: true
        },
        {
          key: "createdOrganName",
          tooltip: true
        }
      ];
      return columns;
    }
  },
  methods: {
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
      UnitPageList(this.ClearParams(params))
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
      this.searchParams.UnitName = "";
      this.searchParams.UnitNatrueType = "";
      this.params.SkipCount = 0;
      this.loadData();
    },
    save() {
      if (this.type === "single") {
        this.$emit("input", this.selectData[0].id || "");
        this.$emit("change", this.selectData[0] || {});
      } else {
        this.$emit("input", this.selectData.map(e => e.id));
        this.$emit("change", this.selectData);
      }
      this.show = false;
    }
  }
};
</script>

<style lang="less">
</style>
