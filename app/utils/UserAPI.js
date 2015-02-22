'use strict';

import {getAPI, postAPI, putAPI, delAPI} from "./APIUtils";

export default {
  getUsers() {
    return getAPI('users');
  },

  getUser(id) {
    return getAPI(`users/${id}`);
  },

  createUser(email) {
    return postAPI('users', {email: email});
  },

  updateUser(user, params) {
    return putAPI(`users/${user.id}`, params);
  },

  destroyUser(id) {
    return delAPI(`users/${id}`);
  }
};

