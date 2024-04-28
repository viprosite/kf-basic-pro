import Mock from "mockjs";

export default {
    login(params) {
        console.log(params);
        let body = JSON.parse(params.body)
        let menus = [
            {
                path: "/home",
                name: "home1",
                label: "首页",
                icon: "house",
                url: "home/Home",
            },
            {
                path: "/user",
                name: "user",
                label: "用户管理",
                icon: "user",
                url: "user/User",
            },
            {
                path: "/other",
                label: "其他",
                icon: "location",
                children: [
                    {
                        path: "/page1",
                        name: "page1",
                        label: "页面1",
                        icon: "setting",
                        url: "other/Page1",
                    },
                    {
                        path: "/page2",
                        name: "page2",
                        label: "页面2",
                        icon: "setting",
                        url: "other/Page2",
                    },
                ],
            },
        ]
        let role = 'admin'
        if (body.name != 'admin') {
            role = 'user'
            menus = [menus[0], menus[2]]
        }
        return {
            code: 200,
            data: {
                name: body.name,
                role,
                menus,
                token: Mock.Random.guid()
            }
        }
    }
}