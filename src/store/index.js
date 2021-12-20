import { createStore } from 'vuex'
import axios from 'axios'

const apiUrl = 'http://localhost:8008'

export default createStore({
  state: {
    vm: {
      types: {},
      nodes: [],
      libraries: {},
      modules: {},
      actors: {}
    }
  },
  mutations: {
    setVm (ctx, next) {
      ctx.vm = next
    }
  },
  actions: {
    async init (ctx) {
      const data = await axios.get(`${apiUrl}/vm`)
      ctx.commit('setVm', data.data)
    },
    async saveAll (ctx, libs) {
      await axios.post(`${apiUrl}/libraries/save`, { libraries: libs })
      await ctx.dispatch('init')
    },
    async runFunction (ctx, info) {
      const data = await axios.get(`${apiUrl}/run/${info.library}/${info.code}`)
      return data.data
    }
  }
})
