<template>
    <div class="w-5/6 px-24 py-24">
        <loading :active.sync="isLoading" 
        :can-cancel="false" 
        :is-full-page="true" />
        <div class="h-full">
            <!-- <modal-product-all />    -->
        <button class="rounded-lg border border-white mt-8 text-white w-1/6 h-12 mr-8 float-right">
                Download All Activity Report
        </button>
        <div v-if="isLoading == false" class="pt-32">
            <table class="table mx-auto w-2/3">
            <thead class="bg-gray-200">
              <tr>
                <th class="px-4 py-2">No</th>
                <th class="px-4 py-2">Username</th>
                <th class="px-4 py-2">Fullname</th>
                <th class="px-4 py-2">Phone Number</th>
                <th class="px-4 py-2">Email</th>
                <th class="px-4 py-2">Delete</th>
                <!-- <th class="px-4 py-2">Check-In Product</th> -->
                <!-- <th class="px-4 py-2">Check-Out Product</th> -->
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr v-for="(p, index) in user.data" :key="index">
                <td class="px-4 py-2">{{index + 1}}</td>
                <td class="px-4 py-2">{{ p.username }}</td>
                <td class="px-4 py-2">{{ p.full_name }}</td>
                <td class="px-4 py-2">{{ p.phone_number }}</td>
                <td class="px-4 py-2">{{ p.email }}</td>
                <td class="px-4 py-2">
                  <button v-on:click="del(p.id)" type="button" class="border border-blue-300 w-12">-</button>
                </td>
                <!-- <td class="px-4 py-2">
                  <modal-product-in :id="p.id" />
                </td>
                <td class="px-4 py-2">
                  <modal-product-out />
                </td> -->
              </tr>
            </tbody>
          </table>
          <nav class="mx-auto text-white mt-4" aria-label="Page navigation example">
            <div class="inline-block" v-for="i in user.totalPages" v-bind:key="i">
              <router-link type="button" class="mr-4 border border-white w-8" :to="{ name: `User Table`, query: { page: i }}" replace >
                {{i}}
              </router-link>
              <!-- <button v-on:click="send(i)" type="button" class="page-link"> {{i}} </button> -->
            </div>
          </nav>  
        </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex"
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    name: "UserContent",
    data() {
        return {
            data: "",
            isLoading: true
        }
    },
    created() {
        this.getUsers(this.$route.query.page).then(() => this.isLoading = false)
    },
    components: {
        Loading
    },
    computed: {
        ...mapState("users", ["user"])
    },
    methods: {
        del(e) {
            this.$swal("Sure?", "Delete this user?", 'question')
                .then(() => this.deleteUsers(e))
        },
        ...mapActions("users", ["getUsers", "deleteUsers"])
    },
    watch: {
        '$route' (to, from) {
            if (from.query.page != to.query.page) {
                // return this.getUsers(to.query.page)
                return this.$router.go({ name: "User Table", query: { page: to.query.page }})
            }
        }
    }
}
</script>