import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import apiUrl from '../utils/request'
import axios from 'axios';
import qs from 'qs'

let state = {
    token: localStorage.getItem('token') || '',
    user: {},//解析token之后获取用户的信息
}

let getters = {
    isLoggedIn: state => !!state.token,
    userInfo: state => state.user,
}


//处理前段派发的action
let actions = {
    login({commit}, user) {
        return new Promise((resolve, reject) => {
            axios.post(apiUrl.userLogin, qs.stringify(user)).then((res) => {
                let token = res.data.data.token;
                window.localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = token;
                commit('auth_success', token, user)
                resolve(res);
            }).catch(err => {
                window.localStorage.removeItem('token')
                reject(err)
            })
        })
    },
    register({commit}, user) {
        return new Promise((resolve, reject) => {
            axios.post(apiUrl.userRegister, qs.stringify(user)).then((res) => {
                let token = res.data.data.token;
                window.localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = token;
                commit('auth_success', token, user)
                resolve(res);
            })
                .catch(err => {
                    localStorage.removeItem('token')
                    reject(err)
                })
        })
    },
    logout({commit}) {
        return new Promise((resolve, reject) => {
            commit('logout')
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
            resolve()
        })
    }
}

//改变state的状态信息
let mutations = {
    auth_success(state, newToken, newUser) {
        state.token = newToken
        state.user = newUser
    },
    logout(state) {
        state.user = ''
        state.token = ''
    },
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

