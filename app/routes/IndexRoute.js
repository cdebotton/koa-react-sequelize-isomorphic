import React from "react";
import AppActionCreators from "../actions/AppActionCreators";

var IndexRoute = React.createClass({
  onActivate() {
    AppActionCreators.activate();
  },

  onDeactivate() {
    AppActionCreators.deactivate();
  },

  onToggle() {
    AppActionCreators.toggle();
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
