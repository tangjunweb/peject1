<template>
  <div class="manager">
    <!-- <TopCountTipsCard title="管理员管理" :count="total" subTitle="管理员总数"></TopCountTipsCard> -->
    <Row>
      <Col :span="12">
        <Form ref="form" inline>
          <FormItem>
            <Input v-model="searchParams.Keyword" type="text" placeholder="输入关键字搜索"></Input>
          </FormItem>
          <FormItem>
            <Button @click="search" type="primary">搜索</Button>
          </FormItem>
          <FormItem>
            <Button @click="reset" type="primary">重置</Button>
          </FormItem>
        </Form>
      </Col>
      <Col :span="12" class="text-right">
        <Button @click="addAdmin" type="primary" ghost>新建管理员</Button>
      </Col>
    </Row>
    <Card class="border" :dis-hover="true">
      <Table :loading="loading" stripe :columns="columns" :data="data"></Table>
    </Card>
    <div class="text-right" style="padding:30px 0 0 0">
      <page-extend
        :current-page.sync="params.PageIndex"
        :total="total"
        :finishState="loading"
        :resetTotal.sync="resetTotal"
        :page-size="params.MaxResultCount"
        class-name="lhyj-page"
      />
    </div>
    <Modal
      v-model="showModal"
      :title="modalTitle"
      :loading="modalLoading"
      transfer
      width="800px"
      class-name="blue-modal"
    >
      <Form :label-width="100" ref="form" :model="model" :rules="rules">
        <FormItem label="姓名" prop="name">
          <Input :readonly="true" size="large" placeholder="请输入姓名" v-model="model.name">
            <div slot="append">
              <Button @click="cancelBind" size="large" v-if="!isUpdate&&!isEdit">取消绑定</Button>
              <PartyMemberSelect v-else type="single" :value="{}" @change="partyMemberChange">
                <Button :disabled="isUpdate" size="large">绑定党员</Button>
              </PartyMemberSelect>
            </div>
          </Input>
        </FormItem>
        <!-- <FormItem label="密码" prop="password" v-if="isEdit&&!isUpdate">
          <Input size="large" placeholder="请输入密码" v-model="model.password"></Input>
        </FormItem>-->
        <FormItem label="角色" prop="roles">
          <Select transfer size="large" placeholder="选择角色" v-model="model.roles" multiple>
            <Option v-for="(el,i) in allroles" :key="i" :value="el.id" :label="el.name"></Option>
          </Select>
        </FormItem>
        <FormItem label="管理组织" prop="manageorgId">
          <OrganizationCascader
            @change="changeOrg"
            :label="model.organName"
            v-model="model.manageorgId"
          ></OrganizationCascader>
        </FormItem>
      </Form>
      <Spin fix v-if="modalSpin"></Spin>
      <div slot="footer">
        <Button @click="showModal = false" type="primary">取消</Button>
        <Button :loading="modalLoading" @click="save" type="primary">保存</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import TopCountTipsCard from "@/components/TopCountTipsCard";
