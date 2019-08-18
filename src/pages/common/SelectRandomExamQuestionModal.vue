<template>
  <span @click="show=true">
    <slot></slot>
    <Modal
      v-model="show"
      title="添加随机试题"
      :closable="false"
      :mask-closable="false"
      transfer
      width="1000px"
      class-name="blue-modal seqm-modal"
    >
      <Row :gutter="15" class="seqm-row scroll-box scroll">
        <Col :span="24" class="seqm-h">
          <Input
            size="large"
            style="width:100%"
            placeholder="请输入题库名称"
            v-model="searchParams.LibaryName"
          >
            <Button size="large" @click="loadData" slot="append">搜索</Button>
          </Input>
        </Col>
        <Col :span="24">
          <Alert type="info" show-icon>请选择试题</Alert>
        </Col>
        <Col :span="24">
          <Table
            @on-select-cancel="selectCancel"
            @on-selection-change="selectChange"
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
        <Col :span="24" style="margin-top:15px">
          <div class="ivu-table-wrapper">
            <div class="ivu-table ivu-table-default ivu-table-border ivu-table-stripe">
              <div class="ivu-table-body">
                <Alert type="success" show-icon>
                  已选单选题
                  <span class="seqm-num">{{sn}}</span>道,多选题
                  <span class="seqm-num">{{mn}}</span>道,判断题
                  <span class="seqm-num">{{jn}}</span>道
                </Alert>
                <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
                  <thead>
                    <tr>
                      <th>
                        <div class="ivu-table-cell">
                          <span class>题库</span>
                        </div>
                      </th>
                      <th>
                        <div class="ivu-table-cell">
                          <span class>单选题</span>
                        </div>
                      </th>
                      <th>
                        <div class="ivu-table-cell">
                          <span class>多选题</span>
                        </div>
                      </th>
                      <th>
                        <div class="ivu-table-cell">
                          <span class>判断题</span>
                        </div>
                      </th>
                      <th width="70px">
                        <div class="ivu-table-cell">
                          <span class>操作</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="ivu-table-tbody">
                    <tr class="ivu-table-row" v-for="(el,i) in selectData" :key="i">
                      <td>
                        <div class="ivu-table-cell">
                          <span>{{el.libaryName}}</span>
                        </div>
                      </td>
                      <td>
                        <div class="ivu-table-cell">
                          <InputNumber v-model="el.singleChoiceCount" :min="0"></InputNumber>
                        </div>
                      </td>
                      <td>
                        <div class="ivu-table-cell">
                          <InputNumber v-model="el.multiChoiceCount" :min="0"></InputNumber>
                        </div>
                      </td>
                      <td>
                        <div class="ivu-table-cell">
                          <InputNumber v-model="el.jugeCount" :min="0"></InputNumber>
                        </div>
                      </td>
                      <td>
                        <div class="ivu-table-cell">
                          <Icon @click="del(i)" type="ios-trash" :size="18"/>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <div slot="footer">
        <Button type="primary" :loading="loading" @click="sure">确定</Button>
        <Button type="primary" @click="cancel">关闭</Button>
      </div>
    </Modal>
  </span>
</template>
<script>
import { Modal, Form, FormItem, Table, Page, Input, InputNumber } from "iview";
import { GetPageExamLibaryList } from "@/api/education";
import { SkipCount, ClearParams } from "@/mixins";
export default {
  mixins: [SkipCount, ClearParams],
  components: {
    Modal,
    Form,
    FormItem,
    Table,
    Page,
    Input,
    InputNumber
  },
  data() {
    return {
      loading: false,
      show: false,
      total: 0,
      searchParams: {
        LibaryName: ""
      },
      params: {
        MaxResultCount: 9,
        SkipCount: 0,
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
          key: "libaryName"
        },
        {
          title: "党组织",
          key: "organName"
        }
      ],
      selectData: []
    };
  },
  watch: {
    show(n) {
      if (n) {
        this.loadData();
      }
    }
  },
  computed: {
    sn() {
      let n = 0;
      this.selectData.forEach(e => {
        n += e.singleChoiceCount;
      });
      return n;
    },
    mn() {
      let n = 0;
      this.selectData.forEach(e => {
        n += e.multiChoiceCount;
      });
      return n;
    },
    jn() {
      let n = 0;
      this.selectData.forEach(e => {
        n += e.jugeCount;
      });
      return n;
    }
  },
  methods: {
    del(i) {
      this.selectData.splice(i, 1);
      let d = JSON.parse(JSON.stringify(this.data));
      let d2 = this.selectData.map(e => e.libaryId);
      d.forEach(e => {
        if (d2.includes(e.id)) {
          e._checked = true;
        } else {
          e._checked = false;
        }
      });
      this.data = d;
    },
    loadData() {
      let params = JSON.parse(JSON.stringify(this.params));
      params.SkipCount = this.SkipCount(
        params.MaxResultCount,
        params.pageIndex
      );
      Object.assign(params, this.searchParams);
      this.loading = true;
      GetPageExamLibaryList(this.ClearParams(params))
        .then(res => {
          this.total = res.totalCount;
          this.data = res.items;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    selectChange(data) {
      data.forEach(e => {
        if (!this.selectData.some(el => el.libaryId === e.id)) {
          let obj = {
            libaryId: e.id,
            singleChoiceCount: 0,
            multiChoiceCount: 0,
            jugeCount: 0,
            libaryName: e.libaryName
          };
          this.selectData.push(obj);
        }
      });
    },
    selectCancel(select, row) {
      this.selectData = this.selectData.filter(e => {
        return e.libaryId !== row.id;
      });
    },
    cancel() {
      this.show = false;
    },
    sure() {
      this.$emit(
        "change",
        this.selectData.map(e => {
          return {
            libaryId: e.libaryId,
            singleChoiceCount: e.singleChoiceCount,
            multiChoiceCount: e.multiChoiceCount,
            jugeCount: e.jugeCount
          };
        })
      );
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
  color: #ffd74f;
  margin: 0 5px;
}
.sqm-list-box {
  height: 300px;
  overflow-y: auto;
}
</style>


