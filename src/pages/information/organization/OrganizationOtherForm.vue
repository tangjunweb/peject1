<template>
  <div>
    <div class="organ-form-item">
      <Alert type="success">党组织奖惩信息</Alert>
      <div class="table-h-btn text-right">
        <Button @click="add(null)" type="primary" ghost>新增</Button>
      </div>
      <Table :loading="loading" :columns="columns" :data="data"></Table>
      <div class="text-right" style="padding:30px 0 0 0">
        <Page
          :current.sync="params.pageIndex"
          :total="total"
          :page-size="params.MaxResultCount"
          class-name="lhyj-page"
        />
      </div>
    </div>
    <Modal
      v-model="showModal"
      :title="modalTitle"
      :loading="modalLoading"
      transfer
      class-name="blue-modal"
    >
      <div class="scroll modal-scroll">
        <Form :label-width="100" ref="form" :model="model" :rules="rules">
          <FormItem label="奖惩名称" prop="bonnusPenaltyName">
            <common-select  keys="OrganPenalty" v-model="model.bonnusPenaltyName"></common-select>
          </FormItem>
          <FormItem label="批准时间" prop="approvalDate">
            <DatePicker
              transfer
              v-model="model.approvalDate"
              
              type="date"
              placeholder="请选择批准时间"
            ></DatePicker>
          </FormItem>
          <FormItem label="批准组织" prop="approvalOrganId">
            <OrganizationCascaderParent
              :label="model.approvalOrganName"
              v-model="model.approvalOrganId"
              
            ></OrganizationCascaderParent>
          </FormItem>
          <FormItem label="奖惩依据" prop="accordingAttach.id">
            {{model.accordingAttach ? model.accordingAttach.name : ''}}
            <UploadAttachment @change="uploadChange" AttachClass="2" ></UploadAttachment>
          </FormItem>
        </Form>
      </div>
      <Spin fix v-if="modalSpin"></Spin>
      <div slot="footer">
        <Button @click="showModal = false" type="primary">取消</Button>
        <Button :loading="modalLoading" @click="save" type="primary">保存</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import {
  Table,
  Form,
  FormItem,
  Input,
  DatePicker,
  Page,
  Modal,
  Checkbox,
  InputNumber
} from "iview";
import {
  GetOgranBonusPenaltyByOrganIdAsync,
  GetOrganReplacementByOrganIdAsync,
  GetOrganAssessmentByOrganIdAsync,
  UpdateOrganAssessmentDtoAsync,
  UpdateOrganReplacementDtoAsync,
  CreateOrganReplacementAsync,
  UpdateOrganBonusPenaltyAsync,
  CreateOgranBonusPenaltyAsync,
  DeleteOrganAssessmentByGuidAsync,
  DeleteOrganReplacementByGuidAsync,
  DeleteOgranBonusPenaltyByGuidAsync,
  CreateOrganAssessmentAsync
} from "@/api/partyOrganizationService";
import {
  Penalty,
  Replacement,
  Assessment
} from "@/pages/model/OrganizationOther";
import OrganizationCascaderParent from "@/components/OrganizationCascaderParent";
import UploadAttachment from "@/components/UploadAttachment";
import { GetUpLoadAuth } from "@/api";
import CommonSelect from "@/components/CommonSelect";
export default {
  components: {
    Table,
    Form,
    FormItem,
    Input,
    DatePicker,
    OrganizationCascaderParent,
    UploadAttachment,
    Page,
    Checkbox,
    InputNumber,
    Modal,
    CommonSelect
  },
  props: {
    organization: {
      type: Object
    }
  },
  watch: {
    params: {
      deep: true,
      handler() {
        this.loadData();
      }
    }
  },
  data() {
    let that = this;
    return {
      showModal: false,
      modalTitle: "",
      modalLoading: false,
      model: new Penalty(),
      rules: Penalty.getRules(),
      modalSpin: false,
      data: [],
      loading: false,
      params: {
        MaxResultCount: 5,
        SkipCount: 0,
        pageIndex: 1
      },
      total: 0,
      columns: [
        {
          title: "党组织受奖惩名称",
          tooltip: true,
          render(h, { row }) {
            return h(
              "span",
              that.GetCodeTableValue(row.bonnusPenaltyName, "OrganPenalty")
            );
          }
        },
        {
          title: "党组织受奖惩批准日期",
          tooltip: true,
          render(h, { row }) {
            return h("span", that.FormatDate(row.approvalDate, "yyyy-MM-dd"));
          }
        },
        {
          title: "奖惩批准党组织名称",
          key: "approvalOrganName",
          tooltip: true
        },
        {
          title: "奖惩依据",
          tooltip: true,
          render(h, { row }) {
            if (row.accordingAttach) {
              return h(
                "span",
                {
                  class: "zdy-table-link success",
                  on: {
                    click() {
                      that.downLoad(row.accordingAttach.id);
                    }
                  }
                },
                row.accordingAttach.name
              );
            } else {
              return h("span", "-");
            }
          }
        },
        {
          title: "操作",
          align: "right",
          className: "zdy-table-opration",
          render(h, { row }) {
            return h("span", [
              h(
                "a",
                {
                  on: {
                    click() {
                      that.modalTitle = "编辑党组织奖惩信息";
                      that.model = new Penalty(row);
                      that.showModal = true;
                    }
                  }
                },
                "编辑"
              ),
              h(
                "a",
                {
                  on: {
                    click() {
                      that.$Modal.confirm({
                        title: "系统提示",
                        content: `确认删除这条奖惩信息？`,
                        onOk: () => {
                          DeleteOgranBonusPenaltyByGuidAsync({
                            id: row.id
                          }).then(res => {
                            that.loadData();
                            that.$Message.success("删除成功");
                          });
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    downLoad(id) {
      GetUpLoadAuth().then(res => {
        window.open(
          `${UPLOAD_PATH}/file/download?project=${res.project}&token=${
            res.token
          }&id=${id}`
        );
      });
    },
    getLabel(i) {
      switch (i) {
        case 0:
          return "实施方案";
          break;
        case 1:
          return "述职报告";
          break;
        case 2:
          return "点评讲话";
          break;
        case 3:
          return "测评考核结果及运用情况";
          break;
        case 4:
          return "整改情况";
          break;
      }
    },
    uploadChange(file) {
      Object.assign(this.model.accordingAttach, file);
      this.$refs["form"].validateField(`accordingAttach.id`);
    },
    loadData() {
      let params = JSON.parse(JSON.stringify(this.params));
      params.SkipCount =
        this.params.pageIndex * this.params.MaxResultCount -
        this.params.MaxResultCount;
      params.key = this.organization.id;
      this.loading = true;
      GetOgranBonusPenaltyByOrganIdAsync(params)
        .then(res => {
          this.total = res.totalCount;
          this.data = res.items;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.modalLoading = true;
          let fn = this.model.id
            ? UpdateOrganBonusPenaltyAsync
            : CreateOgranBonusPenaltyAsync;
          let title = this.model.id
            ? "奖惩信息修改成功！"
            : "奖惩信息添加成功！";
          this.model.organId = this.organization.id;
          fn(Penalty.getModel(this.model))
            .then(res => {
              this.$Message.success(title);
              this.loadData();
              this.showModal = false;
            })
            .finally(() => {
              this.modalLoading = false;
            });
        }
      });
    },
    add(data = null) {
      this.showModal = true;
      this.modalTitle = "添加党组织奖惩信息";
      if (data) {
        this.model = new Penalty(data);
      } else {
        this.model = new Penalty({
          organId: this.organization.id
        });
      }
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
<style lang="less">
.table-h-btn {
  margin: 15px 0;
}
</style>
