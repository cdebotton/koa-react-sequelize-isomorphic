"use strict";

import koa from "koa";
import path from "path";
import json from "koa-json";
import alt from "../app/alt";
import mount from "koa-mount";
import Router from "koa-router";
import routes from "../app/routes";
import compress from "koa-compress";
import requireDir from "require-dir";
import serveStatic from "koa-static";
import bodyparser from "koa-bodyparser";
import isomorphic from "koa-isomorphic";

const ENV = process.env.NODE_ENV || 'development';
const DEV = ENV === 'development';
const PORT = process.env.PORT || 3000;

let app = koa();
let router = new Router();
let controllers = requireDir(__dirname + '/controllers')

Object.keys(controllers)
  .forEach(endpoint => controllers[endpoint](router));

app.use(compress());
app.use(bodyparser());
app.use(json({ pretty: DEV }));
app.use(serveStatic(path.join(__dirname, '../public')));
app.use(mount('/api/v1', router.middleware()));
app.use(isomorphic({ alt, routes }));

app.listen(PORT, (err) => {
  if (err) throw err;
  if (DEV) console.log(`koa listening on port '${PORT}'.`);
});
