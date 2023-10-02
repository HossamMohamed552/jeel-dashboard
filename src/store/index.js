import Vue from "vue";
import Vuex from "vuex";
import toast from "./modules/toast";
import user from "./modules/user";
import welcomeModal from './modules/welcomeModal';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    toast,
    welcomeModal
  },
});
