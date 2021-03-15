import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import Delivery from '../views/Delivery.vue'
import AddingProduct from '../components/AddingProduct.vue'
import ProductsVuew from "../views/ProductsVuew.vue"
import AdminDashbord from '../components/AdminDashbord.vue'
import CategoryAndFamily from '../components/CategoryAndFamily.vue'
import CartVuew from "../views/CartVuew.vue"
import store from '../store/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/admin/adding_new',
    name: 'AddingProduct',
    component: AddingProduct,
    beforeEnter: (to, from, next)=>{
      if(store.getters.auth.isAuth==false){
        next({path: '/admin'})
      }else{
        next()
      }
    }
  },
  {
    path: '/admin/editor/:id', 
    name: 'Editor',
    component: AddingProduct, 
    props: true,
    beforeEnter: (to, from, next)=>{
      if(store.getters.auth.isAuth==false){
        next({path: '/admin'})
      }else{
        next()
      }
    }
  },
  {
    path: '/admin/categoryAndFamily', 
    name: 'CategoryAndFamily',
    component: CategoryAndFamily, 
    props: true,
    beforeEnter: (to, from, next)=>{
      if(store.getters.auth.isAuth==false){
        next({path: '/admin'})
      }else{
        next()
      }
    }
  },
  {
    path: '/admin/orders', 
    name: 'AdminDashbord',
    component: AdminDashbord, 
    props: true,
    beforeEnter: (to, from, next)=>{
      if(store.getters.auth.isAuth==false){
        next({path: '/admin'})
      }else{
        next()
      }
    }
  },
  {
    path: '/products',
    name: 'ProductsVuew',
    component: ProductsVuew
  },
  {
    path: '/delivery',
    name: 'Delivery',
    component: Delivery
  },
  {
    path: '/cart',
    name: 'CartVuew',
    component: CartVuew
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
