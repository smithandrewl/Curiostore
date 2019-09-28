import Vue from 'vue';
import Router from 'vue-router';
import Portal from "@/components/Portal.vue";
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path: '/', component: Portal}
  ],
});
