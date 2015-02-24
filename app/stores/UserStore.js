'use strict';

import alt from "../alt";
import { Map, fromJS } from "immutable";
import UserActionCreators from "../actions/UserActionCreators";

var DIRTY_ID = 0;

class UserStore {
  constructor() {
    this.bindActions(UserActionCreators);

    this.on('bootstrap', this.setup);
    this.on('init', this.setup);

    this.sortProperty = 'id';
    this.sortOrder = 'desc';
    this.users = Map();
  }

  setup() {
    if (! Map.isMap(this.users)) {
      this.users = fromJS(this.users, (key, value) => value.toMap());
    }
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

    this.users = this.users.merge(fromJS(users, (key, value) => value.toMap()));
  }

  onGetUserSuccess(resp) {
    let { users } = resp.entities;

    this.users = this.users.merge(fromJS(users, (key, value) => value.toMap()));
  }

  onCreateUser(user = {}) {
    let nextId = `${++DIRTY_ID}_DIRTY`;

    this.users = this.users.set(nextId, fromJS(user))
  }

  onCreateUserSuccess(resp) {
    let { users } = resp.entities;
    let lastId = `${DIRTY_ID}_DIRTY`;

    this.users = this.users.delete(lastId);
    this.users = this.users.merge(users);
  }

  onCreateUserError([ ref ]) {
    let lastId = `${DIRTY_ID}_DIRTY`;

    this.users = this.users.delete(lastId);
  }

  onUpdateUser({ user, params }) {
    let id = user.get('id');

    this.users = this.users.set(id, fromJS(params));
  }

  onUpdateUserSuccess(resp) {
    let { users } = resp.entities;

    this.users = this.users.merge(fromJS(users));
  }

  onDestroyUser({ id }) {
    this.users = this.users.delete(id);
  }
}

export default alt.createStore(UserStore, 'UserStore');
