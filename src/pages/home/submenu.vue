<template>
<ul class="submenu">
	<li class="title" @click='opend =!opend'>{{data.displayName}}</li>
	<collapse-transition>
		<ul class="menu" v-show="opend">
			<router-link v-for="(elem,index) in data.children" :to="{path:elem.url}" :key="index" tag='li' class="submenu-item" v-if="elem.type == 1">{{elem.displayName}}</router-link>
		</ul>
	</collapse-transition>

</ul>
</template>
<script>
import CollapseTransition from '@/components/Collapse'
export default {
	name: "",
	data() {
		return {
			opend: false
		}
	},
	props: {
		data: {
			type: Object,
			default: {}
		}
	},
	components: {
		CollapseTransition
	},
	mounted() {
		//do something after mounting vue instance
        setTimeout(()=>{
            if (this.data.children.findIndex(item => this.$route.path.includes(item.url)) != -1) {
				this.opend = true
			}
        },250)
	},
	watch:{
		$route(cur,prev){
			if (this.data.children.findIndex(item => cur.path == item.url) != -1) {
				this.opend = true
			}
		}
	}
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';
.submenu {
    .title {
        line-height: 56px;
        padding-left: 32px;
        .font(16px, @title-color);

    }
    .submenu-item {
        line-height: 56px;
        height: 56px;
        padding-left: 64px;
        .font(16px, @title-color);
        .transition(all .3s);
        // &.router-link-active,
        // &:hover {
        //     background: fade(@primary-color,4%);
        //     color: @link-color;
        //     border-right: 4px solid @link-color;
        // }
    }
}
</style>
