import Vue from 'vue'
import Vuex from 'vuex'
import Api from './api'
import router from '../router/index'
import VuexPersist from "vuex-persist"

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    token: "",
    user_id: "",
    product: "",
    product_out: "",
    product_in: ""
  },
  mutations: {
    setToken(state, payload) {
      console.log(payload)
      state.token = payload
    },
    setUserData(state, payload) {
      console.log(payload)
      state.user_id = payload
    },
    setProductInData(state, payload) {
      console.log(payload)
      state.product_in = payload
    },
    setProductOutData(state, payload) {
      console.log(payload)
      state.product_out = payload
    },
    setProductData(state, payload) {
      console.log(payload)
      state.product = payload
    }
  },
  actions: {
    async logIn({ commit }, payload) {
      Api.post("/auth/login", JSON.stringify({ data: payload }))
        .then((res) => {
          const { data: { data } } = res
          commit("setToken", data.token)
          commit("setUserData", data.id)
          console.log(data.id)
          localStorage.setItem( "token", data.token )
          localStorage.setItem( "user", data.id )
          router.push({ name: "Home" })
        })
        .catch((errr) => {
          console.log({ errr: errr.message });
        });
      // console.log({ registerAction: data });
    },
    async getAllProductsIn({ commit }) {
      Api.get("/in/", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then((res) => {
          const { data: { data } } = res
          commit("setProductInData", data)
          // console.log(data.totalItems)
        })
    },
    async createProductsIn(payload) {
      console.log(payload)
      Api.post("/in/", JSON.stringify({ data: payload }), {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then((res) => {
          console.log(res)
        })
        .catch((errr) => {
          console.log(errr.message);
        });
    },
    async getAllProductsOut({ commit }) {
      Api.get("/out/", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then((res) => {
          const { data: { data } } = res
          commit("setProductOutData", data)
        })
    },
    async getAllProducts({ commit }) {
      Api.get("/product/", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then((res) => {
          const { data: { data } } = res
          commit("setProductData", data)
        })
    },
    async createProducts(payload) {
      console.log(payload)
      Api.post("product/", { data:payload }, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then((res) => {
          console.log(res)
        })
        .catch((errr) => {
          console.log(errr.message);
        });
    },
  },
  modules: {
  },
  plugins: [vuexPersist.plugin]
})
