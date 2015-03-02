"use strict";

require("babel/polyfill");

import React from "react";
import router from "./router";
import ReactRouter from "react-router";
import alt from "./alt"

var renderData = (Handler, state) => {
  state.env = process.env.NODE_ENV || "development";
  return (data) => React.render(<Handler {...state} />, document);
};

let bootstrapped = false;

router.run((Handler, state) => {
  if (!bootstrapped) {
    let { snapshot } = window;
    alt.bootstrap(snapshot);

    bootstrapped = true;
  }
  else {
    let promises = state.routes
      .filter(route => route.handler.fetchData)
      .map(route => route.handler.fetchData(state));

    Promise.all(promises);
  }

  let renderer = renderData(Handler, state);
  renderer();
});
