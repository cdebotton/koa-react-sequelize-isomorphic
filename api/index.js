"use strict";

import koa from "koa";
import serveStatic from "koa-static";
import compress from "koa-compress";
import bodyparser from "koa-bodyparser";
import isomorphic from "koa-isomorphic";
import json from "koa-json";
import path from "path";

const ENV = process.env.NODE_ENV || 'development';
const DEV = ENV === 'development';
const PORT = process.env.PORT || 3000;

let app = koa();

app.use(compress());
app.use(bodyparser());
app.use(json({ pretty: DEV }));
app.use(serveStatic(path.join(__dirname, '../public')));
app.use(isomorphic(path.join(__dirname, '../app/routes')));

app.listen(PORT, (err) => {
  if (err) throw err;
  if (DEV) console.log(`koa listening on port '${PORT}'.`);
});
