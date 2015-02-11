import AppDispatcher from "../dispatcher/AppDispatcher";
import {ViewActionTypes} from "../constants/ActionTypes";

export default {
  toggle() {
    AppDispatcher.handleViewAction({
      type: ViewActionTypes.TOGGLE
    });
  },

  activate() {
    AppDispatcher.handleViewAction({
      type: ViewActionTypes.ACTIVATE
    });
  },

  deactivate() {
    AppDispatcher.handleViewAction({
      type: ViewActionTypes.DEACTIVATE
    })
  }
};
