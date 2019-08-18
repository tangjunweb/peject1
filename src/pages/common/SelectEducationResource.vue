<template>
  <Modal
    :value="value"
    :title="title"
    :loading="loading"
    class-name="blue-modal"
    @on-visible-change="onVisibleChange"
    transfer
    width="700px"
  >
    <div class="scroll modal-scroll">
      <Row>
        <Col :span="24" class="select-education-resource-wrap" v-if="resourceTypeList1.length">
          <span
            @click="select(el,1)"
            :class="el.checked ? 'checked' : ''"
            class="select-education-resource-item"
            v-for="(el,i) in resourceTypeList1"
            :key="i"
          >{{el.className}}</span>
        </Col>
        <Col :span="24" class="select-education-resource-wrap" v-if="resourceTypeList2.length">
          <span
            @click="select(el,2)"
            :class="el.checked ? 'checked' : ''"
            class="select-education-resource-item"
            v-for="(el,i) in resourceTypeList2"
            :key="i"
          >{{el.className}}</span>
        </Col>
        <Col :span="24" class="select-education-resource-wrap" v-if="resourceTypeList3.length">
          <span
            @click="select(el,3)"
            :class="el.checked ? 'checked' : ''"
            class="select-education-resource-item"
            v-for="(el,i) in resourceTypeList3"
            :key="i"
          >{{el.className}}</span>
        </Col>
        <Col :span="10">
          <div class="select-education-resource-left">
            <div class="select-education-resource-head">
              <div class="select-education-resource-hl">
                <Checkbox @on-change="checkChange1" :value="allState1" :disabled="disabledl"></Checkbox>
              </div>
              <div class="select-education-resource-hc">资源列表</div>
              <div class="select-education-resource-hr">{{totalCount}}</div>
            </div>
            <div class="select-education-resource-list-scroll scroller" ref="scroll">
              <div class="select-education-resource-list">
                <div class="select-education-resource-list-item" v-for="(el,i) in data" :key="i">
                  <Checkbox
                    @on-change="singleChange(el)"
                    :disabled="type === 'single' && selectData.length !== 0"
                    v-model="el.checked"
                  ></Checkbox>
                  <i :class="getClass(el.resourceType)" class="lhyj_swdj"></i>
                  <span>{{el.name}}</span>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col :span="4">
          <div class="select-education-resource-center">
            <Button @click="add" :disabled="!disabledRight" type="primary" icon="ios-arrow-forward"></Button>
            <Button @click="remove" :disabled="!disabledLeft" type="primary" icon="ios-arrow-back"></Button>
          </div>
        </Col>
        <Col :span="10">
          <div class="select-education-resource-right">
            <div class="select-education-resource-head">
              <div class="select-education-resource-hl">
                <Checkbox @on-change="checkChange2" :value="allState2" :disabled="disabledr"></Checkbox>
              </div>
              <div class="select-education-resource-hc">已选择资源</div>
              <div class="select-education-resource-hr">{{selectData.length}}</div>
            </div>
            <div class="select-education-resource-list-scroll">
              <div class="select-education-resource-list scroll">
                <div
                  class="select-education-resource-list-item"
                  v-for="(el,i) in selectData"
                  :key="i"
                >
                  <Checkbox v-model="el.checked"></Checkbox>
                  <i :class="getClass(el.resourceType)" class="lhyj_swdj"></i>
                  <span>{{el.name}}</span>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
    <Spin fix v-if="modalSpin"></Spin>
    <div slot="footer">
      <Button @click="$emit('input',false)" type="primary">取消</Button>
      <Button :disabled="!selectData.length" :loading="loading" @click="save" type="primary">确认选择</Button>
    </div>
  </Modal>
