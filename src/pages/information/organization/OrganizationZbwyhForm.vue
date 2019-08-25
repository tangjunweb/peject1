<template>
  <div>
    <div class="organ-form-item">
      <div class="table-h-btn text-right">
        <Button
          type="primary"
          style="margin-right:15px"
          @click="batchDel"
          :disabled="selectData.length === 0"
        >批量删除</Button>
        <PartyMemberSelect
          @change="leaderNameChange"
          slot="append"
          type="mutplite"
          :organId="organization.id"
          v-model="defaultSelect"
        >
          <Button type="primary">选择党员</Button>
        </PartyMemberSelect>
      </div>
      <Table :loading="loading" :columns="columns" :data="data" @on-selection-change="selectChange"></Table>
    </div>
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
  GetOrganBranchTeamMeberList,
  CreateOrganBranchTeamMeber,
  DeleteOrganBranchTeamMeber
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
      model: new OrganTeam(),
      selectData: [],
      data: [],
      loading: false,
      params: {},
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "姓名",
          key: "name",
          tooltip: true
        },
        {
          title: "性别",
          render(h, { row }) {
            return h("span", that.GetCodeTableValue(row.sex, "Sex"));
          }
        },
        {
          title: "手机号",
          key: "phoneNumber",
          tooltip: true
        },
        {
          title: "职务级别",
          render(h, { row }) {
            return h("span", that.GetCodeTableValue(row.partyDutyClass, "PartyDutyClass"));
          }
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
                      that.del([row.userId]);
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
  computed: {
    defaultSelect() {
      return this.data.map(e => {
        return {
          name: e.name,
          id: e.userId
        };
      });
    }
  },
  methods: {
    loadData() {
      let params = JSON.parse(JSON.stringify(this.params));
      params.id = this.organization.id;
      this.loading = true;
      GetOrganBranchTeamMeberList(params)
        .then(res => {
          this.data = res;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    batchDel() {
      this.$Modal.confirm({
        title: "系统提示",
        content: "确认删除",
        onOk: () => {
          let params = {
            userIds: [this.selectData],
            organId: this.organization.id
          };
          DeleteOrganBranchTeamMeber(params).then(params => {
            this.loadData();
            this.$Message.success("操作成功");
          });
        }
      });
    },
    selectChange(d) {
      this.selectData = d.map(e => e.userId);
    },
    leaderNameChange(leader) {
      let userIds = leader.map(e => e.id);
      let params = {
        userIds: userIds,
        organId: this.organization.id
      };
      CreateOrganBranchTeamMeber(params).then(res => {
        this.$Message.success("添加成功");
        this.loadData();
      });
    },
    del(ids) {
      let params = {
        userIds: [...ids],
        organId: this.organization.id
      };
      this.$Modal.confirm({
        title: "系统提示",
        content: "确认删除？",
        onOk: () => {
          DeleteOrganBranchTeamMeber(params).then(params => {
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
