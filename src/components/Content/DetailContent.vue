<template>
    <div class="w-5/6 px-24 py-24">
        <form class="flex bg-white h-full" @submit.prevent="update">
            <div class="w-2/6 ml-64 my-auto">
                <img class="w-full h-full" v-bind:src="photo_url">
                <input class="mt-4" type="file" name="" ref="file" id="" @change="onSelect" />
            </div>
            <div class="w-4/6 my-auto">
                <div class="w-1/2 ml-32 grid grid-rows-4 gap-4">
                    <input v-model="name" class="shadow appearance-none border border-red-500 rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
                    <input v-model="price" class="shadow appearance-none border border-red-500 rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
                    <input v-model="stock" class="shadow appearance-none border border-red-500 rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
                    <div class="grid grid-cols-2 gap-3">
                        <button type="submit" class="border border-blue-300 w-auto">Update Data</button>
                        <button @click="remove" class="border border-blue-300 w-auto">Delete Data</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions } from "vuex"
import Api from "../../store/api.js"

export default {
    name: "DetailContent",
    data() {
        return {
            // name: this.$store.state.detail.name,
            // price: this.$store.state.detail.price,
            // stock: this.$store.state.detail.stock,
            // photo: null
            id: 0,
            name: "",
            price: 0,
            stock: 0,
            photo_url: "",
            photo: null
        }
    },
    components: {
        
    },
    async created() {
        await this.getById(this.$route.params.id)
    },
    // updated() {
    //     this.assign()
    // },
    // computed: {
    //     ...mapState(["detail"])
    // },
    methods: {
        onSelect() {
            this.data.photo = this.$refs.file.files[0]
            console.log(this.data.photo)
        },
        getById(payload) {
            console.log("Getting")
            Api.get("product/" + payload, {
                headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then((res) => {
                const { data : { data } } = res
                // commit("setDetail", data)
                // console.log(data.name)
                this.id = data.id
                this.name = data.name
                this.photo_url = data.photo_url
                this.price = data.price
                this.stock = data.stock
            })
        },
        // assign() {
        //     this.name = this.detail.name
        //     console.log(this.name)
        // }, 
        update() {
            const payload = {
                id: this.id,
                data: {
                    name: this.name,
                    price: this.price,
                    stock: this.stock
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

        },
        ...mapActions(["updateProducts"])
    },
}
</script>