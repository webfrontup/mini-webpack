import axios from "./ajax";
import api from "./api";

//修改登陆密码
function modifyLoginPwd(data) {
    return axios.post(api.MODIFY_LOGINPWD, data).then(res => {
        return res.data;
    });
}
//修改取款密码
function modifyWithdrawlPwd(data) {
    return axios.post(api.UPD_WITHDRAWLPWD, data).then(res => {
        return res.data;
    });
}
//添加银行卡
function addBankCard(data) {
    return axios.post(api.SUB_BANKCARD, data).then(res => {
        return res.data;
    });
}
//会员银行卡列表
function memBankList(data) {
    return axios.post(api.MEM_BANK_LIST, data).then(res => {
        return res.data;
    });
}

export {
    modifyLoginPwd,
    addBankCard,
    modifyWithdrawlPwd,
    memBankList
};