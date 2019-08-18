<template>
  <span @click="showModel">
    <slot>
      <Button size="large">选择文件</Button>
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
          <Col :span="18" class="partymember-select">
            <Form :label-width="60">
              <Row :gutter="30">
                <Col :span="24">
                  <LClassic @change="loadData" v-model="searchParams.ResourceClassPath"></LClassic>
                </Col>
                <Col :span="12">
                  <FormItem label="文件名">
                    <Input v-model="searchParams.Name" placeholder="输入文件名"></Input>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col :span="6" style="margin-top:43px">
            <Button @click="reset" type="primary">重置</Button>
            <Button style="margin-left:15px;" @click="search" type="primary">搜索</Button>
          </Col>
          <Col :span="7">
            <div class="party-member-right">
              <div class="party-member-head">
                <div class="party-member-hc">已选择文件</div>
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
              @on-select-all="selectAllChange"
              @on-select-all-cancel="selectAllCancel"
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
import {
  GetOrganManageResourceList,
  GetChildOrganResourceList,
  GetUserViewResourceList
} from "@/api/education";
import LClassic from "@/components/ui/LClassic";
import { SkipCount, ClearParams } from "@/mixins";
export default {
  mixins: [SkipCount, ClearParams],
  components: {
    Modal,
    Checkbox,
    Form,
    FormItem,
    Input,
    Table,
    Page,
    LClassic
  },
  props: {
    value: {
      type: [String, Number, Array],
      default: []
    },
    type: {
      type: String,
      default: "single"
    },
    operation: Object,
    title: {
      type: String,
      default: "选择文件"
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
      searchParams: {
        ResourceType: 4,
        ResourceClassPath: "",
        OrganPath: "",
        AuditStatus: "",
        Name: ""
      },
      params: {
        SkipCount: 0,
        MaxResultCount: 7
      },
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
    selectData() {
      return this.value;
    },
    isParty() {
      return this.$store.state.systemType == 'user';
    },
    columns() {
      let columns = [
        {
          type: "selection",
          width: 60
        },
        {
          key: "name",
          title: "文件名"
        },
        {
          title: "党组织",
          key: "createOrgan"
        },
        {
          title: "学时",
          key: "period"
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
    loadData() {
      this.loading = true;
      let params = JSON.parse(JSON.stringify(this.params));
      params.SkipCount = this.SkipCount(
        params.MaxResultCount,
        params.pageIndex
      );
      Object.assign(params, this.searchParams);
      let fn;
      if (this.isParty) {
        fn = GetUserViewResourceList;
      } else {
        fn = this.organId
          ? GetChildOrganResourceList
          : GetOrganManageResourceList;
      }
      fn(this.ClearParams(params))
        .then(res => {
          this.data = res.items;
          let d = this.selectData.map(e => e.id);
          res.items.forEach(e => {
            if (d.includes(e.id)) {
              e._checked = true;
            }
          });
          this.total = res.totalCount;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    search() {
      this.params.SkipCount = 0;
      this.loadData();
    },
    reset() {
      this.organId = "";
      this.searchParams.Name = "";
      this.params.SkipCount = 0;
      this.loadData();
    },
    save() {
      if (this.type === "single") {
        this.$emit("change", this.selectData[0] || {});
      } else {
        this.$emit("change", this.selectData);
      }
      this.show = false;
    }
  }
};
</script>
