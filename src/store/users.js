import Api from "./api"
import router from '../router/index'
import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        user: ""
    },
    mutations: {
        setUser(state, payload) {
            // console.log(payload)
            state.user = payload
        },
    },
    actions: {
        async getUsers({ commit }, payload) {
            let result = ""
            const page = payload ? payload : 1
            Api.get(`/user/?limit=10&page=${page}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
            })
            .then((res) => {
                const { data: { data } } = res
                result = data
                commit("setUser", data)
                // console.log(data.totalItems)
            })
            // console.log(result.response)
            return result
        },
        async deleteUsers(_, payload) {
            // console.log(commit)
            Api.delete('user/' + payload, {
              headers: {
                // 'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${localStorage.getItem("token")}`
              }
            })
              .then(() => {
                Vue.swal("OK", "Usernya berhasil dihapus :)", 'success').then(() => router.go({ name: "User Table", query: { page: 1 } }))
              })
              .catch((err) => {
                console.log(err)
              })
          },
    }
}