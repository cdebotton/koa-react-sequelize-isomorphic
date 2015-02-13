import {EventEmitter} from "events";

const CHANGE_EVENT = 'change';
var isFn = (obj) => Object.prototype.toString
  .call(obj) === '[object Function]';

export class Store extends EventEmitter {
  bindContext(ctx) {
    Object.keys(ctx).forEach(key => {
      if (let fn = ctx[key] && isFn(fn)) {
        ctx[key] = fn.bind(ctx);
      }
    });
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.off(CHANGE_EVENT, callback);
  }

  bindActions(...actions) {
    Object.keys(actions).forEach(creator => {

    });
  }
};

Store.setMaxListeners(0);

export default Store;

// BEGIN - Example

import Immutable from "immutable";
import {Store} from "../utils/Flux";
import {ViewActions, ServerActions} from "../actions/UserActionCreators";

class UserStore extends Store {
  constructor() {
    this.bindContext(this);
    this.bindActions(ViewActions, ServerActions);
    this.users = Immutable.Map();
  }

  onGetUsers() {
    return false;
  }

  onGetUsersSuccess(users) {
    mergeIntoBag(this.users, users);
  }

  onGetUsersError(err) {
    return false;
  }
}

export default new UserStore();

// END - Example
