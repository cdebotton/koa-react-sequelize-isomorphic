export default (sequelize, DataTypes) => {
  var Profile = sequelize.define('Profile', {
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    biography: DataTypes.TEXT
  }, {
    classMethods: {
      timestamps: true,
      associate(models) {
        Profile.belongsTo(models.User);
      }
    }
  });

  return Profile;
};
