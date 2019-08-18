<template>
  <div>
    <Table :loading="loading" stripe :columns="columns" :data="data"></Table>
    <div class="text-right" style="padding:30px 0 0 0">
      <page-extend
        :current-page.sync="params.PageIndex"
        :total="total"
        :finishState="loading"
        :resetTotal.sync="resetTotal"
        :page-size="params.MaxResultCount"
        class-name="lhyj-page"
      />
    </div>
  </div>
</template>
<script>
import PageExtend from "@/components/PageExtend/PageExtend";
import { Table } from "iview";
import { SkipCountExtend, ClearParams, Auth } from "@/mixins";
import { PartyMemberPageList, PartyMemberDelete } from "@/api/partyMember";
export default {
  mixins: [SkipCountExtend, ClearParams, Auth],
  components: {
    Table,
    PageExtend
  },
  props: {
    organization: {
      type: Object
    },
    searchParams: {
      type: Object
    }
  },
  computed: {
    isIntranet() {
      return this.$store.state.session.isIntranet;
    }
  },
  watch: {
    organization: {
      deep: true,
      immediate: true,
      handler(n) {
        if (n) {
          this.searchParams.OrganPath = n.organPath;
          this.searchParams.OrganId = n.id;
          this.params = {
            MaxResultCount: 10,
            SkipCount: 0,
            PreSkipCount: 0,
            LastId: "",
            PageIndex: 1
          };
          this.loadData();
        }
      }
    }
  },
  data() {
    let that = this;
    return {
      loading: false,
      columns: [
        {
          width: 120,
          title: "姓名",
          tooltip: true,
          key: "name"
        },
        {
          title: "账号",
          minWidth: 200,
          tooltip: true,
          key: "userName"
        },
        {
          title: "性别",
          width: 80,
          align: "center",
          tooltip: true,
          render(h, { row }) {
            return h("span", that.GetCodeTableValue(row.sex, "Sex"));
          }
        },
        {
          title: "民族",
          width: 80,
          align: "center",
          tooltip: true,
          render(h, { row }) {
            return h("span", that.GetCodeTableValue(row.nation, "Nation"));
          }
        },
        {
          title: "年龄",
          minWidth: 80,
          align: "center",
          tooltip: true,
          key: "age"
        },
        {
          title: "党员类别",
          minWidth: 120,
          align: "center",
          tooltip: true,
          render(h, { row }) {
            return h(
              "span",
              that.GetCodeTableValue(row.partyMemeberType, "PartyMemeberType")
            );
          }
        },
        {
          title: "所在党支部",
          minWidth: 500,
          tooltip: true,
          key: "organName"
        }
        // {
        //   title: "信息完整度",
        //   width: 150,
        //   tooltip: true,
        //   key: "intergrity"
        // }
      ],
      data: [],
      total: 0
    };
  },
  methods: {
    loadData() {
      this.loading = true;
      let params = JSON.parse(JSON.stringify(this.params));
      params.SkipCount = this.SkipCount(
        params.MaxResultCount,
        params.PageIndex
      );
      Object.assign(params, this.searchParams);

      if (params.PageIndex == 1) {
        delete params.LastId;
      }
      PartyMemberPageList(this.ClearParams(params))
        .then(res => {
          this.total = res.totalCount || res.length;
          this.data = res.items || res;
          this.params.LastId = res.lastId;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    this.loadData();

    // isIntranet
    let that = this;
    if (this.isIntranet) {
      this.columns.splice(2, 0, {
        title: "身份证号码",
        width: 200,
        tooltip: true,
        key: "idCard"
      });
      this.columns.push({
        title: "操作",
        tooltip: true,
        width: 200,
        align: "right",
        fixed: "right",
        className: "zdy-table-opration",
        render(h, { row }) {
          let arrs = [];
          if (that.auth("/information/party-member/info")) {
            arrs.push(
              h(
                "a",
                {
                  on: {
                    click() {
                      that.$router.push({
                        path: "info",
                        query: {
                          id: row.id
                        }
                      });
                    }
                  }
                },
                "查看详情"
              )
            );
          }
          if (that.auth("/information/party-member/edit")) {
            arrs.push(
              h(
                "a",
                {
                  on: {
                    click() {
                      that.$router.push({
                        path: "edit",
                        query: {
                          id: row.id
                        }
                      });
                    }
                  }
                },
                "编辑"
              )
            );
          }
          if (that.auth("/information/party-member/delete")) {
            arrs.push(
              h(
                "a",
                {
                  on: {
                    click() {
                      that.$Modal.confirm({
                        title: "系统提示",
                        content: "确认删除党员？",
                        onOk: () => {
                          PartyMemberDelete({
                            id: row.id
                          }).then(res => {
                            that.$Message.success("删除成功");
                            that.loadData();
                          });
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            );
          }
          return h("span", arrs);
        }
      });
    }
  }
};
</script>
