interface CollectionsState {
  collections: Collection[]
}

interface Collection {
  name: string
  coverPhoto: string
}

const InitialState = <CollectionsState> {
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
  ]
};

export const collections = {
  namespaced: true,
  state: () => InitialState,
  getters: {
    getCollections(state: CollectionsState) {
      return state.collections;
    }
  },
  actions: {

  },
  mutations: {

  },

}
