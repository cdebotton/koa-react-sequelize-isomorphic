"use strict";

import React from "react";
import UserStore from"../stores/UserStore";
import ListHeader from "../components/ListHeader";
import ListenerMixin from "alt/mixins/ListenerMixin";
import UserListItem from "../components/UserListItem";
import { toSortedList } from "../utils/ImmutableHelpers";

var { PropTypes } = React;

var UserList = React.createClass({
  mixins: [ListenerMixin],

  getInitialState() {
    let { users, sortProperty, sortOrder } = UserStore.getState();

    return { users, sortProperty, sortOrder };
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
    let { users, sortProperty, sortOrder } = this.state;
    let userList = toSortedList(users, sortProperty, sortOrder);

    return (
      <div className="user-list">
        {userList.length > 0 &&
          <ul className="users">
            <li className="titles">
              <ListHeader
                className="user-id"
                sortProperty="id"
                children="ID" />
              <ListHeader
                className="user-link"
                sortProperty="email"
                children="Email" />
              <ListHeader
                className="created-at"
                sortProperty="createdAt"
                children="Created at" />
              <ListHeader
                className="updated-at"
                sortProperty="updatedAt"
                children="Updated at" />
            </li>
            {userList.map(this.renderUserListItem)}
          </ul>
        }
        {userList.length === 0 &&
          <p>No users.</p>
        }
      </div>
    );
  }
});

export default UserList;
