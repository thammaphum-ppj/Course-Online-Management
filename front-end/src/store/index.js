
import { createStore , mapState } from 'vuex'

import datafromApiFree from './modules/datafromApiFree'
import auth from './modules/auth'
import user from './modules/user'
import inbox from './modules/inbox'
import category from './modules/category'
import course from './modules/course'
import order from './modules/order'
import favorite from './modules/favorite'


export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    datafromApiFree,
    auth,
    user,
    inbox,
    category,
    course,
    order,
    favorite
  }
})

