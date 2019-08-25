<template>
  <div class="orginalmanage">
    <Row :gutter="15" style="margin-bottom:20px;" type="flex">
      <Col style="width:100%">
        <top-card class="orginalmanage-topcard">
          <Row :gutter="15" style="margin-bottom:20px;border-bottom:1px solid #DFE5F2" type="flex">
            <Col :span="4" class="ivu-form">
              <span class="ivu-form-item-label">党组织</span>
            </Col>
            <Col :span="16">
              <Form class="upload-list" ref="formValidate" label-position="left" :label-width="290">
                <FormItem label="机关党组织名称">
                  <Input disabled v-model="current.officeOrganName"></Input>
                </FormItem>
                <FormItem label="联点村（社区）党组织名称">
                  <Input disabled v-model="current.villageOrganName"></Input>
                </FormItem>
              </Form>
            </Col>
          </Row>
          <Row :gutter="15" style="margin-bottom:20px;" type="flex">
            <Col :span="4" class="ivu-form">
              <span class="ivu-form-item-label">需求清单</span>
            </Col>
            <Col :span="19">
              <Form
                ref="publicForm"
                :model="publicForm"
                :rules="ruleValidate"
                label-position="left"
                :label-width="290"
              >
                <FormItem label="上传需求清单" prop="invertory">
                  <Table
                    style="margin-bottom:20px"
                    :loading="loading"
                    stripe
                    :columns="columns"
                    :data="publicForm.invertory"
                  >
                    <template slot-scope="{ row, index }" slot="opration">
                      <a class="editiocn" @click="edit(row)">编辑</a>
                      <a class="del-btn" @click="del(row,index)">删除</a>
                    </template>
                  </Table>
                  <Button
                    @click="modal=true"
                    class="goupload"
                    style="margin-right:20px"
                    type="primary"
                  >
                    <Icon style="margin-top: -3px;" type="ios-add" size="21" />
                    <span>新增</span>
                  </Button>
                  <span style="position: absolute;left: 100px;">注：最多可上传10个资源清单</span>
                </FormItem>
              </Form>
            </Col>
          </Row>
        </top-card>
        <div class="card-footer">
          <Button @click="submit" class="confirm" style="margin-right:20px" type="primary">保存</Button>
          <Button class="quxiao" ghost type="primary">取消</Button>
        </div>
      </Col>
    </Row>
    <Modal title="新增" v-model="modal">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem label="资源类型：" style="display:block;" prop="invertoryType">
          <RadioGroup v-model="formInline.invertoryType">
            <Radio label="党建资源"></Radio>
            <Radio label="服务资源"></Radio>
            <Radio label="其他资源"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem style="display:block;" prop="invertoryContent">
          <Input
            v-model="formInline.invertoryContent"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请填写资源内容"
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="sure">确认</Button>
        <Button type="text" @click="cancel" ghost>取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { Select, Table, Modal, RadioGroup, Radio } from "iview";
import {
  PageVillageDorganListAsync,
  CreateZhDemandInventoryAsync,
  UpdateZhDemandInventoryAsync,
  GetZhDemandInventoryDetails
} from "@/api/Comprehensive";
import { ValidateInvertory } from "@/utils/validate";
export default {
  components: {
    Select,
    Table,
    Modal,
    RadioGroup,
    Radio
  },
  data() {
    return {
      modal: false,
      publicForm: {
        auditStatus: 0,
        invertory: []
      },
      //当前党组织信息
      current: {
        officeOrganName: "",
        villageOrganName: "",
        officeOrganId: "",
        villageOrganId: ""
      },
      columns: [
        {
          title: "资源类型",
          key: "invertoryType"
        },
        {
          title: "资源内容",
          key: "invertoryContent"
        },
        {
          title: "操作",
          tooltip: true,
          align: "center",
          width: "200px",
          slot: "opration"
        }
      ],
      formInline: {
        invertoryType: "",
        invertoryContent: ""
      },
      ruleValidate: {
        invertory: [
          {
            type: "array",
            required: true,
            validator: ValidateInvertory,
            trigger: "change"
          }
        ]
      },
      ruleInline: {
        invertoryType: [
          { required: true, message: "请选择资源类型", trigger: "change" }
        ],
        invertoryContent: [
          { required: true, message: "请填写资源内容", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    let id = this.$route.query.obj || "";
    console.log(id);
    if (id) {
      GetZhDemandInventoryDetails({ Id: id }).then(res => {
        this.publicForm.invertory = res;
      });
    }
     this.loadData();
  },
  watch: {
    "publicForm.invertory": {
      handler(val) {
        this.$refs.publicForm.validateField("invertory");
      }
    }
  },
  methods: {
    loadData() {
      PageVillageDorganListAsync().then(res => {
        this.current = res;
      });
    },
    edit(row) {
      for (var i in this.formInline) {
        this.formInline[i] = row[i];
      }
      this.modal = true;
    },
    del(row, index) {
      this.publicForm.invertory.splice(index, 1);
    },
    close() {
      this.modal = false;
    },
    sure() {
      this.$refs.formInline.validate(valid => {
        if (valid) {
          let Obj = {};
          for (var i in this.formInline) {
            Obj[i] = this.formInline[i];
          }
          this.publicForm.invertory.push(Obj);
          this.cancel();
        }
      });
    },
    submit() {
      this.$refs.publicForm.validate(valid => {
        if (valid) {
          let params = Object.assign(
            {},
            this.publicForm.invertory,
            this.current
          );
          let id = this.$route.query.obj;
          if (id) {
            UpdateZhDemandInventoryAsync(params).then(res => {
              this.$Message.success("资源清单更新成功");
              this.$router.push("/comprehensiveservice/resource/index");
            });
          } else {
            CreateZhDemandInventoryAsync(params).then(res => {
              this.$Message.success("资源清单上传成功");
              this.$router.push("/comprehensiveservice/resource/index");
            });
          }
        }
      });
    },
    cancel() {
      this.formInline.invertoryType = "";
      this.formInline.invertoryContent = "";
      this.close();
    }
  }
};
</script>
<style lang="less">
.orginalmanage {
  .goupload {
    width: 93px;
    background: rgba(200, 39, 33, 1);
    border-radius: 3px;
  }
  .editiocn {
    position: relative;
    padding-left: 18px;
    margin-right: 25px;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 4px;
      width: 14px;
      height: 14px;
      background: url("~@/assets/images/edit.png") left top no-repeat;
      background-size: 14px 14px;
    }
  }
  .del-btn {
    position: relative;
    padding-left: 18px;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 5px;
      width: 14px;
      height: 14px;
      background: url("~@/assets/images/delete.png") left top no-repeat;
      background-size: 14px 14px;
    }
  }
}
</style>