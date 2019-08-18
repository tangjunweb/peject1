import { hasAuthority } from '@/utils/util'
export const SkipCount = {
    methods: {
        SkipCount(MaxResultCount, PageIndex) {
            return PageIndex * MaxResultCount - MaxResultCount;
        }
    },
    watch: {
        params: {
            deep: true,
            handler() {
                this.loadData();
            }
        }
    }
}
export const SkipCountExtend = {
    data() {
        return {
            resetTotal: false,
            params: {
                MaxResultCount: 10,
                SkipCount: 0,
                PreSkipCount: 0,
                LastId: "",
                PageIndex: 1
            },
        }
    },
    methods: {
        SkipCount(MaxResultCount, PageIndex) {
            return PageIndex * MaxResultCount - MaxResultCount;
        },
    },
    watch: {
        resetTotal(n){
            console.log(n)
        },
        searchParams: {
            deep: true,
            handler(n) {
                this.params = {
                    MaxResultCount: 10,
                    SkipCount: 0,
                    PreSkipCount: 0,
                    LastId: "",
                    PageIndex: 1
                }
                this.resetTotal = true;
            }
        },
        "params.PageIndex"(newValue, oldValue) {
            if (newValue == 1) {
                this.params = {
                    MaxResultCount: 10,
                    SkipCount: 0,
                    PreSkipCount: 0,
                    PageIndex: 1,
                    LastId: ''
                }
            } else {
                this.params.PreSkipCount = this.params.MaxResultCount * oldValue - this.params.MaxResultCount;
            }

            this.loadData();

        }
    },
}
export const ClearParams = {
    methods: {
        ClearParams(d) {
            let data = JSON.parse(JSON.stringify(d));
            if (Array.isArray(data)) {
                data.map(e => {
                    return this.ClearParams(e);
                })
            } else if (data instanceof Object) {
                for (let key in data) {
                    if (data[key] === '' || data[key] === null || data[key] === 'undefined' || data[key] === 'pageIndex') {
                        delete data[key];
                    }
                }
            }
            return data;
        }
    }
}
export const Auth = {
    computed: {
        session() {
            return this.$store.state.session;
        }
    },
    methods: {
        auth(path) {
            // return this.$store.state.allPermissions;
            return hasAuthority(path, this.$store.state.permissions);
        }
    }
}
