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
  theme: {
    themes: {
      light: {
        primary: "#ef7b45"
      },
      dark: {
        primary: "#ef7b45"
      }
    }
  },
  icons: {
    iconfont: 'mdi',
  },
});
