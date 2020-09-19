import Api from "./api"
import router from '../router/index'

export default {
    namespaced: true,
    state:  {
        product: "",
    },
    mutations: {
        setProductData(state, payload) {
            // console.log(payload)
            state.product = payload
        },
    },
    actions: {
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
    }
}