'use strict';

import {getAPI, postAPI, putAPI, delAPI} from "./APIUtils";
import { normalize, arrayOf, Schema } from "normalizr";

let User = new Schema('users');
let Profile = new Schema('profiles');

User.define({
  Profile: Profile
});

Profile.define({
  user: User
});

export default {
  getUsers() {
    return getAPI('users')
      .then(data => normalize(data, arrayOf(User)));
  },

  getUser(id) {
    return getAPI(`users/${id}`)
      .then(data => normalize(data, User));
  },

  createUser(email) {
    return postAPI('users', {email: email})
      .then(data => normalize(data, User));
  },

  updateUser(user, params) {
    return putAPI(`users/${user.id}`, params)
      .then(data => normalize(data, User));
  },

  destroyUser(id) {
    return delAPI(`users/${id}`);
  }
};

