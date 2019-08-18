<template>
    <Modal :value="show" :title="title" :closable="false"  width="800px"  class="modal-form"
        @on-visible-change="change">
        <div style="position:relative">
            <Form ref="formA" :label-width="100">
                <Row :gutter="30">
                    <Col :span="24">
                    <FormItem class="xmcdqx-form-item" label="项目菜单权限:">
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
    // CreateProject,
    // ModifyProject,
    // GetProjectById,
    // SiteList,
    // SetRoleMenu,
    TenantMenusIdList,
    SetTenantMenu
} from '@/api'
// import Project from '@/pages/model/Project'
import {
    reject
} from 'bluebird';
export default {
    name: 'project-permiss-modal',
    components: {
        Modal,
        Form,
        FormItem,
        Tree
    },
    props: {
        value: Boolean,
        id: [String, Number],
        title: {
            type: String,
            default: '选择菜单权限'
        }
    },
    data() {
        return {
            loading: false,
            spinShow: false,
            // formModel: new Project(),
            // rules: Project.getRules(),
            permiss: [],
            // tabName: 'xmjbxx',
            // sitelist: []
        }
    },
    computed: {
        show() {
            return this.value;
        },
        disabled() {
            return !!this.id;
        }
    },
    watch: {
        value(n) {
            if (n) {
                // this.$refs['formA'].resetFields();
                // this.$refs['formB'].resetFields();
                // this.tabName = 'xmjbxx';
                // let fn = () => {
                //     return new Promise((resolve, reject) => {
                //         SiteList().then(res => {
                //             this.sitelist = res;
                //             resolve();
                //         })
                //     })
                // };
                if (this.id) {
                    this.loadPermiss().then(res => {
                        this.loadData();
                    })
                } else {
                    // this.formModel = new Project();
                    this.loadPermiss();
                    // fn();
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
            TenantMenusIdList({
                tenantId: this.id
            }).then(res => {
                if (res) {
                    let fn = (arr, ps) => {
                        return arr.map(e => {
                            if (!e.children || e.children.length === 0) {
                                if (ps.includes(e.id)) {
                                    e.checked = true;
                                } else {
                                    e.checked = false;
                                }
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
                this.$store.dispatch('getAllPermiss', {isadmin: true}).then(res => {
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
                tenantId: this.id
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
            // let p1 = () => {
            //     return new Promise((resolve, reject) => {
            //         this.$refs['formA'].validate(valid => {
            //             resolve(valid);
            //         })
            //     })
            // }
            // let p2 = () => {
            //     return new Promise((resolve, reject) => {
            //         this.$refs['formB'].validate(valid => {
            //             resolve(valid);
            //         })
            //     })
            // }
            let fn = () => {
                this.loading = true;
                // if (!this.id) {
                //     CreateProject(params).then(res => {
                //         this.$Message.success('添加项目成功');
                //         this.$emit('change');
                //         this.$emit('input', false);
                //     }).finally(() => {
                //         this.loading = false;
                //     })
                // } else {
                    SetTenantMenu(params).then(res => {
                        this.$Message.success('修改菜单权限成功');
                        // this.$emit('change');
                        this.$emit('input', false);
                    }).finally(() => {
                        this.loading = false;
                    })
                // }
            }
            fn()
            // if (this.id) {
            //     p1().then(valid => {
            //         if (valid) {
            //             fn();
            //         }
            //     })
            // } else {
            //     Promise.all([p1(), p2()]).then(res => {
            //         if (this.tabName === 'xmjbxx') {
            //             if (res[0] && !res[1] && !this.id) {
            //                 this.tabName = 'xmgly';
            //             }
            //         } else {
            //             if (res[1] && !res[0]) {
            //                 this.tabName = 'xmjbxx';
            //             }
            //         }
            //         if (res[0] && res[1]) {
            //             fn();
            //         }
            //     })
            // }
        }
    }
}
</script>
<style lang="less" scoped>
</style>
