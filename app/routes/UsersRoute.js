'use strict';

import moment from "moment";
import React from "react/addons";
import UserStore from "../stores/UserStore";
import {Link, RouteHandler} from "react-router";
import ListHeader from "../components/ListHeader";
import ListenerMixin from "alt/mixins/ListenerMixin";
import UserActionCreators from "../actions/UserActionCreators";

var {LinkedStateMixin} = React.addons;

var UsersRoute = React.createClass({
  mixins: [LinkedStateMixin, ListenerMixin],

  statics: {
    fetchData(params, query) {
      return UserActionCreators.getUsers();
    }
  },

  getInitialState() {
    let { users } = UserStore.getSorted();

    return { users };
  },

  componentWillMount() {
    this.listenTo(UserStore, this.onChange);
  },

  onChange() {
    this.setState(this.getInitialState());
  },

  handleSubmit(event) {
    event.preventDefault();
    var {email} = this.state;
    this.setState({ email: null });
    UserActionCreators.createUser(email);
  },

  renderUserListItem(user, key) {
    var handleDestroy = (id) => {
      return (event) => {
        event.preventDefault();
        UserActionCreators.destroyUser(id);
      }
    };

    return (
      <li className="user" key={key}>
        <i className="user-id fa fa-users">{user.id ? user.id : ''}</i>
        {user.id &&
          <Link className="user-link" to="user" params={{userId: user.id}}>{user.email}</Link>
        }
        {user.createdAt &&
          <span className="created-at">{moment(user.createdAt).fromNow()}</span>
        }
        {user.updatedAt &&
          <span className="updated-at">{moment(user.updatedAt).fromNow()}</span>
        }
        {!user.id &&
          <span className="user-text">user.email</span>
        }
        {user.id &&
          <button
            className="user-destroy"
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
        <h3>User List</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            placeholder="email"
            valueLink={this.linkState('email')} />
          <button type="submit">Create user</button>
        </form>
        <RouteHandler />
        {users.length > 0 &&
          <ul className="users">
            <li className="titles">
              <ListHeader className="user-id" sortProperty="id">ID</ListHeader>
              <ListHeader className="user-link" sortProperty="email">Email</ListHeader>
              <ListHeader className="created-at" sortProperty="createdAt">Created at</ListHeader>
              <ListHeader className="updated-at" sortProperty="updatedAt">Created at</ListHeader>
            </li>
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
