import React from "react/addons";
import {RouteHandler} from "react-router";
import Head from "./Head";
import AppStore from "../stores/AppStore";
import {StoreListenerMixin} from "fluxd";

var {classSet} = React.addons;

var App = React.createClass({
  mixins: [StoreListenerMixin],

  propTypes: {
    env: React.PropTypes.string
  },

  getInitialState() {
    var {toggle} = AppStore.getState();

    return {toggle};
  },

  getDefaultProps() {
    return {env: 'development'};
  },

  componentDidMount() {
    this.listenTo(AppStore, this.onChange.bind(this));
  },

  onChange() {
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
