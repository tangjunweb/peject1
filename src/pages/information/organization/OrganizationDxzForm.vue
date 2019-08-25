<template>
  <div>
    <div class="organ-form-item">
      <Alert type="success">党组织党小组成员信息</Alert>
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
      class-name="blue-modal"
      transfer
      width="700px"
    >
      <div class="scroll modal-scroll">
        <Form :label-width="120" ref="form" :model="model" :rules="rules">
          <FormItem label="党小组名称" prop="groupName">
            <Input  placeholder="请输入党小组名称" v-model="model.groupName"></Input>
          </FormItem>
          <FormItem label="成立时间">
            <DatePicker :transfer="true"  placeholder="选择日期" v-model="model.estabTime"></DatePicker>
          </FormItem>
          <FormItem label="党小组长" prop="leaderUserId">
            <Input
              :readonly="true"
              
              placeholder="请选择党小组长"
              v-model="model.leaderUserName"
            >
              <PartyMemberSelect
                @change="leaderNameChange"
                type="single"
                slot="append"
                :organId="organization.id"
                :name="model.leaderUserName"
                v-model="model.leaderUserId"
              >
                <Button type="default">选择党员</Button>
              </PartyMemberSelect>
            </Input>
          </FormItem>
          <FormItem label="党小组成员" prop="organGroupUsersDto">
            <Input :readonly="true"  placeholder="请输入姓名" v-model="manageText">
              <PartyMemberSelect
                @change="memeberChange"
                slot="append"
                type="mutalipy"
                :organId="organization.id"
                v-model="model.organGroupUsersDto"
              >
                <Button type="default">选择党员</Button>
              </PartyMemberSelect>
            </Input>
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
  Page,
  Modal,
  FormItem,
  Input,
  Form,
  Checkbox,
  DatePicker
} from "iview";
import {
  GetOrganGroupListByOrganIdAsync,
  GetOrganGroupDetailsByIdAsync,
  UpdateOrganGroupAsync,
  CreateOrganGroupAsync,
  DeleteOrganGroupByGuidAsync
} from "@/api/partyOrganizationService";
import OrganTeam from "@/pages/model/OrganTeam";
import PartyMemberSelect from "@/pages/common/PartyMemberSelect";
import { GetTeamMemberDetail } from "@/api/partyMember";
export default {
  components: {
    Table,
    Page,
    Modal,
    FormItem,
    Form,
    Input,
    Checkbox,
    DatePicker,
    PartyMemberSelect
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
      isZdyZwmc: false,
      showModal: false,
      modalTitle: "",
      modalLoading: false,
      model: new OrganTeam(),
      rules: OrganTeam.getRules(),
      modalSpin: false,
      data: [],
      loading: false,
      params: {
        MaxResultCount: 5,
        SkipCount: 0,
        pageIndex: 1
      },
      total: 0,
      manageText: "",
      columns: [
        {
          title: "党小组名称",
          key: "groupName",
          tooltip: true
        },
        {
          title: "成立时间",
          tooltip: true,
          render(h, { row }) {
            return h("span", that.FormatDate(row.estabTime, "yyyy-MM-dd"));
          }
        },
        {
          title: "党小组长",
          tooltip: true,
          key: "leaderUserName"
        },
        {
          title: "党小组成员数量",
          tooltip: true,
          key: "groupUserCount"
        },
        {
          title: "操作",
          align: "right",
          width: 120,
          className: "zdy-table-opration",
          render(h, { row }) {
            return h("span", [
              h(
                "a",
                {
                  on: {
                    click() {
                      that.add(row);
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
                      that.del(row.id, 1);
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
    loadData() {
      let params = JSON.parse(JSON.stringify(this.params));
      params.SkipCount =
        this.params.pageIndex * this.params.MaxResultCount -
        this.params.MaxResultCount;
      params.OrganId = this.organization.id;
      this.loading = true;
      GetOrganGroupListByOrganIdAsync(params)
        .then(res => {
          this.total = res.length;
          this.data = res;
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
            ? UpdateOrganGroupAsync
            : CreateOrganGroupAsync;
          let title = this.model.id
            ? "党小组成员修改成功！"
            : "党小组成员添加成功！";
          this.model.organId = this.organization.id;
          fn(OrganTeam.getModels(this.model))
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
      this.modalTitle = data ? "编辑党小组成员" : "创建党小组成员";
      if (data) {
        this.model = new OrganTeam({
          organId: this.organization.id
        });
        GetOrganGroupDetailsByIdAsync({ id: data.id })
          .then(res => {
            this.model = new OrganTeam.setModels(res);
            this.model.id = data.id;
            this.manageText = `已选择${res.groupUserListsDto.length}个成员`;
          })
          .finally(() => {});
      } else {
        this.manageText = "";
        this.model = new OrganTeam({ organId: this.organization.id });
      }
    },
    leaderNameChange(leader) {
      this.model.leaderUserName = leader.name;
      this.model.leaderUserId = leader.id;
    },
    memeberChange(member) {
      this.manageText = `已选择${member.length}个成员`;
    },
    del(id) {
      this.$Modal.confirm({
        title: "系统提示",
        content: "确认删除？",
        onOk: () => {
          DeleteOrganGroupByGuidAsync({
            id
          }).then(res => {
            this.loadData();
            this.$Message.success("操作成功");
          });
        }
      });
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
