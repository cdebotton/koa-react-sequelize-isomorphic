'use strict';

import alt from "../alt";
import assign from "object-assign";
import {injectIntoList} from "../utils/ListUtils";
import UserActionCreators from "../actions/UserActionCreators";

class UserStore {
  static getById(id) {
    let { users } = this.getState();

    return users.find(user => +user.id === +id);
  }

  constructor() {
    this.bindActions(UserActionCreators);
    this.users = [];
  }

  onGetUsersSuccess(users = []) {
    this.users = injectIntoList(this.users, users);
  }

  onGetUserSuccess(user = {}) {
    this.users = injectIntoList(this.users, [user]);
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

  onUpdateUser({ user, params }) {
    let index = this.users.map(user => +user.id)
      .indexOf(+user.id);

    assign(user, params);

    this.users[index] = user;
  }

  onUpdateUserSuccess([ref, user]) {
    let index = this.users.indexOf(ref);
    this.users[index] = user;
  }

  onDestroyUser({ id }) {
    let ids = this.users.map(user => user.id);
    let index = ids.indexOf(id);

    this.users.splice(index, 1);
  }
}

export default alt.createStore(UserStore, 'UserStore');
