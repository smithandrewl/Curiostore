import Vue from 'vue';
import Vuex from 'vuex';

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
        coverPhoto: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
      },
    ],
  },
  mutations: {

  },
  actions: {

  },
});
