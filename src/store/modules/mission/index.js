export default {
  state: {
    learnPathsVideoPaperWokQuizStored: {},
    storedData: false,
  },
  getters: {
    learnPathsVideoPaperWokQuizStored: (state) => state.learnPathsVideoPaperWokQuizStored,
    storedData: (state) => state.storedData
  },
  mutations: {
    SET_MISSION_STEP_ONE(state, payload) {
      state.learnPathsVideoPaperWokQuizStored = payload[0]
      state.storedData = payload[1]
    }
  }
}
