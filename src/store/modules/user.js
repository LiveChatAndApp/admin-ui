const user = {
  state: {},

  mutations: {
    setUserInfo: (state, userInfo) => {
      state.user = userInfo
    }
  },

  actions: {
    setUserInfo: ({ commit }, userInfo) => {
      commit('setUserInfo', userInfo)
    }
  }
}

export default user
