'use strict';

import React from "react";
import TumblrAPI from "../utils/TumblrAPI";
import AppViewActionCreators from "../actions/AppViewActionCreators";
import PostStore from "../stores/PostStore";
import StoreListenerMixin from "../mixins/StoreListenerMixin";

var IndexRoute = React.createClass({
  mixins: [StoreListenerMixin(PostStore)],

  statics: {
    willTransitionTo() {
      TumblrAPI.posts();
    }
  },

  getStateFromStores() {
    let {posts} = PostStore.getState();
    return {posts};
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

  renderPhotoData(photo) {
    var {url, width, height} = photo.alt_sizes[0];
    return (
      <img
        src={url}
        width={width}
        height={height} />
    );
  },

  renderPostData(post) {
    return (
      <li key={post.id}>
        {post.caption &&
          <span dangerouslySetInnerHTML={{__html: post.caption}} />
        }
        {post.player &&
          <div dangerouslySetInnerHTML={{__html: post.player[2].embed_code}} />
        }
        {post.photos &&
          <ul>{post.photos.map(this.renderPhotoData)}</ul>
        }
      </li>
    );
  },

  render() {
    var {posts} = this.state;

    return (
      <div className="index-route">
        <h2>IndexRoute <i className="fa fa-home" /></h2>
        <button onClick={this.onActivate}>Activate</button>
        <button onClick={this.onDeactivate}>Deactivate</button>
        <button onClick={this.onToggle}>Toggle</button>
        <ul>{posts.map(this.renderPostData)}</ul>
      </div>
    );
  }
});

export default IndexRoute;
