import Vue from 'vue';
import Vuetify, {
  VBtn,
  VTextField
} from 'vuetify/lib';

Vue.use(Vuetify, {
  components: {
    VBtn,
    VTextField
  }
});

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
});
