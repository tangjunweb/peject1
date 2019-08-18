import echarts from 'echarts'
import chengdu from '@/utils/cityjson/chengdu.json'
echarts.extendsMap = function (element, data) {
    let chart = this.init(element);
    let option = {
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                if (typeof (params.value)[2] == "undefined") {
                    return params.name + ' : ' + params.value;
                } else {
                    return params.name + ' : ' + params.value[2];
                }
            }
        },
        dataRange: {
            // splitList: [
            //     { start: 1, end: 3, color: '#FECECB' },
            //     { start: 3, end: 5, color: '#FC857D' },
            //     { start: 6, end: 100, color: '#F54336' },
            // ]
            color: ['#F54336', '#FC857D', '#FECECB'],
            min: 0,
            max: 66666,
            x: 'right',
            y: 'bottom',
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: false,
            splitNumber: 0,
            padding: 5,
            textStyle: {
                color: '#000'
            }
        },
        geo: {
            show: true,
            aspectScale: 0.75,
            zoom: 1.2,
            map: 'chengdu',
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false,
                }
            },
            roam: false,//地图设置不可拖拽，固定的
            itemStyle: {
                normal: {
                    areaColor: '#FECECB',
                    borderWidth: 0,
                    shadowColor: 'rgba(0, 0, 0,.4)',
                    shadowBlur: 30
                }
            }
        },
        series: [
            {
                type: 'map',
                geoIndex: 1,
                mapType: 'chengdu',
                aspectScale: 0.75,
                zoom: 1.2,
                itemStyle: {
                    normal: {
                        borderWidth: 3,
                        borderColor: '#fff', //区域边框颜色
                        areaColor: "#FECECB", //区域颜色
                        label: {
                            show: true,
                            textStyle: {
                                color: "#fff"
                            }
                        },
                    },
                    emphasis: {
                        borderWidth: 3,
                        borderColor: '#fff',
                        areaColor: "#F54336",
                        label: {
                            show: true,
                            textStyle: {
                                color: "#fff"
                            }
                        },
                    }
                },
                data: data,
            }
        ]
    };
    chart.setOption(option, true);
    return chart;
}
export default function init(element, data) {
    echarts.registerMap('chengdu', chengdu);
    let chart = echarts.extendsMap(element, data);
    return chart;
}
