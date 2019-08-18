<template>
    <div class="pdf-view-wrap">
        <div class="pdf-view-wrap-toolbar text-right">
            <Input disabled v-model="currentPage" style="width:60px;"></Input>
            <Input disabled v-model="pageCount" style="width:60px;margin-left:15px"></Input>
            <InputNumber style="margin-left:15px" :min="1" :max="pageCount" v-model="currentPage" :editable="false"></InputNumber>
        </div>
        <div class="pdf-view-box scroll">
            <pdf :src="src" 
            @num-pages="pageCount = $event" 
            :page="currentPage"
            @progress="isFinish"
            @page-loaded="load"
            @error="loading = false"
            @loaded="isFinish"
            style="width:100%">
            </pdf>              
        </div> 
        <div class="pdf-view-wrap-foot text-center">
            <ButtonGroup>
                <Button type="primary" @click="currentPage--" :disabled="currentPage === 1">
                    <Icon type="ios-arrow-back" />
                    上一页
                </Button>
                <Button type="primary" @click="currentPage++" :disabled="currentPage === pageCount">
                    下一页
                    <Icon type="ios-arrow-forward" />
                </Button>
            </ButtonGroup>
        </div>         
        <Spin v-if="loading" fix>
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>              
    </div>
</template>
<script>
import pdf from 'vue-pdf'
import { InputNumber, Input, ButtonGroup } from 'iview'
export default {
    props: {
        page: {
            type: Number,
            default: 1
        },
        src: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            pageCount: 0,
            currentPage: this.page,
            loading: false
        }
    },
    methods: {
        load() {
            this.loading = false;
        },
        isFinish(n){
            this.loading = true
            if(n == 1){
                this.$emit('loaded', true)
            }
        }
    },
    components: {
        pdf,
        InputNumber,
        Input,
        ButtonGroup
    }    
}
</script>
<style lang="less">
    .pdf-view-wrap{
        width: 100%;
        padding: 50px 0;
        position: relative;
        border: 1px solid #ddd;
        height: 100%;
    }
    .pdf-view-wrap-toolbar{
        padding: 0px 15px;
        box-sizing: border-box;
        height: 50px;
        line-height: 50px;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        .ivu-input,.ivu-input-number-input{
            text-align: center;
        }
    }   
    .pdf-view-wrap-foot{
        padding: 0px 15px;
        box-sizing: border-box;
        height: 50px;
        line-height: 50px;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;        
    }
    .pdf-view-box{
        height: 100%;
        width: 100%;
        overflow-y: auto;
    }
</style>


