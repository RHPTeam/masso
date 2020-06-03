import CampaignDefaultService from '@/services/modules/post/campaigndefault.service';

const state = {
  campSimple: [],
  campStatus: ''
};
const getters = {
  campStatus: (state) => state.campStatus,
  campSimple: (state) => state.campSimple
};
const mutations = {
  camp_request: (state) => {
    state.campStatus = 'loading';
  },
  camp_success: (state) => {
    state.campStatus = 'success';
  },
  setCampaignSimple: (state, payload) => {
    state.campSimple = payload;
  }
};
const actions = {
  getCampaignSimple: async ({ commit }) => {
    commit('camp_request');
    const result = await CampaignDefaultService.index();
    commit('setCampaignSimple', result.data.data);
    commit('camp_success');
  },
  duplicateCampaignSimple: async ({ commit }, payload) => {
    commit('camp_request');
    const objSender = {
      facebookId: payload.facebookId
    };
    await CampaignDefaultService.duplicateCampaign(
      payload.campaignId,
      objSender
    );
    commit('camp_success');
  },

  // Search Default Campaign on Client Side.
  getCampaignsSimpleByKey: ({ commit }, payload) => {
    const convertedKey = changeAlias(payload.search);
    const searchedCampaignDefaultResult = [];
    payload.campaignsDefault.map(item => {
      const convertedTitle = changeAlias(item.title);
      if (convertedTitle.includes(convertedKey) === true) {
        searchedCampaignDefaultResult.push(item);
      }
    });
  
    function changeAlias(alias){
      var str = alias;
      str = str.toLowerCase();
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
      str = str.replace(/đ/g, 'd');
      str = str.replace(
        /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
        ' '
      );
      str = str.replace(/ + /g, ' ');
      str = str.trim();
      return str;
    };
    commit('setCampaignSimple', searchedCampaignDefaultResult);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
