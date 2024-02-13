import Vue from "vue";
import Vuex from "vuex";
import toast from "./modules/toast";
import user from "./modules/user";
import teacher from "./modules/teacher";
import welcomeModal from './modules/welcomeModal';
import seasonalMission from "./modules/seasonalMission";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    toast,
    teacher,
    welcomeModal,
    seasonalMission,
  },
});
