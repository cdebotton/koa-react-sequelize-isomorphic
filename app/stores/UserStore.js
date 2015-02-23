'use strict';

import alt from "../alt";
import assign from "object-assign";
import {injectIntoList} from "../utils/ListUtils";
import UserActionCreators from "../actions/UserActionCreators";

var DIRTY_ID = 0;

class UserStore {
  static getSorted() {
    let { users, sortProperty, sortOrder } = this.getState();
    let order = sortOrder === 'asc' ? -1 : 1;
    let sorted = Object.keys(users)
      .map(key => assign({}, users[key]))
      .sort((a, b) => {
        return a[sortProperty] < b[sortProperty] ? order : order * -1;
      });

    return { users: sorted };
  }

  static getById(id) {
    let { users } = this.getState();

    return assign({}, users[id]);
  }

  constructor() {
    this.bindActions(UserActionCreators);
    this.sortProperty = 'id';
    this.sortOrder = 'asc';
    this.users = {};
  }

  onSetSortProperty(prop) {
    let isSame = prop === this.sortProperty;

    this.sortProperty = prop;

    if (! isSame) {
      this.sortOrder = 'asc';
    }
    else {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    }
  }

  onGetUsersSuccess(resp) {
    let { users } = resp.entities;

    this.users = assign({}, this.users, users)
  }

  onGetUserSuccess(resp) {
    let { users } = resp.entities;

    this.users = assign({}, this.users, users);
  }

  onCreateUser(user = {}) {
    let nextId = `${++DIRTY_ID}_DIRTY`;

    this.users[nextId] = user;
  }

  onCreateUserSuccess(resp) {
    let { users } = resp.entities;
    let lastId = `${DIRTY_ID}_DIRTY`;

    delete this.users[lastId];

    this.users = assign({}, this.users, users);
  }

  onCreateUserError([ ref ]) {
    let lastId = `${DIRTY_ID}_DIRTY`;

    delete this.users[lastId];
  }

  onUpdateUser({ user, params }) {
    let { id } = user;
    let updated = assign({}, this.users[id], params);

    this.users[id] = updated;
  }

  onUpdateUserSuccess(user) {
    let { id } = user;

    this.users[id] = user;
  }

  onDestroyUser({ id }) {
    delete this.users[id];
  }
}

export default alt.createStore(UserStore, 'UserStore');
