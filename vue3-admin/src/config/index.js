// 环境配置文件：
// 开发
// 测试
// 线上

const env = import.meta.env.MODE || 'prod'
console.log(env);
const EnvConfig = {
    development: {
        baseApi: '/api',
        mockApi: '/mock/api',
    },
    test: {
        baseApi: '/test.com/api',
        mockApi: '/mock-test/api',
    },
    prod: {
        baseApi: '/future.com/api',
        mockApi: '/mock-prod/api',
    },
}

export default {
    env,
    mock: true,  // mock总开关
    ...EnvConfig[env]
}