</template>
<script>
import { Modal,Checkbox } from 'iview'
import { GetOrganManageResourceList, GetParentOrganManageResourceList, TrainClassCourseServiceSetCourseResource } from '@/api/education'
import BScroll from 'better-scroll'
export default {
    components: {
        Modal,
        Checkbox
    },
    props: {
        default: {
            type: Array,
            default: []
        },
        value: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'multiple'
        },
        ResourceType: {
            type: [String,Number]
        },
        title: {
            type: String
        }
    },
    data() {
        return {
            modalSpin: false,
            loading: false,
            data: [],
            totalCount: 0,
            params: {
                SkipCount: 0,
                MaxResultCount: 15
            },
            selectData: [],
            $scroll: null,
            finished: false,
            ResourceClassPath: '',
            resourceTypeList: [],
            resourceTypeList1: [],
            resourceTypeList2: [],
            resourceTypeList3: []            
        }
    },
    watch: {
        value (f) {
            if(f){
                this.modalSpin = true;
                this.data = [];
                console.log(this.default)
                this.selectData = this.default.map(e => {
                    return {
                        id: e.resourceId,
                        name: e.resourceName,
                        period: e.period
                    }
                });
                this.loadData().then(res=>{
                    this.modalSpin = false;
                });
            }else{
                this.selectData = [];
                this.params.SkipCount = 0;
            }
        }
    },
    computed: {
        allState1 () {
            return this.data.some(e=>e.checked);
        },
        allState2 () {
            return this.selectData.some(e=>e.checked);
        },
        disabledRight () {
            return this.data.some(e=>{
                return e.checked;
            })
        },
        disabledLeft () {
            return this.selectData.some(e=>{
                return e.checked;
            })
        },
        disabledl () {
            return this.type === 'single'||!this.data.length;
        },
        disabledr () {
            return this.type === 'single'||!this.selectData.length;
        }    
    },
    methods: {
        onVisibleChange(v){
            this.$emit('onVisibleChange', v)
        },
        select (el,level) {
            if(level === 1){
                this.resourceTypeList1.forEach(e=>{
                    if(e.id!==el.id){
                        e.checked = false;
                    }else{
                        e.checked = true;
                    }
                })
                this.resourceTypeList2 = this.resourceTypeList.filter(e=>{
                    return e.parentId === el.id;
                }).map(e=>{
                    e.checked = false;
                    return e;
                }) 
                this.resourceTypeList3 = [];
            }else if(level === 2){
                this.resourceTypeList2.forEach(e=>{
                    if(e.id!==el.id){
                        e.checked = false;
                    }else{
                        e.checked = true;
                    }
                })                
                this.resourceTypeList3 = this.resourceTypeList.filter(e=>{
                    return e.parentId === el.id;
                }).map(e=>{
                    e.checked = false;
                    return e;
                }) 
            }else{
                this.resourceTypeList3.forEach(e=>{
                    if(e.id!==el.id){
                        e.checked = false;
                    }else{
                        e.checked = true;
                    }
                })                
            }           
            this.ResourceClassPath = el.resourceClassPath;
            this.params.SkipCount = 0;
            this.data = [];
            this.loadData();
        },
        getClass (type) {
            switch (type) {
                case 1: 
                    return 'lhyj_swdj-server-shipinwenjian';
                break;
                case 2: 
                    return 'lhyj_swdj-dianzishu';
                break;
                case 3: 
                    return 'lhyj_swdj-yinpin';
                break;
                case 4: 
                    return 'lhyj_swdj-wenjian';
                break;
                case 5: 
                    return 'lhyj_swdj-zhuanti';
                break;
                case 6: 
                    return 'lhyj_swdj-tupian';
                break;
                case 7: 
                    return 'lhyj_swdj-donghua';
                break;
            }
        },
        singleChange (el) {
            if(el.checked&&this.type === 'single'){
                this.data.forEach(e=>{
                    if(e.id!==el.id){
                        e.checked = false;
                    }
                })
            }
        },
        checkChange1 (v) {
            if(v){
                this.data.forEach(e=>{
                    e.checked = true;
                })
            }
        },
        checkChange2 (v) {
            if(v){
                this.selectData.forEach(e=>{
                    e.checked = true;
                })
            }
        },
        add () {
            let arr = this.data.filter(e=>e.checked === true).map(e=>{
                let obj = JSON.parse(JSON.stringify(e));
                obj.checked = false;
                return obj;
            });
            this.selectData = this.selectData.concat(arr);
            this.data = this.data.filter(e=>e.checked === false);
        },
        remove () {
            let arr = this.selectData.filter(e=>e.checked === true).map(e=>{
                let obj = JSON.parse(JSON.stringify(e));
                obj.checked = false;
                return obj;
            });
            this.data = this.data.concat(arr);
            this.selectData = this.selectData.filter(e=>e.checked === false);
        },
        loadData () {
            return new Promise((resolve,reject)=>{
                let params = JSON.parse(JSON.stringify(this.params));
                params.ResourceType = this.ResourceType;
                if(this.ResourceClassPath){
                    params.ResourceClassPath = this.ResourceClassPath;
                }
                GetParentOrganManageResourceList(params).then(res=>{
                    let d = res.items.filter(e=>{
                        return !this.selectData.map(el=>el.id).includes(e.id);
                    });
                    console.log(d)
                    d.map(e=>{
                        e.checked = false;
                    })
                    this.data = this.data.concat(d);
                    this.totalCount = res.totalCount;
                    resolve(d);
                })               
            })
        },
        save () {
            this.$emit('input', false);
            this.loading = true;
            let resourceList = this.selectData.map(e=>{     
                return {
                    resourceId: e.id,
                    period: e.period
                }
            });
            TrainClassCourseServiceSetCourseResource({
                resourceList,
                trainClassCourseId: this.$route.query.id,
                resourceType: this.ResourceType
            }).then(res=>{
                this.$Message.success('添加成功');
                this.$emit('input',false);
                this.$emit('change');
            }).finally(()=>{
                this.loading = false;
            })
        }
    },
    mounted () {
        this.$nextTick(()=>{
            this.$scroll = new BScroll(this.$refs['scroll'],{
                disableMouse: false,
                click: true,
                pullUpLoad: true,
                scrollbar: {
                    fade: true,
                    interactive: false
                },                
                mouseWheel: {
                    speed: 20,
                    invert: false,
                    easeTime: 300
                }                
            });
            this.$scroll.on('pullingUp',()=>{
                this.params.SkipCount+=this.params.MaxResultCount;
                if(!this.finished){
                    this.loadData().then(res=>{
                        if(res.length === 0){
                            this.finished = true;
                        }
                    }).finally(()=>{
                        this.$scroll.finishPullUp();
                    })                    
                }
            })
        })     
        this.$store.dispatch('getAllResourceClassList').then(res=>{
            this.resourceTypeList = res;
            let arr = res.filter(e=>{
                return e.parentId === null;
            }).map(e=>{
                e.checked = false;
                return e;
            });
            arr.unshift({
                id: '',
                parentId: null,
                checked: true,
                className: '全部',
                resourceClassPath: ''
            })
            this.resourceTypeList1 = arr;
        });   
    }
}
</script>

