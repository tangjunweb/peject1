<template>
<Tooltip :content="content" :disabled='!content' placement="bottom">
     <svg
        :class="'svg-icon-'+name"
        :style="{cursor: cancursor ? 'pointer' : ''}"
        class="svg-icon"
        focusable="false"
        aria-hidden="true">
        <use :xlink:href="iconName"/>
    </svg>
</Tooltip>

</template>

<script>
import {Tooltip} from 'iview'
export default {
    components : {
        Tooltip
    },
    name: 'SvgIcon',
    props: {
        content: {
             type: String,
            default: ''
        },
        cursor: {
             type: Boolean,
            default: false
        },
        name: {
            type: String,
            required: true
        },
        
    },
    data () {
        return {
            nameInner: ''
        }
    },
    computed: {
        cancursor() {
            return this.cursor
        },
        iconName () {
            // TODO: svg symbol 文件缓存
            let name = this.nameInner
            /**
             * 内部链接，只需要指定icon name即可
             */
            return `#icon-${name}`
        }
    },
    watch: {
        name: {
            immediate: true,
            handler (val) {
                this.nameInner = val
            }
        }
    }
}
</script>
<style>
.svg-icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    vertical-align: -.15em;
    fill: currentColor !important;
    color: inherit;
    overflow: hidden;
}
</style>
