'use strict';

import AppActionCreators from "../actions/AppActionCreators";
import AppDispatcher from "../dispatcher/AppDispatcher";
import {FluxStore} from "../utils/FluxUtils";

class AppStore extends FluxStore {
  registerListeners() {
    return [AppActionCreators];
  }

  getInitialState() {
    return {toggle: false};
  }

  getState() {
    let { toggle } = this;

    return { toggle };
  }

  onToggle() {
    this.toggle = !this.toggle;
  }

  onActivate() {
    this.toggle = true;
  }

  onDeactivate() {
    this.toggle = false;
  }
};

export default new AppStore();
