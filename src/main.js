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

Vue.use(store);

new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
});