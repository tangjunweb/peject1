<template>
  <Modal
    :value="value"
    :title="title"
    :closable="false"
    :mask-closable="false"
    width="500px"
    :transfer="true"
    class-name="modal-form"
  >
    <Form ref="form" :model="formModel" :rules="rules" :label-width="130">
      <Row>
        <Col :span="24">
          <FormItem label="类型：" prop="type">
            <Select clearable v-model="formModel.type" :transfer="true">
              <Option
                v-for="(el,i) in baseCode.EnumPermissionType"
                :key="i"
                :value="el.value"
              >{{el.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="24">
          <FormItem label="权限名称：" prop="displayName">
            <Input v-model="formModel.displayName" placeholder="权限名称"></Input>
          </FormItem>
        </Col>
        <Col :span="24">
          <FormItem label="权限路径：">
            <Input v-model="formModel.url" placeholder="请输入菜单路径"></Input>
          </FormItem>
        </Col>
        <Col :span="24">
          <FormItem label="权限图标：">
            <Input v-model="formModel.iconPath" placeholder="请输入菜单图标"></Input>
          </FormItem>
        </Col>
        <Col :span="24">
          <FormItem label="权限标示：">
            <Input v-model="formModel.permissionName" placeholder="请输入权限标示"></Input>
          </FormItem>
        </Col>
        <Col :span="24">
          <FormItem label="选择上级：">
            <cascader-menu v-model="formModel.parentId"/>
          </FormItem>
        </Col>
        <Col :span="24">
          <FormItem label="排序：">
            <Input v-model="formModel.sort" placeholder="请输入排序"></Input>
          </FormItem>
        </Col>
        <Col :span="24">
          <FormItem label="权限描述：">
            <Input v-model="formModel.description" type="textarea" :rows="4" placeholder="请输入菜单描述"></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="primary" :loading="orgLoading" @click="save">保存</Button>
      <Button @click="cancel" type="primary" ghost>关闭</Button>
    </div>
  </Modal>
</template>
<script>
import { Modal, Select, Option } from "iview";
import { MenuCreate, MenuUpdate } from "@/api";
import CascaderMenu from "@/components/CascaderMenu";
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    return {
      formModel: {},
      rules: {
        type: [
          {
            required: true,
            message: "请选择权限类型",
            trigger: "blur"
          }
        ],
        displayName: [
          {
            required: true,
            message: "请输入权限名称",
            trigger: "blur"
          }
        ]
        // url: [{
        // 	required: true,
        // 	message: '请输入菜单路径',
        // 	trigger: 'blur'
        // }],
      },
      orgLoading: false
    };
  },
  components: {
    Modal,
    Select,
    Option,
    CascaderMenu
  },
  props: {
    value: Boolean,
    title: {
      type: String,
      default: "新增菜单"
    }
  },
  computed: {
    ...mapState(["baseCode"])
  },
  methods: {
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.orgLoading = true;
          if(!this.formModel.permissionName){
            this.formModel.permissionName = ' ';
          }
          let fn = this.formModel.id
            ? MenuUpdate(this.formModel)
            : MenuCreate(this.formModel);
          fn.then(res => {
            this.$Message.success(this.formModel.id ? "修改成功" : "创建成功");
            this.cancel();
            this.$store.dispatch("getAllPermiss", {isadmin: true});
          }).finally(() => {
            this.orgLoading = false;
          });
        }
      });
    },
    cancel() {
      this.formModel = {};
      this.$emit("input", false);
    }
  },
  mounted() {
    //do something after mounting vue instance
    // console.log(this.$store.state.allPermiss);
  }
};
</script>
<style lang="less" scoped>
</style>