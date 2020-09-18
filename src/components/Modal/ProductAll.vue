<template>
  <div>
    <button
      class="rounded-lg border border-blue-300 mt-8 w-1/6 h-12 ml-8 float-left"
      type="button"
      v-on:click="toggleModal()"
    >Add New Product</button>

    <div
      v-if="showModal"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <!-- a -->
      <div class="mx-auto">
        <div class="w-full max-w-xs mx-auto mt-8">
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="newData">
            <h1 class="text-gray-700 font-bold mt-4 mb-8 text-xl">Add Product</h1>

            <!-- Product Name -->
            <div class="mb-4">
              <label
                class="text-left block text-gray-700 text-base font-bold mb-2"
                for="productname"   
              >Product Name</label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="productname"
                type="text"
                v-model="data.product_name"
              />
            </div>

            <!-- Stock -->
            <div class="mb-4">
              <label
                class="text-left block text-gray-700 text-base font-bold mb-2"
                for="stock"
              >Stock</label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="stock"
                type="text"
                v-model="data.stock"
              />
            </div>

            <!-- Price -->
            <div class="mb-4">
              <label
                class="text-left block text-gray-700 text-base font-bold mb-2"
                for="price"
              >Price</label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="text"
                v-model="data.price"
              />
            </div>

            <!-- Photo -->
            <div class="mb-4">
              <label
                class="text-left block text-gray-700 text-base font-bold mb-2"
                for="photo"
              >Photo</label>
              <input type="file" name="" ref="file" id="" @change="onSelect">
            </div>

            <div class="flex items-center justify-between">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >Add</button>
            </div>
            <div class="mt-4">
              <button
                class="text-blue-500 text-center font-bold"
                style="transition: all .15s ease"
                v-on:click="toggleModal()"
              >Cancel</button>
            </div>
          </form>
        </div>
      </div>
      <!-- b -->
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
  name: "ModalProductAll",
  components: {},
  data() {
    return {
      showModal: false,
      data: {
        product_name: "",
        photo: null,
        stock: 0,
        price: 0
      }
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    onSelect() {
        this.data.photo = this.$refs.file.files[0]
        console.log(this.data.photo)
    },
    newData() {
        const formData=  new FormData()
        console.log(this.data.product_name)
        console.log(this.data.stock)
        console.log(this.data.price)
        formData.append('name', this.data.product_name)
        formData.append('stock', this.data.stock)
        formData.append('price', this.data.price)
        formData.append('photo', this.data.photo)
        // const payload = {
        //     body: {
        //         name: this.product_name,
        //         stock: this.stock,
        //         price: this.price
        //     },
        //     files: {
        //         photo: this.photo.file
        //     }
        // }
        this.createProducts(formData)
    },
    ...mapActions(["createProducts"])
  },
};
</script>