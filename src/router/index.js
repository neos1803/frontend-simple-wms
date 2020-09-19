import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: "/signup",
    name: "Signup",
    component: () => import(/* webpackChunkName: "signup" */ '../views/Auth/Signup.vue')
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ '../views/Auth/Login.vue')
  },
  {
    path: "/",
    redirect: "/dashboard",
    name: "Home",
    meta: { requiresAuth: true } ,
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue' ),
    children: [
      {
        path: "dashboard",
        component: () => import(/* webpackChunkName: "dashboard" */ '../components/Content/DashboardContent.vue')
      },
      {
        path: "product/",
        name: "Product Table",
        redirect: { name: "All Product" },
        component: () => import(/* webpackChunkName: "product" */ '../components/Content/ProductContent.vue'),
        children: [
          {
            path: "all",
            name: "All Product",
            component: () => import(/* webpackChunkName: "all" */ '../components/Product/AllProduct.vue'),
          },
          {
            path: "in",
            name: "Product In",
            component: () => import(/* webpackChunkName: "in" */ '../components/Product/ProductIn.vue'),
          },
          {
            path: "out",
            name: "Product Out",
            component: () => import(/* webpackChunkName: "out" */ '../components/Product/ProductOut.vue'),
          },
        ]
      },
      {
        path: "product/:id",
        name: "Detail Product",
        component: () => import(/* webpackChunkName: "product" */ '../components/Content/DetailContent.vue')
      },
      {
        path: "user",
        name: "User Table",
        component: () => import(/* webpackChunkName: "user" */ '../components/Content/UserContent.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // if route if requiresAuth
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // if don't have token
    if (localStorage.getItem("token") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      // check by role
      // let user = JSON.parse(localStorage.getItem("user"));
      // if (to.matched.some((record) => record.meta.is_admin)) {
      //   if (user.role == "super_admin") {
      //     next();
      //   } else {
      //     alert("anda bukan super admin");
      //     localStorage.removeItem("user");
      //     localStorage.removeItem("token");
      //     next("/login");
      //   }
      // } else {
      //   next();
      // }
      next();
    }
  } else {
    next();
  }
});


export default router
