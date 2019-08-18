<!-- 支部组织生活列表 -->
<template>
  <div class="organization-life-list">
    <Form :label-width="100">
      <Row :gutter="15">
        <Col :span="16">
        <Row :gutter="15">
          <Col :span="6">
          <FormItem label="党组织">
            <OrganizationCascader :label="organName" v-model="organId" @change="organChange"></OrganizationCascader>
          </FormItem>
          </Col>

          <Col :span="6">
          <FormItem label="主题">
            <Input placeholder="请输入会议主题" v-model="searchParams.Title"></Input>
          </FormItem>
          </Col>

          <Col :span="6">
          <FormItem label="开始时间">
            <DatePicker style="width:100%" transfer format="yyyy-MM-dd HH:mm:ss" @on-change="searchParams.BeginTime = $event" v-model="searchParams.BeginTime" key="startTime" type="datetime"
              placeholder="请选择时间"></DatePicker>
          </FormItem>
          </Col>
          <Col :span="6">
          <FormItem label="结束时间">
            <DatePicker style="width:100%" transfer @on-change="searchParams.EndTime = $event" v-model="searchParams.EndTime" type="datetime" key="endTime" placeholder="请选择时间"></DatePicker>
          </FormItem>
          </Col>

        </Row>
        </Col>
        <Col :span="8">
        <Row>
          <Col :span="12" style="">
          <Button @click="loadData" type="primary" ghost style="margin-right:15px;">搜索</Button>
          <Button @click="reset" type="primary" ghost>重置</Button>
          </Col>
          <Col :span="12" class="text-right" style="">
          <Button v-if="auth('/organization/organizationallife/manager/create')" @click="$router.push('create')" type="primary" style="margin-right:15px;" ghost>开展组织生活</Button>
          </Col>
        </Row>
        </Col>
      </Row>
    </Form>
    <Card class="border" :dis-hover="true">
      <div>
        <Table :loading="loading" stripe border :columns="columns" :data="data">
          <template slot-scope="{ row }" slot="opration">
            <a v-if="auth('/organization/organizationallife/manager/meetinginfo')" @click="moreInfo(row)">查看</a>
            <a v-if="row.meetingStatus == 0&&auth('/organization/organizationallife/manager/update')" @click="edit(row)">编辑</a>
            <a v-if="row.meetingStatus == 0&&auth('/organization/organizationallife/manager/delete')" @click="del(row)">删除</a>
            <a v-if="row.meetingStatus != 0&&row.meetingStatus != 2 && row.meetingSignType == 1" @click="QRCode(row)">签到二维码</a>
            <!-- <a v-if="orgId == row.createOrganId" @click="offWork(row)">请假审批<span v-if="offworkCounts>0">({{3}})</span></a> -->
            <a v-if="orgId == row.createOrganId" @click="offWork(row)">请假审批</a>

       

          </template>

        </Table>
        <div style="padding:30px 0 0 0" class="text-right">
          <page-extend :current-page.sync="params.PageIndex" :total="total" :finishState="loading" :resetTotal.sync="resetTotal" :page-size="params.MaxResultCount" class-name="lhyj-page" />
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import { Form, FormItem, Table, DatePicker, Input, Card, Select, Option, Badge } from 'iview';
import { SkipCountExtend, ClearParams, Auth } from '@/mixins';
import { GetPagedPartyLifeMeetingList, GetPagedPartyLifeMeetingNewList } from '@/api/service';
import { DeleteParentMeetingInfoById, new_meeting_info } from '@/api/partyOrganizationService';

import PageExtend from '@/components/PageExtend/PageExtend';
import OrganizationCascader from '@/components/OrganizationCascader';
import CommonSelect from '@/components/CommonSelect';

