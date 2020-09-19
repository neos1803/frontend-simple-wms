<template>
    <div class="bg-white h-full">
        <button class="rounded-lg border border-blue-300 mt-8  w-1/6 h-12 mr-8 float-right">
                Download Report Product Out
        </button>
        <div class="pt-32">
            <table class="table mx-auto w-2/3">
            <thead class="bg-gray-200">
              <tr>
                <th class="px-4 py-2">No</th>
                <th class="px-4 py-2">Id</th>
                <th class="px-4 py-2">Product Name</th>
                <th class="px-4 py-2">Date</th>
                <th class="px-4 py-2">Total</th>
                <th class="px-4 py-2">Update</th>
                <th class="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(p, index) in product_out.data" :key="index">
                <td class="px-4 py-2">{{ index + 1 }}</td>
                <td class="px-4 py-2">{{ p.id }}</td>
                <td class="px-4 py-2">{{ p.Product.name }}</td>
                <td class="px-4 py-2">{{ p.date }}</td>
                <td class="px-4 py-2">{{ p.total }}</td>
                <td class="px-4 py-2">
                  <button class="border border-blue-300 w-12">+</button>
                </td>
                <td class="px-4 py-2">
                  <button class="border border-blue-300 w-12">-</button>
                </td>
              </tr>
            </tbody>
          </table>
           <nav class="flex float-right mr-32" aria-label="Page navigation example">
            <div v-for="i in product_out.totalPages" v-bind:key="i">
              <router-link :to="{ name: `Product Table`, query: { page: i }}" replace >
                <button type="button" class="page-link"> {{i}} </button>
              </router-link>
              <!-- <button v-on:click="send(i)" type="button" class="page-link"> {{i}} </button> -->
            </div>
          </nav>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
    name: "ProductOut",
    created() {
        this.getAllProductsOut()
    },
    computed: {
        ...mapState("products_out", ["product_out"])
    },
    methods: {
        ...mapActions("products_out", ["getAllProductsOut"])
    },
    watch: {
      '$route' (to, from) {
        if (from.query.page != to.query.page) {
          return this.getAllProductsOut(to.query.page)
        }
      }
    }
}
</script>