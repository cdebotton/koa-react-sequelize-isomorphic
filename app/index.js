'use strict';

import React from "react";
import ReactRouter from "react-router";
import router from "./router";
import Promise from "bluebird";

require('6to5/polyfill');

var firstCall = true;

var renderData = (Handler, state) => {
  return (data) => React.render(<Handler {...state} />, document);
};

router.run((Handler, state) => {
  let promises = state.routes
    .filter(route => route.handler.fetchData)
    .map(route => route.handler.fetchData(state.params, state.query));

  let renderer = renderData(Handler, state);
  let promise = Promise.all(promises);

  if (firstCall) {
    firstCall = false;
    promise.then(renderer);
  }
  else {
    renderer();
  }
});
