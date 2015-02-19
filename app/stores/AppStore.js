'use strict';

import alt from "../alt";
import AppActionCreators from "../actions/AppActionCreators";

class AppStore {
  constructor() {
    this.bindActions(AppActionCreators);
    this.toggle = false;
  }

  onToggle() {
    let { toggle } = this;
    this.toggle = !toggle;
  }

  onActivate() {
    this.toggle = true;
  }

  onDeactivate() {
    this.toggle = false;
  }
}

export default alt.createStore(AppStore, 'AppStore');
