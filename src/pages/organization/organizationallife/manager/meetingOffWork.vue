<!-- 请假审批 -->
<template>
  <div class="leave-form-list">
    <Form :label-width="60">
      <Row :gutter="15">
        <Col :span="5">
        <FormItem label="姓名">
          <Input placeholder="请输入关键字" v-model="searchParams.UserName"></Input>
        </FormItem>
        </Col>
        <!-- <Col :span="5">
        <FormItem label="状态">
          <common-select size="default" keys="EnumOffWorkStatus" v-model="searchParams.OffWorkStatus"></common-select>
        </FormItem>
        </Col> -->
        <Col :span="6">
        <FormItem label="状态">
          <Select transfe :value="searchParams.OffWorkStatus" @on-change="OffWorkStatusChange">
            <Option v-for="item in offworkLists" :value="item.value" :key="item.value">{{ offWorkFormate(item.value)}}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col :span="12">
        <Button @click="loadData" type="primary" ghost style="margin-right:15px;">搜索</Button>
        <Button @click="reset" type="primary" ghost>重置</Button>
        </Col>
      </Row>
      </Col>
    </Form>
    <Card class="border" :dis-hover="true">
      <div>
        <Table :loading="loading" stripe border :columns="columns" :data="data"></Table>
        <div style="padding:30px 0 0 0" class="text-right">
          <page-extend :current-page.sync="params.PageIndex" :total="total" :finishState="loading" :page-size="params.MaxResultCount" class-name="lhyj-page" />
        </div>
      </div>
    </Card>

    <Modal v-model="showModal1" title="请假审批" :mask-closable="false" width="600px" class="modal-form" @on-visible-change="resetDialog">
      <Row>
        <Col :span="24">
        <div class="item-group">请假人: {{item.offWorkUserName}}</div>
        <div class="item-group">所属党组织: {{item.organName}}</div>
        <div class="item-group">申请时间: {{FormatDate(item.creationTime, 'yyyy-MM-dd hh:mm:ss')}}</div>
        <div class="item-group">请假理由： {{item.leaveContent}} </div>
        <div class="item-group">审批意见： <Input type="textarea" :row="5" v-model="opinions" placeholder="请输入审批意见"></Input> </div>
        </Col>
        <Col :span="24" style="margin-top:20px">

        </Col>
      </Row>
      <div slot="footer">
        <Button @click="pass" type="primary" style="margin-right:15px;" class="btn-red">通过请假</Button>
        <Button @click="refuse" type="primary">拒绝请假</Button>
      </div>
    </Modal>

    <Modal v-model="showModal2" title="查看详情" width="600px" class="modal-form" @on-visible-change="resetDialog">
      <Row>
        <Col :span="24">
        <div class="item-group">请假人：{{item.offWorkUserName}}</div>
        <div class="item-group">所属党组织：{{item.organName}}</div>
        <div class="item-group">申请时间：{{FormatDate(item.creationTime, 'yyyy-MM-dd hh:mm:ss')}}</div>
        <div class="item-group">请假理由： {{item.leaveContent}} </div>
        <div class="item-group" v-if="item.offWorkStatus!=0">审批时间：{{FormatDate(item.auditTime, 'yyyy-MM-dd hh:mm:ss')}}</div>
        <div class="item-group" v-if="item.offWorkStatus!=0">审批意见：{{item.opinions?item.opinions:'暂无'}} </div>
        </Col>
      </Row>
      <div slot="footer">
        <Button @click="showModal2=false;item={}" type="primary">确定</Button>
      </div>
    </Modal>

  </div>
