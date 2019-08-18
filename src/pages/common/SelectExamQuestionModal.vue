<template>
  <span @click="show=true">
    <slot></slot>
    <Modal
      v-model="show"
      title="添加自定义试题"
      :closable="false"
      :mask-closable="false"
      transfer
      width="1200px"
      class-name="blue-modal seqm-modal"
    >
      <Row :gutter="15" class="seqm-row modal-scroll scroll">
        <Col :span="24" class="seqm-h">
          <Row :gutter="15">
            <Col :span="3" class="text-right" style="line-height:36px">选择题库</Col>
            <Col :span="7">
              <Select
                transfer
                size="large"
                filterable
                remote
                :remote-method="remoteMethod"
                :loading="loading2"
                placeholder="搜索题库"
                v-model="searchParams.LibaryId"
              >
                <Option v-for="(el,i) in libList" :key="i" :value="el.id">{{el.libaryName}}</Option>
              </Select>
            </Col>
            <Col :span="3" class="text-right" style="line-height:36px">选择试题类型</Col>
            <Col :span="7">
              <common-select
                style="width:50%"
                size="large"
                keys="EnumExamQuestionType"
                v-model="searchParams.Type"
              ></common-select>
            </Col>
            <Col :span="4">
              <Button @click="loadData" type="primary" ghost>搜索</Button>
            </Col>
          </Row>
        </Col>
        <Col :span="12">
          <Alert show-icon type="success">
            已选单选题
            <span class="seqm-num">{{sn}}</span>道,多选题
            <span class="seqm-num">{{mn}}</span>道,判断题
            <span class="seqm-num">{{jn}}</span>道
          </Alert>
          <Table stripe border :columns="columns2" :data="data2"></Table>
          <div class="text-right" style="padding:30px 0 0 0">
            <Page
              :current.sync="params2.pageIndex"
              :total="selectData.length"
              :page-size="params2.MaxResultCount"
              class-name="lhyj-page"
            />
          </div>
        </Col>
        <Col :span="12">
          <Alert show-icon type="info">
            共
            <span class="seqm-num">{{total}}</span>道
          </Alert>
          <Table
            @on-select-cancel="selectCancel"
            @on-selection-change="selectChange"
            @on-select-all="selectAllChange"
            @on-select-all-cancel="selectAllCancel"
            :show-header="true"
            :loading="loading"
            stripe
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
        </Col>
      </Row>
      <div slot="footer">
        <Button type="primary" :loading="loading" @click="sure" ghost>确定</Button>
        <Button type="primary" @click="cancel" ghost>关闭</Button>
      </div>
    </Modal>
  </span>
</template>
<script>
import { Modal, Form, FormItem, Select, Option, Table, Page } from "iview";
import {
  GetPageQuestionByLibaryId,
  GetPageExamLibaryList
} from "@/api/education";

