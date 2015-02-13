'use strict';

import {getAPI, postAPI, putAPI, delAPI} from "./APIUtils";
import UserServerActionCreators from "../actions/UserServerActionCreators";

export default {
  getUsers() {
    let {
      getUsersSuccess: onSuccess,
      getUsersError: onError
    } = UserServerActionCreators;

    return getAPI('users')
      .then(onSuccess)
      .catch(onError);
  },

  createUser(email) {
    let {
      postUserSuccess: onSuccess,
      postUserError: onError
    } = UserServerActionCreators;

    return postAPI('users', {email: email})
      .then(onSuccess)
      .catch(onError);
  }
};

