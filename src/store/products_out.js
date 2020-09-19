import Api from "./api"
// import router from '../router/index'

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
    }
}