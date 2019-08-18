<template>
  <span @click="showModal">
    <slot>
      <Button size="large">选择上课地点</Button>
    </slot>
    <Modal
      v-model="show"
      title="选择上课地点"
      :loading="loading"
      transfer
      class-name="blue-modal"
      width="800px"
    >
      <div class="lhyj-party-member-select-modal">
        <Row>
          <Col :span="24">
            <Tabs class="lhyj-tabs" v-model="tabName">
              <TabPane label="基地" name="site"></TabPane>
              <TabPane label="院校" name="university"></TabPane>
              <TabPane label="基层“微党校”" name="school"></TabPane>
            </Tabs>
          </Col>
          <Col :span="24" class="partymember-select">
            <Form :label-width="82" inline>
              <FormItem label="基地名称" v-if="tabName=='site'">
                <Input v-model="searchParams.Name" placeholder="输入基地名称"></Input>
              </FormItem>
              <FormItem label="院校名称" v-if="tabName=='university'">
                <Input v-model="searchParams.SchoolName" placeholder="输入院校名称"></Input>
              </FormItem>
              <FormItem label="微党校名称" v-if="tabName=='school'">
                <Input v-model="searchParams.Name" placeholder="输入微党校名称"></Input>
              </FormItem>
              <FormItem :label-width="0">
                <Button style="margin-left:15px;" @click="reset" type="primary">重置</Button>
                <Button style="margin-left:15px;" @click="search" type="primary">搜索</Button>
              </FormItem>
            </Form>
          </Col>
          <Col :span="7">
            <div class="party-member-right">
              <div class="party-member-head">
                <div class="party-member-hc">已选择上课地点</div>
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
import {
  PageListEduSiteVisibleAsync,
  PartySchoolServicePageListAsync,
  GetMicroPartySchoolList
} from "@/api/education";
import {
  Modal,
  Checkbox,
  Form,
  FormItem,
  Input,
  Table,
  Page,
  TabPane,
  Tabs
} from "iview";
import { SkipCount, ClearParams } from "@/mixins";
export default {
  mixins: [SkipCount, ClearParams],
  components: {
    Modal,
    Checkbox
  },
  components: {
    Modal,
    Checkbox,
    Form,
    FormItem,
    Input,
    Table,
    Page,
    TabPane,
    Tabs
  },
  props: {
    value: {
      type: [Object]
    },
    type: {
      type: String,
      default: "single"
    }
  },
  computed: {
    belongType() {
      if (this.tabName == "site") {
        return 0;
      } else if (this.tabName == "university") {
        return 1;
      } else {
        return 2;
      }
    }
  },
  data() {
    let that = this;
    return {
      loading: false,
      tableLoading: false,
      show: false,
      tabName: "site",
      data: [],
      total: 0,
      searchParams: {
        Name: ""
      },
      params: {
        SkipCount: 0,
        MaxResultCount: 7
      },
      selectData: [],
      columns: [
        {
          type: "selection",
          width: 60
        },
        {
          render(h, { row }) {
            if (that.tabName == "site") {
              return h("span", row.baseName);
            } else if (that.tabName == "university") {
              return h("span", row.schoolName);
            } else {
              return h("span", row.microName);
            }
          }
        }
      ]
    };
  },
  watch: {
    tabName() {
      this.loadData();
    }
  },
  methods: {
    showModal() {
      this.show = true;
      if (this.value.length || Object.keys(this.value).length != 0) {
        if (this.type == "single") {
          this.selectData = [this.value];
        }
      }
      this.loadData();
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
        this.selectData = [
          {
            name: row.baseName || row.schoolName || row.microName,
            id: row.id
          }
        ];
      } else {
        selection.forEach(e => {
          if (!this.selectData.some(el => el.id === e.id)) {
            this.selectData.push({ e });
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
      let fn;
      if (this.tabName == "site") {
        fn = PageListEduSiteVisibleAsync;
      } else if (this.tabName == "university") {
        fn = PartySchoolServicePageListAsync;
      } else {
        fn = GetMicroPartySchoolList;
      }
      fn(this.ClearParams(params))
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
      this.searchParams.Name = "";
      this.params.SkipCount = 0;
      this.loadData();
    },
    save() {
      let rt = this.selectData.map(e => {
        return {
          name: e.name || e.baseName || e.schoolName || e.microName,
          id: e.id,
          type: this.belongType
        };
      });
      if (this.type === "single") {
        this.$emit("input", rt[0] || {});
        this.$emit("change", rt[0] || {});
      }
      this.show = false;
    }
  }
};
</script>
