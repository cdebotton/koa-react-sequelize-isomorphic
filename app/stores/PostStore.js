'use strict';

import {FluxStore, injectIntoList} from "../utils/FluxUtils";
import PostActionCreators from "../actions/PostActionCreators";
import Immutable from "immutable";

class PostStore extends FluxStore {
  registerListeners() {
    return [PostActionCreators];
  }

  getInitialState() {
    return {posts: []};
  }

  onGetPostsSuccess(...postsToAdd) {
    let state = this.getState();
    let {posts} = state;
    let mergedList = injectIntoList(posts, postsToAdd);

    this.setState({posts: mergedList});
  }
}

export default new PostStore();
