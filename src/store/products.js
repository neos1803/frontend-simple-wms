import Api from "./api"
import router from '../router/index'
import Vue from 'vue'

export default {
    namespaced: true,
    state:  {
        product: "",
        detail: ""
    },
    mutations: {
        setProductData(state, payload) {
            // console.log(payload)
            state.product = payload
        },
        setDetail(state, payload) {
            state.detail = payload
            // console.log(payload)
        }
    },
    actions: {
        // Products
    async getAllProducts({ commit }, payload) {
        const page = payload ? payload : 1
        // let pass = ""
        await Api.get(`/product/?limit=10&page=${page}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        })
          .then((res) => {
            const { data: { data } } = res
            // console.log(data.currentPage)
            commit("setProductData", data)
            // pass = this.state.product
            // console.log(data)
          })
        return false
      },
      async getById({ commit }, payload) {
        console.log("Getting")
        try {
            await Api.get("product/" + payload, {
                headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then((res) => {
                const { data : { data } } = res
                commit("setDetail", data)
                // console.log(data.name)
            })
            .catch((err) => {
                throw new Error(err)
            })
        } catch(error) {
            // console.log(error)
            router.push({ name: "All Product", query: { page: 1 }})
            Vue.swal("Oops", "Datanya gak ada", 'error')
        }
    },
      async createProducts(_, payload) {
        try {
            await Api.post("/product/", payload, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
              })
                .then(() => {
                    Vue.swal("OK", "Datanya berhasil ditambah :)", 'success').then(() => router.go({ name: "All Product", query: { page: 1 } }))
                })
                .catch((err) => {
                  throw new Error(err.response.data.message)
                });
        } catch (error) {
            Vue.swal("Oops", `${error}`, 'error')
        }
      },
      async updateProducts(_, payload) {
        // console.log(commit)
        Api.put('product/' + payload.id, payload.data, {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })
          .then(() => {
            Vue.swal("OK", "Datanya berhasil diupdate :)", 'success').then(() => router.push({ name: "All Product", query: { page: 1 } }))
          })
          .catch((err) => {
            console.log(err)
          })
      },
      async deleteProducts(_, payload) {
        // console.log(commit)
        await Api.delete('product/' + payload, {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })
          .then(() => {
            Vue.swal("OK", "Datanya berhasil dihapus :)", 'success').then(() => router.push({ name: "All Product", query: { page: 1 } }))
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
}