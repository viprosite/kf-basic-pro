export default {
    getUserList: params => {
        // xxx
        return {
            code: 200,
            data: {
                list: [{
                    date: "2016-05-03",
                    name: "Tom",
                    address: "No. 189, Grove St, Los Angeles",
                }],
                count: 1
            }
        }
    }
}