import Vue from 'vue'
import { Notice, Button,Input,Form,FormItem, Layout, Header, Sider, Content, Footer, Row, Col, Spin, LoadingBar, Icon, Message, Alert, Modal, Circle, Tag } from 'iview'
Vue.component('Button', Button);
Vue.component('Input', Input);
Vue.component('Form', Form);
Vue.component('FormItem', FormItem);
Vue.component('Layout', Layout);
Vue.component('Header', Header);
Vue.component('Sider', Sider);
Vue.component('Content', Content);
Vue.component('Footer', Footer);
Vue.component('Row', Row);
Vue.component('Col', Col);
Vue.component('Icon', Icon);
Vue.component('Spin', Spin);
Vue.component('Alert', Alert);
Vue.component('i-circle', Circle);
Vue.component('Tag', Tag);
Message.config({
    duration: 3
})
Vue.prototype.$Message = Message;
Vue.prototype.$LoadingBar = LoadingBar;
Vue.prototype.$Spin = Spin;
Vue.prototype.$Modal = Modal;
Vue.prototype.$Notice = Notice;
