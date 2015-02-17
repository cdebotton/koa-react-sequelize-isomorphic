'use strict';

import {
  FluxStore,
  injectIntoList
} from "../utils/FluxUtils";

class PostStore extends FluxStore {
  registerListeners() {
    return ['post'];
  }

  getInitialState() {
    return {posts: []};
  }

  onGetPostsSuccess(data) {
    let state = this.getState();
    let {posts} = state;
    let mergedList = injectIntoList(posts, data.posts);

    this.setState({posts: mergedList});
  }
}

export default new PostStore();
