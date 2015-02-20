'use strict';

import React from "react/addons";
import UserStore from "../stores/UserStore";
import ListenerMixin from "alt/mixins/ListenerMixin";
import UserActionCreators from "../actions/UserActionCreators";

var { PropTypes } = React;
var { classSet } = React.addons;

var ListHeader = React.createClass({
  mixins: [ListenerMixin],

  propTypes: {
    sortProperty: PropTypes.string.isRequired,
    className: PropTypes.string
  },

  getInitialState() {
    let { sortProperty, sortOrder } = UserStore.getState();
    let active = sortProperty === this.props.sortProperty;

    return {sortOrder: 'asc', active};
  },

  componentWillMount() {
    this.listenTo(UserStore, () => this.setState(this.getInitialState()));
  },

  handleClick(event) {
    event.preventDefault();
    let { active } = this.state;
    let { sortProperty } = this.props;

    UserActionCreators.setSortProperty(sortProperty);
  },

  render() {
    let { title, className, children } = this.props;
    let { active } = this.state;

    let cx = classSet({
      'header': true,
      [className]: className ? true : false,
      'active': active
    });

    return (
      <span
        className={cx}
        onClick={this.handleClick}>
        {children}
      </span>
    );
  }
});

export default ListHeader;
