import Vue from 'vue';
import Router from 'vue-router';
import Portal from "@/components/Portal.vue";
import Login from "@/components/Login.vue";
import Collections from "@/components/Collections.vue";
import ProfileSettings from "@/components/ProfileSettings.vue";

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/portal',
      component: Portal,
      children: [
        {path: '/', component: Collections},
        {path: 'profile', component: ProfileSettings}
      ]
    },
    {path: '/', component: Login}
  ],
});
