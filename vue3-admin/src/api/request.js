import axios from "axios";
import config from "../config";
import { ElMessage } from "element-plus";

const NETWORK_ERROR = '网络异常'


const service = axios.create({
    baseURL: config.baseApi,
})


// 请求前
service.interceptors.request.use(req => {
    //自定义header
    return req
})


service.interceptors.response.use(res => {
    // console.log(res);
    let { code, data, msg } = res.data
    if (code == 200) return data
    else {
        // 错误提示
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
    }
})

function request(opts) {
    opts.method = opts.method || 'get'
    if (opts.method.toLowerCase() == 'get') {
        opts.params = opts.data
    }
    // mock处理
    let isMock = config.mock
    if (typeof opts.mock != 'undefined') {
        isMock = opts.mock
    }
    if (config.env == 'prod') {
        service.defaults.baseURL = config.baseApi
    } else {
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }
    return service(opts)
}

export default request