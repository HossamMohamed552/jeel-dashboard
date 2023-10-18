import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./plugins/i18n"
import "./plugins";
import "./helpers/formValidation";
import ApiService from "./api/ApiService";
import dayjs from 'dayjs';
Vue.config.productionTip = false;
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
new Vue({
  router,
  store,
  i18n,
  dayjs,
  render: (h) => h(App),
}).$mount("#app");

Vue.mixin({
  methods: { ApiService },
});
