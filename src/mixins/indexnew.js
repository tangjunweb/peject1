export const Reset = {
    methods: {
        handleReset(name) {
            this.$refs[name].resetFields();
        }
    }
}