<template>
  <Card :bordered="false" :dis-hover="true">
    <div slot="title" class="text-right">
      <Button type="primary" ghost @click="addMenu">新增权限</Button>
      <!-- <Button type="primary" size="small" ghost @click="addMenu" >删除权限</Button> -->
    </div>
    <div style="position:relative">
      <ZkTable
        ref="table"
        sum-text="sum"
        index-text="#"
        :data="allPermiss"
        :columns="columns"
        :stripe="props.stripe"
        :border="props.border"
        :show-header="props.showHeader"
        :show-summary="props.showSummary"
        :show-row-hover="props.showRowHover"
        :show-index="props.showIndex"
        :tree-type="props.treeType"
        :is-fold="props.isFold"
        :expand-type="props.expandType"
        :selection-type="props.selectionType"
      >
        <template slot="opration" slot-scope="{row}">
          <div class="zdy-table-opration">
            <a @click="editMenu(row)">编辑</a>
            <!-- <Poptip confirm title="确认删除该菜单?" @on-ok="deleteMenu(row)" transfer> -->
            <a @click="deleteMenu(row)">删除</a>
            <!-- </Poptip> -->
            <a @click="cloneMenu(row)">克隆</a>
          </div>
        </template>
      </ZkTable>
      <Spin v-show="spinShow" fix></Spin>
    </div>
    <menu-modal v-model="showMenuModal" :title="menuTitle" ref="menuModal"/>
    <clone-modal v-model="showCloneModal" ref="cloneModal"/>
  </Card>
</template>
<script>
import MenuModal from "./children/menuModal";
import CloneModal from "./children/cloneModal";
import ZkTable from "vue-table-with-tree-grid";
import { Auth } from '@/mixins'
import { Card, Poptip } from "iview";
import { mapState } from "vuex";
import { MenuDelete } from "@/api";
export default {
  name: "",
  data() {
    return {
      showMenuModal: false,
      menuTitle: "新增权限",
      spinShow: false,
      showCloneModal: false,
      cloneData: {},
      props: {
        stripe: true,
        border: true,
        showHeader: true,
        showSummary: false,
        showRowHover: true,
        showIndex: false,
        treeType: true,
        isFold: true,
        expandType: false,
        selectionType: false
      },
      columns: [
        {
          label: "名称",
          prop: "displayName"
        },
        {
          label: "路径",
          prop: "url"
        },
        {
          label: "图标",
          prop: "iconPath"
        },
        {
          label: "权限标识",
          prop: "permissionName"
        },
        {
          label: "权限描述",
          prop: "description"
        },
        {
          label: "操作",
          prop: "opration",
          type: "template",
          template: "opration"
        }
      ]
    };
  },
  computed: {
    ...mapState(["allPermiss"])
  },
  mixins: [Auth],
  components: {
    MenuModal,
    ZkTable,
    Card,
    Poptip,
    CloneModal
  },
  methods: {
    editMenu(data) {
      let model = JSON.parse(JSON.stringify(data));
      model.type = model.type ? model.type.toLocaleString() : model.type;
      this.$refs.menuModal.formModel = model;
      this.menuTitle = "编辑权限";
      this.showMenuModal = true;
    },
    deleteMenu(data) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确认删除该菜单?</p>",
        onOk: () => {
          MenuDelete({
            Id: data.id
          }).then(res => {
            this.$Message.success("删除成功");
            this.spinShow = true;
            this.$store.dispatch("getAllPermiss", {isadmin: true}).finally(res => {
              this.spinShow = false;
            });
          });
        }
      });
    },
    addMenu() {
      this.menuTitle = "新增权限";
      this.showMenuModal = true;
    },
    cloneMenu(data) {
      let obj = {
        menuButtonId: data.id,
        displayName: data.displayName,
        parentId: "",
        description: "",
        cloneAllChildren: true
      };
      this.$refs.cloneModal.formModel = obj;
      // this.$refs.cloneModal.formModel.menuButtonId = data.id;
      // this.$refs.cloneModal.formModel.displayName = data.displayName;
      // this.$refs.cloneModal.formModel.parentId = '';
      // this.$refs.cloneModal.formModel.description = '';
      this.showCloneModal = true;
    }
  },
  mounted() {
    //do something after mounting vue instance
    this.spinShow = true;
    this.$store.dispatch("getAllPermiss", {isadmin: true}).finally(res => {
      this.spinShow = false;
    });
  }
};
</script>
<style lang="less" scoped>
</style>