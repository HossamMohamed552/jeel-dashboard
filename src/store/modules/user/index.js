import router from "@/router";
import VueCookies from "vue-cookies";
export default {
  state: {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    token: VueCookies.get('token') || null
  },
  getters: {
    user: (state) => state.user,
    token: (state) => state.token
  },
  actions: {
    setUser({ commit }, payload) {
      commit("SET_USER", payload.user);
      commit("SET_TOKEN", payload.token);
      localStorage.setItem("user", JSON.stringify(payload.user));
      router.push("/dashboard/home");
    },

    updateUser({ commit }, payload) {
      commit("SET_USER", payload);
      localStorage.setItem("user", JSON.stringify(payload));
    },

    removeUser({ commit }) {
      commit("REMOVE_USER");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN: (state, token) => {
      state.token = token
      VueCookies.set("token", token)
    },
    REMOVE_USER(state) {
      state.user = null;
      state.token = null
      VueCookies.remove("token")
    },
  },
};
