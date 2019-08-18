<template>
  <Modal
    :value="value"
    title="克隆菜单"
    :closable="false"
    :mask-closable="false"
    width="500px"
    :transfer="true"
    class-name="modal-form"
  >
    <Form ref="form" :model="formModel" :rules="rules" :label-width="90">
      <Row>
        <Col :span="24">
          <FormItem label="权限名称：" prop="displayName">
            <Input v-model="formModel.displayName" placeholder="权限名称"></Input>
          </FormItem>
          <FormItem label="选择上级：">
            <cascader-menu v-model="formModel.parentId"/>
          </FormItem>
          <FormItem label="权限描述：">
            <Input v-model="formModel.description" type="textarea" :rows="4" placeholder="请输入菜单描述"></Input>
          </FormItem>
          <FormItem label="克隆下级：">
            <Checkbox v-model="formModel.cloneAllChildren"></Checkbox>
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
import { Modal, Checkbox } from "iview";
import { MenuClone } from "@/api";
import CascaderMenu from "@/components/CascaderMenu";
export default {
  name: "",
  data() {
    return {
      formModel: {},
      rules: {
        displayName: [
          {
            required: true,
            message: "请输入权限名称",
            trigger: "blur"
          }
        ]
      },
      orgLoading: false
    };
  },
  components: {
    Modal,
    CascaderMenu,
    Checkbox
  },
  props: {
    value: Boolean
  },
  methods: {
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.orgLoading = true;
          // let data = Object.assign(this.data,this.formModel);
          MenuClone(this.formModel)
            .then(res => {
              this.$Message.success("克隆成功");
              this.cancel();
              this.$store.dispatch("getAllPermiss", {isadmin: true});
            })
            .finally(() => {
              this.orgLoading = false;
            });
        }
      });
    },
    cancel() {
      // this.formModel = {}
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