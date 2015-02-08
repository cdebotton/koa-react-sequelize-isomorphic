"use strict";

import fs from "fs";
import path from "path";
import Sequelize from "sequelize";

const env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../../config/db.json')[env];

const {db, username, password} = config;
var sequelize = new Sequelize(db, username, password, config);
var db = {};

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach(file => {
    let model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
