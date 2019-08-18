<template>
    <Modal :value="show" title="选择权限" :closable="false"  width="800px"  class="modal-form"
        @on-visible-change="change">
        <div style="position:relative">
            <Form ref="formA" :label-width="100">
                <Row :gutter="30">
                    <Col :span="24">
                    <FormItem class="xmcdqx-form-item" >
                        <Tree ref="tree" :data="permiss" :render="renderContent" show-checkbox></Tree>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
            <Spin v-show="spinShow" fix>
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
    			<div>加载中</div>
            </Spin>
        </div>
        <div slot="footer">
            <Button type="primary" :loading="loading" @click="save">保存</Button>
            <Button @click="cancel">关闭</Button>
        </div>
    </Modal>
</template>
<script>
import {
    Modal,
    Form,
    FormItem,
    Tree,
} from 'iview'
import {
    SetRoleMenu,
    RoleMenusList
} from '@/api'
import {
    reject
} from 'bluebird';
export default {
    components: {
        Modal,
        Form,
        FormItem,
        Tree
    },
    props: {
        value: Boolean,
        roleId: [String, Number]
    },
    data() {
        return {
            loading: false,
            spinShow: false,
            permiss: [],
        }
    },
    computed: {
        show() {
            return this.value;
        },
    },
    watch: {
        value(n) {
            if (n) {
                if (this.roleId) {
                    this.loadPermiss().then(res => {
                        this.loadData();
                    })
                } else {
                    this.loadPermiss();
                }
            }
        }
    },
    methods: {
        renderContent(h, {
            root,
            node,
            data
        }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span', [
                    h('span', {
                        style: {
                            marginRight: '8px'
                        }
                    }, data.displayName),
                    h('span', data.name)
                ])
            ]);
        },
        loadData() {
            this.spinShow = true;
            RoleMenusList({
                roleId: this.roleId
            }).then(res => {
                if (res) {
                    let fn = (arr, ps) => {
                        return arr.map(e => {
                            if (!e.children || e.children.length === 0) {
                                let psfn = (arr) => {
                                    arr.forEach(item =>{
                                        if(!item.children || item.children.length === 0){
                                            if(item.id == e.id){
                                                e.checked = true;
                                            }
                                        }else if(item.children && Array.isArray(item.children)){
                                            psfn(item.children)
                                        }
                                    })
                                }
                                psfn(ps)
                                // if (ps.includes(e.id)) {
                                //     e.checked = true;
                                // } else {
                                //     e.checked = false;
                                // }
                            } else if (e.children && Array.isArray(e.children)) {
                                    e.children = fn(e.children, ps);

                            }
                            return e;
                        })
                    }
                    let data = fn(JSON.parse(JSON.stringify(this.permiss)), res);
                    this.permiss = data;
                }
                // this.formModel = new Project(res);
            }).finally(() => {
                this.spinShow = false;
            })
        },
        loadPermiss() {
            return new Promise((resolve, reject) => {
                this.spinShow = true;
                this.$store.dispatch('getAllPermiss').then(res => {
                    let f = (arrs) => {
                        arrs.forEach(e => {
                            //e.expand = true;
                            e.title = e.displayName;
                            if (e.children && e.children.length) {
                                f(e.children);
                            }
                        })
                        return arrs;
                    }
                    this.permiss = f(res);
                }).finally(() => {
                    this.spinShow = false;
                    resolve();
                })
            })
        },
        cancel() {
            this.$emit('input', false);
        },
        change(f) {
            this.$emit('input', f);
        },
        save() {
            let params = {
                roleId: this.roleId
            };
            let d = [];
            let getCheckedNode = (arr, ps) => {
                arr.forEach(e => {
                    if (e.checked) {
                        ps.push(e.id)
                    }
                    if (e.children && Array.isArray(e.children)) {
                        let len = ps.length;
                        getCheckedNode(e.children, ps);
                        if (len < ps.length && !ps.includes(e.id)) {
                            ps.push(e.id)
                        }
                    }
                })
            }
            getCheckedNode(this.permiss, d)
            params.menuList = d;

            let fn = () => {
                this.loading = true;

                    SetRoleMenu(params).then(res => {
                        this.$Message.success('选择菜单权限成功');
                        this.$emit('input', false);
                    }).finally(() => {
                        this.loading = false;
                    })
            }
            fn()

        }
    }
}
</script>
<style lang="less" scoped>
</style>
