'use strict';

import {createStore} from "../utils/StoreUtils";
import AppDispatcher from "../dispatcher/AppDispatcher";
import {ServerActionTypes} from "../constants/ActionTypes";
import Immutable from "immutable";

var _state = Immutable.fromJS({
  posts: []
});

var PostStore = createStore({
  getState() {
    return _state.toJS();
  }
});

PostStore.dispatchToken = AppDispatcher.register(payload => {
  let action = payload.action;

  switch (action.type) {
  case ServerActionTypes.REQUEST_RESOURCE:
    break;
  case ServerActionTypes.REQUEST_RESOURCE_SUCCESS:
    let {posts} = action.body.response;
    _state = _state.updateIn(['posts'], list => list.concat(posts));
    break;
  case ServerActionTypes.REQUEST_RESOURCE_ERROR:
    break;
  }

  PostStore.emitChange();
});

export default PostStore;
