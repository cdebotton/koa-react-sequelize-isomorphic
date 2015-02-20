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
    let {
      createUserSuccess: onSuccess,
      createUserError: onError
    } = this.actions;

    let user = { email };

    this.dispatch(user);

    return UserAPI.createUser(email)
      .then(onSuccess.bind(onSuccess, user))
      .catch(onError.bind(onError, user));
  }

  updateUser(user, params) {
    let {
      updateUserSuccess: onSuccess,
      updateUserError: onError
    } = this.actions;

    this.dispatch({ user, params });

    return UserAPI.updateUser(user, params)
      .then(onSuccess.bind(onSuccess, user))
      .catch(onError.bind(onError, user));
  }

  destroyUser(id) {
    this.dispatch({id});

    return UserAPI.destroyUser(id)
      .then(this.actions.destroyUserSuccess)
      .catch(this.actions.destroyUserError);
  }
}

export default alt.createActions(UserActionCreators);
