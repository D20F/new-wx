import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);


/**
 * 
 * @property {object}    PUBLIC               公共信息    
 * @property {object}    USER                 用户     
**/
import PUBLIC from './modules/public'
import USER from './modules/user'
import mall from './modules/mall'



const store = new Vuex.Store({
    modules: {
        public: PUBLIC,
        user: USER,
        mall
    }
})

export default store