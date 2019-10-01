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
        coverPhoto: 'https://www.publicdomainpictures.net/pictures/210000/nahled/mixture-of-fossils.jpg',
      },
    ],
  },
  mutations: {

  },
  actions: {

  },
});