import PageExtend from "@/components/PageExtend/PageExtend";
import {
  Form,
  FormItem,
  Input,
  Table,
  Modal,
  Select,
  Option,
  Card
} from "iview";
import {
  AdminPageList,
  UserDelete,
  GetAdminAsync,
  CreateAdminAsync,
  UpdateAdminAsync,
  SetAdminActiveAsync
} from "@/api";
import { PartyMemberServiceGet } from "@/api/partyMember";
import { SkipCountExtend, ClearParams, Auth } from "@/mixins";
import { FormatDate } from "@/utils/util";
import Administrator from "@/pages/model/Administrator";
import { mapState } from "vuex";
import OrganizationCascader from "@/components/OrganizationCascader";
import PartyMemberSelect from "@/pages/common/PartyMemberSelect";
export default {
  mixins: [SkipCountExtend, ClearParams, Auth],
  components: {
    TopCountTipsCard,
    Form,
    FormItem,
    Input,
    PageExtend,
    Table,
    Modal,
    Select,
    Option,
    Card,
    OrganizationCascader,
    PartyMemberSelect
  },
  computed: {
    ...mapState({
      allroles: state => state.allroles.filter(e => e.isDefault == false),
      defaultRoles: state => state.allroles.filter(e => e.isDefault == true)
    }),
    isIntranet() {
      return this.$store.state.session.isIntranet;
    }
  },
  data() {
    let that = this;
    return {
      modalTitle: "",
      loading: false,
      showModal: false,
      modalLoading: false,
      modalSpin: false,
      isEdit: true,
      isUpdate: false,
      searchParams: {
        Keyword: ""
      },
      model: {},
      rules: Administrator.getRules(),
      total: 0,
      columns: [
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "账号",
          key: "userName"
        },
        // {
        //   title: "是否启用",
        //   render(h, { row }) {
        //     return h(
        //       "Tag",
        //       {
        //         props: {
        //           color: row.isAdminActive ? "primary" : "error",
        //           type: "border"
        //         }
        //       },
        //       row.isAdminActive ? "是" : "否"
        //     );
        //   }
        // },
        {
          title: "创建时间",
          render(h, { row }) {
            return h("span", FormatDate(row.createTime, "yyyy-MM-dd hh:mm:ss"));
          }
        },
        {
          title: "操作",
          align: "right",
          width: 250,
          className: "zdy-table-opration",
          render(h, { row }) {
            let arr = [];
            // if (that.auth("/setting/manager/enable")) {
            //   if (row.isAdminActive) {
            //     arr.push(
            //       h(
            //         "a",
            //         {
            //           // props: {
            //           //     type: 'warning',
            //           //     ghost: true
            //           // },
            //           on: {
            //             click() {
            //               that.$Modal.confirm({
            //                 title: "系统提示",
            //                 content: `确认禁用用户 '${row.name}' ?`,
            //                 onOk() {
            //                   SetAdminActiveAsync({
            //                     id: row.id,
            //                     isActive: false
            //                   }).then(res => {
            //                     that.$Message.success("操作成功！");
            //                     that.loadData();
            //                   });
            //                 }
            //               });
            //             }
            //           }
            //         },
            //         "禁用"
            //       )
            //     );
            //   } else {
            //     arr.push(
            //       h(
            //         "a",
            //         {
            //           // props: {
            //           //     type: 'success',
            //           //     ghost: true
            //           // },
            //           on: {
            //             click() {
            //               that.$Modal.confirm({
            //                 title: "系统提示",
            //                 content: `确认启用用户 '${row.name}' ?`,
            //                 onOk() {
            //                   SetAdminActiveAsync({
            //                     id: row.id,
            //                     isActive: true
            //                   }).then(res => {
            //                     that.$Message.success("操作成功！");
            //                     that.loadData();
            //                   });
            //                 }
            //               });
            //             }
            //           }
            //         },
            //         "启用"
            //       )
            //     );
            //   }
            // }
            if (that.auth("/setting/manager/update")) {
              arr.push(
                h(
                  "a",
                  {
                    // props: {
                    //     type: 'info',
                    //     ghost: true
                    // },
                    on: {
                      click() {
                        that.getAdmin(row.id);
                      }
                    }
                  },
                  "编辑"
                )
              );
            }
            if (that.auth("/setting/manager/delete")) {
              arr.push(
                h(
                  "a",
                  {
                    // props: {
                    //     type: 'error',
                    //     ghost: true
                    // },
                    on: {
                      click() {
                        that.$Modal.confirm({
                          title: "系统提示",
                          content: `确认删除用户'${row.name}'?`,
                          onOk() {
                            UserDelete({
                              id: row.id
                            }).then(res => {
                              that.$Message.success("删除成功！");
                              that.loadData();
                            });
                          }
                        });
                      }
                    }
                  },
                  "删除"
                )
              );
            }
            return h(
              "span",
              {
                class: "table-btn-group"
              },
              [...arr]
            );
          }
        }
      ],
      data: []
    };
  },
  methods: {
    changeOrg(n) {
      this.model.manageorgId = n.value;
      this.model.organName = n.label;
    },
    partyMemberChange(member) {
      PartyMemberServiceGet({
        id: member.id
      }).then(res => {
        this.model.id = res.id;
        this.model.name = res.name;
        this.isEdit = false;
      });
    },
    search() {
      this.params.SkipCount = 0;
      this.resetTotal = true;
      this.loadData();
    },
    reset() {
      this.searchParams.Keyword = "";
      this.loadData();
    },
    cancelBind() {
      this.model.name = "";
      this.model.organId = "";
      this.model.organName = "";
      this.model.id = "";
      this.isEdit = true;
    },
    addAdmin() {
      this.$refs["form"].resetFields();
      this.modalTitle = "新建管理员";
      this.showModal = true;
      this.modalSpin = true;
      this.isUpdate = false;
      this.isEdit = true;
      this.$store
        .dispatch("getAllRoles")
        .then(res => {
          this.model = new Administrator();
        })
        .finally(() => {
          this.modalSpin = false;
        });
    },
    getAdmin(id) {
      this.$refs["form"].resetFields();
      this.modalTitle = "编辑管理员";
      this.showModal = true;
      this.modalSpin = true;
      this.isUpdate = true;
      let p1 = GetAdminAsync({ id });
      let p2 = this.$store.dispatch("getAllRoles");
      Promise.all([p1, p2])
        .then(res => {
          this.model = new Administrator(res[0]);
          this.model.manageorgId = this.model.organId
        })
        .finally(() => {
          this.modalSpin = false;
        });
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
      this.loading = true;
      AdminPageList(this.ClearParams(params))
        .then(res => {
          this.data = res.items;
          this.total = res.totalCount;
          this.params.LastId = res.lastId;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.modalLoading = true;
          //新增默认权限
          this.defaultRoles.map(e => {
            if (this.model.roles.indexOf(e.id) == -1) {
              this.model.roles.push(e.id);
            }
          });
          if (this.model.id) {
            console.log(this.model)
            UpdateAdminAsync(Administrator.getModel(this.model))
              .then(res => {
                this.$Message.success("修改成功");
                this.showModal = false;
                this.loadData();
              })
              .finally(() => {
                this.modalLoading = false;
              });
          }
          // else {
          //   CreateAdminAsync(Administrator.getModel(this.model))
          //     .then(res => {
          //       this.$Message.success("创建成功");
          //       this.showModal = false;
          //       this.loadData();
          //     })
          //     .finally(() => {
          //       this.modalLoading = false;
          //     });
          // }
        }
      });
    }
  },
  mounted() {
    this.loadData();
    if (this.isIntranet) {
      this.columns.splice(2, 0, {
        title: "手机号",
        key: "phoneNumber"
      });
    }
  }
};
</script>
<style lang="less">
</style>
