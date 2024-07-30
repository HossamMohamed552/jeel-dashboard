export default {
  state: {
    missionStepOne:{}
  },
  getters:{
    getMissionStepOne:(state)=> state.missionStepOne
  },
  mutations:{
    SET_MISSION_STEP_ONE(state,payload){
      state.missionStepOne = payload
    }
  }
}
