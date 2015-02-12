'use strict';

import React from "react";
import ReactRouter from "react-router";
import router from "./router";
import Promise from "bluebird";

require('6to5/polyfill');

router.run((Handler, state) => {
  let promises = state.routes.filter(route => route.handler.fetchData)
    .map(route => route.handler.fetchData(state.params, state.query));

  Promise.all(promises);

  React.render(<Handler {...state} />, document);
});
