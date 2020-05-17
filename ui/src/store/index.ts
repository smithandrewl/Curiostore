import Vue from 'vue';
import Vuex from 'vuex';
import {auth } from '@/store/modules/auth';
import { collections } from '@/store/modules/collections';
import { items } from '@/store/modules/items';

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
    collections: [
      <Collection>{
        name: 'Fossils',
        coverPhoto: 'https://www.publicdomainpictures.net/pictures/210000/nahled/mixture-of-fossils.jpg',
      },
      <Collection>{
        name: 'Insects',
        coverPhoto: 'https://farm4.staticflickr.com/3895/14754739466_9d2b66014c_b.jpg'
      },
      <Collection>{
        name: 'Paintings',
        coverPhoto: 'https://media.defense.gov/2016/Oct/21/2001656977/780/780/0/160908-F-FU646-0005.JPG'
      }
    ],
  },
  mutations: {

  },
  actions: {

  },
  modules: {
    auth,
    collection: collections,
    items
  }
});
