<template>
    <div class="lcard" :style="style">
        <div class="lcard-header" v-if="$slots.header">
            <slot name="header"></slot>
        </div>
        <div class="lcard-body">
            <slot></slot>
        </div>
        <div class="lcard-footer" v-if="$slots.footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        style () {
            let obj = {};
            if(this.$slots.header){
                obj.paddingTop = '65px';
            }
            if(this.$slots.footer){
                obj.paddingBottom = '65px';
            }
            return obj;
        }
    }
}
</script>

<style lang="less">
.lcard{
    width: 100%;
    height: 100%;
    border: 1px solid #e5dfdf;
    box-sizing: border-box;
    position: relative;
}
.lcard-body{
    height: 100%;
    width: 100%;
}
.lcard-header,.lcard-footer{
    width: 100%;
    height: 50px;
    line-height: 50px;
    position: absolute;
    left: 0;
    padding: 0 20px; 
    box-sizing: border-box;
}
.lcard-footer{
    bottom: 0;
    border-top: 1px solid #e5dfdf;
}
.lcard-header{
    top: 0;
    border-bottom: 1px solid #e5dfdf;
}
</style>