import QRCode from 'qrcode';
export default {
  mixins: [SkipCountExtend, ClearParams, Auth],
  components: {
    Card,
    Form,
    FormItem,
    PageExtend,
    Table,
    OrganizationCascader,
    DatePicker,
    CommonSelect,
    Input,
    Select,
    Option,
    Badge
  },
  data() {
    let that = this;
    return {
      loading: false,
      organId: '',
      orgId: '',
      offworkCounts:5,
      organName: '',
      month: '',
      columns: [
        {
          title: '会议主题',
          tooltip: true,
          key: 'title'
        },
        {
          title: '开展组织',
          tooltip: true,
          key: 'organName'
        },
        {
          title: '开展时间',
          width: '350px',
          tooltip: true,
          render(h, { row }) {
            return h('span', `${that.FormatDate(row.beginTime, 'yyyy-MM-dd hh:mm:ss')}~${that.FormatDate(row.endTime, 'yyyy-MM-dd hh:mm:ss')}`);
          }
        },
        {
          title: '状态',
          tooltip: true,
          render(h, { row }) {
            return h('span', that.GetCodeTableValue(row.meetingStatus, 'MeetingStatus'));
          }
        },
        {
          title: '操作',
          tooltip: true,
          align: 'right',
          width: '250px',
          slot: 'opration',
          className: 'zdy-table-opration'
        }
      ],
      data: [],
      offworkLists: [],
      searchParams: {
        OrganPath: '',
        Title: '',
        MeetingType: '',
        BeginTime: '',
        EndTime: '',
        OffWorkStatus: '0'
      },
      total: 0
    };
  },
  methods: {
    moreInfo(row) {
      this.$router.push({
        path: 'meetinginfo',
        query: {
          id: row.id,
          meetingStatus: row.meetingStatus,
          organName: row.organName
        }
      });
    },
    edit(row) {
      this.$router.push({
        path: 'update',
        query: {
          id: row.id
        }
      });
    },
    del(row) {
      let that = this;
      that.$Modal.confirm({
        title: '系统提示',
        content: `确认删除会议"${row.title}"？`,
        onOk: () => {
          DeleteParentMeetingInfoById({
            id: row.id
          }).then(res => {
            that.loadData();
            that.$Message.success('删除成功');
          });
        }
      });
    },
    QRCode(row) {
      let that = this;
      QRCode.toDataURL(`${new_meeting_info}?id=${row.id}`, {
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      }).then(res => {
        that.$Modal.info({
          title: '扫描二维码签到',
          render(h) {
            return h('img', {
              attrs: {
                src: res
              },
              style: {
                width: '300px',
                display: 'block',
                margin: '0 auto'
              }
            });
          }
        });
      });
    },
    offWork(row) {
      this.$router.push({
        path: 'meetingOffWork',
        query: {
          id: row.id
        }
      });
    },
    organChange(organ) {
      this.searchParams.OrganPath = organ.path;
    },
    monthChange(a, b) {
      if (a) {
        let d = new Date(a);
        d.setDate(1);
        this.searchParams.BeginTime = d.Format('yyyy-MM-dd ') + '00:00:00';
        let m = d.getMonth();
        let nextMonth = ++m;
        let nextMonthFirstDay = new Date(d.getFullYear(), nextMonth, 1);
        let oneDay = 1000 * 60 * 60 * 24;
        this.searchParams.EndTime = new Date(nextMonthFirstDay - oneDay).Format('yyyy-MM-dd hh:mm:ss');
      } else {
        this.searchParams.BeginTime = '';
        this.searchParams.EndTime = '';
      }
    },
    loadData() {
      let params = JSON.parse(JSON.stringify(this.params));
      params.SkipCount = this.SkipCount(params.MaxResultCount, params.PageIndex);
      if (params.PageIndex == 1) {
        delete params.LastId;
      }

      Object.assign(params, this.searchParams);
      this.loading = true;

      GetPagedPartyLifeMeetingNewList(this.ClearParams(params))
        .then(res => {
          this.total = res.totalCount;
          this.data = res.items;
          this.params.LastId = res.lastId;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    reset() {
      this.searchParams.OrganPath = this.$route.query.organPath;
      this.organName = this.$route.query.organName || this.$store.state.session.organName;
      this.month = '';
      this.searchParams.MeetingType = '';
      this.searchParams.Title = '';
      this.searchParams.EndTime = '';
      this.searchParams.BeginTime = '';
      this.searchParams.OffWorkStatus = '0';

      this.organId = '';
      this.loadData();
    }
  },
  mounted() {
    this.searchParams.OrganPath = this.$route.query.organPath;
    this.orgId = this.$store.state.session.organId;
    let organName = this.$route.query.organName;
    this.organName = organName || this.$store.state.session.organName;
    this.loadData();
  }
};
</script>
<style lang="less">
.layout-lr.organization-life-list {
  padding: 30px 60px 30px 30px;
  .layout-lr-lc {
    padding-top: 80px;
    .layout-lr-lch {
      height: 80px;
      line-height: 80px;
    }
  }
  .layout-lr-lcb {
    padding: 30px;
    position: relative;
    box-sizing: border-box;
  }
}
</style>


