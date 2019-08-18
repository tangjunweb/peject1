<template>
  <span>
    <Cascader v-if="isCascader" :disabled="disabled" :change-on-select="isChangeOnSelect" :placeholder="placeholder" :size="size" :transfer="transfer" :trigger="trigger" :data="data"
      :clearable="clearable" :value="selectedOptions" :render-format="format" @on-change="handleChange"></Cascader>
    <Select style="min-width:150px" :transfer="transfer" :size="size" v-else :clearable="clearable" :value="selectedOptions" :multiple="multiple" :disabled="disabled" @on-change="handleChange">
      <Option v-for="item in data" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
  </span>
</template>
<script>
import { getCascaderValue } from '@/utils/util';
import { Cascader, Select, Option } from 'iview';
import { mapState } from 'vuex';
export default {
  name: 'common-select',
  components: {
    Cascader,
    Select,
    Option
  },
  props: {
    format: {
      type: Function,
      //   default: (labels, selectedData) => {
      //     const index = labels.length - 1;
      //     const data = selectedData[index] || false;
      //     return labels[index];
      //   }
      default: label => label.join(' / ')
    },
    multiple: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'large'
    },
    trigger: {
      type: String,
      default: 'click'
    },
    transfer: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    isChangeOnSelect: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: [String, Number, Array],
    keys: String
  },
  computed: {
    isCascader() {
      let flag = false;
      if (this.data) {
        for (let el of this.data) {
          if (el.children && el.children.length) {
            flag = true;
            break;
          }
        }
      }
      return flag;
    },
    selectedOptions() {
      return this.isCascader ? getCascaderValue(this.value, this.data) : this.value;
    },
    data() {
      return this.baseCode[this.keys];
    },
    ...mapState(['baseCode'])
  },
  watch: {
    disabled: {
      immediate: true,
      handler(n) {}
    }
  },
  methods: {
    handleChange(v) {
      if (this.isCascader) {
        this.$emit('input', v.length ? v[v.length - 1] : '');
      } else {
        this.$emit('input', v);
      }
      this.$emit('change', v);
    }
  }
};
</script>
