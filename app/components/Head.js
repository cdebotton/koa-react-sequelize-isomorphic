import React from "react";

var Head = React.createClass({
  propTypes: {
    env: React.PropTypes.string
  },

  getDefaultProps() {
    return {env: 'development'};
  },

  render() {
    const {env} = this.props;
    const DEV = env === 'development';
    const CSS = DEV ? '/stylesheets/app.css' : '/stylesheets/app.min.css';

    return (
      <head>
        <title>React/Koa/Isomorphic Scaffold</title>
        <link rel="stylesheet" href={CSS} />
      </head>
    );
  }
});

export default Head;
