import Vue from 'vue'
import Vuex from 'vuex'
import * as Cookies from 'js-cookie'
import { API_STATUS } from '@/common/constants'
import { AXIOS } from '@/common/axios.api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    status: API_STATUS.NONE,
    privateAboutData: '',
    publicAboutData: ''
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setStatus (state, status) {
      state.status = status
    },
    setPrivateAboutData (state, privateAboutData) {
      state.privateAboutData = privateAboutData
    },
    setPublicAboutData (state, publicAboutData) {
      state.publicAboutData = publicAboutData
    }
  },
  actions: {
    authenticate ({ commit, dispatch }, form) {
      commit('setStatus', API_STATUS.LOADING)

      AXIOS.post('authenticate', null, {
        headers: { 'username': form.username, 'password': form.password }
      })
        .then(response => {
          commit('setStatus', API_STATUS.OK)

          Cookies.set('token', response.headers.authorization)
          commit('setToken', response.headers.authorization)
          dispatch('updateAuthorizationHeader')
        }).catch(error => {
          commit('setStatus', API_STATUS.ERROR)
          console.log(error.response)
        })
    },
    updateToken ({ commit }) {
      commit('setToken', Cookies.get('token'))
    },
    updateAuthorizationHeader ({ commit }) {
      if (this.state.token) {
        AXIOS.defaults.headers.common['Authorization'] = this.state.token
      }
    },
    register ({ commit }, form) {
      commit('setStatus', API_STATUS.LOADING)

      AXIOS.post('/public/registration', form)
        .then(response => {
          commit('setStatus', API_STATUS.OK)
          console.log(response)
        }).catch(error => {
          commit('setStatus', API_STATUS.ERROR)
          console.log(error.response)
        })
    },
    logout ({ commit }) {
      commit('setToken', null)
      Cookies.remove('token')
    },
    changePassword ({ commit }, form) {
      commit('setStatus', API_STATUS.LOADING)

      AXIOS.post('/user/change-password', form)
        .then(response => {
          commit('setStatus', API_STATUS.OK)
          console.log(response)
        }).catch(error => {
          commit('setStatus', API_STATUS.ERROR)
          console.log(error.response)
        })
    },
    updateStatus ({ commit, status }) {
      commit('setStatus', status)
    },
    resetStatus ({ commit }) {
      commit('setStatus', API_STATUS.NONE)
    },
    fetchAboutData ({ commit }) {
      commit('setStatus', API_STATUS.LOADING)

      AXIOS.get('/private')
        .then(response => {
          commit('setStatus', API_STATUS.OK)
          commit('setPrivateAboutData', response.data)
        }).catch(() => {
          commit('setStatus', API_STATUS.ERROR)
        })

      AXIOS.get('/public')
        .then(response => {
          commit('setStatus', API_STATUS.OK)
          commit('setPublicAboutData', response.data)
        }).catch(() => {
          commit('setStatus', API_STATUS.ERROR)
        })
    }
  }
})
