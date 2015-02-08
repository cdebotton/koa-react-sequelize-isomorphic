import React from "react";
import {Route, DefaultRoute} from "react-router";

import App from "../components/App";
import IndexRoute from "../routes/IndexRoute";

const routes = (
  <Route handler={App}>
    <DefaultRoute name="index" handler={IndexRoute} />
  </Route>
);

export default routes;
