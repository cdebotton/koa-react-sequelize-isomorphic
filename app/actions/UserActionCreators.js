'use strict';

import {FluxActionCreators} from "../utils/FluxUtils";
import UserAPI from "../utils/UserAPI";

class UserActionCreators extends FluxActionCreators {
  getUsers() {
    this.handleViewAction();
  }

  getUsersSuccess(users) {
    this.handleServerAction({users})
  }

  getUsersError(err) {
    this.handleServerAction(err);
  }

  createUser(email) {
    this.handleViewAction({email});

    UserAPI.createUser(email);
  }

  createUserSuccess(user) {
    this.handleServerAction({user});
  }

  createUserError(err) {
    this.handleServerAction({err});
  }

  destroyUser(id) {
    this.handleViewAction({id});

    UserAPI.destroyUser(id);
  }

  destroyUserSuccess(user) {
    this.handleServerAction({user});
  }

  destroyUserError(err) {
    this.handleServerAction({err});
  }
}

export default new UserActionCreators();
