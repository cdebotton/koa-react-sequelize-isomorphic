"use strict";

import koa from "koa";
import serveStatic from "koa-static";
import compress from "koa-compress";
import bodyparser from "koa-bodyparser";
import isomorphic from "koa-isomorphic";
import json from "koa-json";
import Router from "koa-router";
import mount from "koa-mount";
import path from "path";
import requireDir from "require-dir";

const ENV = process.env.NODE_ENV || 'development';
const DEV = ENV === 'development';
const PORT = process.env.PORT || 3000;

let app = koa();
let router = new Router();
let controllers = requireDir(__dirname + '/controllers')
Object.keys(controllers).forEach(endpoint => controllers[endpoint](router));

app.use(compress());
app.use(bodyparser());
app.use(json({ pretty: DEV }));
app.use(serveStatic(path.join(__dirname, '../public')));
app.use(mount('/api/v1', router.middleware()));

import React from "react";
import alt from "../app/alt";
import cheerio from "cheerio";
import routes from "../app/routes";
import serialize from "serialize-javascript";
import {create as createRouter} from "react-router";
import escapeTextForBrowser from "react/lib/escapeTextForBrowser";

var getState = (router) => {
  return new Promise((resolve, reject) => {
    router.run((...args) => {
      let [Handler, state] = args;

      let promises = state.routes.filter(route => route.handler.fetchData)
        .map(route => route.handler.fetchData(state));

      Promise.all(promises)
        .then(data => resolve(args))
        .catch(err => reject(err));
    });
  });
};

let injectSnapshot = (markup) => {
  return new Promise((resolve, reject) => {
    try {
      let $ = cheerio.load(markup);
      let snapshotData = serialize(alt.takeSnapshot());
      let bundle = DEV ? 'http://localhost:9000/dist/bundle.js' : '/bundle.min.js';

      $('body').append(`<script id="flux-snapshot">var snapshot = ${snapshotData};</script>`);
      $('body').append(`<script src="${bundle}"></script>`);
      if (DEV) {
        $('body').append('<script src="http://localhost:35729/livereload.js?snipver=1"></script>');
      }
      resolve($.html());
    }
    catch (err) {
      reject(err);
    }
  });
};

app.use(function *(next) {
  let router = createRouter({
    location: this.req.url,
    routes: routes,
    onAbort(aborted) {
      let {to, params, query} = aborted;
      let url = Router.makePath(to, params, query);

      this.redirect(url);
    }
  });

  let [Handler, state] = yield getState(router);

  let markup = React.renderToString(<Handler {...state} />);
  let snapshot = yield injectSnapshot(markup);

  this.body = `<!doctype html>${snapshot}`;
});

app.listen(PORT, (err) => {
  if (err) throw err;
  if (DEV) console.log(`koa listening on port '${PORT}'.`);
});
