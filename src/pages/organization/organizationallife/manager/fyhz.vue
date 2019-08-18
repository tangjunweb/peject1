<template>
  <!-- 发言汇总 -->
  <div>
    <Table :loading="loading" stripe border :columns="columns" :data="data"></Table>
    <div class="text-right" style="padding:30px 0 0 0">
      <Page
        :current.sync="params.pageIndex"
        :total="total"
        :page-size="params.MaxResultCount"
        class-name="lhyj-page"
      />
    </div>
  </div>
</template>
<script>
import { GetMeetingComment } from "@/api/service";
import { SkipCount, ClearParams } from "@/mixins";
import { Table, Page } from "iview";
import Sign from "@/pages/common/Sign";
export default {
  components: {
    Table,
    Page
  },
  mixins: [SkipCount, ClearParams],
  props: {
    meeting: Object
  },
  data() {
    let that = this;
    return {
      data: [],
      loading: false,
      columns: [
        {
          type: "selection",
          width: 60
        },
        {
          title: "姓名",
          tooltip: true,
          key: "name"
        },
        {
          title: "发言时间",
          tooltip: true,
          render(h, { row }) {
            return h(
              "span",
              that.FormatDate(row.creationTime, "yyyy-MM-dd hh:mm:ss")
            );
          }
        },
        {
          title: "发言内容",
          tooltip: true,
          key: "commentContent"
        }
      ],
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
      params.MeetingId = this.meeting.id;
      this.loading = true;
      GetMeetingComment(this.ClearParams(params))
        .then(res => {
          this.total = res.totalCount;
          this.tableData = res.items;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    reset() {}
  },
  mounted() {
    this.loadData();
  }
};
</script>
<style lang="less">
</style>


