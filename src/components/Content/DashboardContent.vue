<template>
    <div class="w-5/6 px-24 py-24">
        <div class="container min-h-full">
            <div class="grid grid-rows-3 gap-y-3 mx-auto w-1/4 font-serf font-serif text-blue-600">
                <div class="h-32 bg-gray-200 mt-16">
                    <div class="my-8">
                        <h1>Total Product</h1>
                        <h3>{{product.totalItems}}</h3>
                    </div>
                </div>
                <div class="h-32 bg-gray-200 mt-16">
                    <div class="my-8">
                        <h1>Total Aktivitas Masuk</h1>
                        <h3>{{product_in.totalItems}}</h3>
                    </div>
                </div>
                <div class="h-32 bg-gray-200 mt-16">
                    <div class="my-8">
                        <h1>Total Aktivitas Keluar</h1>
                        <h3>{{product_out.totalItems}}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
    name: "DashboardContent",
    created() {
        this.getAllProductsIn()
        this.getAllProductsOut()
        this.getAllProducts()
    },
    computed: {
        ...mapState("products_out", ["product_out"]),
        ...mapState("products", ["product"]),
        ...mapState("products_in", ["product_in"])
    },
    methods: {
        ...mapActions("products_out", ["getAllProductsOut"]),
        ...mapActions("products", ["getAllProducts"]),
        ...mapActions("products_in", ["getAllProductsIn"])
    }
}
</script>