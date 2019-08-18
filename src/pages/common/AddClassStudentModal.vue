<template>
  <span @click="show = true">
    <slot>
      <Button type="primary">新增班级学员</Button>
    </slot>
    <Modal
      v-model="show"
      title="选择党员"
      :loading="loading"
      class-name="blue-modal"
      transfer
      width="800px"
    >
      <div class="scroll modal-scroll">
        <Row :gutter="15">
          <Col :span="24" class="acsm-form">
            <Form :label-width="80">
              <Row :gutter="15">
                <Col :span="16">
                  <Row :gutter="15">
                    <Col :span="12">
                      <FormItem label="党组织">
                        <OrganizationCascader
                          @change="organChange"
                          size="default"
                          v-model="OrganId"
                        ></OrganizationCascader>
                      </FormItem>
                    </Col>
                    <Col :span="12">
                      <FormItem label="姓名">
                        <Input v-model="searchParams.Name" placeholder="输入党员姓名"></Input>
                      </FormItem>
                    </Col>
                    <Col :span="12" v-if="isIntranet">
                      <FormItem label="身份证">
                        <Input v-model="searchParams.IdCard" placeholder="输入身份证"></Input>
                      </FormItem>
                    </Col>
                    <Col :span="12">
                      <FormItem label="职务">
                        <common-select
                          size="default"
                          keys="PartyDutyCode"
                          v-model="searchParams.PartyDutyCodes"
                        ></common-select>
                      </FormItem>
                    </Col>
                  </Row>
                </Col>
                <Col :span="8" style="margin-top:35px">
                  <Button style="margin-left:15px" @click="search" type="primary">搜索</Button>
                  <Button style="margin-left:15px" @click="reset" type="primary">重置</Button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col :span="7">
            <div class="acsm-left">
              <Alert>已选&nbsp;&nbsp;{{selectData.length}}&nbsp;&nbsp;名学员</Alert>
              <div class="acsm-left-body scroll">
                <Tag
                  v-for="(el,i) in selectData"
                  :key="el.id"
                  :name="el.id"
                  @on-close="tagClose(i)"
                  style="width:100%;text-align:center"
                  closable
                  color="primary"
                >{{el.name}}</Tag>
              </div>
            </div>
          </Col>
          <Col :span="17">
            <Table
              @on-select-cancel="selectCancel"
              @on-selection-change="selectChange"
              @on-select-all="selectAllChange"
              @on-select-all-cancel="selectAllCancel"
              :loading="modalSpin"
              stripe
              border
              :columns="columns"
              :data="data"
            ></Table>
            <div class="text-right" style="padding:30px 0 0 0">
              <page-extend
                :current-page.sync="params.PageIndex"
                :total="total"
                :resetTotal.sync="resetTotal"
                :finishState="modalSpin"
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
    <PartyMemberEduRecord :partyMember="partyMember" v-model="showModal"></PartyMemberEduRecord>
  </span>
</template>
<script>
import { SearchPageList } from "@/api/partyMember";
import PageExtend from "@/components/PageExtend/PageExtend";
import { Modal, Form, FormItem, Input, Table } from "iview";
import OrganizationCascader from "@/components/OrganizationCascader";
import { SkipCountExtend, ClearParams } from "@/mixins";
import { TrainClassServiceAddStudent } from "@/api/education";
import PartyMemberEduRecord from "@/pages/common/PartyMemberEduRecord";
import CommonSelect from "@/components/CommonSelect";
export default {
  name: "AddClassStudentModal",
  mixins: [SkipCountExtend, ClearParams],
  components: {
    OrganizationCascader,
    Modal,
    Form,
    FormItem,
    Input,
    Table,
    PageExtend,
    PartyMemberEduRecord,
    CommonSelect
  },
  watch: {
    show(n) {
      if (n) {
        this.loadData();
      }
    }
  },
  computed: {
    isIntranet() {
      return this.$store.state.session.isIntranet;
    }
  },
  data() {
    let that = this;
    return {
      show: false,
      loading: false,
      modalSpin: false,
      selectData: [],
      OrganId: "",
      showModal: false,
      partyMember: {},
      searchParams: {
        Keyword: "",
        OrganPath: "",
        Name: "",
        IdCard: "",
        PartyDutyCodes: ""
      },
      data: [],
      total: 0,
      columns: [
        {
          type: "selection",
          width: 60
        },
        {
          key: "name",
          width: 120,
          title: "姓名",
          tooltip: true
        },
        {
          key: "organName",
          tooltip: true,
          title: "组织"
        },
        {
          align: "right",
          render(h, { row }) {
            return h(
              "span",
              {
                class: "zdy-table-link primary",
                on: {
                  click() {
                    that.partyMember = row;
                    that.showModal = true;
                  }
                }
              },
              "查看过往培训经历"
            );
          }
        }
      ]
    };
  },
  methods: {
    organChange(organ) {
      this.searchParams.OrganPath = organ.path;
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
      this.loadData();
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
      this.modalSpin = true;
      SearchPageList(this.ClearParams(params))
        .then(res => {
          this.total = res.totalCount;
          this.data = res.items;
          this.params.LastId = res.lastId;
        })
        .finally(() => {
          this.modalSpin = false;
        });
    },
    selectChange(data) {
      data.forEach(e => {
        if (!this.selectData.some(el => el.id === e.id)) {
          this.selectData.push(e);
        }
      });
    },
    tagClose(i) {
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
    save() {
      this.loading = true;
      TrainClassServiceAddStudent({
        trainClassId: this.$route.query.id,
        userList: this.selectData.map(e => e.id)
      })
        .then(res => {
          this.$emit("change");
          this.$Message.success("添加成功");
          this.show = false;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="less">
.acsm-form {
  margin-bottom: 15px;
  .ivu-form-item {
    margin-bottom: 5px;
  }
}
.acsm-left {
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 3px;
  padding: 15px;
  box-sizing: border-box;
  .acsm-left-h {
  }
  .acsm-left-body {
    margin-top: 18px;
    height: 440px;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
