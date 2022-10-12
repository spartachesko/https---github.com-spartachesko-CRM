import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import record from './record'
import category from './category'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
  },
  getters: {
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  getters: {
    error: s => s.error
  },

  actions: {
    async fetchCurrency() {

      const key = process.env.VUE_APP_FIXER
      let myHeaders = new Headers();
      myHeaders.append("apikey", key);

      let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
      };

      const res = await fetch("https://api.apilayer.com/fixer/latest?symbols=USD,EUR,RUB", requestOptions)


      console.log('res', res)
      
      return await res.json()
    },
  },
  modules: {
    auth, info, category, record
  }
})
