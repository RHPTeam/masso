import ExpireCodeStore from '@/services/modules/code.service';

const state = {
  errorCode: "",
  statusCode: ""
};
const getters = {
  errorCode: state => state.errorCode,
  statusCode: state => state.statusCode
};
const mutations = {
  code_request: state => {
    state.statusCode = 'loading';
  },
  code_success: state => {
    state.statusCode = 'success';
  },
  existCode: (state, payload) => {
    state.errorCode = payload;
  },
  expireCode: (state, payload) => {
    state.errorCode = payload;
  },
  maxAccountCode: (state, payload) => {
    state.errorCode = payload;
  },
  usedCode: (state, payload) => {
    state.errorCode = payload;
  },
};
const actions = {
  // Exipre account by code
  ExpireAccountByCode: async ({commit}, payload) => {
    try {
        commit( "code_request" );
      const code = {
        code: payload
      }
      await ExpireCodeStore.expireByCode(code);
      commit( "code_success" );
    } catch (e) {
      if (e.response.status === 403) commit("existCode", "Mã kích hoạt này không tồn tại!");
      if (e.response.status === 400) commit("expireCode", "Mã kích hoạt này đã hết hạn sử dụng!");
      if (e.response.status === 406) commit("maxAccountCode", "Mã kích hoạt này đã đạt tối đa số lượt sử dung!");
      if (e.response.status === 405) commit("usedCode", "Bạn đã từng sử dụng mã kích hoạt này, vui lòng nhập mã khác!");
      commit( "code_request" );
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
