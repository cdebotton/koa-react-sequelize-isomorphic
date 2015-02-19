'use strict';

import alt from "../alt";
import {injectIntoList} from "../utils/ListUtils";
import PostActionCreators from "../actions/PostActionCreators";

class PostStore {
  constructor() {
    this.bindActions(PostActionCreators);
    this.posts = [];
  }

  onGetPostsSuccess(data) {
    let { posts } = this;
    let { posts: postsReceived } = data.response;

    this.posts = injectIntoList(posts, postsReceived);
  }
}

export default alt.createStore(PostStore, 'PostStore');
