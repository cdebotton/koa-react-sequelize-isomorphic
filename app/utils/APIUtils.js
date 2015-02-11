import superagent from "superagent";
import Promise from "bluebird";
import AppServerActionCreators from "../actions/AppServerActionCreators";
import path from "path";

const TIMEOUT = 10000;
const ENDPOINT_ROOT = 'http://localhost:3000/api/v1';

export var getAPI = (endpoint) => {
  let url = endpoint.indexOf('http://') === -1 ?
    endpoint : path.join(ENDPOINT_ROOT, endpoint);

  let request = superagent.get(url);
  let promise = makePromise(request);

  return promise;
};

export var postAPI = (endpoint, data) => {
  let request = superagent.post(endpoint).send(data);
  let promise = makePromise(request);

  return promise;
};

export var putAPI = (endpoint) => {
  let request = superagent.put(endpoint).send(data);
  let promise = makePromise(request);

  return promise;
};

export var delAPI = (endpoint) => {
  let request = superagent.del(endpoint);
  let promise = makePromise(request);

  return promise;
};

var makePromise = (request) => {
  return new Promise((resolve, reject) => {
    request
      .set('Accept', 'application/json')
      .timeout(TIMEOUT)
      .on('error', reject)
      .end(resolve);
  });
};
