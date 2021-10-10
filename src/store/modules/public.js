

/**
 * 
 * @property {string} login_show  登录界面显示             
**/
const PUBLIC = {
    state: () => ({
        login_show: false,
    }),
    mutations: {
        loginShowFun(state, data) {
            state.login_show = data;
        },
    },
    actions: {

    },
    modules: {

    }
}

export default PUBLIC

