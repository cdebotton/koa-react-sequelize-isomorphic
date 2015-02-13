export default (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      timestamps: true,
      associate(models) {
        User.hasOne(models.Profile);
        User.hasMany(models.Photo);
      }
    }
  });

  return User;
};
