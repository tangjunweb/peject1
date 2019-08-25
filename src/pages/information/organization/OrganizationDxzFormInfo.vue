<template>
  <div>
    <div class="organ-form-item">
      <Alert type="success">党组织党小组成员信息</Alert>
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
  </div>
</template>
<script>
import { Table, Page } from "iview";
import {
  GetOrganGroupListByOrganIdAsync,
} from "@/api/partyOrganizationService";
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
      params: {
        MaxResultCount: 5,
        SkipCount: 0,
        pageIndex: 1
      },
      total: 0,
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
