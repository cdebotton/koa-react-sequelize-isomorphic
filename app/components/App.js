import React from "react/addons";
import {RouteHandler} from "react-router";
import AppStore from "../stores/AppStore";
import Head from "./Head";

var {classSet} = React.addons;
var {PropTypes} = React;

var App = React.createClass({
  propTypes: {
    env: PropTypes.string
  },

  getInitialState() {
    var {toggle} = AppStore.getState();
    return {toggle};
  },

  getDefaultProps() {
    return {env: 'development'};
  },

  componentDidMount() {
    AppStore.addChangeListener(this.getStoreData);
  },

  componentWillUnmount() {
    AppStore.removeChangeListener(this.getStoreData);
  },

  getStoreData() {
    this.setState(this.getInitialState());
  },

  render() {
    const {toggle} = this.state;
    const {env} = this.props;
    const DEV = env === 'development';
    const BUNDLE = DEV ?
      'http://localhost:9000/dist/bundle.js' : '/bundle.min.js';
    const LR = DEV ?
      <script src="http://localhost:35729/livereload.js?snipver=1" /> : false;

    var cx = classSet({
      title: true,
      active: toggle
    });

    return (
      <html lang="en">
      <Head env={env} />
      <body>
        <div className="container">
          <h1 className={cx}>React Isomorphic Starter Kit</h1>
          <RouteHandler />
        </div>
        <script src={BUNDLE} />
        {LR}
      </body>
      </html>
    );
  }
});

export default App;
