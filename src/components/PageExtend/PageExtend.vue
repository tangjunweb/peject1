<template>
  <ul class="lhyj-paging" :class="wrapClasses">
    <li @click="changePage(currentPage-1)" :class="[prevClasses, {'ivu-page-disabled':finishState}]">
      <a>
        <i class="ivu-icon ivu-icon-ios-arrow-back"></i>
      </a>
    </li>
    <li :class="[{'ivu-page-item-active':currentPage==item.val},prefixCls + '-item', {'ivu-page-disabled':finishState}]" v-for="(item, index) in pagelist" :key="index" @click="changePage(item.val)">
      <a>{{item.text}}</a>
    </li>
    <li :class="[nextClasses, {'ivu-page-disabled':finishState}]" @click="changePage(currentPage+1)">
      <a>
        <i class="ivu-icon ivu-icon-ios-arrow-forward"></i>
      </a>
    </li>
  </ul>
</template>

<script>
var defaultTotal = 0;
const prefixCls = "ivu-page";
export default {
  name: "Paging",
  props: {
    resetTotal: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    className: {
      type: String
    },
    //当前请求是否完毕  完毕之后才能点击
    finishState: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls: prefixCls,
      pageGroup: 10, //可见分页数量 默认10个分页数,
      totalCountAdd: true,
      beforeTotalCount: 0,
      firstTotalCount: 0,
      isExtend: false
    };
  },
  watch: {
    currentPage: {
      handler(newValue, oldValue) {
        this.totalCountAdd = newValue > oldValue ? true : false;
      }
    }
  },
  computed: {
    totalCount() {
      if (!this.finishState) {
        if (this.currentPage == 1) {
          this.beforeTotalCount = this.firstTotalCount = this.resetTotal
            ? this.total
            : this.firstTotalCount || this.total;
          this.isExtend = this.total >= 101 ? true : false;
          this.$emit("update:resetTotal", false);
          console.log(this.firstTotalCount);
          return this.total;
        } else if (
          this.isExtend &&
          this.currentPage > 1 &&
          this.currentPage < 5
        ) {
          //当前分页不需要控制total
          return 101;
        }else if(!this.isExtend) {
          return this.firstTotalCount
        }
         else if (this.totalCountAdd) {
          this.beforeTotalCount =
            this.pageSize * (this.currentPage - 1) + this.total;
          return this.beforeTotalCount;
        } else {
          return this.beforeTotalCount;
        }
      } else {
        return this.beforeTotalCount;
      }
    },
    wrapClasses() {
      return [
        `${prefixCls}`,
        {
          [`${this.className}`]: !!this.className
        }
      ];
    },
    prevClasses() {
      return [
        `${prefixCls}-prev`,
        {
          [`${prefixCls}-disabled`]: this.currentPage === 1
        }
      ];
    },
    nextClasses() {
      return [
        `${prefixCls}-next`,
        {
          [`${prefixCls}-disabled`]: this.currentPage === this.totalPage
        }
      ];
    },
    totalPage: function() {
      return Math.ceil(this.totalCount / this.pageSize);
    },
    pagelist: function() {
      var list = [];
      var count = Math.floor(this.pageGroup / 2),
        center = this.currentPage;
      var left = 1,
        right = this.totalPage;

      if (this.totalPage > this.pageGroup) {
        if (this.currentPage > count + 1) {
          if (this.currentPage < this.totalPage - count) {
            left = this.currentPage - count;
            right = this.currentPage + count - 1;
          } else {
            left = this.totalPage - this.pageGroup + 1;
          }
        } else {
          right = this.pageGroup;
        }
      }

      // 遍历添加到数组里
      while (left <= right) {
        list.push({
          text: left,
          val: left
        });
        left++;
      }
      return list;
    }
  },
  methods: {
    changePage: function(idx) {
      if (this.finishState) return;
      if (idx != this.currentPage && idx > 0 && idx <= this.totalPage) {
        this.$emit("update:currentPage", Number(idx));
      }
    }
  }
};
</script>

<style scoped>
.lhyj-paging {
  display: inline-block;
}
</style>