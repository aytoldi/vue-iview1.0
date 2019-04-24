import Vue from "vue";
import App from "./App.vue";
import router from './router'
import store from './vuex/index.js' //必须小写
import axios from './utils/http';
import setRequest from './utils/request'
import './iviewComponent'

Vue.prototype.$http = axios;//原型上配置axios
Vue.prototype.$apiUrl= setRequest;//原型上配置基本url
import "./static/css/common/index.css"
// 引入echarts
import ECharts from 'vue-echarts' // refers to components/ECharts.vue in webpack

// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
// register component to use
Vue.component('Chart', ECharts)

Vue.use(store);

new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
});