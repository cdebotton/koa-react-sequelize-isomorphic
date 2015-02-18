'use strict';

import React from "react";
import PostStore from "../stores/PostStore";
import ListenerMixin from "alt/mixins/ListenerMixin";
import AppActionCreators from "../actions/AppActionCreators";
import PostActionCreators from "../actions/PostActionCreators";

var IndexRoute = React.createClass({
  mixins: [ListenerMixin],

  statics: {
    fetchData(params, query) {
      return PostActionCreators.getPosts();
    }
  },

  getInitialState() {
    let { posts } = PostStore.getState();

    return { posts };
  },

  componentWillMount() {
    this.listenTo(PostStore, this.onChange);
  },

  onChange() {
    this.setState(this.getInitialState());
  },

  onActivate() {
    AppActionCreators.activate();
  },

  onDeactivate() {
    AppActionCreators.deactivate();
  },

  onToggle() {
    AppActionCreators.toggle();
  },

  renderPhotoData(postId, photo, key) {
    var {url, width, height} = photo.alt_sizes[0];
    return (
      <img
        key={postId + '.image.' + key}
        src={url}
        width={width}
        height={height} />
    );
  },

  renderPostItem(post, key) {
    var delay = `${500 + (key * 125)}ms`;
    var styles = {
      animationDelay: delay,
      WebkitAnimationDelay: delay,
      MozAnimationDelay: delay,
      MsAnimationDelay: delay
    };


    return (
      <li key={post.id} className="post" style={styles}>
        {post.caption &&
          <span dangerouslySetInnerHTML={{__html: post.caption}} />
        }
        {post.player &&
          <div dangerouslySetInnerHTML={{__html: post.player[2].embed_code}} />
        }
        {post.photos &&
          <ul>{post.photos.map(this.renderPhotoData.bind(this, post.id))}</ul>
        }
      </li>
    );
  },

  render() {
    var {posts} = this.state;

    return (
      <div className="index-route">
        <h2>IndexRoute <i className="fa fa-home" /></h2>
        <nav>
          <button onClick={this.onActivate}>Activate</button>
          <button onClick={this.onDeactivate}>Deactivate</button>
          <button onClick={this.onToggle}>Toggle</button>
        </nav>
        {posts &&
          <ul className="post-wall">{posts.map(this.renderPostItem)}</ul>
        }
      </div>
    );
  }
});

export default IndexRoute;
