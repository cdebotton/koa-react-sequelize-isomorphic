import {FluxActionCreators} from "../utils/FluxUtils";

// Bad syntax, need to imply action source somehow. Also not
// a fan of the symbol syntax.

class AppActionCreators extends FluxActionCreators {
  constructor() {
    super(this);
  }

  request(symbol, data) {
    this.view(symbol, data);
  }

  toggle(symbol, data) {
    this.view(symbol, data);
  }

  activate(symbol, data) {
    this.view(symbol, data);
  }

  deactivate(symbol, data) {
    this.view(symbol, data);
  }
}

export default new AppActionCreators();
