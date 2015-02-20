'use strict';

import { normalize, arrayOf, Schema } from "normalizr";
import {getAPI, postAPI, putAPI, delAPI} from "./APIUtils";

let Profile = new Schema('Profiles');

Profile.define({
  User: User
});

let User = new Schema('Users');

User.define({
  Profile: Profile
});

export default {
  getUsers() {
    return getAPI('users')
      .then(data => {
        let normalized = normalize(data, arrayOf(User));
        console.log(normalized);
        return data;
      });
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

