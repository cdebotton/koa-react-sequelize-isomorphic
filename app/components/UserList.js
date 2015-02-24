'use strict';

import React from "react";
import UserStore from"../stores/UserStore";
import ListHeader from "../components/ListHeader";
import ListenerMixin from "alt/mixins/ListenerMixin";
import UserListItem from "../components/UserListItem";

var { PropTypes } = React;

var UserList = React.createClass({
  mixins: [ListenerMixin],

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

  renderUserListItem(user, key) {
    return (
      <UserListItem
        user={user}
        key={key} />
    );
  },

  render() {
    let { users } = this.state;

    return (
      <div className="user-list">
        {users.length > 0 &&
          <ul className="users">
            <li className="titles">
              <ListHeader className="user-id" sortProperty="id">ID</ListHeader>
              <ListHeader className="user-link" sortProperty="email">Email</ListHeader>
              <ListHeader className="created-at" sortProperty="createdAt">Created at</ListHeader>
              <ListHeader className="updated-at" sortProperty="updatedAt">Updated at</ListHeader>
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

export default UserList;
