'use strict';

import Immutable from "immutable";
import assign from "object-assign";
import {EventEmitter} from "events";
import invariant from "react/lib/invariant";
import AppDispatcher from "../dispatcher/AppDispatcher";

require('babel/polyfill');

/**
 * Module constants
 */

const CHANGE_EVENT = 'change';
const noop = function() {};
const BUILT_IN_METHODS = Object.getOwnPropertyNames(noop.prototype);


/**
 * Module helper functions
 */

var storeCache = Immutable.Map();
var toString = (obj) => Object.prototype.toString.call(obj);
var isFn = (obj) => toString(obj) === '[object Function]';
var isObj = (obj) => toString(obj) === '[object Object]';
var isStr = (obj) => toString(obj) === '[object String]';
var on = (str) => 'on' + str.charAt(0).toUpperCase() + str.slice(1);
var mergeArgs = (arg, args) => args.length > 0 ? [arg].concat(args) : arg;

/**
 * Generate the context for action handlers.
 */

var createHandler = (sym) => {
  return {
    handleViewAction(arg, ...args) {
      AppDispatcher.handleViewAction({
        type: sym,
        body: mergeArgs(arg, args)
      });
    },

    handleServerAction(arg, ...args) {
      AppDispatcher.handleServerAction({
        type: sym,
        body: mergeArgs(arg, args)
      });
    }
  };
};

/**
 * Dynamically require ActionCreators.
 */

var getCreator = (listener, storeName) => {
  if (isStr(listener)) {
    let name = listener.charAt(0).toUpperCase() +
      listener.slice(1) +
      'ActionCreators';
    try {
      return require(`../actions/${name}`);
    }
    catch (err) {
      console.warn(
        `${storeName}.prototype.registerListeners(...): ` +
        `Named ActionCreator '${listener}' doesn't exist, please ` +
        `create '../actions/${name}.js'.`
      );
    }
  }
  else {
    return listener;
  }
};

/**
 * Base for Flux ActionCreators.
 */

export class FluxActionCreators {
  constructor() {
    let name = this.constructor.name;
    let keys = Reflect.ownKeys(this.constructor.prototype)
      .filter(key => BUILT_IN_METHODS.indexOf(key) === -1);

    this.__HANDLERS__ = [];

    for (let key of keys) {
      let fn = this[key];
      let sym = Symbol(`action creator ${name}.prototype.${key}`);
      let handler = createHandler(sym);

      console.log(handler.api);

      this.__HANDLERS__.push([sym, on(key)]);

      this[key] = fn.bind(handler);
    }
  }
}

/**
 * Base for Flux Store
 */

export class FluxStore extends EventEmitter {
  constructor() {
    let {name} = this.constructor;
    let handlers = {};
    let listeners = this.registerListeners()
      .map(listener => getCreator(listener, name));

    let state = this.getInitialState();

    invariant(
      Array.isArray(listeners),
      `${name}.prototype.registerListeners(...) must return an array of ` +
      `ActionCreators to bind.`
    );

    invariant(
      isObj(state),
      `${name}.prototype.getInitialState(...) must return and object.`
    );

    storeCache = storeCache.set(name, this.getState.bind(this));
    this.setMaxListeners(0);
    this.state = Immutable.fromJS(state);

    listeners.reduce((memo, listener) => {
      try {
        listener.__HANDLERS__.forEach(handler => {
          let [key, fn] = handler;
          memo[key] = fn;
        });
      }
      catch (err) {
        return memo;
      }
    }, handlers);

    this.dispatchToken = AppDispatcher.register(payload => {
      let {action} = payload;
      let {type, body} = action;
      let responder = this[handlers[type]];

      if (handlers[type] && responder) {
        body = Array.isArray(body) ? body : [body];

        let result = responder.apply(this, body);

        if (result === false) {
          return false;
        }

        this.emitChange();
      }
    });
  }

  getInitialState() {
    return Immutable.Map();
  }

  getState() {
    let {state} = this;

    return state.toJS();
  }

  setState(params) {
    this.state = this.state.merge(params);
  }

  registerListeners() {
    return [];
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

/**
 * Inject elements into immutable list.
 */

export var injectIntoList = (list, results) => {
  list = Immutable.fromJS(list);

  let ids = list.map(item => item.id || item.get('id'));
  let toAdd = results.filter(item => ids.indexOf(item.id) === -1);

  return list.concat(Immutable.fromJS(toAdd));
};

/**
 * Determine if list contains an ID.
 */

export var isInList = (list, item) => {
  let ids = list.map(item => item.id || item.get('id'));
  let id = item.id || item.get('id');

  return ids.indexOf(id) === -1;
};

/**
 * Take snapshot of the current state of the stores.
 */

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

/**
 * Inject a snapshot into registered stores.
 */

export var hydrate = (snapshot) => {

};

export var initialize = () => {

};
