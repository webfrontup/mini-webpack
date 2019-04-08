import axios from './ajax';
import api from './api';

function getGameNotice(data) {
    return axios.post(api.GET_GAME_NOTICE, data).then(res => {
        return res.data
    })
}
function getGameType(data) {
    return axios.post(api.GET_GAME_TYPE, data).then(res => {
        return res.data
    })
}
function getGameNoticeDetail(data) {
	return axios.post(api.GET_GAMENOTICE_DETAIL, data).then(res => {
		return res.data;
	});
}
function getSysNotice(data) {
    return axios.post(api.GET_SYS_NOTICE, data).then(res => {
			return res.data;
		});
}
function getSysNoticeDetail(data) {
	return axios.post(api.GET_SYS_NOTICE_DETAIL, data).then(res => {
		return res.data;
	});
}






export {
    getGameNotice, getGameType, getGameNoticeDetail, getSysNotice, getSysNoticeDetail
};