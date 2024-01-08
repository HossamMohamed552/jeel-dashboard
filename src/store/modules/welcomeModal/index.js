// store/modal.js

const state = {
    showModal: false,
  };
  
  const mutations = {
    setShowModal(state, payload) {
      state.showModal = payload;
    },
  };
  
  const actions = {
    show({ commit }) {
      commit('setShowModal', true);
    },
    hide({ commit }) {
      commit('setShowModal', false);
    },
  };
  
  const getters = {
    isModalVisible: (state) => state.showModal,
  };
  
  export default {
    state,
    mutations,
    actions,
    getters,
  };
  