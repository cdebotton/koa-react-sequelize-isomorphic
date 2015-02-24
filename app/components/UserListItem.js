'use strict';

import React from "react";
import moment from "moment";
import UserActionCreators from "../actions/UserActionCreators";
import { Link, State as RouterStateMixin } from "react-router";

var { PropTypes } = React;

var UserListItem = React.createClass({
  mixins: [RouterStateMixin],

  propTypes: {
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired
    }).isRequired
  },

  handleDestroy(event) {
    event.preventDefault();
    let { user } = this.props;
    UserActionCreators.destroyUser(user.id);
  },

  render() {
    let { user } = this.props;

    return (
      <li className="user">
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
            onClick={this.handleDestroy}>
            Delete
          </button>
        }
      </li>
    );
  }
});

export default UserListItem;
