<template>
    <div class="w-5/6 px-24 py-24">
        <div class="grid grid-cols-3 gap-x-1 w-1/4 font-serif text-sm">
            <button class="border border-blue-300 bg-white rounded-sm" @click="setView('AllProduct')">
                All
            </button>
            <button class="border border-blue-300 bg-white rounded-sm" @click="setView('ProductIn')">
                In
            </button>
            <button class="border border-blue-300 bg-white rounded-sm" @click="setView('ProductOut')">
                Out
            </button>
        </div>
        <component v-bind:is="currentView" />
    </div>
</template>

<script>
// import NavLink from "../NavLink.vue"
import AllProduct from "../Product/AllProduct.vue"
import ProductIn from "../Product/ProductIn.vue"
import ProductOut from "../Product/ProductOut.vue"

export default {
    name: "DashboardContent",
    components: {
        // NavLink
        AllProduct,
        ProductIn,
        ProductOut
    },
    data() {
        return {
            currentView: "AllProduct"
        }
    },
    methods: {
        setView(e) {
            this.currentView = e
        }
    }
}
</script>