'use strict';

import alt from "../alt";
import assign from "object-assign";
import PostActionCreators from "../actions/PostActionCreators";

class PostStore {
  static getSorted() {
    let { posts } = this.getState();
    let sorted = Object.keys(posts)
      .map(id => posts[id])
      .sort((a, b) => a.date > b.date ? -1 : 1);

    return { posts: sorted };
  }

  constructor() {
    this.bindActions(PostActionCreators);
    this.posts = {};
  }

  onGetPostsSuccess(resp) {
    let { posts } = resp.entities;
    this.posts = assign({}, this.posts, posts);
  }
}

export default alt.createStore(PostStore, 'PostStore');
