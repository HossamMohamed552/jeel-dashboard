export default {
  state: {
    toast: {
      isVisible: false,
      message: "",
      type: "",
      time: 5000,
    },
  },
  getters: {
    toast: (state) => state.toast,
  },
  actions: {
    showToast({ commit }, payload) {
      commit("SHOW_TOAST", payload);
    },

    hideToast({ commit }, payload) {
      commit("HIDE_TOAST", payload);
    },
  },
  mutations: {
    SHOW_TOAST(state, notification) {
      state.toast = { ...notification, isVisible: true };
    },
    HIDE_TOAST(state) {
      state.toast = { isVisible: false, message: "" };
    },
  },
};
