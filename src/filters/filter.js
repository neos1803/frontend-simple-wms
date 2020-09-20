import Vue from "vue"

// Vue.filter("price-filter", (data) => {
//     `Rp ${data.toLocaleString("in")}`
//     console.log(`Rp ${data.toLocaleString("in")}`)
// })

Vue.filter("price-filter", (data) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(data))
Vue.filter("date-filter", (data) => `${new Date(data).getDate()} - ${new Date(data).getMonth()} - ${new Date(data).getFullYear()}`)