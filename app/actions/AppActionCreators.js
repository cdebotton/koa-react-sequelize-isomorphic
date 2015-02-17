import {FluxActionCreators} from "../utils/FluxUtils";

// Bad syntax, need to imply action source somehow. Also not
// a fan of the symbol syntax.

class AppActionCreators extends FluxActionCreators {
  constructor() {
    super(this);
  }

  request(data) {
    this.handleViewAction(data);
  }

  toggle(data) {
    this.handleViewAction(data);
  }

  activate(data) {
    this.handleViewAction(data);
  }

  deactivate(data) {
    this.handleViewAction(data);
  }
}

export default new AppActionCreators();
