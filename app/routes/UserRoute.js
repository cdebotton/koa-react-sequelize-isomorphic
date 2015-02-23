'use strict';

import React from "react/addons";
import UserStore from "../stores/UserStore";
import ProfileStore from "../stores/ProfileStore";
import ListenerMixin from "alt/mixins/ListenerMixin";
import UserActionCreators from "../actions/UserActionCreators";

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
    let user = UserStore.getById(userId) || {};
    let profile = ProfileStore.getByUserId(userId) || {};

    return { user, profile };
  },

  componentWillMount() {
    this.listenTo(UserStore, this.onChange);
    this.listenTo(ProfileStore, this.onChange);
  },

  onChange() {
    this.setState(this.getInitialState());
  },

  handleSubmit(event) {
    event.preventDefault();

    let { user, profile } = this.state;
    let email = this.refs.email.getDOMNode().value;

    UserActionCreators.updateUser(user, { email });

    this.transitionTo('users');
  },

  handleCancel(event) {
    event.preventDefault();

    this.transitionTo('users');
  },

  render() {
    let { user, profile } = this.state;

    return (
      <div className="user-route">
        <h3>User Route</h3>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <label htmlFor="user-email">Email</label>
            <input
              key={`user-email-${user.id}`}
              id="user-email"
              ref="email"
              type="email"
              placeholder="email"
              defaultValue={user.email} />
          </fieldset>
          <fieldset>
            <label htmlFor="first-name">Name</label>
            <input
              key={`profile-firstName-${profile.id}`}
              id="first-name"
              ref="firstName"
              type="text"
              placeholder="First name"
              defaultValue={profile.firstName} />
            <input
              key={`profile-middleName-${profile.id}`}
              ref="middleName"
              type="text"
              placeholder="Middle name"
              defaultValue={profile.middleName} />
            <input
              key={`profile-lastName-${profile.id}`}
              ref="lastName"
              type="text"
              placeholder="Last name"
              defaultValue={profile.lastName} />
          </fieldset>
          <button type="submit">Save</button>
          <button type="reset" onClick={this.handleCancel}>Cancel</button>
        </form>
      </div>
    );
  }
});

export default UserRoute;
