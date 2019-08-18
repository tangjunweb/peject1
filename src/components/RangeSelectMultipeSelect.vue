<template>
  <span @click="showModel" class="range-select">
    <slot>
      <Button size="large">选择党员</Button>
    </slot>
    <Modal
      v-model="show"
      :title="title"
      :loading="loading"
      transfer
      class-name="blue-modal"
      width="800px"
      @on-visible-change="modelChange"
    >
      <div class="lhyj-party-member-select-modal">
        <Tabs :animated="false" @on-click="handleTabClick">
          <TabPane label="管理员"></TabPane>
          <TabPane label="党员"></TabPane>
        </Tabs>
        <Row type='flex' justify='space-between'>
          <Col :span="18" class="partymember-select">
            <Form :label-width="60">
              <Row :gutter="30" type="flex">
                <Col :span="12" v-show="tabIndex == 1">
                  <FormItem label="党组织">
                    <OrganizationCascader
                      :label="organName"
                      @change="organChange"
                      size="default"
                      v-model="OrganId"
                    ></OrganizationCascader>
                  </FormItem>
                </Col>
                <Col :span="12">
                  <FormItem label="姓名">
                    <Input v-model="searchParams.Name" placeholder="输入姓名"></Input>
                  </FormItem>
                </Col>
                <Col :span="12" v-if="tabIndex == 1 && isIntranet">
                  <FormItem label="身份证">
                    <Input v-model="searchParams.IdCard" placeholder="输入身份证"></Input>
                  </FormItem>
                </Col>
                <Col :span="12">
                  <FormItem label="职务" v-if="tabIndex == 1 && isIntranet">
                    <common-select
                      size="default"
                      keys="PartyDutyCode"
                      v-model="searchParams.PartyDutyCodes"
                    ></common-select>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col>
            <Button @click="reset" type="primary">重置</Button>
            <Button style="margin-left:15px;" @click="search" type="primary">搜索</Button>
          </Col>
          <Col :span="7">
            <div class="party-member-right">
              <div class="party-member-head">
                <div class="party-member-hc">已选择用户</div>
                <div class="party-member-hr">{{selectData.length}}</div>
              </div>
              <div class="party-member-list-scroll">
                <div class="party-member-list scroll">
                  <div class="party-member-list-item" v-for="(el,i) in selectData" :key="i">
                    <Row :gutter="15">
                      <Col :span="20">{{el.name}}</Col>
                      <Col :span="4" class="text-right">
                        <Icon size='18' @click="del(i)" type="ios-trash-outline" />
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
              @on-select-all="selectAllChange"
              @on-select-all-cancel="selectAllCancel"
              :loading="tableLoading"
              :columns="columns"
              :data="data"
            ></Table>
            <div class="text-right" style="padding:30px 0 0 0">
              <page-extend
                :current-page.sync="params.PageIndex"
                :total="total"
                :resetTotal.sync="resetTotal"
                :finishState="tableLoading"
                :page-size="params.MaxResultCount"
                class-name="lhyj-page"
              />
            </div>
          </Col>
        </Row>
      </div>
      <div slot="footer">
        <!-- <Button @click="show = false" type="primary">取消</Button> -->
        <Button :disabled="!selectData.length" :loading="loading" @click="save" type="primary">确认选择</Button>
      </div>
    </Modal>
  </span>
</template>
<script>
import {
  Modal,
  Checkbox,
  Form,
  FormItem,
  Input,
  Table,
  Page,
  Tabs,
  TabPane
} from "iview";
import { SearchPageList } from "@/api/partyMember";
import { AdminPageList } from "@/api";
import PageExtend from "@/components/PageExtend/PageExtend";
import OrganizationCascader from "@/components/OrganizationCascader";
import { SkipCountExtend, ClearParams } from "@/mixins";
import CommonSelect from "@/components/CommonSelect";
export default {
  mixins: [SkipCountExtend, ClearParams],
  components: {
    Modal,
    Checkbox,
    OrganizationCascader,
    Form,
    FormItem,
    Input,
    Table,
    PageExtend,
    Tabs,
    TabPane,
    CommonSelect
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
    title: {
      type: String,
      default: "选择党员"
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
        Keyword: "",
        OrganPath: "",
        Name: "",
        IdCard: "",
        PartyDutyCodes: ""
      },
      params: {
        SkipCount: 0,
        MaxResultCount: 10
      },
      selectData: [],
      tabIndex: 0,
      columns: [
        {
          type: "selection",
          width: 60
        },
        {
          key: "name",
          title: "姓名"
        },
        {
          key: "organName",
          tooltip: true,
          title: "所属组织"
        }
      ]
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
    organName() {
      return this.$store.state.session.organName;
    },
    isIntranet() {
      return this.$store.state.session.isIntranet;
    }
  },
  methods: {
    showModel() {
      this.show = true;
      this.selectData = this.value;
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
    organChange(organ) {
      this.searchParams.OrganPath = organ.path;
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
    handleTabClick(v) {
      this.tabIndex = v;
      this.reset();
    },
    loadData() {
      let params = JSON.parse(JSON.stringify(this.params));
      params.SkipCount = this.SkipCount(
        params.MaxResultCount,
        params.PageIndex
      );
      if (params.PageIndex == 1) {
        delete params.LastId;
      }
      Object.assign(params, this.searchParams);
      this.tableLoading = true;
      if (!params.OrganPath) {
        params.OrganPath = this.$store.state.session.organPath;
      }
      if (this.tabIndex == 0) {
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
            this.params.LastId = res.lastId;
          })
          .finally(() => {
            this.tableLoading = false;
          });
      } else {
        SearchPageList(this.ClearParams(params))
          .then(res => {
            this.total = res.totalCount;
            let d = this.selectData.map(e => e.id);
            res.items.forEach(e => {
              if (d.includes(e.id)) {
                e._checked = true;
              }
            });
            this.data = res.items;
            this.params.LastId = res.lastId;
          })
          .finally(() => {
            this.tableLoading = false;
          });
      }
    },
    search() {
      this.params.SkipCount = 0;
      this.resetTotal = true;
      this.loadData();
    },
    reset() {
      this.searchParams.OrganPath = "";
      this.OrganId = "";
      this.searchParams.Name = "";
      this.searchParams.IdCard = "";
      this.searchParams.PartyDutyCodes = "";
      this.params.SkipCount = 0;
      this.params.PageIndex = 1;
      this.total = 0;
      this.resetTotal = true;
      this.loadData();
    },
    save() {
      if (this.type === "single") {
        this.$emit("input", this.selectData[0].id || "");
        this.$emit("change", this.selectData[0] || {});
      } else {
        this.$emit("input", this.selectData);
        this.$emit("change", this.selectData);
      }
      this.show = false;
    },
    modelChange(v) {
      if (!v) {
        this.$emit("input", this.selectData);
        this.$emit("change", this.selectData);
      }
    }
  }
};
</script>