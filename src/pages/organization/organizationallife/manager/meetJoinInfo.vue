<template>
  <div>
    <Row :gutter="15" style="position:relative">
      <!-- <Spin fix v-if="loading"></Spin> -->
      <div :span="8" style="position:absolute;right:0;top:-5px;display:flex;align-items:flex-end;z-index:1000">
        <Button class="btn-red" type="primary" style="margin-right:15px;" @click="allSigin">批量补签</Button>
        <Button class="btn-red" @click="loadOut" type="primary" v-if="false">导出</Button>

      </div>

    </Row>

    <Row :gutter="15">
      <Form :label-width="80" label-position="left" :model="model">
        <!-- <Col :span="5">
        <FormItem label="会议类型" prop="meetingType">
          <common-select keys="MeetingType" v-model="model.meetingType"></common-select>
        </FormItem>
        </Col> -->
        <Col :span="5">
        <FormItem label="姓名" prop="Name">
          <Input v-model="params.Name" placeholder="请输入关键字"></Input>
        </FormItem>
        </Col>
        <Col :span="5">
        <FormItem label="签到情况" prop="SignStatus">
          <Select placeholder="请选择签到情况" v-model="params.SignStatus">
            <Option label="未签到" :value="0"></Option>
            <Option label="已签到" :value="1"></Option>
            <Option label="已补签" :value="2"></Option>
            <Option label="已请假" :value="3"></Option>
          </Select>
        </FormItem>

        </Col>
        <Col :span="4">
        <Button @click="search" type="primary" ghost style="margin-right:15px;">搜索</Button>
        <Button @click="reset" type="primary" ghost>重置</Button>
        </Col>
      </Form>
      <span class="remark">60岁以上党员才能补签</span>
    </Row>
    <Row>
      <Table ref="userList" height="300" :columns="columns" :data="userList" :loading="loading">
        <template slot-scope="{ row, index }" slot="action">
          <a @click="siginIn(row)" >{{(row.signStatus==0&&!row._disabled)?'补签':''}}</a>
        </template>
      </Table>
      <div style="padding:30px 0 0 0" class="text-right">
        <Page :current.sync="pageIndex" :total="totalCount" :page-size="params.MaxResultCount" class-name="lhyj-page" ghost @on-change="pageChange" />
        <!-- <page-extend :current-page.sync="params.PageIndex" :total="total" :finishState="loading" :page-size="params.MaxResultCount" class-name="lhyj-page" /> -->
      </div>
    </Row>

  </div>
</template>
<script>
import { Select, Option, Form, FormItem, Input, Table, Tabs, TabPane, Page } from 'iview';
import CommonSelect from '@/components/CommonSelect';
// import PageExtend from "@/components/PageExtend/PageExtend";
import { GetPagedMeetingUsers, PartyMeetingSupplementSign } from '@/api/partyOrganizationService';

export default {
  components: {
    Select,
    Option,
    Form,
    FormItem,
    Input,
    Table,
    CommonSelect,
    Tabs,
    TabPane,

    // PageExtend,
    Page
  },
  data() {
    let that = this;
    return {
      model: {},
      userList: [],
      totalCount: 0,
      loading: false,
      params: {
        SkipCount:0,
        MaxResultCount: 10,
        Name: '',
        SignStatus: ''
      },
      pageIndex:1,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '姓名',
          render(h, { row }) {
            return h('span', row.name);
          }
        },
        {
          title: '所属组织',
          tooltip: 'true',
          render(h, { row }) {
            return h('span', row.organName);
          }
        },
        {
          title: '签到情况',
          tooltip: true,
          render(h, { row }) {
            return h('span', that.GetCodeTableValue(row.signStatus, 'SignStatus'));
          }
        },
        {
          title: '操作',
          tooltip: false,
          align: 'right',
          width: 100,
          slot: 'action',
          className: 'zdy-table-opration'
        }
      ]
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      let that = this;
      this.loading = true;
      let ParentInfoId = this.$route.query.id;
      let Obj = JSON.parse(JSON.stringify(Object.assign(this.params, { ParentInfoId })));
      Obj.SkipCount= (this.pageIndex-1)*Obj.MaxResultCount;


      let year = new Date().getFullYear();
      GetPagedMeetingUsers(Obj)
        .then(res => {
          let list = res.items.map(item => {
            if (item.signStatus !== 0) {
              item._disabled = true;
            }
            let birthyear = new Date(item.birthday).getFullYear();
            if (year - birthyear < 60) {
              item._disabled = true;
            }
          });
          this.userList = res.items;

          this.totalCount = res.totalCount;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    siginIn(row) {
      let that = this;
      let birthyear = new Date(row.birthday).getFullYear();
      let year = new Date().getFullYear();
      if (year - birthyear < 60) {
        that.$Message.warning('60岁以上党员才能补签');
        return;
      }
      that.$Modal.confirm({
        title: '系统提示',
        content: `是否对人员'${row.name}进行补签'？`,
        onOk: () => {
          that.loading = true;
          let paramas = {
            meetingId: row.meetingId,
            userIdList: [row.userId],
            parentInfoId: that.$route.query.id
          };
          PartyMeetingSupplementSign(paramas)
            .then(res => {
              that.$Message.success('补签成功');
              that.loadData();
            })
            .finally(() => {
              that.loading = false;
            });
        }
      });
    },
    allSigin() {
      let that = this;
      let list = this.$refs.userList.getSelection();
      if (list.length == 0) {
        that.$Message.error('请选择补签人员');
        return;
      }

      that.loading = true;
      let paramas = {
        meetingId: list[0].meetingId,
        userIdList: list.map(item => item.userId),
        parentInfoId: that.$route.query.id
      };
      PartyMeetingSupplementSign(paramas)
        .then(res => {
          that.$Message.success('补签成功');
          that.loadData();
        })
        .finally(() => {
          that.loading = false;
        });
    },
    search() {
      this.params.SkipCount = 1;
      this.loadData();
    },
    reset() {
      this.params = {
        SkipCount: 0,
        MaxResultCount: 10,
        Name: '',
        SignStatus: ''
      };
      this.pageIndex=1;
      this.loadData();
    },
    pageChange(val) {
      this.pageIndex = val;
      this.loadData();
    }
  }
};
</script>
<style lang="less" scoped>
.remark {
  font-size: 12px;
  float: right;
  margin-top: 35px;
  margin-right: 10px;
}
</style>
