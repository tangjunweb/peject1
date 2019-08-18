<template>
  <div>
    <TopCountTipsCard title="码表类型管理" :count="data.length" subTitle="码表类型总数"></TopCountTipsCard>
    <Row class="text-right">
      <Form ref="form" inline>
        <FormItem>
          <Button type="primary" ghost @click="show = true">新建</Button>
        </FormItem>
      </Form>
    </Row>
    <Card class="border" :dis-hover="true">
      <Table :loading="loading" :columns="columns" :data="data"></Table>
      <Modal
        v-model="show"
        title="添加类型"
        :closable="false"
        :loading="modalLoading"
        :mask-closable="false"
        width="600px"
        class="modal-form"
      >
        <Form ref="form" :label-width="120" :model="formModel" :rules="rules">
          <FormItem label="名称" prop="text">
            <Input v-model="formModel.text" placeholder="请输入名称"></Input>
          </FormItem>
          <FormItem label="值" prop="value">
            <Input v-model="formModel.value" placeholder="请输入值"></Input>
          </FormItem>
          <FormItem label="排序">
            <InputNumber v-model="formModel.sort"></InputNumber>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="primary" :loading="modalLoading" @click="save">保存</Button>
          <Button @click="cancel">关闭</Button>
        </div>
      </Modal>
    </Card>
  </div>
</template>
<script>
import {
  Form,
  FormItem,
  Card,
  Table,
  Page,
  Input,
  Modal,
  InputNumber
} from "iview";
import TopCountTipsCard from '@/components/TopCountTipsCard'
import {
  GetBaseCodeTypes,
  CreateBaseCodeType,
  DeleteBaseCodeType
} from "@/api";
export default {
  components: {
    Form,
    FormItem,
    Card,
    Table,
    Input,
    Modal,
    InputNumber,
    TopCountTipsCard
  },
  data() {
    let that = this;
    return {
      loading: false,
      data: [],
      show: false,
      modalLoading: false,
      columns: [
        {
          title: "名称",
          key: "text"
        },
        {
          title: "值",
          key: "value"
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
                      that.del(row.id || row.value);
                    }
                  }
                },
                "删除"
              )
            ];
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
        text: "",
        value: "",
        sort: 0
      },
      rules: {
        text: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          }
        ],
        value: [
          {
            required: true,
            message: "请输入值",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    del(id) {
      this.$Modal.confirm({
        title: "系统提示",
        content: "确认删除此码表类型？",
        onOk: () => {
          DeleteBaseCodeType({ id }).then(res => {
            this.$Message.success("操作成功");
            this.loadData();
          });
        }
      });
    },
    loadData() {
      this.loading = true;
      GetBaseCodeTypes()
        .then(res => {
          this.data = res;
        })
        .complete(() => {
          this.loading = false;
        });
    },
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.modalLoading = true;
          CreateBaseCodeType(this.formModel)
            .then(res => {
              this.$Message.success("添加成功");
              this.show = false;
              this.loadData();
            })
            .complete(() => {
              this.modalLoading = false;
            });
        }
      });
    },
    cancel() {
      this.$refs["form"].resetFields();
      this.show = false;
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
<style lang="less" scoped>
</style>


