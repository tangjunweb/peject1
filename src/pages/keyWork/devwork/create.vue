<template>
  <div class="dev-work">


   
  
  </div>
</template>
<script>
import { Form, FormItem, Card, Select, Option, Spin, Table, Page } from "iview";

export default {
  components: {
    Form,
    FormItem,
    Card,
    Select,
    Option,
    Spin,
    Table,
    Page
  },
  data() {
    return {
      organId: this.$store.state.session.organId,
      loading: false,
      params: {
        organId: this.$store.state.session.organId,
        pageIndex: 1,
        pageSize: 10
      },
      total: 0
    };
  },
  watch: {},
  mounted() {
    this.loadData();
  },
  computed: {},
  methods: {
    loadData() {},
  
  }
};
</script>
<style lang="less" scoped>
.dev-work {
}

</style>


