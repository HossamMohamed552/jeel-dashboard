export default {
  state: {
    questions: [],
  },
  getters: {
    getQuestionsList: (state) => state.questions,
  },
  mutations: {
    SET_QUESTIONS(state, payload) {
      state.questions = payload;
    },
    SET_CHANGE_QUESTION(state, payload) {
      let index = state.questions.findIndex((question) => question.id === payload.id);
      state.questions[index] = payload.question;
    },
  },
  actions: {
    addQuestions({ commit }, Questions) {
      commit("SET_QUESTIONS", Questions);
    },
    changeQuestionByID({ commit }, newQuestion) {
      commit("SET_CHANGE_QUESTION", newQuestion);
    },
  },
};
