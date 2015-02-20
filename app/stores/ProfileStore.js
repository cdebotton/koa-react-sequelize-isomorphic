'use strict';

import UserStore from "./UserStore";
import alt from "../alt";

class ProfileStore {
  createUser(user) {
    this.waitFor([UserStore.dispatchToken]);
  }

  createUserSuccess([ref, user]) {
    this.waitFor([UserStore.dispatchToken]);
  }
};

export default alt.createStore(ProfileStore, 'ProfileStore');
