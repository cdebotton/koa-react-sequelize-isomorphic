'use strict';

import path from "path";
import jsonp from "./jsonp";
import { arrayOf, normalize, Schema } from "normalizr";

const Post = new Schema('posts');

const ENDPOINT_ROOT = 'http://api.tumblr.com/v2/blog';
const TUMBLR = 'cbotzzz.tumblr.com';
const API_KEY = 'fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4';

export default {
  posts() {
    let url = makeUrl('posts');

    return jsonp(url, { api_key: API_KEY })
      .then(data => normalize(data.response.posts, arrayOf(Post)));
  }
};

var makeUrl = (resource) => {
  return ENDPOINT_ROOT + '/' + path.join(TUMBLR, resource);
};
