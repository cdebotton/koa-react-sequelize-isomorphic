'use strict';

import React from "react/addons";
import UserAPI from "../utils/UserAPI";
import UserStore from "../stores/UserStore";
import {Link, RouteHandler} from "react-router";
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
    var handleDestroy = (id) => {
      return (event) => {
        event.preventDefault();
        UserViewActionCreators.destroyUser(id);
      }
    };

    return (
      <li key={key}>
        <i className="fa fa-users" />
        {user.id &&
          <Link to="user" params={{userId: user.id}}>{user.email}</Link>
        }
        {!user.id &&
          user.email
        }
        {user.id &&
          <button
            type="button"
            onClick={handleDestroy(user.id)}>
            Delete
          </button>
        }
      </li>
    );
  },

  render() {
    var {users} = this.state;

    return (
      <div className="users-router">
        <h2>Users Route</h2>
        <RouteHandler />
        <h3>User List</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            placeholder="email"
            valueLink={this.linkState('email')} />
          <button type="submit">Create user</button>
        </form>
        {users.length > 0 &&
          <ul className="users">
            {users.map(this.renderUserListItem)}
          </ul>
        }
        {users.length === 0 &&
          <p>No users.</p>
        }
      </div>
    );
  }
});

export default UsersRoute;
