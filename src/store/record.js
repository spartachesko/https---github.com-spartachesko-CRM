import { getDatabase, ref, push, set, get, child, update } from "firebase/database";


export default {
  actions: {
    async createRecord({ dispatch, commit }, record) {
      try {
        const uid = await dispatch('getUid')
        const db = getDatabase();
        const postListRef = ref(db, `/users/${uid}/records`);
        const newRecord = push(postListRef);
        return await set(newRecord, record);
      } catch (e) {
        commit('setError', e)
        throw e
      }

    },
    async fetchRecords({ dispatch, commit }) {
      try {
        let records
        const uid = await dispatch('getUid')
        const dbRef = ref(getDatabase());
        const snapshot = await get(child(dbRef, `/users/${uid}/records`));
        records = snapshot.val()
        if (records === null) {
          records = {}
        }

        return Object.keys(records).map(key => ({ ...records[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecordById({ dispatch, commit }, id) {
      try {
        let record
        const uid = await dispatch('getUid')
        console.log('uid',uid,'id', id) 
        const dbRef = ref(getDatabase());
        const snapshot = await get(child(dbRef, `/users/${uid}/records/${id}`));


        console.log('snapshot in record js', snapshot)
        record = snapshot.val()
        console.log('record in record js', record)






        if (record === null) {
          record = {}
        }

        return {...record, id}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
  }
}