'use strict';

import AppDispatcher from "../dispatcher/AppDispatcher";
import {FluxStore} from "../utils/StoreUtils";

class AppStore extends FluxStore {
  constructor() {
    super(this);

    this.toggle = false;

    this.listenTo({
      'TOGGLE': 'onToggle',
      'ACTIVATE': 'onActivate',
      'DEACTIVATE': 'onDeactivate'
    });
  }

  getState() {
    let {toggle} = this;

    return {toggle};
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
