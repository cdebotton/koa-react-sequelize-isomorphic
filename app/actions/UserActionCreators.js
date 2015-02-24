'use strict';

import alt from "../alt";
import UserAPI from "../utils/UserAPI";

class UserActionCreators {
  constructor() {
    this.generateActions(
      'getUsersSuccess',
      'getUsersError',
      'getUserSuccess',
      'getUserError',
      'createUserSuccess',
      'createUserError',
      'updateUserSuccess',
      'updateUserError',
      'destroyUserSuccess',
      'destroyUserError',
      'setSortProperty'
    );
  }

  getUsers() {
    this.dispatch();

    return UserAPI.getUsers()
      .then(this.actions.getUsersSuccess)
      .catch(this.actions.getUsersError);
  }

  getUser(userId) {
    this.dispatch();

    return UserAPI.getUser(userId)
      .then(this.actions.getUserSuccess)
      .catch(this.actions.getUserError);
  }

  createUser(email) {
    this.dispatch({ email });

    return UserAPI.createUser(email)
      .then(this.actions.createUserSuccess)
      .catch(this.actions.createUserError);
  }

  updateUser(user, params) {
    this.dispatch({ user, params });

    return UserAPI.updateUser(user.toJS(), params)
      .then(this.actions.updateUserSuccess)
      .catch(this.actions.updateUserError);
  }

  destroyUser(id) {
    id = id.toString();

    this.dispatch({id});

    return UserAPI.destroyUser(id)
      .then(this.actions.destroyUserSuccess)
      .catch(this.actions.destroyUserError);
  }
}

export default alt.createActions(UserActionCreators);
