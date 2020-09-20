import Api from "./api"
import router from '../router/index'
import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        product_in: ""
    },
    mutations: {
        setProductInData(state, payload) {
            console.log(payload)
            state.product_in = payload
          },
    },
    actions: {
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
          .then(() => {
            Vue.swal("OK", "Datanya berhasil ditambah :)", 'success').then(() => router.push({ name: "Product In", query: { page: 1 } }))
          })
          .catch((errr) => {
            console.log(errr.message);
          });
      },
      async deleteProductsIn(_, payload) {
        // console.log(commit)
        Api.delete('in/' + payload, {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })
          .then(() => {
            Vue.swal("OK", "Datanya berhasil dihapus :)", 'success').then(() => router.go({ name: "Product In", query: { page: 1 } }))
          })
          .catch((err) => {
            console.log(err)
          })
      },
    },
}