export default {
  state: {
    notificationsList: [],
    prizesList: [],
    videosList: [],
    exercisesList: [],
  },
  getters: {
    getNotificationsList: (state) => state.notificationsList,
    getPrizesList: (state) => state.prizesList,
    getVideosList: (state) => state.videosList,
    getExercisesList: (state) => state.exercisesList,
  },
  mutations: {
    SET_NOTIFICATIONS_LIST(state, notifications) {
      state.notificationsList.push(notifications);
    },
    SET_PRIZES_LIST(state, prizes) {
      state.prizesList.push(prizes);
    },
    SET_VIDEOS_LIST(state, videos) {
      state.videosList = videos;
    },
    SET_EXERCISES_LIST(state, exercisess) {
      state.exercisesList = exercisess;
    },
  },
  actions: {
    addNotification({ commit }, newNotification) {
      commit("SET_NOTIFICATIONS_LIST", newNotification);
    },

    addPrize({ commit }, newPrize) {
      commit("SET_PRIZES_LIST", newPrize);
    },

    addVideo({ commit }, newVideo) {
      commit("SET_VIDEOS_LIST", newVideo);
    },

    addExercises({ commit }, newExercises) {
      commit("SET_EXERCISES_LIST", newExercises);
    },
  },
};
