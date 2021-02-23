import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    shortenUrl(context, url) {
      return axios.post('http://localhost:3001/add', {
        url,
      })
    },
    shortenCustomUrl(context, {slug, url}) {
      return axios.post('http://localhost:3001/add/custom', {
        slug,
        url,
      })
    },
  },
  modules: {
  },
})
