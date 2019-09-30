import Vue from 'vue';
import Vuetify, {
  VBtn,
  VTextField,
  VIcon,
  VAppBar,
} from 'vuetify/lib';

Vue.use(Vuetify, {
  components: {
    VBtn,
    VTextField,
    VIcon,
    VAppBar
  }
});

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
});
