import {
  User,
  Profile
} from "../models";

export default (router) => {
  router
    .get('/users', function *(next) {
      let users = yield User.findAll({
        attributes: ['id', 'email']
      });

      this.body = users;
    });

  router
    .post('/users', function *(next) {
      let {email} = this.request.body;

      let user = yield User.create({
        email: email
      });

      this.body = user;
    });

  router
    .param('user', findUser)
    .get('/users/:user', function *(next) {
      this.body = this.user;
    });

  router
    .param('user', findUser)
    .put('/users/:user', function *(next) {

    });

  router
    .param('user', findUser)
    .del('/users/:user', function *(next) {
      this.user.destroy();
      this.body = {};
    });

  return router;
};

function *findUser(userId, next) {
  this.user = yield User.find({
    where: {id: userId},
    attributes: ['id', 'email']
  });

  if (! this.user) return this.status = 404;

  yield next;
};

