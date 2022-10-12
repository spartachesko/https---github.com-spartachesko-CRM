import { getDatabase, ref, child, get, update } from "firebase/database";

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  actions: {
    async updateInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        const uid = await dispatch('getUid')
        const db = getDatabase();
        const updateData = { ...getters.info, ...toUpdate }
        const postListRef = ref(db, `/users/${uid}/`);
        const newPostKey = (child(ref(db), 'info')).key;
        const updates = {};
        updates[newPostKey] = updateData;

        update(postListRef, updates)
        commit('setInfo', updateData)

      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        let info
        const dbRef = ref(getDatabase());
        const snapshot = await get(child(dbRef, `/users/${uid}/info`))
        info = snapshot.val()
        commit('setInfo', info)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
  },
  getters: {
    info: s => s.info
  }
}