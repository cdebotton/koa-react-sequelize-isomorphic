import {getAPI} from "./APIUtils";
import path from "path";
import AppServerActionCreators from "../actions/AppServerActionCreators";

const ENDPOINT_ROOT = 'http://api.tumblr.com/v2/blog';
const TUMBLR = 'cbotzzz.tumblr.com';
const API_KEY = 'fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4';

export default {
  posts() {
    let url = makeUrl('posts');

    return getAPI(url)
      .then(AppServerActionCreators.requestSuccess)
      .catch(AppServerActionCreators.requestError);
  }
};

var makeUrl = (resource) => {
  return path.join(ENDPOINT_ROOT, TUMBLR, resource) +
    `?api_key=${API_KEY}`;
};
