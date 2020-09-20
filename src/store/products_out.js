import Api from "./api"
import router from '../router/index'
import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        product_out: ""
    },
    mutations: {
        setProductOutData(state, payload) {
            console.log(payload)
            state.product_out = payload
        },
    },
    actions: {
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
        async createProductsOut(_, payload) {
            Api.post("/out/", JSON.stringify({ data: payload }), {
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
        async deleteProductsOut(_, payload) {
            // console.log(commit)
            Api.delete('out/' + payload, {
              headers: {
                // 'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${localStorage.getItem("token")}`
              }
            })
              .then(() => {
                Vue.swal("OK", "Datanya berhasil dihapus :)", 'success').then(() => router.go({ name: "Product Out", query: { page: 1 } }))
              })
              .catch((err) => {
                console.log(err)
              })
          },
    }
}