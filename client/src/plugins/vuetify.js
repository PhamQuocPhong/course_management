import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

Vue.use(Vuetify);

export default new Vuetify({
	icons: {
    iconfont: "mdi" // 'md' || 'mdi' || 'fa' || 'fa4'
	  },
	  theme: {
	    dark: false,
	    themes: {
	      light: {
	        primary: colors.blue.darken4, // #E53935
	        secondary: colors.red.lighten4, // #FFCDD2
	        accent: colors.indigo.base, // #3F51B5
	        pink: colors.pink,
	        error: {
	          base: colors.red.darken1,
	          darken4: colors.red.darken4
	        }
	      },
	      dark: {
	        pink: colors.pink,
	        primary: colors.blue.darken4,
	      }
	    },
	  }
});
