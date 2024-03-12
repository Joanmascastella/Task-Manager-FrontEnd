import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from "@/store/auth";

import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/register.vue';
import AdminDashboard from '../components/Dashboard/admindashboard.vue';
import UserDashboard from '../components/Dashboard/userdashboard.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/admin-dashboard', component: AdminDashboard },
    { path: '/user-dashboard', component: UserDashboard },
  ]
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  authStore.checkUser();

  next();
});

export default router;
