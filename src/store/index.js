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
    detail: "",
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
      // console.log(payload)
      state.product = payload
    },
    // setDetail(state, payload) {
    //   state.detail = payload
    //   console.log(state.detail)
    // }
  },
  actions: {
    // Autentikasi
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
    async signUp({ commit }, payload) {
      Api.post("/auth/signup", JSON.stringify( { data: payload }))
        .then((res) => {
          const { data: { data } } = res
          console.log(commit)
          console.log(data)
          router.push({ name: "Login" })
        })
        .catch((err) => {
          console.log({ error: err.message })
        })
    },
    // ProductsIn
    async getAllProductsIn({ commit }, payload) {
      const page = payload ? payload : 1
      Api.get(`/in/?limit=10&page=${page}`, {
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
    async createProductsIn(_, payload) {
      console.log(payload)
      Api.post("/in/", JSON.stringify({ data: payload }), {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then((res) => {
          console.log(res)
          router.push({ name: "Product Table" })
        })
        .catch((errr) => {
          console.log(errr.message);
        });
    },
    // ProducstOut
    async getAllProductsOut({ commit }, payload) {
      Api.get(`/out/?limit=10&page=${payload}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then((res) => {
          const { data: { data } } = res
          commit("setProductOutData", data)
        })
    },
    // Products
    async getAllProducts({ commit }, payload) {
      const page = payload ? payload : 1
      Api.get(`/product/?limit=10&page=${page}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then((res) => {
          const { data: { data } } = res
          // console.log(data.currentPage)
          commit("setProductData", data)
        })
    },
    async createProducts({ commit }, payload) {
      console.log(commit)
      console.log(payload)
      Api.post("/product/", payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then((res) => {
          console.log(res)
          router.go({ path: "product" })
        })
        .catch((errr) => {
          console.log({ error: errr.message });
        });
    },
    async updateProducts(_, payload) {
      // console.log(commit)
      Api.put('product/' + payload.id, payload.data, {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then((res) => {
          console.log(res)
          router.push({ name: "Product Table" })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async deleteProducts(_, payload) {
      // console.log(commit)
      Api.delete('product/' + payload, {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then((res) => {
          console.log(res)
          router.go({ name: "Product Table" })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  modules: {
  },
  plugins: [vuexPersist.plugin]
})
