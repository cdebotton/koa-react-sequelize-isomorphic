'use strict';

import {FluxStore} from "../utils/StoreUtils";
import AppDispatcher from "../dispatcher/AppDispatcher";
import Immutable from "immutable";

class PostStore extends FluxStore {
  constructor() {
    super(this);
    this.posts = Immutable.List();
    this.listenTo({
      'REQUEST_RESOURCE_SUCCESS': 'onRequestResourceSuccess'
    });
  }

  getState() {
    let posts = this.posts.toJS();

    return { posts };
  }

  onRequestResourceSuccess({body}) {
    let {posts} = body.response;
    this.posts = this.posts.concat(posts);
  }
}

export default new PostStore();
