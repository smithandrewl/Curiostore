import Vue from 'vue';
import Vuex from 'vuex';

import {auth } from '@/store/modules/auth';
import { collections } from '@/store/modules/collections';
import { items } from '@/store/modules/items';
import { errors } from '@/store/modules/errors';

Vue.use(Vuex);

interface ProfileSettings {
  name: string;
}

interface Collection {
  name: string
  coverPhoto: string
}


export default new Vuex.Store({
  state: {
    profile: <ProfileSettings>{
      name: 'Ful L. Name',
    },
  },
  mutations: {

  },
  actions: {

  },
  modules: {
    auth,
    collections,
    items,
    errors
  }
});
