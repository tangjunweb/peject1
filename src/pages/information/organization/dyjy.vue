<template>
    <div class="zzsh-wrap">
        <div class="zzsh-head">
            <Row :gutter="15">
                <Col :span="12">
                    <DatePicker format="yyyy年MM月" v-model="month" type="month"></DatePicker>
                </Col>
                <Col :span="12">
                     考核学员数<span class="num">1445</span>个
                </Col>
            </Row>
        </div>
        <Row class="zzsh-body" :gutter="15">
            <Col :span="42" class="zzsh-body-chart">
                <LCard>
                    <div class="zchart" ref="chart"></div>
                </LCard>
            </Col>
        </Row>
    </div>
</template>
<script>
import LCard from '@/components/ui/LCard'
import echarts from 'echarts'
import { DatePicker, Select, Option } from 'iview'
export default {
    components: {
        LCard,
        DatePicker,
        Select,
        Option
    },
    data() {
        return {
            month: new Date(),
            jd: 3
        }
    },
    methods: {
        initChart () {
            let getOption = (dataAxis,legend) => {
                return {
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {
                            type : 'shadow'
                        },
                        confine: true
                    },    
                    legend: {
                        show: true,
                        data: legend,
                        bottom: 20,
                    },            
                    xAxis: {
                        data: dataAxis,
                        axisLabel: {
                            fontSize: 12,
                        },
                        axisTick: {
                            show: true
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#4d639d'
                            }
                        },
                        z: 10
                    },
                    grid: {
                        left: 60,
                        bottom: 100,
                        right: 60,
                        top: 40
                    },
                    yAxis: [{
                        type: 'value',
                        position: 'left',
                        name: legend[0],
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#4d639d'
                            }                            
                        },
                        axisTick: {
                            show: true
                        },
                        axisLabel: {
                            show: true,
                        },
                        splitLine: {
                            show: false
                        }
                    },{
                        type: 'value',
                        position: 'right',
                        name: legend[1],
                        nameTextStyle: {
                            padding: [0,120,0,0]
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#4d639d'
                            }                            
                        },
                        axisTick: {
                            show: true
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#3e67d8'
                            }
                        },
                        splitLine: {
                            show: false
                        }
                    }],
                    series: [
                        {
                            type: 'bar',
                            barWidth: 20,
                            name: legend[0],
                            itemStyle: {
                            },
                            data: [20,25,120,103]
                        },
                        {
                            type: 'bar',
                            name: legend[1],
                            barWidth: 20,
                            itemStyle: {
                                normal: {
                                    color: '#4c79f9'
                                }
                            },
                            yAxisIndex: 1,
                            data: [10,25,100,113]
                        }                                      
                    ]                
                }                
            }
            let chart = echarts.init(this.$refs['chart']);
            chart.setOption(getOption(['党员大会','支部委员会','党小组会','党课'],[`${this.month.getMonth()+1}月开展次数`,`${this.month.getMonth()+1}月基准偏离率高于50%的组织个数`]));       
            window.onresize = ()=>{
                chart.resize();
            }
        }
    },
    mounted () {
        this.$nextTick(()=>{
            this.initChart();
        })
    }
}
</script>
<style lang="less">
.zzsh-wrap{
    width: 100%;
    height: 100%;
    position: relative;
    padding-top: 40px;
    box-sizing: border-box;
}
.zzsh-head{
    height: 40px;
    line-height: 40px;
    .num{
        font-size: 18px;
        margin:  0 10px;
    }
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
}
.zzsh-body{
    height: 100%;
}
.zzsh-body-chart{
    height: 100%;
}
.zchart{
    width: 100%;
    height: 400px;
}
</style>

