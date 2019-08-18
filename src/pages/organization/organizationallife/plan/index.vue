<!-- 支部组织生活列表 -->
<template>
  <div class="organization-life-plan">
    <Form inline>
      <Row :gutter="15" type="flex" justify="space-between">
        <Col>
        <!-- <FormItem label="计划时间范围：" :label-width="120">
            <common-select keys="EnumTeachingPlanTimeType" v-model="searchParams.PlanTimeRange"></common-select>
          </FormItem>-->
        <FormItem label="主题党日" :label-width="90">
          <Select v-model="searchParams.IsFixedDay">
            <Option value="true">是</Option>
            <Option value="false">否</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button @click="loadData" type="primary" ghost style="margin-right:15px;">搜索</Button>
        </FormItem>
        <FormItem>
          <Button @click="reset" type="primary" ghost>重置</Button>
        </FormItem>
        </Col>
        <Col>
        <FormItem>
          <Button v-if="auth('/organization/organizationallife/plan/create')" @click="$router.push('create')" type="primary" ghost>新建计划</Button>
        </FormItem>
        </Col>
      </Row>
    </Form>
    <Card class="border" :dis-hover="true">
      <div>
        <Table :loading="loading" stripe border :columns="columns" :data="data"></Table>
        <div style="padding:30px 0 0 0" class="text-right">
          <Page :current.sync="params.pageIndex" :total="total" :page-size="params.MaxResultCount" class-name="lhyj-page" />
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import { Form, FormItem, Page, Table, DatePicker, Input, Card, Select, Option } from 'iview';
import { SkipCount, ClearParams, Auth } from '@/mixins';
import { GetPartyMeetingPlanInfoList, DeletePartyMeetingPlanInfoById } from '@/api/partyOrganizationService';
import OrganizationCascader from '@/components/OrganizationCascader';
import CommonSelect from '@/components/CommonSelect';
import QRCode from 'qrcode';
export default {
  mixins: [SkipCount, ClearParams, Auth],
  components: {
    Card,
    Form,
    FormItem,
    Page,
    Table,
    OrganizationCascader,
    DatePicker,
    CommonSelect,
    Input,
    Select,
    Option
  },
  data() {
    let that = this;
    return {
      loading: false,
      organId: '',
      organName: '',
      month: '',
      columns: [
        {
          width: 450,
          title: '会议标题',
          tooltip: true,
          key: 'title'
        },
        // {
        //   title: "年度/季度/月度",
        //   width: 150,
        //   tooltip: true,
        //   render(h, { row }) {
        //     let text = "--";
        //     if (row.quarte) {
        //       text = "季度";
        //     } else if (row.month) {
        //       text = "月度";
        //     } else {
        //       text = "年度";
        //     }
        //     return h("span", text);
        //   }
        // },
        // {
        //   width: 80,
        //   title: "年",
        //   tooltip: true,
        //   key: "year"
        // },
        {
          title: '时间',
          width: 150,
          align: 'center',
          tooltip: true,
          render(h, { row }) {
            return h('span', `${row.year}年${row.month}月`);
          }
        },
        {
          title: '创建组织',
          tooltip: true,
          key: 'organName'
        },
        {
          title: '开展时间',
          width: '350px',
          tooltip: true,
          render(h, { row }) {
            return h('span', `${that.FormatDate(row.startTime, 'yyyy-MM-dd hh:mm:ss')}~${that.FormatDate(row.endTime, 'yyyy-MM-dd hh:mm:ss')}`);
          }
        },
        {
          title: '开展情况',
          width: '130px',
          tooltip: true,
          render(h, { row }) {
            return h(
              'span',
              row.meetingStatus == 0 ? '未开展' : '已开展'
              // that.GetCodeTableValue(row.meetingStatus, "MeetingStatus")
            );
          }
        },
        {
          title: '操作',
          tooltip: true,
          width: '250px',
          fixed: 'right',
          align: 'right',
          className: 'zdy-table-opration',
          render(h, { row }) {
            let arr = [];
            if (row.meetingStatus == 0) {
              if (that.auth('/organization/organizationallife/manager/create')) {
                arr.push(
                  h(
                    'a',
                    {
                      on: {
                        click() {
                          that.$router.push({
                            path: '../manager/create',
                            query: {
                              planId: row.id,
                              title: row.title
                            }
                          });
                        }
                      }
                    },
                    '开展组织生活'
                  )
                );
              }

              if (that.auth('/organization/organizationallife/plan/meetinginfo') && that.session.organId == row.createOrganId) {
                arr.push(
                  h(
                    'a',
                    {
                      on: {
                        click() {
                          that.$router.push({
                            path: 'meetinginfo',
                            query: {
                              id: row.id
                            }
                          });
                        }
                      }
                    },
                    '编辑'
                  )
                );
              }
              if (that.auth('/organization/organizationallife/plan/delete')) {
                arr.push(
                  h(
                    'a',
                    {
                      on: {
                        click() {
                          that.$Modal.confirm({
                            title: '系统提示',
                            content: `确认删除会议"${row.title}"？`,
                            onOk: () => {
                              DeletePartyMeetingPlanInfoById({
                                id: row.id
                              }).then(res => {
                                that.loadData();
                                that.$Message.success('删除成功');
                              });
                            }
                          });
                        }
                      }
                    },
                    '删除'
                  )
                );
              }
            }
            return h('span', arr);
          }
        }
      ],
      data: [],
      searchParams: {
        PlanTimeRange: '',
        IsFixedDay: ''
      },
      total: 0,
      params: {
        MaxResultCount: 9,
        SkipCount: 0,
        pageIndex: 1
      }
    };
  },
  methods: {
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
      params.SkipCount = this.SkipCount(params.MaxResultCount, params.pageIndex);
      Object.assign(params, this.searchParams);
      this.loading = true;
      GetPartyMeetingPlanInfoList(this.ClearParams(params))
        .then(res => {
          this.total = res.totalCount;
          this.data = res.items;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    reset() {
      this.searchParams.IsFixedDay = '';
      this.searchParams.PlanTimeRange = '';
      this.loadData();
    }
  },
  mounted() {
    this.searchParams.OrganPath = this.$route.query.organPath;
    let organName = this.$route.query.organName;
    this.organName = organName || this.$store.state.session.organName;
    this.loadData();
  }
};
</script>
<style lang="less">
</style>


