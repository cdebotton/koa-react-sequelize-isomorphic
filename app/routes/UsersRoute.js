"use strict";

import React from "react";
import { RouteHandler } from "react-router";
import UserList from "../components/UserList";
import ProfileStore from "../stores/ProfileStore";
import NewUserForm from "../components/NewUserForm";
import UserActionCreators from "../actions/UserActionCreators";

var UsersRoute = React.createClass({
  statics: {
    fetchData(params, query) {
      return UserActionCreators.getUsers();
    }
  },

  render() {
    return (
      <div className="users-router">
        <h2>Users Route</h2>
        <h3>User List</h3>
        <NewUserForm />
        <RouteHandler />
        <UserList />
      </div>
    );
  }
});

export default UsersRoute;
