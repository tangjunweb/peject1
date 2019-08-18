<template>
  <div class="organization-forum">
    <Form inline>
      <FormItem>
        <Input v-model="searchParams.Title" ghost placeholder="请输入主题名称"></Input>
      </FormItem>
      <FormItem>
        <Input v-model="searchParams.Publisher" placeholder="请输入发布者姓名"></Input>
      </FormItem>
      <FormItem>
        <Button @click="loadData" ghost type="primary">搜索</Button>
      </FormItem>
      <FormItem>
        <Button @click="reset" ghost type="primary">重置</Button>
      </FormItem>
      <FormItem>
        <Button
          v-if="auth('/organization/forum/create')"
          @click="$router.push('create')"
          ghost
          type="primary"
        >发布帖子</Button>
      </FormItem>
    </Form>
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
import {
  Table,
  Page,
  Breadcrumb,
  BreadcrumbItem,
  Input,
  FormItem,
  Form,
  Time,
  Card
} from "iview";

import { SkipCount, ClearParams, Auth } from "@/mixins";
export default {
  mixins: [SkipCount, ClearParams, Auth],
  components: {
    Card,
    Table,
    Page,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Input,
    Time
  },
  data() {
    let that = this;
    return {
      loading: false,
      searchParams: {
        Title: "",
        Publisher: ""
      },
      data: [],
      columns: [
        {
          render(h, { row }) {
            let tagArr = [];
            if (row.topMark) {
              tagArr.push(
                h(
                  "span",
                  {
                    class: "form-tag"
                  },
                  "置顶"
                )
              );
            }
            return h(
              "div",
              {
                class: "form-post-table-list"
              },
              [
                h(
                  "div",
                  {
                    class: "form-post-table-list-h",
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
                  [...tagArr, h("span", { class: "form-title" }, row.title)]
                ),
                h(
                  "div",
                  {
                    class: "form-post-table-list-b icon-group"
                  },
                  [
                    h("span", {
                      class: "icon-house"
                    }),
                    h(
                      "span",
                      {
                        style: {
                          margin: "0 25px 0 15px",
                          color: "#573E41"
                        }
                      },
                      row.organName || "未知"
                    ),
                    h(Time, {
                      props: {
                        time: row.createTime
                      }
                    }),
                    h(
                      "span",
                      {
                        class: "icon-group",
                        style: {
                          paddingLeft: "20px"
                        }
                      },
                      [
                        h("i", {
                          class: "icon-eye",
                          style: {
                            marginRight: "10px"
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
                    ),
                    h(
                      "span",
                      {
                        class: "icon-group",
                        style: {
                          margin: "0 25px"
                        }
                      },
                      [
                        h("i", {
                          class: "icon-hands",
                          style: {
                            marginRight: "5px",
                            fontSize: "12px"
                          }
                        }),
                        h(
                          "span",
                          {
                            style: {
                              marginRight: "5px"
                            }
                          },
                          "点赞"
                        ),
                        h("span", row.likeCount)
                      ]
                    ),
                    h(
                      "span",
                      {
                        class: "icon-group"
                      },
                      [
                        h("i", {
                          class: "icon-msg",
                          style: {
                            marginRight: "5px",
                            fontSize: "12px"
                          }
                        }),
                        h(
                          "span",
                          {
                            style: {
                              marginRight: "5px"
                            }
                          },
                          "留言"
                        ),
                        h("span", row.replyCount)
                      ]
                    )
                  ]
                )
              ]
            );
          }
        },
        {
          width: 450,
          align: "right",
          render(h, { row }) {
            let arr = [];
            let toggle = (status = true) => {
              that.$Modal.confirm({
                title: "系统提示",
                content: `确认${status ? "取消" : ""}置顶？`,
                onOk: () => {
                  ForumServiceSetTopToggle({
                    id: row.id
                  }).then(res => {
                    that.loadData();
                    that.$Message.success(`${status ? "操作" : "置顶"}成功`);
                  });
                }
              });
            };
            if (row.topMark) {
              arr.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      ghost: true
                    },
                    on: {
                      click() {
                        toggle(row.topMark);
                      }
                    }
                  },
                  "取消置顶"
                )
              );
            } else {
              arr.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      ghost: true
                    },
                    on: {
                      click() {
                        toggle(row.topMark);
                      }
                    }
                  },
                  [
                    h("i", {
                      class: "lhyj_swdj lhyj_swdj-zhiding",
                      style: {
                        fontSize: "12px"
                      }
                    }),
                    h("span", "置顶")
                  ]
                )
              );
            }
            if (that.auth("/organization/forum/vote")) {
              arr.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      icon: "ios-paper-outline",
                      ghost: true
                    },
                    style: {
                      marginLeft: "15px"
                    },
                    on: {
                      click() {
                        that.$router.push({
                          path: "vote",
                          query: {
                            id: row.id
                          }
                        });
                      }
                    }
                  },
                  "投票管理"
                )
              );
            }
            if (that.auth("/organization/forum/update")) {
              arr.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      ghost: true
                    },
                    style: {
                      marginLeft: "15px"
                    },
                    on: {
                      click() {
                        that.$router.push({
                          path: "update",
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
            if (that.auth("/organization/forum/delete")) {
              arr.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      icon: "ios-trash",
                      ghost: true
                    },
                    style: {
                      marginLeft: "15px"
                    },
                    on: {
                      click() {
                        that.$Modal.confirm({
                          title: "系统提示",
                          content: "确认删除帖子？",
                          onOk: () => {
                            ForumServiceDelete({
                              id: row.id
                            }).then(res => {
                              that.loadData();
                              this.$Message.success("删除成功");
                            });
                          }
                        });
                      }
                    }
                  },
                  "删帖"
                )
              );
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
      Object.assign(params, this.searchParams);
      this.loading = true;
      ForumServicePageList(this.ClearParams(params))
        .then(res => {
          this.total = res.totalCount;
          this.data = res.items;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    reset() {
      this.searchParams.Title = "";
      this.searchParams.Publisher = "";
      this.loadData();
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
<style lang="less">
.organization-forum {
  .form-post-table-list {
    padding: 15px 0;
  }
  .form-post-table-list-b {
    margin-top: 10px;
  }
  .ivu-time {
    color: #999;
  }
  .form-post-table-list-h {
    cursor: pointer;
    display: flex;
    align-items: center;
    .form-tag {
      width: 40px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      margin-right: 11px;
      border-radius: 4px;
      background: #f5493f;
      color: #fff;
      font-size: 12px;
      display: inline-block;
    }
    .form-title {
      color: #573e41;
      font-size: 16px;
    }
  }
}
</style>
