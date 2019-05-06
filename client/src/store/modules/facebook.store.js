import FacebookServices from '@/services/modules/facebook.services';

const state = {
  colorFb: [],
  faceBStatus: "",
  places: []
};

const getters = {
  colorFb: state => state.colorFb,
  places: state => state.places,
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
  },
  setPlaces: (  state, payload ) => {
    state.places = payload;
  }
};

const actions = {
  getColorFromFb: async ( {commit} ) => {
    commit( "fb_request" );
    const results = await  FacebookServices.getColorFb();
    commit( "setColorFb", results.data.results );
    commit( "fb_success" );
  },
  getPlaceFromFb: async ( {commit} ) => {
    commit( "fb_request" );
    const results = await  FacebookServices.getPlaces();
    commit( "setPlaces", results.data.data.results );
    commit( "fb_success" );
  },
  searchPlacesCheckIn: async ( { commit }, payload ) => {
    commit( "fb_request" );
    console.log( payload );
    const results = await  FacebookServices.searchPlaces( payload );
    commit( "setPlaces", results.data.data.results );
    commit( "fb_success" );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
