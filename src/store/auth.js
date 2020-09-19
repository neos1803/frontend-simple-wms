import Api from "./api"
import router from '../router/index'

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
    }
}