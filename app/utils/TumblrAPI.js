import path from "path";
import AppServerActionCreators from "../actions/AppServerActionCreators";
require('es6-promise').polyfill();
import fetch from "isomorphic-fetch";

const ENDPOINT_ROOT = '//api.tumblr.com/v2/blog';
const TUMBLR = 'cbotzzz.tumblr.com';
const API_KEY = 'fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4';

export default {
  posts() {
    let url = makeUrl('posts');
    return fetch(url).then(data => console.log(data.body));
  }
};

var makeUrl = (resource) => {
  return ENDPOINT_ROOT + path.join(TUMBLR, resource);
};
