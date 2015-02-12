"use strict";

var pruno = require('pruno');

pruno(function(mix) {
  mix
    .configure({dir: __dirname + '/config'})
    .del()
    .publish()
    .publish('fonts', {
      pkg: 'font-awesome',
      src: ['fonts/**/*'],
      dist: '::dist/fonts'
    })
    .stylus()
    .webpack()
    .http();
});
