import flux from "../flux";

class AppActionCreators {
  constructor() {
    this.generateActions(
      'toggle',
      'activate',
      'deactivate'
    );
  }
}

export default flux.createActions(AppActionCreators);
