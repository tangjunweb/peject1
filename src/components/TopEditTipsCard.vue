<template>
  <Card class="topCountTipsCard" :dis-hover="true">
    <div class="topCountTipsCard-wrap">
      <img src="../assets/images/bread.png" alt>
      <div class="topCountTipsCard-info">
        <p>当前编辑对象：{{$store.state.session.nickName}}</p>
        <div class="edit-time">
          <p style="margin-right:30px">首次入库时间：{{creatime}}</p>
          <p>最近一次维护时间：{{lastime}}</p>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import { Card } from "iview";
export default {
  name: "topCountTipsCard",
  props: {
    creatime: {
      type: String,
      default: "无"
    },
    lastime: {
      type: String,
      default: "无"
    }
  },
  components: {
    Card
  }
};
</script>

<style lang='less' scoped>
.topCountTipsCard {
  margin-bottom: 35px;
  border: 1px solid #e5dfdf;
  .topCountTipsCard-wrap {
    display: flex;
    flex-direction: row;
    img {
      width: 71px;
      height: 62px;
      margin-left: 37px;
      margin-right: 52px;
      display: block;
    }
    p {
      font-size: 14px;
      color: #856b6e;
      line-height: 30px;
    }
    .edit-time {
      display: flex;
      flex-direction: row;
    }
  }
}
</style>
