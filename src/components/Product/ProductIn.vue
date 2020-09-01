<template>
    <div class="bg-white h-full">
        <button class="rounded-lg border border-blue-300 mt-8  w-1/6 h-12 mr-8 float-right">
                Download Report Product In
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
              <tr v-for="(p, index) in product_in.data" :key="index">
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
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
    name: "ProductIn",
    components: {
        // ModalProductIn
    },
    created() {
        this.getAllProductsIn()
    },
    computed: {
        ...mapState(["product_in"])
    },
    methods: {
        ...mapActions(["getAllProductsIn"])
    }
}
</script>