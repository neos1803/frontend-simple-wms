<template>
    <div class="bg-white h-full">
        <modal-product-all />   
        <button class="rounded-lg border border-blue-300 mt-8  w-1/6 h-12 mr-8 float-right">
                Download All Activity Report
        </button>
        <div class="pt-32">
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
            <tbody>
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
                  <modal-product-out />
                </td>
              </tr>
            </tbody>
          </table>
          <nav class="flex float-right mr-32" aria-label="Page navigation example">
            <div v-for="i in product.totalPages" v-bind:key="i">
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
import ModalProductAll from "../Modal/ProductAll.vue"
import ModalProductIn from "../Modal/ProductIn.vue"
import ModalProductOut from "../Modal/ProductOut.vue"
import router from '../../router/index'

export default {
    name: "AllProduct",
    data() {
      return {
        // page: 1
      }
    },
    components : {
        ModalProductAll,
        ModalProductIn,
        ModalProductOut
    },
    created() {
      this.getAllProducts(this.$route.query.page)
    },
    computed: {
        ...mapState(["product"])
    },
    methods: {
      send(e) {
        console.log(e)
        router.go({ name: "Product Table", query: { page: e } })
      },
      del(e) {
        console.log(e)
        this.deleteProducts(e)
      },
      ...mapActions(["getAllProducts", "deleteProducts"])
    },
    watch: {
      '$route' (to, from) {
        if (from.query.page != to.query.page) {
          return this.getAllProducts(to.query.page)
        }
      }
    }
}
</script>