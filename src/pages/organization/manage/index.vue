<template>
<div class='orginalmanage'>
    <Row :gutter="15" style="margin-bottom:20px;" type="flex">
      <Col style="width:100%">
            <top-card class='orginalmanage-topcard'>
                 <ul class='formLine' style="padding:0 60px">
                    <li>
                        <div class='orginalmanage-title'>名称：</div>
                        <div class='orginalmanage-body'><span class='tag'>未开始</span> 学习党的十九大精神</div>
                    </li>
                     <li >
                        <div class='orginalmanage-title'>所属党组织：</div>
                        <div class='orginalmanage-body'>中共青海省西宁市城北区委  </div>
                    </li>
                     <li >
                        <div class='orginalmanage-title'>是否固定党日：</div>
                        <div class='orginalmanage-body'>是</div>
                    </li>
                     <li >
                        <div class='orginalmanage-title'>会议类型：</div>
                        <div class='orginalmanage-body'>党员大会</div>
                    </li>
                </ul>
            </top-card>
      </Col>
    </Row>
      <Card class="border" :dis-hover="true" style="height:100%">
           <Tabs value="name1" style="padding:0 100px">
                <TabPane label="会议详情" name="name1">
                    <ul class='formLine' style="margin-left:-40px">
                        <li>
                            <div class='orginalmanage-title'>时间：</div>
                            <div class='orginalmanage-body'><span class='tag'>未开始</span> 学习党的十九大精神</div>
                        </li>
                        <li>
                            <div class='orginalmanage-title'>地点：</div>
                            <div class='orginalmanage-body'><span class='tag'>未开始</span> 学习党的十九大精神</div>
                        </li>
                        
                        <li >
                            <div class='orginalmanage-title'>会议主题：</div>
                            <div class='orginalmanage-body'>中共青海省西宁市城北区委  </div>
                        </li>
                        <li>
                            <div class='orginalmanage-title'>主持人：</div>
                            <div class='orginalmanage-body'><span class='tag'>未开始</span> 学习党的十九大精神</div>
                        </li>
                        <li class='block'>
                            <div class='orginalmanage-title'>主要内容：</div>
                            <div class='orginalmanage-body'>是</div>
                        </li>
                        <li class='block'>
                            <div class='orginalmanage-title'>议程：</div>
                            <div class='orginalmanage-body'>党员大会</div>
                        </li>
                        <li class='block'>
                            <div class='orginalmanage-title'>文件：</div>
                            <div class='orginalmanage-body'>
                                <span class='file'>已上传文档名称.png</span>
                            </div>
                        </li>
                    </ul>
                </TabPane>
                <TabPane label="报名情况" name="name2">
                    <Form inline>
                        <FormItem style="width:25%;margin-right:0" label="发起党组织：" :label-width="100">
                           西宁市城北区xxx街道
                        </FormItem>
                        <FormItem style="width:25%;margin-right:0" label="联系人：" :label-width="100">
                            李四
                        </FormItem>
                        <FormItem style="width:25%;margin-right:0" label="联系电话：" :label-width="100">
                            13655555555
                        </FormItem>
                        <FormItem style="width:25%;margin-right:0" label="报名人数：" :label-width="100">
                            50人
                        </FormItem>
                    </Form>
                    <Table :loading="loading" stripe :columns="columns" :data="data"></Table>
                </TabPane>
            </Tabs>
      </Card>
  </div>
</template>
<script>
import {Tabs, TabPane, Card, Table} from 'iview'
export default {
    components: {
        Tabs,
        TabPane,
        Card,
        Table
    },
    data () {
       return {
          loading: flase,
          data: [],
          columnsL: [
              {
                        title: '党组织',
                        key: 'name'
                    },
                    {
                        title: '姓名',
                        key: 'age'
                    },
                    {
                        title: '年龄',
                        key: 'address'
                    },
                    {
                        title: '性别',
                        key: 'address'
                    },
                    {
                        title: '身份证号',
                        key: 'address'
                    }
          ]
       }
    }
}
</script>
<style lang="less" scoped>
    @root: .orginalmanage;
    @{root} {
        &-topcard{ 
            
        }
    }
   
            
</style>