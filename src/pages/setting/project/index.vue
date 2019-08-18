<template>
  <Card :bordered="false" :dis-hover="true">
    <div slot="title" class="common-card-title">
      <Form :label-width="100" inline>
        <Row :gutter="15" type="flex">
          <Col class="common-card-title-col">
            <FormItem label="项目名称:">
              <Input v-model="searchParams.ProjectName" placeholder="请输入项目名称"></Input>
            </FormItem>
          </Col>
          <Col class="common-card-title-col">
            <FormItem :label-width="0">
              <Button @click="loadData" type="primary">查询</Button>
              <!-- <Button style="margin-left:15px" type="primary">导出</Button> -->
            </FormItem>
          </Col>

          <Col class="text-right">
            <Button type="primary" ghost @click="createProject">新建项目</Button>
            <Button type="primary" ghost @click="createOrganization">新增组织</Button>
            <!-- <Button type="success" ghost>批量操作</Button> -->
          </Col>
        </Row>
      </Form>
    </div>
    <div>
      <Table :loading="loading" :columns="columns" :data="data"></Table>
      <div class="text-right" style="padding:30px 0 0 0">
        <Page
          :current.sync="page.pageIndex"
          :total="total"
          :page-size="page.MaxResultCount"
        />
        <!-- <Page :total="total" @on-page-size-change="pageSizeChange" show-sizer show-total :current.sync="page.pageIndex" :page-size="page.MaxResultCount" show-elevator prev-text="上一页" next-text="下一页" /> -->
      </div>
    </div>
    <Modal
      v-model="showOrganModal"
      title="添加组织"
      :closable="false"
      :mask-closable="false"
      width="600px"
      class="modal-form"
    >
      <Form ref="form" :label-width="120" :model="formModel" :rules="rules">
        <FormItem label="上级组织">
          <!-- <organization-cascader-all placeholder="请选择党组织" v-model="formModel.parentId"></organization-cascader-all> -->
        </FormItem>
        <FormItem label="组织名称" prop="organName">
          <Input v-model="formModel.organName" placeholder="请输入组织名称"></Input>
        </FormItem>
        <!-- <FormItem label="组织代码" prop="organCode">
                    <Input v-model="formModel.organCode" placeholder="请输入组织代码"></Input>
        </FormItem>-->
        <!-- <FormItem label="组织类别" prop="organType">
                    <common-select placeholder="请选择组织类别" v-model="formModel.organType" keys="OrganType"></common-select>
        </FormItem>-->
        <!-- <FormItem label="排序">
                    <InputNumber v-model="formModel.sort">
                    </InputNumber>
        </FormItem>-->
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="orgLoading" @click="save">保存</Button>
        <Button @click="cancel">关闭</Button>
      </div>
    </Modal>
    <project-modal @change="loadData" :id="projectId" v-model="createProjectModal"></project-modal>
    <project-permiss-modal v-if="data.length" :id="projectId" v-model="choicePermiss"/>
  </Card>
