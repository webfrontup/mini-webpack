'use strict'

import axios from 'axios';
import Vue from 'vue';
import router from '../router';
const vue = new Vue({
    router
});

axios.interceptors.request.use(config => {
    config.baseURL = "/app/api/v2";//配合proxy代理使用
    config.timeout = 60 * 1000; // Timeout
    return config
}, error => {
    return Promise.reject(error)
});

axios.interceptors.response.use(response => {
    let code = response.data.code;
    if (code === 71001) {
        // vue.$router.push({ name: 'login' });
    }
    return response;
}, error => {
    return Promise.resolve(error.response)
});


export default {
    post(url, data) {
        let TOKEN = sessionStorage.getItem("token");
        return axios({
            method: 'post',
            url,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json;charset=utf-8;',
                'data':'3&4.0.1&black&xxhdpi&zh&aaa_a&53496937f5bc02807d3934ac9fcf5ac9',
                'platfrom':'wap',
                'sid': TOKEN
            },
            data: JSON.stringify(data),
        }).then(response => {
            return response;
        }).catch(err => {
            console.log(err);
        })
    }
}