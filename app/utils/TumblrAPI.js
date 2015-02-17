import path from "path";
import PostActionCreators from "../actions/PostActionCreators";
import jsonp from "./jsonp";

const ENDPOINT_ROOT = 'http://api.tumblr.com/v2/blog';
const TUMBLR = 'cbotzzz.tumblr.com';
const API_KEY = 'fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4';

export default {
  posts() {
    let url = makeUrl('posts');
    let {getPostsSuccess: onSuccess, getPostsError: onError} = PostActionCreators;

    return jsonp(url, { api_key: API_KEY })
      .then(onSuccess)
      .catch(onError);
  }
};

var makeUrl = (resource) => {
  return ENDPOINT_ROOT + '/' + path.join(TUMBLR, resource);
};
