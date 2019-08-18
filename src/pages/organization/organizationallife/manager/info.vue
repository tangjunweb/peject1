<!-- 组织生活会议开展情况 -->
<template>
  <div class="organization-life-info">
    <Form inline>
      <FormItem label="党组织" :label-width="60">
        <OrganizationCascader :label="organName" v-model="searchParams.OrganId"></OrganizationCascader>
      </FormItem>
      <FormItem label="年份" :label-width="60">
        <DatePicker type="year" format="yyyy年" placeholder="选择年份" v-model="searchParams.Year"></DatePicker>
      </FormItem>
      <FormItem>
        <Button @click="loadData" type="primary" ghost>搜索</Button>
      </FormItem>
      <FormItem>
        <Button @click="reset" type="primary" ghost>重置</Button>
      </FormItem>
    </Form>
    <Card class="border" :dis-hover="true">
      <div>
        <Table :loading="loading" stripe border :columns="columns" :data="data"></Table>
        <div style="padding:30px 0 0 0" class='text-right'>
          <Page
            :current.sync="params.pageIndex"
            :total="total"
            :page-size="params.MaxResultCount"
            class-name="lhyj-page"
          />
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import { Form, FormItem, Page, Table, DatePicker, Card } from "iview";
import { SkipCount, ClearParams } from "@/mixins";
import { GetOrganPartyLifeListStatitics } from "@/api/statistics";
import OrganizationCascader from "@/components/OrganizationCascader";
export default {
  mixins: [SkipCount, ClearParams],
  components: {
    Card,
    Form,
    FormItem,
    Page,
    Table,
    OrganizationCascader,
    DatePicker
  },
  computed: {
    organName() {
      return this.$store.state.session.organName;
    }
  },
  data() {
    let that = this;
    return {
      loading: false,
      columns: [
        {
          title: "组织名称",
          key: "organName",
          tooltip: true
        },
        {
          title: "党员大会",
          key: "dydhMeetingCount",
          tooltip: true
        },
        {
          title: "支部委员会",
          tooltip: true,
          key: "zbwyhMeetingCount"
        },
        {
          title: "党小组会",
          tooltip: true,
          key: "dxzMeetingCount"
        },
        {
          title: "党课",
          tooltip: true,
          key: "dkMeetingCount"
        },
        {
          title: "党内集中活动",
          tooltip: true,
          key: "dzzshMeetingCount"
        },
        {
          title: "操作",
          tooltip: true,
          className: "zdy-table-opration",
          align: "right",
          render(h, { row }) {
            return h(
              "a",
              {
                on: {
                  click() {
                    that.$router.push({
                      path: "list",
                      query: {
                        organPath: row.organPath,
                        organName: row.organName
                      }
                    });
                  }
                }
              },
              "查看详情"
            );
          }
        }
      ],
      data: [],
      searchParams: {
        OrganId: "",
        Year: new Date()
      },
      total: 0,
      params: {
        MaxResultCount: 9,
        SkipCount: 0,
        pageIndex: 1
      }
    };
  },
  methods: {
    loadData() {
      let params = JSON.parse(JSON.stringify(this.params));
      params.SkipCount = this.SkipCount(
        params.MaxResultCount,
        params.pageIndex
      );
      Object.assign(params, this.searchParams);
      if (params.Year) {
        params.Year = params.Year.getFullYear();
      }
      this.loading = true;
      GetOrganPartyLifeListStatitics(this.ClearParams(params))
        .then(res => {
          this.total = res.totalCount;
          this.data = res.items;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    reset() {
      this.searchParams.OrganId = "";
      this.searchParams.Year = new Date();
      this.loadData();
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
<style lang="less">
</style>

