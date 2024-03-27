export default {
  state: {
    classId: null
  },
  getters:{
    classFromDetailId (state){
      return state.classId
    }
  },
  mutations: {
      SET_CLASS_ID(state, id) {
      state.classId = id;
    },
  },
};
