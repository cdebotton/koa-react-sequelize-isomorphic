'use strict';

import React from "react/addons";
import UserAPI from "../utils/UserAPI";
import UserStore from "../stores/UserStore";
import StoreListenerMixin from "../mixins/StoreListenerMixin";
import UserViewActionCreators from "../actions/UserViewActionCreators";

var {LinkedStateMixin} = React.addons;

var UsersRoute = React.createClass({
  mixins: [LinkedStateMixin, StoreListenerMixin(UserStore)],

  statics: {
    fetchData(params, query) {
      return UserAPI.getUsers();
    }
  },

  getStateFromStores() {
    var email = null;
    var {users} = UserStore.getState();

    return {email, users};
  },

  handleSubmit(event) {
    event.preventDefault();
    var {email} = this.state;
    this.setState({ email: null });
    UserViewActionCreators.createUser(email);
  },

  renderUserListItem(user, key) {
    return (
      <li key={key}>
        {user.email}
      </li>
    );
  },

  render() {
    var {users} = this.state;

    return (
      <div className="users-router">
        <h2>Users Route</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="email" placeholder="email" valueLink={this.linkState('email')} />
          <button type="submit">Create user</button>
        </form>
        {users.length > 0 &&
          <ul className="users">{users.map(this.renderUserListItem)}</ul>
        }
        {users.length === 0 &&
          <p>No users.</p>
        }
      </div>
    );
  }
});

export default UsersRoute;
