import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vkId: '',
    okStatus: false
  },
  getters: {
    vkId: state => state.vkId,
    okStatus: state => state.okStatus
  },
  mutations: {
    setVkId: (state, payload) => {
      state.vkId = payload
    },
    setOkStatus: (state, payload) => {
      state.okStatus = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
