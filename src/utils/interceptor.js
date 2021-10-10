
import store from '../store/index'


uni.addInterceptor('request', {
    invoke(args) {

        // console.log('token', store.state.user.token)
        // console.log('userId', store.state.user.userId)

        args.header = {
            tokenType: 2,
            token: store.state.user.token,
            userId: store.state.user.userId,
        }

        if (args.method == 'GET') {
            uni.showLoading({
                title: "加载中",
            });
        }
        else if (args.method == 'POST') {
            uni.showLoading({
                title: "发送中",
            });
        }
        // console.log(args)
    },
    success(args) {
        // console.log(args)
        uni.hideLoading();
        if (args.data.status !== 200) {
            switch (args.data.message) {
                case '没有Token信息':
                    uni.showToast({
                        icon: "none",
                        title: '未登录',
                    });
                    break;
                default:
                    uni.showToast({
                        icon: "none",
                        title: args.data.message,
                    });
                    break;
            }
        }
    },
    fail(err) {
        // console.log('interceptor-fail', err)
        uni.showToast({
            icon: "none",
            title: err,
        });
    },
    complete(res) {
        // console.log('interceptor-complete', res)
    }
})
uni.addInterceptor('navigateTo', {
    invoke(args) {
        // console.log(args)
        // console.log('token', store.state.user.token)
        // console.log('userId', store.state.user.userId)

        if (store.state.user.token == '') {
            store.commit("loginShowFun", true);
            return false;
        }
        // return true;
    },
    success(args) {
        // console.log(args)

    },
    fail(err) {
        // console.log('interceptor-fail', err)
    },
    complete(res) {
        // console.log('interceptor-complete', res)
    }
})
