import AppActionCreators from "../actions/AppActionCreators";
import flux from "../flux";

class AppStore {
  constructor() {
    this.bindActions(AppActionCreators);
    this.toggle = false;
  }

  onToggle(data = {}) {
    this.toggle = !this.toggle;
  }

  onActivate(data = {}) {
    this.toggle = true;
  }

  onDeactivate(data = {}) {
    this.toggle = false;
  }
}

export default flux.createStore(AppStore);
