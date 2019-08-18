<template>
  <Card :dis-hover="true" class="sub-resource border">
    <div class="lr-video-rbox">
      <div class="lr-video-h clearfix">
        <div class="lr-video-h-l">
          <span>{{this.isBranch ? '学习记录' : '资源排行榜'}}</span>
        </div>
        <div class="lr-video-h-r text-right">
          <!-- <Button type="warning" size="small">查看更多</Button> -->
        </div>
      </div>
      <Spin fix v-if="loading"></Spin>
      <component :is="componentId" :list="downList" :type="ResourceType"></component>
    </div>
  </Card>
</template>
<script>
import { Card, Divider } from "iview";
import LDownList from "@/components/ui/LDownList";
import LStudyRecord from "@/components/ui/LStudyRecord";
import {
  GetChildOrganResourceList,
  MyResourceStudyRecordPageList
} from "@/api/education";
export default {
  components: {
    Card
  },
  props: {
    ResourceType: {
      type: Number
    }
  },
  computed: {
    isBranch() {
      return !!this.$store.state.permissions["Pages.UserStudy"];
    },
    componentId() {
      return this.isBranch ? LStudyRecord : LDownList;
    }
  },
  data() {
    return {
      downList: [],
      loading: false
    };
  },
  methods: {
    loadData() {
      this.loading = true;
      let params = {
        MaxResultCount: 9,
        SkipCount: 0
      };
      let fn;
      if (this.isBranch) {
        fn = MyResourceStudyRecordPageList;
      } else {
        params.AuditStatus = 1;
        params.ResourceType = this.ResourceType;
        fn = GetChildOrganResourceList;
      }
      fn(params)
        .then(res => {
          this.downList = res.items;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
<style lang="less">
.sub-resource {
  .lr-video-h-l {
    width: 332px;
    font-size: 18px;
    color: #573e41;
    font-weight: bold;
    margin-bottom: 15px;
    position: relative;
    &::before {
      display: block;
      content: "";
      width: 4px;
      height: 24px;
      background: #eb3939;
      position: absolute;
      left: -16px;
      top: 0;
    }
  }
}
</style>

