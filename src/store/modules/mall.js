export default {
    state: () => ({
        buys: {},
        addr: {}
    }),
    getters: {
        getBuys: state => state.buys,
        getAddr: state => state.addr,
    },
    mutations: {
        setBuys(state, data) {
            state.buys = data;
        },
        setAddr(state, data) {
            state.addr = data;
        },
    }
}