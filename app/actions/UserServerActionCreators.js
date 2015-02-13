'use strict';

import AppDispatcher from "../dispatcher/AppDispatcher";
import {ServerActionTypes} from "../constants/ActionTypes";

export default {
  getUsersSuccess(user) {
    AppDispatcher.handleServerAction({
      type: ServerActionTypes.GET_USERS_SUCCESS,
      users: user
    });
  },

  getUsersError(err) {
    AppDispatcher.handleServerAction({
      type: ServerActionTypes.GET_USERS_ERROR,
      err: err
    });
  },

  postUserSuccess(user) {
    AppDispatcher.handleServerAction({
      type: ServerActionTypes.POST_USER_SUCCESS,
      user: user
    });
  },

  postUserError(err) {
    AppDispatcher.handleServerAction({
      type: ServerActionTypes.POST_USER_ERROR,
      err: err
    });
  },
};
