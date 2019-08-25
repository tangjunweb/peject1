<template>
  <div>
    <div class="organ-form-item">
      <Alert type="success">党组织支委会成员信息</Alert>
      <Table :loading="loading" :columns="columns" :data="data"></Table>
    </div>
  </div>
</template>
<script>
import { Table, Page } from "iview";
import { GetOrganBranchTeamMeberList } from "@/api/partyOrganizationService";
import OrganTeam from "@/pages/model/OrganTeam";
import CommonSelect from "@/components/CommonSelect";
import PartyMemberSelect from "@/pages/common/PartyMemberSelect";
import { GetTeamMemberDetail } from "@/api/partyMember";
export default {
  components: {
    Table,
    Page
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
      data: [],
      loading: false,
      params: {},
      columns: [
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
            return h(
              "span",
              that.GetCodeTableValue(row.partyDutyClass, "PartyDutyClass")
            );
          }
        }
      ]
    };
  },
  methods: {
    loadData() {
      let params = JSON.parse(JSON.stringify(this.params));
      params.id = this.organization.id;
      this.loading = true;
      GetOrganBranchTeamMeberList(params)
        .then(res => {
          this.total = res.length;
          this.data = res;
        })
        .finally(() => {
          this.loading = false;
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
