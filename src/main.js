import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import localizeFilter from './filters/localize.filter'
import messagePlugin from './utils/message.plugin'
import titlePlugin from './utils/title.plugin'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'
import tooltipDirective from './directives/tooltip.directive'
import Loader from '@/components/app/Loader'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';




Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.use(Vuelidate)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)


firebase.initializeApp({
  apiKey: "AIzaSyDh_queXobh7yGgEiOxHeA84_ARDCiqL_Q",
  authDomain: "vue-bso-crm.firebaseapp.com",
  projectId: "vue-bso-crm",
  storageBucket: "vue-bso-crm.appspot.com",
  messagingSenderId: "629686041767",
  appId: "1:629686041767:web:ddbd029a9fa81c33b76f82",
  measurementId: "G-1ECFBN33CZ"
})

let app


firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')

  }

})


