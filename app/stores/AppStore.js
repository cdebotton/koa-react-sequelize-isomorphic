'use strict';

import AppDispatcher from "../dispatcher/AppDispatcher";
import {ServerActionTypes, ViewActionTypes} from "../constants/ActionTypes";
import {createStore} from "../utils/StoreUtils";
import {Map, fromJS} from "immutable";

var _entities = fromJS({
  toggle: false
});

var AppStore = createStore({
  getState() {
    return _entities.toJS();
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
    let toggle = _entities.get('toggle');
    _entities = _entities.set('toggle', !toggle);
    break;
  case ViewActionTypes.ACTIVATE:
    _entities = _entities.set('toggle', true);
    break;
  case ViewActionTypes.DEACTIVATE:
    _entities = _entities.set('toggle', false);
    break;
  }

  AppStore.emitChange();
});

export default AppStore;
