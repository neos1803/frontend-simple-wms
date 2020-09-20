<template>
    <div class="w-5/6 px-24 py-24">
        <loading :active.sync="isLoading" 
        :can-cancel="false" 
        :is-full-page="isFull" />
        <div class="container min-h-full">
            <div class="grid grid-rows-2 grid-cols-2 mx-auto w-full font-serf font-serif text-blue-600">
                <div class="h-32 w-1/2 bg-gray-200 mt-16 mx-auto">
                    <div class="my-8">
                        <h1>Total Product</h1>
                        <h3>{{product.totalItems}}</h3>
                    </div>
                </div>
                <div class="h-32 w-1/2 bg-gray-200 mt-16 mx-auto">
                    <div class="my-8">
                        <h1>Total Aktivitas Masuk</h1>
                        <h3>{{product_in.totalItems}}</h3>
                    </div>
                </div>
                <div class="h-32 w-1/2 bg-gray-200 mt-16 mx-auto">
                    <div class="my-8">
                        <h1>Total Aktivitas Keluar</h1>
                        <h3>{{product_out.totalItems}}</h3>
                    </div>
                </div>
                <div class="h-32 w-1/2 bg-gray-200 mt-16 mx-auto">
                    <div class="my-8">
                        <h1>Total Admin</h1>
                        <h3>{{user.totalItems}}</h3>
                    </div>
                </div>
            </div>
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
    name: "DashboardContent",
    data() {
        return {
            isLoading: true,
            isFull: true,
        }
    },
    components: {
        Loading
    },
    created() {
        this.getAll()
            .then(() => this.isLoading = false)
    },
    computed: {
        ...mapState("products_out", ["product_out"]),
        ...mapState("products", ["product"]),
        ...mapState("products_in", ["product_in"]),
        ...mapState("users", ["user"])
    },
    methods: {
        async getAll() {
            await this.getAllProductsIn()
            await this.getAllProductsOut()
            await this.getAllProducts()
            await this.getUsers()
        },
        ...mapActions("products_out", ["getAllProductsOut"]),
        ...mapActions("products", ["getAllProducts"]),
        ...mapActions("products_in", ["getAllProductsIn"]),
        ...mapActions("users", ["getUsers"])
    }
}
</script>