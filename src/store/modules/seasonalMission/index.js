export default {
  state: {
    notificationsList: [],
    prizesList: [],
    videosList: [],
    exercisesList: [],
    learningpaths: [],
  },
  getters: {
    getNotificationsList: (state) => state.notificationsList,
    getPrizesList: (state) => state.prizesList,
    getVideosList: (state) => state.videosList,
    getExercisesList: (state) => state.exercisesList,
    getLearningPaths: (state) => state.learningpaths,
  },
  mutations: {
    SET_NOTIFICATIONS_LIST(state, notifications) {
      state.notificationsList.push(notifications);
    },
    SET_NOTIFICATIONS(state, notifications) {
      state.notificationsList = notifications;
    },
    SET_PRIZES_LIST(state, prizes) {
      state.prizesList.push(prizes);
    },
    SET_PRIZES(state, prizes) {
      state.prizesList = prizes;
    },
    SET_PRIZE_IN_EDIT_MISSION(state, prize) {
      state.prizesList = prize;
    },
    SET_LEARNING_PATH(state, paths) {
      state.learningpaths = paths;
    },
    SET_VIDEOS_LIST(state, videos) {
      state.videosList = videos;
    },
    SET_VIDEOS_ARRAY(state, list) {
      state.videosList[list.index] = list.videos;
    },
    SET_EXERCISES_LIST(state, exercisess) {
      state.exercisesList = exercisess;
    },
    SET_EXERCISES_ARRAY(state, list) {
      state.exercisesList[list.index] = list.exercisess;
    },
  },
  actions: {
    addNotification({ commit }, newNotification) {
      commit("SET_NOTIFICATIONS_LIST", newNotification);
    },
    addNotificationById({ commit }, newNotification) {
      commit("SET_NOTIFICATIONS", newNotification);
    },
    addLearningPath({ commit }, paths) {
      commit("SET_LEARNING_PATH", paths);
    },

    addPrize({ commit }, newPrize) {
      commit("SET_PRIZES_LIST", newPrize);
    },
    addPrizeById({ commit }, newPrize) {
      commit("SET_PRIZES", newPrize);
    },

    handlePrizeInEditMission({commit}, prize) {
      commit("SET_PRIZE_IN_EDIT_MISSION", prize);
    },

    addVideo({ commit }, newVideo) {
      commit("SET_VIDEOS_LIST", newVideo);
    },
    addVideoesInArray({ commit }, list) {
      commit("SET_VIDEOS_ARRAY", list);
    },
    addExercisesInArray({ commit }, list) {
      commit("SET_EXERCISES_ARRAY", list);
    },

    addExercises({ commit }, newExercises) {
      commit("SET_EXERCISES_LIST", newExercises);
    },
  },
};
