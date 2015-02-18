'use strict';

import {getAPI, postAPI, putAPI, delAPI} from "./APIUtils";

export default {
  getUsers() {
    return getAPI('users');
  },

  getUser(id) {
    return getApi(`users/${id}`);
  },

  createUser(email) {

    return postAPI('users', {email: email});
  },

  destroyUser(id) {
    return delAPI(`users/${id}`);
  }
};

