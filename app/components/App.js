'use strict';

import Head from "./Head";
import React from "react/addons";
import AppStore from "../stores/AppStore";
import {RouteHandler, Link} from "react-router";
import ListenerMixin from "alt/mixins/ListenerMixin";
import escapeTextForBrowser from "react/lib/escapeTextForBrowser";

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
    const {env, snapshot} = this.props;
    const DEV = env === 'development';

    var cx = classSet({
      title: true,
      active: this.state.toggle
    });

    return (
      <html lang="en">
      <Head env={env} />
      <body>
        <div className="container">
          <h1 className={cx}>React Isomorphic Starter Kit</h1>
          <p>This is an example of an Isomorphic application written on React &amp; Flux.</p>
          <nav>
            <Link to="index">Home</Link>
            <Link to="users">Users</Link>
          </nav>
          <RouteHandler />
        </div>
        <script dangerouslySetInnerHTML={{__html: 'var snapshot = ' + escapeTextForBrowser(snapshot) + ';'}} />
        <script src={DEV ? 'http://localhost:9000/dist/bundle.js' : '/bundle.min.js'} />
        {DEV &&
          <script src="http://localhost:35729/livereload.js?snipver=1" />
        }
      </body>
      </html>
    );
  }
});

export default App;
