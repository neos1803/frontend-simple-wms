<template>
  <div class="mx-auto">
    <div class="w-full max-w-xs mx-auto mt-8">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="sendForm">
        <h1 class="text-gray-700 font-bold mt-4 mb-8 text-xl">Register</h1>
        <!-- Username -->
        <div class="mb-4">
          <label
            class="text-left block text-gray-700 text-base font-bold mb-2"
            for="username"
            >Username</label
          >
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="username"
            type="text"
          />
        </div>
        <!-- Password -->
        <div class="mb-4">
          <label
            class="text-left block text-gray-700 text-base font-bold mb-2"
            for="password"
            >Password</label
          >
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            v-model="password"
            type="password"
          />
        </div>
        <!-- Full Name -->
        <div class="mb-4">
          <label
            class="text-left block text-gray-700 text-base font-bold mb-2"
            for="username"
            >Full Name</label
          >
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="fullname"
            type="text"
          />
        </div>
        <!-- Phone Number -->
        <div class="mb-4">
          <label
            class="text-left block text-gray-700 text-base font-bold mb-2"
            for="username"
            >Phone Number</label
          >
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="phone"
            type="text"
          />
        </div>
        <!-- Email -->
        <div class="mb-6">
          <label
            class="text-left block text-gray-700 text-base font-bold mb-2"
            for="username"
            >Email</label
          >
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="email"
            type="email"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
        <div class="mt-4">
          <button type="reset" class="text-blue-500 font-bold">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
    name: "Signup",
    data() {
      return {
        username: "",
        password: "",
        phone: "",
        email: "",
        fullname: "",
      }
    },
    methods: {
      sendForm() {
        const payload = {
          username: this.username,
          password: this.password,
          full_name: this.fullname,
          phone_number: this.phone,
          email: this.email
        }
        this.signUp(payload)
      },
      ...mapActions(["signUp"])
    },
    computed: {
      
    }
}
</script>