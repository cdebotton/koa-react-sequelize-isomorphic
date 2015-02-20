'use strict';

import React from "react/addons";
import UserStore from "../stores/UserStore";
import UserActionCreators from "../actions/UserActionCreators";
import ListenerMixin from "alt/mixins/ListenerMixin";

import {
  State as RouterStateMixin,
  Navigation as NavigationMixin
} from "react-router";

let { LinkedStateMixin } = React.addons;

var UserRoute = React.createClass({
  mixins: [RouterStateMixin, LinkedStateMixin, NavigationMixin, ListenerMixin],

  statics: {
    fetchData({ params }) {
      let { userId } = params;

      return UserActionCreators.getUser(userId);
    }
  },

  getInitialState() {
    let { userId } = this.getParams();
    let user = UserStore.getById(userId);

    return user;
  },

  componentWillMount() {
    this.listenTo(UserStore, this.onChange);
  },

  onChange() {
    this.setState(this.getInitialState());
  },

  handleSubmit(event) {
    event.preventDefault();

    let { state } = this;
    let email = this.refs.email.getDOMNode().value;

    UserActionCreators.updateUser(state, { email });

    this.transitionTo('users');
  },

  handleCancel(event) {
    event.preventDefault();

    this.transitionTo('users');
  },

  render() {

    return (
      <div className="user-route">
        <h3>User Route</h3>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <label htmlFor="user-email">Email</label>
            <input
              id="user-email"
              ref="email"
              type="email"
              placeholder="email"
              valueLink={this.linkState('email')} />
          </fieldset>
          <fieldset>
            <label htmlFor="first-name">Name</label>
            <input
              id="first-name"
              ref="firstName"
              type="text"
              placeholder="First name"
              valueLink={this.linkState('firstName')} />
            <input
              ref="middleName"
              type="text"
              placeholder="Middle name"
              valueLink={this.linkState('middleName')} />
            <input
              ref="lastName"
              type="text"
              placeholder="Last name"
              valueLink={this.linkState('lastName')} />
          </fieldset>
          <button type="submit">Save</button>
          <button type="reset" onClick={this.handleCancel}>Cancel</button>
        </form>
      </div>
    );
  }
});

export default UserRoute;
