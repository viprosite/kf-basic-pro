import request from "./request"
export default {
    getTableData() {
        return request({
            url: '/home/getData',
            method: 'get',
            mock: true
        })
    },
    getUserData() {
        return request({
            url: '/user/getUserData',
            method: 'get',
            mock: false
        })
    },
    login(data) {
        return request({
            url: '/login',
            method: 'post',
            data,
            mock: true
        })
    }
}