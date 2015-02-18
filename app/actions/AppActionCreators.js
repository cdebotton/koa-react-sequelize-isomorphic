'use strict';

import alt from "../alt";

class AppActionCreators {
  constructor() {
    this.generateActions(
      'request',
      'toggle',
      'activate',
      'deactivate'
    );
  }
}

export default alt.createActions(AppActionCreators);
