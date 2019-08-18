<template>
    <span>
        <Input :value="value" :disabled="disabled" :readonly="readonly" :placeholder="placeholder" :size="size">
            <Button slot="append" @click="show = true" type="primary" icon="ios-navigate"></Button>
        </Input>
        <Modal
            :value="show"
            title="选择地址"
            :closable="false"
            transfer
            :mask-closable="false"
            width="800px"
            class-name="blue-modal"
            @on-visible-change="change">
            <div class="map-select-wrap">
                <Alert>点击地图选择地址
                    <template slot="desc">
                        <div class="map-select-info">
                            <Icon :size="16" type="ios-navigate" />
                            {{address.address}}
                        </div>
                    </template>
                </Alert>
                <Select
                    filterable
                    v-model="address.address"
                    ref="select"
                    remote
                    size="large"
                    @on-change="selectChange"
                    placeholder="搜索地址"
                    :remote-method="remoteMethod"
                    :loading="loadingSearch">
                    <Option v-for="(option, index) in addressList" :value="option.district+option.address" :label="option.district+option.address" :key="index">
                        <p class="sop-tit">{{option.name}}</p>
                        <p class="sop-desc">{{option.district}}{{option.address}}</p>
                    </Option>
                </Select>
                <div class="mapaddress-select" :id="id">
                    <Spin fix v-if="loadingMap"></Spin>
                </div>
            </div>
            <div slot="footer">
                <Button :disabled="!address.address" type="primary" :loading="loading" @click="save">确定选择</Button>
                <Button type="primary" @click="cancel">取消</Button>
            </div>
        </Modal>
    </span>
</template>
<script>
import { Input, Modal, Select, Option } from 'iview'
import { UseMap } from '@/utils/util'
export default {
    components: {
        Input,
        Modal,
        Select,
        Option
    },
    props: {
        placeholder: {
            type: String,
            default: '请选择地址'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: true
        },
        size: {
            type: String,
            default: 'default'
        },
        value: {
            type: String,
            default: ''
        },
        longitude: {
            type: [String,Number]
        },
        latitude: [String,Number]
    },
    watch: {
        show (n) {
            if(n){
                if(!this.$map){
                    this.loadingMap = true;
                    this.$nextTick(()=>{
                        UseMap(()=>{
                            let opts = {
                                resizeEnable: true,
                                zoom: 11
                            };
                            this.$map = new AMap.Map(this.id, opts);
                            AMap.plugin('AMap.Geolocation', ()=> {
                                let geolocation = new AMap.Geolocation({
                                    enableHighAccuracy: true,//是否使用高精度定位，默认:true
                                    timeout: 10000,          //超过10秒后停止定位，默认：5s
                                    buttonPosition:'RB',    //定位按钮的停靠位置
                                    buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                                    zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点

                                });
                                this.$map.addControl(geolocation);
                                AMap.plugin('AMap.Geocoder', ()=> {
                                    let geocoder = new AMap.Geocoder();
                                    if(this.address.address){
                                        geocoder.getLocation(this.address.address, (status, result)=> {
                                            if (status === 'complete'&&result.geocodes.length) {
                                                let lnglat = result.geocodes[0].location;
                                                this.$map.setZoomAndCenter(11,lnglat);
                                                if(!this.$marker){
                                                    this.$marker = new AMap.Marker();
                                                    this.$map.add(this.$marker);
                                                }
                                                this.$marker.setPosition(lnglat);
                                                this.$map.setFitView(this.$marker);
                                            }
                                        });
                                    }else{
                                        geolocation.getCurrentPosition((status,result)=>{
                                            if(status=='complete'){
                                                    this.address.address = result.formattedAddress;
                                                    this.address.longitude = result.position.lng;
                                                    this.address.latitude = result.position.lat;
                                                    //this.$refs['select'].setQuery(result.formattedAddress);
                                                    if(!this.$marker){
                                                        this.$marker = new AMap.Marker();
                                                        this.$map.add(this.$marker);
                                                    }
                                                    this.$marker.setPosition(result.position);
                                                    this.$map.setFitView(this.$marker);
                                            }
                                        });
                                    }
                                    this.$map.on('click',e=>{
                                        geocoder.getAddress([e.lnglat.getLng() , e.lnglat.getLat()], (status, result)=> {
                                            if (status === 'complete' && result.info === 'OK') {
                                                let d = result.regeocode;
                                                this.address.address = d.formattedAddress;
                                                this.address.longitude = e.lnglat.getLng();
                                                this.address.latitude = e.lnglat.getLat();
                                                //this.$refs['select'].setQuery(d.formattedAddress);
                                                if(!this.$marker){
                                                    this.$marker = new AMap.Marker();
                                                    this.$map.add(this.$marker);
                                                }
                                                this.$marker.setPosition(e.lnglat);
                                                this.$map.setFitView(this.$marker);
                                            }
                                        })
                                    })
                                })
                            });
                            this.loadingMap = false;
                        })
                    })
                }
            }
        }
    },
    data() {
        let getRandomCode = (length)=> {
            if (length > 0) {
                let data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
                let nums = "";
                for (var i = 0; i < length; i++) {
                    var r = parseInt(Math.random() * 61);
                    nums += data[r];
                }
                return nums;
            } else {
                return false;
            }
        }
        return {
            show: false,
            loading: false,
            loadingSearch: false,
            loadingMap: false,
            id: `map_${getRandomCode(24)}`,
            $map: null,
            address: {
                address: '',
                longitude: '',
                latitude: ''
            },
            addressList: [],
            $marker: null
        }
    },
    methods: {
        change () {

        },
        selectChange (e) {

        },
        save () {
            this.show = false;
            this.$emit('change',this.address);
            this.$emit('input',this.address.address);
        },
        cancel () {
            this.show = false;
        },
        remoteMethod (query) {
            if(query !== ''){
                this.loadingSearch = true;
                UseMap(()=>{
                    AMap.plugin('AMap.Autocomplete', ()=>{
                        let autoOptions = {
                            city: '全国'
                        }
                        let autoComplete = new AMap.Autocomplete(autoOptions);
                        autoComplete.search(query, (status, result)=> {
                            if(status === 'complete' && result.info === 'OK'){
                                this.addressList = result.tips;
                            }
                            this.loadingSearch = false;
                        })
                    })
                })
            }
        }
    },
    mounted () {
        if(this.value){
            this.address.address = this.value;
        }
        if(this.latitude){
            this.address.latitude = this.latitude;
        }
        if(this.longitude){
            this.address.longitude = this.longitude;
        }
    }
}
</script>
<style lang="less">
    .map-select-wrap{
        position: relative;
    }
    .mapaddress-select{
        width: 100%;
        height: 400px;
    }
    .sop-tit{

    }
    .map-select-info{
        padding: 15px;
        i{
            transform: translateY(-2px)
        }
    }
    .sop-desc{
        font-size: 12px;
        color: #849CDC;
        margin-top: 10px;
    }
</style>
