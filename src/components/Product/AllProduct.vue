<template>
    <div class="h-full">
        <loading :active.sync="isLoading" 
        :can-cancel="false" 
        :is-full-page="isFull"></loading>
        <modal-product-all />   
        <button v-on:click="print()" class="rounded-lg border border-white mt-8 text-white w-1/6 h-12 mr-8 float-right">
                Download All Activity Report
        </button>
        <div v-if="isLoading == false" class="pt-32">
            <table class="table mx-auto w-2/3">
            <thead class="bg-gray-200">
              <tr>
                <th class="px-4 py-2">No</th>
                <th class="px-4 py-2">Product Name</th>
                <th class="px-4 py-2">Stock</th>
                <th class="px-4 py-2">Price</th>
                <th class="px-4 py-2">Update</th>
                <th class="px-4 py-2">Delete</th>
                <th class="px-4 py-2">Check-In Product</th>
                <th class="px-4 py-2">Check-Out Product</th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr v-for="(p, index) in product.data" :key="index">
                <td class="px-4 py-2">{{index + 1}}</td>
                <td class="px-4 py-2">{{ p.name }}</td>
                <td class="px-4 py-2">{{ p.stock }}</td>
                <td class="px-4 py-2">{{ p.price }}</td>
                <td class="px-4 py-2">
                  <router-link :to="{ name: `Detail Product`, params: { id: p.id } }">
                    <button class="border border-blue-300 w-12">+</button>
                  </router-link>
                </td>
                <td class="px-4 py-2">
                  <button v-on:click="del(p.id)" type="button" class="border border-blue-300 w-12">-</button>
                </td>
                <td class="px-4 py-2">
                  <modal-product-in :id="p.id" />
                </td>
                <td class="px-4 py-2">
                  <modal-product-out :id="p.id" />
                </td>
              </tr>
            </tbody>
          </table>
          <nav class="mx-auto text-white mt-4" aria-label="Page navigation example">
            <div class="inline-block" v-for="i in product.totalPages" v-bind:key="i">
              <router-link type="button" class="mr-4 border border-white w-8" :to="{ name: `Product Table`, query: { page: i }}" replace >
                {{i}}
              </router-link>
              <!-- <button v-on:click="send(i)" type="button" class="page-link"> {{i}} </button> -->
            </div>
          </nav>  
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex"
import ModalProductAll from "../Modal/ProductAll.vue"
import ModalProductIn from "../Modal/ProductIn.vue"
import ModalProductOut from "../Modal/ProductOut.vue"
import router from '../../router/index'
import Api from '../../store/api'
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    name: "AllProduct",
    data() {
      return {
        // page: 1,
        isLoading: true,
        isFull: true
      }
    },
    components : {
        ModalProductAll,
        ModalProductIn,
        ModalProductOut,
        Loading
    },
    created() {
      console.log(this.isLoading)
      this.getAllProducts(this.$route.query.page)
        .then(() => {
          this.isLoading = false
        })
    },
    computed: {
        ...mapState("products", ["product"]),
    },
    methods: {
      send(e) {
        console.log(e)
        router.go({ name: "Product Table", query: { page: e } })
      },
      del(e) {
        this.$swal("Sure?", "Delete this product?", 'question')
          .then(() => this.deleteProducts(e))
      },
      print() {
        Api.get('print?type=all', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        })
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      ...mapActions("products", ["getAllProducts", "deleteProducts"])
    },
    watch: {
      '$route' (to, from) {
        if (from.query.page != to.query.page) {
          // return this.getAllProducts(to.query.page)
          return this.$router.go({ name: "Product Table", query: { page: to.query.page } })
        }
      }
    }
}
</script>