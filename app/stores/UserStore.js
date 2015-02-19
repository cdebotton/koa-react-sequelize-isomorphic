'use strict';

import alt from "../alt";
import {injectIntoList} from "../utils/ListUtils";
import UserActionCreators from "../actions/UserActionCreators";

class UserStore {
  constructor() {
    this.bindActions(UserActionCreators);
    this.users = [];
  }

  onGetUsersSuccess(users = []) {
    this.users = injectIntoList(this.users, users);
  }

  onCreateUser(user = {}) {
    this.users = this.users.concat(user);
  }

  onCreateUserSuccess([ ref, user ]) {
    let index = this.users.indexOf(ref);

    this.users[index] = user;
  }

  onCreateUserError([ ref ]) {
    let index = this.users.indexOf(ref);

    this.users.splice(index, 1);
  }

  onDestroyUser({ id }) {
    let ids = this.users.map(user => user.id);
    let index = ids.indexOf(id);

    this.users.splice(index, 1);
  }
}

export default alt.createStore(UserStore, 'UserStore');
