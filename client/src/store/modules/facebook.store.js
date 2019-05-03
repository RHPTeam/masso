import FacebookServices from '@/services/modules/facebook.services';

const state = {
  colorFb: [],
  faceBStatus: ""
};

const getters = {
  colorFb: state => state.colorFb,
  faceBStatus: state => state.faceBStatus
};

const mutations = {
  fb_request: state => {
    state.faceBStatus = "loading";
  },
  fb_success: state => {
    state.faceBStatus = "success";
  },
  setColorFb: (  state, payload ) => {
    state.colorFb = payload;
  }
};

const actions = {
  getColorFromFb: async ( {commit} ) => {
    commit( "fb_request" );
    const results = await  FacebookServices.getColorFb();
    commit( "setColorFb", results.data.results );
    commit( "fb_success" );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
