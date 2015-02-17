'use strict';

import {FluxStore} from "../utils/FluxUtils";

class AppStore extends FluxStore {
  registerListeners() {
    return ['app'];
  }

  getInitialState() {
    return {toggle: false};
  }

  onToggle() {
    let state = this.getState();
    let {toggle} = state;

    this.setState({toggle: !toggle});
  }

  onActivate() {
    this.setState({toggle: true});
  }

  onDeactivate() {
    this.setState({toggle: false});
  }
};

export default new AppStore();
