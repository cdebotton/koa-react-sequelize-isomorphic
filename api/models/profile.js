export default (sequelize, DataTypes) => {
  var Profile = sequelize.define('Profile', {
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    biography: DataTypes.TEXT
  }, {
    classMethods: {
      associate(models) {
        Profile.belongsTo(models.User);
      }
    }
  });

  return Profile;
};
