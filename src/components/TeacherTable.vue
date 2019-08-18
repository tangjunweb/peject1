<template>
  <span @click="showModel" class="range-select">
    <slot>
      <Button size="large">选择师资</Button>
    </slot>
    <Modal
      v-model="show"
      :title="title"
      :loading="loading"
      transfer
      class-name="blue-modal"
      width="1250px"
      @on-visible-change="modelChange"
    >
      <div class="lhyj-party-member-select-modal">
        <Form inline>
            <FormItem label="师资姓名" :label-width="70">
                <Input size="large" v-model="searchParams.Name" type="text" placeholder="输入姓名"></Input>
            </FormItem>
            <FormItem label="师资级别" :label-width="70">
                <common-select v-model="searchParams.OperationType" keys="TeachersLevel"></common-select>
            </FormItem>
            <FormItem label="师资类别" :label-width="70">
                <common-select v-model="searchParams.TeacherCategory" keys="TeacherCategory"></common-select>
            </FormItem>
            <FormItem label="授课类别" :label-width="70">
                <common-select v-model="searchParams.LectureCategory" keys="LectureCategory"></common-select>
            </FormItem>
            <FormItem>
                <Button @click="loadData" type="primary" ghost>搜索</Button>
            </FormItem>
            <FormItem>
                <Button @click="reset" type="primary" ghost>重置</Button>
            </FormItem>
        </Form>
    <Card class="border" :dis-hover="true">
      <Table  :loading="tableLoading" stripe border :columns="columns" :data="data" @on-select-cancel="selectCancel" @on-select="selectChange" @on-select-all="selectAllChange" @on-select-all-cancel="selectAllCancel"></Table>
      <div style="padding:30px 0 0 0" class="text-right">
         <page-extend :current-page.sync="params.PageIndex" :total="total" :finishState="tableLoading" :resetTotal.sync="resetTotal" :page-size="params.MaxResultCount" class-name="lhyj-page" />
      </div>
    </Card>
      </div>
      <div slot="footer">
        <Button :disabled="!selectData.length" :loading="loading" @click="save" type="primary">确认选择</Button>
      </div>
    </Modal>
  </span>
</template>
<script>
import {
  Modal,
  Checkbox,
  Form,
  FormItem,
  Input,
  Table,
  Page,
} from "iview";
import { PageSelectListAsync } from "@/api/resource";
import PageExtend from '@/components/PageExtend/PageExtend';
import { SkipCountExtend, ClearParams } from "@/mixins";
import CommonSelect from "@/components/CommonSelect";
export default {
  mixins: [SkipCountExtend, ClearParams],
  components: {
    Modal,
    Checkbox,
    Form,
    FormItem,
    Input,
    Table,
    PageExtend,
    CommonSelect
  },
  props: {
    value: {
      type: [String, Number, Array]
    },
    showOrgan: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: "single"
    },
    title: {
      type: String,
      default: "选择师资"
    }
  },
  data() {
     let that = this;
    return {
      loading: false,
      tableLoading: false,
      show: false,
      data: [],
      total: 0,
      OrganId: "",
      searchParams: {
        TeacherCategory: "",
        CreateOrganPath: "",
        Name: "",
        OperationType: "",
        TeacherCategory: "",
        LectureCategory:""
      },
      params: {
        SkipCount: 0,
        MaxResultCount: 10
      },
      selectData: [],
      tabIndex: 0,
      columns: [
        {
          type: "selection",
          width: 60
        },
        {
          key: "realName",
          title: "师资姓名"
        },
        {
          key: "gender",
          title: "性别",
          width:60,
          render(h, { row }) {
            return h(
              "span",
              that.GetCodeTableValue(row.gender, "Sex")
            );
          }
        },
        {
          key: "birthday",
          title: "出生年月",
            render(h, {
                row
            }) {
                return h('span',that.FormatDate(row.birthday,'yyyy-MM-dd hh:mm'))
            }
        },
        {
          key: "presentDuty",
          title: "现任职务"
        },
        {
          key: "post",
          title: "师资类别",
           render(h, { row }) {
            return h(
              "span",
              that.GetCodeTableValue(row.teacherCategory, "TeacherCategory")
            );
          }
        },
        {
          key: "post",
          title: "授课类别",
           render(h, { row }) {
            return h(
              "span",
              that.GetCodeTableValue(row.lectureCategory, "LectureCategory")
            );
          }
        },
        {
          key: "organName",
          tooltip: true,
          title: "所属党组织"
        },
      ]
    };
  },
  watch: {
    show(f) {
      if (f) {
        this.loadData();
      }
    }
  },
  computed: {
    organName() {
      return this.$store.state.session.organName;
    },
    isIntranet() {
      return this.$store.state.session.isIntranet;
    }
  },
  methods: {
    showModel() {
      this.show = true;
      this.selectData = this.value;
    },

   selectChange(selection, row) {
     this.selectData = selection;
    },
    selectCancel(data, row) {
     this.selectData = data;
    },
    selectAllChange(selection, row) {
       this.selectData = selection;
    },
    selectAllCancel(selection, row) {
       this.selectData = selection;
    },
    loadData() {
      let params = JSON.parse(JSON.stringify(this.params));
      params.SkipCount = this.SkipCount(
        params.MaxResultCount,
        params.PageIndex
      );
      if (params.PageIndex == 1) {
        delete params.LastId;
      }
      Object.assign(params, this.searchParams);
        this.tableLoading = true;
        PageSelectListAsync(this.ClearParams(params))
          .then(res => {
            this.total = res.totalCount;
            let d = this.selectData.map(e => e.teacherId);
            res.items.forEach(e => {
              if (d.includes(e.id)) {
                e._checked = true;
              }
            });
            this.data = res.items;
            this.params.LastId = res.lastId;
          })
          .finally(() => {
            this.tableLoading = false;
          });
    },
    save() {
      if (this.type === 'single') {
        this.$emit('input', this.selectData[0] || '');
        this.$emit('change', this.selectData[0] || {});
      } else {
        this.$emit('input', this.selectData);
        this.$emit('change', this.selectData);
      }
      this.show = false;
    },
    search() {
      this.params.SkipCount = 0;
      this.resetTotal = true;
      this.loadData();
    },
    reset() {
      this.searchParams.LectureCategory = "";
      this.searchParams.Name = "";
      this.searchParams.OperationType = "";
      this.searchParams.TeacherCategory = "";
      this.params.SkipCount = 0;
      this.params.PageIndex = 1;
      this.total = 0;
      this.resetTotal = true;
      this.loadData();
    }
  }
};
</script>