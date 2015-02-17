import {FluxActionCreators} from "../utils/FluxUtils";

class PostActionCreators extends FluxActionCreators {
  getPosts() {
    this.handleViewAction();
  }

  getPostsSuccess(body) {
    let {response} = body;
    let {posts} = response;

    this.handleServerAction({posts});
  }

  getPostsError(err) {
    this.handleServerAction(err);
  }
}

export default new PostActionCreators();
