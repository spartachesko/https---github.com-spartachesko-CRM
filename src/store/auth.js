import firebase from 'firebase/compat/app';
import { getDatabase, ref, set } from "firebase/database";

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }

    },
    async register({commit,dispatch}, {email, password, name}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        const db = getDatabase();
        await set(ref(db, `/users/${uid}/info`), {
          bill: 10000,
          name
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    getUid(){
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },

    async logout({commit}) {
      await firebase.auth().signOut()
      commit('clearInfo')
    }
  }
}