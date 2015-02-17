'use strict';

import {getAPI, postAPI, putAPI, delAPI} from "./APIUtils";
import UserActionCreators from "../actions/UserActionCreators";

export default {
  getUsers() {
    let {
      getUsersSuccess: onSuccess,
      getUsersError: onError
    } = UserActionCreators;

    return getAPI('users')
      .then(onSuccess)
      .catch(onError);
  },

  getUser(id) {
    let {
      getUserSuccess: onSucces,
      getUserError: onError
    } = UserActionCreators;

    return getApi(`users/${id}`)
      .then(onSuccess)
      .catch(onError);
  },

  createUser(email) {
    let {
      postUserSuccess: onSuccess,
      postUserError: onError
    } = UserActionCreators;

    return postAPI('users', {email: email})
      .then(onSuccess)
      .catch(onError);
  },

  destroyUser(id) {
    let {
      delUserSuccess: onSuccess,
      delUserError: onError
    } = UserActionCreators;

    return delAPI(`users/${id}`)
      .then(onSuccess)
      .catch(onError);
  }
};

