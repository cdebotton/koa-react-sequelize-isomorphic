"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable(
      'Profiles',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        lastLogin: DataTypes.DATE,
        firstName: DataTypes.STRING,
        middleName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        biography: DataTypes.TEXT,
        dateOfBirth: DataTypes.DATE
      }
    );
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('Profiles');
    done();
  }
};
