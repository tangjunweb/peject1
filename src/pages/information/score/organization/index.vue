<template>
  <Card class="information-score-organization border" :dis-hover="true">
    <Form inline>
      <FormItem label="人员类别：" label-width="100">
        <Input type='text'></Input>
      </FormItem>
    </Form>
    <Table :loading="loading" stripe :columns="columns" :data="data"></Table>
    <div class="text-right" style="padding:30px 0 0 0">
      <Page
        :current.sync="params.pageIndex"
        :total="total"
        :page-size="params.MaxResultCount"
        class-name="lhyj-page"
      />
    </div>
  </Card>
</template>

<script>
import { Form, FormItem, RadioGroup, Radio, Card, Table, Page } from "iview";
import { SkipCount, ClearParams, Auth } from "@/mixins";
export default {
  mixins: [SkipCount, ClearParams, Auth],
  components: {
    Form,
    FormItem,
    RadioGroup,
    Radio,
    Card,
    Table,
    Page
  },
  data() {
    return {
      loading: false,
      params: {
        MaxResultCount: 9,
        SkipCount: 0,
        pageIndex: 1
      },
      total: 0,
      data: [],
      columns: [
        {
          title: "排名",
          key: "noticeTitle",
          minWidth: 300
        },
        {
          title: "姓名",
          key: "noticeContent",
          minWidth: 400,
          ellipsis: true
        },
        {
          title: "账号",
          width: 180,
          render(h, { row }) {
            return h(
              "span",
              new Date(row.creationTime).Format("yyyy-MM-dd hh:mm:ss")
            );
          }
        },
        {
          title: "所在党组织",
          width: 100,
          render(h, { row }) {
            return h(
              "span",
              that.GetCodeTableValue(
                row.announcementType,
                "EnumAnnouncementType"
              )
            );
          }
        },
        {
          title: "是否达标",
          width: 100,
          render(h, { row }) {
            return h(
              "span",
              that.GetCodeTableValue(
                row.announcementSendType,
                "EnumAnnouncementSendType"
              )
            );
          }
        },
        {
          title: "操作",
          align: "right",
          width: 200,
          className: "zdy-table-opration",
          render(h, { row }) {
            let arr = [];
            if (that.auth("/information/notice/info")) {
              if (row.announcementSendType) {
                arr.push(
                  h(
                    "a",
                    {
                      on: {
                        click() {
                          GetAnnouncement({
                            id: row.id
                          }).then(res => {
                            that.model = res;
                            that.showModal = true;
                          });
                        }
                      }
                    },
                    "查看"
                  )
                );
              }
            }
            return h(
              "span",
              {
                class: "table-btn-group"
              },
              [...arr]
            );
          }
        }
      ]
    };
  }
};
</script>

<style lang='less'>
.information-score-organization {
  margin-top: 20px;
}
</style>
