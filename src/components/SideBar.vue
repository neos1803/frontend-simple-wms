<template>
    <div class="w-1/6 min-h-screen font-serif">
        <h1 class="mt-8 text-white text-2xl mx-auto">Admin Panel</h1>
        <img class="h-48 w-48 rounded-full border-4 border-white mt-8 mx-auto" src="../assets/4.jpg" >
        <div class="my-8 grid grid-rows-4 gap-y-1">
            <router-link  to="/" class="border-4 border-white">
                <button class="my-4 text-white">Dashboard</button>
            </router-link>
            <router-link :to="{ name: `Product Table`, query: { page: 1 } }" class="border-4 border-white">
                <button class="my-4 text-white">Product</button>
            </router-link>
            <router-link to="/user" class="border-4 border-white">
                <button class="my-4 text-white">User</button>
            </router-link>
            <button v-on:click="logout" type="button" class="text-white border-4 border-white">Logout</button>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: "SideBar",
    methods: {
        logout() {
            this.logOut()
        },
        ...mapActions("auth", ["logOut"])
    }
}
</script>