
var public_component = {
    data() {
        return {
        }
    },
    onLoad() {

    },
    methods: {
        jumpRouter(name, data) { //路由跳转

            if (data == undefined) {
                uni.navigateTo({
                    url: `${name}`
                });
            } else {
                let datas = JSON.stringify(data)
                uni.navigateTo({
                    url: `${name}?data=${datas}`
                });
            }

        },
        jumpRouter_detection(name, data) { //路由跳转
            if (data == undefined) {
                uni.navigateTo({
                    url: `${name}`
                });
            } else {
                let datas = JSON.stringify(data)
                uni.navigateTo({
                    url: `${name}?data=${datas}`
                });
            }
        },
        jumpRouter_redirect(name, data) { //关闭当前页面路由跳转

            if (data == undefined) {
                uni.redirectTo({
                    url: `${name}`
                });
            } else {
                let datas = JSON.stringify(data)
                uni.redirectTo({
                    url: `${name}?data=${datas}`
                });
            }

        },
        jumpRouter_reLaunch(name, data) { //关闭所有页面路由跳转
            if (data == undefined) {
                uni.reLaunch({
                    url: `${name}`
                });
            } else {
                let datas = JSON.stringify(data)
                uni.reLaunch({
                    url: `${name}?data=${datas}`
                });
            }
        },
        back(data) {
            uni.navigateBack({
                delta: data
            });
        },
    }


}
export default public_component;



