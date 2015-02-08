"use strict";

var pruno = require('pruno');

pruno(function(mix) {
  mix
    .configure({dir: __dirname + '/config'})
    .http()
    .jade()
    .publish()
    .publish('fonts', {
      pkg: 'font-awesome',
      src: ['fonts/**/*'],
      dist: '::dist/fonts'
    })
    .stylus()
    .webpack();
});
