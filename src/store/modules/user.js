

/**
 * 
 * @property {string}  account         账号名
 * @property {string}  nickName        昵称
 * @property {string}  avatar          头像                 
 * @property {string}  openId          openId                 
 * @property {string}  token           token                 
 * @property {string}  userId          userId                 
**/
const PUBLIC = {
    state: () => ({
        account: '昵称',
        nickName: '',
        avatar: 'http://res.yitonginfo.com/xzwj/my/avatar.png',
        openId: '',
        token: '',
        userId: '',
    }),
    mutations: {
        accountFun(state, data) {
            state.account = data;
        },
        nickNameFun(state, data) {
            state.nickName = data;
        },
        avatarFun(state, data) {
            state.avatar = data;
        },
        openIdFun(state, data) {
            state.openId = data;
        },
        tokenFun(state, data) {
            state.token = data;
        },
        userIdFun(state, data) {
            state.userId = data;
        },
    },
    actions: {

    },
    modules: {

    }
}

export default PUBLIC

