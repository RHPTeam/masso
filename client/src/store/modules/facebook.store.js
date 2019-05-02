import FacebookServices from '@/services/modules/facebook.services';

const state = {
  colorFb: [],
  fbStatus: ""
};

const getters = {
  colorFb: state => state.colorFb,
  fbStatus: state => state.fbStatus
};

const mutations = {
  fb_request: state => {
    state.fbStatus = "loading";
  },
  fb_success: state => {
    state.fbStatus = "success";
  },
  setColorFb: (  state, payload ) => {
    state.colorFb = payload;
  }
};

const actions = {
  getColorFromFb: async ( {commit} ) => {
    commit( "fb_request" );
    const results = await  FacebookServices.getColorFb();
    console.log( results.data.data );
    commit( "setColorFb", results.data.data );
    commit( "fb_success" );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
