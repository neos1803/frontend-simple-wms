<template>
    <div class="h-full">
        <loading :active.sync="isLoading" 
        :can-cancel="false" 
        :is-full-page="true" />
        <button class="rounded-lg border border-white mt-8 text-white mt-8  w-1/6 h-12 mr-8 float-right">
                Download Report Product Out
        </button>
        <div class="pt-32">
            <table class="table mx-auto w-2/3">
            <thead class="bg-gray-200">
              <tr>
                <th class="px-4 py-2">No</th>
                <th class="px-4 py-2">Product Name</th>
                <th class="px-4 py-2">Date</th>
                <th class="px-4 py-2">Total</th>
                <th class="px-4 py-2">Update</th>
                <th class="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody v-if="isLoading == false" class="bg-white">
              <tr v-for="(p, index) in product_out.data" :key="index">
                <td class="px-4 py-2">{{ index + 1 }}</td>
                <td class="px-4 py-2">{{ p.Product.name }}</td>
                <td class="px-4 py-2">{{ p.date }}</td>
                <td class="px-4 py-2">{{ p.total }}</td>
                <td class="px-4 py-2">
                  <button class="border border-blue-300 w-12">+</button>
                </td>
                <td class="px-4 py-2">
                  <button v-on:click="del(p.id)" class="border border-blue-300 w-12">-</button>
                </td>
              </tr>
            </tbody>
          </table>
          <nav class="mx-auto text-white mt-4" aria-label="Page navigation example">
            <div class="inline-block" v-for="i in product_out.totalPages" v-bind:key="i">
              <router-link type="button" class="mr-4 border border-white w-8" :to="{ name: `Product Table`, query: { page: i }}" replace >
                {{ i }}
              </router-link>
              <!-- <button v-on:click="send(i)" type="button" class="page-link"> {{i}} </button> -->
            </div>
          </nav>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex"
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    name: "ProductOut",
    data() {
      return {
        isLoading: true
      }
    },
    created() {
        this.getAllProductsOut(this.$route.query.page).then(() => this.isLoading = false)
    },
    components: {
      Loading
    },
    computed: {
        ...mapState("products_out", ["product_out"])
    },
    methods: {
      del(e) {
        this.$swal("Sure?", "Delete this product?", 'question')
          .then(() => this.deleteProductsOut(e))
      },
      ...mapActions("products_out", ["getAllProductsOut", "deleteProductsOut"])
    },
    watch: {
      '$route' (to, from) {
        if (from.query.page != to.query.page) {
          return this.$router.go(to.query.page)
        }
      }
    }
}
</script>