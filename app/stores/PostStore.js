"use strict";

import alt from "../alt";
import { Map, fromJS } from "immutable";
import PostActionCreators from "../actions/PostActionCreators";

class PostStore {
  constructor() {
    this.bindActions(PostActionCreators);
    this.posts = Map();

    this.on("init", this.setup);
    this.on("bootstrap", this.setup);
  }

  setup() {
    if (!Map.isMap(this.posts)) {
      this.posts = fromJS(this.posts);
    }
  }

  onGetPostsSuccess(resp) {
    let { posts } = resp.entities;
    this.posts = this.posts.merge(fromJS(posts));
  }
}

export default alt.createStore(PostStore, "PostStore");
