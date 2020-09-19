import Vue from 'vue'
import Vuex from 'vuex'
// import Api from './api'
// import router from '../router/index'
import VuexPersist from "vuex-persist"
import products from './products'
import products_in from './products_in'
import products_out from './products_out'
import auth from './auth'
import users from './users'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    token: "",
    user_id: "",
  },
  mutations: {
    
  },
  actions: {
    
  },
  modules: {
    products,
    products_in,
    products_out,
    auth,
    users
  },
  plugins: [vuexPersist.plugin]
})
