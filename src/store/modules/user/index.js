import router from "@/router";
import VueCookies from "vue-cookies";

export default {
  state: {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    token: VueCookies.get('token') || null,
    currentChild: localStorage.getItem("currentChild") ? JSON.parse(localStorage.getItem("currentChild")) : null,
  },
  getters: {
    user: (state) => state.user,
    currentChild: (state) => state.currentChild,
    token: (state) => state.token
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
      state.currentChild = null
      VueCookies.remove("token")
    },
    SET_CHILD(state, currentChild) {
      state.currentChild = currentChild
    }
  },
  actions: {
    setUser({commit}, payload) {
      commit("SET_USER", payload.user);
      commit("SET_TOKEN", payload.token);
      localStorage.setItem("user", JSON.stringify(payload.user));
      router.push("/dashboard/home");
    },

    updateUser({commit}, payload) {
      commit("SET_USER", payload);
      localStorage.setItem("user", JSON.stringify(payload));
    },

    removeUser({commit}) {
      commit("REMOVE_USER");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/LoginAdmin");
    },
    setChild({commit}, payload) {
      commit("SET_CHILD", payload)
      localStorage.setItem("currentChild", JSON.stringify(payload));
      router.push('/dashboard/home')
    }
  },
};
