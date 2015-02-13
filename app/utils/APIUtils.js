import superagent from "superagent";
import Promise from "bluebird";
import AppServerActionCreators from "../actions/AppServerActionCreators";
import path from "path";

const TIMEOUT = 10000;

export var getAPI = (endpoint) => {
  let url = makeUrl(endpoint);
  let request = superagent.get(url);
  let promise = makePromise(request);

  return promise;
};

export var postAPI = (endpoint, data) => {
  let url = makeUrl(endpoint);
  let request = superagent.post(url).send(data);
  let promise = makePromise(request);

  return promise;
};

export var putAPI = (endpoint) => {
  let request = superagent.put(endpoint).send(data);
  let promise = makePromise(request);

  return promise;
};

export var delAPI = (endpoint) => {
  let url = makeUrl(endpoint);
  let request = superagent.del(url);
  let promise = makePromise(request);

  return promise;
};

var makeUrl = (endpoint) => {
  try {
    return `${window.location.origin}/api/v1/${endpoint}`;
  }
  catch (err) {
    return `http://localhost:${process.env.PORT || 3000}/api/v1/${endpoint}`;
  }
};

var makePromise = (request) => {
  return new Promise((resolve, reject) => {
    request
      .set('Accept', 'application/json')
      .timeout(TIMEOUT)
      .on('error', reject)
      .end(res => resolve(res.body));
  });
};
