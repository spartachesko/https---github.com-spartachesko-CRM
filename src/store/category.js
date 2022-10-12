import { getDatabase, ref, push, set, get, child, update } from "firebase/database";


export default {
  actions: {
    async fetchCategories({ commit, dispatch }) {
      try {
        let categories
        const uid = await dispatch('getUid')
        const dbRef = ref(getDatabase());
        const snapshot = await get(child(dbRef, `/users/${uid}/categories`));
        categories = snapshot.val()
        if(categories===null) {
          categories = {}
        }
        const cats =[]
        Object.keys(categories).forEach( key => {
          cats.push({
            title: categories[key].title,
            limit: categories[key].limit,
            id: key
          })
        })
        return cats

        // return Object.keys(categories).map(key => ({ ...categories[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async fetchCategoryById({ commit, dispatch }, id) {
      try {
        let category
        const uid = await dispatch('getUid')
        const dbRef = ref(getDatabase());
        const snapshot = await get(child(dbRef, `/users/${uid}/categories/${id}`));
        category = snapshot.val()
        if(category===null) {
          category = {}
        }
       

        return {...category, id}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async updateCategory({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch('getUid')
        const db = getDatabase();
        const postData = { title, limit };
        const postListRef = ref(db, `/users/${uid}/categories`);
        console.log('postListRef', postListRef)
        const newPostKey = (child(ref(db), id)).key;
        console.log('newPostKey', newPostKey)
        const updates = {};
        updates[newPostKey] = postData;
        update(postListRef, updates)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch('getUid')
        const db = getDatabase();
        const postListRef = ref(db, `/users/${uid}/categories`);
        const category = push(postListRef);
        await set(category, { title, limit });

        return { title, limit, id: category.key }

      } catch (e) {
        commit('setError', e)
        throw e
      }

    }
  }
}