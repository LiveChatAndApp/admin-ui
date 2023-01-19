const bulletin = {
  state: {
    list: []
  },
  mutations: {
    setBulletinList: (state, bulletinList) => {
      state.list = bulletinList
    }
  },
  actions: {
    setBulletinList: ({ commit }, bulletinList) => {
      commit('setBulletinList', bulletinList)
    }
  }
}

export default bulletin
