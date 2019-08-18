<template>
  <div class="layout-lr roles">
    <div class="layout-lr-l">
      <Spin fix v-if="loadState"></Spin>
      <Card class="border" :dis-hover="true">
        <Form ref="form" :model="model" :rules="rules">
          <Row :gutter="32">
            <Col :span="8">
              <FormItem label="角色级别（小于）" prop="roleType">
                <Select v-model.number="model.roleLevel">
                  <Option
                    v-for="(item, index) in roleLevels"
                    :value="item.roleLevel"
                    :key="index"
                  >{{item.name }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col :span="8">
              <FormItem label="角色名称" prop="name">
                <Input placeholder="角色名称" v-model="model.name"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="32">
            <Col :span="24">
              <FormItem label="单位管理范围" prop="managedUnitNatruesArr">
                <Select placeholder="请选择单位管理范围" multiple v-model="model.managedUnitNatruesArr">
                  <Option
                    v-for="(el,i) in UnitNatrueTypes"
                    :key="i"
                    :value="el.value"
                    :label="el.label"
                  ></Option>
                </Select>
              </FormItem>
            </Col>
            <Col :span="24">
              <FormItem label="描述" prop="description">
                <Input :rows="5" type="textarea" placeholder="描述" v-model="model.description"></Input>
              </FormItem>
            </Col>
            <Col :span="24">
              <!-- <FormItem label="权限" style="margin-bottom:10px">
							</FormItem>
              <Tree style="margin-left:30px" ref="tree" :data="permiss" show-checkbox></Tree>-->
            </Col>
            <Col :span="24" style="margin-top:30px" class="text-center">
              <Button :loading="loading" @click="submit" type="primary">提交</Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <!-- </LPanel> -->
    </div>
  </div>
</template>
<script>
import { FormItem, Form, Input, Tree, Select, Option, Card } from "iview";
import Role from "@/pages/model/ClientRole";
import {
  RoleCreate,
  GetRoleForEdit,
  RoleUpdate,
  // GetAllRoleList,
  GetRoleLevelList
} from "@/api";
import CommonSelect from "@/components/CommonSelect";
import { mapState } from "vuex";
export default {
  components: {
    Card,
    FormItem,
    Form,
    Input,
    CommonSelect,
    Tree,
    Select,
    Option
  },
  data() {
    return {
      model: new Role(),
      rules: Role.getRules(),
      loading: false,
      loadState: false,
      // permiss: [],
      roleLevels: []
    };
  },
  computed: {
    UnitNatrueTypes() {
      return this.$store.state.baseCode.UnitNatrueType;
    }
  },
  methods: {
    submit() {
      // let d = this.$refs['tree'].getCheckedNodes().map(e => {
      // 	return e.name;
      // });
      // this.model.permissions = d;
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.$route.query.id) {
            RoleUpdate(Role.getModels(this.model))
              .then(res => {
                this.$Message.success("修改成功");
                this.$router.go(-1);
              })
              .finally(() => {
                this.loading = false;
              });
          } else {
            RoleCreate(Role.getModels(this.model))
              .then(res => {
                this.$Message.success("创建成功");
                this.$router.go(-1);
              })
              .finally(() => {
                this.loading = false;
              });
          }
        }
      });
    }
  },
  mounted() {
    this.loadState = true;
    let p1 = GetRoleLevelList();
    let p2 = null;
    if (this.$route.query.id) {
      p2 = GetRoleForEdit({
        id: this.$route.query.id
      });
    }
    let arr = [p1];
    if (p2) {
      arr.push(p2);
    }
    Promise.all(arr)
      .then(res => {
        this.roleLevels = res[0];
        if (res[1]) {
          this.model = new Role(res[1].role);
        }
      })
      .finally(res => {
        this.loadState = false;
      });
  }
};
</script>
