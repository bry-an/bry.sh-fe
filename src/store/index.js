import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    shortenUrl(context, url) {
      return axios.post('https://api.bry.sh/add', {
        url,
      })
    },
    shortenCustomUrl(context, {slug, url}) {
      return axios.post('https://api.bry.sh/add/custom', {
        slug,
        url,
      })
    },
  },
  modules: {
  },
})
