<!-- 组织树 -->
<template>
  <div class="organization-tree-box" :class="theme">
    <div class="organization-tree-header">党组织机构树</div>
    <div class="organization-tree-wrap">
      <Tree class="lhyj-tree" :load-data="loadData" :render="renderContent" :data="data"></Tree>
      <Spin fix v-if="initLoading">
        <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
        <div>加载中</div>
      </Spin>
    </div>
  </div>
</template>
<script>
import { GetListByParentIdAsync } from "@/api";
import { Tree } from "iview";
export default {
  name: "organization-tree",
  data() {
    return {
      initLoading: false,
      data: []
    };
  },
  props: {
    theme: {
      type: String,
      default: ""
    }
  },
  methods: {
    fetchData(Id) {
      let params = {};
      if (Id) {
        params.id = Id;
      }
      return GetListByParentIdAsync(params);
    },
    loadData(item, callback) {
      this.fetchData(item.id)
        .then(res => {
          res.map(e => {
            if (e.hasChild) {
              e.children = [];
              e.loading = false;
            }
            e.selected = false;
            return e;
          });
          callback(res);
        })
        .catch(() => {
          callback();
        });
    },
    renderContent(h, { root, node, data }) {
      let that = this;
      let arr = [];
      if (this.theme === "blue") {
        if (!node.node.hasChild) {
          arr.push(
            h("i", {
              class: "lhyj_swdj lhyj_swdj-danghui_fuzhi",
              style: {
                transform: "translateY(-1px)",
                marginRight: "5px",
                fontSize: "13px"
              }
            })
          );
        }
      } else {
        arr.push(
          h("Icon", {
            props: {
              type: "ios-folder",
              size: 16,
              color: "#d83737"
            },
            style: {
              transform: "translateY(-1px)",
              marginRight: "5px"
            }
          })
        );
      }
      return h(
        "span",
        {
          class: [
            "organization-tree-node",
            node.node.selected ? "selected" : ""
          ],
          on: {
            click() {
              let fn = arr => {
                arr.forEach(e => {
                  if (e.id === node.node.id) {
                    e.selected = true;
                  } else {
                    e.selected = false;
                  }
                  if (e.children && e.children.length) {
                    fn(e.children);
                  }
                });
              };
              fn(that.data);
              that.$emit("on-select", node.node);
            }
          }
        },
        [
          ...arr,
          h(
            "span",
            {
              style: {
                marginLeft: node.node.hasChild ? "20px" : "2px"
              }
            },
            node.node.organName
          )
        ]
      );
    }
  },
  components: {
    Tree
  },
  mounted() {
    this.initLoading = true;
    this.fetchData(null)
      .then(res => {
        res.map(e => {
          if (e.hasChild) {
            e.children = [];
            e.loading = false;
          }
          e.selected = false;
          return e;
        });
        this.data = res;
      })
      .finally(() => {
        this.initLoading = false;
      });
  }
};
</script>
<style lang="less">
@import "~@/style/common.less";
.organization-tree-box {
  border: 1px solid @border-color-base;
  // &.blue {
  //     border: 1px solid #31498B;
  //     .organization-tree-header {
  //         background-color: #1b3786;
  //         color: #84D7FF;
  //     }
  //     .organization-tree-wrap {
  //         background-color: #04216d;
  //     }
  //     .lhyj-tree {
  //         .ivu-tree-arrow {
  //             margin-right: 0;
  //             width: 0;
  //             i {
  //                 background-image: url("../assets/zk-blue.png");
  //                 &.ivu-icon-ios-loading {
  //                     &::before {
  //                         color: #84D7FF;
  //                     }
  //                 }
  //             }
  //             &.ivu-tree-arrow-open {
  //                 i {
  //                     background-image: url("../assets/sq-blue.png");
  //                 }
  //             }
  //         }
  //     }
  //     .organization-tree-node {
  //         color: #84D7FF;
  //         i {
  //             color: #84D7FF;
  //         }
  //         &.selected {
  //             color: #FFD74F;
  //             i {
  //                 color: #FFD74F;
  //             }
  //         }
  //     }
  // }
}
.organization-tree-wrap {
  padding: 15px;
  box-sizing: border-box;
  position: relative;
  background: @component-background;
}
.organization-tree-header {
  height: 40px;
  background-color: @table-thead-bg;
  line-height: 40px;
  text-align: center;
  font-weight: 600;
}
.lhyj-tree {
	overflow-x: scroll;
  overflow-y: hidden;
  .ivu-tree-arrow {
    margin-right: 10px;
    i {
      background-image: url("../assets/zk.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width: 15px;
      height: 15px;
      transform: translateY(-1px);
      &::before {
        content: "";
      }
      &.ivu-icon-ios-loading {
        transition: all 0.2s ease-in-out;
        font-size: 14px;
        vertical-align: middle;
        background-image: none;
        width: auto;
        height: auto;
        transform: translateY(0);
        &::before {
          content: "\F45B";
          // color: @primary-color;
        }
      }
    }
    &.ivu-tree-arrow-open {
      i {
        background-image: url("../assets/sq.png");
        transform: rotate(0) translateY(-1px);
      }
    }
  }
}
.organization-tree-node {
  &:hover {
    cursor: pointer;
  }
  &.selected {
    color: @selected-color;
  }
}
</style>
