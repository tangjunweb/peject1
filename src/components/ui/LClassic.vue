<template>
  <div class="lhyj-ui-classic clearfix">
    <div
      class="lhyj-ui-classic-item"
      @click.stop="classClick(i)"
      :class="el.selected ? 'selected' : ''"
      v-for="(el,i) in data"
      :key="i"
    >
      <Dropdown>
        <span>{{el.className}}</span>
        <DropdownMenu slot="list" v-if="el.children&&el.children.length">
          <template v-for="(el2,i2) in el.children">
            <Dropdown placement="right-start" :key="i2" v-if="el2.children&&el2.children.length">
              <DropdownItem>
                {{el2.className}}
                <Icon type="ios-arrow-forward"></Icon>
              </DropdownItem>
              <DropdownMenu slot="list">
                <DropdownItem
                  @click.stop="classClick(i,i2,i3)"
                  :class="el3.selected ? 'selected' : ''"
                  v-for="(el3,i3) in el2.children"
                  :key="i3"
                >{{el3.className}}</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </template>
          <template v-for="(el2,i2) in el.children">
            <DropdownItem
              v-if="!el2.children||el2.children.length == 0"
              :class="el2.selected ? 'selected' : ''"
              :key="i2"
            >{{el2.className}}</DropdownItem>
          </template>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { FormatResourceTypeData } from "@/utils/util";
import { Dropdown, DropdownItem, DropdownMenu } from "iview";
export default {
  props: {
    value: [String, Number]
  },
  components: {
    Dropdown,
    DropdownItem,
    DropdownMenu
  },
  computed: {
    ...mapState({
      resourceTypeLsit: state => state.resourceTypeLsit
    })
  },
  data() {
    return {
      data: []
    };
  },
  methods: {
    classClick(i, i2, i3) {
      let d = FormatResourceTypeData(this.resourceTypeLsit, null);
      d.forEach((e, index) => {
        if (index === i) {
          e.selected = true;
        } else {
          e.selected = false;
        }
      });
      if (i2 || i2 === 0) {
        d[i].children[i2].selected = true;
      }
      if (i3 || i3 === 0) {
        d[i].children[i2].children[i3].selected = true;
      }
      this.data = d;
      let resourceClassPath = "";
      if (i3 || i3 === 0) {
        resourceClassPath = d[i].children[i2].children[i3].resourceClassPath;
      } else if (i2 || i2 === 0) {
        resourceClassPath = d[i].children[i2].resourceClassPath;
      } else {
        resourceClassPath = d[i].resourceClassPath;
      }
      console.log(resourceClassPath)
      this.$emit("input", resourceClassPath);
      this.$emit("change");
    }
  },
  mounted() {
    this.$store.dispatch("getAllResourceClassList").then(res => {
      this.data = FormatResourceTypeData(this.resourceTypeLsit, null);
    });
  }
};
</script>
<style lang="less">
@import "../../style/common.less";
.lhyj-ui-classic {
  position: relative;
  width: 100%;
  min-height: 30px;
  line-height: 30px;
  height: auto;
  padding-bottom: 20px;
}
.lhyj-ui-classic-item {
  padding: 0 12px;
  float: left;
  font-size: 14px;
  margin-right: 20px;
  cursor: pointer;
  position: relative;
  border-radius: 4px;
  &:hover {
    color: @primary-color;
  }
  &:hover {
    & > .lhyj-ui-classic-modal-wrap {
      display: block;
    }
  }
  &.selected {
    background: #f65b52;
    color: #fff;
  }
}
.lhyj-ui-classic-modal-wrap {
  position: absolute;
  left: 0;
  top: 30px;
  display: none;
  z-index: 999;
}
.lhyj-ui-classic-modal {
  min-height: 222px;
  height: auto;
  width: 200px;
  border-radius: 2px;
  background: #f2f2f2;
}
.lhyj-ui-classic-modal-item {
  padding: 5px 15px;
  box-sizing: border-box;
  width: 100%;
  &:extend(.text-elips);
  &:hover,
  &.selected {
    background-color: @primary-color;
    color: #fff;
    transition: all 0.1s linear;
    & > .lhyj-ui-classic-modal-wrap {
      display: block;
      left: 200px;
      top: 0;
    }
  }
}
</style>
