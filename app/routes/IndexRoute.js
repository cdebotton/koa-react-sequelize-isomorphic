'use strict';

import React from "react";
import TumblrAPI from "../utils/TumblrAPI";
import AppViewActionCreators from "../actions/AppViewActionCreators";
import Promise from "bluebird";

var IndexRoute = React.createClass({
  statics: {
    fetchData() {
      return TumblrAPI.posts();
    }
  },

  onActivate() {
    AppViewActionCreators.activate();
  },

  onDeactivate() {
    AppViewActionCreators.deactivate();
  },

  onToggle() {
    AppViewActionCreators.toggle();
  },

  render() {
    return (
      <div className="index-route">
        <h2>IndexRoute <i className="fa fa-home" /></h2>
        <button onClick={this.onActivate}>Activate</button>
        <button onClick={this.onDeactivate}>Deactivate</button>
        <button onClick={this.onToggle}>Toggle</button>
      </div>
    );
  }
});

export default IndexRoute;
