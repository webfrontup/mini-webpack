import axios from './ajax';
import api from './api';


function getCarouse() {
    return axios.post(api.BANNER).then(res => {
        return res.data
    })
}

function getAnnouncement(type) {
    let data = {
        position: type
    }
    return axios.post(api.ANNOUNCEMENT, data).then(res => {
        return res.data
    })
}

function getGameList() {
    return axios.post(api.INDEX_GAME_LIST).then(res => {
        return res.data
    })
}

function getImgUrl() {
    return axios.post(api.INDEX_GAME_IMG_URL).then(res => {
        return res.data
    })
}

function getGameType() {
    return axios.post(api.INDEX_GAME_TYPE).then(res => {
        return res.data
    })
}

function getDzGameList(data) {
    return axios.post(api.INDEX_DZ_GAME_LIST, data).then(res => {
        return res.data
    })
}

function getAnimation() {
    return axios.post(api.INDEX_ANIMATION).then(res => {
        return res.data
    })
}

function recovery() {
    return axios.post(api.INDEX_RECOVERY).then(res => {
        return res.data
    })
}

function getRedStyle() {
    return axios.post(api.INDEX_GET_RED_STYLE).then(res => {
        return res.data
    })
}

function openRed(data) {
    return axios.post(api.INDEX_OPEN_RED, data).then(res => {
        return res.data
    })
}

function getPopMsg() {
    return axios.post(api.INDEX_POP_MSG).then(res => {
        return res.data
    })
}
export {
    getCarouse,
    getAnnouncement,
    getGameList,
    getImgUrl,
    getGameType,
    getDzGameList,
    getAnimation,
    recovery,
    getRedStyle,
    openRed,
    getPopMsg
}