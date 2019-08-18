<template>
  <div class="organization-multipe-select" ref="otb">
    <div class="organization-select-input text-ellipsis" @click="inputClick">
      <span v-if="!selectedOptions" class="organization-placeholder">请选择</span>
      {{selectedOptions}}
      <i class="otb-select-icon" :class="selectIcon"></i>
    </div>
    </Input>
    <div class="organization-tree-box" v-show="show">
      <div class="organization-tree-inner-box scroll">
        <Tree class="lhyj-tree" :load-data="loadData" :render="renderContent" :data="data"></Tree>
      </div>
    </div>
  </div>
</template>
<script>
import { GetListByParentIdAsync } from "@/api";
import { Tree, Checkbox, Input } from "iview";
export default {
  components: {
    Tree,
    Input,
    Checkbox
  },
  props: {
    value: Array,
    defaultData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      data: [],
      show: false,
      checkData: []
    };
  },
  computed: {
    selectIcon() {
      return this.show ? "ios-arrow-up" : 'ios-arrow-down" />';
    },
    selectedOptions() {
      let d = this.checkData.map(e => {
        return e.organName;
      });
      return d.length
        ? d.join(",")
        : this.defaultData
            .map(e => {
              return e.organName;
            })
            .join(",");
    }
  },
  methods: {
    inputClick() {
      this.show = !this.show;
    },
    checkChange() {
      let arr = [];
      let arr2 = [];
      let fn = arrs => {
        arrs.forEach(e => {
          if (e.selected) {
            arr.push(e.id);
            arr2.push(JSON.parse(JSON.stringify(e)));
          }
          if (e.children && e.children.length) {
            fn(e.children);
          }
        });
      };
      fn(this.data);
      this.checkData = arr2;
      this.$emit("input", arr);
    },
    fetchData(Id) {
      let params = {};
      if (Id) {
        params.id = Id;
      }
      return GetListByParentIdAsync(params);
    },
    loadData(item, callback) {
      let ids = this.defaultData.map(e => {
        return e.id || e.organId;
      });
      this.fetchData(item.id)
        .then(res => {
          let d = res.map(e => {
            if (e.hasChild) {
              e.children = [];
              e.loading = false;
            }
            e.selected = ids.includes(e.id);
            return e;
          });
          callback(d);
        })
        .catch(() => {
          callback();
        });
    },
    renderContent(h, { root, node, data }) {
      let that = this;
      let arr = [];
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
      return h(
        "span",
        {
          class: ["organization-tree-node"]
        },
        [
          h(Checkbox, {
            props: {
              value: node.node.selected
            },
            on: {
              "on-change"(v) {
                node.node.selected = v;
                that.checkChange();
              }
            }
          }),
          ...arr,
          h(
            "span",
            {
              on: {
                click(v) {
                  if (
                    v.target.parentNode.parentNode.querySelector(
                      ".ivu-tree-arrow i"
                    )
                  ) {
                    v.target.parentNode.parentNode
                      .querySelector(".ivu-tree-arrow")
                      .click();
                  } else if (
                    v.target.parentNode.querySelector(".ivu-checkbox")
                  ) {
                    v.target.parentNode.querySelector("label").click();
                  }
                }
              }
            },
            node.node.organName
          )
        ]
      );
    }
  },
  mounted() {
    this.fetchData(null).then(res => {
      let ids = this.defaultData.concat(this.checkData).map(e => {
        return e.id || e.organId;
      });
      let d = res.map(e => {
        if (e.hasChild) {
          e.children = [];
          e.loading = false;
        }
        e.selected = ids.includes(e.id);
        return e;
      });
      this.data = d;
    });
    this.$nextTick(() => {
      document.body.addEventListener("click", e => {
        let el = e.target || e.srcElement;
        let el2 = this.$refs["otb"];
        if (el2 && el2.contains && !el2.contains(el)) {
          this.show = false;
        }
      });
    });
  }
};
</script>

<style lang="less">
@import "../style/common.less";
.organization-multipe-select {
  width: 100%;
  display: inline-block;
  position: relative;
  .organization-tree-box {
    min-height: 204px;
    min-width: 160px;
    width: 100%;
    position: absolute;
    left: 0;
    top: 40px;
    z-index: 99999;
    padding: 5px 0;
    border: none;
  }
  .organization-tree-inner-box {
    border: solid 1px #e6e6e6;
    background-color: #f2f2f2;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 5px;
    box-sizing: border-box;
    width: 100%;
    overflow: auto;
    min-height: 50px;
    max-height: 400px;
    max-width: 400px;
  }
  .organization-select-input {
    width: 100%;
    min-height: 34px;
    border-radius: 4px;
    border: 1px solid #dfe5f2;
    line-height: 34px;
    padding: 0 15px;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.5s;
    &:hover {
      border: 1px solid @primary-color;
    }
  }
  .organization-placeholder {
    color: #c4c9d6;
    font-size: 14px;
  }
  .otb-select-icon {
    position: absolute;
    right: 10px;
    top: 15px;
  }
  .organization-tree-wrap {
    padding: 15px;
    box-sizing: border-box;
    position: relative;
  }
  .organization-tree-header {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-weight: 600;
  }
  .organization-tree-node {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
