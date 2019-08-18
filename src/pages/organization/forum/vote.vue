<template>
  <div class="vote">
    <TopCountTipsCard title="投票管理" :count="total" subTitle="总投票" unit="个"></TopCountTipsCard>
    <Row>
      <Col :span="12">
        <Form ref="form" inline>
          <FormItem label="投票主题：" :label-width="100">
            <Input v-model="searchParams.Title" type="text" placeholder="输入投票主题搜索"></Input>
          </FormItem>
          <FormItem>
            <Button @click="loadData" type="primary">搜索</Button>
          </FormItem>
          <FormItem>
            <Button @click="reset" type="primary">重置</Button>
          </FormItem>
        </Form>
      </Col>
      <Col :span="12" class="text-right">
        <Button type="primary" @click="addVote()" ghost>发起投票</Button>
      </Col>
    </Row>
    <Card class="border" :dis-hover="true">
      <Table :loading="loading" stripe :columns="columns" :data="data"></Table>
    </Card>
    <div class="text-right" style="padding:30px 0 0 0">
      <Page
        :current.sync="params.pageIndex"
        :total="total"
        :page-size="params.MaxResultCount"
        class-name="lhyj-page"
      />
    </div>
    <Modal
      v-model="showModal"
      title="发起投票"
      :loading="modalLoading"
      transfer
      width="800px"
      class-name="blue-modal"
    >
      <Form class="notice-info" ref="form" :model="model" :rules="rules" label-position="top">
        <FormItem label="投票主题" prop="title">
          <Input type="text" v-model="model.title"></Input>
        </FormItem>
        <FormItem label="投票选项" prop="optionList">
          <div class="vote-option-item" v-for="(el,i) in model.optionList" :key="i">
            <span class="vote-option-index">{{el.optionIndex}}.</span>
            <Input v-model="el.option" style="width:400px;margin-right:15px" placeholder="请填写"></Input>
            <Icon
              @click="delOption(i)"
              style="cursor:pointer;margin-right:15px"
              size="18"
              type="ios-trash-outline"
            />
          </div>
          <Button type="primary" icon="ios-add" @click="addOption" ghost>添加选项</Button>
        </FormItem>
        <FormItem label="选择模式">
          <RadioGroup v-model="model.voteType">
            <Radio :label="1">
              <span>单选</span>
            </Radio>
            <Radio :label="2">
              <span>多选</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="投票结束时间" prop="endTime">
          <DatePicker
            transfer
            @on-change="model.endTime = $event"
            key="endTime"
            type="datetime"
            :options="dateOption"
            placeholder="选择投票结束时间"
            style="width: 200px"
          ></DatePicker>
        </FormItem>
      </Form>
      <Spin fix v-if="modalLoading"></Spin>
      <div slot="footer">
        <Button :loading="modalLoading" @click="submitVote" type="primary">确定</Button>
        <Button @click="showModal = false" type="primary">取消</Button>
      </div>
    </Modal>
    <Modal
      v-model="showResultModal"
      title="查看投票结果"
      :loading="modalResultLoading"
      transfer
      width="800px"
      class-name="blue-modal"
    >
      <Form>
        <h2 style="margin-bottom: 10px;">{{result.title}}</h2>
        <FormItem label="投票人数" style="margin-bottom: 0;">
          <span>{{result.personCount}}人</span>
        </FormItem>
        <FormItem label="投票结果" style="margin-bottom: 0;">
          <div id="vote-chart" style="width:100%;height:300px"></div>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="showResultModal = false" type="primary">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import TopCountTipsCard from "@/components/TopCountTipsCard";
import { isEmptyObject } from "@/utils/util";
import {
  Form,
  FormItem,
  Input,
  Page,
  Table,
  Modal,
  Select,
  Option,
  Card,
  RadioGroup,
  Radio,
  Icon,
  DatePicker
} from "iview";

