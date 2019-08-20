<template>
  <div class="orginalupload">
    <Row :gutter="15" style="margin-bottom:20px;" type="flex">
      <Col style="width:100%">
      <top-card class="orginalupload-topcard">
        <Row>
          <Col span="6" v-for="(item, index) in nav" :key="index">
          <div>
            <span class="ivu-tag-dot-inner" :style="{background: item.color}"></span>
            <span class="ivu-tag-text">
              {{item.name}}
              <strong>{{item.count}}</strong>次
            </span>
          </div>
          </Col>
        </Row>
      </top-card>
      </Col>
    </Row>
    <Row :gutter="15" type="flex">
      <Col span="24" style="height:622px">
      <Card class="border" :bordered="false" style="height:100%">
        <Form :model="searchParams" inline>
          <FormItem label="开展月份" :label-width="100">
            <DatePicker format="MM" v-model="searchParams.month" placeholder="选择月份" type="month"></DatePicker>
          </FormItem>
          <FormItem label="会议类型" :label-width="100">
            <Input style="width:180px" v-model="searchParams.type" ghost placeholder="请选择"></Input>
          </FormItem>
          <FormItem label="主题" :label-width="70">
            <Input style="width:180px" v-model="searchParams.tilte" ghost placeholder="请输入关键词"></Input>
          </FormItem>
          <Button style="margin-left:18px" class="searchbtn" type="primary">查询</Button>
          <Button style="margin-left:18px" class="resetbtn" ghost type="primary">重置</Button>
          <Button @click="gotoUpload" class="add" type="primary">
            <span>上传组织生活</span>
          </Button>
        </Form>
        <Table class="oprationtable-btn" :loading="loading" stripe :columns="columns" :data="data">
          <template slot-scope="{ row, index }" slot="opration">
            <a @click="detail(row)">查看</a>
            <a @click="edit(row)">编辑</a>
            <a @click="signup(row)">报名</a>
            <a @click="start(row)">开始</a>
            <a class="large-btn" @click="upload(row)">上传活动纪实</a>
            <span class="del-btn" @click="del(row,index)">删除</span>
          </template>
        </Table>
      </Card>
      </Col>
    </Row>
    <div style="padding:30px 0 0 0" class="text-right">
      <Page :current.sync="params.pageIndex" :total="total" :page-size="params.MaxResultCount" class-name="lhyj-page" ghost show-elevator/>
    </div>
  </div>
</template>
<script>
import { Tree, Table, Card, Page, DatePicker } from "iview";
export default {
  components: {
    Tree,
    Table,
    Card,
    Page, DatePicker
  },
  data() {
    return {
      searchParams: {
        month: "",
        type: "hha",
        tilte: 'hshhs'
      },
      total: 1,
      params: {
        MaxResultCount: 9,
        SkipCount: 0,
        pageIndex: 1
      },
      columns: [
        {
          title: "主题",
          key: "title"
        },
        {
          title: "会议类型",
          key: "type"
        },
        {
          title: "开展组织",
          key: "zuzhi"
        },
        {
          title: "开展时间",
          key: "time"
        },
        {
          title: "状态",
          key: "zuangtai"
        },
        {
          title: '操作',
          tooltip: true,
          align: 'center',
          width: '500px',
          slot: 'opration',
        }
      ],
      nav: [
        {
          color: "#43B9EA",
          name: "已报名",
          count: 15
        },
        {
          color: "#47B87A",
          name: "审核未通过 ",
          count: 15
        },
        {
          color: "#C82721",
          name: "审核通过未开始",
          count: 15
        },
        {
          color: "#A7ADAF",
          name: "结束待审核",
          count: 15
        }
      ],
      data: [
        {
          title: 'John Brown',
          type: '18',
          zuzhi: 'zuhu',
          time: 2018 - 3 - 3,
          zuangtai: '待审核'
        },
        {
          title: 'John Brown',
          type: '18',
          zuzhi: 'zuhu',
          time: 2018 - 3 - 3,
          zuangtai: '待审核'
        },
        {
          title: 'John Brown',
          type: '18',
          zuzhi: 'zuhu',
          time: 2018 - 3 - 3,
          zuangtai: '待审核'
        },
        {
          title: 'John Brown',
          type: '18',
          zuzhi: 'zuhu',
          time: 2018 - 3 - 3,
          zuangtai: '待审核'
        }
      ]
    };
  },
  mounted() {

  },
  methods: {
    detail(row) {
      console.log(row)
      this.$router.push({
        name: "组织生活详情",
        query: { obj: row.id, flag: 1 }
      });
    },
    //新增--1   编辑--2
    gotoUpload() {
      this.$router.push({
        name: "上传组织生活计划",
        query: {flag: 1 }
      });
    },
    edit(row) {
      this.$router.push({
        name: "上传组织生活计划",
        query: { obj: row.id, flag: 2 }
      });
    },
    upload(row) {
       this.$router.push({
        name: "上传活动纪实",
        query: { obj: row.id}
      });
    },
    signup(row) {
      this.$router.push({
        name: "填写报名",
        query: { obj: row.id }
      });
      // this.$router.push({
      //   name: "选择报名",
      //   query: { obj: row.id }
      // });
    },
    del(row) {
      this.$Modal.confirm({
        title: '系统提示',
        content: `确认删除会议"${row.title}"？`,
        onOk: () => {
          DeleteParentMeetingInfoById({
            id: row.id
          }).then(res => {
            this.loadData();
            this.$Message.success('删除成功');
          }).catch(err => {
            this.$Message.error(err);
          });;
        }
      });
    },
    start(row) {
      editList({ ID: row.ID})
        .then(res => {
          if (res.data.Success) {
            this.$Message.success("发布成功！");
            this.loadData();
          } else {
            this.$Message.error(res.data.Error);
          }
        })
        .catch(err => {
          this.$Message.error(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
@root: orginalupload;
.@{root} {
  &-topcard {
    strong {
      font-size: 20px;
      font-weight: 500;
      color: rgba(184, 35, 43, 1);
      margin-left: 15px;
    }
  }
}

.add {
  width: 139px;
  background: rgba(200, 39, 33, 1);
  border-radius: 3px;
  position: absolute;
  right: 16px;
  span {
    position: relative;
    padding-left: 20px;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 4px;
      width: 15px;
      height: 16px;
      background: url("~@/assets/images/upload-dang.png") left top no-repeat;
      background-size: 15px 16px;
    }
  }
}

.searchbtn {
  width: 80px;
  background: rgba(200, 39, 33, 1);
  border-radius: 3px;
}

.resetbtn {
  width: 80px;
  border: 1px solid rgba(200, 39, 33, 1);
  border-radius: 3px;
}
</style>