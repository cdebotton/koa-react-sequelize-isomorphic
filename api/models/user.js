export default (sequelize, DataTypes) => {
  var User = sequelize.defin('User', {
    id: {
      type: DataTypes.INTENGER,
      primaryKey: true,
      autoIncrement: true
    },
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
