import Api from "./api"
// import router from '../router/index'

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
    }
}