</template>
<script>
import { Form, FormItem, Table, DatePicker, Input, Card, Modal, Select, Option } from 'iview';
import { SkipCountExtend, ClearParams, Auth } from '@/mixins';
import { GetPartyMeetingUsersOffWorkList, AuditUsersOffWork, DeletePartyMeetingUsersOffWork } from '@/api/partyOrganizationService';
import CommonSelect from '@/components/CommonSelect';
import PageExtend from '@/components/PageExtend/PageExtend';
import QRCode from 'qrcode';
export default {
  mixins: [SkipCountExtend, ClearParams, Auth],
  components: {
    Card,
    Form,
    FormItem,
    PageExtend,
    Table,
    Input,
    Modal,
    CommonSelect,
    Select,
    Option
  },
  data() {
    let that = this;
    return {
      loading: false,
      meetItem: {},
      item: {},
      opinions: '',

      columns: [
        {
          title: '姓名',
          tooltip: true,
          key: 'offWorkUserName'
        },
        {
          title: '会议主题',
          tooltip: true,
          key: 'title'
        },
        {
          title: '所属党组织',
          tooltip: true,
          key: 'organName'
        },
        {
          title: '请假理由',
          width: '350px',
          tooltip: true,
          key: 'leaveContent'
        },
        {
          title: '状态',
          tooltip: true,
          render(h, { row }) {
            return h('span', `${that.offWorkFormate(row.offWorkStatus)}`);
          }
        },
        {
          title: '申请时间',
          tooltip: true,
          render(h, { row }) {
            return h('span', `${that.FormatDate(row.creationTime, 'yyyy-MM-dd hh:mm:ss')}`);
          }
        },
        {
          title: '审批时间',
          tooltip: true,
          render(h, { row }) {
            return h('span', row.offWorkStatus != 0 ? `${that.FormatDate(row.auditTime, 'yyyy-MM-dd hh:mm:ss')}` : '');
          }
        },
        {
          title: '操作',
          tooltip: true,
          align: 'right',
          className: 'zdy-table-opration',
          render(h, { row }) {
            let arr = [];
            if (row.offWorkStatus != 1 && row.offWorkStatus != -1) {
              arr.push(
                h(
                  'a',
                  {
                    on: {
                      click() {
                        that.item = row;
                        that.showModal1 = true;
                      }
                    }
                  },
                  '请假审批'
                )
              );
            }
            arr.push(
              h(
                'a',
                {
                  on: {
                    click() {
                      that.item = row;
                      that.showModal2 = true;
                    }
                  }
                },
                '查看详情'
              )
            );
            return h('span', arr);
          }
        }
      ],
      data: [],
      showModal1: false,
      showModal2: false,
      searchParams: { OffWorkStatus: '0' },
      total: 0,
      offworkLists: []
    };
  },
  mounted() {
    let offworkLists = JSON.parse(JSON.stringify(this.$store.state.baseCode)).EnumOffWorkStatus;
    this.offworkLists = offworkLists.filter(item => item.value != -2);

    let organName = this.$route.query.organName;
    this.organName = organName || this.$store.state.session.organName;
    this.loadData();
  },
  methods: {
    OffWorkStatusChange(val) {
      this.searchParams.OffWorkStatus = val;
    },
    offWorkFormate(val) {
      if (val == 0) {
        return '待审核';
      }
      if (val == 1) {
        return '已通过';
      }
      if (val == -1) {
        return '已拒绝';
      }
    },
    resetDialog(val) {
      if (!val) {
        this.opinions = '';
      }
    },
    pass() {
      let params = {
        offWorkIds: [this.item.id],
        offWorkStatus: 1,
        opinions: this.opinions
      };
      this.loading = true;
      AuditUsersOffWork(params)
        .then(res => {
          this.$Message.success('审核通过');
          this.showModal1 = false;
          this.loadData();
          this.item = {};
        })
        .finally(() => {
          this.loading = false;
        });
    },
    refuse() {
      let params = {
        offWorkIds: [this.item.id],
        offWorkStatus: -1,
        opinions: this.opinions
      };
      this.loading = true;
      AuditUsersOffWork(params)
        .then(res => {
          this.$Message.success('审核拒绝');
          this.showModal1 = false;
          this.loadData();
          this.item = {};
        })
        .finally(() => {
          this.loading = false;
        });
    },

    loadData() {
      let params = JSON.parse(JSON.stringify(this.params));
      params.ParentInfoId = this.$route.query.id;
      params.SkipCount = this.SkipCount(params.MaxResultCount, params.PageIndex);
      if (params.PageIndex == 1) {
        delete params.LastId;
      }
      Object.assign(params, this.searchParams);
      this.loading = true;
      GetPartyMeetingUsersOffWorkList(this.ClearParams(params))
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
      this.searchParams = { OffWorkStatus: '0' };
      this.loadData();
    }
  }
};
</script>
<style lang="less" scoped>
.item-group {
  font-size: 14px;
  line-height: 28px;
}
</style>


