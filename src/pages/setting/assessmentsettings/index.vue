<template>
  <div class="assessmentsettings">
    <TopCountTipsCard title="党员考核设置" :count="data.length" subTitle="考核标准数"></TopCountTipsCard>
    <Card class="border" :dis-hover="true">
      <Table :loading="loading" stripe border :columns="columns" :data="data"></Table>
    </Card>
  </div>
</template>
<script>
import TopCountTipsCard from "@/components/TopCountTipsCard";
import { Table, Card } from "iview";
import { UserExaminationRuleList } from "@/api";
import { Auth } from "@/mixins";
export default {
  mixins: [Auth],
  components: {
    TopCountTipsCard,
    Table,
    Card
  },
  data() {
    let that = this;
    return {
      loading: false,
      columns: [
        {
          title: "考核对象",
          tooltip: true,
          render(h, { row }) {
            return h(
              "span",
              that.GetCodeTableValue(row.assessType, "EnumAssessType")
            );
          }
        },
        {
          title: "线上学时最低要求（学时/年）",
          tooltip: true,
          key: "onlinePassPeriodForYear"
        },
        {
          title: "线下学时最低要求（学时/年）",
          tooltip: true,
          key: "offlinePassPeriodForYear"
        },
        {
          title: "每人每日学时上限(学时)",
          tooltip: true,
          key: "dayPeriodLimit"
        },
        {
          title: "参加组织生活最低要求（学时/月）",
          tooltip: true,
          key: "partyMeetingPassTimeForMonth"
        },
        {
          title: "操作",
          align: "right",
          width: 80,
          render(h, { row }) {
            return h(
              "a",
              {
                on: {
                  click() {
                    that.$router.push({
                      path: "create",
                      query: row
                    });
                  }
                }
              },
              "编辑"
            );
            return h("span", "-");
          }
        }
      ],
      data: []
    };
  },
  methods: {
    loadData() {
      this.loading = true;
      UserExaminationRuleList()
        .then(res => {
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
.layout-lr.assessmentsettings {
  // padding: 30px;
  .layout-lr-lc {
    // padding-top: 60px;
    .layout-lr-lch {
      height: 60px;
      line-height: 60px;
      .layout-lr-lch-item {
        height: 60px;
        line-height: 60px;
      }
    }
  }
  .layout-lr-form {
    // padding: 30px;
  }
}
</style>
