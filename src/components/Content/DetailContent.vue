<template>
    <div class="w-5/6 px-24 py-24">
        <loading :active.sync="isLoading" 
        :can-cancel="false" 
        :is-full-page="isFull">
        </loading>
        <form v-if="isLoading == false" class="flex border h-full" @submit.prevent="update">
            <div class="w-2/6 ml-64 my-auto">
                <img class="w-full h-full border-4 border-white" v-bind:src="photo_url">
                <!-- <input class="mt-4" type="file" name="" ref="file" id="" @change="onSelect" /> -->
            </div>
            <div class="w-4/6 my-auto">
                <div class="w-1/2 ml-32 grid grid-rows-6 gap-4 mt-16">
                    <div class="">
                        <label class="inline-block text-white text-base font-bold mb-2 mr-4">Name</label>
                        <input v-model="name" class="text-center shadow appearance-none border border-red-500 rounded py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <div class="">
                        <label class="inline-block text-white text-base font-bold mb-2 mr-4">Price</label>
                        <input v-model="price" class="text-center shadow appearance-none border border-red-500 rounded py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <div class="">
                        <label class="inline-block text-white text-base font-bold mb-2 mr-4">Stock</label>
                        <p class="inline text-left bg-white border border-red-500 rounded py-2 px-20 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
                            {{detail.stock}}
                        </p>
                    </div>
                    <div class="">
                        <label class="inline-block text-white text-base font-bold mb-2 mr-2">Supplier</label>
                        <p class="inline text-left bg-white border border-red-500 rounded py-2 px-16 text-gray-700 mb-3 mr-2 leading-tight focus:outline-none focus:shadow-outline">
                            {{detail.supplier.username}}
                        </p>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <button type="submit" class="border border-white text-white w-auto">Update Data</button>
                        <button v-on:click="remove" type="button" class="border border-white text-white w-auto">Delete Data</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex"
// import Api from "../../store/api.js"
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    name: "DetailContent",
    data() {
        return {
            id: 0,
            name: "",
            price: 0,
            photo_url: "",
            photo: null,
            isLoading: true,
            isFull: false,
        }
    },
    components: {
        Loading
    },
    created() {
        this.getById(this.$route.params.id)
            .then(() => {
                this.name = this.detail.name
                this.price = this.detail.price
                this.stock = this.detail.stock
                this.photo_url = this.detail.photo_url
                this.id = this.detail.id
                this.isLoading = false
                // console.log(this.detail)
            })
    },
    computed: {
        ...mapState("products", ["detail"])
    },
    methods: {
        onSelect() {
            this.data.photo = this.$refs.file.files[0]
            console.log(this.data.photo)
        },
        update() {
            const payload = {
                id: this.id,
                data: {
                    name: this.name,
                    price: this.price,
                }
            }
            // formData.append('name', this.name)
            // formData.append('stock', this.stock)
            // formData.append('price', this.price)
            // formData.append('photo', this.photo)
            // const payload = {
            //     id: this.id,
            //     data: formData
            // }
            console.log(payload)
            this.updateProducts(payload)
        },
        remove() {
            this.$swal("Sure?", "Delete this product?", 'question')
                .then(() => this.deleteProducts(this.id))
            // this.$router.push({ name: "Product Table" })
        },
        ...mapActions("products", ["updateProducts", "deleteProducts", "getById"])
    },
}
</script>