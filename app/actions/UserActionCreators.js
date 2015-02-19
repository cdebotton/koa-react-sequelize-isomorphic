'use strict';

import alt from "../alt";
import UserAPI from "../utils/UserAPI";

class UserActionCreators {
  constructor() {
    this.generateActions(
      'getUsersSuccess',
      'getUsersError',
      'createUserSuccess',
      'createUserError',
      'destroyUserSuccess',
      'destroyUserError'
    );
  }

  getUsers() {
    this.dispatch();

    return UserAPI.getUsers()
      .then(this.actions.getUsersSuccess)
      .catch(this.actions.getUsersError);
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

  destroyUser(id) {
    this.dispatch({id});

    return UserAPI.destroyUser(id)
      .then(this.actions.destroyUserSuccess)
      .catch(this.actions.destroyUserError);
  }
}

export default alt.createActions(UserActionCreators);
