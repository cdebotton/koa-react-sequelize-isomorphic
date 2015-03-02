"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable(
      "Photos",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        type: DataTypes.STRING,
        bucket: DataTypes.STRING,
        file: DataTypes.STRING,
        description: DataTypes.TEXT
      }
    );
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable("Photos");
    done();
  }
};