import CommonSelect from "@/components/CommonSelect";
import { SkipCount, ClearParams } from "@/mixins";
export default {
  name: "SelectExamQuestionModal",
  mixins: [SkipCount, ClearParams],
  props: {
    value: {
      type: [Array],
      default() {
        return [];
      }
    }
  },
  components: {
    Modal,
    Form,
    FormItem,
    Select,
    Option,
    Table,
    Page,
    CommonSelect
  },
  data() {
    let that = this;
    return {
      interval: null,
      loading: false,
      loading2: false,
      show: false,
      libList: [],
      total: 0,
      searchParams: {
        Type: "",
        LibaryId: ""
      },
      params: {
        MaxResultCount: 4,
        SkipCount: 0,
        pageIndex: 1
      },
      params2: {
        MaxResultCount: 4,
        pageIndex: 1
      },
      data: [],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "标题",
          key: "title",
          tooltip: true
        },
        {
          title: "试题类型",
          tooltip: true,
          render(h, { row }) {
            return h(
              "span",
              that.GetCodeTableValue(row.type, "EnumExamQuestionType")
            );
          }
        }
      ],
      columns2: [
        {
          title: "标题",
          key: "title",
          tooltip: true
        },
        {
          title: "操作",
          width: 100,
          align: "center",
          render(h, { row }) {
            return h("Icon", {
              props: {
                type: "ios-trash-outline"
              },
              on: {
                click() {
                  that.selectData = that.selectData.filter(e => {
                    return e.id !== row.id;
                  });
                  let d = JSON.parse(JSON.stringify(that.data));
                  let d2 = that.selectData.map(e => e.id);
                  d.forEach(e => {
                    if (d2.includes(e.id)) {
                      e._checked = true;
                    } else {
                      e._checked = false;
                    }
                  });
                  that.data = d;
                }
              }
            });
          }
        }
      ],
      selectData: []
    };
  },
  computed: {
    sn() {
      return this.selectData.filter(e => e.type === 1).length;
    },
    mn() {
      return this.selectData.filter(e => e.type === 2).length;
    },
    jn() {
      return this.selectData.filter(e => e.type === 3).length;
    },
    data2() {
      let start = (this.params2.pageIndex - 1) * this.params2.MaxResultCount;
      let end = this.params2.pageIndex * this.params2.MaxResultCount;
      return this.selectData.slice(start, end);
    }
  },
  watch: {
    show(n) {
      if (n) {
        if (this.value.length) {
          this.selectData = JSON.parse(JSON.stringify(this.value)).map(e => {
            return {
              title: e.questionTitle || e.title,
              questionId: e.questionId,
              type: e.questionType || e.type
            };
          });
        }
        this.loadData();
      }
    }
  },
  methods: {
    loadData() {
      let params = JSON.parse(JSON.stringify(this.params));
      params.SkipCount = this.SkipCount(
        params.MaxResultCount,
        params.pageIndex
      );
      Object.assign(params, this.searchParams);
      this.loading = true;
      GetPageQuestionByLibaryId(this.ClearParams(params))
        .then(res => {
          this.total = res.totalCount;
          let d = this.selectData.map(e => e.questionId);
          res.items.forEach(e => {
            if (d.includes(e.questionId)) {
              e._checked = true;
            }
          });
          this.data = res.items;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    remoteMethod(query) {
      if (this.interval) {
        clearTimeout(this.interval);
        this.interval = null;
      }
      this.interval = setTimeout(() => {
        if (query !== "") {
          this.loading2 = true;
          GetPageExamLibaryList({
            LibaryName: query,
            MaxResultCount: 9,
            SkipCount: 0
          })
            .then(res => {
              this.libList = res.items;
            })
            .finally(() => {
              this.loading2 = false;
            });
        } else {
          this.libList = [];
        }
        clearTimeout(this.interval);
        this.interval = null;
      }, 1000);
    },
    selectChange(data) {
      data.forEach(e => {
        if (!this.selectData.some(el => el.questionId === e.questionId)) {
          this.selectData.push(e);
        }
      });
    },
    selectAllChange(selection, row) {
      selection.forEach(e => {
        if (!this.selectData.some(el => el.id === e.id)) {
          this.selectData.push(e);
        }
      });
    },
    selectAllCancel(selection, row) {
      this.data.forEach(el => {
        this.selectData.forEach((e, i) => {
          if (el.questionId == e.questionId) {
            this.selectData.splice(i, 1);
          }
        });
      });
    },
    selectCancel(data, row) {
      this.selectData.forEach((e, i) => {
        if (e.questionId === row.questionId) {
          this.selectData.splice(i, 1);
        }
      });
    },
    cancel() {
      this.show = false;
    },
    sure() {
      this.$emit("change", this.selectData);
      this.show = false;
    }
  }
};
</script>
<style lang="less">
.seqm-modal.blue-modal .ivu-modal-body {
  padding-top: 10px;
}
.seqm-h {
  margin-bottom: 15px;
}
.seqm-num {
  margin: 0 5px;
}
</style>


