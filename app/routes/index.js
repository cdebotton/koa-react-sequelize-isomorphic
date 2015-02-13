'use strict';

import React from "react";
import {Route, DefaultRoute} from "react-router";

import App from "../components/App";
import IndexRoute from "./IndexRoute";
import UsersRoute from "./UsersRoute";
import UserRoute from "./UserRoute";

const routes = (
  <Route handler={App}>
    <DefaultRoute name="index" handler={IndexRoute} />
    <Route name="users" handler={UsersRoute}>
      <Route name="user" path=":userId" handler={UserRoute} />
    </Route>
  </Route>
);

export default routes;
