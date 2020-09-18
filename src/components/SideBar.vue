<template>
    <div class="w-1/6 bg-white min-h-screen font-serif">
        <h1 class="mt-8 text-blue-500 text-2xl mx-auto">Admin Panel</h1>
        <img class="h-32 w-32 rounded-full border-4 border-white mt-8 mx-auto" src="../assets/4.jpg" >
        <div class="my-24 grid grid-rows-3 gap-y-1">
            <router-link  to="/" class="bg-blue-300 h-16">
                <button class="my-4">Dashboard</button>
            </router-link>
            <router-link :to="{ name: `Product Table`, query: { page: 1 } }" class="bg-blue-300 h-16">
                <button class="my-4">Product</button>
            </router-link>
            <router-link to="/user" class="bg-blue-300 h-16">
                <button class="my-4">User</button>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "SideBar"
}
</script>