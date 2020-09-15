import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    debug: true,
    state: {
      error: null,
      csvHeaders: [],
      csvData: [],
      unmappedData: [],
      remappedCsvData: [],
      remappedColumnOrder: [0, 1, 2, 3, 4, 5, 6],
      // read only SSOA
      dbHeaders: ['team_id', 'name', 'phone', 'email', 'sticky_phone_number_id', 'created_at', 'updated_at'],
      dbNamedHeaders: ['Team Id', 'Name', 'Phone', 'Email', 'Sticky Phone Number Id', 'Created', 'Updated']
    }
  },

  getters: {
    dbHeaders: store => {
      return store.state.dbHeaders
    },
    dbNamedHeaders: store => {
      return store.state.dbNamedHeaders
    },
    csvHeaders: store => {
      return store.state.csvHeaders
    },
    csvData: store => {
      return store.state.csvData
    },
    unmappedData: store => {
      return store.state.unmappedData
    },
    remappedCsvData: store => {
      return store.state.remappedCsvData
    },
    remappedColumnOrder: store => {
      return store.state.remappedColumnOrder
    },
    getError: store => {
      console.info('getError', store.state.error)
      return store.state.error
    }
  },

  mutations: {
    addCsvHeaders (store, value) {
      store.state.csvHeaders = value
    },
    addCsvData (store, value) {
      store.state.csvData = value
    },
    addUnmappedData (store, value) {
      store.state.unmappedData = value
    },
    addRemappedCsvData (store, value) {
      store.state.remappedCsvData = value
    },
    addRemappedColumnOrder (store, value) {
      store.state.remappedColumnOrder = value
    },
    addError (store, error) {
      console.error('mutations addError', store.state.error, error)
      store.state.error = error
    },
    clearError (store) {
      console.error('mutations clearError', store.state.error)
      store.state.error = null
    }
  },

  actions: {
    addCsvHeaders (context, value) {
      context.commit('addCsvHeaders', value)
    },
    addCsvData (context, value) {
      context.commit('addCsvData', value)
    },
    addUnmappedData (context, value) {
      context.commit('addUnmappedData', value)
    },
    addRemappedCsvData (context, value) {
      context.commit('addRemappedCsvData', value)
    },
    addRemappedColumnOrder (context, value) {
      context.commit('addRemappedColumnOrder', value)
    },
    addError (context, value) {
      console.error('action addError', value)
      context.commit('addError', value)
    },
    clearError (context) {
      console.error('action clearError')
      context.commit('clearError')
    }
  }
})
