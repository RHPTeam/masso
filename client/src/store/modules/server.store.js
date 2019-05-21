import ServerServices from "@/services/modules/server.services"

const state = {
  allDomain: [],
  serverStatus: ""
};
const getters = {
  allDomain: state => state.allDomain,
  serverStatus: state => state.serverStatus
};
const mutations = {
  server_request: state => {
    state.serverStatus = 'loading';
  },
  server_success: state => {
    state.serverStatus = 'success';
  },
  setAllDomain: ( state, payload ) => {
    state.allDomain = payload;
  }
};
const actions = {
  createNewDomain: async ( { commit }, payload ) => {
    commit( "server_request" );
    await ServerServices.create( payload );
    const result = await ServerServices.index();
    commit( "setAllDomain", result.data.data );
    commit( "server_success" );
  },
  getAllDomain: async ( { commit } ) => {
    commit( "server_request" );
    const result = await ServerServices.index();
    commit( "setAllDomain", result.data.data );
    commit( "server_success" );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
