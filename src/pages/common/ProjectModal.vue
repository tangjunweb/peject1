<template>
  <Modal
    :value="show"
    :title="title"
    :closable="false"
    :mask-closable="false"
    width="800px"
    class="modal-form"
    @on-visible-change="change"
  >
    <div style="position:relative">
      <Tabs v-model="tabName">
        <TabPane label="项目基本信息" name="xmjbxx">
          <Form ref="formA" :model="formModel" :rules="rules" :label-width="100">
            <Row :gutter="30">
              <Col :span="12">
                <FormItem label="项目名称:" prop="name">
                  <Input placeholder="请填写全称" v-model="formModel.name"></Input>
                </FormItem>
              </Col>
              <Col :span="12">
                <FormItem label="项目负责人:" prop="contactName">
                  <Input placeholder="请填写项目负责人名称" v-model="formModel.contactName"></Input>
                </FormItem>
              </Col>
              <Col :span="12">
                <FormItem label="联系电话:" prop="contactPhoneNumber">
                  <Input placeholder="请填写项目负责人联系电话" v-model="formModel.contactPhoneNumber"></Input>
                </FormItem>
              </Col>
              <Col :span="12">
                <!-- <FormItem label="所属组织:" prop="organId">
                  <organization-cascader-all
                    :label="formModel.organName"
                    placeholder="请选择党组织"
                    v-model="formModel.organId"
                  ></organization-cascader-all>
                </FormItem> -->
              </Col>
              <Col :span="12">
                <FormItem label="项目域名:" prop="tenancyName">
                  <Input placeholder="请填项目域名" v-model="formModel.tenancyName"></Input>
                </FormItem>
              </Col>
              <Col :span="12">
                <FormItem label="SiteServer:" prop="siteId">
                  <Select placeholder="请选择站点" v-model="formModel.siteId">
                    <Option v-for="(el,i) in sitelist" :key="i" :label="el.siteName" :value="el.id"></Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :span="12">
                <FormItem label="站点域名:" prop="siteDomain">
                  <Input placeholder="请填站点域名" v-model="formModel.siteDomain"></Input>
                </FormItem>
              </Col>
              <!-- <Col :span="24">
                            <FormItem class="xmcdqx-form-item" label="项目菜单权限:">
                                <Tree ref="tree" :data="permiss" :render="renderContent" show-checkbox></Tree>
                            </FormItem>
              </Col>-->
            </Row>
          </Form>
        </TabPane>
        <TabPane label="项目管理员" name="xmgly">
          <Form ref="formB" :model="formModel" :rules="rules" :label-width="100">
            <Row :gutter="30">
              <Col :span="12">
                <FormItem label="账号:" prop="adminName">
                  <Input :disabled="disabled" placeholder="请输入账号" v-model="formModel.adminName"></Input>
                </FormItem>
                <FormItem label="登录密码:" prop="password">
                  <Input :disabled="disabled" placeholder="请输入登录密码" v-model="formModel.password"></Input>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </TabPane>
      </Tabs>
      <Spin v-show="spinShow" fix>
        <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
        <div>加载中</div>
      </Spin>
    </div>
    <div slot="footer">
      <Button type="primary" :loading="loading" @click="save">保存</Button>
      <Button @click="cancel">关闭</Button>
    </div>
  </Modal>