import { PartyMemberServiceGet } from "@/api/partyMember";
import Vote from "@/pages/model/Vote";
import echarts from "echarts";
import { SkipCount, ClearParams, Auth } from "@/mixins";
import { mapState } from "vuex";
export default {
  mixins: [SkipCount, ClearParams, Auth],
  components: {
    TopCountTipsCard,
    Form,
    FormItem,
    Input,
    Page,
    Table,
    Modal,
    Select,
    Option,
    Card,
    RadioGroup,
    Radio,
    Icon,
    DatePicker
  },
  computed: {
    ...mapState({
      allroles: state => state.allroles,
      EnumAnnouncementSendType: state => state.baseCode.EnumAnnouncementSendType
    })
  },
  data() {
    let that = this;
    return {
      loading: false,
      showModal: false,
      showResultModal: false,
      modalLoading: false,
      modalResultLoading: false,
      dateOption: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      rules: Vote.getRules(),
      searchParams: {
        Title: ""
      },
      model: new Vote(),
      params: {
        MaxResultCount: 9,
        SkipCount: 0,
        pageIndex: 1
      },
      total: 0,
      result: {},
      columns: [
        {
          title: "投票主题",
          key: "title",
          minWidth: 300
        },
        {
          title: "投票截止日期",
          width: 250,
          render(h, { row }) {
            return h(
              "span",
              new Date(row.endTime).Format("yyyy-MM-dd hh:mm:ss")
            );
          }
        },
        {
          title: "创建时间",
          width: 250,
          render(h, { row }) {
            return h(
              "span",
              new Date(row.creationTime).Format("yyyy-MM-dd hh:mm:ss")
            );
          }
        },
        {
          title: "操作",
          align: "right",
          width: 200,
          className: "zdy-table-opration",
          render(h, { row }) {
            let arr = [];
            arr.push(
              h(
                "a",
                {
                  on: {
                    click() {
                      that.showResultModal = true;
                      that.modalResultLoading = true;
                      GetVoteResultById({ id: row.id })
                        .then(res => {
                          that.result = res;
                          that.initChart(res.items);
                        })
                        .finally(() => {
                          that.modalResultLoading = false;
                        });
                    }
                  }
                },
                "查看投票结果"
              )
            );
            arr.push(
              h(
                "a",
                {
                  on: {
                    click() {
                      that.$Modal.confirm({
                        title: "系统提示",
                        content: `确认删除投票'${row.title}'?`,
                        onOk() {
                          DeleteVote({
                            id: row.id
                          }).then(res => {
                            that.$Message.success("删除成功！");
                            that.loadData();
                          });
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            );
            return h(
              "span",
              {
                class: "table-btn-group"
              },
              [...arr]
            );
          }
        }
      ],
      data: []
    };
  },
  methods: {
    addVote(el) {
      this.$refs["form"].resetFields();
      this.showModal = true;
      if (!el) {
        this.model = new Vote();
        this.addOption();
        this.addOption();
        this.addOption();
      }
    },
    submitVote() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.modalLoading = true;
          this.model.forumPostsId = this.$route.query.id;
          let params = JSON.parse(JSON.stringify(this.model));
          params.forumPostsId = this.$route.query.id;
          params.optionList = params.optionList.map(e => e.option);
          CreateVote(params)
            .then(res => {
              this.$Message.success("发起投票成功");
              this.loadData();
              this.showModal = false;
            })
            .finally(() => {
              this.modalLoading = false;
            });
        }
      });
    },
    initChart(data) {
      let e1 = echarts.init(document.getElementById("vote-chart"));
      let category = data.map(e => e.optionText);
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: {
          type: "value",
          show: false
        },
        grid: {
          left: 0,
          bottom: 0,
          right: 0,
          top: 10,
          containLabel: true
        },
        yAxis: {
          type: "category",
          data: category,
          splitLine: { show: false },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#573E41",
              fontSize: 14
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            type: "bar",
            barWidth: 12,
            itemStyle: {
              normal: {
                barBorderRadius: 6,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: "#FFC028" },
                  { offset: 1, color: "#D50000" }
                ]),
                label: {
                  show: true, //开启显示
                  position: "right",
                  textStyle: {
                    color: "#573E41",
                    fontSize: 12,
                    offset: [5, -2]
                  }
                }
              },
              emphasis: {
                show: true,
                barBorderRadius: 6,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: "#FFC028" },
                  { offset: 1, color: "#D50000" }
                ]),
                label: {
                  show: true, //开启显示
                  position: "right",
                  textStyle: {
                    color: "#573E41",
                    fontSize: 12,
                    offset: [5, -2]
                  }
                }
              }
            },
            data: data.map(e => e.count)
          }
        ]
      };
      e1.setOption(option);
    },
    addOption() {
      this.model.addOption();
    },
    delOption(i) {
      this.model.delOption(i);
    },
    reset() {
      this.searchParams.Title = "";
      this.loadData();
    },
    loadData() {
      let params = JSON.parse(JSON.stringify(this.params));
      params.SkipCount = this.SkipCount(
        params.MaxResultCount,
        params.pageIndex
      );
      Object.assign(params, this.searchParams);
      this.loading = true;
      params.ForumPostsId = this.$route.query.id;
      GetVotePagedList(this.ClearParams(params))
        .then(res => {
          this.data = res.items;
          if (isEmptyObject(this.ClearParams(this.searchParams)))
            this.total = res.totalCount;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.loadData();
    } else {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
.vote-option-item {
  margin-bottom: 15px;
}
.vote-option-index {
  margin-right: 10px;
}
</style>
