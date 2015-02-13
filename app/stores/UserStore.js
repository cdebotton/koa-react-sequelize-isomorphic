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
  case ServerActionTypes.GET_USERS_SUCCESS:
    mergeUsers(action.users);
    break;
  case ServerActionTypes.GET_USERS_ERROR:
    break;

  case ViewActionTypes.DESTROY_USER:
    destroyUser(action.id);
    break;
  }

  UserStore.emitChange();
});

var createUser = (email) => {
  _state = _state.updateIn(['users'], list => list.concat({email}));
};

var mergeUsers = (newUsers) => {
  _state = _state.updateIn(['users'], users => {
    let ids = users.map(user => user.id);
    let toAdd = newUsers.filter(user => ids.indexOf(user.id) === -1);

    return users.concat(toAdd);
  });
};

var destroyUser = (id) => {
  _state = _state.updateIn(['users'], users => {
    let index = users.findIndex(user => user.id === id);

    return users.splice(index, 1);
  });
};

export default UserStore;
