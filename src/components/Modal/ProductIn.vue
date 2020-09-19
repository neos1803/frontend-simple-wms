<template>
  <div>
    <button
      class="border border-blue-300 w-12"
      type="button"
      v-on:click="toggleModal()"
    >New</button>

    <div
      v-if="showModal"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <!-- a -->
      <div class="mx-auto">
        <div class="w-full max-w-xs mx-auto mt-8">
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="send">
            <h1 class="text-gray-700 font-bold mt-4 mb-8 text-xl">Check-In Product</h1>

            <!-- Stock -->
            <div class="mb-4">
              <label
                class="text-left block text-gray-700 text-base font-bold mb-2"
                for="stock"
              >Total</label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                v-model="total"
                type="text"
              />
            </div>

            <div class="flex items-center justify-between">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >Create</button>
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
  name: "ModalProductIn",
  components: {},
  props: ["id"],
  data() {
    return {
      showModal: false,
      total: 0,
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    send() {
      // console.log(this.id)
      const payload = {
        product_id: this.id,
        total: parseInt(this.total)
      }
      this.createProductsIn(payload)
    },
    ...mapActions(["createProductsIn"])
  },
};
</script>