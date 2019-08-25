<template>
    <div class="dysjfx-wrap">
        <div class="dysjfx-wrap-left">
            <div class="dysjfx-wrap-left-inner">
                <dl>
                    <dt>{{info.joinClassCount||0}}</dt>
                    <dd>参与班级</dd>
                </dl>
                <dl>
                    <dt>{{info.joinExamCount||0}}</dt>
                    <dd>参与考试</dd>
                </dl>
                <dl>
                    <dt>{{info.joinMeetingCount||0}}</dt>
                    <dd>参与会议</dd>
                </dl>
                <dl>
                    <dt>{{info.postingCount||0}}</dt>
                    <dd>论坛发帖</dd>
                </dl>
                <dl>
                    <dt>{{info.learnResourceCount||0}}</dt>
                    <dd>资源学习</dd>
                </dl>
                <dl>
                    <dt>{{info.volunteerCount||0}}</dt>
                    <dd>志愿活动</dd>
                </dl>     
            </div>                                                        
        </div>
        <div class="dysjfx-wrap-right" ref="chart">

        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
import { GetUserStatitics } from '@/api/statistics'
export default {
    props: {
        partyMember: Object
    },
    data() {
        return {
            info: {}
        }
    },
    mounted () {
        GetUserStatitics({
            id: this.$route.query.id
        }).then(res=>{
            this.info = res;
        })        
        this.$nextTick(()=>{
            let chart = echarts.init(this.$refs['chart']);
            let option = {
                backgroundColor: 'transparent',
                color: ['#00c2ff', '#f9cf67', '#e92b77'],
                legend: {
                    show: false,
                    // icon: 'circle',//图例形状
                    bottom: 45,
                    center: 0,
                    itemWidth: 14, // 图例标记的图形宽度。[ default: 25 ]
                    itemHeight: 14, // 图例标记的图形高度。[ default: 14 ]
                    itemGap: 21, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
                    textStyle: {
                        fontSize: 14,
                        color: '#ade3ff'
                    },
                    data: ['2016', '2017', '2018'],
                },
                radar: [{
                    
                    indicator: [{
                            text: '【会议】',
                            max: 100
                        },
                        {
                            text: '【学习】',
                            max: 100
                        },
                        {
                            text: '【咨询】',
                            max: 100
                        },
                        {
                            text: '【互动】',
                            max: 100
                        },
                        {
                            text: '【服务】',
                            max: 100
                        }
                    ],

                    textStyle: {
                        color: 'red'
                    },
                    center: ['50%', '50%'],
                    radius: 142,
                    startAngle: 90,
                    splitNumber: 3,
                    orient: 'horizontal', // 图例列表的布局朝向,默认'horizontal'为横向,'vertical'为纵向.
                    // shape: 'circle',
                    // backgroundColor: {
                    //     image:imgPath[0]
                    // },
                    name: {
                        formatter: '{value}',
                        textStyle: {
                            fontSize: 14, //外圈标签字体大小
                            color: '#5b81cb' //外圈标签字体颜色
                        }
                    },
                    splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
                        show: true,
                        areaStyle: { // 分隔区域的样式设置。
                            color: ['#141c42', '#141c42'], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
                        }
                    },
                    // axisLabel:{//展示刻度
                    //     show: true
                    // },
                    axisLine: { //指向外圈文本的分隔线样式
                        lineStyle: {
                            color: '#153269'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#113865', // 分隔线颜色
                            width: 1, // 分隔线线宽
                        }
                    }
                }, ],
                series: [{
                    name: '雷达图',
                    type: 'radar',
                    itemStyle: {
                        emphasis: {
                            lineStyle: {
                                width: 4
                            }
                        }
                    },
                    data: [{
                        name: '2016',
                        value: [85, 65, 55, 90, 82],
                        areaStyle: {
                            normal: { // 单项区域填充样式
                                color: {
                                    type: 'linear',
                                    x: 0, //右
                                    y: 0, //下
                                    x2: 1, //左
                                    y2: 1, //上
                                    colorStops: [{
                                        offset: 0,
                                        color: '#00c2ff'
                                    }, {
                                        offset: 0.5,
                                        color: 'rgba(0,0,0,0)'
                                    }, {
                                        offset: 1,
                                        color: '#00c2ff'
                                    }],
                                    globalCoord: false
                                },
                                opacity: 1 // 区域透明度
                            }
                        },
                        symbolSize: 2.5, // 单个数据标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
                        label: {                    // 单个拐点文本的样式设置                            
                                normal: {  
                                    show: true,             // 单个拐点文本的样式设置。[ default: false ]
                                    position: 'top',        // 标签的位置。[ default: top ]
                                    distance: 2,            // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效。[ default: 5 ]
                                    color: '#6692e2',          // 文字的颜色。如果设置为 'auto'，则为视觉映射得到的颜色，如系列色。[ default: "#fff" ]
                                    fontSize: 14,           // 文字的字体大小
                                    formatter:function(params) {  
                                        return params.value;  
                                    }  
                                }  
                            },
                        itemStyle: {
                            normal: { //图形悬浮效果
                                borderColor: '#00c2ff',
                                borderWidth: 2.5
                            }
                        },
                        // lineStyle: {
                        //     normal: {
                        //         opacity: 0.5// 图形透明度
                        //     }
                        // }
                    }, {
                        name: '2017',
                        value: [50, 20, 45, 30, 75],
                        symbolSize: 2.5,
                        itemStyle: {
                            normal: {
                                borderColor: '#f9cf67',
                                borderWidth: 2.5,
                            }
                        },
                        areaStyle: {
                            normal: { // 单项区域填充样式
                                color: {
                                    type: 'linear',
                                    x: 0, //右
                                    y: 0, //下
                                    x2: 1, //左
                                    y2: 1, //上
                                    colorStops: [{
                                        offset: 0,
                                        color: '#f9cf67'
                                    }, {
                                        offset: 0.5,
                                        color: 'rgba(0,0,0,0)'
                                    }, {
                                        offset: 1,
                                        color: '#f9cf67'
                                    }],
                                    globalCoord: false
                                },
                                opacity: 1 // 区域透明度
                            }
                        },
                        // lineStyle: {
                        //     normal: {
                        //         opacity: 0.5// 图形透明度
                        //     }
                        // }
                    }, {
                        name: '2018',
                        value: [37, 80, 12, 50, 25],
                        symbolSize: 2.5,
                        itemStyle: {
                            normal: {
                                borderColor: '#e92b77',
                                borderWidth: 2.5,
                            }
                        },
                        areaStyle: {
                            normal: { // 单项区域填充样式
                                color: {
                                    type: 'linear',
                                    x: 0, //右
                                    y: 0, //下
                                    x2: 1, //左
                                    y2: 1, //上
                                    colorStops: [{
                                        offset: 0,
                                        color: '#e92b77'
                                    }, {
                                        offset: 0.5,
                                        color: 'rgba(0,0,0,0)'
                                    }, {
                                        offset: 1,
                                        color: '#e92b77'
                                    }],
                                    globalCoord: false
                                },
                                opacity: 1 // 区域透明度
                            }
                        }
                    }]
                }, ]
            };
            chart.setOption(option);   
            window.onresize = ()=>{
                chart.resize();
            }       
        })
    }
}
</script>
<style lang="less" scoped>
.dysjfx-wrap{
    width: 100%;
    height: 100%;
    position: relative;
    padding-left: 300px;
    box-sizing: border-box;
}
.dysjfx-wrap-left{
    width: 270px;
    height: 334px;
    position: absolute;
    left: 0;
    top: 60px;
    border: 1px solid #567BE0;
    background: linear-gradient(to bottom,#1A3E9F,#133180);
    &::before{
        content: '';
        display: block;
        height: 1px;
        width: 90%;
        background: radial-gradient(rgba(95,178,255,.5),rgba(36,73,191,0));
        position: absolute;
        left: 5%;
        top: 111px;
    } 
    &::after{
        content: '';
        display: block;
        height: 1px;
        width: 90%;
        background: radial-gradient(rgba(95,178,255,.5),rgba(36,73,191,0));
        position: absolute;
        left: 5%;
        top: 222px;
    }         
}
.dysjfx-wrap-left-inner{
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    text-align: center;
    flex-wrap: wrap;
    &::after{
        content: '';
        display: block;
        height: 334px;
        width: 1px;
        background: radial-gradient(rgba(95,178,255,1),rgba(36,73,191,0));
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }  
    dl{
        width: 50%;
        position: relative;
        padding: 20px 0;
        dt{
            color: #FFD74F;
            font-size: 18px;
        }
        dd{
            color: #fff;
            margin-top: 5px;
        }
    }
}
.dysjfx-wrap-right{
    width: 100%;
    height: 400px;
    position: relative;
    &::after{
        content: '';
        display: block;
        width: 154px;
        height: 27px;
        background-image: url(../../../assets/grhyd.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        bottom: 0;
    }
}
</style>


