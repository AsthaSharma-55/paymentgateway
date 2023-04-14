import { createWebHistory,createRouter } from "vue-router";
import Somthing from './components/somthing.vue'
import Success from './components/Success.vue'
import Cancel from './components/Cancel.vue'
import UserLogins from './components/userLogins.vue'
import Login from './components/Login.vue'

const routes=[
    {
        name:'Somthing',
        path:'/',
        component:Somthing
    },
    {
        name:'Cancel',
        path:'/cancel',
        component:Cancel
    },
    {
        name:'Success',
        path:'/success',
        component:Success
    },{
        name:'UserLogins',
        path:'/user',
        component:UserLogins
    },
    {
        name:'Login',
        path:'/login',
        component:Login
    }
]

const router=createRouter({
    history:createWebHistory(),
    routes

})
export default router