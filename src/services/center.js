import axios from './ajax';
import api from './api';

//获取更多页面列表
function getMorelists(){
    return axios.post(api.MORELIST).then(res => {
        return res.data
    })
}

//获取更多页面列表详细页面内容
function getMorepage(data){
    return axios.post(api.MORELISTINFO,data).then(res => {
        return res.data
    })
}
///contact/more/article
function getMorearticle(data){
    return axios.post(api.MOREARTICLE,data).then(res => {
        return res.data
    })
}
//自助优惠申请
function getSelflist(){
    return axios.post(api.SELFHELPLIST).then(res => {
        return res.data
    })
}
function getSelfInfo(){
    return axios.post(api.SELFHELPINFO).then(res => {
        return res.data
    })
}
function getSelfCode(){
    return axios.post(api.CAPTCHA_CODE).then(res => {
        return res.data
    })
}
function getSelfApply(data){
    return axios.post(api.SELFHELPAPPLY,data).then(res => {
        return res.data
    })
}

//自助返水 查询
function getBackwaterInfo(){
    return axios.post(api.BACKWATERINFO).then(res => {
        return res.data
    })
}
//领取
function getBackwaterReceive(){
    return axios.post(api.BACKWATERRECEIVE).then(res => {
        return res.data
    })
}
//自助反水记录
function getBackwaterList(data){
    return axios.post(api.BACKWATERLIST,data).then(res => {
        return res.data
    })
}
//联系我们
function getContactus(){
    return axios.post(api.MORECONTACTUS).then(res => {
        return res.data
    })
}


export {
    getMorelists,
    getMorepage,
    getMorearticle,
    getSelflist,
    getSelfInfo,
    getSelfCode,
    getSelfApply,
    getBackwaterInfo,
    getBackwaterReceive,
    getBackwaterList,
    getContactus
}