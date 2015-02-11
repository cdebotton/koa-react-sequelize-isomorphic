'use strict';

import {Dispatcher} from "flux";
import assign from "object-assign";
import invariant from "react/lib/invariant";
import PayloadSources from "../constants/PayloadSources";

const IS_DEV = process.env.NODE_ENV === 'development';

export default assign(new Dispatcher(), {
  handleServerAction(action) {
    if (IS_DEV) {
      console.log('Server Action:', action);
    }

    invariant(action, 'You must provide an action to dispatch');

    this.dispatch({
      source: PayloadSources.SERVER_ACTION,
      action: action
    });
  },

  handleViewAction(action) {
    if (IS_DEV) {
      console.log('View Action:', action);
    }

    invariant(action, 'You must provide an action to dispatch');

    this.dispatch({
      source: PayloadSources.VIEW_ACTION,
      action: action
    });
  }
});
