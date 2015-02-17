'use strict';

import {FluxStore, injectIntoList} from "../utils/FluxUtils";
import PostActionCreators from "../actions/PostActionCreators";

class PostStore extends FluxStore {
  registerListeners() {
    return [PostActionCreators];
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
