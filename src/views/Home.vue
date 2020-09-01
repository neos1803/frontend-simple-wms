<template>
  <div class="home flex">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <side-bar />
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapState } from "vuex"
import SideBar from "../components/SideBar.vue"
// import Content from "../components/Content.vue"

export default {
  name: 'Home',
  components: {
    // HelloWorld
    SideBar,
    // Content
  },
  computed: {
      ...mapState(["token", "user_id"])
  },
  created() {
    //   console.log(this.token)
    // console.log(this.user_id)
    console.log(localStorage.getItem("user"))
  }
}
</script>
