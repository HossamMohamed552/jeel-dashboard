export default {
  state: {
    toast: {
      isVisible: false,
      message: "",
      type: "",
      time: 3000,
    },
  },
  getters: {
    toast: (state) => state.toast,
  },
  actions: {
    showToast({ commit }, payload) {
      console.log('fire toast')
      commit("SHOW_TOAST", payload);
    },

    hideToast({ commit }, payload) {
      commit("HIDE_TOAST", payload);
    },
  },
  mutations: {
    SHOW_TOAST(state, notification) {
      state.toast = { ...notification, isVisible: true };
      setTimeout(
        () => {
          state.toast = { isVisible: false };
        },
        notification.time ? notification.time : 3000
      );
    },
    HIDE_TOAST(state) {
      state.toast = { isVisible: false, message: "" };
    },
  },
};
