<template>
  <div class="lhyj-ui-ztlist">
    <Row :gutter="25" type="flex" class="clearfix">
      <Col class="lhyj-ui-ztitem" v-for="(el,i) in data" :key="i">
        <Card>
          <dt class="lhyj-ui-ztitem-pic">
            <img v-imgerror.zt :src="el.coverPhoto||'@/assets/images/default-video.png'" alt />
          </dt>
          <dd class="lhyj-ui-ztitem-title">{{el.name}}</dd>
          <dd class="lhyj-ui-ztitem-bot">
            <div>资源数： {{el.resourceCount}}</div>
            <div class="text-center">
              <Button @click="showHandler(el)" type="primary">资源管理</Button>
            </div>
            <div class="list-item-util">
              <Icon
                v-if="auth('/resource/resource/zt/update')"
                @click.stop="$router.push({path: 'update',query: {id: el.id}})"
                size="24"
                type="ios-create-outline"
              ></Icon>
              <Icon
                v-if="auth('/resource/resource/delete')"
                @click.stop="del(el)"
                type="ios-trash"
                size="24"
              ></Icon>
            </div>
          </dd>
        </Card>
      </Col>
    </Row>
    <div class="no-data" v-if="!data.length">
      <img src="@/assets/images/no-data.png" alt />
    </div>
    <Modal
      :value.sync="showModal"
      title="资源管理"
      :closable="false"
      :mask-closable="false"
      :loading="modalLoading"
      transfer
      width="1000px"
      class-name="blue-modal"
    >
      <Tabs class="lhyj-tabs" v-model="tabName">
        <TabPane label="视频" name="video"></TabPane>
        <TabPane label="音频" name="audio"></TabPane>
        <TabPane label="文件" name="file"></TabPane>
        <TabPane label="电子书" name="book"></TabPane>
      </Tabs>
      <Form inline class="text-right">
        <FormItem>
          <ResourceSelect
            @change="change"
            :ResourceType="resource.type"
            :title="resource.name"
            type="multiple"
          >
            <Button type="primary" ghost>{{resource.name}}</Button>
          </ResourceSelect>
        </FormItem>
      </Form>
      <Table :columns="columns" :data="list"></Table>
      <div class="text-right" style="padding:30px 0 0 0">
        <Page
          :current.sync="params.pageIndex"
          :total="total"
          :page-size="params.MaxResultCount"
          class-name="lhyj-page"
        />
      </div>
      <div slot="footer">
        <Button @click="showModal = false">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import ResourceSelect from "@/pages/common/ResourceSelect";
import {
  DeleteSpecial,
  GetSpecialResourcePagedList,
  AddSpecialResource,
  RemoveSpecialResource
} from "@/api/resource";
import { Card, Modal, Tabs, TabPane, Form, FormItem, Page, Table } from "iview";
import { SkipCount, ClearParams, Auth } from "@/mixins";
export default {
  mixins: [SkipCount, ClearParams, Auth],
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    let that = this;
    return {
      list: [],
      showModal: false,
      modalLoading: false,
      searchParams: {},
      model: {},
      tabName: "video",
      params: {
        SkipCount: 0,
        MaxResultCount: 10,
        pageIndex: 1
      },
      columns: [
        {
          title: "资源名称",
          key: "name"
        },
        {
          title: "观看量",
          width: 80,
          key: "viewCount"
        },
        {
          title: "操作",
          align: "right",
          width: 80,
          className: "zdy-table-opration",
          render(h, { row }) {
            return h(
              "a",
              {
                on: {
                  click() {
                    that.$Modal.confirm({
                      title: "系统提示",
                      content: `确认删除资源${row.name}吗？`,
                      onOk: () => {
                        RemoveSpecialResource({
                          id: row.id
                        }).then(res => {
                          that.loadData();
                          that.$Message.success("删除成功");
                        });
                      }
                    });
                  }
                }
              },
              "删除"
            );
          }
        }
      ]
    };
  },
  components: {
    Card,
    Modal,
    Tabs,
    TabPane,
    ResourceSelect,
    Form,
    FormItem,
    Page,
    Table
  },
  computed: {
    resource() {
      if (this.tabName == "video") {
        return {
          name: "新增视频",
          type: 1
        };
      } else if (this.tabName == "audio") {
        return {
          name: "新增音频",
          type: 2
        };
      } else if (this.tabName == "file") {
        return {
          name: "新增文件",
          type: 3
        };
      } else if (this.tabName == "book") {
        return {
          name: "新增电子书",
          type: 3
        };
      }
    }
  },
  watch: {
    tabName(n) {
      this.loadData();
    }
  },
  methods: {
    showHandler(n) {
      this.model.id = n.id;
      this.showModal = true;
      this.loadData();
    },
    change(n) {
      let resources = n.map(e => e.id);
      let params = {
        specialId: this.model.id,
        resources: resources
      };
      AddSpecialResource(params).then(res => {
        this.$Message.success("新增成功");
        this.loadData();
      });
    },
    loadData() {
      let params = JSON.parse(JSON.stringify(this.params));
      params.SkipCount = this.SkipCount(
        params.MaxResultCount,
        params.pageIndex
      );
      params.SpecialId = this.model.id;
      Object.assign(params, this.searchParams);
      this.tableLoading = true;
      params.ResourceType = this.resource.type;
      GetSpecialResourcePagedList(this.ClearParams(params))
        .then(res => {
          this.total = res.totalCount;
          this.list = res.items;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    del(el) {
      this.$Modal.confirm({
        title: "系统提示",
        content: `确认删除专题'${el.name}'？`,
        onOk: () => {
          DeleteSpecial({
            id: el.id
          }).then(res => {
            this.$emit("change");
            this.$Message.success("操作成功");
          });
        }
      });
    }
  }
};
</script>
<style lang="less">
.lhyj-ui-ztlist {
  .lhyj-ui-ztitem-pic {
    img {
      width: 100%;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      height: 200px;
      display: block;
    }
  }
  .lhyj-ui-ztitem-bot {
    padding: 0 15px 10px;
  }
  .lhyj-ui-ztitem-title {
    line-height: 30px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 5px 15px;
    box-sizing: border-box;
    font-size: 16px;
    color: #303030;
  }
  .lhyj-ui-ztitem-bot-l,
  .lhyj-ui-ztitem-bot-r {
    float: left;
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #573e41;
    span {
      font-size: 12px;
    }
    i {
      font-size: 14px;
    }
  }
  .lhyj-ui-ztitem-bot-l {
    margin-right: 40px;
  }
  .lhyj-ui-ztitem {
    width: 20%;
    border-radius: 6px;
    margin-bottom: 15px;
    transition: all 0.2s linear;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    .list-item-util {
      float: right;
    }
    &:hover {
      .list-item-util {
        transform: translateY(0) !important;
      }
    }
  }
  .lhyj-ui-ztitem:nth-child(5n),
  .lhyj-ui-ztitem:first-child {
    margin-left: 0;
  }
  @media screen and (max-width: 1500px) {
    .lhyj-ui-ztitem {
      width: 25%;
    }
  }
  .lhyj-ui-ztitem .ivu-card-body {
    padding: 0;
  }
}
</style>


