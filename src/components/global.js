
// 公共组件处理

import TopCard from './topcard'
import BasScroll from './scroll'
import SvgIcon from './SvgIcon'
const globalComponent = {
    TopCard,
    BasScroll,
    SvgIcon
}

const install = Vue => {
    Object.keys(globalComponent).forEach(element => {
        Vue.component(element, globalComponent[element])
    })
}
export default {
    install
}
