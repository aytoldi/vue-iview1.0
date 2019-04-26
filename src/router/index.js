import Vue from 'vue';
import VueRouter from 'vue-router'
import store from '../vuex/index'

Vue.use(VueRouter);
import Page from './page'

let User = [
    {path: "/home", component: Page.PageList},
    {path: "/home/innerEdit", component: Page.InnerEdit},
    {path: "/home/rowEdit", component: Page.RowEdit},
    {path: "/home/rowAdd", component: Page.RowAdd},
    {path: "/home/rowLink", component: Page.RowLink},
    {path: "/home/linkAdd", component: Page.LinkAdd},
    {path: "/home/rowLink/LinkEdit", component: Page.LinkEdit},
    {path: "/home/rowLink/linkWatch", component: Page.LinkWatch}
];

let Cart = [
    {path: "/home/cart", component: Page.Cart},
    {path: "/home/todo", component: Page.TODO},
    {path: "/home/resultCart", component: Page.ResultCart}
]

let routes = [
    {
        path: '/home',
        component: Page.Home,
        meta: {
            state: false//登录后才可以访问
        },
        children: [
            ...User,
            ...Cart
        ]
    },
    {
        path: '/login',
        component: Page.Login,
        meta: {
            state: true//不需要登录
        }
    },
    {
        path: '/',
        redirect: '/home',
        meta: {
            state: false
        }
    },
    {
        path: '*',
        name: '/404',
        component: Page.Err
    }
]

let _router = new VueRouter({
    routes
});

_router.beforeEach((to, from, next) => {

    if (!to.meta.state) { //meta:{state:false}
        if (store.getters.isLoggedIn) { //如果用户已经登录了，可以进行下一个页面
            next();
        } else { // 没有登录，跳到/login页面
            next('/login');
        }
    } else {
        next();// meta:{state:''}
    }
    //进不去login
    if (store.state.token && to.fullPath === '/login') {
        next('/home');
    }
})

export default _router;