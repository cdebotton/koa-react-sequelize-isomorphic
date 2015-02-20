"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn(
      'Profiles',
      'UserId',
      {
        type: DataTypes.INTEGER,
        references: 'Users',
        referencesKey: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      }
    );
    // add altering commands here, calling 'done' when finished
    done();
  },

  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.removeColumn('Profiles', 'UserId');
    done();
  }
};