</template>
<script>
import {
  Modal,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Input,
  Tree,
  Select,
  Option
} from "iview";
import { CreateProject, ModifyProject, GetProjectById, SiteList } from "@/api";
import Project from "@/pages/model/Project";
import OrganizationCascaderAll from "@/components/OrganizationCascaderAll";
import { reject } from "bluebird";
export default {
  name: "project-modal",
  components: {
    Modal,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Input,
    OrganizationCascaderAll,
    Tree,
    Select,
    Option
  },
  props: {
    value: Boolean,
    id: [String, Number],
    title: {
      type: String,
      default: "新建项目"
    }
  },
  data() {
    return {
      loading: false,
      spinShow: false,
      formModel: new Project(),
      rules: Project.getRules(),
      // permiss: [],
      tabName: "xmjbxx",
      sitelist: []
    };
  },
  computed: {
    show() {
      return this.value;
    },
    disabled() {
      return !!this.id;
    }
  },
  watch: {
    value(n) {
      if (n) {
        this.$refs["formA"].resetFields();
        this.$refs["formB"].resetFields();
        this.tabName = "xmjbxx";
        let fn = () => {
          return new Promise((resolve, reject) => {
            SiteList().then(res => {
              this.sitelist = res;
              resolve();
            });
          });
        };
        if (this.id) {
          Promise.all([fn()]).then(res => {
            this.loadData();
          });
        } else {
          this.formModel = new Project();
          // this.loadPermiss();
          fn();
        }
      }
    }
  },
  methods: {
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%"
          }
        },
        [
          h("span", [
            h(
              "span",
              {
                style: {
                  marginRight: "8px"
                }
              },
              data.displayName
            ),
            h("span", data.name)
          ])
        ]
      );
    },
    loadData() {
      this.spinShow = true;
      GetProjectById({
        Id: this.id
      })
        .then(res => {
          // if (res.permissions) {
          //     let fn = (arr, ps) => {
          //         return arr.map(e => {
          //             if (!e.children || e.children.length === 0) {
          //                 if (ps.includes(e.name)) {
          //                     e.checked = true;
          //                 } else {
          //                     e.checked = false;
          //                 }
          //             } else if (e.children && Array.isArray(e.children)) {
          //                 e.children = fn(e.children, ps);
          //             }
          //             return e;
          //         })
          //     }
          //     let data = fn(JSON.parse(JSON.stringify(this.permiss)), res.permissions);
          //     this.permiss = data;
          // }
          this.formModel = new Project(res);
        })
        .finally(() => {
          this.spinShow = false;
        });
    },
    // loadPermiss() {
    //     return new Promise((resolve, reject) => {
    //         this.spinShow = true;
    //         this.$store.dispatch('getAllPermiss').then(res => {
    //             let f = (arrs) => {
    //                 arrs.forEach(e => {
    //                     //e.expand = true;
    //                     e.title = e.displayName;
    //                     if (e.children && e.children.length) {
    //                         f(e.children);
    //                     }
    //                 })
    //                 return arrs;
    //             }
    //             this.permiss = f(res);
    //         }).finally(() => {
    //             this.spinShow = false;
    //             resolve();
    //         })
    //     })
    // },
    cancel() {
      this.$emit("input", false);
    },
    change(f) {
      this.$emit("input", f);
    },
    save() {
      let params = Project.getModel(this.formModel);
      // let d = [];
      // let getCheckedNode = (arr, ps) => {
      //     arr.forEach(e => {
      //         if (e.checked) {
      //             ps.push(e.name)
      //         }
      //         if (e.children && Array.isArray(e.children)) {
      //             let len = ps.length;
      //             getCheckedNode(e.children, ps);
      //             if (len < ps.length && !ps.includes(e.name)) {
      //                 ps.push(e.name)
      //             }
      //         }
      //     })
      // }
      // getCheckedNode(this.permiss, d)
      // params.permissions = d;
      let p1 = () => {
        return new Promise((resolve, reject) => {
          this.$refs["formA"].validate(valid => {
            resolve(valid);
          });
        });
      };
      let p2 = () => {
        return new Promise((resolve, reject) => {
          this.$refs["formB"].validate(valid => {
            resolve(valid);
          });
        });
      };
      let fn = () => {
        this.loading = true;
        if (!this.id) {
          CreateProject(params)
            .then(res => {
              this.$Message.success("添加项目成功");
              this.$emit("change");
              this.$emit("input", false);
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          ModifyProject(params)
            .then(res => {
              this.$Message.success("修改项目成功");
              this.$emit("change");
              this.$emit("input", false);
            })
            .finally(() => {
              this.loading = false;
            });
        }
      };
      if (this.id) {
        p1().then(valid => {
          if (valid) {
            fn();
          }
        });
      } else {
        Promise.all([p1(), p2()]).then(res => {
          if (this.tabName === "xmjbxx") {
            if (res[0] && !res[1] && !this.id) {
              this.tabName = "xmgly";
            }
          } else {
            if (res[1] && !res[0]) {
              this.tabName = "xmjbxx";
            }
          }
          if (res[0] && res[1]) {
            fn();
          }
        });
      }
    }
  }
};
</script>
<style lang="less">
.xmcdqx-form-item {
  .ivu-form-item-label {
    line-height: 28px;
  }
}
</style>
