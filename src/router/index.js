import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from "@/store/auth";

import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/register.vue';
import UserDashboard from '../components/Dashboard/userdashboard.vue';
import ShareTask from '../components/Share/ShareTask.vue';
import ListDashboard from '../components/List/ListDashboard.vue';
import ShareList from '../components/Share/ShareList.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/user-dashboard', component: UserDashboard },
    { path: '/share/task/:taskId', component: ShareTask }, 
    { path: '/share/list/:listId', component: ShareList }, 
    { path: '/list-dashboard' , component: ListDashboard}, 
  ]
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  authStore.checkUser();

  next();
});

export default router;
