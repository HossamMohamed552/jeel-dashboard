export default {
  state: {
    teacherId: null
  },
  getters:{
    teacherId (state){
      return state.teacherId
    }
  },
  mutations: {
    SET_TEACHER_ID(state, id) {
      state.teacherId = id;
    },
  },
};
