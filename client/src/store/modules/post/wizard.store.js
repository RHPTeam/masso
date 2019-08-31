import CategoryDefaultService from '@/services/modules/post/categorydefault.service';
import CampaignsServices from '@/services/modules/post/campaign.service';

const state = {
  isShowWizard: false,
  finishedStep: '',

  // Step 3 State: Choose Content
  categoryToCopy: {},

  // Step 4 State: Post Scheduling
  defaultSelectedCategory: {},
  createdCampaign: {},
  campaignStartDate: ''
};
const getters = {
  finishedStep: (state) => state.finishedStep,
  isShowWizard: (state) => state.isShowWizard,

  // Step 3 Getters:Choose Content
  categoryToCopy: (state) => state.categoryToCopy,

  // Step 4 Getters: Post Scheduling
  defaultSelectedCategory: (state) => state.defaultSelectedCategory,
  createdCampaign: (state) => state.createdCampaign,
  campaignStartDate: (state) => state.campaignStartDate
};
const mutations = {
  setFinishedStep: (state, payload) => {
    state.finishedStep = payload;
  },
  setIsShowWizard: (state, payload) => {
    state.isShowWizard = payload;
  },

  // Step 3 Mutations: Choose Content
  setCategoryToCopy: (state, payload) => {
    state.categoryToCopy = payload;
  },

  // Step 4 Muatations: Post Scheduling
  setDefaultSelectedCategory: (state, payload) => {
    state.defaultSelectedCategory = payload;
  },
  setCreatedCampaign: (state, payload) => {
    state.createdCampaign = payload;
  },
  setCampaignStartDate: (state, payload) => {
    state.campaignStartDate = payload;
  }
};
const actions = {
  updateFinishedStep: ({ commit }, payload) => {
    commit('setFinishedStep', payload);
  },
  toggleWizard: ({ commit }, payload) => {
    commit('setIsShowWizard', payload);
  },

  //Step 3 Actions: Choose Content
  updateCategoryToCopy: ({ commit }, payload) => {
    commit('setCategoryToCopy', payload);
  },

  // Step 4 Actions: Choose Content
  selectCategoryThenCreateNewCampaign: async ({ commit }) => {
    console.log('Trigger selectCategoryThenCreateNewCampaign');
    const defaultCategoryCopy = await CategoryDefaultService.duplicateFolder(
      state.categoryToCopy._id
    );
    commit('setDefaultSelectedCategory', defaultCategoryCopy.data.data);
    const newCampaign = {
      title: 'Chiến dịch mới',
      description: '',
      startedAt: new Date(),
      finishedAt: new Date()
    };
    const createdCampaign = await CampaignsServices.create(newCampaign);
    commit('setCreatedCampaign', createdCampaign.data.data);
  },
  updateCampaignStartDate: ({ commit }, payload) => {
    commit('setCampaignStartDate', payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
