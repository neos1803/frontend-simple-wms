<template>
  <div class="mx-auto">
    <div class="w-full max-w-xs mx-auto mt-8">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit="checkForm">
        <h1 class="text-gray-700 font-bold mt-4 mb-8 text-xl">Login</h1>
        <!-- Login -->
        <div class="mb-4">
          <label
            class="text-left block text-gray-700 text-base font-bold mb-2"
            for="username"
            >Username</label
          >
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            v-model="username"
          />
        </div>
        <!-- Password -->
        <div class="mb-6">
          <label
            class="text-left block text-gray-700 text-base font-bold mb-2"
            for="password"
            >Password</label
          >
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            v-model="password"
          />
          <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
        </div>
        <div class="flex items-center justify-between">
          <!-- <router-link to="/dashboard" class="w-full"> -->
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          <!-- </router-link> -->
        </div>
        <div class="mt-4">
          <p class="text-left inline-block">Belum punya akun?</p>
          <router-link to="/signup" class="text-blue-500 pl-2 font-bold"
            >Register</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
    name: "Login",
    data() {
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        checkForm(e) {
            const payload = {
                username: this.username,
                password: this.password
            }
            this.logIn(payload)
            e.preventDefault();
        },
        ...mapActions("auth", ["logIn"])
    }
}
</script>