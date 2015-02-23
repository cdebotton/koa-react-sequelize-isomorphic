'use strict';

import alt from "../alt";
import assign from "object-assign";
import UserStore from "./UserStore";
import UserActionCreators from "../actions/UserActionCreators";

class ProfileStore {
  static getByUserId(id) {
    let { profiles } = this.getState();
    let userId = parseInt(id);

    return Object.keys(profiles)
      .map(key => profiles[key])
      .find(profile => profile.UserId === userId);
  }

  constructor() {
    this.bindActions(UserActionCreators);
    this.profiles = {};
  }

  onGetUsersSuccess(resp) {
    this.waitFor(UserStore.dispatchToken);
    let { profiles } = resp.entities;
    this.profiles = assign({}, this.profiles, profiles);
  }

  onDestroyUser(user) {

  }
};

export default alt.createStore(ProfileStore, 'ProfileStore');
