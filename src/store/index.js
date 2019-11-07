import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import api from './modules/api'
import app from './modules/app'
import tagsView from './modules/tagsView'
import settings from './modules/settings'
import user from './modules/user'
import permission from './modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    api,
    app,
    tagsView,
    settings,
    user,
    permission
  },
  getters
})

export default store
