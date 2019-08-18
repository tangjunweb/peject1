<template>
  <div class="organization-suggestion">
    <TopCountTipsCard title="意见建议" :count="total" subTitle="总意见建议"></TopCountTipsCard>
    <Row type="flex" justify="space-between">
      <Col>
        <Form ref="form" inline>
          <FormItem label="党组织:" :label-width="80">
            <OrganizationCascader @change="organChange"></OrganizationCascader>
          </FormItem>
          <FormItem label="意见类型:" :label-width="80">
            <common-select keys="EnumOpinionsType" v-model="searchParams.OpinionsType"></common-select>
          </FormItem>
          <FormItem label="发布者姓名:" :label-width="100">
            <Input v-model="searchParams.CreationUserName" type="text" placeholder="输入发布者姓名搜索"></Input>
          </FormItem>
          <FormItem>
            <Button @click="loadData" type="primary">搜索</Button>
          </FormItem>
          <FormItem>
            <Button @click="reset" type="primary">重置</Button>
          </FormItem>
        </Form>
      </Col>
      <Col>
        <Button
          v-if="auth('/organization/suggestion/examine')"
          type="primary"
          ghost
          @click="$router.push('examine')"
        >待处理</Button>
      </Col>
    </Row>
    <Card class="border" :dis-hover="true">
      <Table :show-header="false" :loading="loading" stripe :columns="columns" :data="data"></Table>
      <div style="padding:30px 0 0 0" class="text-right">
        <Page
          :current.sync="params.pageIndex"
          :total="total"
          :page-size="params.MaxResultCount"
          class-name="lhyj-page"
          ghost
        />
      </div>
    </Card>
  </div>
</template>
<script>
import TopCountTipsCard from "@/components/TopCountTipsCard";
import { isEmptyObject } from "@/utils/util";
import {
  Form,
  FormItem,
  Input,
  Page,
  Table,
  Modal,
  Select,
  Option,
  Card,
  Time,
  Avatar
} from "iview";
import {
  OpinionsPageList,
  DeleteAnnouncement,
  SeeAnnouncemenPageList,
  GetAnnouncement,
  SendAnnouncement
} from "@/api";
import { getDateDiff } from "@/utils/util";
import ZwAvatar from "@/assets/images/avatar.png";
import CommonSelect from "@/components/CommonSelect";
import OrganizationCascader from "@/components/OrganizationCascader";
import { PartyMemberServiceGet } from "@/api/partyMember";
import { SkipCount, ClearParams, Auth } from "@/mixins";
import { mapState } from "vuex";
export default {
  mixins: [SkipCount, ClearParams, Auth],
  components: {
    TopCountTipsCard,
    Form,
    FormItem,
    Input,
    Page,
    Table,
    Modal,
    Select,
    Option,
    Card,
    OrganizationCascader,
    CommonSelect,
    Avatar
  },
  computed: {
    ...mapState({
      allroles: state => state.allroles,
      EnumAnnouncementSendType: state => state.baseCode.EnumAnnouncementSendType
    })
  },
  data() {
    let that = this;
    return {
      organId: "",
      loading: false,
      loadingExamine: false,
      showExamine: false,
      modalLoading: false,
      modalSpin: false,
      searchParams: {
        OpinionsType: "",
        CreationUserName: "",
        OrganPath: ""
      },
      searchParams1: {
        OpinionsType: "",
        CreationUserName: ""
      },
      params: {
        MaxResultCount: 9,
        SkipCount: 0,
        pageIndex: 1
      },
      params1: {
        MaxResultCount: 9,
        SkipCount: 0,
        pageIndex: 1
      },
      total: 0,
      total1: 0,
      columns: [
        {
          render(h, { row }) {
            return h(
              "div",
              {
                class: "form-post-table-list",
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
              [
                h(Avatar, {
                  props: {
                    src: row.headImage || ZwAvatar
                  },
                  style: {
                    marginRight: "15px"
                  }
                }),
                h(
                  "div",
                  {
                    class: "suggestion-wrap"
                  },
                  [
                    h(
                      "div",
                      {
                        class: "suggestion-head"
                      },
                      [
                        h(
                          "span",
                          {
                            class: "suggestion-item-name",
                            style: {
                              marginRight: "10px"
                            }
                          },
                          row.creatorUserName
                        ),
                        h(
                          "span",
                          {
                            style: {
                              fontSize: "12px"
                            }
                          },
                          getDateDiff(row.creationTime)
                        )
                      ]
                    ),
                    h(
                      "div",
                      {
                        class: "suggestion-content"
                      },
                      [
                        h(
                          "span",
                          {
                            class: "suggestion-item-tag"
                          },
                          that.GetCodeTableValue(
                            row.opinionsType,
                            "EnumOpinionsType"
                          )
                        ),
                        h(
                          "span",
                          {
                            class: "suggestion-item-text"
                          },
                          row.opinionsContent
                        )
                      ]
                    )
                  ]
                ),
                h(
                  "div",
                  {
                    class: "icon-group"
                  },
                  [
                    h("span", {
                      class: "icon-msg",
                      style: {
                        marginRight: "5px"
                      }
                    }),
                    h(
                      "span",
                      {
                        style: {
                          color: "#573E41",
                          marginRight: "5px"
                        }
                      },
                      "查看"
                    ),
                    h("span", row.viewCount)
                  ]
                )
              ]
            );
          }
        }
      ],
      data: [],
      dataExamine: []
    };
  },
  methods: {
    organChange(organ) {
      this.searchParams.OrganPath = organ.path;
      this.params = {
        MaxResultCount: 9,
        SkipCount: 0,
        pageIndex: 1
      };
    },
    showExamineModel() {
      this.showExamine = true;
      this.loadExamineData();
    },
    reset() {
      this.searchParams.CreationUserName = "";
      this.searchParams.OpinionsType = "";
      this.searchParams.OrganPath = "";
      this.loadData();
    },
    loadData() {
      let params = JSON.parse(JSON.stringify(this.params));
      params.SkipCount = this.SkipCount(
        params.MaxResultCount,
        params.pageIndex
      );
      Object.assign(params, this.searchParams);
      this.loading = true;
      OpinionsPageList(this.ClearParams(params))
        .then(res => {
          this.total = res.totalCount;
          this.data = res.items;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    loadExamineData() {
      let params1 = JSON.parse(JSON.stringify(this.params1));
      params1.SkipCount = this.SkipCount(
        params1.MaxResultCount,
        params1.pageIndex
      );
      Object.assign(params1, this.searchParams1);
      this.loadingExamine = true;
      OpinionsPageList(this.ClearParams(params1))
        .then(res => {
          this.total1 = res.totalCount;
          this.dataExamine = res.items;
        })
        .finally(() => {
          this.loadingExamine = false;
        });
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
<style lang="less">
.organization-suggestion {
  .form-post-table-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 0;
    cursor: pointer;
  }
  .suggestion-head {
    margin-bottom: 5px;
  }
  .suggestion-wrap {
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  .suggestion-item-name {
    font-size: 16px;
    color: rgb(87, 62, 65);
  }
  .suggestion-item-text {
    font-size: 14px;
  }
  .suggestion-item-tag {
    height: 20px;
    padding: 0 5px;
    text-align: center;
    line-height: 20px;
    margin-right: 11px;
    border-radius: 4px;
    background: #f5493f;
    color: #fff;
    font-size: 12px;
    display: inline-block;
  }
}
</style>
