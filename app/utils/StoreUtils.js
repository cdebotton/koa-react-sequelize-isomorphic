'use strict';

import {EventEmitter} from "events";
import assign from "object-assign";

const CHANGE_EVENT = 'change';
var toString = (obj) => Object.prototype.toString.call(obj);
var isFunc = (obj) => toString(obj) === '[object Function]';

export var createStore = (spec) => {
  let store = assign({
    emitChange() {
      this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    }
  }, spec, EventEmitter.prototype);

  Object.keys(store).forEach((key) => {
    if (isFunc(store[key])) {
      store[key] = store[key].bind(store);
    }
  });

  store.setMaxListeners(0);

  return store;
};
