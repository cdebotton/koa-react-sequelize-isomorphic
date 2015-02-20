'use strict';

import Head from "./Head";
import React from "react/addons";
import AppStore from "../stores/AppStore";
import {RouteHandler, Link} from "react-router";
import ListenerMixin from "alt/mixins/ListenerMixin";

var {classSet} = React.addons;
var {PropTypes} = React;

var App = React.createClass({
  mixins: [ListenerMixin],

  propTypes: {
    env: PropTypes.string,
    snapshot: PropTypes.string
  },

  getInitialState() {
    let { toggle } = AppStore.getState();

    return { toggle };
  },

  componentWillMount() {
    this.listenTo(AppStore, this.onChange);
  },

  onChange() {
    this.setState(this.getInitialState());
  },

  getDefaultProps() {
    return {env: 'development'};
  },

  render() {
    var cx = classSet({
      title: true,
      active: this.state.toggle
    });

    return (
      <html lang="en">
      <Head {...this.props} />
      <body>
        <div className="container">
          <h1 className={cx}>React Isomorphic Starter Kit</h1>
          <p>This is an example of an Isomorphic application written on React &amp; Flux.</p>
          <nav className="navigation">
            <Link to="index">Home</Link>
            <Link to="users">Users</Link>
          </nav>
          <RouteHandler />
        </div>
      </body>
      </html>
    );
  }
});

export default App;
