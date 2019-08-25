<template>
  <div>
    <div class="organ-form-item">
      <Alert type="success">党组织奖惩信息</Alert>
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
import {
  Table,
  Page,
} from "iview";
import {
  GetOgranBonusPenaltyByOrganIdAsync
} from "@/api/partyOrganizationService";
import {
  Penalty,
  Replacement,
  Assessment
} from "@/pages/model/OrganizationOther";
import OrganizationCascaderParent from "@/components/OrganizationCascaderParent";
import UploadAttachment from "@/components/UploadAttachment";
import { GetUpLoadAuth } from "@/api";
export default {
  components: {
    Table,
    Page,
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
      showModal: false,
      modalTitle: "",
      modalLoading: false,
      model: new Penalty(),
      rules: Penalty.getRules(),
      modalSpin: false,
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
          title: "党组织受奖惩名称",
          tooltip: true,
          render(h, { row }) {
            return h(
              "span",
              that.GetCodeTableValue(row.bonnusPenaltyName, "OrganPenalty")
            );
          }
        },
        {
          title: "党组织受奖惩批准日期",
          tooltip: true,
          render(h, { row }) {
            return h("span", that.FormatDate(row.approvalDate, "yyyy-MM-dd"));
          }
        },
        {
          title: "奖惩批准党组织名称",
          key: "approvalOrganName",
          tooltip: true
        },
        {
          title: "奖惩依据",
          tooltip: true,
          render(h, { row }) {
            if (row.accordingAttach) {
              return h(
                "span",
                {
                  class: "zdy-table-link success",
                  on: {
                    click() {
                      that.downLoad(row.accordingAttach.id);
                    }
                  }
                },
                row.accordingAttach.name
              );
            } else {
              return h("span", "-");
            }
          }
        },
      ]
    };
  },
  methods: {
    downLoad(id) {
      GetUpLoadAuth().then(res => {
        window.open(
          `${UPLOAD_PATH}/file/download?project=${res.project}&token=${
            res.token
          }&id=${id}`
        );
      });
    },
    loadData() {
      let params = JSON.parse(JSON.stringify(this.params));
      params.SkipCount =
        this.params.pageIndex * this.params.MaxResultCount -
        this.params.MaxResultCount;
      params.key = this.organization.id;
      this.loading = true;
      GetOgranBonusPenaltyByOrganIdAsync(params)
        .then(res => {
          this.total = res.totalCount;
          this.data = res.items;
        })
        .finally(() => {
          this.loading = false;
        });
    },
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
