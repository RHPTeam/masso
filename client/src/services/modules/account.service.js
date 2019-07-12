/* eslint-disable new-cap */
import Api from '@/services';

export default {
  index() {
    return Api().get('users');
  },
  create(user) {
    return Api().post('users', user);
  },
  show(id) {
    return Api().get(`users/info?_id=${id}`);
  },
  showUserByEmail(email) {
    return Api().get(`password?email=${email}`);
  },
  update(user) {
    return Api().patch('users', user);
  },
  updateUserByAdmin(data) {
    const uid = data._id,
      dataSender = {
        expireDate: data.expireDate,
        maxAccountFb: data.maxAccountFb,
        _role: data._role,
        status: data.status
      };

    return Api().patch(`users/admin?_userId=${uid}`, dataSender);
  },
  delete(userId) {
    return Api().delete(`users/${userId}`);
  },
  deleteUsers(data) {
    const dataSender = {
      userId: data.userId
    };

    return Api().put('users', dataSender);
  },
  changePassword(user) {
    return Api().patch('users/change-password', user);
  },
  resetPassword(email) {
    return Api().post('password/reset-password', email);
  },
  checkCode(data) {
    return Api().post('password/check-code', data);
  },
  createNewPassword(user, userId) {
    return Api().patch(`password/new-password?_userId=${userId}`, user);
  },
  upload(file) {
    return Api().patch('users', file);
  },
  active(user) {
    return Api().post('users/active', user);
  },
  getRoles() {
    return Api().get('roles');
  },
  // Verify password to get token on mobile
  verifyPassword(password) {
    return Api().patch('users/change-password?_mobile=true', password);
  },
  // Change password using token on mobile
  changePasswordByVerifyToken(){
    return Api().patch('users/change-password?_mobile=true&_password=true', password);
  }
};
