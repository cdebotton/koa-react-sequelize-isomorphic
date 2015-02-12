'use strict';

import AppDispatcher from "../dispatcher/AppDispatcher";
import {ServerActionTypes, ViewActionTypes} from "../constants/ActionTypes";

export default {
  request() {
    AppDispatcher.handleViewAction({
      type: ServerActionTypes.REQUEST_RESOURCE
    });
  },

  requestSuccess(data) {
    AppDispatcher.handleServerAction({
      type: ServerActionTypes.REQUEST_RESOURCE_SUCCESS,
      body: data
    });
  },

  requestError(err) {
    AppDispatcher.handleServerAction({
      type: ServerActionTypes.REQUEST_RESOURCE_ERROR,
      err: err
    });
  }
};
