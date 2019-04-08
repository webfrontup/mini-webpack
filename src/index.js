import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload'
import "@nutui/nutui/dist/styles/index.scss";
import "@/components/scss/skin.scss";
import "@/components/scss/common.scss";

Vue.use(VueLazyload, {
    error: require('./assets/img/error_img.png'),
    loading: require('./assets/img/icon_loadingimage.gif')
  })

import NutUI from '@nutui/nutui';
import '@nutui/nutui/dist/nutui.scss';
NutUI.install(Vue);


//复制
import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard);
import './assets/js/flexible';
import './assets/js/verify';


import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)
//二维码
import VueQriously from 'vue-qriously';
Vue.use(VueQriously);

//过滤器
import * as filters from './filter';
Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) //注册过滤器
Vue.prototype.filterDate = filters.filterDate; //时间过滤方法
Vue.prototype.filterTimeType = filters.filterTimeType;
Vue.prototype.filterAmount = filters.filterAmount; //数字金额大写中文转换
Vue.prototype.ModalHelper = filters.ModalHelper;
Vue.prototype.HTML_FONT_SIZE = parseInt(document.documentElement.style.fontSize);

import $ from 'jquery';
Vue.prototype.$ = $;
Vue.config.productionTip = false;

//路由拦截用户是否登录
router.beforeEach((to, from, next) => {
    next() //正常跳转到设置好的页面     
})


//----
let title = localStorage.getItem('nodeTitle') || "";
document.title = title;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')