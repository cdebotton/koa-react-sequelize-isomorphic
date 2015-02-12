'use strict';

import AppDispatcher from "../dispatcher/AppDispatcher";
import {ServerActionTypes, ViewActionTypes} from "../constants/ActionTypes";
import {createStore} from "../utils/StoreUtils";
import {Map, fromJS} from "immutable";

var _state = fromJS({
  toggle: false
});

var AppStore = createStore({
  getState() {
    return _state.toJS();
  }
});

AppStore.dispatchToken = AppDispatcher.register(payload => {
  let action = payload.action;

  switch (action.type) {
  case ServerActionTypes.REQUEST_RESOURCE:

    break;
  case ServerActionTypes.REQUEST_RESOURCE_SUCCESS:
    break;
  case ServerActionTypes.REQUEST_RESOURCE_ERROR:
    break;
  case ViewActionTypes.TOGGLE:
    let toggle = _state.get('toggle');
    _state = _state.set('toggle', !toggle);
    break;
  case ViewActionTypes.ACTIVATE:
    _state = _state.set('toggle', true);
    break;
  case ViewActionTypes.DEACTIVATE:
    _state = _state.set('toggle', false);
    break;
  }

  AppStore.emitChange();
});

export default AppStore;
