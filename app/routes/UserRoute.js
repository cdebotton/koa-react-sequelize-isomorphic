'use strict';

import React from "react/addons";
import UserStore from "../stores/UserStore";
import UserActionCreators from "../actions/UserActionCreators";
import {
  State as RouterStateMixin,
  Navigation as NavigationMixin
} from "react-router";

let { LinkedStateMixin } = React.addons;

var UserRoute = React.createClass({
  mixins: [RouterStateMixin, LinkedStateMixin, NavigationMixin],

  statics: {
    fetchData({ params }) {
      let { userId } = params;

      return UserActionCreators.getUser(userId);
    }
  },

  getInitialState() {
    let { userId } = this.getParams();
    let user = UserStore.getById(userId);

    return { user };
  },

  handleSubmit(event) {
    event.preventDefault();

    let { user } = this.state;
    let email = this.refs.email.getDOMNode().value;

    UserActionCreators.updateUser(user, { email });

    this.transitionTo('users');
  },

  render() {
    return (
      <div className="user-route">
        <h3>User Route</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            ref="email"
            type="email"
            placeholder="email"
            defaultValue={this.state.user.email} />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
});

export default UserRoute;
