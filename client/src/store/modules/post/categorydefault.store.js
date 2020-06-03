import CategoryDefaultService from '@/services/modules/post/categorydefault.service';

const state = {
  allCateDefault: [],
  cateDefaultStatus: '',
  postCateDefault: {}
};
const getters = {
  cateDefaultStatus: (state) => state.cateDefaultStatus,
  allCateDefault: (state) => state.allCateDefault,
  postCateDefault: (state) => state.postCateDefault
};
const mutations = {
  cate_default_request: (state) => {
    state.cateDefaultStatus = 'loading';
  },
  cate_default_success: (state) => {
    state.cateDefaultStatus = 'success';
  },
  setAllCateDefault: (state, payload) => {
    state.allCateDefault = payload;
  },
  setPost: (state, payload) => {
    state.postCateDefault = payload;
  }
};
const actions = {
  getCategoryDefault: async ({ commit }) => {
    commit('cate_default_request');
    const results = await CategoryDefaultService.index();
    commit('setAllCateDefault', results.data.data);
    commit('cate_default_success');
  },
  // Search Default Category on Client Side.
  getCategoriesDefaultByKey: ({ commit }, payload) => {
    const convertedKey = changeAlias(payload.search);
    const searchedCategoryDefaultResult = [];
    payload.categoriesDefault.map((item) => {
      const convertedTitle = changeAlias(item.title);
      if (convertedTitle.includes(convertedKey) === true) {
        searchedCategoryDefaultResult.push(item);
      }
    });

    function changeAlias(alias) {
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
    }
    commit('setAllCateDefault', searchedCategoryDefaultResult);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
