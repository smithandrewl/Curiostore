import Vue from 'vue';
import Router from 'vue-router';
import Portal from "@/components/Portal.vue";
import Login from "@/components/Login.vue";
import HelloWorld from "@/components/HelloWorld.vue";
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/portal',
      component: Portal,
      children: [
        {
          path: 'hello',
          component: HelloWorld
        }
      ]
    },
    {path: '/', component: Login}
  ],
});
