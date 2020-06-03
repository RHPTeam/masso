import FacebookServices from '@/services/modules/post/facebook.service';

const state = {
  activity: [],
  colorFb: [],
  listActivity: [],
  faceBStatus: "",
  places: []
};

const getters = {
  activity: state => state.activity,
  listActivity: state => state.listActivity,
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
  },
  setActivity: ( state, payload ) => {
    state.activity = payload;
  },
  setListActivity: ( state, payload ) => {
    state.listActivity = payload;
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
  getActivityFb: async ( { commit } ) => {
    commit( "fb_request" );
    const results = await  FacebookServices.getActivity();
    commit( "setActivity", results.data.data.results );
    commit( "fb_success" );
  },
  getListActivityFb: async ( { commit }, payload ) => {
    commit( "fb_request" );
    const results = await  FacebookServices.getListItemActivity(  payload );
    commit( "setListActivity", results.data.data.results );
    commit( "fb_success" );
  },
  searchPlacesCheckIn: async ( { commit }, payload ) => {
    commit( "fb_request" );
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
