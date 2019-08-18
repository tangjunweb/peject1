import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

Vue.component('svg-icon', SvgIcon)

const svgicon = require.context('./svg', false, /\.svg$/)

const requireAll = requireContext => requireContext.keys()

const iconsResource = requireAll(svgicon)

iconsResource.map(svgicon)

const re = /\.\/(.*)\.svg/

const icon = iconsResource.map(i => {
    return i.match(re)[1]
})

export default icon
