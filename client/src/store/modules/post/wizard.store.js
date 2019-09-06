import CategoryDefaultService from '@/services/modules/post/categorydefault.service';
import CampaignsServices from '@/services/modules/post/campaign.service';

const state = {
  isShowWizard: false,
  finishedStep: '',

  // Welcome - Step 1 State: Add Keyword
  userInfoWizard: {},

  // Welcome - Step 3 State: Choose Content
  categoryToCopy: {},

  // QuickPost - Step 3 State: Choose Content
  chooseContentCurrentComponentTab: 'post-list',
  selectedCategoryInListTab: {},
  selectedPostInListTab: [],

  // Welcome - Step 4 State: Post Scheduling
  defaultSelectedCategory: {},
  createdCampaign: {},
  campaignStartDate: '',

  // QuickPost - Step 4 State: Post Scheduling
  selectedCampaign: {}
};
const getters = {
  finishedStep: (state) => state.finishedStep,
  isShowWizard: (state) => state.isShowWizard,

  // Welcome - Step 1 Getters: Add Keyword
  userInfoWizard: (state) => state.userInfoWizard,

  // Welcome - Step 3 Getters: Choose Content
  categoryToCopy: (state) => state.categoryToCopy,

  // QuickPost - Step 3 Getters: Choose Content For QuickPost
  chooseContentCurrentComponentTab: (state) =>
    state.chooseContentCurrentComponentTab,
  selectedCategoryInListTab: (state) => state.selectedCategoryInListTab,
  selectedPostInListTab: (state) => state.selectedPostInListTab,

  // Welcome - Step 4 Getters: Post Scheduling
  defaultSelectedCategory: (state) => state.defaultSelectedCategory,
  createdCampaign: (state) => state.createdCampaign,
  campaignStartDate: (state) => state.campaignStartDate,

  // QuickPost - Step 4 Getters: Post Scheduling
  selectedCampaign: (state) => state.selectedCampaign
};
const mutations = {
  setFinishedStep: (state, payload) => {
    state.finishedStep = payload;
  },
  setIsShowWizard: (state, payload) => {
    state.isShowWizard = payload;
  },

  // Welcome - Step 1 Mutations: Add Keyword
  setUserInfoWizard: (state, payload) => {
    state.userInfoWizard = payload;
  },

  // Welcome - Step 3 Mutations: Choose Content
  setCategoryToCopy: (state, payload) => {
    state.categoryToCopy = payload;
  },

  // QuickPost - Step 3 Mutations: Choose Content
  setChooseContentCurrentComponentTab: (state, payload) => {
    state.chooseContentCurrentComponentTab = payload;
  },
  setSelectedCategoryInListTab: (state, payload) => {
    state.selectedCategoryInListTab = payload;
  },
  addSelectedPostInListTab: (state, payload) => {
    state.selectedPostInListTab.push(payload);
    console.log(state.selectedPostInListTab);
  },
  removeSelectedPostInListTab: (state, payload) => {
    state.selectedPostInListTab = state.selectedPostInListTab.filter(
      (item) => item._id !== payload._id
    );
    console.log(state.selectedPostInListTab);
  },

  // Welcome - Step 4 Mutations: Post Scheduling
  setDefaultSelectedCategory: (state, payload) => {
    state.defaultSelectedCategory = payload;
  },
  setCreatedCampaign: (state, payload) => {
    state.createdCampaign = payload;
  },
  setCampaignStartDate: (state, payload) => {
    state.campaignStartDate = payload;
  },

  // QuickPost - Step 4 Muatations: Post Scheduling
  setSelectedCampaign: (state, payload) => {
    state.selectedCampaign = payload;
  }
};
const actions = {
  updateFinishedStep: ({ commit }, payload) => {
    commit('setFinishedStep', payload);
  },
  toggleWizard: ({ commit }, payload) => {
    commit('setIsShowWizard', payload);
  },

  // Welcome - Step 1 Actions: Add Keyword
  storeKeywordList: ({ commit }, payload) => {
    commit('setUserInfoWizard', payload);
  },
  updateKeywordList: ({ dispatch }) => {
    dispatch('updateUser', state.userInfoWizard);
  },

  // Welcome - Step 3 Actions: Choose Content
  updateCategoryToCopy: ({ commit }, payload) => {
    commit('setCategoryToCopy', payload);
  },

  // QuickPost - Step 3 Actions: Choose Content
  updateChooseContentCurrentComponentTab: ({ commit }, payload) => {
    commit('setChooseContentCurrentComponentTab', payload);
  },

  updateSelectedCategoryInListTab: ({ commit }, payload) => {
    commit('setSelectedCategoryInListTab', payload);
  },
  addSelectedPostInListTab: ({ commit }, payload) => {
    console.log('add', payload.title);
    commit('addSelectedPostInListTab', payload);
  },
  removeSelectedPostInListTab: ({ commit }, payload) => {
    console.log('remove', payload.title);
    commit('removeSelectedPostInListTab', payload);
  },

  // Welcome - Step 4 Actions: Post Scheduling
  selectCategoryThenCreateNewCampaign: async ({ commit }) => {
    // Copy Default Category
    const defaultCategoryCopy = await CategoryDefaultService.duplicateFolder(
      state.categoryToCopy._id
    );
    commit('setDefaultSelectedCategory', defaultCategoryCopy.data.data);

    // Create new default Campaign
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
  },

  // QuickPost - Step 4 Actions: Post Scheduling
  copySelectedDefaultCategory: async ({ commit }, payload) => {
    const defaultCategoryCopy = await CategoryDefaultService.duplicateFolder(
      state.categoryToCopy._id
    );
    commit('setDefaultSelectedCategory', defaultCategoryCopy.data.data);
  },

  updateSelectedCampaign: ({ commit }, payload) => {
    commit('setSelectedCampaign', payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
