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
    this.dispatch({email});

    return UserAPI.createUser(email)
      .then(this.actions.createUserSuccess)
      .catch(this.actions.createUserError);
  }

  destroyUser(id) {
    this.dispatch({id});

    return UserAPI.destroyUser(id)
      .then(this.actions.destroyUserSuccess)
      .catch(this.actions.destroyUserError);
  }
}

export default alt.createActions(UserActionCreators);
