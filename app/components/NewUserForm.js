'use strict';

import React from "react/addons";
import UserActionCreators from "../actions/UserActionCreators";

var { LinkedStateMixin } = React.addons;

var NewUserForm = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState() {
    return { email: '' };
  },

  handleSubmit(event) {
    event.preventDefault();

    let { email } = this.state;

    this.setState({ email: null });

    UserActionCreators.createUser(email);
  },

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="email"
          placeholder="email"
          valueLink={this.linkState('email')} />
        <button type="submit">Create user</button>
      </form>
    );
  }
});

export default NewUserForm;
