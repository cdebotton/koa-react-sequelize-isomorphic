'use strict';

import assign from "object-assign";
import {EventEmitter} from "events";
import AppDispatcher from "../dispatcher/AppDispatcher";
import Immutable from "immutable";

require('babel/polyfill');

const CHANGE_EVENT = 'change';
const NOOP = function() {};
const BUILT_IN_METHODS = Object.getOwnPropertyNames(NOOP.prototype);

var storeCache = Immutable.Map();
var toString = (obj) => Object.prototype.toString.call(obj);
var isFn = (obj) => toString(obj) === '[object Function]';
var on = (str) => 'on' + str.charAt(0).toUpperCase() + str.slice(1);

export class FluxActionCreators {
  constructor(ctx) {
    let name = ctx.constructor.name;
    let keys = Reflect.ownKeys(ctx.constructor.prototype)
      .filter(key => BUILT_IN_METHODS.indexOf(key) === -1);

    this.handlers = {};

    for (let key of keys) {
      let fn = ctx[key];
      let sym = Symbol(`action creator ${name}.prototype.${key}`);

      this.handlers[sym] = on(key);

      ctx[key] = fn.bind(this, sym);
    }
  }

  dispatch() {

  }
}

export class FluxStore extends EventEmitter {
  constructor(context) {
    let {name} = this.constructor;
    storeCache = storeCache.set(name, this.getState.bind(context));
    context.setMaxListeners(0);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  listenTo(actions) {
    this.dispatchToken = AppDispatcher.register(payload => {
      let {action} = payload;
      let {type} = action;
      let keys = Object.keys(actions);
      let index = keys.indexOf(type);
      let fn = this[actions[type]];

      if (keys.indexOf(type) > -1 && isFn(fn)) {
        let result = fn.call(this, action);
        if (result === false) return false;
      }

      this.emitChange();
    });
  }
}

export var snapshot = () => {
  let snapshot = storeCache.reduce((memo, state, key) => {
    try {
      memo[key] = state();
    }
    catch (err) {
      memo[key] = {};
    }

    return memo;
  }, {});

  return snapshot;
};

export var hydrate = (snapshot) => {

};
