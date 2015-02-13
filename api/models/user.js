export default (sequelize, DataTypes) => {
  var User = sequelize.defin('User', {
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        User.hasOne(models.Profile);
      }
    }
  });

  return User;
};
