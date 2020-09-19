import Api from "./api"
import router from '../router/index'

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
    },
      async createProducts(_, payload) {
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
        await Api.delete('product/' + payload, {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })
          .then((res) => {
            console.log(res)
            router.push({ name: "Product Table" }).catch(() => {})
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
}