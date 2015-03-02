"use strict";

import {
  User,
  Profile
} from "../models";

export default (router) => {
  router
    .get("/users", function *(next) {
      let users = yield User.findAll({
        attributes: ["id", "email", "createdAt", "updatedAt"],
        include: [Profile]
      });

      this.body = users;
    });

  router
    .post("/users", function *(next) {
      let {email} = this.request.body;

      let user = yield User.create({
        email: email
      });

      let profile = yield Profile.create({
        UserId: user.id
      });

      this.body = yield User.find({
        where: { id: user.id },
        include: [Profile]
      });
    });

  router
    .param("user", findUser)
    .get("/users/:user", function *(next) {
      this.body = this.user;
    });

  router
    .param("user", findUser)
    .put("/users/:user", function *(next) {
      let { body: data } = this.request;
      let { user } = this;

      user.email = data.email;

      this.body = yield user.save();
    });

  router
    .param("user", findUser)
    .del("/users/:user", function *(next) {
      this.user.Profile.destroy().then(() => {
        this.user.destroy();
      });
      this.body = {};
    });

  return router;
};

function *findUser(userId, next) {
  this.user = yield User.find({
    where: {id: userId},
    attributes: ["id", "email", "createdAt", "updatedAt"],
    include: [Profile]
  });

  if (!this.user) return this.status = 404;

  yield next;
};

