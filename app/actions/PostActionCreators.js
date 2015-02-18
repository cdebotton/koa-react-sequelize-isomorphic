'use strict';

import alt from "../alt";
import TumblrAPI from "../utils/TumblrAPI";

class PostActionCreators {
  constructor() {
    this.generateActions(
      'getPostsSuccess',
      'getPostsError'
    );
  }

  getPosts() {
    this.dispatch();

    return TumblrAPI.posts()
      .then(this.actions.getPostsSuccess)
      .catch(this.actions.getPostsError);
  }
}

export default alt.createActions(PostActionCreators);
