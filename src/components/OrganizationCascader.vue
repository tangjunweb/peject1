<template>
  <Cascader
    :disabled="disabled"
    :change-on-select="isChangeOnSelect"
    :placeholder="placeholder"
    :transfer="transfer"
    :trigger="trigger"
    :data="data"
    :loadData="loadData"
    :clearable="clearable"
    :value="selectedOptions"
    :size="size"
    @on-change="handleChange"
  >
    <Input readonly :value="selectLable" :placeholder="placeholder" :size="size"></Input>
  </Cascader>
</template>
<script>
import { Cascader, Input } from "iview";
import { getCascaderValue, GetLableByValue } from "@/utils/util";
import { GetListByParentIdAsync } from "@/api";
export default {
  name: "organization-cascader",
  components: {
    Cascader,
    Input
  },
  props: {
    parented: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "请选择党组织"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isChangeOnSelect: {
      type: Boolean,
      default: true
    },
    transfer: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: "default"
    },
    trigger: {
      type: String,
      default: "click"
    },
    clearable: {
      type: Boolean,
      default: true
    },
    isChild: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: []
    };
  },
  computed: {
    selectedOptions() {
      return getCascaderValue(this.value, this.data);
    },
    selectLable() {
      return GetLableByValue(this.value, this.data) || this.label;
    },
    organizationChange() {
      return this.$store.state.organizationChange;
    },
    organId() {
      return this.$store.state.session.organId;
    }
  },
  watch: {
    organizationChange(n) {
      if (n) {
        this.init();
        this.$store.commit("UPDATESTATE", {
          organizationChange: false
        });
      }
    }
  },
  methods: {
    fetchData(Id = null) {
      return new Promise((resolve, reject) => {
        let params = {};
        if (Id) {
          params.id = Id;
        }
        GetListByParentIdAsync(params)
          .then(res => {
            resolve(
              res.map(e => {
                let obj = {
                  label: e.organName,
                  value: e.id,
                  path: e.organPath,
                  hasChild: e.hasChild,
                  organType: e.organType
                };
                if (
                  this.parented &&
                  !(e.parentId === null && this.organId === e.id)
                ) {
                  obj.disabled = true;
                }
                if (e.hasChild) {
                  obj.children = [];
                  obj.loading = false;
                }
                return obj;
              })
            );
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    loadData(item, callback) {
      item.loading = true;
      this.fetchData(item.value)
        .then(res => {
          if (res.length) {
            item.children = res;
          }
        })
        .complete(() => {
          item.loading = false;
          callback();
        });
    },
    handleChange(v) {
      this.$emit("input", v.length ? v[v.length - 1] : "");
      let fn = arr => {
        let obj = {};
        for (let a of arr) {
          if (a.value === v[v.length - 1]) {
            obj = a;
            break;
          } else if (a.children && a.children.length) {
            obj = fn(a.children);
            if (obj.value) {
              break;
            }
          }
        }
        return obj;
      };
      this.$emit("change", fn(this.data));
    },
    init() {
      this.fetchData(this.isChild ? this.organId : null).then(res => {
        this.data = res;
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
