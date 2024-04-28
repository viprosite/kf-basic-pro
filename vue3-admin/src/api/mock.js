import Mock from "mockjs";
import homeApi from './mockData/home'
import userApi from './mockData/user'
import loginApi from './mockData/login'
// 拦截请求
Mock.mock('/mock/api/home/getData', homeApi.getHomeData)
Mock.mock(/user\/getUser/, 'get', userApi.getUserList)  // 正则匹配url
Mock.mock('/mock/api/login', 'post', loginApi.login)