<style lang="less">
@import "../../style/common.less";
.select-education-resource-left,
.select-education-resource-right {
  width: 100%;
  height: 300px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  position: relative;
  padding: 30px 15px 15px 15px;
  box-sizing: border-box;
}
.select-education-resource-head {
  height: 30px;
  position: absolute;
  line-height: 30px;
  left: 0;
  width: 100%;
  top: 0;
  padding: 0 30px;
  box-sizing: border-box;
  background: #e6e6e6;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  .select-education-resource-hl {
    width: 15px;
    height: 30px;
    left: 15px;
    top: 0;
    position: absolute;
  }
  .select-education-resource-hc {
    padding-left: 15px;
  }
  .select-education-resource-hr {
    position: absolute;
    width: 15px;
    height: 30px;
    right: 15px;
    top: 0;
  }
}
.select-education-resource-center {
  padding: 100px 15px 0 15px;
  box-sizing: border-box;
  button {
    width: 100%;
  }
  .ivu-btn + .ivu-btn {
    margin-top: 20px;
    margin-left: 0;
  }
  .ivu-btn {
    background-color: transparent;
    color: #666;
  }
}
.select-education-resource-list-scroll {
  width: 100%;
  height: 270px;
  padding: 15px 0;
  box-sizing: border-box;
  &.scroller {
    overflow: hidden;
    position: relative;
    .select-education-resource-list {
      height: auto;
      padding-bottom: 30px;
    }
  }
}
.select-education-resource-list {
  padding: 15px 0;
  box-sizing: border-box;
  overflow-y: auto;
  height: 240px;
}
.select-education-resource-list-item {
  margin-bottom: 5px;
  position: relative;
  i {
    margin-right: 5px;
  }
}
.select-education-resource-item {
  margin-right: 10px;
  display: inline-block;
  padding-bottom: 5px;
  cursor: pointer;
  &.checked {
    color: @primary-color;
  }
}
.select-education-resource-wrap {
  box-sizing: border-box;
  margin-bottom: 10px;
}
</style>
