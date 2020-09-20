import Api from "./api"
import router from '../router/index'
import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        token: "",
        user_id: ""
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
          .catch((err) => {
            Vue.swal("Oops", err.response.data.message, 'error')
          });
        // console.log({ registerAction: data });
      },
      async signUp(_, payload) {
        Api.post("/auth/signup", JSON.stringify( { data: payload }))
          .then(() => {
            // const { data: { data } } = res
            Vue.swal("Success", "Berhasil Signup", 'success').then(() => router.push({ name: "Login" }))
          })
          .catch((err) => {
            Vue.swal("Oops", err.response.data.message, 'error')
          })
      },
      logOut({ commit }) {
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          commit("setToken", "")
          commit("setUserData", "")
          Vue.swal("Logout", "Anda telah logout", 'success').then(() => router.push({ name: "Login" }))
      }
    }
}