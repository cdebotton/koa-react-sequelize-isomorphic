import {FluxActionCreators} from "../utils/FluxUtils";


class AppActionCreators extends FluxActionCreators {
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
