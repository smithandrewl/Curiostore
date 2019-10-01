import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#28A745',
        secondary: '#FFFFFF',
        accent: '#032E0D',
        error: '#DC3545',
        info: '#007BFF',
        success: '#28A745',
        warning: '#FFC107'
      }
    }
  },
  icons: {
    iconfont: 'mdi',
  },

});
