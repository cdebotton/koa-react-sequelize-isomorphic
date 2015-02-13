import {ServerActionTypes, ViewActionTypes} from "../constants/ActionTypes";
import AppDispatcher from "../dispatcher/AppDispatcher";
import {createStore} from "../utils/StoreUtils";
import Immutable from "immutable";

var _state = Immutable.fromJS({
  users: []
});

var UserStore = createStore({
  getState() {
    return _state.toJS();
  }
});

UserStore.dispatchToken = AppDispatcher.register(payload => {
  let {action} = payload;

  switch (action.type) {
  case ViewActionTypes.CREATE_USER:
    createUser(action.email);
    break;
  case ServerActionTypes.GET_USER_SUCCESS:
    break;
  case ServerActionTypes.GET_USER_ERROR:
    break;
  }

  UserStore.emitChange();
});

var createUser = (email) => {
  _state = _state.updateIn(['users'], list => list.concat({email}));
};

export default UserStore;
