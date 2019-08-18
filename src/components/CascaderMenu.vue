<template>
  <Cascader
    :disabled="disabled"
    :change-on-select="isChangeOnSelect"
    :placeholder="placeholder"
    :transfer="transfer"
    :trigger="trigger"
    :data="data"
    :clearable="clearable"
    :value="selectedOptions"
    :size="size"
    @on-change="handleChange"
  >
    <Input
      readonly
      :value="selectLable"
      :placeholder="placeholder"
      :size="size"
      :clearable="clearable"
      @on-clear="clear"
    ></Input>
  </Cascader>
</template>
<script>
import { Cascader, Input } from "iview";
import { getCascaderValue, GetLableByValue } from "@/utils/util";
// import { GetListByParentIdAsync } from '@/api'
export default {
  name: "cascader-menu",
  components: {
    Cascader,
    Input
  },
  props: {
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
      default: "请选择父级"
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
    }
  },
  data() {
    return {};
  },
  computed: {
    data() {
      let fn = arr => {
        for (let k in arr) {
          arr[k].label = arr[k].displayName;
          arr[k].value = arr[k].id;
          if (arr[k].children && arr[k].children.length) {
            fn(arr[k].children);
          }
        }
        return arr;
      };
      return fn(this.$store.state.allPermiss);
    },
    selectedOptions() {
      return getCascaderValue(this.value, this.data);
    },
    selectLable() {
      return GetLableByValue(this.value, this.data) || this.label;
    }
  },
  methods: {
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
    clear() {
      this.$emit("input", "");
    }
  },
  mounted() {}
};
</script>
