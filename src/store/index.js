import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'

Vue.use(Vuex)

const state = {
  SendData: '',
  RegisterData: '',
  RequestData: '',
  TokenKey: '',
  UserID: ''
}

const getters = {
  TokenKey (state) {
    if (!state.TokenKey) {
      state.TokenKey = Cookies.get('token')
    }
    return state.TokenKey
  },
  UserID (state) {
    if (!state.UserID) {
      state.UserID = Cookies.get('user_id')
    }
    return state.UserID
  }
}

const mutations = {
  SendData (state, params) {
    state.SendData = params.data
  },
  RegisterData (state, params) {
    state.RegisterData = params.data
  },
  RequestData (state, params) {
    state.RequestData = params
  },
  TokenKey (state, params) {
    state.TokenKey = params
    Cookies.set('token', params, { expires: 7 })
  },
  UserID (state, params) {
    state.UserID = params
    Cookies.set('user_id', params, { expires: 7 })
  }
}

const actions = {
  Login (doc) {
    const User = doc.state.RequestData
    axios.post('http://localhost:3000/api/Login', {User})
      .then(res => {
        doc.commit('SendData', res)

        const token = res.data.token
        doc.commit('TokenKey', token)

        var decoded = jwt.verify(token, 'shh_token')
        doc.commit('UserID', decoded.doc._id)
      })
      .catch(err => {
        console.log(err)
      })
  },
  Register (doc) {
    const User = doc.state.RequestData

    axios.post('http://localhost:3000/api/Register', {User})
      .then(res => {
        doc.commit('RegisterData', res)
      })
      .catch(err => {
        console.log(err)
      })
  }
  // GetInfo (doc) {
  //   const UserID = doc.getters.UserID
  //   axios.get('http://localhost:3000/api/info/' + UserID)
  //     .then(res => {
  //       console.log(res)
  //       doc.commit('Form_StoreInfo', res.data.StoreInfo)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // },
  // PutInfo (doc) {
  //   const UserID = doc.getters.UserID
  //   const FormStoreInfo = doc.state.Form.StoreInfo

  //   axios.put('http://localhost:3000/api/info/' + UserID, {StoreInfo: FormStoreInfo})
  //     .then(res => {
  //       console.log(res)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
