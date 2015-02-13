'use strict';

import UserAPI from "../utils/UserAPI";
import AppDispatcher from "../dispatcher/AppDispatcher";
import {ViewActionTypes} from "../constants/ActionTypes";

export default {
  createUser(email) {
    AppDispatcher.handleViewAction({
      type: ViewActionTypes.CREATE_USER,
      email: email
    });

    UserAPI.createUser(email);
  },

  destroyUser(id) {
    AppDispatcher.handleViewAction({
      type: ViewActionTypes.DESTROY_USER,
      id: id
    });

    UserAPI.destroyUser(id);
  }
};