</template>
<script>
import { Card, Table, Page, Modal, InputNumber } from "iview";
import ProjectModal from "@/pages/common/ProjectModal";
import {
  GetPageProjectList,
  CreateAsync,
  EnableProject,
  DisableProject
} from "@/api";
import { SkipCount } from "@/utils/util";
import OrganizationCascaderAll from "@/components/OrganizationCascaderAll";
import ProjectPermissModal from "@/pages/common/ProjectPermissModal";
// import CommonSelect from '@/components/CommonSelect'
export default {
  components: {
    Card,
    Table,
    Page,
    ProjectModal,
    OrganizationCascaderAll,
    Modal,
    // CommonSelect,
    InputNumber,
    ProjectPermissModal
  },
  data() {
    let that = this;
    return {
      loading: false,
      orgLoading: false,
      projectId: "",
      // rootRoleId:'',
      createProjectModal: false,
      showOrganModal: false,
      choicePermiss: false,
      total: 0,
      searchParams: {
        ProjectName: "",
      },
      page: {
        MaxResultCount: 9,
        SkipCount: 0,
        pageIndex: 1
      },
      data: [],
      columns: [
        {
          title: "项目名称",
          key: "projectName",
          align: "center",
          tooltip: true
        },
        {
          title: "所属党组织",
          key: "organName",
          tooltip: true
        },
        {
          title: "项目网址",
          tooltip: true,
          render(h, { row }) {
            return h(
              "a",
              {
                attrs: {
                  target: "_blank",
                  href: row.projectUrl
                }
              },
              row.projectUrl
            );
          }
        },
        {
          title: "创建时间",
          render(h, { row }) {
            return h(
              "span",
              new Date(row.creationTime).Format("yyyy/MM/dd hh:mm:ss")
            );
          }
        },
        {
          title: "操作",
          align: "right",
          className: "zdy-table-opration",
          render(h, { row }) {
            let arr = [
              h(
                "a",
                {
                  on: {
                    click() {
                      that.projectId = row.id;
                      that.choicePermiss = true;
                    }
                  }
                },
                "选择菜单"
              ),
              h(
                "a",
                {
                  on: {
                    click() {
                      that.deleteProject(row.id);
                    }
                  }
                },
                "删除"
              ),
              h(
                "a",
                {
                  on: {
                    click() {
                      that.projectId = row.id;
                      that.createProjectModal = true;
                    }
                  }
                },
                "编辑"
              )
            ];
            if (row.isActive) {
              arr.push(
                h(
                  "a",
                  {
                    on: {
                      click() {
                        that.disableProject(row.id);
                      }
                    }
                  },
                  "禁用"
                )
              );
            } else {
              arr.push(
                h(
                  "a",
                  {
                    on: {
                      click() {
                        that.enableProject(row.id);
                      }
                    }
                  },
                  "启用"
                )
              );
            }
            return h(
              "span",
              {
                class: "table-btn-group"
              },
              arr
            );
          }
        }
      ],
      formModel: {
        parentId: "",
        organName: ""
        // organCode: '',
        // sort: 0,
        // organType: ''
      },
      rules: {
        organName: [
          {
            required: true,
            message: "请输入组织名称",
            trigger: "blur"
          }
        ]
        // organCode: [{
        //     required: true,
        //     message: '请输入组织代码',
        //     trigger: 'blur'
        // }],
        // organType: [{
        //     required: true,
        //     message: '请选择组织类别',
        //     trigger: 'change'
        // }]
      }
    };
  },
  methods: {
    pageSizeChange(size) {
      this.page.MaxResultCount = size;
    },
    createProject() {
      this.projectId = null;
      this.createProjectModal = true;
    },
    createOrganization() {
      this.$refs["form"].resetFields();
      this.showOrganModal = true;
    },
    deleteProject(id) {
      this.$Modal.confirm({
        title: "系统提示",
        content: "确认删除项目？",
        onOk: () => {
          DeleteProject({ id }).then(res => {
            this.$Message.success("操作成功");
            this.loadData();
          });
        }
      });
    },
    disableProject(id) {
      this.$Modal.confirm({
        title: "系统提示",
        content: "确认禁用项目？",
        onOk: () => {
          DisableProject({ id }).then(res => {
            this.$Message.success("操作成功");
            this.loadData();
          });
        }
      });
    },
    enableProject(id) {
      this.$Modal.confirm({
        title: "系统提示",
        content: "确认启用项目？",
        onOk: () => {
          EnableProject({ id }).then(res => {
            this.$Message.success("操作成功");
            this.loadData();
          });
        }
      });
    },
    loadData() {
      this.loading = true;
      let params = JSON.parse(JSON.stringify(this.page));
      params.SkipCount = SkipCount(params.MaxResultCount, params.pageIndex);
      delete params.pageIndex;
      let p = this.searchParams;
      if (p.ProjectName) {
        params.ProjectName = p.ProjectName;
      }
      GetPageProjectList(params)
        .then(res => {
          this.data = res.items;
          this.total = res.totalCount;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.orgLoading = true;
          CreateAsync(this.formModel)
            .then(res => {
              this.$Message.success("添加成功");
              this.showOrganModal = false;
              this.$store.commit("UPDATESTATE", {
                organizationChange: true
              });
            })
            .finally(() => {
              this.orgLoading = false;
            });
        }
      });
    },
    cancel() {
      this.$refs["form"].resetFields();
      this.showOrganModal = false;
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
<style lang="less" scoped>
</style>